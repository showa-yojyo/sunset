---
title: Modern C++ Tutorial C++ 11/14/17/20 On the Fly - Chapter 04 Containers 読書ノート
---

[Chapter 04 Containers](https://changkun.de/modern-cpp/en-us/04-containers/)
読書ノート。|

## 4.1 Linear Container

### `std::array`

これはさすがに時間をかけずに理解できる。
`std::vector` にメソッド `shrink_to_fit` が追加されていることにむしろ注目したい。

### `std::forward_list`

使い方は `std::list` と同様。

* `std::list` の二重リンクリストの実装とは異なり、`std::forward_list` は単一リン
  クリストを使用して実装されている。
* 複雑さ $O(1)$ の要素挿入を提供し、高速ランダムアクセスをサポートしない（リンク
  リスト共通の特徴）。
* 標準ライブラリコンテナーの中で `size()` を提供しない唯一のコンテナー。
* 双方向の反復処理が必要ない場合，std::listより空間利用率が高い．

## 4.2 Unordered Container

従来の C++ からある順序付きコンテナー `std::map`/`std::set` のおさらいから。

* これらの型は内部的には赤黒木で実装されている。
* 挿入と検索の平均的な複雑さは $O(\log(N))$ だ。
* 要素を挿入する際には、演算子 `operator <` に従う。コンテナー内の要素を走査する
  場合、この順序による。

本節で紹介されるコンテナーでは、要素はソートされておらず、内部はハッシュ表で実装
されている。要素の挿入と検索の平均的な複雑さは $O(1)$ であり、要素の順序を気にす
ることなく、大幅な性能向上を達成することができる。

C++11 から次の四種のコンテナーが利用可能：

* `std::unordered_map`
* `std::unordered_multimap`
* `std::unordered_set`
* `std::unordered_multiset`

利用方法はそれぞれ対応する順序付きコンテナーと同様。

## 4.3 Tuples

Python プログラマーなので、この型の概念はすでに習得済みだ。操作方法に集中できる。

### Basic Operations

中核となる機能は次の三つ（いずれもフリー関数の形式であることに注意）：

| 関数 | 操作 |
|------|------|
| `std::make_tuple` | 生成する |
| `std::get` | 要素を得る |
| `std::tie` | unpack する |

`get()` はテンプレート引数に型を指示するか、インデックスを指示する：

```c++
std::tuple<std::string, double, double, int> t("123", 4.5, 6.7, 8);
std::cout << std::get<std::string>(t) << std::endl;
std::cout << std::get<double>(t) << std::endl; // illegal, runtime error
std::cout << std::get<3>(t) << std::endl;
```

`tie()` については、もっと簡潔な記法があったと以前述べられていた記憶があるが。

### Runtime Indexing

`get()` でインデックスを指示するのは（テンプレート引数で行うので）コンパイル時に
限る。これを動的に指定するには C++17 から用意されている `std::variant` を用い
る。本書のようなテンプレート関数 `tuple_index` を自前で書く必要がある。

### Merge and Iteration

* 二つの `tuple` オブジェクトを結合するには `std::tuple_cat` を用いる。
* `std::tuple_size<T>::value` で `tuple` の長さをコンパイル時に得る。

## Conclusion

現代 C++ の新しいコンテナーの使い方は、従来の C++ からある既存コンテナーと同様
だ。

`std::tuple` は効果的だが、標準ライブラリーでは機能が限られている。実行時のイン
デックスや反復処理の要件を満たす方法がない。やるなら方法を自前で実装する。
