---
title: JavaScript Fundamentals
---

## Hello, world!

JavaScript をブラウザーを使って学んでいく。

### The script tag

* HTML コードにおける `SCRIPT` タグの書き方
* スクリプトファイルをロードするための書き方
* メッセージ表示は関数 `alert()` を当面使う。

### Modern markup

古の記法を紹介している。

### External scripts

`SCRIPT` タグの `src` 属性の意味と、その値がある場合にはタグの子部分は無視されることを説明。

### Tasks

#### Show an alert

問題はもう解けている。サンドボックスの使い方に慣れるのを目的とする。

#### Show an alert with an external script

これは前の問題のサンドボックスで作業するといい。

## Code structure

### Statements

C/C++ と同様。

### Semicolons

セミコロンの扱いが他言語とかなり異なる。コメント欄には異端だと言い切る人さえいる。
もっとも、statement のケツに必ず置くように習慣づければ、どうということはない。

### Comments

* コメントは C/C++ 方式。
* テキストエディターだとショートカットキー一発で on/off できるはずだとある。

## The modern mode, "use strict"

ECMAScript 5 (ES5) は JavaScript に新しい機能を追加し、既存の機能のいくつかを修正した。
古いコードの動作を維持するため、こうした変更のほとんどはデフォルトではオフになっている。
特別なディレクティブである "use strict" で明示的に有効にする必要がある。

### "use strict"

この単なる文字列で表されるディレクティブ？をスクリプトの一行目に書くようにする。

### Browser console

ブラウザーの開発ツールのコンソールで "use strict" するのに、単一コマンド行では意味がない。

### Should we "use strict"?

* クラスやモジュールでは自動的に "use strict" モードなので、明示的に書くものではない。
* 本書では断りのない限り "use strict" モードであることを想定している。

## Variables

変数概念に関する記述。宣言と定義を同時に行えるなど、他言語の変数概念と大きく違うようなことはない。

### A variable

キーワード `let` を用いて変数を宣言することができる。

* 他の言語と同様に、宣言と同時に値を定義することができる。
* 単一の `let` と複数のカンマを用いて、一度に複数の変数を宣言することもできる。
* 古いコードで `var` 変数を見かけるが、これは自分ではやらないようにすること。

### A real-life analogy

パッと見た感じでは Python の普通の変数に似ている。

* 囲み記事。関数プログラミング言語では、変数の更新が禁止されているという説明が興味深い。

### Variable naming

* JavaScript の仕様から来る変数名の制限、大文字と小文字を区別する、
  予約語は識別子として利用できない、など。
* 慣習として、変数名をキャメルケースで与える様式が一般的だ。
* ラテン文字ではない識別子も許されているが、おすすめされないこと。
* "use strict" モードは、宣言されていない変数への値の代入がエラーとなる。

### Constants

値が変化しない変数を定数という。これは `let` の代わりにキーワード `const` で宣言されるものだ。

* しばらくコードを書くと感じるが、C/C++ のそれとは意味が異なる。

#### Uppercase constants

定数定義を二種類に分類しているのは興味深い。言われてみるとこの命名法はしっくりくる。

### Name things right

命名規則についての常識的な記述。

### Tasks

#### Working with variables

プログラマーでこれを理解していないということはあり得ない。

#### Giving the right name

最初の変数は `let` ではなく `const` のほうがしっくりくる。

#### Uppercase const?

著者の主張を理解しているかどうかを確認する問題。

## Data types

* 値はいつでも何らかの型がある。
* JavaScript には基本データ型が 8 種ある。ここではそのうちのほとんどを扱うが、
  その他は別の章で理解を深める。

### Number

JavaScript では整数と浮動小数点数を同じ型で取り扱う。四則演算などが可能だ。

* 通常の数値のほかに、いわゆる「特殊な数値」もこのデータ型に属する：
  * `Infinity` は、どんな Number 型の値よりも大きい値として定義されている。
  * `NaN` は未定義の数学的操作の結果を表す値として定義されている。
    * `NaN` をオペランドとする操作の結果もまた `NaN` となる。例外として、
      `NaN` のゼロ乗が 1 になることだけ注意。要注意。
* 算術演算は「安全」、すなわち例外を送出しない。

### BigInt

絶対値が巨大な整数型は `BigInt` 型の値として扱うしかない。

* `BigInt` 型のリテラルは `n` の suffix を添える。例えば `2n ** 53n` のように。
* 説明文にある 2 の 53 乗というマジックナンバー的な値をよく覚えておくといい。

### String

文字列リテラルは引用符のペアで囲んで定義する。引用符はマッチしていれば三種類が使える。

* バッククォートはその他の引用符とは異なり、Python の f-string と似た機能である
  `${...}` が有効になる。
* Python と同様に、文字型はない。

### Boolean (logical type)

概念は他言語と同様。リテラルについては C++ と同じ。

### The "null" value

Python でいう None のような概念だ。これまでに述べられているどの型の値でもない。

### The "undefined" value

値 `undefined` は値 `null` と似ているが、意味は「値が割り当てられてない値」だ。

* ただし、既存の変数に `undefined` を代入することができる。しかし、これをやるな。

### Objects and Symbols

これらの型の詳細は別の章で学ぶ。

* `Object` 型は複合型だ。データの集まりや、より複雑な実体を格納するために使われる。
* `Symbol` 型は、オブジェクトの一意な識別子を作成するために使用される。

### The typeof operator

演算子 `typeof` はオペランドの型を文字列で返す単項演算だ。

* 演算子であるので、`typeof` のオペランドに対する丸括弧は不要。
* モジュール、値 `null`, 関数の型に注意する。それぞれ "object", "object", "function" だ。

### Tasks

#### String quotes

易しい。

## Interaction: alert, prompt, confirm

ブラウザー環境ではこれら三つのメッセージボックス表示関数が用意されていて、
いずれもモーダルであることが述べられている。

### alert

関数 `alert()` は OK ボタンしかないモーダルダイアログボックスを表示する。

### prompt

関数 `prompt()` はテキストボックスを一つ、OK ボタンと Cancel ボタンを有するモーダルダイアログボックスを表示する。
戻り値はテキストボックスに入力されている値だ。

```javascript
result = prompt(title, [default]);
```

| Parameter | Description |
|-----------|-------------|
| `title` | ユーザーに見せるテキスト |
| `default` | テキストボックスの初期値を指定する |

* 本書では引数リストにある角括弧は、その引数がオプショナルであることを表す。
* Internet Explorer が初期値を `undefined` にしてしまうので、
  空文字列を `default` とするほうがいい。

### confirm

関数 `confirm()` は OK ボタンと Cancel ボタンを有するモーダルダイアログボックスを表示する。

```javascript
result = confirm(question);
```

* 引数 `question` はダイアログボックスのテキストだ。
* 戻り値は `true` または `false` で、ユーザーの押したボタンに対応する。

### Tasks

#### A simple page

易しい。

## Type Conversions

`Object` 型以外の型からの型変換、特に自動変換に関する規則。頭に叩き込んでおきたい。

明示的な変換は他言語と同様の方式でよい。

### String Conversion

* 文字列への変換が必要なところでは、だいたい自動的にその変換がなされる。
* 明示的な変換は `String(value)` のようにする。

### Numeric Conversion

* 数への変換が必要なところでもそうなるが、いつ変換なのかが見極めにくい。
  この除算の例は、よそ者からすると異様に見える。
* 明示的な変換は `Number(value)` のようにする。
* 単項算術演算子はオペランドを `Number` 型に暗黙的に変換する。
  特に、何でもかんでも `+` を付けるパターンが頻出する。

本書の表を確認。

### Boolean Conversion

* `Boolean` 型への変換が必要なところでは、自動的にその変換がなされる。
* 明示的な変換は `Number(value)` のようにする。
* 直観的に「空」である値、空文字列、`null`, `undefined`, `NaN` は `false` に評価される。

## Basic operators, maths

### Terms: "unary", "binary", "operand"

JavaScript 固有ではない情報。

### Maths

算術演算子は Python と同様のようだ。

### String concatenation with binary +

二項演算 `+` でオペランドが両方とも文字列の場合には、両者を連結した新しい文字列を返す。
一方が文字列型であれば、他方は文字列に暗黙的に変換されてそれらが連結された文字列を評価する。

算術演算子でオペランドを文字列に変換する可能性があるものは、これだけだ。

### Numeric conversion, unary +

この単項演算子はオペランドを可能な限り `Number` 型の値に変換する。
その記法の簡便さゆえ、明示的な変換 `Number(value)` は使われないようだ。

### Operator precedence

演算子の優先度という概念があるということを、まずは理解しておくに留める。

### Assignment

代入演算子は C/C++ と同じような感じだ。

#### Chaining assignments

この仕様も。

### Modify-in-place

C/C++ と同様。

### Increment/decrement

C/C++ と同様。

### Bitwise operators

シフト演算子 `>>>` は初めて見る。

### Comma

カンマ演算子を使うと、いくつかの式を `,` で区切って評価することができる。
それぞれは評価されるものの、最後の一つの結果を全体？の結果とする。

### Tasks

#### The postfix and prefix forms

古の C 言語の教科書にあるような問題だ。

#### Assignment result

これも。

#### Type conversions

この内容は JavaScript らしさが感じられる。自動変換のコツをつかむといい。
本文中にあったように、文字列への変換は二項演算 `+` でしか起こり得ないことと、
演算評価の優先度に気をつければ解決する。

#### Fix the addition

どう修正するのが JavaScript のコードらしいのかを気にする。

## Comparisons

`false == 0` が `true` に評価されるのが怖いので `===` のようなものが用意されているのだろう。
`null == 0` や `undefined == 0` は `false` に評価される。
怖いのだが、変数を `null`, `undefined`, 0 と比較することはめったにない。

## Conditional branching: if, '?'

やるなら `alert()` の実引数に書くことだ。

## Logical operators

`2 && 3` が `3` に評価されるのは本当に怖い。書き間違いではない。
A value is returned in its original form, without the conversion.

## Nullish coalescing operator '??'

`??` と `||` / `&&` の共用はさすがに禁止されている。

## Loops: while and for

ラベルの仕様はいにしえの言語のそれと同じか？

## The "switch" statement

* 関数定義のスコープは前方にも届く。これについては後ほどの lexical environment の議論で繰り返される。
* `switch` に与えた値と各 `case` の値とのマッチングは `===` で評価されるようだ。
  したがって値の型が問題になる。

## Functions

関数定義の基本形式、局所変数、関数はすべて closure であること（これは別の章で詳述される）、
引数リスト、デフォルト引数、呼び出し時に足りない引数が `undefined` で補充されること、
戻り値などの基本概念が述べられている。

## Function expressions

関数は値の一種であり、適当な変数に割り当てることができる。Python のように処理できる。

## Arrow functions, the basics

他言語で言うラムダ式に相当する関数だ。JavaScript の記法はきわめて単純でありがたい。

```javascript
(arg1, arg2, ..., argN) => expression;
```

## JavaScript specials

ここまでのまとめ。
