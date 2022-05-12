---
title: Introduction to Events
---

ブラウザーイベント、そのプロパティーと処理の入門。

## Introduction to browser events

<!-- https://javascript.info/introduction-browser-events -->

すべての DOM 要素はイベントを発生させる。
マウスイベント、キーボードイベント、フォームイベント、ドキュメントイベント、CSS イベントなどに分類することができる。

### Event handlers

イベントに反応するために、イベントハンドラーと呼ばれるコードを定義することができる。
割り当てる場所の候補が複数ある。

#### HTML-attribute

HTML ファイルに書いてあるタグで、イベントハンドラーに対応する属性に直接指定する。
この属性は名前が `on` から始まるという特徴がある。

この値は文字列で表された JavaScript コードをとる。長い文字列を書くのは自然でないので、
普通は `SCRIPT` タグで定義された関数の呼び出しの形をとる。

#### DOM property

スクリプト内で、イベントハンドラーに対応する DOM プロパティーに直接割り当てることもできる。

* 今度は文字列ではなく関数を割り当てる。
* 前述のようにして HTML でタグにハンドラーを定義すると、タグに対応する
  DOM 要素のイベントハンドラープロパティーもその値を取る。
* 例えば `onclick` プロパティーはタグ・DOM 要素一つにつき一つしかないので、
  複数のイベントハンドラーを割り当てることはできない。
* ハンドラーを削除するには `null` を割り当てる。例えば `elem.onclick = null;` とする。

### Accessing the element: this

ハンドラーコードの内部にある `this` は要素を参照している。
HTML コードでインライン的にイベントハンドラーを定義すると、
そのハンドラーコードに書かれている `this` はタグを表す DOM 要素自身になる。

### Possible mistakes

基本的だが、関数呼び出しか関数そのものかを区別すること。
HTML のマークアップでイベントハンドラーを定義する場合には前者の形になるのが普通だ。

メソッド `elem.setAttribute()` でイベントハンドラーを定義することはできない。
次の節で紹介されているメソッドを知ると、この間違いを犯さなくなる。

JavaScript では識別子の大文字小文字を区別するので、HTML のタグの属性名のように気分で変えてはならない。
`onclick` のように、全て小文字であるのが通例だ。

### addEventListener

上述の指定方法では一つのイベントに一つのイベントハンドラーしか与えられない。
一般的には複数のハンドラーを定義したい。そこで、次のメソッドを利用する：

```javascript
element.addEventListener(event, handler, [options]);
element.removeEventListener(event, handler, [options]);
```

* 引数 `event` はイベント名。上述のプロパティー名の先頭の `on` を除外した文字列。
* オプション `options` はまだ全てを理解しないでいい。
  * フラグ `once` でイベント処理を一度きりに指定するかどうかを指示できる。
  * `capture` という引数がある。これは次章で扱う。
  * フラグ `passive` は `e.preventDefault()` を呼び出さないように指示するものだ。
    これも別途説明する。

最初に紹介された指定方法では取り扱えないイベントハンドラーが存在するので、
普遍的な `addEventListener()` を用いるべきだ。

### Event object

次にイベントオブジェクトを理解する。上記 `handler` はこれを引数に取る関数だ。
イベントオブジェクト `event` のよく利用されるプロパティー：

* `event.type`: "click" などのイベント名。
* `event.currentTarget`: イベントを処理している要素。ふつうは `this` で事足りるが、
  ハンドラーが矢印関数で与えられていたり、何かひねったことをして `this` が要素に束縛されていない状況では
  要素を見るのにこのプロパティーを参照するしかない。
* `event.clientX`, `event.clientY`: ポインターイベントにおけるポインター位置を表すウィンドウ相対座標。

後ほど UI イベントを議論するときに、もっと多くのプロパティーがあることを見ていく。

* HTML のマークアップでも、イベントハンドラーコード文字列中に `event` を参照することができる。

### Object handlers: handleEvent

上記引数 `handler` には関数ではなくオブジェクトを渡しても機能する場合がある。
それは、オブジェクトに `handleEvent(event)` メソッドが備わっているときだ。
メニューの例がわかりやすい。

### Tasks

#### Hide on click

最初の二問は易しい。私は `style.display = "none";` とした。

#### Hide self

同上。

#### Which handlers run?

`addEventListener()` と要素の属性・プロパティーを直接割り当てる方式を併用するときの振る舞いはよく覚えておく。

#### Move the ball across the field

* `field` の CSS を `position: relative` にすることが出て来ない。
* 要件 3 の The ball must not cross field boundaries はいったん無視していい。
  主題はそこではない。
* CSS の `transition` を知らなんだ。

#### Create a sliding menu

Expand/collapse 問題は比較的易しい。私の解は `style.display` を toggle する方式になった。
模範解答は JavaScript の量を抑えて、CSS 定義で済ませる流儀だ。
`classList.toggle()` は確かにここで使いたいメソッドだ。

#### Add a closing button

* 前と同じく `position: absolute` と `position: relative` の使い分けに注意する。
  大きい要素のほうが relative であると良い場合が多いようだ。
* サンドボックスを修正して解くときは `insertAdjacentElement()` と `cloneNode(true)` の組み合わせでも行ける。

#### Carousel

* 解法を記述するのが難しい。
* これは左右をループにするのが面白いだろう。そうでなければ、コメント欄にあるように
  矢印ボタンを適宜有効化・無効化する。

## Bubbling and capturing

<!-- https://javascript.info/bubbling-and-capturing -->

### Bubbling

HTML 要素が入れ子になっている場合を考える。いちばん内側でイベントが発生すると、

* その要素に対応するイベントハンドラーが存在すれば、それがまずイベントを処理する。
* そして、次の外側にある要素に対応するイベントハンドラーがあれば、それもイベントを処理する。
* さらに次の外側にある要素についても同様。以下同様。

このイベント処理システムを bubbling という。ほとんどのイベントが bubbling ルールに従う。
例外的にいくつかのイベント（フォーム関連）は、そうならない。

### event.target

実際にイベントが発生した要素は `event.target` で参照する。
言い換えると、同一のイベントオブジェクトに対して、どのハンドラーからも不変である要素ということだ。

### Stopping bubbling

* `event.stopPropagation()` を呼ぶと `event` に関する bubbling を止める。
* `event.stopImmediatePropagation()` を呼ぶと、さらに `event.currentTarget` での
  その他のイベント処理も呼ばれなくする。

一般的には bubbling を止めることはまずい。

### Capturing

システムがイベント発生要素を特定する過程を capturing という。この特定は bubbling の直前に解決される。

* 先述した、普通の方法でイベントハンドラーを設定するぶんには、この過程を意識する必要はない。
* イベントの capturing を捕まえるには `elem.addEventListener()` に `{capture: true}` を指定する。
  ハンドラーを bubbling にではなく、capturing に設定する。
  * 追加したイベントハンドラーを削除するには、追加時に指定したのと同じ `capture` フラグを指定する。
* `event.eventPhase` という、特定過程を知る値もある。まず利用されない。

### Comments

タイムアウトによって `this != event.currentTarget` である場合がある。
以前にタイマーの章で言及されていたことの特別な場合だ。

## Event delegation

<!-- https://javascript.info/event-delegation -->

同じイベント処理をしたい要素が複数あるとき、前章で述べた bubbling の仕組みを利用して、
それらの共通の先祖要素にハンドラーを取り付けることが一般的だ。
前章にあるように、イベントが実際に発生した要素を特定したければ `event.target` を参照すればいい。

* [Bagua - Wikipedia](https://en.wikipedia.org/wiki/Bagua)

本文のテーブルの各セル要素の `onclick` にハンドラーを割り当てるのではなく、
テーブル自体に `onclick` を割り当てて、セルの情報を必要に応じて `event.target` から得るということだ。

* セルのハイライトの手法が面白いので覚えておく。
* この例では `event.target` が TD タグのさらに内側の場合があり得る。それを考慮して
  `elem.closest('td')` を応用する。

### Delegation example: actions in markup

ボタンでメニューを実装する例も同じだ。この例は復習項目が多い：

* `f.bind(this, ...)` パターン
* `obj[propertyName]` パターン
* `elem.dataset` の仕様

### The "behavior" pattern

イベント委譲の考え方を使って、特別な属性やクラスを使って、宣言的に要素に振る舞いを追加することを見る。

このパターンは二つの部分からなる。まずは要素にカスタム属性を追加して、その振る舞いを記述する。
それから、ドキュメント全体のイベントハンドラーがイベントを追跡し、
イベントが属性付きの要素で発生したら、アクションを実行するのだ。

`document.addEventListener()` と `event.target`/`elem.dateset` を組みわせる例が二つ。

#### Behavior: Counter

まず、HTML マークアップでカスタム属性 `data-counter` をボタン型 `INPUT` 要素に与える。
属性値を指定しないでおく。

次に、ドキュメント全体のイベントハンドラーを定義して `document.addEventListener()` を呼び出す。
イベントが発生したのが属性付きの要素であるかどうかを、次の参照でチェックする：

```javascript
event.target.dataset.counter != undefined
```

アクションは `INPUT` 要素の `value` 値をインクリメントするものとする。

#### Behavior: Toggler

まず、HTML マークアップでカスタム属性 `data-toggle-id` を `BUTTON` 要素に与える。
値を "subscribe-mail" としておく。

次に、ドキュメント全体のイベントハンドラーを定義して `document.addEventListener()` を呼び出す。
イベントが発生したのが属性付きの要素であるかどうかをチェックする。

ボタン要素ならば、その値を `id` に持つ HTML 要素を `document` から得る。
得られた要素に対して `display.hidden` フラグを反転する。

### Tasks

#### Hide messages with delegation

これは問題ない。本文で同じようなものを見た。

#### Tree menu

問題が表示・非表示処理なので、やはり既知の例と同様だ。
模範解答の `span` 処理は要るか？

#### Sortable table

以前の演習コードの機能を改良することになる。

文字列のソートが劣化しているが、本章の主題ではないので気にしない。

#### Tooltip behavior

つぶしが効くので必ず取り組むこと。

* 仕様から、現在のツールチップを覚えておく必要がある。
* `onmouseover` でツールチップ要素をいちいち `document.createElement()` などする。
* ツールチップの表示位置を決定するのが面倒だから、まずは
  `event.clientX`, `event.clientY` で試すといい。
  マウスをボタンから離れないように動かすとツールチップも動くのが難点だ。
* `onmouseout` でツールチップ要素を `elem.remove()` する。

この手の実装は変種が色々と考えられる。コメント欄もチェックしてそれを眺めるといい。

## Browser default actions

<!-- https://javascript.info/default-browser-action -->

リンク要素をクリックすればそのページに移動するなど、ブラウザーはたくさんのイベントを自動的に処理する。

### Preventing browser actions

HTML 文書作成者がブラウザーにそうさせたくない場合、次のように書くと自動の処理がなくなる：

* イベントハンドラーで `event.preventDefault()` を呼び出す。
* HTML 要素のタグの `onxxxx` 属性を使ってハンドラーを定義している場合、単に `return false` とする。

イベントハンドラーの戻り値は `false` であるときを除き、すべて無視される。

#### Example: the menu

`A` タグを援用したメニューの例では、前章で紹介された技法をいくつか組み合わせている。

* `A` 要素にではなく、`UL` 要素にハンドラーを定義する。
* `event.target` を参照、判定する。

囲み記事。イベントの自動処理を無効化すると、後続する関連イベントのそれらも無効化されるとある。

### The "passive" handler option

`elem.addEventListener()` にオプション `{passive: true}` を指定することは、
そのハンドラーが `event.preventDefault()` を呼び出さないことをブラウザーに伝えることを意味する。
つまり、既定の自動処理をキャンセルするなという依頼だ。

### event.defaultPrevented

フラグ `event.defaultPrevented` を参照することで、この `event` が処理されたかどうかを判定する。
入れ子になった要素の独自メニュー実装例で言いたいことは、
親と子のそれぞれで固有のメニューを定義できるということだ。

* この入れ子の階層の深さはどれだけあっても、この手法で独自ハンドラーを実現できる。
* 繰り返しだろうが、`event.stopPropagation()` と `event.preventDefault()` は関係がない。

Stay semantic, don't abuse の教えに従うこと。

### Tasks

#### Why "return false" doesn't work?

過去問に類題があったと記憶している。

#### Catch links in the element

外部リンク専用で `confirm()` を出すなど、実践的な応用が考えられる演習だ。

* これはパターンだが、リンクタグすべてを含むタグにハンドラーを定義する。
  そこで `event.target` を吟味する。ただし、リンクタグには他のタグが入れ子になる場合が普通にある。
  以前のときのように `closest()` を利用する。
* ユーザーがジャンプしたくないと答えたら `return false` するのが本質的となる。

#### Image gallery

構造は上の問と同じ。

`IMG` 要素の `src` の値に画像 URL を指定すると、描画が更新される。

## Dispatching custom events

<!-- https://javascript.info/dispatch-events -->

JavaScript プログラマーがハンドラーだけでなく、イベントも独自で定義することができる。

### Event constructor

組み込みイベントクラス群は `Event` を基底クラスとして、クラス階層を形成している。
その基底クラスのコンストラクターを直接呼び出してイベントを生成できる。

```javascript
let event = new Event(type[, options]);
```

* `type`: イベント名を表す文字列。組み込みイベント名でもそうでなくても許されるようだ。
* `options`: フラグ二つを指定することができる。
  * `bubbles`: イベントが bubbling であるかどうか。
    * 既定値が `false` なので、注意するほうがいいかもしれない。
  * `capture`: イベントが prevent されてもよいかどうか。

### dispatchEvent

要素 `elem` 上でイベント `event` を発生させるには `elem.dispatchEvent(event)` を呼び出す。

* ユーザーがイベントを起こしたのか、それともプログラムで起こしたのかを判定するには、
  フラグ `event.isTrusted` を参照する。

### Bubbling example

サンプルの `hello` イベントの例は、カスタムイベントハンドラーの基本実装例を表している。

### MouseEvent, KeyboardEvent and others

`UIEvent` のサブクラスでは、独自の引数を受け取るのがふつうだ。
例えば `MouseEvent` コンストラクターは `clientX` と `clientY` を `options` に含められる。

* というより、`Event` のコンストラクターで同じ実引数を与えることが認められていない。

### Custom events

となると、カスタムイベントで独自の引数を対応したい場合にできなくなってしまう。
そこで、サブクラス `CustomEvent` というものが用意されている。
基本の `options` に、そのための専用キー `details` の使用が認められている。

### event.preventDefault()

うさぎの例ではカスタムイベント利用時における `event.preventDefault()` について述べられている。
兄弟要素同士である `PRE` と `BUTTON` の両方にカスタムイベントハンドラーが設定されているという条件に注意すること。

### Events-in-events are synchronous

イベントの「入れ子」についての理論。

* イベントはキュー処理であるのが原則だ。
* しかし、イベント処理の途中で `elem.dispatchEvent(event)` すると、
  例外的に `event` を直ちに処理しようとする。
  その処理の終了を待ってからキューの後続イベントが処理される。

この挙動が気に入らない場合は `dispatchEvent()` を遅延時間指定なしの `setTimeout()` で包め。
