---
title: Prototypes, inheritance
---

## Prototypal inheritance

<!-- https://javascript.info/prototype-inheritance -->

JavaScript における継承の仕組みを理解する。

### [[Prototype]]

まずはプロトタイプの説明。オブジェクトすべてに隠しプロパティー
`[[Prototype]]` というものがあり、値は `null` または別のオブジェクトだ。
このオブジェクトをプロトタイプという。

オブジェクトからプロパティーを読み取る際に、そのプロパティーが見つからない場合、
JavaScript は自動的にプロトタイプからそれを取得する（これは連鎖する）。
これが JavaScript における継承の基本となる。

オブジェクトの `[[Prototype]]` を触るには `__proto__` を参照する。

* 本文のコードはオブジェクトに別のオブジェクトをプロトタイプとして割り当てていることになる。
* その次のコード。プロトタイプオブジェクトのメソッドを呼び出すと成功する。

プロトタイプは循環参照を許さない。そのように設定しようとすると失敗する。

プロトタイプに `null` や `Object` 以外の型の値を指定することはできない。

### Writing doesn't use prototype

プロトタイプはプロパティーの読み取りにしか使わないものだ（上書きしたければ通常の方法で問題ない）。

* 最初の例でフラグを書き換えてデバッグして確認済み。
* アクセッサープロパティーは例外というよりは、実体がメソッドだからだと思う。

### The value of "this"

その次の `user` と `admin` の例で再確認。
メソッド呼び出しに関する `this` の決定仕様により、状態は共有されない。
これならば、普通のオブジェクト指向プログラミング言語の感覚で子オブジェクトを操作しても安心だ。

### for...in loop

* `for...in` ループは親オブジェクトのプロパティーを拾う。
* 対照的に、`Object.keys(obj)` は子オブジェクトのプロパティーしか拾わない。
  単純なキー・値列挙機能のほとんどは基底プロパティーを無視する。
* プロパティーが子のものかそうではないかをメソッド `obj.hasOwnProperty(key)` で判定する。

ちなみに `hasOwnProperty` がループに出てこない理由は、その特別属性
`enumerable` の値が `false` だからだ。

### Tasks

#### Working with prototype

基本問題。

#### Searching algorithm

継承関係を動的に設定することができることを理解する。
パフォーマンスの差は深刻に考えなくていい。

#### Where does it write?

JavaScript の `this` の参照原則が適用される。

#### Why are both hamsters full?

ハムスター問題は微妙かもしれない。解 2 だと継承の利点がほぼない。

### Comments

* ハムスター問題への言及が多い。
* 「フランケンスクリプト」という言葉が気に入る。

## F.prototype

<!-- https://javascript.info/function-prototype -->

ここではコンストラクター関数のプロパティー `prototype` について述べている。
昔からある言語仕様であるので、たくさんのコードがこれを使っている。

以下、関数 `F` を `new` で呼び出すことを想定したコンストラクター関数だとする。

* `F.prototype` がオブジェクトであるならば、演算子 `new` はそれを使って
  生成するオブジェクトの隠しプロパティー `[[Prototype]]` の値に設定する。
  `F.prototype` にオブジェクトを割り当てて `new` を使って呼び出せばいい。
* `F.propotype` 自身は普通のプロパティーだ。

### Default F.prototype, constructor property

`F.property` の既定値は次のオブジェクトだ：

```javascript
{
    constructor: F,
}
```

呼び出し `new F()` で生成されるオブジェクトのプロパティー `constructor` にも `F` が設定される。
これは生成後、動的に書き換えることもできる。

### Tasks

#### Changing "prototype"

* 親オブジェクトは共有される。
* 演算子 `delete` はオブジェクトに直接作用する。つまり、
  子オブジェクト経由で親オブジェクトの何らかのプロパティーを `delete` しようとしても、
  実際は子オブジェクト固有のプロパティーを削除しようとして、静かに失敗する。

#### Create an object with the same constructor

本文中で述べられたことを確認する問題。

## Native prototypes

<!-- https://javascript.info/native-prototypes -->

間隔が麻痺していたが、そもそもプロパティー `prototype` は JavaScript の資料でよく目にしていたのだった。

### Object.prototype

`Object.prototype` はメソッド `toString()` を含む大量のメソッドがある巨大なオブジェクトだ。
これがプロトタイプ連鎖の最終地点だ。

### Other built-in prototypes

組み込みクラス `Array`, `Date`, `Function` でも、大量のメソッドをプロトタイプに収納する手法を採っている。
そうすればメモリーを大量に節約できるからだ。

* 例えば `Array.prototype` の場合には `Object.prototype` のメソッドをオーバーライドしているものもある。
  一つは `toString()` だ。

### Primitives

* 文字列型、数型、真偽型それぞれの値に対しては、プロトタイプとして
  `String.prototype`, `Number.prototype`, `Boolean.prototype` がそれぞれ利用可能だ。
* `null` および `undefined` にはプロトタイプが存在しない。

### Changing native prototypes

例えば `String.prototype` のような、元々のプロトタイプを更新することができる。
しかし、元々のプロトタイプはグローバルなものなので、一般的には悪い考えのはずだ。

昔述べられていた polyfil という工程はこれでしか実現できない。

### Borrowing from prototypes

以前 `[].join.call(arguments);` という呼び出しを習った。
仮に、配列風オブジェクト `arguments` が自作のオブジェクトであって、
かつプロトタイプに制約がなければ次のように書けた：

```javascript
arguments.join = Array.prototype.join;
// ...
arguments.join();
```

### Tasks

これらの演習は、プロトタイプを Decorator パターンに応用できることを示唆する。

#### Add method "f.defer(ms)" to functions

関数すべてにメソッド `defer` を持たせるという、面白い着想の問題だ。
`Function.prototype` に他の一切と衝突しないようなプロパティーを追加することは許される。

#### Add the decorating "defer()" to functions

いつもの「オリジナルの引数を採用すること」制限があることに注意。

最初は `(a, b)` で試す。それから一般の引数リストを対応する。
そして、解答にあるオブジェクトメソッドに作用させる方法にクセがあることに注意。

## Prototype methods, objects without __proto__

<!-- https://javascript.info/prototype-methods -->

`__proto__` は時代遅れ。当世風の記法がある。

* `Object.create(proto, [descriptors])`
  * 第一引数は生成するオブジェクトのプロトタイプオブジェクトを指定する。
  * 第二引数 `descriptors` は生成するオブジェクト自体のそれを指定する。
* `Object.getPrototypeOf(obj)`
* `Object.setPrototypeOf(obj, proto)`

`obj` を複製するのには次の呼び出しが有効だ：

```javascript
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

### Brief history

どの方法だろうが、オブジェクト生成後でその `[[Prototype]]` を変更する処理はたいへん遅い。

### "Very plain" objects

`Object.create(null)` で生成したオブジェクトは very plain であるという。
これはオブジェクトリテラル `{}` よりもさらにシンプルで、プロトタイプが `null` だ。

### Tasks

#### Add toString to the dictionary

`Object.defineProperty()` のほうがコード埋め問題の解としてはいいと思う。
`Object.setPropertyOf()` は `enumerable` を指定できないからダメか？

#### The difference between calls

これはいつもの `this` 決定規則を確認する質問だ。
