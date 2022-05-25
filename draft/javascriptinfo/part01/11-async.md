---
title: Promises, async/await
---

## Introduction: callbacks

<!-- https://javascript.info/callbacks -->

この章では各種抽象的概念の使い方を示すために、ブラウザーのメソッドをいくつか使用する。
具体的には、スクリプトの読み込みと簡単な文書操作だ。

* 非同期アクションとは、今始めたアクションが、後で終了するようなものを意味するらしい。
* 最初の `loadScript()` は常識らしい。このコードは非同期的に処理される。
  つまり、スクリプトのロードが完了する前に、この関数の実行が終了することが一般的だ。
* `script.onload` にコールバックを指定する。
  スクリプトのロードが完了すると、呼び出されることになる関数だ。

コールバックベース非同期処理の問題点を理解すること。

### Callback in callback

三つのスクリプトを厳密に特定の順序でロードするには、このように
`loadScript()` のコールバックに `loadScript()` を含めることになる。

コードのインデントの深い部分にあるほど、ロード順序が遅い。

### Handling errors

`script.onload` と `script.onerror` をセットで覚える。
成功時と失敗時とでコールバックを使い分ける仕組みを理解する。

本文の例では、両方に同じコールバック関数を指定して、
呼び出された時の引数で成功か失敗かを区別、処理する方針を採っている。

### Pyramid of Doom

複数の非同期アクションが次々と続くと、本文のようなインデントの深いコードが出来上がる。
これはコードの管理をひじょうにやりにくい構造だ。

そこで、複数の非同期アクションを個別の関数にまとめて、インデントの深いコードを解消することを考える。
これでいちおう解決するが、関連のある処理が別々の場所に散ってしまい、全体の凝集度が下がってしまう。

## Promise

<!-- https://javascript.info/promise-basics -->

マルチスレッド処理でよく説明される consumer/producer のパターンで理解する。

```javascript
let promise = new Promise(function(resolve, reject) {
    // the producing code
});
```

`Promise` に渡す関数を executor と言う。
その引数 `resolve`, `reject` がそれぞれ前項の `onload`, `onerror` に対応する。

| Callback | Description |
|----------|-------------|
| `resolve(value)` | 実行が成功するとその結果 `value` を取って呼び出される |
| `reject(error)` | エラーが起こるとエラーオブジェクト `error` を取って呼び出される |

`Promise` が返すオブジェクトには次の隠しプロパティーがある：

* `state`
  * 初期値は文字列 "pending"
  * それから実行結果にしたがって文字列 "fulfilled" または "rejected" に変化する。
* `result`
  * 初期値は `undefined`
  * それから実行結果にしたがって `resolve` の実引数である `value` または
    `reject(error)` の実引数 `error` に変化する。

どちらのコールバックにおいても、結果オブジェクトは一つしか指定できない。

コールバック `reject` の実引数は `Error` 型であることが望ましい。

`Promise` executor はふつうは非同期的な処理を行うが、直ちに処理して
コールバックを呼び出して終了してもかまわない。

### Consumers: then, catch, finally

`Promise` のメソッド `then`, `catch`, `finally` を見ていく。

`Promise` オブジェクトは producer と、結果やエラーを受け取る consumer の間にある。
`Promise` のこれら三つのメソッドに渡すものが consumer だと考えられる。

#### then

`Primise` のメソッドでいちばん基本的かつ重要なのは `then` だ。
その引数リストは `Promise` のコンストラクター関数と同様だ：

```javascript
promise.then(
    function(result) { /* handle a successful result */ },
    function(error) { /* handle an error */ }
);
```

* 第一引数のコールバックは `promise` がその `resolve` を呼び出しで終了したとき、
  その結果 `result` を伴って呼び出される。
* 第二引数のコールバックは `promise` が `rejecct` 呼び出しで終了したときに、
  その結果 `error` を伴って呼び出される。

したがって、成功したときにしか興味がない場合には第一コールバックだけ渡せばいい。

#### catch

反対に、失敗したときにしか興味がない場合には `promise.catch` を呼び出す。

* `.catch(f)` の指定は `.then(null, f)` と同値。

#### finally

成功でも失敗でも行いたい処理を `promise.finally` で呼び出す。

* `finally` のコールバックには引数がない。
* `finally` のコールバックの結果は次のハンドラーに引き継がれる。

### Example: loadScript

前章の `loadScript` をコールバックベースから `Promise` ベースに書き換える。

### Tasks

#### Re-resolve a promise?

`resolve()` 呼び出しは最初の一度しか意味がない。

#### Delay with a promise

さっきの `loadScript` と同じ要領で `Promise` ベースのコードを書く。

#### Animated circle with promise

これは後日、相当未来になるだろうが、取り組む。

## Promises chaining

<!-- https://javascript.info/promise-chaining -->

次々と実行される非同期処理の連なりを `Promise` を使って書くことができる。
`then` を呼び出すたびに新しい `Promise` を返すようにして、そこにメソッド
`then` 呼び出しを連鎖するのが急所だ。

同一の `Promise` オブジェクトに対してメソッド `then` を何度も呼び出すということは普通はない。

### Returning promises

メソッド `then` に渡すコールバックは `Promise` オブジェクトを返すことができる。
すると、次の `then` 呼び出しが書け、そのコールバックの実引数は `Promise` のコールバックの結果を取る。

### Example: loadScript

本文の二つの `loadScript` の連続呼び出しのコードを見比べること。
メソッド `then` の呼び出しのケツにさらに `then` の呼び出しを重ねる方式のほうが望ましい。

* 厳密には、`then` の連鎖を形成したいならば、`Promise` を返す必要はない。
  代わりに同じ仕様のメソッド `then` を実装したオブジェクトを生成して返すのもアリだ。

### Bigger example: fetch

ネットワークリクエストには `Promise` がよく用いられる。

リモートサーバーから情報を読み込むにはメソッド `fetch` を使用する。

```javascript
let promise = fetch(url);
```

* この `promise` は、リモートサーバーがヘッダーで応答したときに、応答オブジェクトで解決される。
  ただし、完全な応答がダウンロードされるよりも前だ。
* 完全な応答を読むにはメソッド `response.text()` を呼び出す。
  これも `Promise` を返し、リモートサーバーからテキスト全部がダウンロードされたときに、
  そのテキストを結果にして解決するものだ。

非同期処理はつねに `Promise` を返すのが good practice だ。

### Tasks

#### Promise: then versus catch

念のため、このコードが動作するような `promise`, `f1`, `f2` を書いて検証するのがいいと思われる。

## Error handling with promises

<!-- https://javascript.info/promise-error-handling -->

`Promise` 鎖の構造はエラー処理にも向いている。

* チェインのケツで `catch()` を呼び出すと、どのステップの例外もここで捕捉される。

### Implicit try...catch

`Promise` executor やコールバックの周りには見えない `try` ブロックがあると考える。
エラーが起こると、それを捕まえて reject するように扱う。

```javascript
new Promise((resolve, reject) => {
    throw new Error("Whoops!"); // == reject(new Error("Whoops!"));
}).catch(alert);

new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    throw new Error("Whoops!"); // == reject(new Error("Whoops!"));
}).catch(alert);
```

### Rethrowing

`catch` コールバックで捕まえたエラーを処理できないことがわかったら、
`try...catch` 文と同様に、再送出すること。次の `catch` コールバックがそれを捕まえる。

### Unhandled rejections

ブラウザーの場合には、`Promise` が送出した捕捉されなかった例外を扱うイベントハンドラーがある。

```javascript
window.addEventListener('unhandledrejection', function(event) {
});
```

* ハンドラーの引数 `event` にはプロパティーが二つある。
  * `promise`: エラーを送出した `Promise` オブジェクト
  * `reason`: 処理されなかったエラーオブジェクトそのもの 

エラーが `Promise` 内で発生し、かつ処理できた `catch` がない場合、
`unhandledrejection` ハンドラーが反応し、エラーに関する情報を持つイベントオブジェクトを得る。

通常、このようなエラーは回復不能だ。
ユーザーに問題を通知し、サーバーに事故を報告することくらいしかやることがない。

* Node.js のような非ブラウザー環境では、処理されないエラーを追跡する方法が他にある。

### Tasks

#### Error in setTimeout

これを `catch` できないのは困ったものだ。エラー処理ごと `setTimeout` するしかない。

## Promise API

<!-- https://javascript.info/promise-api -->

クラスメソッドの紹介。

### Promise.all

```javascript
let promise = Promise.all(iterable);
```

`Promise.all()` は並行処理を join するイメージでよい。結果からなる配列を返す。
エラーがなにか一つでも発生すると、すべてが無になる。
また、未済処理が中断されるようなことはない。
All or nothing な条件のときに利用するといい。

### Promise.allSettled

`Promise.allSettled()` はそのマイルド版。すべての結果を求める場合には採用する。

結果は次のオブジェクトからなる配列だ：

* `{status: "fulfilled", value: result}`
* `{status: "rejected", reason: error}`

#### Polyfill

`Promise.allSettled` の実装例。

### Promise.race

`Promise.all` と似ているが、最初に決済された promise だけを待ち、その結果またはエラーを得る。

```javascript
let promise = Promise.race(iterable);
```

### Promise.any

`Promise.race` と似ている。最初に成功した promise だけを待ち、その結果を得る。
与えられた promise がすべて reject された場合、返された promise は
`AggregateError` で reject される。これにはエラー全てをが含むプロパティー `errors` がある。

```javascript
let promise = Promise.any(iterable);
```

### Promise.resolve/reject

現代では `async`/`await` 文がある。これらのメソッドはめったに用いられない。

#### Promise.resolve

`Promise.resolve(value)` は次と同じ：

```javascript
let promise = new Promise(resolve => resolve(value));
```

#### Promise.reject

`Promise.reject(error)` は次と同じ：

```javascript
let promise = new Promise((resolve, reject) => reject(error));
```

## Promisification

<!-- https://javascript.info/promisify -->

コールバックを入力とする関数を `Promise` を返す関数に変換することを考える。
後者のほうが便利なので、この変換は理にかなう。

本文では関数 `loadScript` を変更せず、それをラップする新しい関数を定義している。

さらに、この考えをもう一歩進めて、
「コールバックを入力とする関数を `Promise` を返す関数に変換する」関数 `promisify` を定義する。
このコードを理解するのに時間を要する。

ただし、最初のバージョンはそこまで一般的ではない。
関数 `promisify` は、元の関数がちょうど引数 `(err, result)` をとるコールバックを期待すると仮定している。

<!-- もう一度確認するが、コールバックと違って `Promise` は一度きり。 -->

## Microtasks

<!-- https://javascript.info/microtask-queue -->

`Promise` のメソッド `then`, `catch`, `finally` はすべて非同期的に呼び出される。
これらの呼び出しの下にある行のコードの実行が先に来る。

### Microtasks queue

非同期タスクには適切な管理のために内部キュー `PromiseJobs` がある。
これは V8 用語で the microtask queue と呼ばれる。

`Promise` の準備ができると、そのハンドラー各種は FIFO キューに入れられるが、実行はまだされない。
現在の実行コードから解放されると、キューからタスクが取り出されて実行される。

`Promise` ハンドラーは常にこの内部キューを通過する。

複数の `then`/`catch`/`finally` を持つ鎖があれば、その一つ一つが非同期に実行される。
つまり、まずキューに入り、現在のコードが完了し、
以前にキューに入ったハンドラーが終了したときに実行される。

### Unhandled rejection

キューの最後に処理されていない promise エラーがあるときに `unhandledrejection` イベントが発生する。

## Async/await

<!-- https://javascript.info/async-await -->

`Promise` を効果的に利用するための構文を学ぶ。

### Async functions

`async function` 宣言された関数は、自動的に中身を resolved な `Promise` に包んで返す。

キーワード `async` がついた関数は、それが `Promise` を返すことを保証し、
`Promise` でないものをそれに包むのだ。

### Await

キーワード `await` は非同期関数の中だけで機能する。
例えば、下のコードは `await` の行で一時停止することになる：

```javascript
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });

    // wait until the promise resolves
    alert(await promise); // "done!"
}
```

何かを `await` すると、CPU は終了まで他のコードを実行することができるかもしれない。

現代的なブラウザーでは、モジュール最上位レベルでの `await` がうまく働く。
開発ツールの Console でも `await` が可能だ。

厳密には、`await` を呼び出しに付けたいならば、オペランドは `Promise` である必要はない。
代わりに同じ仕様のメソッド `then` を実装したオブジェクトもアリだ。

フリー関数だけでなく、オブジェクトのメソッドに対しても `async` を付けられる。

### Error handling

`await promise` は reject された場合には、その行に `throw` 文があるかのようにエラーを送出する。

```javascript
async function f() {
    await Promise.reject(new Error("Whoops!")); // == throw new Error("Whoops!");
}
```

`async`/`await` を使う場合には `then` はほとんど必要ない。
`await` が待機時間をプログラマーに代わり処理する。
そして `catch` の代わりに通常の `try..catch` を使うことができる。

しかし、コードのトップレベルでは、非同期関数の外にいるとき、
文法上 `await` を使えないので、最終結果・エラーを処理する
`Promise` の `then`/`catch` を追加する。これはよくあるやり方だ。

### Summary

### Tasks

#### Rewrite using async/await

VS Code で書くと、この関数は `async function` にできるのではと指摘される。

#### Rewrite "rethrow" with async/await

このような `Promise` の `then` や `catch` 混じりの関数を
`async`/`await` で書き直すのは、かなり易しい。

#### Call async from non-async

非同期関数を同期関数の内側から呼び出すにはどう書くかという問いだ。
これがいちばん易しいが、おそらく念のため出題されている。
