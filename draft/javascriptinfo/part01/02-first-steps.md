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

数値の比較は他の言語と同様の比較演算子が JavaScript にもある。

### Boolean is the result

比較演算のすべてが `Boolean` 型の値に評価される。

### String comparison

文字列型の値に対して比較演算子を作用させることができる。評価は lexicographical 順序に基づく。

* 本文の記述からは、各文字の値は Unicode のコードポイントの値であると考えられる。

### Comparison of different types

異なる型の値を比較すると、数でないほうが数に変換され、それから評価される。

### Strict equality

JavaScript では演算子 `==` に難がある。
`null == 0` や `undefined == 0` が `false` に評価される。
上に述べた評価手順が本質的に不便なのだ。

* 比較演算子 `===` は型の暗黙的変換を生じないで値を比較する。したがって、
  オペランド同士の型が異なるだけで、この式は `false` に評価される。
* 比較演算子 `!==` はその否定を返す。

### Comparison with null and undefined

`null` や `undefined` が他の値と比較されたときに直感的でない動作をする。

* `null === undefined` は `false` に評価される。両辺の型が異なるからだ。
* `null == undefined` は `true` に評価される。これは例外的な動作だと覚えておく必要がある。
* `null` と `undefined` が数に暗黙的に変換されるときには、0 と `NaN` にそれぞれ評価される。

#### Strange result: null vs 0

`null` は自身と `undefined` を除き、何に対しても等しくないと評価される。

それゆえ、例えば `null == 0` は `false` と評価される。

#### An incomparable undefined

`undefined` は、自身と `null` を除いて、何に対しても等しくなく、大きくなく、小さくないと評価される。

怖いのだが、変数を `null`, `undefined`, 0 と比較することはめったにない。

#### Avoid problems

これらの問題を回避する確実な方法。

* 等号 `===` を除き、`undefined` や `null` との比較は慎重に扱う。
* これらの値である可能性がある変数で `>`, etc. は使わない。
* これらの値である可能性がある変数については、個別にチェックする。

### Tasks

#### Comparisons

次のは特に理解を確認しておくこと：

```javascript
undefined == null
undefined === null
null == "\n0\n"
null === +"\n0\n"
```

## Conditional branching: if, '?'

`if` 文は C/C++ と同様の構文だ。JavaScript には条件演算子やその派生形が妙に豊富にある。

### The "if" statement

C/C++ と同様。

### Boolean conversion

自動変換のコツのところで見たように評価される。

### The "else" clause

C/C++ と同様。

### Several conditions: "else if"

C/C++ と同様。

### Conditional operator '?'

C/C++ と同様。

### Multiple '?'

C/C++ と同様だと思うが、やったことがない。

### Non-traditional use of '?'

このようなコードは書かない。

### Tasks

#### if (a string with zero)

"0" が Boolean に自動変換されると、この文字列は空でないので `true` に評価される。

#### The name of JavaScript

素直な問題。

#### Show the sign

ユーザーが必ず数を入力してくれるという前提なので、

* 関数 `prompt()` で得られる文字列を数に明示的に変換する必要はない。
* 題意のとおりの条件分岐を書く。

#### Rewrite 'if' into '?'

素直な問題。

#### Rewrite 'if..else' into '?'

素直でない問題のような気がする。

## Logical operators

古典的な C/C++ などの言語と同様の演算子と、そうでない演算子がある。
まずは前者を見ていく。

### || (OR)

* オペランドが両方とも `Boolean` ならば、C/C++ などの言語と同様に評価される。
* オペランドが `Boolean` でないものについては、JavaScript の流儀で `Boolean` 値に暗黙的に変換される。

### OR "||" finds the first truthy value

* OR 演算評価が `Boolean` になるとは限らない。最初の例は文字列にしかならないことに注意。
* よその言語と同様に short-circuit 評価がなされる。

### && (AND)

* オペランドが両方とも `Boolean` ならば、C/C++ などの言語と同様に評価される。
* オペランドが `Boolean` でないものについては、JavaScript の流儀で `Boolean` 値に暗黙的に変換される。

### AND "&&" finds the first falsy value

* OR と同様に AND 演算評価が `Boolean` になるとは限らない。
  `2 && 3` が `3` に評価されるのは本当に怖い。書き間違いではない。
* よその言語と同様に short-circuit 評価がなされる。

### ! (NOT)

基本用途は他の言語と同様。

* 値を明示的に `Boolean` に変換する手段として、`!!value` のように書くことがある。
  これは `Boolean(value)` と書くよりも早い。

### Tasks

演習問題が異様に多い。怖い問題もあるが、面倒なので省略。

## Nullish coalescing operator '??'

二項演算子 `??` の定義。

* 式 `a ?? b` は、`a` が `null` でも `undefined` でもなければ `a` と評価される。
* そうでなければ、つまり `a` が `null` または `undefined` であれば `b` と評価される。

```javascript
(a !== null && a !== undefined) ? a : b;
```

演算子 `??` の主な用途はデフォルト値を与えることだ。

### Comparison with ||

演算子 `||` とは評価基準が異なる。例えば上のコードで `a` が 0 や `false` の場合を考えろ。

### Precedence

演算子 `??` の優先度は演算子 `||` と同じとされている。

#### Using ?? with && or ||

`??` と `||` / `&&` の共用は、安全上の理由により禁止されている。

## Loops: while and for

### The "while" loop

C/C++ と同様。

### The "do...while" loop

C/C++ と同様。

### The "for" loop

`for` 文は括弧の中の書き方が複数あるが、いちばん初歩的な記法は C/C++ のそれと同様。

#### Skipping parts

これも同様。初歩的な `for` 文の括弧の中のパーツは適宜省略可能だ。

### Breaking the loop

他言語と同じ意味の `break` 命令も用意されている。

### Continue to the next iteration

他言語と同じ意味の `continue` 命令も用意されている。

### Labels for break/continue

* ループ周辺に限定して、ラベルを定義することができる。
* ループ中からそのラベルにジャンプするときに `break` または `continue` を使える。
  それぞれの命令の「引数」にラベルを書く。要するに C 言語の `goto` 文だ。

### Tasks

#### Last loop value

最後の反復時の `i` の値は 1 であることはすぐにわかる。
したがって `i--` の評価である 1 を `alert()` 呼び出しは表示する。

#### Which values does the while loop show?

類題。ループの理解というより、ウンクリメント演算子の理解テストだ。

#### Which values get shown by the "for" loop?

この場合にはどちらのループも同じ挙動を示す。

#### Output even numbers in the loop

個人的には `i += 2` としたい。

#### Replace "for" with "while"

ループカウンターをループでしか使わないコードだから、意味がない演習のように見えてしまう。
実際にはこれを覚えておくと何かと有用だ。

#### Repeat until the input is correct

ユーザー入力をループ終了条件に用いる場合には、かなりの注意を要することが窺える。

#### Output prime numbers

まだ関数の定義方法を学習していないので、二重ループで書くことを余儀なくされる。
ものすごく効率の悪いアルゴリズムであるが、それは問わない。

## The "switch" statement

JavaScript の `switch` 文は、型チェックの違いからか、C 言語のそれよりも複雑になっている。

* 関数定義のスコープは前方にも届く。これについては後ほどの lexical environment の議論で繰り返される。

### The syntax

構文自身は C 言語のものと同じだが、`case` のオペランドの値の型に制約がないようだ。
`switch` に与えた値と各 `case` の値との比較は演算 `===` で評価される。

### An example

C 言語と同じように、`break` を抜かすと、次の `case` の最初の文が実行される。

### Grouping of "case"

`break` を書かない時の挙動を活かして、複数の `case` 文をまとめる手法がある。

### Type matters

`case` での評価が `===` でによるということは、文の実行時には、値が型まで一致していることが期待されるということだ。

### Tasks

#### Rewrite the "switch" into an "if"

基本的な理解を試す問題。

#### Rewrite "if" into "switch"

上の逆問題。

## Functions

関数定義の基本形式、局所変数、関数はすべて closure であること（これは別の章で詳述される）、
引数リスト、デフォルト引数、呼び出し時に足りない引数が `undefined` で補充されること、
戻り値などの基本概念が述べられている。

### Function Declaration

関数定義の基本形式は次のとおり。

```javascript
function functionName(parameterList) {
    statements;
}
```

### Local variables

局所変数。関数内で宣言された変数は、関数の中からしかアクセスできない。

### Outer variables

関数の内部から、その外側のスコープで宣言された変数にアクセスすることができる。
ここは Python とはかなり異なる。

### Parameters

関数引数は、シンプルな型の値は値渡しとなる。

### Default values

C++ と同様。

#### Alternative default parameters

呼び出し時に足りない実引数は、関数内部で値が `undefined` になる。

### Returning a value

他の言語と同様に `return` 文が存在する。

### Naming a function

関数の名前の付け方の流儀は MDN や仕様書を眺めていれば感じられる。

### Functions == Comments

どういう関数が良い関数なのかを述べている。これは言語に依らない。

### Tasks

気が向いたらやればいい。

#### Is "else" required?

不要。

#### Rewrite the function using '?' or '||'

こういう状況では条件演算子を使えないという感覚がある。

#### Function min(a, b)

初学者以外はやらなくていい。

#### Function pow(x, n)

初学者以外はやらなくていい。前章のループの復習にはなる。

## Function expressions

関数は値の一種であり、適当な変数に割り当てることができる。Python のように処理できる。

### Function is a value

関数を `let` 変数などに代入したり、関数の引数として扱ったりできる。

### Callback functions

特に、関数の引数であるような関数であって、その内部で呼び出されるものをコールバックと呼ぶ。

### Function Expression vs Function Declaration

`let` や `const` などの変数で宣言されたものとは対照的に、
通常の形式で定義された関数は、定義前の行からそれを参照することができる。
これは "use strict" モードにおいても可能だ。

## Arrow functions, the basics

他言語で言うラムダ式に相当する関数だ。JavaScript の記法はきわめて単純でありがたい。

```javascript
(parameterList) => expression
```

* 引数がない場合には `() => ` から始める。
* 引数が一つの場合には、関数リストを宣言する丸括弧を省略することもできる。
* 式が単一の `return` 文の場合には、戻り値自体を書くだけとすることもできる。

### Multiline arrow functions

中括弧で複文を与えることもできる。こうなると普通の関数とほとんど変わらない：

```javascript
(parameterList) => {
    statements;
}
```

### Tasks

#### Rewrite with arrow functions

簡単なためか、重要度が与えられていない。

## JavaScript specials

ここまでのまとめ。ノート省略。
