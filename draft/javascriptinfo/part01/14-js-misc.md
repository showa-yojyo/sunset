---
title: Miscellaneous
---

## Proxy and Reflect

<!-- https://javascript.info/proxy -->

`Proxy` オブジェクトは、他のオブジェクトを包んで、プロパティーの読み書きなどの操作を横取り、
オプションで自分自身で処理したり、オブジェクトに透過的に処理することができる。

### Proxy

```javascript
let proxy = new Proxy(target, handler)
```

まずは `handler = {}` のときの挙動を理解する。オブジェクト `proxy` への操作全てが
オブジェクト `target` に転送される。

### Default value with "get" trap

オブジェクト `handler` にメソッド `get(target, property, receiver)` があると、
オブジェクト `proxy` に対するすべてのプロパティーの取得を盗聴できる。

* 未翻訳辞書の例は自然。
* 普通は `Proxy` を呼び出して以降は `target` をどこからも参照させたくないので、
  `target` にコンストラクター関数の戻り値で改めて割り当てる。

### Validation with "set" trap

オブジェクト `handler` にメソッド `set(target, property, value, receiver)` があると、
オブジェクト `proxy` に対するすべてのプロパティーの代入を盗聴できる。

* `set` を操作するときには、成功したときに `true` を返すことを忘れない。
  そうしないと `TypeError` が送出される。

### Iteration with "ownKeys" and "getOwnPropertyDescriptor"

`Object.keys()` などのオブジェクトのプロパティーを反復する方式のほとんどは、内部プロパティー
`[[OwnPropertyKeys]]` を使う。

`Proxy` の `handler` にメソッド `ownKeys(target)` があると、そのような反復を盗聴できる。

* このメソッドの戻り値はプロパティーの名前の配列？とする。
* 戻り値の配列が `target` のプロパティーの名前ではないものを含む場合、
  `Object.keys()` などはその変なものを得ない。

変な名前でも `Object.keys()` などにそれらを反復させたい場合には次のことをする：

* `handler` にメソッド `getOwnPropertyDescriptor(target, prop)` も持たせる。
  * 反復させたい名前に対して `enumerable: true` を含むオブジェクトを返す。
  * これは内部プロパティー `[[GetOwnProperty]]` の呼び出しを盗聴することを意味する。

### Protected properties with "deleteProperty" and other traps

名前がアンダーバーで始まるプロパティーへのアクセスを `Proxy` を使って防止することを考える。
`handler` に次のメソッドを定義する：

* `get(target, prop)`
* `set(target, prop, val)`
* `deleteProperty(target, prop)`
* `ownKeys(target)`

最初の三つはどれも `prop.startsWith('_')` ならばエラーを送出する。最後のものは前項の例コードの説明どおり。

メソッド `get(target, prop)` の処理で、`prop` がメソッドのときの戻り値を注意する。
本文のコードの `bind` の実引数は、元オブジェクト `target` であることに注意。
そうしないと、元オブジェクトのメソッド定義でアンダーバーメンバーにアクセスできなくなる。

### "In range" with "has" trap

演算子 `in` を盗聴したい。
例えば、次のオブジェクト `range` に対して `5 in range` のようなコードを意味のあるものにしたい。

```javascript
let range = {
    start: 1,
    end: 10
};
```

メソッド `has(target, property)` を `handler` に実装すると、`in` テストを盗聴できる。
例えば：

```javascript
range = new Proxy(range, {
    has(target, prop) {
        return target.start <= prop && prop < target.end;
    }
});
```

### Wrapping functions: "apply"

`Proxy` は `target` が関数であっても有用だ。その場合には
`handler` にメソッド `apply(target, thisArg, args)` を実装することになる。

* `target` はオブジェクトというより関数だ。
* `thisArg` は関数呼び出し中の `this` の値だ。
* `args` は元の関数の実引数だ。

以前やった関数ベースの Decorator パターンを `Proxy` で実装する。
この方式の利点は、関数のプロパティーを損なわないという点だ。

```javascript
function delay(f, ms) {
    //return function() {
    //    setTimeout(() => f.apply(this, arguments), ms);
    //};
    return new Proxy(f, {
        apply(target, thisArg, args) {
          setTimeout(() => target.apply(thisArg, args), ms);
        }
    });
}
```

### Reflect

`Reflect` は `Proxy` の生成を簡単にする。

`Reflect` では演算子 `new`, `delete`, etc. を関数
`Reflect.construct`, `Reflect.deleteProperty`, etc. を使って呼び出すことができる。

`Proxy` で盗聴可能な内部メソッドには、それに対応するメソッドが `Reflect` にも存在し、
`Proxy` のそれと同じ名前と引数を取る。
つまり、`Reflect` を使えば元のオブジェクトに操作を転送することができる。

#### Proxying a getter

`Reflect.get` が優っている理由を示す例を見る。
ここで、以前は使わなかった引数 `receiver` の意味がわかる。

例コードの構造：

* オブジェクト `user`: プロパティー `_name` がある。これはアクセッサーメソッド `get name` で参照される。
* オブジェクト `userProxy`: `Proxy` で `user` を包んだもの。`hander` に `get` がある。
* オブジェクト `admin`: プロパティー `_name` がある。さらに、プロトタイプは `userProxy` に指定されている。

従来のように `handler.get` を実装すると `admin.name` は `user._name` に評価される。
こういうときには `Reflect.get` を使う：

```javascript
let userProxy = new Proxy(user, {
    // target, prop, receiver == user (guest), "name", admin
    //get(target, prop, receiver) {
    //    return target[prop];
    //}
    get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
    }
});
```

### Proxy limitations

`Proxy` は組み込み型の内部情報と private メンバーにまでは手が届かない。

#### Built-in objects: Internal slots

組み込み型 `Map`, `Set`, `Date`, `Promise` など、内部情報が絡んでくるものに対しては
`Proxy` が機能しないプロパティーがある。

例：`Map` 型オブジェクトを `handler` が空であるような `Proxy` 型オブジェクトを生成し、
それに対して `set` を呼び出すと `map.set` の呼び出しに失敗する。
これは、`hander.get` を本文のように実装することで修正される。

```javascript
get(target, prop, receiver) {
    let value = Reflect.get(target, prop, receiver);
    return typeof value == 'function' ? value.bind(target) : value;
}
```

`Array` は `Proxy` の機能を邪魔するような内部情報がない。

#### Private fields

シャープ文字から始まるクラスフィールドにアクセスするメソッドの呼び出しに対しては、
`Proxy` が機能しない。理由は前項と同じ。修正方法も同じ。

#### Proxy != target

`Proxy` オブジェクトと元の `target` は別オブジェクトだ。
これらを等しいと評価させるような `handler` の書き方があるわけでもない。

### Revocable proxies

`Proxy.revocable()` は `target` との結びつきを取り消す `Proxy` オブジェクトを可能にする。
それには、後で戻り値の `revoke()` を呼び出す。

```javascript
let {proxy, revoke} = Proxy.revocable(target, handler);

// ...

revoke();
```

* `revoke()` 呼び出し以降、`proxy` 経由での `target` 操作がエラーになる。
* 本文で紹介されているのは、`WeakMap` を利用して `proxy` が不要となったら
  `target` もエンジンにゴミ収集させる構想だ。`revoke()` の呼び出しで
  `target` が到着不能になるということだろう。

### Tasks

#### Error on reading non-existent property

存在しないプロパティーを読み込もうとすると、通常は `undefined` が返される。
代わりに、エラーを送出する `Proxy` を作れ。

* `handler.get` だけ書けばいい。

#### Accessing array[-1]

Python などのように、負の添字を許す `Array` を実装する。
すなわち `array[-N]` を `array[array.length - N]` と評価するようにしろ。

* `handler.get` で添字を処理する。すぐに気づくと思うが、文字列を数に変換する必要がある。

#### Observable

問題を整理すると：

* 関数 `makeObservable(target)` を書け。それは `Proxy` オブジェクトを生成して返す。
* その戻り値の `proxy` にはメソッド `observe(callback)` がある。
  `target` のプロパティー `prop` が、例えば変更されると、`callback(prop)` が呼びされるようになっている。
* 今回は変更だけを observe するが、他の操作に対しても同様のことを実装できるだろう。

## Eval: run a code string

<!-- https://javascript.info/eval -->

Python の `eval` と同じ意味の関数だ。

 呼び出し地点での lexical environment が適用されるが、
"use strict" モードではこの関数呼び出し固有の LE が割り当てられる。

### Using "eval"

何も考えずに `eval` に与えるコードを書くと、外側のスコープの変数にアクセスして危ない。

* 外側の変数を使わないコードを意図しているのならば、単に `eval(xxx)` とするのではなく、
  明示的に `window.eval(xxx)` として呼び出す。
* 局所変数を必要とするコードを書くならば、`eval` の代わりに `Function` を使う。
  そこで変数とコードを両方指定する。

### Tasks

#### Eval-calculator

関数 `prompt` からユーザーの入力文字列を得て、それを単に `eval` する。

* 余力があれば入力の数式チェックや `Function` に置き換える。

## Currying

<!-- https://javascript.info/currying-partials -->

例えば関数 `f(a, b, c)` から関数 `f(a)(b)(c)` へ変換するような操作を currying という。
この用語はプログラミング言語に依らない。

二変数関数の場合は次のような関数がそれを実現する：

```javascript
function curry(f) { // curry(f) does the currying transform
    return function(a) {
        return function(b) {
            return f(a, b);
        };
    };
}
```

### Currying? What for?

ログ出力のように、一部の引数を固定するような状況では currying が有用だ。

### Advanced curry implementation

個数が一般の引数を持つ関数を curry するには、本文のような再帰関数を書く。
解説どおりの動きになっているかをデバッガーで確認する。

* 引数リストに `...` 引数がある関数は curry することができない。
* 定義によれば、currying は `f(a, b, c)` を `f(a)(b)(c)` に変換するはずだ。
  JavaScript では currying と言ったら、本文のように高度なものになる。
  複数引数でも関数を呼び出し可能なものも currying に含める。

## Reference Type

<!-- https://javascript.info/reference-type -->

ここまで来た読者ならば、最初の三項演算子の例がエラーになるのは肌感覚でわかる。

### Reference type explained

実は次のコードですらエラーになる：

```javascript
let f = user.hi;
f();
```

`user.hi()` にせよ `user.hi` にせよ、ドットはそもそも関数を返していない。
参照型なる実体（これは言語内部の型と理解する）を返し、
それの特別な処理により `this` が確定する。

参照型の値は組 `(base, name, strict)` で表現される。

* `base` はドットの左側に来るオブジェクト
* `name` はプロパティーの名前
* `strict` は "use strict" モードであるかどうか

例えば `user.hi` は、実体は次のものだ：

```javascript
(user, "hi", true)
```

参照型に対して丸括弧 `()` が評価されると、この情報を用いて正しい `this` を決めることができる。
参照型は特別な内部型であり、ドットから丸括弧の呼び出しに情報を渡すことを目的とするものだ。

`hi = user.hi` のような操作は参照型を捨てることになる。
本当に `user.hi` の値であるメソッドを取り、それを `hi` に割り当てる。
つまり、それ以降の操作では `this` が失われる。

`obj.method()` や `obj['method']()` 構文を使って関数を直接呼び出した場合のみ、
`this` の値が正しい方法で渡される。

`func.bind()` のようなさまざまな方法が `this` が失われる問題を解決する。

### Tasks

#### Syntax check

昔習ったことを思い出せということか。

#### Explain the value of "this"

(4) のような場合ですら `this` が確定しないことに注意。
論理的にも評価的にも (2) と同じのはずだが、見かけ上、参照型が捨てられるような式では実際に捨てられる。
そして `this` の値が決まらなくなる。

## BigInt

<!-- https://javascript.info/bigint -->

`BigInt` は任意の長さの整数を扱える数値型だ。

この型の値を定義するには、整数リテラルのケツに `n` を付加する。
または、文字列や数値などから `BigInt` コンストラクターを呼び出す。

```javascript
1234567890123456789012345678901234567890n;
BigInt("1234567890123456789012345678901234567890");

BigInt(10);
```

### Math operators

注意点がいくつかあるものの、`BigInt` は通常の数のように算術演算ができる。

* 二項算術演算は `BigInt` 同士でしか評価されない。普通の数型を自動的に昇格したりはしない。
* `5n / 2n` が `2n` であることに注意。`5 / 2` が `2.5` であることとは対照的だ。
* 変換操作はエラーになることはないが、もし値が巨大すぎて数値型に収まらない場合は、
  余分なビットが無言で切り落とされる。
* `BigInt` は例外的に単項演算子の `+` がオーバーロードされていない。

### Comparisons

比較演算子は `BigInt` vs `Number` に対応している。

等号演算子は `BigInt` vs `Number` に対して `==` と `===` の評価が異なる。
例えば `1` と `1n` とをこれらの等号で比較すると、前者と後者の評価はそれぞれ
`true`, `false` となる。

### Boolean operations

`BigInt` 値が `Boolean` に暗黙的に変換される必要がある状況では、自然な変換がなされる。
すなわち、`0n` 以外の値は `true` に変換される。

演算子 `||`, `&&` などに対しても、`BigInt` 値は `Number` 値のように処理される。
`BigInt` vs `Number` 評価に対応している。
