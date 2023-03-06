---
title: Chapter 05 Smart Pointers and Memory Management
---

[Chapter 05 Smart Pointers and Memory Management](https://changkun.de/modern-cpp/en-us/05-pointers/)
読書ノート。

## 5.1 RAII and Reference Counting

* 参照カウンターの概念をおさらいしておくこと。
* RAII の格言を忘れぬこと。

従来の C++ ではリソースを解放するために `new` と `delete` を使うことを忘れないよ
うにする必要があった。C++11 で参照カウンターを利用したスマートポインターの概念が
導入され、プログラマーが手動で解放することを気にする必要がなくなった。
ヘッダーファイル `<memory>` をインクルードしてスマートポインター各種を用いる。

参照カウンターはガベージコレクションの手法よりも、不用オブジェクトを早く回収する
ことができ、再利用処理中に長い待ち時間が発生することはない。資源の寿命をより明確
に示す。

## 5.2 `std::shared_ptr`

クラステンプレート `std::shared_ptr` がいちばん普通の参照カウンター方式スマート
ポインターであり、カウンターがゼロになると管理下の資源を解放する。

関数テンプレート `std::make_shared` を使えば、明示的に `new` を使う必要がなくな
る。 `std::make_shared` は指定引数からオブジェクトを生成、確保する。そして、この
オブジェクト型の `std::shared_ptr` オブジェクトを返す。

```c++
auto pointer = std::make_shared<int>(10);
```

`std::shared_ptr` には次のようなメソッドがある：

| メソッド | 操作 |
|----------|------|
| `get()` | 生のポインターを得る |
| `reset()` | 参照カウントを減らす |
| `use_count()` | 参照カウントを見る |

コード例で注目したいのは：

* スマートポインターの宣言と初期化に `auto` を常に使う。
* コピーコンストラクターでカウンターが増える。
  この例では関数 `foo` の呼び出しが値渡しであるので、コピーが発動する。
* `reset()` を呼び出したスマートポインターの生のポインターは `nullptr` となる。
  かつ、共有関係にあるスマートポインターすべての参照カウンターが減る。

## 5.3 `std::unique_ptr`

スマートポインター `std::unique_ptr` は排他的で、同じ生ポインターを共有するよう
な他のスマートポインターの存在しないことを保証する。つまりコピーすることができな
い。しかし、`std::move` を使って、他の `unique_ptr` に移すことなどは可能であるこ
とに注意。

`std::make_shared` の `std::unique_ptr` 版は C++11 では存在しない。

## 5.4 `std::weak_ptr`

`std::shared_ptr` は次のような使い方をすると解放漏れが生じる：

```c++
class A;
class B;

class A {
public:
    std::shared_ptr<B> pointer;
    ~A(){}
};
class B {
public:
    std::shared_ptr<A> pointer;
    ~B(){}
};

auto a = std::make_shared<A>();
auto b = std::make_shared<B>();
a->pointer = b;
b->pointer = a;
```

ここで `std::weak_ptr` を採用する。これは参照カウンターを増やさない。
`A::pointer` または `B::pointer` の少なくとも一方の `shared_ptr` を `weak_ptr` にすれば
`A` と `B` 双方のデストラクターが作動する。

`std::weak_ptr` には `operator*` や `operator->` が実装されていないため、生の資
源を操作することはできない。

`std::weak_ptr` は `std::shared_ptr` が存在するかどうかをチェックすることができ
ます。

`std::weak_ptr::expired()` は資源が解放されていない場合に限り `false` を返す。

また、元のオブジェクトを指す `std::shared_ptr` を取得する目的で使用することもで
きる。

`std::weak_ptr::lock()` は、資源が解放されていない場合に限り、元の
`std::shared_ptr` を返す。

## Conclusion

多くの言語で一般的な技術であるスマートポインターだが、C++ ではこの技術が最近導入された。

## Further Readings

[c++ - Why does C++11 have `make_shared` but not `make_unique` - Stack Overflow](https://stackoverflow.com/questions/12580432/why-does-c11-have-make-shared-but-not-make-unique):
C++14 から `std::make_unique` が利用可能だ。
