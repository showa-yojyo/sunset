---
title: Web components
---

Web components とは、自己完結型のコンポーネントを作るための標準規格の集合であり、
独自のプロパティーやメソッドを持つカスタム HTML 要素、カプセル化された DOM とスタイルだ。

## From the orbital height

<https://javascript.info/webcomponents-intro>

現在のところ、これらの標準は開発中だ。十分にサポートされていて、最新
の HTML/DOM 標準に統合されている機能もあれば、まだ草稿の段階である機能もある。
おそらく Google Chrome がこれらの機能に関して最も up-to-date だと考えられる。

### What's common between...

国際宇宙ステーションは、

* 多くの部品から構成され、
* それぞれの部品には細かい部品がたくさん入っている。
* 部品はたいへん複雑で、普通のウェブサイトよりもずっと複雑だ。
* 部品を、異なる国、異なる言語を話すチームが国際的に開発している。

このような複雑な装置はどのようにして作られるのだろうか。
どのような原理を借りれば、同じ水準の信頼性と拡張性を持つ開発ができるだろうか。
あるいは、少なくともそれに近いだろうか。

### Component architecture

複雑なソフトウェアを開発する際のよく知られたルールは、「複雑なソフトウェアを作る
な」だ。もし何かが複雑になったら、より単純な部分に分割し、最もわかりやすい方法で
接続することだ。

ユーザーインターフェースは、視覚的な構成要素に分割することができる。それぞれの構
成要素は、ページ上に独自の場所を持ち、きちんと説明された仕事を遂行することがで
き、他の要素から分離されている。例えば、Twitter のようなウェブサイトを見ると、コ
ンポーネントに自然に分割できる。

コンポーネントとは何か、どうやって決めるのか。それは直感、経験、常識から出てく
る。通常、コンポーネントとは、それが何を行い、どのようにページと相互作用するかと
いう観点から説明できる、独立した視覚的な実体のことだ。Twitter の UI の例では、
ページには塊があり、それぞれが独自の役割を担っているので、これをコンポーネントと
するのが論理的だ。

コンポーネントには次のものがある：

* 独自の JavaScript クラス。
* DOM 構造はそのクラスによってのみ管理され、外部のコードはそれにアクセスしない（カプセル化の原則）。
* 適用される CSS スタイル。
* API: イベント、クラスメソッドなど、他のコンポーネントと相互作用するためのもの。

コンポーネントを構築するためのフレームワークや開発手法は数多く存在し、それぞれが
独自の機能を備えている。通常、コンポーネントらしさを実現するために、特別な
CSS クラスや規約、つまり CSS スコープや DOM カプセル化などが用いられる。

Web components はそのためのブラウザー機能を内蔵している。それらをこれ以上模倣する必要はない。

* Custom elements - カスタムの HTML 要素を定義する。
* Shadow DOM - コンポーネントの内部 DOM を作成し、他から隠す。
* CSS Scoping - コンポーネントの Shadow DOM 内部のみに適用するスタイルを宣言する。
* Event retargeting など - カスタムコンポーネントをより開発に適したものにする。

## Custom elements

<https://javascript.info/custom-elements>

独自のメソッド、プロパティー、イベントなどを持つ、クラスで記述されたカスタム
HTML 要素を作成することができる。いったんカスタム要素を定義すれば、組み込み HTML
要素と同等に使用できる。 `<easy-tabs>`, `<sliding-carousel>`,
`<beautiful-upload>` などのタグを使えるように、特別なクラスを定義し、あたかもそ
れらが HTML の一部であるかのように使用できるのだ。

カスタム要素は二種類ある：

1. 自律的なカスタム要素。抽象クラス `HTMLElement` を拡張した「全く新しい」要素。
2. カスタマイズされた組み込み要素。`HTMLButtonElement` などをベースにカスタマイ
   ズされたボタンなど、組み込み要素を拡張したもの。

まず自律的な要素をやる。
カスタム要素を作成するには、その要素に関するいくつかの詳細をブラウザーに伝える必
要がある。どのように表示するか、要素がページに追加または削除されたときに何をする
か、等。これを特別なメソッドを持つクラスを作成することで行う。メソッドの数は少な
く、すべてオプショナルなので簡単だ。

```javascript
class MyElement extends HTMLElement {
    // 本書参照
}

// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
```

これによって、タグ `<my-element>` のある HTML 要素に対して、
`MyElement` インスタンスが生成され、前述のメソッドが呼び出されるようになった。
JavaScript からでも

```javascript
document.createElement('my-element')
```

を使うことができる。

カスタム要素名には記号 `-` が必要だ。例えば、my-element と super-button は有効な
名前だが、myelement は無効な名前だ。組み込み HTML 要素とカスタム HTML 要素の間で
名前の衝突が起きないようにするために、そのように規定されている。

### Example: "time-formatted"

例えば、HTML には日付・時刻を表す `<time>` が既に存在する。しかし、これだけでは何の書式化もできない。
そこで、言語を意識した美しい書式で時刻を表示する `<time-formatted>` を作成する。

```javascript
class TimeFormatted extends HTMLElement {
    connectedCallback() {
        let date = new Date(this.getAttribute('datetime') ?? Date.now());
        this.innerHTML = new Intl.DateTimeFormat("default", {
            /* 本書参照 */;
        }).format(date);
    }
}

customElements.define("time-formatted", TimeFormatted);
```

このクラスは `connectedCallback()` というメソッド一つだけを持っている。
ブラウザーは `<time-formatted>` がページに追加されたとき（または HTML 解析器がそれを検出した
とき）これを呼び出し、ブラウザー全体で十分にサポートされている組み込みの
`Intl.DateTimeFormat` データフォーマッターを使用して、きれいにフォーマットされた時
間を表示する。

```html
<time-formatted datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

----

`customElements.define` 呼び出し前に `<time-formatted>` 要素にブラウザーが遭遇しても、それはエラーではない。
その要素はまだ未定義であり、非標準のタグと同じ扱いになる。
このような未定義要素は CSS セレクターの `:not(:defined)` でスタイルを与えられる。

`customElement.define` が呼ばれると、それらは「アップグレード」されます。
それぞれについて新しい `TimeFormatted` インスタンスが生成され、
`connectedCallback` が呼ばれる。これらは `:defined` となる。

カスタム要素に関する情報を取得するためのメソッド：

* `customElements.get(name)`: 与えられた `name` のカスタム要素のクラスを返す。
* `customElements.whenDefined(name)`: 与えられた `name` のカスタム要素が定義され
  たときに resolve する `Promise` を返す。

----

上記の例で `connectedCallback` で要素の内容を作成していることに注意。
仮にコンストラクターで内容を作成すると、早過ぎるのだ。
ブラウザーはこの段階ではまだ属性を処理できておらず、
`getAttribute` を呼び出すと `null` が返される。これではレンダリング不能だ。
さらに、本当に必要なときまで作業を遅らせることは、能率の点でも優っている。

メソッド `connectedCallback` は、要素がページに追加されたときに起動される。
単に他の要素に子として追加されるだけでなく、実際にページの一部になる。つまり、
切り離された DOM を構築し、要素を生成し、後で使用するための準備をすることができる。
実際にレンダリングされるのはページ内に追加されたときだけだ。

### Observing attributes

現在の `<time-formatted>` の実装では、要素がレンダリングされた後、それ以上の属性変更
は何の効果もない。HTML 要素としては奇妙なことだ。そこで、これを修正する。

`observedAttributes()` で属性のリストを提供することで、属性を観察することができ
る。このような属性については、その属性が変更されたときに
`attributeChangedCallback()` が呼び出される。他のリストされていない属性に対して
は呼び出されない。これは性能上の理由による。

属性が変更されたときに自動更新されるようにする：

```javascript
class TimeFormatted extends HTMLElement {
    render() {
        // 従来と同様
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() {
        return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}

customElements.define("time-formatted", TimeFormatted);

// 別の場所
setInterval(() => elem.setAttribute('datetime', new Date()), 1000);
```

レンダリングのロジックは `render()` メソッドに移された。要素がページに挿入された
ときに一度だけ呼び出されるものとする。`observedAttributes()` にリストされている属性
が変更されると、`attributeChangedCallback()` が起動し、要素を再描画する。

最終的にライブタイマーを容易に作成することができる。

### Rendering order

HTML 解析器 が DOM を構築するとき、要素は親から子へと順番に処理される。
これは、カスタム要素にとって重要な結果をもたらす。
例えば、カスタム要素が `connectedCallback` で `innerHTML` にアクセスしようとすると何も得られない。

カスタム要素に情報を渡したい場合は、属性を使うことができる。これはすぐに利用できる。
または、もし本当に子要素が必要なら、遅延ゼロの `setTimeout` で子要素へのアクセスを延期してもよい。

この解決策も完璧ではない。入れ子になったカスタム要素も自分自身を初期化するために
`setTimeout` を使用する場合、それらはキューに入る。すなわち、外側の
`setTimeout` が最初に発生し、次に内側のものが発生する。
つまり、外側の要素が内側の要素より先に初期化を終えてしまうのだ。

```html
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
```

次のように実装すると、外側の要素が内側の要素よりも先に初期化を終えていることを確認できる：

```javascript
connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
}
```

入れ子になった要素の準備ができた後に発生する組み込みコールバックはない。必要であ
れば、そのようなものを独自に実装することができる。例えば、内側の要素は初期化など
のイベントを dispatch し、外側の要素はそれを listen して反応させることができる。

### Customized built-in elements

特殊なボタンを作るのであれば、既存の `<button>` の機能を再利用するのが自然だ。
組み込み HTML 要素は、そのクラスを継承して拡張したりカスタマイズしたりすることができる。
ボタンは `HTMLButtonElement` インスタンスなので、これをベースに作ってみる。

1. `HTMLButtonElement` を自作クラスで拡張する。
2. `customElements.define()` の第三引数にタグを指定する。
   同じ DOM クラスを共有する異なるタグが存在する可能性があるため、
   `extends` の指定が必要だ。
3. カスタム要素を使用するために通常の `<button>` タグを挿入するが、
   `is="hello-button"` を追加する。

```html
<script>
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener('click', () => alert("Hello!"));
    }
}

customElements.define('hello-button', HelloButton, {extends: 'button'});
</script>

<button is="hello-button">Click me</button>
<button is="hello-button" disabled>Disabled</button>
```

新しいボタンは組み込みボタンを拡張したものだ。スタイルや属性など、標準的な機能を維持する。

### Tasks

#### Live timer element

現在の時刻を表示するために <live-timer> 要素を定義しろ。

1. これは内部で `<time-formatted>` を使うべきだ。機能を重複させるべきではない。
2. 毎秒刻め。
3. 刻みごとに、カスタムイベント `tick` が生成され、現在の日付を `event.detail` に入れろ。

```html
<live-timer id="elem"></live-timer>

<script>
elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

1. ページから要素が削除されたとき、`setInterval` をクリアすること。そうでなけれ
   ば、もう必要ないにもかかわらず、カチカチと音を立て続けることになる。そして、
   ブラウザーはこの要素とそれによって参照されるものからメモリーをクリアすること
   ができない。
2. 現在の日付は `elem.date` としてアクセスできる。すべてのクラスのメソッドとプロ
   パティーは、当然ながら要素のメソッドとプロパティーだ。

## Shadow DOM

<https://javascript.info/shadow-dom>

Shadow DOM はカプセル化のために機能する。これにより、コンポーネントはそれ自身
の「影」の DOM 木を持つことができ、主ページから誤ってアクセスされることはないし、
スタイルに関するハウスルールなどを決めることもできる。

### Built-in shadow DOM

`<input type="range">` などを、ブラウザーは内部で DOM/CSS を使って描画している。
この DOM 構造は開発者向けツールで見られる。
Google Chrome の場合、開発ツールの Show user agent shadow DOM オプションを有効にする必要がある。

※どこにあるのか不明

```html
<input type="range">
    #shadow-root (user-agent)
    <div>
        <div pseudo="-webkit-slider-runnable-track" id="track"></div>
        <div id="thumb"></div>
    </div>
</input>
```

この `#shadow-root` の下に表示されるものを shadow DOM と呼ぶ。

通常の JavaScript の呼び出しやセレクターでは、組み込み shadow DOM 要素を取得でき
ない。これらは通常の子要素ではなく、強力なカプセル化技術なのだ。上の例では、便利
な属性 `pseudo` があることがわかる。これは非標準的なもので、歴史的な理由から存在
する。この属性は、CSS で部分要素のスタイルを指定するために用いられる。

```css
input::-webkit-slider-runnable-track {
    background: red;
}
```

時系列的には、ブラウザーが DOM の内部構造を使ってコントロールを実装する実験を始
めたのが`pseudo` の嚆矢で、その後、開発者が同様のことを行えるように shadow DOM
が標準化された。

この先は現代の shadow DOM 標準を使用する。

### Shadow tree

DOM 要素は、二種類の DOM 部分木があり得る。

1. Light tree: 通常の DOM 部分木であって、HTML の子要素で構成されている。
   これまでの章で見てきた部分木はすべて light だ。
2. Shadow tree: HTML に反映されない、のぞき見されない隠れた DOM 部分木。

要素が両方を持つ場合、ブラウザーは shadow tree しか描画しない。しかし、
shadow tree と light tree の間にある種の合成を設定することも可能だ（詳細は後述）。

Shadow tree をカスタム要素で使用して、コンポーネント内部を隠したり、コンポーネント固有のスタイルを適用したりすることができる。
たとえば、本書の `<show-hello>` 要素は shadow tree でその内部 DOM を隠蔽する。
Google Chrome の開発ツールで結果の DOM を見ると、内容物すべてが `#shadow-root` の下にあることがわかる。

```html
<show-hello name="John">
    #shadow-root (open)
    <p>Hello, John</p>
</show-hello>
```

最初に `elem.attachShadow({mode: ...})` 呼び出しが shadow tree を生成する。
制約が二つある：

1. 要素一つにつき shadow root を一つしか生成できない。
2. `elem` はカスタム要素か、次のうちの一つでなければならない：
   * article
   * aside
   * blockquote
   * body
   * div
   * footer
   * h1...h6
   * header
   * main
   * nav
   * p
   * section
   * span

オプション `mode` は、カプセル化レベルを設定する。

* "open": shadow root が `elem.shadowRoot` として利用可能。
  どんなコードでも `elem` の shadow tree にアクセスすることができる。
* "closed": `elem.shadowRoot` は常に `null` となる。

`attachShadow()` が返す参照によってしか shadow DOM にアクセスできない。
`<input type="range">` のようなブラウザーネイティブの shadow tree は閉じている。
それらにアクセスする方法はない。

`attachShadow()` が返す shadow root は要素のようなもので、
`innerHTML` や `append()` などの DOM メソッドを使用して、shadow root に情報を入力することができる。

Shadow root を持つ要素は shadow tree host と呼ばれ、プロパティー `host`として利用可能だ。

### Encapsulation

Shadow DOM はメインドキュメントから強く分離される。

1. Shadow DOM の要素は light DOM の `querySelector` からは見えない。特に、
   Shadow DOM の要素は light DOM の要素と矛盾する ID を持つ可能性がある。それらは
   shadow tree の中でのみ一意的でなければならない。
2. Shadow DOM は独自のスタイルシートを持つ。外部 DOM からのスタイルルールは適用されない。

ドキュメントからのスタイルは shadow tree に影響を与えない。
Shadow tree の要素を取得するには、木の内側から問い合わせを実行する必要がある。

## Template element

<https://javascript.info/template-element>

組み込み `<template>` 要素は、HTML マークアップテンプレート置場として機能する。
ブラウザーはその内容を無視し、構文の妥当性のチェックしかしないが、
JavaScript でそれにアクセスし、他の要素を作成するのに利用できる。

`<template>` の内容は、通常は適切な囲みタグを必要とするものであっても、有効な
HTML であれば何でもよい。例えば、テーブルの行 `<tr>` をそこに置くことができる。
通常、`<tr>` を例えば `<div>` の中に置こうとすると、ブラウザーは無効な DOM 構造
を検出し、それを「修正」して `<table>` を周囲に追加する。一方、`<template>` は、
そこに置いたものをそのまま保持する。

`<template>` にはスタイルやスクリプトを入れることもできる。

ブラウザーは `<template>` 内容物を「文書の外にある」と見なす。つまりスタイルは適用さ
れず、スクリプトは実行されず、`<video autoplay>` は実行されない、など。
内容物は、ページに挿入された時点で生を受ける（スタイルが適用され、スクリプトが実行され、……）。

### Inserting template

テンプレートの内容物はプロパティー `content` に DOM ノードの特殊な型である
`DocumentFragment` として利用可能だ。
これを他の DOM ノードと同じように扱うことができるが、特別な特性が一つある。
これをどこかに挿入すると、代わりにその子（複数形）が挿入される。

本書のコードを示す：

```html
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');
  elem.append(tmpl.content.cloneNode(true));
  document.body.append(elem);
</script>
```

スクリプト部分を読むと、ページ内の `template` 要素への `cloneNode()` 呼び出しがあることがわかる。
これは `template` ではなく、その子である `script` および `div` の二つを複製するということになる。
複製を新規作成した `div` の末尾に差し込んでいる。実行ボタンを押せば上の解読が正しそうだと思える。

----

前章の shadow DOM の例（に似たもの）を `template` を使って書き換える。
Shadow DOM 版はこういう感じ：

```javascript
elem.attachShadow({mode: 'open'});
elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p id="message">Hello from the shadows!</p>
`;
```

これがこうなる：

```javascript
elem.attachShadow({mode: 'open'});
elem.shadowRoot.append(tmpl.content.cloneNode(true));
elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
```

`tmpl.content` を複製して挿入する行では、その `DocumentFragment` として、
その子である `style`, `p` が代わりに挿入される。

これらは shadow DOM を形成する。

## Shadow DOM slots, composition

<https://javascript.info/slots-composition>

タブ、メニュー、イメージギャラリーなど、多くの種類のコンポーネントがレンダリング
のために中身を必要とする。組み込み `<select>` が `<option>` を期待するように、自
作 `<custom-tabs>` や `<custom-menu>` は実際のタブ中身やメニュー項目が渡されるこ
とを期待するだろう。

```html
<custom-menu>
  <title>Candy menu</title>
  <item>Lollipop</item>
  <item>Fruit Toast</item>
  <item>Cup Cake</item>
</custom-menu>
```

与えられたタイトルとアイテムから、自作メニューを適切に描画したりイベント処理をしたりする必要がある。

どのように実装するのか？
要素の内容を解析して、DOM ノードを動的にコピーして並べ替えることもできる。
それでもいいが、要素を shadow DOM に移動する場合、ドキュメントからの CSS スタイル
はそこに適用されないので、視覚的スタイルが失われる可能性がある。また、その
ために追加的なコーディングが必要だ。

幸いなことに、その必要はない。Shadow DOM は `<slot>` 要素をサポートしてお
り、light DOM からの中身で自動的に埋まる。

### Named slots

簡単な例で、スロットがどのように機能するかを見る。
本書のコードでは `<user-card>` shadow DOM がスロットを二つ持ち、light DOM から埋められる。

スクリプトコードで `innerHTML` として現れている shadow DOM では、
`<slot name="X">` が挿入ポイント、つまり `slot="X"` 要素が描画される場所を定義している。

すると、ブラウザーは「合成」をする。HTML コードで現れている Light DOM から要素を
取得し、shadow DOM の対応するスロットに描画する。最終的には、データを埋めること
ができるコンポーネントが完成する。

学習者ノート：本書では合成を考慮しないスクリプト実行後の DOM 構造がここに書かれている。
これは Google Chrome の検証ツールで示されるものと同じだ。

これで、この要素は light と shadow の両方の DOM を持つようになった。

描画するには、shadow DOM の各 `<slot name="...">` に対して、ブラウザーは light
DOM で同じ名前の`<slot="...">` を見つける。これらの要素はスロットの内部で描画さ
れる。その結果を平坦化 DOM と呼ぶ。

しかし、平坦化 DOM は描画とイベント処理のためだけに存在する。実際にはドキュメン
ト内のノードは移動していないのだ。このことは `querySelectorAll()` を実行すれば簡
単に確認できる。ノードはまだ元の場所にある。

つまり、平坦化 DOM は、スロットを挿入することで shadow DOM から派生したものだ。
ブラウザーはこれを描画し、スタイル継承やイベント伝達に用いる。しかし JavaScript
では平坦化前のままのドキュメントを見ている。

----

囲み記事：トップレベルの子しか `slot="..."` 属性を持てない。
属性 `slot="..."` は、shadow host の直接の子要素に対してしか有効でない。入れ子要素では無視される。
次の例では二番目の `<span>` は `<user-card>` の最上位の子ではないので無視される。

```html
<user-card>
  <span slot="username">John Smith</span>
  <div>
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```

----

Light DOM 内に同じスロット名を持つ要素が複数ある場合、それらは順番にスロットに追加される。

### Slot fallback content

`<slot>` の中に何かを入れると、それが既定の中身になる。
対応する中身に相当するものが light DOM にない場合、ブラウザーはその `<slot>` の中の何かを表示する。
たとえば、この shadow DOM の断片で light DOM に `slot="username"` がない場合、Anonymous が表示される：

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

### Default slot: first unnamed

Shadow DOM の `<slot>` で名前を持たない最初のものが既定スロットだ。
これは、他の場所でスロット化されていない light DOM のノードすべてを得る。

例えば shadow DOM を次のようにする：

```html
<div>Name:
  <slot name="username"></slot>
</div>
<div>Birthday:
  <slot name="birthday"></slot>
</div>
<fieldset>
  <legend>Other information</legend>
  <slot></slot>
</fieldset>
```

ノート：この `<slot></slot>` が既定スロットとなる。

対応する light DOM を次のようにしてみる：

```html
<user-card>
  <div>I like to swim.</div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
  <div>...And play volleyball too!</div>
</user-card>
```

スロットされていない light DOM の中身である `<div>` 要素二つは、すべて Other
information の次要素として入る（本書の平坦化 DOM 参照）。要素は次々とスロットに
追加されるので、スロットされていない両方の情報が一緒に既定スロットに入る。

### Menu example

本章冒頭の `<custom-menu>` を考える。スロットを使って、要素を分散させることがで
きる。`<custom-menu>` を次のように定義する：

```html
<custom-menu>
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
  <li slot="item">Cup Cake</li>
</custom-menu>
```

これに対応する、適切なスロットを持つ shadow DOM テンプレートをこうする：

```html
<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

1. `<span slot="title">` は `<slot name="title">` に入る。
2. `<li slot="item">` が複数あるが、`<slot name="item">` は一つしかない。そのよ
   うな `<li slot="item">` はすべて `<slot name="item">` に次々と追加され、リス
   トを形成する。

本書の平坦化 DOM の模式図を参照。
有効な DOM において、`<li>` は `<ul>` の直接の子でなければならない。
しかし、これは平坦化 DOM であり、コンポーネントがどのように描画されるかを記述するもので、
ここではそのようなことは自然に起こる。

あとは、リストを開閉するためのクリックハンドラーを追加して `<custom-menu>` が完成する
（本書で実装例を示している）。イベントやメソッドなど、より多くの機能を追加することも可能だ。

### Updating slots

外側のコードでメニュー項目を動的に追加削除したければどうするだろうか。ブラウザー
はスロットを監視し、スロットの要素が追加削除された場合に描画を更新する。ま
た、light DOM ノードはコピーされず、スロットに描画されるだけなので、その内部の変
更はすぐに顕在化する。

そのため、描画を更新するために何かする必要はない。しかし、コンポーネントコードが
スロットの変更について知りたい場合は、イベント `slotchange` を利用できる。

本書では、メニュー項目を一秒後に動的に挿入し、タイトルを二秒後に変更するコードを示している。
ここでイベント `slotchange` が二つある。

1. 初期化時

   light DOM から `slot="title"` が対応するスロットに入ったときにすぐに発射する。

2. 一秒後

   新しい `<li slot="item">` が追加されたときに発射する。

なお、二秒後 `slot="title"` の内容が変更されるが、イベント `slotchange` は発射しない。
スロットが変更されないから。スロットされた要素内の中身を変更するのだが、別のことだ。

JavaScript から light DOM の内部変更を追跡したい場合、より汎用的な
`MutationObserver` の仕組みを利用することもできる。

### Slot API

前に見たように、JavaScript は平坦化せずに実際の DOM を見る。しかし、shadow tree
が `{mode: 'open'}` を持っていれば、どの要素がスロットに割り当てられている
か、逆に、その中の要素によってスロットを把握することができるのだ。

* `slot.assignedNodes({flatten: true/false})`: スロットに割り当てられた DOM ノー
  ドを返す。オプション `flatten` は `false` が既定値だ。明示的に `true` に設定す
  ると、平坦化 DOM をより深く調べ、入れ子コンポーネントの場合は入れ子スロットを
  返し、ノードが割り当てられていない場合はフォールバック用の値を返す。
* `slot.assignedElements({flatten: true/false})`: スロットに割り当てられた DOM
  要素。ただし要素ノード限定。

これらのメソッドは、スロットされたコンテンツを表示するだけでなく、JavaScript で
それを追跡する必要がある場合に便利だ。例えば `<custom-menu>` コンポーネントが何
を表示しているかを知りたい場合、イベント `slotchange` を追跡し、
`slot.assignedElements()` から項目を得られる。

## Shadow DOM styling

<https://javascript.info/shadow-dom-style>

### :host

### Cascading

### :host(selector)

### Styling slotted content

### CSS hooks with custom properties

### Summary

### Comments

## Shadow DOM and events

<https://javascript.info/shadow-dom-events>

### Bubbling, event.composedPath()

### event.composed

### Custom events

### Summary

### Comments
