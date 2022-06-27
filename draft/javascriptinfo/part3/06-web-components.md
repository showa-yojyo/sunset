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

### Built-in shadow DOM

### Shadow tree

### Encapsulation

### References

### Summary

### Comments

## Template element

<https://javascript.info/template-element>

### Inserting template

### Summary

### Comments

## Shadow DOM slots, composition

<https://javascript.info/slots-composition>

### Named slots

### Slot fallback content

### Default slot: first unnamed

### Menu example

### Updating slots

### Slot API

### Summary

### Comments

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
