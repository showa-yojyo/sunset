---
title: Frames and windows
---

## Popups and window methods

<https://javascript.info/popup-windows> ノート。

ポップアップウィンドウはユーザーに文書を追加的に表示する最も古い方法の一つだ。

```javascript
window.open('https://javascript.info/');
```

与えられた URL で新しいウィンドウを開く。最近のブラウザーは、別ウィンドウではな
く、新しいタブで開くように設定されているものがほとんどだ。

ポップアップは、本当に古い時代から存在している。当初の着想は、メインウィンドウを
閉じることなく、別の内容を表示することだった。今では別の方法がある。`fetch()` で
内容を動的に読み込み、`<div>` を動的に生成してそこに表示できる。ポップアップは日
常的に使うものではない。

また、複数のウィンドウを同時に表示できないモバイル機器では、ポップアップは厄介な
存在だ。

それでも、OAuth 認証（Google/Facebook/...でログイン）のように、ポップアップが使
われるタスクがあるのは、以下の理由による：

* ポップアップは独立したウィンドウであり、JavaScript 環境が独自のものになる。
  それゆえ、サードパーティーの信頼できないサイトからのポップアップを開いても安全だ。
* ポップアップを開くのはとても容易だ。
* ポップアップは URL を変更したり、自身を開いたウィンドウに対してメッセージを送れる。

### Popup blocking

かつての悪質なサイトのページでは、広告の入ったポップアップウィンドウを大量に開く
ことがあった。現在では、ブラウザーのほとんどがポップアップをブロックし、利用者を
保護しようとしている。

ブラウザーの大半は、ポップアップが `onclick` のような利用者発イベントハンドラー
の外部で呼び出された場合、ポップアップを抑止する。

ノート：イベントハンドラーの中からでなければ `window.open()` は効かないと言っている。

この方法では、利用者は不要なポップアップからある程度保護されるが、機能は完全に無
効化されるわけではない。ポップアップが `onclick` から `setTimeout()` により後に
開かれる場合はどうなるか。これはブラウザーによりけりで、開くものもあれば、そうで
ないものもある。本書では指定する遅延時間によっても挙動が変わると述べている。

```javascript
setTimeout(() => window.open('http://google.com'), 3000);
```

### window.open

```javascript
window.open(url, name, params);
```

* `url`: 新しいウィンドウに読み込む URL.
* `name`: 新しいウィンドウの名前。各ウィンドウは `window.name` を持ち、ここで
  ポップアップに使用するウィンドウを指定できる。そのような名前のウィンドウがすで
  に存在する場合、指定された URL をそのウィンドウで開き、そうでなければ新しい
  ウィンドウを開く。
* `params`: 新しいウィンドウの設定文字列。カンマで区切られた設定項目を含む。
  `params` には空白を入れてはいけない。例としては `"width=200,height=100"` が通
  る。
  * Position:
    * `left`/`top` (numeric): ウィンドウ左上スクリーン座標。画面外を指定してはい
      けない。
    * `width`/`height` (numeric): ウィンドウの横と縦の長さ。見えない大きさにして
      はいけない。
  * Window features:
    * `menubar` (yes/no): ブラウザーメニューを表示するかどうか。
    * `toolbar` (yes/no): ブラウザーのナビゲーションバー（戻る、進む、再読み込み
      など）を表示するかどうか。
    * `location` (yes/no): URL 欄を表示するかどうか。一部ブラウザーでは隠せな
      い。
    * `status` (yes/no): ステータスバーを表示するかどうか。ここでも、ブラウザー
      のほとんどで強制的に表示されるようになっている。
    * `resizable` (yes/no): 推奨されない設定項目。
    * `scrollbars` (yes/no): 推奨されない設定項目。

この他にも、あまりサポートされていないブラウザー固有の機能があり、通常は使用され
ない。

### Example: a minimalistic window

最低限の機能を持つウィンドウを開き、ブラウザーがどの機能を無効化できるかを調べ
る。本書のコードでは、ほとんどの「ウィンドウ機能」が無効化され、ウィンドウは画面
の外に配置されるように引数を指定している。実際に何が起こるか試すと、幅・高さがゼ
ロで、左・上部が画面外にあるような奇妙な指定をブラウザーは「修正」することが認め
られる。例えば、Chrome はこのようなウィンドウを幅と高さを目一杯使って開き、画面
全体を占めるようにする。

```javascript
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

通常の配置オプションを追加して、適正な `width`, `height`, `left`, `top` を設定す
ると、ブラウザーのほとんどは、要求されたとおりのウィンドウを表示する。

`window.open()` 呼び出しにおいて設定が省略された場合の規則：

* 第三引数がない場合、既定のウィンドウ引数が採用される。
* `params` が文字列で与えられていて、いくつかの yes/no 機能が省略されている場
  合、省略された機能は値がないものとみなされる。したがって、`params` を指定する
  場合は、必要な機能すべてを明示的に `yes` に設定すること。
* `left`/`top` がなければ、新しいウィンドウが最後に開いたウィンドウの近くに出現
  する。
* `width`/`height` がなければ、新しいウィンドウの寸法は最後に開いたものと同じに
  なる。

### Accessing popup from window

`open()` 呼び出しは、新しいウィンドウへの参照を返す。これは、プロパティーを操作
したり、場所を変更したり、さらに多くのことに利用できる。

```javascript
let newWin = window.open("about:blank", "hello", "width=200,height=200");
newWin.document.write("Hello, world!");
```

ノート：元々ある `window` と同格のオブジェクトを得られることになる。

ロード後に内容を変更することもできる。
`window.open()` の直後は、新しいウィンドウはまだロードされていない。
そのため、変更は `onload` か、`DOMContentLoaded` ハンドラーで行う。

```javascript
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();
newWindow.onload = function() {
    let html = `<div style="font-size:30px">Welcome!</div>`;
    newWindow.document.body.insertAdjacentHTML('afterbegin', html);
};
```

----

ウィンドウ同士は、同一オリジンである場合にのみ、互いの内容に自由にアクセスできる。
そうでない場合は、利用者安全保障上不可能だ。

### Accessing window from popup

ポップアップは `window.opener` を参照して、自身を開いたウィンドウにアクセスでき
る。このプロパティーの値は、ポップアップ以外のウィンドウでは `null` だ。

次のコードでは、現在のウィンドウの内容が "Test" に置き換わる：

```javascript
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

ウィンドウ間の接続は双方向であり、メインウィンドウとポップアップが相互に参照し
あっているのだ。

### Closing a popup

ウィンドウを閉じるには `win.close()` とする。閉じられているかどうかを調べるには
`win.closed` をチェックする。

技術的には、メソッド `close()` はどのウィンドウにも使えるが、ウィンドウが
`window.open()` で作られていない場合、`window.close()` はブラウザーのほとんどが
無視する。つまり、ポップアップでしか機能しない。

プロパティー `closed` は、ウィンドウが閉じられていれば `true` となる。これはポッ
プアップ（またはメインウィンドウ）がまだ開いているかどうかを確認するのに便利だ。
利用者はいつでもウィンドウを閉じることができるので、コードはその可能性を考慮する
必要がある。

ウィンドウを読み込んでから閉じるコード：

```javascript
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
    newWindow.close();
    alert(newWindow.closed); // true
};
```

### Moving and resizing

ウィンドウを移動するメソッドと寸法を変更するメソッドがある。

* `win.moveBy(x, y)`: 現在位置から右に `x` ピクセル、下に `y` ピクセル相対的に
  ウィンドウを動かす。負の値を許す。
* `win.moveTo(x, y)`: 画面上の座標 `(x, y)` にウィンドウを動かす。
* `win.resizeBy(width, height)`: 現在の寸法から相対的に指定された `width`,
  `height` でウィンドウの寸法を変更する。負の値を許す。
* `win.resizeTo(width, height)`: 与えられた寸法に変更する。

また、イベント `window.onresize` もある。

悪用を防ぐために、ブラウザーは通常これらの方法をブロックしている。これらのメソッ
ドは、自分で開いた、追加のタブがないポップアップに対してのみ、確実に機能する。

JavaScript にはウィンドウを最小化したり最大化したりする手段がない。
これらの OS レベルの機能は、フロントエンドの開発者に対して隠蔽されている。

ウィンドウを最大化または最小化した場合、上記のメソッド群は機能しない。

### Scrolling a window

ウィンドウのスクロール一般については履修済みだ。

`win.scrollBy(x, y)`:
ウィンドウを現在のスクロールに対して右に `x` ピクセル、下に `y` ピクセルスクロー
ルする。負の値を許す。

`win.scrollTo(x, y)`:
ウィンドウを与えられた座標 (x, y) にスクロールする。

`elem.scrollIntoView(top = true)`:
`elem` が上部に表示されるように（既定）、または `elem.scrollIntoView(false)`
の場合は下部に表示されるようにウィンドウをスクロールさせる。

また、イベント `window.onscroll` もある。

### Focus/blur on a window

理論的には、ウィンドウにフォーカスを当てたり外したりするためのメソッドとして
`window.focus()` および `window.blur()` が存在する。また、それらに対応するイベン
トもそれぞれ存在する。これらを使えば、訪問者がウィンドウにフォーカスし、別の場所
に切り替えた瞬間を捕捉することができる。しかし、過去に悪いページがこれらを悪用し
たため、実際には厳しく制限されている。

```javascript
window.onblur = () => window.focus();
```

このコードの意図は、利用者をウィンドウ内に「閉じ込める」ことだ。ブラウザーはこの
ようなコードを禁止し、広告や悪質なページから利用者を保護するために多くの制限を導
入する必要があった。たとえば、モバイルブラウザーは `window.focus()` を通常、完全
に無視する。また、ポップアップが新しいウィンドウではなく別のタブで開かれる場合、
フォーカス制御は機能しない。それでも、このような呼び出しが機能する利用場面がいく
つかあり、便利なことがある。

例えば、ポップアップを開くときに、`newWindow.focus()` を実行するのは良い考えであ
るかもしれない。 OS とブラウザーの組み合わせ次第では、利用者が新しいウィンドウに
いることを確認できる。

訪問者が実際にウェブアプリを使用するタイミングを追跡したい場合は、
`window.{onfocus,onblur}` を追跡できる。これにより、ページ内の活動状況やアニメー
ションなどを一時停止または再開することができる。しかし、イベント `blur` では、訪
問者がウィンドウから切り替えたことを意味するが、まだ観察している可能性がある。
ウィンドウはバックグラウンドにあるのだが、まだ見えている可能性がある。

## Cross-window communication

<https://javascript.info/cross-window-communication> ノート。

同一オリジン政策は、ウィンドウとフレームの相互的アクセスを制限する。これは、利用
者がページを二つ開いている場合、一方は john-smith.com で、他方はgmail.com だとす
ると、john-smith.com にあるスクリプトが gmail.com にある我々のメールを読むことは
望まないだろうというものだ。つまり、同一オリジン政策の目的は、情報の盗難から利用
者を保護することにある。

### Same Origin

ノート：ここに書いてあるのは以前学習した内容の復習だと思う。

URL 二つのプロトコル、ドメイン、ポートのそれぞれが同じである場合、この二つの
URL はオリジンが同じであると言う。

これらの URL すべては同じ出所だ：

* <http://site.com>
* <http://site.com/>
* <http://site.com/my/page.html>

これらのものはそうではない：

* <http://www.site.com>: www に注意
* <http://site.org>: org
* <https://site.com>: https
* <http://site.com:8080>: 8080

同一オリジン政策は次のことを述べている：

* 他のウィンドウ、例えば `window.open()` で生成されたポップアップや `<iframe>`
  内のウィンドウへの参照を持っていて、そのウィンドウが同じオリジンから来ている場
  合、そのウィンドウに完全にアクセスすることができる。
* そうでなければ、それが別のオリジンから来たものであれば、そのウィンドウの内容、
  変数、ドキュメント、その他にアクセスすることはできない。唯一の例外は
  `location`で、これを変更することができる（したがって利用者を転送することができ
  る）。しかし、`location` を読み取ることはできない（利用者が今どこにいるのかを
  知ることはできず、情報漏れは起こらない）。

#### In action: iframe

タグ `<iframe>` は、独立した組み込みウィンドウを収容する場所となり、それ自身の独
立した`document` と `window` オブジェクトを持つ。

次に挙げるプロパティーを使えばこれらのオブジェクトにアクセスできる。

* `iframe.contentWindow`: `<iframe>` 内のウィンドウ。
* `iframe.contentDocument`: `<iframe>` 内のドキュメント。
  `iframe.contentWindow.document` と同じ。

埋め込まれたウィンドウの中の何かにアクセスするとき、ブラウザーは `iframe` が同じオリジン
であるかどうかをチェックする。もしそうでなければ、アクセスを拒否する。
ただし `location` への書き込みは例外で、まだ許可する。

`<iframe>` に対して別のオリジンから読み書きを行ってみると、
以下の操作だけが成功し、それ以外ではエラーが発生する：

* `iframe.contentWindow` への参照取得
* `location` への書き込み

それとは逆に、`<iframe>` が同じオリジンであれば、何でもできる。

----

`<iframe>` タグ上、イベント `iframe.onload` は、基本的に埋め込まれたウィンドウ上
`iframe.contentWindow.onload` と同じものだ。これは、埋め込みウィンドウが全ての資
源を完全にロードすると発生する。しかし、他のオリジンに関する
`iframe.contentWindow.onload` にはアクセスできないので`iframe.onload` を使用す
る。

### Windows on subdomains: document.domain

その定義上、異なるドメインである二つの URL はオリジンが異なる。
しかし、ウィンドウが同じ第二水準ドメイン、たとえば
john.site.com, peter.site.com, site.com を共有している場合、ブラウザーにその違いを無視させて、
ウィンドウ間通信の目的のために同じオリジンであるものとして扱わせることができる。
これを実現するには、そのようなウィンドウごとに、次のコードを実行する必要がある：

```javascript
document.domain = 'site.com';
```

プロパティー `document.domain` は仕様から削除される方向にある。その代わりのものが提案されている。
今のところ、すべてのブラウザーがこれを対応しているし、
`document.domain` に依存している古いコードを壊さないように、将来にわたって維持される予定だ。

### Iframe: wrong document pitfall

`iframe` が同じオリジンから来た場合、そのドキュメントにアクセスする可能性がある場
合、落とし穴がある。
`iframe` は生成されるとすぐにドキュメントを持つ。しかし、そのドキュメントは
`iframe` に読み込まれるものとは別だ。
もし、そのドキュメントに対してすぐに何かをすると、それはおそらく失われるはずだ。

まだロードされていない `iframe` のドキュメントを操作するべきではない。
なぜなら、それは間違ったドキュメントだからです。それにイベントハンドラーを設定しても無視される。

ドキュメントがそこにある瞬間をどのように検出するか。
`iframe.onload` が起こされたとき、正しいドキュメントがそこにあることは間違いない。
しかし、これは、資源のすべてを含む `iframe` 全体がロードされたときにしか起こされない。
`setInterval()` でチェックすることで、より早くその瞬間を捉えられる：

```html
<iframe src="/" id="iframe"></iframe>

<script>
    let oldDoc = iframe.contentDocument;

    // every 100 ms check if the document is the new one
    let timer = setInterval(() => {
        let newDoc = iframe.contentDocument;
        if (newDoc == oldDoc) return;

        alert("New document is here!");

        clearInterval(timer); // cancel setInterval, don't need it any more
    }, 100);
</script>
```

ノート：一定時間間隔で何かをテストするコードは上のような形で
`setInterval()` と `clearInterval()` を呼ぶことを理解する。

### Collection: window.frames

`<iframe>` に対するウィンドウオブジェクトを取得する別の方法として、名前付きコレ
クション `window.frames` がある。

* 番号で指定: `window.frames[0]`: ドキュメント内の最初のフレームのウィンドウ。
* 名前で指定: `window.frames.iframeName`: `name="iframeName"` であるフレームのウィンドウ。

一つの `iframe` は、内部に他の `iframe` を複数含める。対応するウィンドウオブジェクトは階層を形成する。

* `window.frames`: 子ウィンドウのコレクション（入れ子フレームの場合）
* `window.parent`: 親（外側の）ウィンドウ
* `window.top`: いちばん上の親ウィンドウ

プロパティー `top` を使って、現在の文書がフレーム内に開かれているかどうかを確認できる。

### The "sandbox" iframe attribute

`<iframe>` の属性 `sandbox` では、信頼できないコードの実行を防ぐために、フレーム内の特定のアク
ションを除外することを可能にする。
`iframe` が別の場所から来たものとして扱ったり、他の制限を適用することによって、
`iframe` を砂箱に置くものだ。

`<iframe sandbox src="...">` に適用される制限の既定値（の集合）はある。しかし、例えば次のように、
適用すべきでない制限を空白文字区切りリストを属性の値として指定すると、制限を緩和することができる：

```html
<iframe sandbox="allow-forms allow-popups">
```

言い換えれば、空の `sandbox` は、可能な限り厳しい制限をするが、解除したい制限を空白文字区切りリストで指定できる。

TODO: Sphinx で DL に置き換える：

`allow-same-origin`:
通常は `sandbox` は `iframe` に対して異なるオリジン政策を強制する。
ブラウザーは `iframe` の `src` が同じサイトを指していても、別のオリジンから来たものとして扱う。
スクリプトに対するすべての暗黙の制限だ。このオプションはそれを取り除く。

制限オプションの一部を次に示す：

`allow-top-navigation`:
`iframe` が `parent.location` を変更できるようにする。

`allow-forms`:
`iframe` からフォームを提出できるようにする。

`allow-scripts`:
`iframe` からスクリプトを実行できるようにする。

`allow-popups`
`iframe` から `window.open()` でポップアップを表示できるようにする。

本書のここにある例では、`sandbox` に何も指定しない `iframe` を示している。
Google に入力テキストを送りつける JavaScript とフォームがあるものの、何も動作しない。
ボタンのイベントハンドラーすら走らない。既定値は本当に厳しい。

属性 `sandbox` の目的は、制限を追加することしかない。取り除くことはできない。
特に、`iframe` が他のオリジンから来た場合、同一オリジンの制限を緩和することはできない。

### Cross-window messaging

`postMessage()` は、ウィンドウ同士がどのオリジンから来たものであっても通話できるよ
うにするものだ。つまり、同一政策を回避する。john-smith.com のウィンドウが
gmail.com と会話し、情報を交換することを可能にする。ただし、両者が同意し、対応す
る JavaScript 関数を呼び出した場合だけだ。そのため、利用者にとって安全だ。

インターフェースは二つの部分から構成されている。

#### postMessage

メッセージを送りたいウィンドウは、受信側のウィンドウのメソッド `postMessage()`
を呼び出す。`win` にメッセージを送りたいとすると、

```javascript
win.postMessage(data, targetOrigin);
```

を呼び出す必要がある。

TODO: DL にする。

`data`:
送信するデータ。任意のオブジェクトを指定でき、データは「構造化直列化アルゴリズ
ム」を使って複製される。 IE は文字列しか対応していないので、複雑なオブジェク
トを`JSON.stringify()` する必要がある。

`targetOrigin`:
到達ウィンドウのオリジンを指定し、指定されたオリジンからのウィンドウのみが
メッセージを受け取るようにする。

`targetOrigin` は安全策だ。到達ウィンドウが他のオリジンから来た場合、送信者ウィ
ンドウの位置を読み取ることができないので、目的のウィンドウで今どのサイトが開いて
いるかを確認することはできない。利用者は移動することができ、送信者ウィンドウはそ
れについて何もわからない。 `targetOrigin` を指定することで、ウィンドウがデータを
受け取るのは、それがまだ正しいサイトにいる場合だけであることを保証する。データの
機密性が高い場合に重要だ。

```html
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
  // If we don’t want that check, we can set targetOrigin to *.
  //win.postMessage("message", "*");
</script>
```

#### onmessage

メッセージを受信するには、受信側ウィンドウにイベント `message` のハンドラーを設定する。
これは、`postMessage() `が呼ばれたとき、および `targetOrigin` のチェックが成功したときに発生する。

イベントオブジェクトは特別なプロパティーがある：

TODO: DL

`data`:
`postMessage()` から受け取ったデータ。

`origin`:
送信側のオリジン。URL 文字列だと思うといい。

`source`:
送信側ウィンドウへの参照。そうしたければ、`source.postMessage()` 返しがすぐにできる。

ハンドラーは、`addEventListener()` でしか割り当てられない。`onmessage` への代入ではダメだ。

例：

```javascript
window.addEventListener("message", function(event) {
    if (event.origin != 'http://javascript.info') {
      // something from an unknown domain, let's ignore it
      return;
    }
    // ...

    // can message back using event.source.postMessage(...)
});
```

## The clickjacking attack

<https://javascript.info/clickjacking> ノート。

### The idea

### The demo

### Old-school defences (weak)

#### Blocking top-navigation

#### Sandbox attribute

### X-Frame-Options

### Showing with disabled functionality

### Samesite cookie attribute

### Summary

### Comments
