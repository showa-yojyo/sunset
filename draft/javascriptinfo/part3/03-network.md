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

要求がオリジンを横断する場合はいつでも、ブラウザーは `Origin` ヘッダーを追加する。
例では `https://javascript.info/page` から `https://anywhere.com/request を要求するときのヘッダーを示している。

```text
GET /request
Host: anywhere.com
Origin: https://javascript.info
...
```

`Origin` ヘッダーには要求側の domain/protocol/port すなわち origin を含むことに注意する。
これはパスを含まない。

サーバーは `Origin` を検査することができ、要求を受け入れることに同意すれば、特別なヘッダー
`Access-Control-Allow-Origin` を応答に追加する。そのヘッダーは、許可された origin または
星印 `*` を含むべきである。そうなれば応答は成功であり、下記のような応答がサーバーから得られる。
そうでない場合は失敗だ。本書ではこの説明を Sequence diagram で表現している。

```text
200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://javascript.info
```

### Response headers

オリジン横断的要求では、JavaScript はいわゆる「安全な」応答ヘッダーにしかアクセスすることができない。
次の六つしかないようだ：

* `Cache-Control`
* `Content-Language`
* `Content-Type`
* `Expires`
* `Last-Modified`
* `Pragma`

それ以外の応答ヘッダーへのアクセスはエラーとなる。

JavaScript に他の応答ヘッダーへのアクセスを許可するには、サーバーは
`Access-Control-Expose-Headers` ヘッダーを送信する必要がある。これには、
アクセスしたいヘッダー名をカンマで区切ったリストが入っている。

```text
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Length,API-Key
```

このような `Access-Control-Expose-Headers` ヘッダーを得て、要求側のスクリプトが応答の
`Content-Length` および `API-Key` ヘッダーを読み取ることを許される。

### "Unsafe" requests

GET, POST, PATCH, DELETE など、あらゆる HTTP method を利用することができる。

少し前までは、ウェブページがそのような要求をするという想定がなかった。そのため、
非標準のメソッドを「それはブラウザーではない」と警戒して扱うウェブサービスがまだ
存在する可能性がある。アクセス権をチェックするときに、それを考慮することができ
る。

そこで、サービスからの誤解を避けるために、「安全でない」どんな要求でも、ブラウ
ザーはそのような要求をすぐにはしない。まず、予備的要求を送り、許可を得る。

予備要求では、HTTP method OPTIONS を使用し、主文はなく、ヘッダーを三つ使用する：

* `Access-Control-Request-Method`: 安全でない要求の HTTP method
* `Access-Control-Request-Headers`: それの安全でない HTTP ヘッダーからなるカンマ区切りリスト
* `Origin`: 要求元であるオリジン

サーバーが要求の処理に同意した場合、空の主文、ステータス 200、次のヘッダーで応答してしかるべきだ：

* `Access-Control-Allow-Origin`: 文字 `*` または許可をする要求しているオリジン
* `Access-Control-Allow-Methods`: 許可した HTTP method
* `Access-Control-Allow-Headers`: 許可した HTTP ヘッダーのリスト

さらに、ヘッダー `Access-Control-Max-Age` で、許可をキャッシュする秒数を指定できる。
そのため、ブラウザーは与えられた許可を満たす後続の要求に対して予備要求を送信する必要がなくなる。

本書では、オリジン横断的 PATCH 要求を例に、その仕組みを順を追って解説している。
PATCH method というのはデータの更新によく使われる HTTP method とのことだ。

```javascript
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
});
```

当要求が安全でない理由は三つある（一つでもある時点でこの仕組を要する）：

* PATCH method それ自体
* `Content-Type` の値が次のどれでもない：
  * application/x-www-form-urlencoded
  * multipart/form-data
  * text/plain
* `API-Key` ヘッダーは安全でないとされる

#### Step 1 (preflight request)

このような要求を送信する前に、ブラウザーが独自に次のような予備要求を送信する：

```text
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

OPTIONS は要求側のスクリプトのパスからなる。Host は先方のドメイン？
残り三つは先述のものだ。

#### Step 2 (preflight response)

成功すれば、予備応答は上の残り三つと記したヘッダーを部分的に含む。これをもって将
来の通信が可能になる。もしサーバーが将来的に他のメソッドやヘッダーを期待するので
あれば、それらをリストに追加することで事前に許可するのが自然だ。たとえば、次の応
答例は PUT, DELETE, さらなるヘッダーも許可していると取れる：

```text
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

以上でブラウザーが本要求を送信することができるようになった。

ヘッダー `Access-Control-Max-Age` に秒数があれば、指定された時間だけ予備要求の許
可がキャッシュされる。上記の応答では、86400 秒キャッシュされる。この時間枠内であ
れば、それ以降の予備要求が発生することはない。キャッシュされた許容範囲内であれ
ば、直接の送信が起こる。

#### Step 3 (actual request)

予備要求が成功したら、今度はブラウザーが主要求を行う。オリジン横断的要求ゆえ、本
要求には `Origin` ヘッダーがあるが、処理は安全な要求と違いはない。

#### Step 4 (actual response)

サーバーは `Access-Control-Allow-Origin` を主応答に追加することを忘れてはならない。
予備要求が成立しても、それから解放されるわけではない。

これで `JavaScript` はサーバーの主応答を読むことができる。

### Credentials

JavaScript コードによって開始されたオリジン横断的要求には、Cookie や HTTP 認証な
どといった資格証が何もない。それは HTTP 要求では珍しいことだ。通常、あるドメイン
への要求は、そのドメインからのすべての Cookies を伴う。一方、JavaScript のメソッ
ドによって行われるオリジン横断的要求は例外だ。たとえば
`fetch('http://another.com')` はドメイン `another.com` に属するものでさえ、どん
な Cookie も送らない。

それはなぜかというと、資格証付きの要求ははるかに強力だからだ。もし許可されれば、
利用者の代理として行動し、その資格証を使って機密情報にアクセスする全権限を
JavaScript に供与することになる。サーバーはスクリプトを本当にそこまで信頼してい
るだろうか。ならば、追加ヘッダーで資格証付き要求を明示的に許可しなければな
らない。

```javascript
fetch('http://another.com', {
    credentials: "include"
});
```

これで `fetch` は `another.com` から発信された Cookie をそのサイトへの要求と一緒に送る。

サーバーが認証情報を含む要求を受け入れることに同意した場合、
`Access-Control-Allow-Origin` に加えて、応答に

```text
Access-Control-Allow-Credentials: true
```

というヘッダーを追加する必要がある。

注意として、`Access-Control-Allow-Origin` では、資格情報を含むリクエストに星印 `*`
を使用することは禁止されている。正確なオリジンをそこに記さなければならない。これ
は追加的な安全対策であって、そのような要求をするために誰が信頼できるかをサーバー
が本当に知っているかを確認するのが目的だ。

### Tasks

#### Why do we need Origin?

HTTPS から HTTP のページを取得する場合など、Referer が存在しない場合がある。
このため Origin が必須となる。
Content Security Policy で Referer を送ることが禁止されている場合もある。

まさに Referer が信頼できないからこそ Origin が発明された。
ブラウザーはオリジン横断的要求に対して正しい Origin を保証している。

## Fetch API

<https://javascript.info/fetch-api> のノート。

ここで学ぶオプションのほとんどはめったに使用されない。それでも、
`fetch` で何ができるかを知っておくのは良いことだ。

冒頭のコード片は `fetch` の引数 `options` の既定値をすべて列挙している。
このうち `method`, `headers`, `body`, `signal` はすでに習ったので、残りをここでやる。

### referrer, referrerPolicy

これらのオプションは HTTP Referer ヘッダーをどのように設定するかを制御する。通
常、このヘッダーは自動的に設定され、要求元のページの URL が含まれる。ほとんどの
場合、このヘッダーは重要ではないが、安全保障上、削除したり短くしたりすることが意
味を持つ場合もある。

オプション `referrer` は（現在のオリジン内で）任意の Referer を設定したり、削除したりできる。
送信しない場合は空文字列を指定する。

オプション `referrerPolicy` は Referer に関する一般的な規則を設ける。
要求は三つに分類される：

1. 同じオリジンへの要求
2. 別のオリジンへの要求
3. HTTPS から HTTP へのリクエスト（安全なプロトコルから危険なプロトコルへの要求）

正確な Referer 値を設定できる `referrer` とは異なり、
`referrerPolicy` はブラウザーに各要求分類に対する一般的な規則を伝える。
設定可能な値は Referrer Policy 仕様書に記述がある。

本書のここにある一覧は、取り得る値と意味の対応だ。

本書のここにある表は、取りうる値と要求分類の有効な組み合わせを示している？

----

例えば、サイトの外から知られてはいけない URL 構造を持つ管理ゾーンがあるとする。
`fetch` を呼び出すと、既定ではページの完全な URL を含む Referer ヘッダーがつねに送信される。
なお、HTTPS から HTTP への要求ではないと仮定する。

```text
Referer: https://javascript.info/admin/secret/paths
```

もし、他のウェブサイトが URL パスではなく、オリジン部分のみを知りたい場合は、
オプションを設定することができる：

```javascript
fetch('https://another.com/page', {
    referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

すべての `fetch` 呼び出しにこれを適用することができる。おそらく、要求のすべてを処理するプロジェクトの
JavaScript ライブラリーにこれを統合し、内部で `fetch` を使用する感じになる。

既定動作との唯一の違いは、他のオリジンへの要求に対して、
`fetch` は URL のオリジン部分しか送信しない点にある（以前の記述を参照）。
こちら側でのオリジンへの要求では、やはり完全な `Referer` を取得するというのもある。
デバッグの助けになるかもしれないから。

Referer-Policy に関するひとくちメモはよくわからない。

### mode

オプション `mode` は、時折発生するオリジン横断的要求を防ぐためのセーフガードだ。

| Value | Description |
|-------|-------------|
| "cors" | 許可する |
| "same-origin" | オリジン横断的要求は禁止とする |
| "no-cors" | 安全なオリジン横断的要求しか許可しない |

オプション `mode` が便利であるのは、`fetch` 用の URL がサードパーティーから来て、
オリジン横断的要求を制限するための電源オフスイッチが欲しいときだ。

### credentials

オプション `credentials` は Cookie と HTTP-Authorization ヘッダーを
要求とともに送信するべきかどうかを指定する。

| Value | Description |
|-------|-------------|
| "same-origin" | オリジン横断的要求に対して送信しない |
| "include" | つねに送信する |
| "omit" | 同一オリジン要求であったとしても送信しない |

つねに送信する場合、JavaScript が応答にアクセスするためには、別サーバーからの Access-Control-Allow-Credentials が必要だ。

### cache

何も指定しなければ、`fetch` は標準的な HTTP-caching を利用する。つまり、通常の
HTTP 要求がするのと同じように、Expires と Cache-Control ヘッダーを考慮
し、If-Modified-Since などの情報を送信する。
オプション `cache` は HTTP-cache を無視できたり、その使用方法を細かく設定したりできる。

表は略。

### redirect

通常、`fetch` は 301 や 302 などの HTTP リダイレクトには透過的に従う。
オプション `redirect` はそれを変えることができる：

| Value | Description |
|-------|-------------|
| "follow" | HTTP-redirects に従う |
| "error" | HTTP-redirects の場合にエラーとする |
| "manual" | HTTP-redirects を手動で処理する |

手動で処理するときには、リダイレクトの場合 `response.type="opaqueredirect"` の特別な応答オブジェクトを取得し、
そこにはゼロ・空ステータスと他のほとんどのプロパティーがある。

### integrity

オプション `integrity` は応答が `known-ahead` チェックサムに一致するかどうかを調べることができる。
仕様によると、サポートされているハッシュ関数は SHA-256, SHA-384, SHA-512 であり、
ブラウザーによっては他の関数もあるかもしれない。

例えば、あるファイルをダウンロードするとき、そのファイルの SHA-256 チェックサムが
abcdef であることがわかったとする。
それをオプション `integrity` に書くと、次のようになる：

```javascript
fetch('http://site.com/file', {
    integrity: 'sha256-abcdef'
});
```

すると、`fetch` は独自に SHA-256 を計算し、与えられた情報と比較する。
不一致の場合、エラーが発生する。

### keepalive

オプション `keepalive` は、要求を開始したウェブページよりもそれが長生きする可能
性があることを示唆する。例えば、ユーザー体験を分析し、改善するために、現在の閲覧
者がどのようにページ（マウスクリック、見られているページ断片）を使用するかについ
ての統計を収集する。閲覧者がページを離れるとき、そのデータをサーバーに保存した
い。そのためにイベント `window.onunload` が使える：

```javascript
window.onunload = function() {
    fetch('/analytics', {
        method: 'POST',
        body: "statistics",
        keepalive: true
    });
};
```

通常、ドキュメントがアンロードされると、関連するネットワーク要求はすべて中止され
る。しかしオプション `keepalive` はブラウザーがページを離れた後もバックグラウン
ドで要求を実行するように指示する。したがって、このオプションは上のような要求が成
功するために必要不可欠だ。

いくぶんかの制約がある：

* 要求の本文の制限は 64KB だ。
  * 訪問に関する多くの統計情報を収集する必要がある場合、最後の `onunload` に多く
    が残らないように、パケットで定期的に送信するべきだ。
  * この制限はすべての `keepalive` 要求にまとめて適用される。つまり、複数の
    `keepalive` 要求を並行して実行することもできるが、それらの本文の長さの和が
    64KB を超えてはならない。
* ドキュメントがアンロードされると、サーバーからの応答を処理することができない。
  このため、この例では `keepalive` に対する `fetch` は成功するが、その後の関数は
  機能しない。
  * ほとんどの場合、サーバーはデータを受け取るだけで、そのような要求には通常空の
    応答を送信するので、問題にはならない。

## URL objects

<https://javascript.info/url> のノート。

組み込みクラス `URL` には URL の作成と解析のための便利なインターフェイスがある。
ただし、`URL` オブジェクトをまさに必要とするネットワークメソッドはなく、文字列で事足りる。

### Creating a URL

```javascript
new URL(url, [base])
```

* `url`: 完全 URL か、または `base` が与えられている場合にはパスのみ
* `base`: 相対パスから完全 URL を組み立てるための 基準 URL

既存の URL からの相対パスに基づいて、新しい URL を簡単に作成できる。

```javascript
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url); // "https://javascript.info/profile/tester"
```

`URL` オブジェクトはすぐにその構成要素にアクセスすることができる。

| Property | Specification |
|----------|---------------|
| `href` | 完全 URL に等しい文字列 |
| `protocol` | プロトコルに等しく、コロンで終わる文字列 |
| `search` | 引数の文字列に等しく、疑問符記号から始まる文字列 |
| `hash` | 記号 `#` から始まる文字列 |

HTTP 認証がある場合にはプロパティー `user`, `password` もある。

```text
`http://login:password@site.com`
```

`URL` オブジェクトを文字列の代わりにネットワーク（および他のほとんどの）メソッドに渡すことができる。
`fetch` や `XMLHttpRequest` など、URL 文字列が期待される場所のほどんとで使用できる。
一般に、`URL` オブジェクトは文字列の代わりにどのようなメソッドにも渡すことができる。
ほとんどのメソッドは文字列変換を行い、`URL` オブジェクトを完全な URL を含む文字列に変換する。

### SearchParams "?..."

<https://google.com/search?query=JavaScript> のような、検索引数を指定した
URL を 作成したい。`URL` の引数でそれらを直接指定してもいいが、
引数に空白や非ラテン文字などが含まれている場合は、符号化する必要がある。
そこで、そのためのプロパティー `url.searchParams` がある。
このプロパティーは `URLSearchParams` という型のオブジェクトを値に取る。
これには、検索引数用の便利なメソッドが用意されている。

| Method | Parameters | Behavior |
|--------|------------|----------|
| `append` | `name, value` | 引数を `name` によって加える |
| `delete` | `name` | 引数を `name` によって除く |
| `get` | `name` | 引数を `name` によって得る |
| `getAll` | `name` | 同じ名前の引数すべてを得る |
| `has` | `name` | 引数が存在するかどうかを `name` によって確かめる |
| `set` | `name, value` | 引数を割り当てるか上書きする |
| `sort` | | 引数を `name` によって並び替える |

`URLSearchParams` は `Map` と同様に反復可能だ。

本書の Google に検索クエリーを送信する例は実用的だ。

### Encoding

RFC3986 という規格があり、URL で利用が許される文字が定義されている。
例えば、非ラテン文字や空白は UTF-8 コードに置き換えられ、
`%20` のように記号 `%` で始まる（歴史的な理由から記号 `+` で符号化できる）。
`URL` はこれらすべてを自動的に処理する。すべての引数を生で与え、`URL` を文字列に変換すればよい。

```javascript
let url = new URL('https://ru.wikipedia.org/wiki/Тест'); // "https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82"
```

UTF-8 ではキリル文字が 2 バイトで表現されるため、
`%xx` が一文字に対して二つ存在することになり、文字列が長くなる。

#### Encoding strings

`URL` が登場する前は、文字列が使われていた。
現在でも文字列もまだ使うことができる。文字列を使った方が多くの場合コードが短くなる。
文字列を使う場合、特殊文字を手動で符号化、復号化する必要がある。そのための組み込み関数：

* `encodeURI`
* `decodeURI`
* `encodeURIComponent`
* `decodeURIComponent`

`encodeURI` は URL で完全に禁止されている文字だけを符号化する。
`encodeURIComponent` は、同じ文字に加えて、`#`, `$`, `&`, `+`, `,`, `/`, `:`,
`;`, `=`, `?`, `@` を符号化する。

つまり、URL 全体に対しては `encodeURI` を使うことができるが、URL 引数に対しては
`encodeURIComponent` を代わりに使用するべきなのだ。

```javascript
let music = encodeURIComponent('Rock&Roll');
let url = `https://google.com/search?q=${music}`; // "https://google.com/search?q=Rock%26Roll"
```

クラス `URL` と `URLSearchParams` は、最新の URI 仕様に基づいている。一方、
`encode` 系関数は廃止された規格 RFC2396 に基づいている。
1998 年当時存在しなかった IPv6 アドレスの符号化が異なるなど、相違点がいくつかある。
このような場合はまれで、`encode` 系関数はほとんどの場合うまく動作する。

### Comments

このページのコメント欄は面白い。

## XMLHttpRequest

<https://javascript.info/xmlhttprequest> のノート。

`XMLHttpRequest` は JavaScript で HTTP 要求を行うためのブラウザー組み込み型だ。
名前に XML という単語を含むが、XML だけでなく、あらゆるデータに対して操作可能だ。
ファイルのアップロード、ダウンロード、進捗状況の確認など、さまざまなことが可能だ。

現在では `XMLHttpRequest` をやや非推奨とする、より現代的なメソッド `fetch` がもう存在する。

`XMLHttpRequest` が使用される理由は三つ：

1. 歴史的な理由：既存のスクリプトを `XMLHttpRequest` で対応し続ける必要がある。
2. 古いブラウザーをサポートする必要があり、スクリプトを小さく保ちたいなどの理由で polyfill が欲しくない。
3. アップロードの進行状況を追跡するなど、`fetch` ではまだできないことをする必要がある。

### The basics

`XMLHttpRequest` には、動作モードに同期と非同期とがある。
多くの場合に非同期が使用されるので非同期を先に見ていく。

要求を行うには三段階が必要だ。

1. オブジェクトを生成する。
2. オブジェクトを初期化する。
3. 送信する。

```javascript
let xhr = new XMLHttpRequest();
xhr.open(method, url, async, user, password);
xhr.send(body);
```

コンストラクターは引数を取らない。

メソッド `open` は要求の主要な引数を指定する。後ろ三つは optional だ。

* `method`: ふつうは "GET" か "POST" を指定する。
* `URL`: 文字列でも、先述のように `URL` オブジェクトをそのまま渡してもいい。
* `async`: 明示的に `false` を与えた場合には要求は同期的だ。
* `user`, `password`: 基本的な HTTP 認証のためのログインユーザーとパスワード。

メソッド `open` はその名前に反して接続はしない。要求を設定するだけで、
ネットワーク活動は `send` の呼び出しによって開始する。

メソッド `send` は接続を開始し、サーバーに要求を送信する。オプション引数 `body` は要求本文だ。

GET のような要求メソッドには本文がないものもある一方、POST のように `body` を使用して
データをサーバーに送信するものもある。

----

その後の段階としては `xhr` イベントに耳を傾けて応答する。これらのイベントがもっとも広く用いられる：

* `load`: 要求が完了し、HTTP ステータスが 400 や 500 であっても、応答が完全にダウンロードされたとき。
* `error`: ネットワークダウンや無効な URL など、要求がうまくいかなかった。
* `progress`: 応答がダウンロードされている間じゅう定期的に呼び出され、ダウンロード量が報告される。

基本的に `xhr.addEventListener('load', ...)` のようにして設定できると思われる。

```javascript
xhr.onload = function() {
    if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else {
        alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
    }
};
```

サーバーが応答したら、その結果を次の `xhr` のプロパティーから受け取る：

* `status`: HTTP ステータスコードを表す数値。HTTP 以外の失敗の場合は 0 があり得る。
* `statusText`: HTTP ステータスメッセージを表す文字列値。404 なら `"Not Found"` のように。
* `response`: サーバー応答本文。

また、プロパティーを用いてタイムアウトを指定することもできる。

```javascript
xhr.timeout = 10000; // timeout in ms, 10 seconds
```

与えられた時間内に要求が成功しない場合、キャンセルされてイベント `timeout` が発生する。

囲み記事については前ページ参照。

### Response Type

`xhr.responseType` を使用して、応答フォーマットを設定することができる。
この値を `send` 呼び出しまでに変えると、`xhr.response` の値が対応する内容になる。

| Value | Specification |
|-------|---------------|
| "" | 文字列で得る |
| "text" | 文字列で得る |
| "arraybuffer" | `ArrayBuffer` として得る |
| "blob" | `Blob` として得る |
| "document" | XML 文書または HTML 文書として得る |
| "json" | JSON として得る |

### Ready states

`XMLHttpRequest` はその進行に応じて状態が変化する。現在の状態はプロパティー `xhr.readyState` だ。
状態値は 0 → 1 → 2 → 3 → ... → 3 → 4 の順に移動する。
ネットワーク上でデータパケットを受信するたびに状態 3 を 反復する。

イベント `readstatechange` を使って追跡することができるが、
これは古い。現在では `load`/`error`/`progress` ハンドラーがある。

### Aborting request

要求はいつでも終了させることができる。これにより、`abort` イベントが発生して
`xhr.status` の値が 0 になる。

```javascript
xhr.abort(); 
```

### Synchronous requests

メソッド `open` には第三の引数 `async` がある。これを `false` とすると、要求が同期的に行われる。
つまり、JavaScript の実行は `send()` 呼び出しでブロックされ、応答を受信した時点で復帰する。

読み込みが完了するまでページ内の JavaScript をブロックしてしまうので、ほとんど使われない。
ブラウザーによっては、スクロール不能になるまである。
同期呼び出しに時間がかかり過ぎる場合、ブラウザーはハングアップしたページを閉じるよう案内することがある。

`XMLHttpRequest` の高度な機能の多くは、同期的要求では使用できない。進行状況の表示もない。
以上のような理由から、同期的要求はあまり用いられない。

### HTTP-headers

`XMLHttpRequest` ではカスタムヘッダーの送信と、応答からヘッダーを読み取ることのどちらも可能だ。

| Method | Parameters | Behavior |
|--------|------------|----------|
| `setRequestHeader` | `name`, `value` | 指定された `name` と `value` を持つ要求ヘッダーを与える |
| `getResponseHeader` | `name` | 指定された `name` の応答ヘッダーを得る |
| `getAllResponseHeaders` | | すべての応答ヘッダーを得る |

`Referer` や `Host` など、ブラウザー専用管理ヘッダーもある。
`XMLHttpRequest` は利用者の安全と要求の正確さのために、これらを変更することが許されていない。

`setRequestHeader` での設定内容を元に戻すことができないという特徴もある。
ヘッダーが設定されると、それは設定されたままだ。追加の呼び出しはヘッダーに情報を追加し、上書きはしない。

ここで言う応答ヘッダーには Set-Cookie および Set-Cookie2 は含まれない。

複数ヘッダーは一行で返される。

ヘッダーとヘッダーの間の改行は OS に依らず `\r\n` なので、個々のヘッダーに分割することは容易だ。
名前と値のセパレーターはコロンの後に空白文字が必ず入る。

### POST, FormData

POST 要求を行うには `FormData` を用いる。オブジェクト `formData` を用意したら次の手順で：

1. `xhr.open('POST', ...)`
2. `xhr.send(formData)`

フォームは multipart/form-data 符号様式で送信される。

JSON が好みなら `JSON.stringify` して得られる文字列を送信する。
ただ、Content-Type: application/json というヘッダーを設定するのを忘れてはいけない。
サーバーサイドフレームワークの多くは、これで自動的に JSON を復号してくれる。

### Upload progress

イベント `progress` はダウンロードの段階でだけ発射される。つまり、何かを POST す
る場合、`XMLHttpRequest` はまずデータ（要求本文）をアップロードし、次に応答をダ
ウンロードする。何か大きなデータをアップロードする場合、その進行状況を追跡するこ
とに関心があるはずだ。しかし、`xhr.onprogress` はここで役に立たない。

イベントを追跡するためのメソッドを持たない別のオブジェクト `xhr.upload` がある。
このオブジェクトは `xhr` と同様にイベントを生成するが、 `xhr.upload` はアップ
ロード時にだけイベントを発射する。

* `loadstart`: アップロード開始された
* `progress`: アップロード中に定期的に
* `abort`: アップロードが中断された
* `error`: HTTP 以外のエラー
* `load`: アップロードが正常に終了した
* `timeout`: アップロードがタイムアウトした
* `loadend`: 成功またはエラーでアップロードが終了した

### Cross-origin requests

`XMLHttpRequest` は `fetch` と同じ CORS 方針を使用して、オリジン横断的要求を行うことができる。
`fetch` 同様に、既定では Cookie と HTTP 認証を別のオリジンに送信しない。
これらを有効にするには、次のようにする：

```javascript
xhr.withCredentials = true;
```

## Resumable file upload

<https://javascript.info/resume-upload> のノート。

メソッド `fetch` を使用すると、ファイルをアップロードするのはかなり簡単だ。
接続が切れた後にアップロードを再開するための組み込みのオプションはないが、それを実装するための部品はある。

再開可能なアップロードには、アップロードの進行状況表示が必要だ。
`fetch` では進捗を追跡できないので `XMLHttpRequest` を使用する。

### Not-so-useful progress event

アップロードを再開するには、接続が切断されるまでにどれだけの量がアップロードされ
たかを知っていなければならない。

アップロードの進行状況を追跡するために `xhr.upload.onprogress` がある。
これはデータが送信されたときに発射されるため、アップロードを再開する助けにはならない。
このイベントはプログレスバーを表示するのにしか有用でない。

アップロードを再開するには、サーバーが受信したバイト数を正確に把握する必要がある。
それはサーバーしか知り得ないので、追加の要求を行うことになる。

### Algorithm

```javascript
let fileId = file.name + '-' + file.size + '-' + file.lastModified;
let response = await fetch('status', {
    headers: {
        'X-File-Id': fileId
    }
});

// The server has that many bytes
let startByte = +await response.text();
```

```javascript
xhr.open("POST", "upload", true);
xhr.setRequestHeader('X-File-Id', fileId);
xhr.setRequestHeader('X-Start-Byte', startByte);

xhr.upload.onprogress = (e) => {
    console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
};

// file can be from input.files[0] or another source
xhr.send(file.slice(startByte));
```

1. アップロードするファイルを特定するために、ファイル ID を作成する。
2. サーバーに対して、すでに何バイト持っているかという要求を送る。
3. `Blob` の `slice` を使って位置 `startByte` からファイルを送信する。

ファイル ID を `fileId` と呼ぶ。これは再開アップロードに必要なもので、
サーバーに何を再開しているのかを伝えるためのものだ。
名前、サイズ、最終更新日などが変更された場合は、別の `fileId` を指定する必要がある。

サーバーがヘッダー `X-File-Id` によってファイルアップロードを追跡することを想定している。
サーバーサイドで実装する必要がある。
もしファイルがまだサーバーに存在しない場合は、サーバーからの応答は 0 になるはずだ。

ここでは、サーバーにファイル ID を `X-File-Id` として送信し、どのファイルをアップロードしているかを認識させ、
開始バイトを `X-Start-Byte` として送信し、最初にアップロードしたのではなく、
再開していることを認識させるようにしている。

サーバーは記録をチェックし、そのファイルのアップロードがあり、現在アップロードされているサイズがちょうど
`X-Start-Byte` であれば、そのデータを追加する必要がある。

----

本書のここには Node.js で書かれたクライアントとサーバーの両方のコードを掲載したデモが来る。
Node.js は Nginx の背後で稼働し、アップロードをバッファリングし、完了したら Node.js に渡す。
このコードを読者がダウンロードしてローカルで実行すると、デモが完全に動作するとある。

* client.js: これまでのコードをカプセル化したクラスの定義
* server.js: 未知のコード群
* index.html: フォームおよび一部イベントハンドラーの実装や設定

----

最近のネットワーク方式は、ヘッダーの制御、進捗状況の表示、部分ファイルの送信など、
ファイルマネージャーに近い機能を備えている。
再開可能なアップロードやその他多くの機能を実装することができる。

## Long polling

<https://javascript.info/long-polling> のノート。

Long polling とは手法であって、WebSocket や Server Side Events のような
特定のプロトコルを使用せず、サーバーとの持続的な接続を行う最も単純なものだ。
ひじょうに簡単に実装でき、多くの場合に十分な効果を得られる。

### Regular Polling

サーバーから新しい情報を取得する最も簡単な方法は、定期的な polling だ。
つまり、サーバーへの定期的な（例えば十秒に一回）「私はここだ。何か私に情報があるか」要求だ。
これに対してサーバーは、まずクライアントがオンラインであることを自分自身に通知し、
それから、その時点までに受け取ったメッセージのパケットを送信する。

しかし、これには欠点がある。

* メッセージは上記の場合、最大で十秒遅れて渡される。
* メッセージがなかったり、ユーザーが別の場所に移動していたり、寝ていたりしたとしても、
  サーバーは十秒ごとに要求で爆撃される。

ごく小さなサービスの話でなければ、この方法には改善が必要だ。

### Long polling

いわゆる long polling とは、より良い polling だ。
実装も簡単で、メッセージを遅延なく送信することができる。
処理の流れは次のようになる：

1. サーバーに要求が送信される。
2. サーバーは送信するためのメッセージがあるまで接続を閉じない。
3. メッセージが出現すると、サーバーはそのメッセージで要求に応答する。
4. ブラウザーはすぐに新しい要求をする。

ネットワークエラーなどで接続が切れると、ブラウザーはすぐに新しいリクエストを送信する。

本書ではクライアント側の実装コード概要がここに来る。

非同期関数 `subscribe` を書いて、それを呼ぶ。
この関数は `fetch` を行い、応答を待ち、それを処理し、再び自分自身を呼び出す。

* `response.status` が 200 の場合が正常ケース。本来欲しいデータを処理して
  `await subscribe()` する。
* `response.status == 502` の場合にはタイムアウトなので、単に `await subscribe()` する。
* それ以外のステータスの場合には一秒待って再び自分自身を呼び出す。

  ```javascript
  await new Promise(resolve => setTimeout(resolve, 1000));
  await subscribe();
  ```

----

囲み記事の概要：

サーバー様式は多数の接続を保留しても動作するものでなければならない。
ある種のサーバー様式では、接続一つに対してプロセス一つを実行するた
め、接続の数と同じだけのプロセスが存在することになる。各プロセスはかなりの量のメ
モリーを消費することになる。そのため、接続があまりにも多いと、メモリーが枯れてしまう。

PHP や Ruby などの言語で書かれたバックエンドでは、このようなことがよくある。
Node.js で書かれたサーバーは、そのような問題は通常、発生しない。

これはプログラミング言語の問題ではない。PHP や Ruby を含むほとんどの現代の言語では、
適切なバックエンドを実装することができる。それでも、サーバー様式が、
多数同時接続に問題なく動作することを確認することだ。

### Demo: a chat

* browser.js: ページ側機能。コンストラクター関数 `PublishForm` と `SubscribePane`
  の定義。前者はフォームの submit イベントハンドラーと POST 送信を、
  後者は long polling をそれぞれ実装している。
* server.js: Node.js ベースの未知のコード。
* index.js: 簡易チャットページ。

### Area of usage

Long polling はメッセージがめったに来ないような状況では効果的だ。
もしメッセージが頻繁に来るようなら、上に描いた要求と受信の図は鋭いノコギリのような折れ線になる。
すべてのメッセージは個別の要求であり、ヘッダーや認証のオーバヘッドが付随する。
こういう場合には Websocket や Server Sent Events など、別の方法が望ましい。

## WebSocket

<https://javascript.info/websocket> のノート。

仕様 RFC 6455 にある WebSocket プロトコルは、ブラウザーとサーバーの間で
持続的な接続を介してデータを交換する方法を規定している。
接続を切断したり、HTTP 要求を追加したりすることなしに、データをパケットとして双方向に渡すことができる。

WebSocket はオンラインゲームやリアルタイム取引システムなど、継続的なデータ交換が必要なサービスに特に適している。

### A simple example

```javascript
let socket = new WebSocket("ws://javascript.info");
```

WebSocket 接続を開始するには、特別なプロトコル ws:// を使用して新しい `WebSocket` を生成する必要がある。
また、暗号化された wss:// プロトコルもある。HTTP に対する HTTPS の類比で考えていいだろう。

----

wss:// は暗号化されているというだけでなく、信頼性がより高いプロトコルだ。
これは、ws:// データが暗号化されておらず、どの中間媒体からも見えるからだ。
古いプロキシーサーバーは WebSocket について知らないので、奇妙なヘッダーを見て接続を中断することがある。
一方、HTTPS が TLS 上の HTTP であるのと同じく、wss:// は TLS 上の WebSocket であり、
トランスポートセキュリティー層は、送信側でデータを暗号化し、受信側で復号する。
つまり、データパケットはプロキシーを経由して暗号化されて渡されるのだ。
中身を見ずに通すことができるのだ。

----

ソケットを作成したら、そのイベントを listen する必要がある。イベントは全部で四つだ：

* `open`: 接続成立
* `message`: 受信
* `error`: エラー
* `close`: 接続終了

本書ではここにコード例が来る。この構造はどこかで見覚えがある。

デモサーバーから "Hello from server, John" と応答があり、五秒待って接続を閉じる。
つまり、open → message → close というイベントが表示される。
実はこれだけで、もう WebSocket を話すことができるのだ。

### Opening a websocket

`WebSocket(url)` が生成されると、すぐに接続を開始する。
接続中、ブラウザーは（ヘッダーを使って）サーバーに対して WebSocket に対応しているかと質問する。
サーバーが Yes と答えた場合には、HTTP ではなく、WebSocket プロトコルで話を続ける。

本書ではここに `WebSocket("wss://javascript.info/chat")` が生成するブラウザーヘッダーを掲載している。
注目すべきヘッダーを説明している。

* `Origin`: クライアントページのオリジン。WebSocket オブジェクトは元々オリジン横断的だ。
  このヘッダーによって、サーバーはこのウェブサイトと WebSocket を話すかどうかを決定することができる。
  重要なヘッダーだ。
* `Connection: Upgrade`: クライアントがプロトコルの更新を望んでいることを合図する。
* `Upgrade: websocket`: 要求プロトコルは websocket であることを表す。
* `Sec-WebSocket-Key`: 安全保障のためにブラウザーが生成したランダムな鍵。
* `Sec-WebSocket-Version`: WebSocket プロトコルバージョン。

`XMLHttpRequest` や `fetch` では、このような HTTP 要求を行うことはできない。
JavaScript はこれらのヘッダーを設定することができないのだ。

本書では応答例がここに来る。

サーバーが WebSocket への切り替えに同意した場合、コード 101 の応答を送信するべきだ。
`Sec-WebSocket-Accept` は `Sec-WebSocket-Key` であり、特別なアルゴリズムで再暗号化されている。
ブラウザーはこれを利用して、応答が要求に対応していることを確認する。
その後、データは WebSocket プロトコルを使用して転送される。HTTP では全然ない。

#### Extensions and subprotocols

さらに、拡張やサブプロトコルを記述するヘッダー `Sec-WebSocket-Extensions` や
`Sec-WebSocket-Protocol` が存在するかもしれない。

例えば `Sec-WebSocket-Extensions: deflate-frame` があるとすると、
これは、ブラウザーがデータ圧縮を対応していることを意味する。
ここでいう extension とは、データの転送に関連するもので、WebSocket プロトコルを拡張する機能だ。
ヘッダー `Sec-WebSocket-Extensions` は、ブラウザーが対応するすべての拡張機能一覧とともに自動的に送信される。

例えば `Sec-WebSocket-Protocol: soap, wamp` というヘッダーがあるとすると、
ただのデータではなく、SOAP や WAMP のデータを転送したいことを意味する。
WebSocket のサブプロトコルは IANA 目録に登録されている。
つまり、このヘッダーには、これから使用するデータ書式が記述されている。
このオプションのヘッダーは、新しい WebSocket の第二引数で設定される：

```javascript
let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
```

サーバーは、使用することに同意するプロトコルと拡張子の一覧を応答するはずだ。

本書ではここに要求例と応答例が来る。SOAP と WAMP は対応しているかと問われて、
SOAP は対応していると応答していると読める。

### Data transfer

WebSocket 通信は、コマ（データの断片）で構成されており、どちらからでも送信され、
いくつかの種類のものを持つことができる：

* テキスト。当事者が互いに送信するテキストデータを含む。
* バイナリデータ。当事者が互いに送信するバイナリデータを含む。
* ピンポン。接続を確認するためにサーバーから送信され、ブラウザーはこれに対して自動的に応答する。
* 接続終了および他のいくつかのサービスコマもある。

ブラウザーではテキストフレームまたはバイナリフレームだけを直接操作している。

WebSocket のメソッド `send()` は、テキストデータまたはバイナリデータのどちらか一方を送信できる。
`socket.send(body)` 呼び出しで、`Blob`, `ArrayBuffer` などの文字列またはバイナリー形式の
`body` を送信できる。設定は不要で、任意の書式で送信するだけだ。

データを受け取るとき、テキストは常に文字列でやって来る。
また、バイナリーデータについては、`Blob` 形式と `ArrayBuffer` 形式のうちどちらかを選択できる。

これをプロパティー `socket.binaryType` で設定する。
既定値は `"blob"` なので、バイナリーデータは `Blob` オブジェクトとして送られる。
`Blob` は高水準なバイナリーオブジェクトであり、
A や IMG などのタグと直接統合できるので、既定値としてはまともなものだ。
バイナリー処理に対しては、個々のデータバイトにアクセスするのに `"arraybuffer"` に変更するとよい。

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
