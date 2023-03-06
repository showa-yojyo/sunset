---
title: Chapter 07 Parallelism and Concurrency
---

[Chapter 07 Parallelism and Concurrency](https://changkun.de/modern-cpp/en-us/07-thread/)
読書ノート

## 7.1 Basic of Parallelism

* `std::thread` が並行プログラミングの基礎となるものだ。
* 使用する際には `<thread>` ヘッダーファイルを含める。
* ID を取得する `get_id()` やスレッドに参集する `join()` など、基本的な操作が多数ある。

```c++
#include <iostream>
#include <thread>

int main() {
    std::thread t([](){
        std::cout << "hello world." << std::endl;
    });
    t.join();
    return 0;
}
```

## 7.2 Mutex and Critical Section

C++11 では排他制御に関連するクラス群が導入され、関連するすべての関数が `<mutex>`
ヘッダーファイルに記述されている。

C++11 で最も基本的な排他制御クラスは `std::mutex` だ。これをインスタンス化するこ
とで排他制御ができる。メンバー関数 `lock()`/`unlock()` で施錠、解錠することがで
きる。しかし、実際にはこれらを直接呼び出さない方がよい。C++11 では RAII 対応した
クラステンプレート `std::lock_guard` も用意されている。

```c++
int v = 1;

void critical_section(int change_v) {
    static std::mutex mtx;
    std::lock_guard<std::mutex> lock(mtx);

    // execute contention works
    v = change_v;

    // mtx will be released after leaving the scope
}
```

オブジェクト `lock` がスタックに生成されるため、 `critical_section()` が正常に返
ろうが、途中で例外が発生しようが、スコープ終了時点でスタックのロールバックが発生
し、デストラクター経由で `unlock()` が自動的に呼び出されることに注意する。

## 7.3 Future
## 7.4 Condition Variable
## 7.5 Atomic Operation and Memory Model
### Atomic Operation
### Consistency Model
### Memory Orders
## Conclusion
## Exercises
## Further Readings
