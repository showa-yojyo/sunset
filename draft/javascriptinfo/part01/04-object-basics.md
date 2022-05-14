---
titie: "Objects: the basics"
---

## Objects

<!-- https://javascript.info/object -->

`Object` の基本的構成要素を学ぶ。プロパティーの集まりと考えられる。

### Literals and properties

中括弧を用いて定義されたオブジェクトを object literal と呼ぶ。
中括弧の内部に `key: value` の列をカンマ区切りで記す。

* プロパティー値を参照するには `obj.key = value;` のようにドット記法を用いる。
* プロパティーを削除するには演算子 `delete` を作用させる。`delete obj.key;`

### Square brackets

プロパティー値を参照するにはドット記法の他に、角括弧を用いる方法もある。

```javascript
obj["key"] = value;
delete obj["key"];
```

プロパティー名に空白文字が含まれていたり、名前が動的に決定されたりする状況で用いられる。

### Computed properties

キーのほうが動的に定義される仕組みがある。これを computed property という。
この応用が後ほどたくさん出てくる。

```javascript
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {
  [fruit]: 5, // e.g. bag.apple == 5
};
```

### Property value shorthand

属性値の略記法が存在することを確認。キー識別子と値識別子が一致する場合に適用される。

```javascript
let name = "John";
let user = {
    name,
    age: 30,
};
// user.name == "John";
```

### Property names limitations

* キーの型は必要に応じて文字列型に変換される。特に数値。
* 便宜上 `__proto__` をここで紹介。

### Property existence test, “in” operator

属性キーの存在テストに演算子 `in` を用いることができる。

```javascript
"key" in obj;
```

### The "for...in" loop

オブジェクトのキーを `for ... in` 文で順次アクセスできる。構文：

```javascript
for (let key in object) {
    // executes the body for each key among object properties
}
```
 
#### Ordered like an object

オブジェクトのキーは特別方法で順序付けられている。

* キーが数のプロパティーについては、小さい順に配列されている。
* それ以外のプロパティーについては、作成順に配列されている。

数を引用符で囲んで文字列に見せかけても、小さい順ルールが適用される。

### Tasks

#### Hello, object

省略。

#### Check for emptiness

これはもっと良い方法がないものか？

#### Sum object properties

省略。

#### Multiply numeric property values by 2

ヒントに `typeof` を使えとあるから問題はないに等しい。

```javascript
typeof obj[key] == 'number'
```

## Object references and copying

<!-- https://javascript.info/object-copy -->

Python のオブジェクトモデルに似ている気がする。

### Comparison by reference

二つのオブジェクトが等しいのは、オブジェクト同士が同じ場合に限られる。
例えば、二つのオブジェクトのどのプロパティーも等しいとしても、オブジェクト同士が別物ならば、等しくない。

### Cloning and merging, Object.assign

* `Object.assign()` の意味はメンバーごとの代入が基本。浅いコピーを行う。
* `const` オブジェクトの属性の値を（参照でなくても）単純な代入式で変更することができる。

### Nested cloning

オブジェクトが入れ子の構造である場合、複製は再帰的に実現される。

## Garbage collection

<!-- https://javascript.info/garbage-collection -->

### Reachability

値が到達可能であるとは、値が何らかの方法でアクセスできる、つまり使用できるということだ。
到達可能な値はすべてメモリーに格納されていることが保証されている。

* まず、到達可能な値の基本集合があり、明白な理由により削除することができない。
  例えばグローバル変数、現在実行中の関数とその局所変数、実引数。
  現在ネストしている関数とその局所変数、実引数。
  このような値をルートと呼ぶ。
* 他の値は、ルートから参照、または参照の連鎖により到達可能ならば、その値は到達可能だ。

例えば、グローバル変数にオブジェクトがあり、そのオブジェクトに他のオブジェクトを参照するプロパティーがある場合、
そのオブジェクトは到達可能だ。さらに、そのオブジェクトが参照するオブジェクトも到達可能だ。

### A simple example

この例がゴミ収集の考え方の基本だ。

### Two references

これは参照カウンターのような考え方だ。

### Interlinked objects

これは循環参照のもっとも原始的な例だ。
John は Ann を参照しているものの、John はどこからも参照されていないので、ゴミ収集される。

### Unreachable island

これは到達可能性の概念で、ルートが重要な意味を示す例だ。
ルート系からの参照が切れたことにより、一連のオブジェクトがゴミ収集される。

オブジェクト参照関係が構成するグラフの連結成分がまるごと到達不能になると、
その連結成分にあるオブジェクトすべてがゴミ収集の対象となると考えていい。

### Internal algorithms

プロならば知っておくべき事実だが、ここは読まなくてもなんとかなる。

### Summary

興味深いことが書かれている。やる気があれば取り組め。

## Object methods, "this"

<!-- https://javascript.info/object-methods -->

二点だけ押さえる。

* `this` の意味が他言語とかなり異なる。
* 矢印関数に `this` はない。

### Method examples

オブジェクトのプロパティーの値を関数にすれば、それはメソッドに他ならない。

#### Method shorthand

オブジェクトリテラルの形でメソッドを定義するために、略記法が用意されている：

```javascript
user = {
    sayHi() { // same as "sayHi: function(){...}"
        alert("Hello");
    }
};
```

キーワード `function` を書かないで済むことに注意。

### "this" in methods

メソッドの中からオブジェクトを参照するためのキーワードが `this` だ。
例えば `user.sayHi()` の呼び出し中では `this == user` が成り立つ。

### "this" is not bound

JavaScript の `this` は、他のオブジェクト指向プログラミング諸言語と意味がかなり異なる。
オブジェクトのメソッドではない関数の中でも `this` を参照することができる。
`this` が何であるかは、実行時に評価される。

"use strict" モードである場合には、最悪でも `this` は `undefined` になる。
ゆるいモードの場合には、外側のスコープの `this` が参照される。
おそらくグローバルオブジェクトだろう。

### Arrow functions have no "this"

矢印関数は特別であり、この関数に依存する `this` は存在しない。
矢印関数の内部で `this` を参照すると、外側のスコープの `this` が参照される。

### Tasks

#### Using "this" in object literal

問題の答は易しいが、少し内容を変えてエラーが出ないように `ref` の値を決めることを考えるといい。

#### Create a calculator

和の計算があるので、`prompt()` からの入力を数に明示的に変換する必要がある。

#### Chaining

オブジェクト指向プログラミング言語を何か一つでも知っているプログラマーならこれは問題にならない。

## Constructor, operator "new"

<!-- https://javascript.info/constructor-new -->

* まだ `class` 文を知らない状態でコンストラクターを定義する。
  * 構文上は通常の関数定義とまったく変わらない。
  * 関数本体に `this` が現れる。
  * 呼び出し時に `new` を伴うと、戻り値、すなわち `this` に相当するオブジェクトを
    暗黙に生成するので、この関数をコンストラクターと呼ぶのがふさわしい。
* `new.target` は知らないままでも問題ないだろう。

現代的な `class` 構文はもっと後になってやるのだが、この言語仕様がその根底にある。

### Constructor function

まず、文法外の規約を二つ取り決める：

* コンストラクターという特別な関数を定義するが、関数名を大文字で始める。
* 演算子 `new` を必ず伴って呼び出す。

演算子 `new` を使って呼び出された関数は、次のような手順に従う：

1. 新しい空のオブジェクトを作成して `this` に割り当てられる。
2. 関数本体を実行する。ふつうは `this` を更新して新しいプロパティーを追加する。
3. `return this;` を書かずに `this` を返す。

### Constructor mode test: new.target

読み飛ばしても構わないと言うので、そうする。

### Return from constructors

コンストラクターで明示的に `return` 文を書くと何が起こるかを述べている。
しかし、そのようなことはしないので、見なくていい。

### Methods in constructor

コンストラクターでは、プロパティーだけでなく、メソッドを追加することもできる。

### Tasks

#### Two functions – one object

これは想像どおりの解答だ。

#### Create new Calculator

問題ない。

#### Create new Accumulator

これも `prompt()` の戻り値を数に明示的に変換する必要がある。

## Optional chaining '?.'

既存の `?` 系演算子に比べるとそれほど便利ではないようだ。

### The "non-existing property" problem

演算子 `?.` が導入された理由を長々と述べている。

### Optional chaining

式 `value?.prop` は次のように評価される：

* 式 `value` が `null` でもなく `undefined` でもなければ `value.prop`
* それ以外は `undefined`

### Short-circuiting

演算子 `?.` は short-circuit 評価が適用される。

### Other variants: ?.(), ?.[]

* 演算子 `?.()` は `?.` のメソッド呼び出し版
* 演算子 `?.[]` は `?.` の角括弧版

## Symbol type

<!-- https://javascript.info/symbol -->

`Object` のキーの型は `string` または `Symbol` に限られる。ここでは後者が説明される。

シンボルの考え方がこのあとたくさん出てくる。

### Symbols

* `Symbol` は一意的な識別子を実現するのに用意された組み込み型だ。
* `Symbol` オブジェクトは他の型のオブジェクトとは異なり、文字列への自動変換がなされない。

### "Hidden" properties

`Symbol` でオブジェクトのキーを定義すると、その属性は「隠される」。
例えば `for ... loop` 文でそのような属性にはアクセスされない。

#### Symbols in an object literal

オブジェクトリテラル形式で定義する際には角括弧を要する。

#### Symbols are skipped by for...in

* シンボルプロパティーは `for ... in` で無視される。
  これは `Object.keys()` が無視することによる。
* `Object.assign()` は `Symbol` による属性を考慮する。

### Global symbols

`Symbol.for()` で、定義済みのシンボルを検索する。

#### Symbol.keyFor

逆に `Symbol.keyFor()` は既存のシンボルから名前を得る。

### System symbols

システムシンボル、言語が規定するシンボルが大量に定義されている。
`Symbol.iterator` が有名だ。

## Object to primitive conversion

<!-- https://javascript.info/object-toprimitive -->

それにしても、このチュートリアルはオブジェクトの変換についての記述が細かくて信頼できる。

前にも出てきたが、組み込み型への変換が必要なときにオブジェクトからの自動変換が引き起こされる。

### Conversion rules

オブジェクトからの自動変換に関する規則を述べている。

1. Boolean への変換は `true` とする。
2. Number への変換は、オブジェクトの減算や数学関数を適用するときに起こる。
   例えば `Date` オブジェクトは差が考えられ、その結果は二つの日付の時間差だ。
3. String への変換は `alert(obj)` など、出力時に起こる。

このうち、2. と 3. については自動変換を実装できる。

### Hints

前半がよくわからないが、自動変換が必要そうなときにヒントという文字列情報が発生するらしい。
それから、次の手順で実際の変換が決定する：

1. `obj[Symbol.toPrimitive](hint)` が存在すれば、それを呼び出そうとする。
2. 存在しないで、ヒントが "string" であれば
   `obj.toString()` または `obj.valueOf()` を、存在すれば何でもいいから呼び出そうとする。
3. ヒントが "number" または "default" であれば
   `obj.valueOf()` または `obj.toString()` を、存在すれば何でもいいから呼び出そうとする。

### Symbol.toPrimitive

オブジェクトにメソッド `[Symbol.toPrimitive]()` があれば、それが優先的に採用される。

### toString/valueOf

あるいはオブジェクトの `toString()`, `valueOf()` が用意されていれば、それが採用される。
文字列が必要な場合は前者が、数やデフォルトが必要な場合は後者がそれぞれ優先され、前者がその次に採用される。

#### A conversion can return any primitive type

ここで述べたメソッドを実装する際には、ヒントの指す型そのものの値を必ずしも返す必要はない。

### Further conversions

演算や関数にオブジェクトを渡すと、変換が二段階で生じる可能性がある。
まずはオブジェクトを原子型に変換し、それから演算や関数が必要とする原子型に変換する。
