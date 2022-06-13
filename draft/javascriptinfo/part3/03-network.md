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

HTML フォームの送信について習う。`FormData` から始める。フォームデータを表すオブジェクトだ。

```javascript
let formData = new FormData([form]);
```

`FORM` 要素 `form` が与えられると、そのフィールドを自動的に取り込む。

`FormData` の特別な点は、`fetch` などのネットワークメソッドが `FormData`
オブジェクトを本文として受け取ることができることにある。これは符号化されて
`Content-Type: multipart/form-data` で送信される。

サーバーからはこれが通常の提出と同じように見える。

### Sending a simple form

単純なフォームを POST で送信するコード例。

* ハンドラーは `FORM` 要素の `onsubmit` に実装する。この関数は `async` であるはずだ。
* おそらく `e.preventDefault()` 呼び出しは必須。
* メソッド `fetch` の呼び出しで `options.body` の値を上述のように指定する。

### FormData Methods

`FormData` のフィールドをメソッドで変更することができる。
GUI 以外の手段でもフォームの内容を操作できるということだ。

| Method | Behavior |
|--------|----------|
| `append(name, value)` | フィールドを追加する |
| `append(name, blob, fileName)` | あたかも `<input type="file">` であるかのようなフィールドを追加する |
| `delete(name)` | フィールドを削除する |
| `get(name)` | フィールドの値を得る |
| `has(name)` | フィールドがあるかどうかを得る |

フォームには同じ名前のフィールドをいくつも持つことが技術的には許されているので、
メソッド `append` を何度も呼び出すと同じ名前のフィールドがどんどん追加される。
引数リストが `append` と同じであるメソッド `set` もある。
与えられた名前のフィールドをすべて削除し、新しいフィールドを追加する。

本書のコードは、無からフォームデータを生成する例だろう。

### Sending a form with a file

フォームはいつでも `Content-Type: multipart/form-data` として送信され、この符号
化によってファイルを送信することができる。したがって、
`<input type="file">` フィールドも通常のものと同じように送信される。

ハンドラー部分のコードがさっきのものと同じであることに注意する。

### Sending a form with Blob data

画像など、動的に生成されるバイナリーデータを `Blob` として送信するのは前章で見た
ように簡単だ。 `fetch` 呼び出しで引数 `body` として直接与えることができる。実際
には、画像を個別に送信するのではなく、名前などの追加フィールドやメタデータととも
に、フォームの一部として送信するのが便利な場合が多い。また、サーバーは通常、生の
バイナリーデータよりも multipart 符号化されたフォームを受け入れるのに適してい
る。

```javascript
formData.append("image", imageBlob, "image.png");
```

これで、フォームに `<input type="file" name="image">` があり、訪問者がファイルシステムから
image.png という名前のファイルと `imageBlob` というデータを送信したのと同じことになる。
サーバーは、通常のフォーム提出と同じように、フォームデータとファイルを読み取る。

## Fetch: Download progress

<https://javascript.info/fetch-progress> のノート。

メソッド `fetch` では、ダウンロードの進捗を追跡することができる。
戻り値オブジェクト `response` のプロパティー `body` を使用する。
これは `ReadableStream` 型で、ボディーを塊単位で供給する特殊なオブジェクトだ。
`response.text()` や `response.json()` などとは異なり、
`response.body` では読み込み処理を完全に制御でき、どれだけ消費されたかをどんな瞬間にも数えることができる。

出力 `response` を得た後に次のようにすることができるとある：

```javascript
const reader = response.body.getReader();
while(true) {
    // done is true for the last chunk
    // value is Uint8Array of the chunk bytes
    const {done, value} = await reader.read();
    if (done) {
        break;
    }
    console.log(`Received ${value.length} bytes`);
}
```

このコードだけ見ると `reader` は反復可能オブジェクトを備えていないのかと疑問に思うが、
事実、用意されているらしい。本書ではその機能が広くサポートされていないから、
あえて素のループを採用したと述べている。

勝手に調べてみたところ、次のように書けるはずらしい（手許の Chrome では動かず）：

```javascript
for await (const value of response.body) {
    console.log(`Received ${value.length} bytes`);
}
```

読み込みが終了するまで、すなわち `done` が真になるまで、ループ内で応答の塊を受信する。
進捗を記録するには、受信した欠片の値ごとに、その長さをカウンターに追加する。

本書では `response.headers.get('Content-Length')` などを利用した実用的なコードを実装している。

* `response.headers.get('Content-Length')` でダウンロードするデータ量を得る（数に変換すること）。
* `value` を作業用の配列に `push` しておき、あとで `Uint8Array` オブジェクトに復元する。
  この処理がやや泥臭い。
* このバイナリーデータは実はテキストなので、`TextDecoder` を利用して文字列に変換する。
  * `new TextDecoder(encoding)` でオブジェクト生成。符号は UTF-8 などを指定する。
  * メソッド `decode()` で変換。

受信バイト数は必ずチェックする。一定の限界に達したらループを打ち切るなどして、
メモリーが枯渇することを防止することだ。

## Fetch: Abort

<https://javascript.info/fetch-abort> のノート。

`Promise` には「中止する」という概念が一般的にはない。進行中の `fetch` を中止す
るにはどうすればよいか。このような目的のために `AbortController` が使える。これ
は `fetch` の他にも、非同期タスクを中断させることができる。

### The AbortController object

`AbortController` は構造が単純だ。
メソッド `abort()` と、イベントリスナーを設定するためのプロパティー `signal` がある。

```javascript
let controller = new AbortController();
```

`controller.abort()` すると、`controller.signal` がイベント "abort" を放つ。
プロパティー `controller.signal.aborted` が `true` になる。

キャンセル可能な操作を行う側は、`controller.signal` のリスナーを設定する。
`controller.signal.addEventListener("abort", ...)` による。
キャンセルする側は、必要な時に `controller.abort()` を呼び出す。

### Using with fetch

`fetch` 呼び出しのオプションに `signal` を指定することで中止可能になる。
次のように書いておき、適当なタイミングで `controller.abort()` を呼び出すことになる：

```javascript
let controller = new AbortController();
fetch(url, {
    signal: controller.signal
});
```

`fetch` が中止されると、その promise は `AbortError` を送出して reject する。
`try..catch` などで処理する必要がある。

### AbortController is scalable

`AbortController` は複数の非同期タスクを一度に中止することができる。

```javascript
let urls; // a list of urls to fetch in parallel

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
    signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from anywhere,
// it aborts all fetches
```

## Fetch: Cross-Origin Requests

<https://javascript.info/fetch-crossorigin> のノート。

もし他のウェブサイトに `fetch` 要求を送ると、まず失敗するだろう。

核となる概念は domain/port/protocol の三つ組からなる origin だ。

Origin をまたぐ要求はリモート側から特別なヘッダーを要求される。
そのような方針は CORS: Cross-Origin Resource Sharing と呼ばれる。

### Why is CORS needed? A brief history

CORS は邪悪なハッカーからインターネットを保護するために存在する。

あるサイトのスクリプトが他のサイトの内容にアクセスすることはできない。古のこの単
純かつ強力な規則は、インターネット安全保障の基礎だった。例えば、ウェブサイト
hacker.com の悪質なスクリプトは、ウェブサイト gmail.com の利用者のメールボックス
にアクセスできない。

また、JavaScript には当時、ネットワークへの要求を実行するための特別な手段がな
かった。しかし、ウェブ開発者はもっと強力なものを求めた。そこで、この制約を回避
し、他のWeb サイトに要求するためのさまざまな小細工を考案した。

#### Using forms

他のサーバーと通信する方法の一つは、そこに FORM を送信することだった。人々は、現
在のページにとどまるために、IFRAME にそれを submit した。

そのため、ネットワークメソッドがなくても、フォームはどこにでもデータを送ることが
できるため、他のサイトに GET/POST 要求をすることは可能だった。しかし、IFRAME の
内容に他のサイトからアクセスすることは禁じられているため、応答を読むことはできな
かった。

正確には、そのための仕掛けがあったが、それは IFRAME とページの両方で特別なスクリ
プトを必要とした。つまり、IFRAME との通信は技術的には可能だった。

#### Using scripts

もう一つの方法は SCRIPT タグを使うことだ。スクリプトは

```html
<script src="http://another.com/...">
```

のように、任意の `src` とドメインを持てる。どのウェブサイトからでもスクリプトを実行できる。

ウェブサイト、例えば another.com がこのようなアクセスのためにデータを公開しようとする場合、
いわゆる JSONP (JSON with padding) プロトコルが使われた。

詳しい説明は本書のとおりで、リモート側で JavaScript コードを動的に生成することが急所になっている。
生成コードはクライアント側で定義された JavaScript 関数を呼び出すようなものらしい。

両者がこの方法でデータを渡すことに合意しているので、うまくいくし、安全保障に違反もしない。
そして、双方が同意している場合、それは間違いなくハッキングではない。
古いブラウザーでも動作するため、このようなアクセスを供与するサービスはまだ存在する。

やがて、ブラウザーの JavaScript にネットワーク方式が登場した。

当初、origin をまたぐ要求は禁じられていたが、長い議論の結果、それが許可されました。
新しい機能は、特別なヘッダーで表現された、サーバーによる明示的な許可が必要だ。

### Safe requests

オリジン横断要求には安全な要求とそれ以外に分類できる。前者は作るのがより簡単なの
で、まずはそれから始める。

要求は次の二つの条件を満たすと安全だ：

1. メソッドが安全であること：GET, POST, HEAD のいずれかである。
2. ヘッダーが安全であること：カスタムヘッダーとして認められるのは次のいずれかだ：
   * Accept
   * Accept-Language
   * Content-Language
   * Content-Type であり、その値が次のいずれかであるもの：
     * application/x-www-form-urlencoded
     * multipart/form-data
     * text/plain

上記以外の要求は「安全でない」とみなされる。本質的な違いは、安全な要求は特別なメ
ソッドなしに FORM や SCRIPT で行なえるということだ。したがって、古いサーバーでも
安全な要求を受け入れることができるはずだ。それとは逆に、非標準のヘッダーや、例え
ば DELETE メソッドを持つ要求を、この方法で作成することはできない。

安全でない要求を行おうとすると、ブラウザーは特別な preflight 要求を送信し、この
ようなオリジン横断的要求を受け入れることに同意するかどうかをサーバーに問う。そし
て、サーバーがヘッダーで明示的に確認しない限り、安全でない要求は送信されない。

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
