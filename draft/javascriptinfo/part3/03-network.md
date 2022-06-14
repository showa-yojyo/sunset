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
