---
title: cplusplus.com C++ Language 超速読ノート
status: WIP
---

C++11 新機能に絞ってチェックする。C++14 以降はたぶん記載がない。

# Introduction

## Compilers

```console
g++ -std=c++0x example.cpp -o example_program
```

# Basics of C++

## Structure of a program

C++03 と変わらず。

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

C++03 と変わらず。ここが変わっていたら従来のコードが死ぬので当然だ。

## Basic Input/Output

C++03 と変わらず。

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

C++03 と変わらず。

## Overloads and templates

C++03 と変わらず。

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

C++03 と変わらず。可能な限り '\0' 終端文字列の使用を避ける。

## Pointers

次のどちらも有効な記法だ：

```c++
int * p = 0;
int * q = nullptr;
```

## Dynamic Memory
## Data structures
## Other data types

# Classes

## Classes (I)
## Classes (II)
## Special members
## Friendship and inheritance
## Polymorphism

# Other language features

## Type conversions
## Exceptions
## Preprocessor directives

# C++ Standard Library

## Input/Output with files
