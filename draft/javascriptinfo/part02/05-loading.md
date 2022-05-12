---
title: Document and resource loading
date: 2022-05-06 (Fri)
---

## Page: DOMContentLoaded, load, beforeunload, unload

<!-- https://javascript.info/onload-ondomcontentloaded -->

* `DOMContentLoaded`: ブラウザーが HTML を完全にロードし、DOM 木が構築されたイベント。
  しかし画像やスタイルシートのような外部リソースはまだロードされていない可能性がある。
  DOM の準備ができているので、イベントハンドラーはノードを検索し、インターフェイスを初期化することができる。
* `load`: HTML に加え、画像やスタイルシートのような外部リソースもロードされたイベント。
  画像のサイズなどがわかる。
* `beforeunload`: ユーザーがページから離れているイベント。
  変更の保存をするか、本当にページから出るかなどを確認したりするのに利用できる。
* `unload`: これもユーザーがページから離れているイベント。統計情報を取るなどをするタイミングとして利用できる。

### DOMContentLoaded

イベント `DOMContentLoaded` は `document` で起こる。

* イベントハンドラーを取り付ける手段が `addEventListener()` 呼び出ししかない。
* 最初の例では `IMG` のサイズを得ようとしているが、リソースはまだロードされていないのでゼロが表示される。

#### DOMContentLoaded and scripts

ブラウザが HTML ドキュメントを処理しているときに `SCRIPT` タグに遭遇すると、
DOM の構築を続ける前にそれを実行する必要がある。スクリプトが DOM を変更する可能性などがあるためで、
`DOMContentLoaded` はそれを待機しなければならない。
つまり、スクリプトの実行が先で、その後に `DOMContentLoaded` イベントが発生する。

しかし、例外が二つある。次の場合には `DOMContentLoaded` イベントをブロックしない：

* 非同期的なスクリプト
* `document.createElement('script')` により生成され、ドキュメントに追加された新しいスクリプト

#### DOMContentLoaded and styles

スタイルシートは DOM に影響を与えないので、イベント `DOMContentLoaded` はそれらのロードを待機しない。
しかし、スタイルシートに依存するスクリプトが存在すると、結果的に待機することになる。

#### Built-in browser autofill

Google Chrome を含む有力なブラウザーは `DOMContentLoaded` 時にページ内のフォームに自動入力をする。
例えば、ページにログインとパスワードのフォームがあり、ブラウザーがその入力値を記憶している場合、
`DOMContentLoaded` ハンドラーは、自動入力を試みる可能性がある。

`DOMContentLoaded` ハンドラーの反応が遅延するような、先ほどと同様の条件があると、
自動入力も待機することになる。

### window.onload

冒頭のデモコードのイベントハンドラーを、代わりに `window.onload` に取り付けると、
画像のサイズが正しく取得される。

### window.onunload

`window.onunload` では遅延を伴わない処理を行うことができる。

* `navigator.sendBeacon(url, data)` なる謎のメソッドを呼び出すのに利用できる。
* サーバーからの応答を確認することはできない。ページからすでに離れている。

### window.onbeforeunload

このデモコードが記述されたように働かない？

### readyState

`document.readyState` は現在のロード状況を表す。

* "loading": ロード中。
* "interactive": ページが完全に読み込まれた。
* "complete": ページが完全に読み込まれており、かつリソースすべても読み込まれた。

状態が変化したときに起こる `readystatechange` イベントもある。

* `document.readyState` は `DOMContentLoaded` の直前に interactive になる。
* `document.readyState` はすべてのリソースが読み込まれた時点で complete となる。
* complete に切り替わるというのは `window.onload` と同じ。
* `window.onload` は常に他のすべての `load` ハンドラーの後で動作する。

## Scripts: async, defer

<!-- https://javascript.info/script-async-defer -->

ブラウザーが HTML を読み込んでいるときに `SCRIPT` タグに出くわすと、DOM の構築を続けることができなくなる。
直ちにスクリプトを実行しなければならない。スクリプトを実行して、それからページの残りを処理できるようになる。
それゆえ、スクリプト以降の内容へのアクセスに難がある。

ページのいちばん下にスクリプトを配置してしのごうとすると、今度は逆に
HTML 全体のロードをスクリプトのそれを待機してからとなり、やはり遅延しがちだ。

### defer

`SCRIPT` 要素の `defer` 属性は、ブラウザーにスクリプトを待たないように指示する。
すると、ブラウザーは HTML の処理を続け DOM を構築する。
スクリプトをバックグラウンドで読み込み、DOM が完全に構築された時点で実行する。

* `defer` スクリプトはページをブロックしない。
* `defer` スクリプトは DOM の準備ができたとき（ただし `DOMContentLoaded` イベントの前）に実行される。

ブラウザーは通常、ページをスキャンしてスクリプトを探し、それらを並行してダウンロードする。
`defer` スクリプトは定義位置の順序どおりに実行される。

* スクリプト間に依存関係がある場合にこの仕様は重要となる。

属性 `defer` は属性 `src` がある `SCRIPT` 要素にしか機能しない。
インラインスクリプトの `defer` は単に無視される。

### async

* 属性 `async` は `defer` と同様にブラウザーにスクリプトを待たないように指示する。
* 非同期スクリプトは他の非同期スクリプトを待機せず、反対に非同期スクリプトは非同期スクリプトを待機しない。
* `DOMContentLoaded` と `async` スクリプトは互いに待機しない。
  つまり、どちら先に起こってもおかしくない。
* `async` スクリプト同士は、ロードが先に完了したたほうが先に実行されると思っていい。
* 非同期スクリプトは、独立したサードパーティー製スクリプトをページに組み込む場合に最適だ。

属性 `async` は属性 `src` がある `SCRIPT` 要素にしか機能しない。
インラインスクリプトの `async` は単に無視される。

### Dynamic scripts

`script = document.createElement('script')` でスクリプトを動的に追加する場合を考える。
このようなスクリプトは特に指定がない限り `async` となる。
そうしたくない場合には `script.async = false` とする。

## Resource loading: onload and onerror

<!-- https://javascript.info/onload-onerror -->

ブラウザーが外部リソースのロードに成功したかとどうかをチェックすることができるイベントがある。

* `load`: 読み込みに成功した
* `error`: エラーが発生した

### Loading a script

前章の関数 `loadScript()` のように、動的にロードしたスクリプトの機能を参照したいとする。

#### script.onload

スクリプトオブジェクトの `load` イベントは、ロードが成功したら発生する。

#### script.onerror

スクリプトのロード失敗を追跡したければ `error` イベントが利用できる。

イベント `load`/`error` は、ロードそのものしか追跡しない。
スクリプトの内容から生じるエラーは、これらのイベントの対象外だ。
例えば、スクリプトが正常にロードされれば、たとえその中にプログラミングエラーがあったとしても、
`load` ハンドラーが反応する。
`window.onerror` ハンドラーならばスクリプトのエラーを追跡できる。

### Other resources

`load`/`error` イベントは `IMG`, `IFRAME` にも存在するが、ハンドラーが発動する条件が
`SCRIPT` と異なる。

* `IMG` の場合、ノードが DOM に追加されたタイミングではなく、属性 `src` が設定されてロードが始まったときに
  `load` ハンドラーが起動する。
* `IFRAME` の場合、ロードが終了すれば成功でも失敗でも `load` ハンドラーが起動する。

### Crossorigin policy

規則として、あるサイトのスクリプトは、他のサイトのコンテンツにアクセスできない。
正確に言うと、ある origin (domain, port, protocol) は、他の origin のコンテンツにアクセスできない。
たとえ subdomain や別の port があったとしても、これらは互いにアクセスできない、異なる origin とみなされる。

この規則は、他の domain から参照されるリソースにも影響する。
他の domain のスクリプトを使用していて、そのスクリプトにエラーがあった場合、
エラーの詳細を取得することができない（エラーもコンテンツ扱い）。

こういう規則を CORS と呼ぶ。

* 同様の CORS は、他の種類のリソースにも適用される。
* CORS を許可するには、`SCRIPT` タグに `crossorigin` 属性が必要で、
  さらにリモートサーバーは特別なヘッダーを提供する必要がある。

CORS アクセスにはレベルが三つある。

* `crossorigin` なし。アクセスは禁止される。
* `crossorigin="anonymous"`: サーバーが `Access-Control-Allow-Origin` ヘッダーに
  `*` か、こちら側の origin を付けて応答した場合にアクセスが許可される。
  ブラウザーは認証情報もクッキーもリモートサーバーに送信しない。
* `crossorigin="use-credentials"`: サーバーが `Access-Control-Allow-Origin`
  ヘッダーにこちら側の origin と `Access-Control-Allow-Credentials: true`
  を含めて送り返した場合にアクセスが許可される。
  ブラウザーは認証情報とクッキーをリモートサーバーに送信する。

スクリプトがあるリモートサーバーが `Access-Control-Allow-Origin` ヘッダーを用意している場合、
それをロードする `SCRIPT` に `crossorigin` 属性を持たせればうまくいく
（本文のデモではエラー内容を期待どおりに取得できる）。

### Tasks

#### Load images with a callback

* `img.src` のセットよりも先に `img.onload`, `img.onerror` をセットする？
* イベントハンドラーは共通でいい。したがってカウンターも共通とする。
