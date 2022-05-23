---
title: Classes
---

## Class basic syntax

<!-- https://javascript.info/class -->

### The "class" syntax

```javascript
class MyClass {
    constructor() { ... }
    method1() { ... }
    method2() { ... }
    method3() { ... }
    ...
}
```

* この定義に対して `new MyClass()` を呼び出せば、これらのメソッドすべてを有する新しいオブジェクトが生成する。
* `constructor()` は `new` が自動的に呼び出すので、そこで `this` を用いてオブジェクトを初期化する。

### What is a class?

JavaScript ではクラスは関数の一種だ。クラス構文は次のことをする：

1. 与えられたクラス名と同じ関数を定義し、それをクラス宣言の評価とする。
   その関数の内容は `constructor` がある場合にはそれと同じものとなる。ない場合には空。
2. 与えられたメソッドをクラス名と同じ関数のプロトタイプに収納する。

このことは今まで習った機能を利用することで示すことができる。

### Not just a syntactic sugar

これまでの手作業による擬似クラス定義とは異なる点がいくつもある。その一部は：

1. クラス構文で定義されたコンストラクターは隠しプロパティー `[[IsClassConstructor]]` を有する。
   これはコンストラクターが演算子 `new` で呼び出されることを要求する。
2. クラス構文で与えられたメソッドは特別属性 `enumerable` の値が `false` だ。
3. クラス構文のコードはつねに "use strict" モードだ。

### Class Expression

無名関数と同様にして、無名クラスの定義も（名前付きにも）できる。

```javascript
let MyClass = class {
    ...
};
```

### Getters/setters

クラス構文ではオブジェクトリテラルと同様にアクセッサープロパティー `get`, `set` も定義可能だ。
これらのメソッドはクラスのプロトタイプに収納される。

### Computed names [...]

クラス構文では角括弧のプロパティーもオブジェクトリテラルと同様に定義可能だ。
この機能を忘れかけているので、コード例を引いておく（角括弧内はふつうは実行時評価される）：

```javascript
class User {
    ['say' + 'Hi']() {
        alert("Hello");
    }
}
```

### Class fields

クラスフィールドはプロトタイプではなく、個々のオブジェクトに備わる。

```javascript
class MyClass {
    field1 /* [= expr1] */;
    field2 /* [= expr2] */;
    field3 /* [= expr3] */;
    ...
    constructor() { ... }
    method1() { ... }
    method2() { ... }
    method3() { ... }
    ...
}
```

#### Making bound methods with class fields

フィールドがオブジェクト個別に作られることを利用して、矢関数を値とする。
すると `this` が `bind` なしにオブジェクトを指す。
この手法は何らかのコールバックとして指定するときに便利だ。

### Tasks

#### Rewrite to class

与えられたオブジェクトリテラルをクラス構文で書き換える問題。基本。

## Class inheritance

<!-- https://javascript.info/class-inheritance -->

### The "extends" keyword

```javascript
class Derived extends Base{
    // ...
}
```

ただし `extends` はクラスなどのコンストラクター関数か `null` をオペランドに取ることができる。
意味は `[[Prototype]]` を指定したものに設定すると覚えておいていい。

### Overriding a method

子クラスのメソッドで親メソッドを呼び出すにはキーワード `super` を用いる。

* `super(...)` はコンストラクター内限定で、親コンストラクターを呼び出す。
* `super.method(...)` は親クラスの `method` を呼び出す。

繰り返しになるが、矢関数には `super` がない。外側のスコープの `super` だと解釈される。

### Overriding constructor

急所は一つ。子クラスのコンストラクターでは `super` を最初に呼び出す必要がある。
さもなければ `this` を参照できない。

本文では詳細な説明がなされているが、派生コンストラクターは特別扱いだということを知っていれば十分だろう。

#### Overriding class fields: a tricky note

この節の内容は、他のプログラミング言語の習熟者向けらしい。

* クラスフィールドもオーバーライド可能だ。
* 子クラスフィールドの初期化タイミングが、親コンストラクターの前だ。

### Super: internals, [[HomeObject]]

* `super.method()` は `this.__proto__.method()` のように働くわけではない。
  これは長い継承鎖を作って検証することができる。

#### [[HomeObject]]

関数には `[[HomeObject]]` という特別な隠しプロパティーがある。
関数がクラスやオブジェクトのメソッドとして指定されると、
その `[[HomeObject]]` プロパティーはそのオブジェクトになる。
それによって `super` は親プロトタイプとそのメソッドを解決するのだ。

#### Methods are not "free"

* いったん関数が定義されると、その `[[HomeObject]]` はもう変わらない。
* `[[HomeObject]]` が使われるのは `super` しかない。

#### Methods, not function properties

メソッドを定義するときには `methodName: function(){ ... }` の記法を採用してはいけない。
`[[HomeObject]]` が存在しなくなってしまう。

### Tasks

#### Error creating an instance

コードをブラウザーで実行すると、デバッガーがエラーメッセージで解答を教えてくれる。

```text
ReferenceError: Must call super constructor in derived class before accessing
'this' or returning from derived constructor
```

#### Extended clock

コードを編集することが許されない既存のクラスから、追加機能を有するサブクラスを定義する問題。
行数は少ないが、メソッド `start()` を実質的に全部実装するようなものだ。

## Static properties and methods

<!-- https://javascript.info/static-properties-methods -->

クラス自体に割り当てられたメソッドは静的メソッドであると言う。
クラス定義内のメソッド定義において、名前の前にキーワード `static` を付けるとそれになる。

* 既存のクラスに対して、それ自体にメソッドを付加しても静的メソッドを定義できる。
* 静的メソッドでは `this` はクラス自体を指す。これは `this` 決定規則どおりだ。
* 静的メソッドの用途は他のオブジェクト指向プログラミング言語と同様のようだ。
* 静的メソッドはオブジェクトメソッドのようには呼び出すことはできない。

### Static properties

クラスフィールドの名前の前にキーワード `static` を付けると、それは静的プロパティーになる。

* 既存のクラスに対して、それ自体にプロパティーを付加しても静的プロパティーを定義できる。

### Inheritance of static properties and methods

親クラスの静的メンバーは小クラスに継承される。

### Tasks

#### Class extends Object?

Python とは違って、明示的に `extends Object` して定義されるクラスは
`Object` の静的メンバーに普通の方法でアクセスできない。

## Private and protected properties and methods

<!-- https://javascript.info/private-protected-properties-methods -->

### A real-life example

プログラミングにおけるオブジェクトはコーヒーメーカーのようなものだ。
内部の詳細を隠すためには、保護カバーの代わりに、言語の特別な構文と慣習を使う。

### Internal and external interface

インターフェイスを内部インターフェイスと外部インターフェイスに分類して考える。

内部インターフェースは、オブジェクトが動作するために使われるもので、その細部は互いに利用し合う。
外部インターフェイスを介してオブジェクト機能を使用する。
つまり、オブジェクトを使うために必要なのは、その外部インタフェースを知ることだ。
オブジェクト利用者は、それが内部でどのように機能しているのかを知らないかもしれない。

他のオブジェクト指向プログラミング言語では public, protected, private の三種のアクセスレベルが備わっているが、
JavaScript には protected に相当するものがない。実用上はこの概念が有用なので、慣習を設けて乗り切る。

### Protecting "waterAmount"

* 変数名をアンダーバーから始めることで、それを protected であるかのように見做そう。
  `waterAmount` なら `_waterAmount` に改名する。
* 外部からは直接アクセスできなくさせたので、外部インターフェイスを
  アクセッサープロパティー `get`, `set` の機能を応用するなどして用意する。
  そのメソッド名をオリジナルの変数名に再利用すればいい。

### Read-only "power"

読み取り専用プロパティーを、アンダーバー変数をラップするアクセッサープロパティー
`get` だけを定義し、`set` を定義しないことで表現する。

囲み記事が指摘する事実をすっかり忘れていた。
普通のメソッドの形式でアクセッサーを実装すると引数リストを利用できる。

### Private "#waterLimit"

プライベートメンバーを `#` から始まる名前で定義できる。
このようなメンバーには、定義したクラスの内部からしかアクセスできない。

* 試したところ、これにアクセスするコードは実行時エラーというより、構文エラーになる。
* 例えば `#x` と `x` は別の識別子として扱われる。
* プライベートメンバーには角括弧記法ではアクセスできない規則がある。

## Extending built-in classes

<!-- https://javascript.info/extend-natives -->

最初の例は注意していないと見落とす。`Array` のサブクラスにメソッド `filter` を呼び出すと
戻り値の型もそのサブクラスであるという。
これは `filter` あるいはその他の類似メソッドが `Array` 決め打ちではなく、
引数の `constructor` を呼び出すからだ。

逆に、このような配列を返す組み込みメソッドが `Array` を返すようにしたい場合は、
サブクラスに特別な静的アクセッサープロパティー `Symbol.species` を追加すればいい。

```javascript
class PowerArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }

    //...
}
```

上の事情は `Array` 以外の組み込みコレクション型とそのサブクラスにも当てはまる。

### No static inheritance in built-ins

組み込み型同士では静的メソッドは継承されない。ユーザー定義型同士とは異なる。

## Class checking: "instanceof"

<!-- https://javascript.info/instanceof -->

演算子 `instanceof` を使うと、あるオブジェクトが特定のクラスのものであるかをテストできる。
このテストでは間接的な is-a 関係も考慮される。

### The instanceof operator

```javascript
obj instanceof Class
```

* `instanceof` はプロトタイプ鎖を調べてチェックする。
* 静的メソッド `Symbol.hasInstance` を実装して `instanceof` のテストを壊すことも可能。
* `obj instanceof Class` は `Class.prototype.isPrototypeOf(obj)` と同じことだ。

プロトタイプの鎖が重要なのであって、コンストラクターは
`instanceof` テストにほとんど関係ない。

### Bonus: Object.prototype.toString for the type

メソッド `toString` が型を判定する機能としても有用であることを述べている。
型の名前が文字列で返ってくることが大きい。

#### Symbol.toStringTag

メソッド `toString` の動作を、特別なオブジェクトプロパティー
`Symbol.toStringTag` を使用してカスタマイズすることができる。
出力文字列 `[object XXXX]` の `XXXX` 部分を指定する。

環境固有のオブジェクトのほとんどは、これを採用している。

### Tasks

#### Strange instanceof

本文で述べたとおり、`instanceof` はコンストラクターではなくプロトタイプを重視する。

## Mixins

<!-- https://javascript.info/mixins -->

### A mixin example

Mixin を実装する簡単な方法は、使えるメソッドを持つオブジェクトを作り、
それを任意のクラスのプロトタイプにマージできるようにすることだ。

```javascript
let sayHiMixin = {
    // useful methods...
};

class User {
    // ...
}

Object.assign(User.prototype, sayHiMixin);
```

あるいは、この手法と `extends` による継承機能を併用する。

### EventMixin

任意のクラスなりオブジェクトなりに、イベント関連の関数を簡単に追加できる Mixin を作ることを考える。

Mixin の仕様：

* `trigger(name, ...data)`: イベントを発生させる。
  * `name`: イベントの名前
  * `data`: イベントのデータ
* `on(name, handler)`: イベント `name` が起こると関数 `handler` を呼び出すようにする。
* `off(name, handler)`: イベント `name` の関数 `handler` を呼び出さないようにする。

利用例。
メニュー項目が選択されたときにイベント "select" を生成し、
他のオブジェクトは、そのイベントに反応するハンドラーを割り当てることができる。

```javascript
class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}

Object.assign(Menu.prototype, eventMixin);
```

メニューの選択に反応するコードが必要な場合は
`menu.on` でそれを listen することができる。

```javascript
menu.on("select", value => alert(`Value selected: ${value}`));
```

```javascript
menu.choose("123");
```

このような動作をクラスに追加することが、継承の連鎖を邪魔することなくできる。
