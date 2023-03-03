---
title: Modern C++ Tutorial C++ 11/14/17/20 On the Fly - Chapter 02 - Language Usability Enhancements 読書ノート
---

[Chapter 02: Language Usability Enhancements](https://changkun.de/modern-cpp/en-us/02-usability)
読書ノート。

プログラム実行以前に起こる言語動作を言語可用性と呼ぶことがある。宣言、変数や定数
の定義、コードの流れの制御、オブジェクト指向関数、テンプレートプログラミングなど
が該当する。

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

C++17 では `if` 文と `switch` 文の丸括弧内で変数宣言＆初期化が可能となった。
`for` 文の初期化部分と同じようなものと考えられる。

### Initializer list

従来の C++ ではオブジェクトによって初期化方法が異なる。普通の配列、POD は中括弧
記法で初期化できる。これを初期化リストと呼ぶ。一方、クラスオブジェクトの初期化に
は、コピー構文を使うか、丸括弧を使う（コンストラクター呼び出し）必要がある。

C++11 では `std::initializer_list` を用いてクラスオブジェクトの初期化を通常の配列と
POD 初期化方法と同様の記法で行えるようにすることが可能だ。

```c++
#include <initializer_list>
#include <vector>

class MagicFoo {
    std::vector<int> vec;
public:
    MagicFoo(std::initializer_list<int> list) {
        for (std::initializer_list<int>::iterator it = list.begin();
             it != list.end(); ++it)
            vec.push_back(*it);
    }
};
```

上のコンストラクターがあれば、次のようにオブジェクトを生成できる：

```c++
MagicFoo magicFoo = {1, 2, 3, 4, 5};
```

この種のコンストラクターを初期化リストコンストラクターと呼ぶ。
この例ではコンストラクターを実装したが、通常の関数の引数リストでも初期化リストを置ける。

### Structured binding

Python や JavaScript で見るような他の言語で提供されている複数戻り値に似た機能だ。
C++17 から次のように書ける：

```c++
auto [x, y, z] = std::make_tuple(1, 2.3, "456");
```

## 2.3 Type inference

C++11 では `auto` と `decltype` というキーワードを導入して型導出を実装し、コンパ
イラーに変数の型を考慮させるようにした。他の現代的プログラミング言語と同じくらい
に変数の型を気にしなくていいようになった。

### `auto`

`auto` は従来の C++ では、変数が `register` 宣言されていなければ、自動的に自動変
数として扱われるというものだったが、C++11 から意味が全然異なるものに変貌した。

```c++
auto i = 5;              // i as int
auto arr = new auto(10); // arr as int *
```

C++ 20以降、関数の引数としても `auto` を使うこともできる。

```c++
int add(auto x, auto y) {
    return x+y;
}
```

### `decltype`

キーワード `decltype` はコンパイラーに式からその型を推論する。例：

```c++
auto x = 1;
auto y = 2;
decltype(x+y) z;
```

### tail type inference

新しい順に述べる。C++14 では次の関数テンプレートの戻り値型 `auto` が適法だ：

```c++
template<typename T, typename U>
auto add(T x, U y){
    return x + y;
}
```

C++11 の時点から次のような文法があった。戻り値型のところに
`decltype(x+y)` と書ければ一貫性があるのだが、この時点ではコンパイラーは
式を構成する `x`, `y` が何であるか解らないので、このような新文法ができた：

```c++
template<typename T, typename U>
auto add(T x, U y) -> decltype(x+y){
    return x + y;
}
```

従来の C++ では戻り値型もテンプレート型に書かざるを得なかった。
これでは呼び出しコードを書くのが面倒だ：

```c++
template<typename R, typename T, typename U>
R add(T x, U y) {
    return x+y;
}
```

### `decltype(auto)`

後回しにせよとあるので、そうする。

## 2.4 Control flow

### `if constexpr`

C++17 では `if` 文に `constexpr` キーワードが導入され、コードの中で定数式の条件
を宣言することができる。コンパイル時に分岐判定を完了させればプログラムを効率化で
きる。

```c++
template<typename T>
auto print_type_info(const T& t) {
    if constexpr (std::is_integral<T>::value) {
        return t + 1;
    } else {
        return t + 0.001;
    }
}
```

### Range-based for loop

C++11 では範囲ベースの反復法が導入され、Python のように簡潔なループが書ける。

```c++
for (auto element: vec)
    std::cout << element << std::endl; // read only
for (auto &element: vec)
    element += 1;                      // writeable
```

## 2.5 Templates

テンプレートの思想は、コンパイル時に処理できる問題はすべてコンパイル時に放り込
み、実行時にはそれらのコアな動的サービスのみを処理することで、実行時の性能を大幅
に最適化することにある。

### Extern templates

従来の C++ では、テンプレートは使用されるときにしかコンパイラによってインスタンス化
されない。つまり、各コンパイル単位 (.cpp) でコンパイルされたコードの中に、完
全に定義されたテンプレートが存在する限り、そのテンプレートはインスタンス化される
ことになる。その結果、インスタンス化が繰り返されるため、コンパイル時間が長くなる。

このため、C++11 ではテンプレートをインスタンス化するタイミングをコンパイラーに明
示的に指示できるようにした。次の構文により実現する：

```c++
extern template class std::vector<double>; // should not instantiation in current file
```

### The ">"

次のコードは C++11 からはコンパイルエラーが生じなくなっている：

```c++
std::vector<std::vector<int>> matrix;
```

### Type alias templates

前提として「テンプレートは型ではない」ことを理解しておく。

C++11では `using` を使って次のような別名宣言を与えることができる：

```c++
// typedef int (*process)(void *);
using NewProcess = int(*)(void *);
```

```c++
template<typename T, typename U>
class MagicType {
    // ...
};

template<typename T>
using TrueDarkMagic = MagicType<std::vector<T>, std::string>;
```

### Variadic templates

テンプレート引数リストが可変個になり得る：

```c++
template<typename... Ts> class Magic;
```

引数を一個以上にしたいならばこう書けばいい：

```c++
template<typename Require, typename... Args> class Magic;
```

テンプレート引数と同様にして、関数引数でも `...` 表記を用いて可変長引数を表現で
きる：

```c++
template<typename... Args> void printf(const std::string &str, Args... args);
```

引数の個数は `sizeof...` で得られる。仮引数自体のアクセス方法は複数ある。
まずは再帰テンプレート展開だ：

```c++
template<typename T0>
void printf1(T0 value) {
    // ...
}

template<typename T, typename... Ts>
void printf1(T value, Ts... args) {
    // ...
    printf1(args...);
}
```

次に、C++17 の変数引数テンプレート展開に対応したやり方だ：

```c++
template<typename T0, typename... T>
void printf2(T0 t0, T... t) {
    // ...
    if constexpr (sizeof...(t) > 0) printf2(t...);
}
```

最後に、初期化リストとラムダ式を組み合わる方法を紹介してこの節は終わっている。
ラムダ式のほうが未習得なので後回しにする。

### Fold expression

C++17

```c++
template<typename ... T>
auto sum(T ... t) {
    return (t + ...);
}
```

### Non-type template parameter deduction

C++17 からテンプレート引数リストに `auto` を書ける：

```c++
template <auto value> void foo() {
    // ...
}

int main() {
    foo<10>();  // value as int
}
```

## 2.6 Object-oriented

### Delegate constructor

C++11 からコンストラクターが同じクラス内の別のコンストラクターを呼び出すことがで
きる。コードの簡略化が図られる。コロンのあとから中括弧を開くまでの部分から呼び出せる。

### Inheritance constructor

C++11 ではキーワード `using` を使って継承コンストラクターの概念を導入している。
派生クラスに対して、基底クラスと同じ引数リストのコンストラクターを利用できる仕組みだ：

```c++
class Base{
    int value1;
    int value2;
public:
    Base() : value1(1){}

    // delegate Base() constructor
    Base(int value) : Base(), value2(value) {}
};

class Subclass : public Base {
public:
    // inheritance constructor
    // E.g. Subclass s{3};
    using Base::Base;
};
```

### Explicit virtual function overwrite

昔から C++ をやっているプログラマーならば、次のメンバー関数 `Subclass::foo` は
polymorphism が効くことがわかるが、現代の C++ では紛れがないようにする工夫が加
わった。

```c++
struct Base {
    virtual void foo();
};

struct SubClass: Base {
    void foo();
};
```

### override

仮想関数に対して明示的に `override` と修飾すると、それが基底クラスにある場合に限り、
当該メンバー関数をコンパイラーが認めるようになる。

```c++
struct Base {
    virtual void foo(int);
};

struct SubClass: Base {
    virtual void foo(int) override; // legal
    virtual void foo(float) override; // illegal, no virtual function in super class
};
```

### final

本書の記述からすると、キーワード `final` は Java にある概念を拝借したものと思われる。

```c++
struct Base {
    virtual void foo() final;
};

// legal
struct SubClass1 final: Base {};

// illegal, SubClass1 has final
struct SubClass2 : SubClass1 {};

struct SubClass3: Base {
    // illegal, foo has final
    void foo();
};
```

* `final` 宣言されたクラス (e.g. `Subclass1`) を継承することは許されない。
* `final` 宣言された仮想関数 (e.g. `Base::foo`) をオーバーライドすることは許されない。

### Explicit delete default function

一定の条件下で特別メンバー関数をコンパイラーが自動生成するという挙動を、現代の
C++ ではキーワードを付与することで抑止させることが可能だ。逆に、自動生成を明示的
に命じることも可能だ：

```c++
class Magic {
public:
    Magic() = default; // explicit let compiler use default constructor
    Magic& operator=(const Magic&) = delete; // explicit declare refuse constructor
    Magic(int magic_number);
}
```

自動生成を有効にするには、メンバー宣言を明示的に与え、そのセミコロンの直前に `=default` を記す。
反対に無効にするには、同様に `=delete` を記す。

### Strongly typed enumerations

`enum class` の説明。別の本でやったので省略。

* 列挙型の値の既定型が `int` であるという解釈になる。
* 値を出力したい場合に面倒な手続きを踏むと読める。

### Conclusion

現代の C++ における言語操作性の向上について、最も重要な機能だと思われるものは次
のものだと著者は述べている：

* 自動型推論
* 反復の範囲
* 初期化リスト
* 可変長変数引数テンプレート

### Exercises

いずれも C++17 以上でコンパイルする必要がある。

1. このプログラムがやりたいことは、マップの値を対応するハッシュ値に置き換えるこ
   とだ。構文は `main` 関数の最後にあるとおり。
   * `&&` は `&` でも動作する。
2. 本文中の `sum` の例をベースにすると楽であることはすぐにわかる。
   * 引数の個数がゼロである場合の考慮は不要。コンパイルエラーで構わない。
