---
title: cplusplus.com C++ Language 超速読ノート
status: RC
---

https://cplusplus.com/doc/

C++11 新機能に絞ってチェックする。C++14 以降はたぶん記載がない。

# Introduction

## Compilers

```console
g++ -std=c++0x example.cpp -o example_program
```

# Basics of C++

## Structure of a program

C++03 以前と変わらず。

## Variables and types

以前学習したように、大量の標準予約キーワードが追加されている。プログラマーはこれ
らを識別子として使うことが禁じられている。

文字型に `char16_t`, `char32_t` が追加されていることを確認。
前者の `sizeof` は最低でも 16 はある。

次は忘れやすいので覚えておく：

> The properties of fundamental types in a particular system and compiler
> implementation can be obtained by using the numeric_limits classes (see
> standard header `<limits>`). If for some reason, types of specific sizes are
> needed, the library defines certain fixed-size type aliases in header
> `<cstdint>`.

次の形式の変数初期化 (uniform initialization) が C++11 から導入：

```c++
int x {0};
std::string mystring {"This is a string"};
```

型推論二種。キーワード `auto` と `decltype` によりコンパイラーに型を推論させる：

```c++
// auto
int foo = 0;
auto bar = foo;  // the same as: int bar = foo; 
```

```c++
int foo = 0;
decltype(foo) bar;  // the same as: int bar; 
```

## Constants

新文字型リテラルを定義するのにソースコード中に下記接頭辞が有効（大文字小文字を区別する接尾辞はこれらだけ）：

| Character type | Prefix |
|----------------|--------|
| `char16_t` | u |
| `char32_t` | U |

文字列に関してはさらなる接頭辞がある。こちらの事情は Python と似ている。

```c++
R"(string with \backslash)"
```

ソースコードを UTF-8 で書くならば文字列リテラルに `u` 接頭辞を付加する。

以上の接頭辞は複合可能。

`true`, `false` に加えて `nullptr` というキーワードリテラル定数が追加。

## Operators

C++03 以前と変わらず。ここが変わっていたら従来のコードが死ぬので当然だ。

## Basic Input/Output

C++03 以前と変わらず。

# Program structure

## Control Structures

次の形式の `for` ループを書けるようになった。積極的に採用するべし：

```c++
string str {"Hello!"};
for (auto c : str)
{
  cout << "[" << c << "]";
}
```

## Functions

C++03 以前と変わらず。

## Overloads and templates

C++03 以前と変わらず。

## Name visibility

名前空間に別名を付けられる：

```c++
namespace new_name = current_name;
```

# Compound data types

## Arrays

次の形式の初期化 (universal initialization) が可能になった：

```c++
int foo[] { 10, 20, 30 };
```

クラステンプレート `std::array` が追加された。従来から標準コンテナーの扱いに慣れ
ていれば容易く習得できる。

## Character sequences

C++03 以前と変わらず。可能な限り '\0' 終端文字列の使用を避ける。

## Pointers

次のどちらも有効な記法だ：

```c++
int * p = 0;
int * q = nullptr;
```

## Dynamic Memory

標準ヘッダー `<new>` にある `std::nothrow` で演算子 `new` を指示すると、
メモリー確保に失敗したときに例外 `std::bad_alloc` を送出するのではなく、
`null_ptr` を返す。

```c++
int* foo = new (nothrow) int [5];
if (foo == nullptr) {
  // error assigning memory. Take measures.
}
```

普通は例外版のほうがありがたい。

## Data structures

C++03 以前と変わらず。

## Other data types

型別名を定義する構文が導入された：

```c++
using C = char;
using WORD = unsigned int;
using pChar = char *;
using field = char [50];
```

`typedef` よりもこの `using` による別名定義のほうが優秀だ：

> Both aliases defined with typedef and aliases defined with using are
> semantically equivalent. The only difference being that typedef has certain
> limitations in the realm of templates that using has not. Therefore, using is
> more generic, although typedef has a longer history and is probably more
> common in existing code.

`enum class` が導入された。型安全性が保たれる `enum` と考えられる。

1. 値は型名で修飾されるのが必須だ。
2. 基底クラスを指定することが可能だ。

```c++
enum class EyeColor : char {blue, green, brown};
```

# Classes

## Classes (I)

次の記法で対応するコンストラクターを呼び出せるようになった：

```c++
class_name object_name { value, value, value, ... };
```

または昔ながらの構造体の初期化の記法で：

```c++
class_name object_name = { value, value, value, ... };
```

中括弧記法を使う利点は、括弧と違ってコンパイラーに関数宣言と混同されないことにある。
言い換えると、デフォルトコンストラクターを明示的に呼び出すのに使えることだ。

コンストラクター定義のメンバー変数初期化でも中括弧記法が適用可能だ：

```c++
Cylinder::Cylinder (double r, double h) : base{r}, height{h} { }
```

## Classes (II)

C++03 以前と変わらず。ところで、このチュートリアルにはテンプレートに関する言及が今のところ少ない。

## Special members

特別メンバー関数とは次の六関数を指す（一定の条件下でコンパイラーが自動的に生成するようなもの）：

| Member function | typical form for class `C` |
|---------------------|---------|
| Default constructor | `C::C();` |
| Destructor | `C::~C();` |
| Copy constructor | `C::C (const C&);` |
| Copy assignment | `C& operator= (const C&);` |
| Move constructor | `C::C (C&&);` |
| Move assignment | `C& operator= (C&&);` |

最後の二つが C++11 からの新機能だ。

移動はコピーとは異なり、実際にあるオブジェクトから他のオブジェクトへ中身が移動す
る。元オブジェクトはその中身を失う。この移動は、元オブジェクトが無名である場合に
のみ起こる。無名オブジェクトの典型的な例としては、関数の戻り値や型が挙げられる。
このような一時的なオブジェクトの値を他のオブジェクトの初期化や値の代入に使用する
場合、コピーは実際には必要ない。元オブジェクトは他の何かに使用されることはないた
め、その中身を移動先のオブジェクトに移動することができる。このような場合に、移動
コンストラクターと移動代入演算子が呼び出される。

```c++
MyClass (MyClass&&);             // move-constructor
MyClass& operator= (MyClass&&);  // move-assignment 
```

型の後に `&&` が付いた参照を rvalue という。

移動の概念は、`new` や `delete` でストレージを確保、管理するオブジェクトで最も有用だ。

特別メンバーの暗黙的な定義の許可をコンパイラーに指示することもできる。
構文を説明する以外の意味がない例だが：

```c++
class Rectangle {
    int width, height;
  public:
    Rectangle (int x, int y) : width(x), height(y) {}
    Rectangle() = default;
    Rectangle (const Rectangle& other) = delete;
    int area() {return width*height;}
};
```

## Friendship and inheritance

C++03 以前と変わらず。

## Polymorphism

C++03 以前と変わらず。

# Other language features

## Type conversions

`static_cast` で rvalue にキャストするコードを記述できる。

## Exceptions

システムとしては C++03 以前と変わっていないが、標準ライブラリーに名前が
`bad_` から始まる `std::exception` 派生クラスが何個か追加されている。

## Preprocessor directives

`__cplusplus` など、値が更新されているシンボルがある。

# C++ Standard Library

## Input/Output with files

C++03 以前と変わらず。
