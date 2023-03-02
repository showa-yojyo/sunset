---
title: Modern C++ Tutorial C++ 11/14/17/20 On the Fly - Chapter 02 - Language Usability Enhancements 超速読ノート
---

プログラム実行以前に起こる言語動作を言語ユーザビリティーと呼ぶことがある。宣言、
変数や定数の定義、コードの流れの制御、オブジェクト指向関数、テンプレートプログラ
ミングなどが該当する。

## 2.1 Constants

### `nullptr`

C++11 では本物の null pointer と整数値 0 を区別するために特別に使用される
`nullptr` キーワードが導入された。 `nullptr` の型は `nullptr_t` で、任意のポイン
ターやメンバーポインター型に暗黙的に変換できる。それらと `==` や `!=` で比較する
ことが可能。

`nullptr` を直接使う習慣を身に着けろ。

### `constexpr`

C++11 では、関数やオブジェクトのコンストラクターがコンパイル時に定数式になること
を明示的に宣言できる`constexpr` を用意している。このキーワードは、対象がコンパイ
ル時に定数式になることをコンパイラーに検証させるものだ。

C++14 から `constexpr` 関数は、ローカル変数、ループ、分岐などの簡単なステートメン
トが内部で使用可能になった。本書の再帰関数の例を確認しておくこと。

## 2.2 Variables and initialization

### `if`-`switch`

### Initializer list

### Structured binding

## 2.3 Type inference

### auto
### decltype
### tail type inference
### decltype

## 2.4 Control flow

### if constexpr
### Range-based for loop

## 2.5 Templates

### Extern templates
### The ">"
### Type alias templates
### Variadic templates
### Fold expression
### Non-type template parameter deduction

## 2.6 Object-oriented

### Delegate constructor
### Inheritance constructor
### Explicit virtual function overwrite
### override
### final
### Explicit delete default function
### Strongly typed enumerations
### Conclusion
### Exercises
