---
title: Promises, async/await
---

## Introduction: callbacks

* 最初の `loadScript()` は常識らしい。
* `script.onload` と `script.onerror` をセットで覚える。
* コールバックベース非同期処理の問題点を理解すること。

## Promise

* マルチスレッド処理でよく説明される consumer/producer のパターンで理解する。
* `Promise` の executor の引数 `resolve`, `reject` がそれぞれ前項の `onload`, `onerror` に対応する。
* `Primise` のメソッドでいちばん基本的かつ重要なのは `then()` だ。
  「消費者」処理を指定する。
  * `.catch(f)` の指定は `.then(null, f)` と同値。
* `resolve()` 呼び出しは最初の一度しか意味がない。

## Promises chaining

* `then()` が新しい `Promise` を返すことに注意して、そこにメソッド呼び出しを連鎖するのが急所。
* `then()` を実装した `Promise` 互換なクラスを定義するのもアリ。
* 非同期処理はつねに `Promise` を返すのが good practice だ。
* `then()` はその結果なりエラーなりを次の `then()` なり `catch()` なりに渡す。

## Error handling with promises

* チェインのケツで `catch()` を呼び出すと、どのステップの例外もここで捕捉される。
* `Promise` の executor の周りには見えない `try` ブロックがあると考える。
* ブラウザーの場合には、`Promise` が送出した捕捉されなかった例外を扱うイベントハンドラーがある。

## Promise API

クラスメソッドの紹介。

* `Promise.all()` は並行処理を join するイメージでよい。結果からなる配列を返す。
  エラーがなにか一つでも発生すると、すべてが無になる。
  また、未済処理が中断されるようなことはない。
  All or nothing な条件のときに利用するといい。
* `Promise.allSettled()` はそのマイルド版。
* `Promise.race()`, `Promise.any()` は一つでいい場合に使う。エラーを確認する場合は前者を使う。

## Promisification

`Promise` を返す関数を定義する。

* もう一度確認するが、コールバックと違って `Promise` は一度きり。

## Microtasks

* `Promise` のいつものメソッドは非同期的に呼び出される。
* `Promise` の準備ができると、そのハンドラー各種は FIFO キューに入れられるが、実行はまだされない。
  現在の実行コードから解放されると、キューからタスクが取り出されて実行される。

## Async/await

* `async function` 宣言された関数は、自動的に中身を `Promise` に包まれてそれを返す。
* 何かを `await` すると、CPU は終了まで他のコードを実行することができるかもしれない。
* 現代的なブラウザーでは、モジュール最上位レベルでの `await` がうまく働く。
* `async function` 関数にあるむき出しの `throw` 文は `Promise.reject` に相当する。
* 演習問題 1 を VS Code で書くと、この関数は `async function` にできるのではと指摘される。
* 演習問題 3 がいちばん易しいが、念のため出題されている。
