---
title: Generators, advanced iteration
---

## Generators

<!-- https://javascript.info/generators -->

ジェネレーターとは、関数の特殊な形態であって、複数の値を次から次へと、
必要に応じてすぐに返すものをいう。データストリームを作るのに有用だ。

### Generator functions

ジェネレーターを定義するには専用の構文を書く：

```javascript
function* generateSequence() {
    // function body...
}
```

* 本体には `yield` 文が現れる。
* ジェネレーター関数は、呼び出し時に通常の関数とは異なる動作をする。
  コードを実行せず、代わりに、ジェネレーターオブジェクトと呼ばれる特別なオブジェクトを返す。

ジェネレーターの主要メソッドは `next()` だ。
呼び出されると最も近い `yield` 文まで実行する。
その後、関数の実行は一時停止し、`yield` された値が呼び出し側のコードに返される。

メソッド `next` が返すオブジェクトにはプロパティーが二つある：

| Property | Description |
|----------|-------------|
| `value` | `yield` 文または `return` 文の値 |
| `done` | コードが完了したかどうか |

### Generators are iterable

そういうわけで、ジェネレーターに `for...of` ループを適用できる。
ただし、ループは `return` の値を無視するので、
ジェネレーター関数で `return` 文で値を返さないように定義するのがいい。

ジェネレーターに対して `...` を適用できる。配列に変換される。

### Using generators for iterables

以前習った `range` をジェネレーター関数に書き直す。

```javascript
let range = {
    from: 0,
    to: 5,

    // a shorthand for [Symbol.iterator]: function*()
    *[Symbol.iterator]() {
        for(let value = this.from; value < this.to; value++) {
            yield value;
        }
    }
};
```

### Generator composition

ジェネレーター合成とは、ジェネレーター同士を透過的に「埋め込む」ことを可能にする特別な機能だ。
それには `yield*` 文を使う。

```javascript
function* generatePasswordCodes() {
    // 0..9
    yield* range(48, 58);

    // A..Z
    yield* range(65, 91);

    // a..z
    yield* range(97, 123);
}
```

### "yield" is a two-way street

ジェネレーターは結果を呼び出し側に返すだけでなく、呼び出し側がジェネレーターの内部に値を渡すこともできる。
引数を指定して `generator.next(arg)` を呼び出せばいい。これが受信側 `yield` 文の戻り値となる。

<!-- sequence diagram -->

### generator.throw

ジェネレーターには値だけでなく、エラーを送出することもできる。
エラーオブジェクトを指定して `generator.throw(err)` を呼び出せばいい。
すると、受信側 `yield` 文で送出されたかのように働く。

* 例外処理ブロックは、ジェネレーター関数内部と呼び出し側のどちらかに置く可能性がある。
  用途による。

### generator.return

ジェネレーターを呼び出し側から停止させるには `generator.return(value)` を呼び出す。

* 終了したジェネレーターに対して `generator.return` を使用すると、
  さっき指定した値が再び返される。
* 多くの場合、これを使うことはないのだが、特定の条件で停止させたいときに便利だ。

### Tasks

#### Pseudo-random generator

問題よりも `Math.random` には seed を指定する機能がないという事実のほうが重要だ。

## Async iteration and generators

<!-- https://javascript.info/async-iterators-generators -->

非同期反復処理では、非同期で送られてくるデータを必要なときにすぐに反復処理することができる。
さらに、非同期ジェネレーターを使えばもっと便利になる。

* `Symbol.asyncIterator` を採用することで非同期的 iterable を定義する。
  メソッド `next()` を `async` とする。言い換えると `Promise` を返す。
* ループでそのような iterable を反復するときは `for await` 文を用いる。
* `async function*` 構文で非同期 generator を定義する。

### Recall iterables

以前習った、単なる反復版の `range` を今一度確認する。

### Async iterables

それを非同期版にする。コードを少々変更するだけでよい：

* `[Symbol.iterator]` を `[Symbol.asyncIterator]` に置き換える。
* メソッド `next` を `async` にする。これで `Promise` を返すようになる。
* 呼び出し側のループは `for await` 文を使う。

通常の同期反復を必要とする機能は、非同期反復では動作しない。

### Recall generators

以前習ったジェネレーター版 `range` を今一度確認する。

### Async generators (finally)

それを非同期版にする。コードを少々変更するだけでよい：

* ジェネレーター関数を `async` にする。これで `Promise` を返すようになる。
* 呼び出し側のループは `for await` 文を使う。

ループではなく、手動で反復する場合には `await generator.next()` と書く。

#### Async iterable range

`*[Symbol.iterator]()` を `async *[Symbol.asyncIterator]` のように書く。

### Real-life example: paginated data

終わりが不明であるループから非同期関数 `fetch` を呼び出すような状況では、
非同期ジェネレーターパターンが普通に顔を出すと見た。
