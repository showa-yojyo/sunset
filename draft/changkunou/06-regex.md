---
title: Chapter 06 Regular Expression
---

[Chapter 06 Regular Expression](https://changkun.de/modern-cpp/en-us/06-regex/)
読書ノート

## 6.1 Introduction

正規表現は C++ の部分でない。よって割愛。

## 6.2 `std::regex` and Its Related

従来は Boost を利用して正規表現に対応していた。C++11 からは正規表現が正式に標準
ライブラリーに組み込まれた。これでサードパーティーに依存することがなくなった。

C++11 の正規表現ライブラリーは

1. `std::string` オブジェクトを操作し、
2. パターン `std::regex` (`std::basic_regex`) オブジェクトを初期化して
3. `std::regex_match` でマッチさせ
4. `std::smatch` (`std::match_results`) オブジェクトを生じる

という手順を想定している。

`std::regex_match` は文字列と正規表現のマッチングに使われ、さまざまなオーバー
ロードが存在する。単純な形式は `std::string` と `std::regex` を渡すものだ。マッ
チするか否かを `bool` 値で返す。

```c++
#include <iostream>
#include <string>
#include <regex>

int main() {
    const std::string fnames[] = {
        "foo.txt", "bar.txt", "test", "a0.txt", "AAA.txt"
    };

    const std::regex txt_regex(R"([a-z]+\.txt)");
    for (const auto &fname: fnames){
        std::cout << fname << ": " << std::regex_match(fname, txt_regex) << std::endl;
    }

    return 0;
}
```

`std::string`/`std::smatch`/`std::regex` の三つの引数を渡すのもよくある。
`std::smatch` の本質は `std::match_results` にある。標準ライブラリーでは
`std::smatch` は `std::match_results<std::string::const_iterator>` と定義されており、
これは部分文字列反復子型の `match_results` を意味する。
`std::smatch` を使うと、例えば、マッチング結果を容易に得ることが可能だ。

```c++
const std::regex base_regex(R"(([a-z]+)\.txt)");
for(const auto &fname: fnames) {
    std::smatch base_match;
    if (std::regex_match(fname, base_match, base_regex)) {
        // the first element of std::smatch matches the entire string
        // the second element of std::smatch matches the first expression
        // with brackets
        if (base_match.size() == 2) {
            auto base = base_match[1].str();
            std::cout << "sub-match[0]: " << base_match[0].str() << std::endl;
            std::cout << fname << " sub-match[1]: " << base << std::endl;
        }
    }
}
```

## Conclusion

割愛。

## Exercise

これまでの二、三章分の内容が一つの演習に凝縮されているようだ。歯応えがあり過ぎる
ので後回しにするか、ギブアップするだろう。

## Further Readings

1. [如何评价 GCC 的 C++ 11 正则表达式？ - 知乎](https://www.zhihu.com/question/23070203/answer/84248248):
   C++11 の `<regex>` はこのスレの Tim Shen 先生が開発したものが出発点となっているようだ。
2. [Regular expressions library (since C++11) - cppreference.com](https://en.cppreference.com/w/cpp/regex):
   機能一覧が一ページにまとめられている。
