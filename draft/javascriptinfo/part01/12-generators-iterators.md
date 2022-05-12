---
title: Generators, advanced iteration
---

## Generators

* `function*`, `yield`, `next()`
* どういうわけか `[Symbol.iterator]: function*()` を `*[Symbol.iterator]()` と書ける。
* `yield*` 構文もある。Python の `yield from` みたいな感じだ。

## Async iteration and generators

* `Symbol.asyncIterator` を採用することで非同期的 iterable を定義する。
  メソッド `next()` を `async` とする。言い換えると `Promise` を返す。
* ループでそのような iterable を反復するときは `for await` 文を用いる。
* `async function*` 構文で非同期 generator を定義する。
