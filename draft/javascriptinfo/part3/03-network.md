---
title: Network requests
---

## Fetch

<https://javascript.info/fetch> のノート。

JavaScript からのネットワーク要求には AJAX という包括的な用語がある。
最後の X は XML を意味するが、別にそれを使う必要はない。古い時代の名残だ。

ネットワーク要求を送信して、サーバーから情報を取得する方法は複数ある。
現代的で汎用性が高いメソッド `fetch()` から始める。

```javascript
let response = fetch(url, [options])
```

オプションがない場合、単純な GET 要求で URL の内容をダウンロードする。

ブラウザーはリクエストをすぐに開始し、呼び出し側のコードが結果を取得するための `Promise` を返す。

応答の取得は通常二段階で行われる。
まず、`fetch` が返す `response` はサーバーがヘッダーで応答すると同時に、
組み込みクラス `Response` のオブジェクトで resolve される。
この段階では HTTP 状態のチェック、成功かどうかの確認、ヘッダーのチェックはできるものの、
本文 (body) がまだない。

ネットワークに問題がある、またはそのようなサイトがないなど、
HTTP 要求を果たせなかった場合 `promise` は reject される。
404 や 500 のような異常な HTTP 状態はエラーにならない。

HTTP 状態は `response` の次のプロパティーで見える：

* `status`: HTTP 状態コード。例えば 200 など。
* `ok`: HTTP 状態コードが 200 から 299 までの値であるかどうか。

```javascript
let response = await fetch(url);
if (response.ok) { 
    let json = await response.json();
} else {
    alert("HTTP-Error: " + response.status);
}
```

二段階目に、応答本体を取得するために、メソッドを追加的に呼び出す必要がある。
`Response` には、さまざまな形式で本文にアクセスするための複数の `Promise` ベースのメソッドがある。

| Method | Behavior |
|--------|----------|
| `response.text()` | テキストとして返す |
| `response.json()` | JSON として解釈する |
| `response.formData()` | `FormData` オブジェクトとして返す |
| `response.blob()` | `Blob` として返す |
| `response.arrayBuffer()` | `ArrayBuffer` として返す |

さらに、プロパティー `response.body` という `ReadableStream` オブジェクトがある。
これによって本文を一定の塊ごとに読むことができる。

本書では JSON 読み込みの例として、次のようなコードを紹介している：

```javascript
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);
let commits = await response.json();
```

プレーンテキストとして読み込むには：

```javascript
response = await fetch(url);
let text = await response.text();
```

あとは参考として `Blob` オブジェクトの扱いも例がある。
画像をロードして動的に DOM に追加して描画させるという、高級なものだ。

重要な点として、本文を読み取る方法はひとつしか選べないことを理解しておく。
例えばすでに `response.text()` で応答を取得している場合は `body` の内容がすでに処理されているので
`response.json()` は使えない、といった具合だ。

### Response headers

応答ヘッダーは、`response.headers` にある `Map` 風のオブジェクトで利用できる。
これは厳密には `Map` ではないものの、個々のヘッダーを名前で取得したり、
ヘッダーを反復処理したりするための類似のメソッドがある。

```javascript
// get one header
console.debug(response.headers.get('Content-Type')); // application/json; charset=utf-8

for (let [key, value] of response.headers) {
    console.debug(`${key} = ${value}`);
}
```

### Request headers

`fetch` で要求ヘッダーを設定するには、オプションの引数 `headers` を使用する。
次のコードのようにして、オブジェクトに発信ヘッダーを持たせる。

```javascript
let response = fetch(protectedUrl, {
    headers: {
        Authentication: 'secret'
    }
});
```

禁じられた HTTP ヘッダーというのがあり、それを指定することは許されていない。
これらのヘッダーは、適切かつ安全な HTTP を保証するため、ブラウザー専用とされる。

### POST requests

GET 以外の POST や他の要求を行うには `options` を使用する必要がある。

| Property | Value |
|----------|-------|
| `method` | "POST" などの HTTP 方式 |
| `body` | 要求本文 |

要求本文というのは、次のうちの一つだ：

* 文字列の値。例えば JSON オブジェクトを文字列化したもの。
* `FormData` オブジェクト。データを multipart/form-data として提出する。
* `Blob`/`BufferSource` オブジェクト。バイナリーデータを送信する。
* `URLSearchParams` オブジェクト。データを x-www-form-urlencoded という、
  めったに使われない符号方式で提出する。

ほとんどの場合で JSON 形式が採用される。本書のコード例の
`options.headers['Content-Type']` の値に注目する。

### Sending an image

`Blob` や `BufferSource` を使って、バイナリーデータを `fetch` で送信することもできる。
本書の例では `CANVAS` 要素上の描画をデータ化して、画像をサーバーに送信する。

コードを分析すると、JavaScript はキャンバス DOM ノードの `toBlob()` で所定の形式で画像を生成できるようだ。
これを単純な `options` で `fetch()` したのち `json()` する。
`Blob` オブジェクトの場合、その型が Content-Type の値になる。
`Blob` オブジェクトには組み込みの型 image/png があるため、
Content-Type ヘッダーを手動で設定しないで済む。

### Tasks

#### Fetch users from GitHub

GitHub のログイン名の配列を入力とし、GitHub からユーザーを取得してその配列を出力とする
非同期関数 `getUsers(names)` を書く演習だ。

指定された USERNAME の情報を持つ GitHub の URL は
<https://api.github.com/users/USERNAME> だ。

1. `fetch` 要求はユーザーごとに一回だけとする。
2. 要求は互いに待機してはいけない。
3. 要求が失敗したり、ユーザーが存在しない場合、この関数は配列の対応要素に
   `null` を置くものとする。

この要件の急所は 2. であって、`Promise.all()` を使うタイミングを慎重に決めることになる。
本質的に同じ処理とするが、見てくれは異なるコードが解答例以外にありそうだ。

## FormData

<https://javascript.info/formdata> のノート。

### Sending a simple form

### FormData Methods

### Sending a form with a file

### Sending a form with Blob data

## Fetch: Download progress

<https://javascript.info/fetch-progress> のノート。



## Fetch: Abort

<https://javascript.info/fetch-abort> のノート。

### The AbortController object

### Using with fetch

### AbortController is scalable

## Fetch: Cross-Origin Requests

<https://javascript.info/fetch-crossorigin> のノート。

### Why is CORS needed? A brief history

#### Using forms

#### Using scripts

### Safe requests

### CORS for safe requests

### Response headers

### "Unsafe" requests

#### Step 1 (preflight request)

#### Step 2 (preflight response)

#### Step 3 (actual request)

#### Step 4 (actual response)

### Credentials

### Tasks

#### Why do we need Origin?

## Fetch API

<https://javascript.info/fetch-api> のノート。

### referrer, referrerPolicy

### mode

### credentials

### cache

### redirect

### integrity

### keepalive

## URL objects

<https://javascript.info/url> のノート。

### Creating a URL

### SearchParams "?..."

### Encoding

#### Encoding strings

## XMLHttpRequest

<https://javascript.info/xmlhttprequest> のノート。

### The basics

### Response Type

### Ready states

### Aborting request

### Synchronous requests

### HTTP-headers

### POST, FormData

### Upload progress

### Cross-origin requests

## Resumable file upload

<https://javascript.info/resume-upload> のノート。

### The basics

### Response Type

### Ready states

### Aborting request

### Synchronous requests

### HTTP-headers

### POST, FormData

### Upload progress

### Cross-origin requests

## Long polling

<https://javascript.info/long-polling> のノート。

### Regular Polling

### Long polling

### Demo: a chat

### Area of usage

## WebSocket

<https://javascript.info/websocket> のノート。

### A simple example

### Opening a websocket

#### Extensions and subprotocols

### Data transfer

### Rate limiting

### Connection close

### Connection state

### Chat example

## Server Sent Events

<https://javascript.info/server-sent-events> のノート。

### Getting messages

#### Cross-origin requests

### Reconnection

### Message id

### Connection status: readyState

### Event types

### Full example

#### Properties of an EventSource object

#### Methods

#### Events

#### Server response format
