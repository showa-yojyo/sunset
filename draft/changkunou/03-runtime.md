---
title: Modern C++ Tutorial C++ 11/14/17/20 On the Fly - Chapter 03 - Language Runtime Enhancements 読書ノート
---

[Chapter 03: Language Runtime Enhancements](https://changkun.de/modern-cpp/en-us/03-runtime/)
読書ノート。

## 3.1 Lambda Expression

ラムダ式は現代の C++ で最も重要な機能の一つであり、ラムダ式は匿名関数のように機
能する。匿名関数が使えるのは、関数が必要だが、それを呼び出すのに名前を使いたくな
いときだ。こういう状況は何度も何度もある。それゆえ匿名関数は、現代のプログラミン
グ言語のほとんどでは標準で備わっている。というようなことを著者は述べている。

### Basics

ラムダ式の構文をまず頭に叩き込む。関数定義の構文に対応物がない高栄養素である捕捉
リストを見ていく。それをまず三つに分類する：

1. value capture: 通常関数の値渡しに対応する。
2. reference capture: 通常関数の参照渡しに対応する。
3. implicit capture: 捕捉リストをコンパイラーに任せる。`&` や `=` を書くことで、
   参照や値のキャプチャーを宣言することができる。

| 記法 | 分類 |
|------|--------------------|
| `[]` | 空 |
| `[name1, name2, ...]` | 値捕捉 |
| `[&]` | 参照捕捉（コンパイラー自身に参照リストであることを推論させる） |
| `[=]` | 値捕捉（コンパイラー自身に値リストであることを推論させる） |

もう一つの類型がある。理解には rvalue の概念に加え、スマートポインターの知識が必要。
後回しにする。

4. expression capture: TBW

### Generic Lambda

ラムダ関数の仮引数にキーワード `auto` を使えばテンプレートのように扱える。

```c++
void lambda_generic() {
    auto generic = [](auto x, auto y) {
        return x + y;
    };

    std::cout << generic(1, 2) << std::endl;
    std::cout << generic(1.1, 2.2) << std::endl;
}
```

JavaScript 感覚だ。

## 3.2 Function Object Wrapper

この機能は標準ライブラリの一部であり、C++ のランタイム機能を強化するものだ。この
部分も重要なので、導入のためにここに記すとある。

### `std::function`

ラムダ式の本質は、関数オブジェクト型に似たクラス型のオブジェクトであるということ
だ。前者と後者をそれぞれクロージャー型、クロージャーオブジェクトと呼ぶ。ラムダ式
の捕捉リストが空の場合、クロージャーオブジェクトを関数ポインター値に変換して受け
渡すことなども可能だ。本文の例コードから `auto` や `using` が便利であることがわかる。

これらから callable の概念が抽象化され、それをラップするのが `std::function` だ。
関数ポインターに比べれば型安全度が相対的に高い。関数ポインターをラップする例：

```c++
#include <functional>
#include <iostream>

int foo(int para) {
    return para;
}

int main() {
    std::function<int(int)> func = foo;
    std::cout << func(10) << std::endl;
}
```

ラムダ式をラップする例：

```c++
#include <functional>
#include <iostream>

int main() {
    int important = 10;
    std::function<int(int)> func = [&](int value) -> int {
        return 1 + value + important;
    };
    std::cout << func(10) << std::endl;
}
```

### `std::bind` and `std::placeholder`

関数呼び出しの実引数を束縛するために `std::bind` が使われる。実引数の用意ができ
るタイミングがバラバラのときに有用だ：

```c++
int foo(int a, int b, int c) {
    // ...
}

int main() {
    // bind parameter 1, 2 on function foo,
    // and use std::placeholders::_1 as placeholder for the first parameter.
    auto bindFoo = std::bind(foo, std::placeholders::_1, 1, 2);
    
    // when call bindFoo, we only need one param left
    bindFoo(1);
}
```

## 3.3 rvalue Reference

rvalue は、C++11 での導入により歴史的な問題を大量に解決した重要な概念だ。
`std::vector`, `std::string` などの余分なオーバーヘッドを排除し、関数オブジェク
トコンテナー `std::function` の実現を可能にするものだ。

### lvalue, rvalue, prvalue, xvalue

TODO: 以前描いた図式をここに転載する。

pvalue (pure rvalue, purely rvalue) は、

* `10`, `true` などの純粋なリテラルか、
* `1 + 2` などの評価結果がリテラルまたは匿名一時オブジェクトと等価である

かのどちらかだ。非参照によって返される一時変数、演算式によって生成される一時変
数、元のリテラル、ラムダ式はすべて純粋な rvalue 値だ。特に、リテラル（文字列リテ
ラルを除く）は prvalue だ。文字列リテラルは `const char` 配列型の lvalue である
とする。

xvalue (expiring value) は C++11 が rvalue 参照を導入するために提案した概念で
（つまり従来の C++ では、prvalue と rvalue は同じ概念）、破棄されるが移動できる
値を意味する。

```c++
std::vector<int> foo() {
    std::vector<int> temp = {1, 2, 3, 4};
    return temp;
}

std::vector<int> v = foo();
```

ここで `foo()` で生成された戻り値は一時的な値だ。`v` にコピーされると即座に破棄
され、取得・変更することはできない。 C++11 以降、コンパイラーは lvalue である
`temp` に対して、`static_cast<std::vector<int> &&>(temp)` と同等の暗黙の rvalue
変換を行い、`v` は `foo` が返す値をローカルに move させるという作業を行うように
なった。

### rvalue reference and lvalue reference
### Move semantics
### Perfect forwarding
### Conclusion
### Further Readings
