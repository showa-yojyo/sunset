---
title: Chapter 09 Minor Features
---

[Chapter 09 Minor Features](https://changkun.de/modern-cpp/en-us/09-others/)
読書ノート

## 9.1 New Type

### `long long int`

C99 の時点で C 標準に含まれていたため、ほとんどのコンパイラーがすでに対応済みだ。
C++11 では正式に標準ライブラリーに組み込まれ、少なくとも 64 ビット長の型だ。

## 9.2 `noexcept` and Its Operations

C++11 以前は、関数名の後に例外宣言式 `throw(xxx)` を書く人はほぼ皆無だった。
C++11 からはこの仕組みは非推奨となった。

C++11 では例外宣言を二つの場合に単純化している：

1. 関数は例外を投げる可能性がある
2. 関数は例外を投げることができない

この両方の動作を制限するために `noexcept` を使用する。

`noexcept` 関数が例外を発生させた場合、コンパイラーは `std::terminate()` を使っ
てプログラムを直ちに終了させる。

`noexcept` は式を操作する演算子としても使用でき、式に例外がない場合は `true`
を、そうでない場合は `false` を返す。次のコードはその例だ。対象の関数を実際には
呼び出さない。コンパイル時に評価していると考えられる。

```c++
int main()
{
    std::cout << std::boolalpha
        << "may_throw() noexcept? " << noexcept(may_throw()) << std::endl
        << "no_throw() noexcept? " << noexcept(no_throw()) << std::endl
        << "lmay_throw() noexcept? " << noexcept(non_block_throw()) << std::endl
        << "lno_throw() noexcept? " << noexcept(block_throw()) << std::endl;
    return 0;
}
```

`noexcept` 修飾子は関数の後に例外の拡散をブロックする効果があり、内部で例外が発
生しても外部で発動することはない。

ここにある例コードは本節の文脈では意味がない。通常の例外処理の動作に見える。

## 9.3 Literal

### Raw String Literal

丸括弧を引用符の内側に書く必要があるに注意。つまり `R"(` と `)"` で囲むというこ
とだ。これは C++11 から利用可能な記法だ。

```c++
R"(raw string literal)"
```

### Custom Literal

二重引用符接尾辞演算子をオーバーロードすることで、リテラルをカスタマイズする機能
が C++11 から導入されている。

```c++
// String literal customization must be set to the following parameter list
std::string operator"" _wow1(const char *wow1, size_t len) {
    return std::string(wow1) + "woooooooooow, amazing";
}

std::string operator"" _wow2 (unsigned long long i) {
    return std::to_string(i) + "woooooooooow, amazing";
}

int main() {
    auto str = "abc"_wow1;
    auto num = 1_wow2;
    std::cout << str << std::endl;
    std::cout << num << std::endl;
    return 0;
}
```

最初の演算子オーバーロードで `const char*` リテラルに対する接尾辞 `_wow1` が有効
になる。ソースコード中にこのままタイプするとコンパイルが通る。

カスタムリテラルが対応する型は四つだ：

1. 整数リテラル。オーバーロードは次の引数を使用する必要がある：
   * `unsigned long long`
   * `const char*`
   * テンプレートリテラル演算子
2. 浮動小数点演算子。オーバーロードは次の引数を使用する必要がある：
   * `long double`
   * `const char*`
   * `テンプレートリテラル`
3. 文字列リテラル。`(const char*, size_t)` 引数リストを使用する必要がある。
4. 文字リテラル。引数は次のもののみ使用可能：
   * `char`
   * `wchar_t`
   * `char16_t`
   * `char32_t`

## 9.4 Memory Alignment

キーワード `alignof` と `alignas` が C++ で導入された。

まず整列 (alignment) の概念を確認する。すべてのオブジェクト型には整列要件と呼ば
れる性質がある（型に対する性質であることに注意）。その型のオブジェクトを割り当て
ることが可能な連続したアドレス間のバイト数を表すような 2 のべき乗である値で表さ
れる。

* `alignof(T)` で `T` の整列要件値をコンパイル時に評価する。
* 最小整列要件は `char`, `signed char` `unsigned char` のそれとなる。すなわち 1
  に等しい。

次の構造体を考える：

```c++
struct Storage
{
    char      a;
    int       b;
    double    c;
    long long d;
};
```

`alignof(Storage)` は 8 になる。メンバーに対する `sizeof` 値の最大値が 8 だから
だ。

`alignas` 指定子を用いた宣言によって宣言されたオブジェクトまたは型は、その自然な
整列を弱めることにならない場合に限り、その整列要件値は、その宣言で使用されたすべ
ての`alignas` 指定子の最も厳しい（最大）非ゼロ式に等しくなる。

```c++
struct alignas(std::max_align_t) AlignasStorage
{
    char      a;
    int       b;
    double    c;
    long long d;
};
```

`std::max_align_t` はヘッダーファイル `<cstddef>` に定義されている。
`std::max_align_t` は通常、最大のスカラー型と同義だ。大半のプラットフォームでは
`long double` であり、したがってその整列要件は 8 または 16 に等しい。手許の環境
では 16 のようだ。

上の構造体 `AlignasStorage` の `alignof` 値は、`alignas` なし版構造体と比べると
`alignof` 値が異なる。上述の環境では指定の意図どおり 16 に等しい。

## Conclusion

この中では `noexcept` が最も重要な機能だ。コンパイラーがコードを最大限に最適化す
る効果もある。
