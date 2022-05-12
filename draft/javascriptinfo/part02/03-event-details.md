---
title: UI Events
---

重要なユーザーインターフェースイベントとその扱い方を見ていく。

## Mouse events

<!-- https://javascript.info/mouse-events-basics -->

マウスイベントは物理的なマウスから以外にも起こる可能性がある。PC だけとは限らない。

### Mouse event types

主なマウスイベント：

| Event | Description |
|-------|-------------|
| `mousedown` | 要素上でマウスボタンが押されたときに起こる。 |
| `mouseup` | 要素上でマウスボタンが離されたときに起こる。 |
| `mouseover` | マウスポインターが要素に来たときに起こる。 |
| `mouseout` | マウスポインターが要素から離れたときに起こる。 |
| `mousemove` | マウスが要素上を動くたびに起こる。 |
| `click` | 左ボタンにより、要素上から `mousedown` の後に `mouseup` が出ると起こる。 |
| `dblclick` | 短時間に同一要素上で二度の `click` の後に起こる。 |
| `contextmenu` | 右ボタンを押すと起こる。 |

* コンテキストメニューはキーからも表示される。右手側の ALT と CTRL の間にあるキーだ。
* 右ボタンの場合には、メニューが表示されるのはボタンを離した瞬間だ。

### Events order

上にもあるように、一つのマウスアクションから複数のマウスイベントが起こることがある。

* 例えば、左ボタンをクリックすると、まずボタンが押されたときに `mousedown` が起こり、
  それからボタンが離されたときに `mouseup` と `click` が起こる。
* 単一のアクションが複数のイベントを引き起こす場合、その順序は一定だ。

### Mouse button

マウスイベント処理中における `event.button` の値とボタンの対応を覚える。

* 普通は 0 か 2 と比較する。
* ビットセットの `event.buttons` というのもある。

### Modifiers: shift, alt, ctrl and meta

マウスイベント処理中にユーザーが押している修飾キーを参照することもできる。
押されていれば値は `true` だ：

* `event.shiftKey`
* `event.altKey`
* `event.ctrlKey`: Mac ユーザーに便宜を図るため、ふつうは `event.ctrlKey || event.metaKey` をテストする。

### Coordinates: clientX/Y, pageX/Y

マウスイベントはカーソル位置を保持している。以前の章で見た二つの座標系に対応している。

* `event.clientX`, `event.clientY`: ウィンドウ座標系
* `event.pageX`, `event.pageY`: ドキュメント座標系

### Preventing selection on mousedown

マウスイベントを握りつぶすには、一般のイベントと同様にハンドラーが `return false` すればいい。
ここでは `dblclick` でテキスト選択が発生しないようにする例を挙げている。

囲み記事。テキスト選択そのものを処理するには `copy` イベントハンドラーを対応する。

### Tasks

#### Selectable list

まず、修飾キーの要件を無視して `click` を実装する。
CSS クラスを変更するメソッド各種には、これまでの演習で慣れている前提だ。
この状態で選択解除とテキスト選択が解決できていない。

* テキスト選択は囲み記事にある手法でも解決するが、これは場合によっては許されない。
  本当にマウスによる選択しか禁止しないのであれば、`mousedown` を潰す方法を採る。
* Ctrl キーを押しているときの振る舞いのほうが実装は容易だ。
  他の項目の状態を考慮しなくていい。
* 模範解答では `event.preventDefault()` を呼んでいない。

## Moving the mouse: mouseover/out, mouseenter/leave

<!-- https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave -->

マウスが要素間を移動するときに発生するイベントについて。

### Events mouseover/mouseout, relatedTarget

まず `mouseover`, `mouseout` を見る。これらをペアで押さえる。

* `event.target` と `event.relatedTarget` が相互補完的な要素となる。
  マウスカーソルが要素間を移動するときに、これらの要素を値に取る。
  * `mouseover`: `relatedTarget` → `target`
  * `mouseout`: `target` → `relatedTarget`

顔のデモ。`onmouseover` と `onmouseout` に同じハンドラーを割り当てている。
ついでに `event.type` について説明して欲しい。有用そう。

`event.relatedTarget` は `null` であり得る。

### Skipping elements

要素が複数配置されているところをマウスが比較的高速に移動する場合、
開始要素から終了要素の間にある要素の上でこれらのイベントハンドラーが反応しないことが普通にある。
それでも、`mouseover` が発生した場合には、対になる `mouseout` も必ず発生する。

### Mouseout when leaving for a child

親子関係にある要素間では注意点が二つある：

* 親から子にマウスを移動させると、カーソルを親が含むにも関わらず、親に対する `mouseout` が発生する。
* イベントの bubbling が適用されるので、親から子に移動させると、親から出てまたすぐに戻ってきたようにも見えるかもしれない。

サンプルデモにおいて、ハンドラーは親要素にある。

勘違いしないように `event.target` と `event.relatedTarget` をチェックすること。
あるいは、次に述べるイベントペアを対応すること。

### Events mouseenter and mouseleave

次に `mouseenter`, `mouseleave` を見る。これらもペアで押さえる。
先述のイベントハンドラーペアと似たものだが、親子関係の注意点二つが成り立たない。

* 要素内の移動、子孫への移動は考慮されない。
* イベントの bubbling がない。
  * ということは、イベントハンドラーを親要素にだけ置いて、
    子要素すべての面倒を見る手法は採用できないということだ。

### Event delegation

こちらのサンプルデモにも、ハンドラーは親要素にある。

八卦図のデモ二つ。前者はマウスの運動によってはセルというよりも中身のテキストだけがハイライトされてしまう。
後者はその不具合を解決してセルしかハイライトされないようになっている。
コードをよく分析すること。

* 共通点
  * `TABLE` に `onmouseover`, `onmouseout` 各ハンドラーを実装する。
* 改良点
  * 現在ハイライト中の `TD` を保存しておく変数を設ける。
  * `onmouseover` を、`event.target` がその現在ハイライト中のセルと変わっていなければ何も処理しないようにする。
    変わっていれば変数を更新し、改良前と同様の処理をする。
  * `onmouseout` はもう少し面倒になる。`event.relatedTarget` をチェックし、さらにその親方向へチェックする。
    `TD` を離れていくことが確定したら、ハイライト中セル変数を `null` とする。

### Tasks

#### Improved tooltip behavior

* 現在表示中のツールチップ DOM 要素を保存しておく変数を設ける。
* `mouseover`, `mouseout` ハンドラーをそれぞれ `document` に対して定義する。
* `mouseover` では、まずツールチップ対応部分にマウスがいるかどうかを判定する。
  * 判定は以前のときのように `closest()` を利用する。引数はクラス名になる。
  * ツールチップ要素を `DIV` として作成する方法は以前と同じ。
    生成後の要素には CSS クラス、中身、位置を指定するが、今回も位置が大事だ。
  * ツールチップ要素の位置はマウスカーソル位置と対象要素の寸法から適当に決めていい。
    後から要件に従うように調整できる。
* `mouseout` では現在のツールチップ要素を存在すれば `remove()` する。
  そして、現在ツールチップ変数をリセットする。

#### "Smart" tooltip

* さっきの例でマウスを高速で動かすと、この問題の意図が理解できる。
* 丁寧にもサンドボックスに単体テストが付属している。全部がパスするまでコードを書く。
  サンドボックスにコードが途中まで書かれているが、埋める場所は実は指定されているところだけではダメだ。
* メソッド `trackSpeed()` を実装する。これがけっこう手が込んでいる。
* メソッド `onMouseOver()` および `onMouseOut()` 内で対象要素に
  `mousemove` のイベントハンドラー `this.onMouseMove` を着脱する。
* メソッド `onMouseMove()` はシンプルにマウスカーソル位置と時刻を更新する。
  座標はドキュメント座標系で持たせるのがコツのようだ。すなわち `pageX`, `pageY` を採用する。
* 難しいと思ったのが速度の更新だ。タイマーで速度を計算するメソッドを仕込む。
  速度を更新する頻度を適切に決める方法が問われている。
  模範解答ではピクセルパーミリ秒という単位で速度と比較し、タイマーをクリアするようにしている。
  速度の算出方法はバカ正直に（ピタゴラスの定理で）移動距離を計算して、時間の差で除算する。
  * このタイマークリア直後の `this.call.over(this.elem)` により、
    コンストラクターで指定したツールチップ表示コードが発動する。

## Drag'n'Drop with mouse events

<!-- https://javascript.info/mouse-drag-and-drop -->

仕様上は `dragstart`, `dragend` などのドラッグ＆ドロップ用のイベントがある。
しかし、それらは制限があったり、機能が弱かったりする。
そこで、本章では `mousedown`, `mousemove`, `mouseup` でドラッグ＆ドロップを実装する。

### Drag'n'Drop algorithm

* ブラウザー既定の挙動を取り除くため `dragstart` からイベント通知が拡がらないようにする。
  つまり `return false` とする。
* `mousedown` でドラッグの準備をする。
  * ドラッグ対象要素の属性を変える。CSS が `position: absolute` と `z-index: 1000` になるようにする。
    * それに関係して対象要素をいったん `body` の子になるように移す。
    * 対象要素の座標を文書座標系で指定する。
    * `mousemove` と `mouseup` 両ハンドラーを指定する。
* `mousemove` ハンドラーは座標更新処理しかしない。
  * 座標をきめ細かく取る。開始直後のマウスカーソル位置から対象要素がズレないように工夫する。
    本文では、対象要素座標系の原点とカーソル位置の変位を意識して位置を更新している。
* `mouseup` ハンドラーでドロップ処理およびクリナップをする。
  * 仕込んだ両ハンドラーを解除する。
* これらのマウスイベントハンドラーを `document` に対して仕込むのが急所だ。

### Correct positioning

ドラッグ開始時点のマウスポインターの座標を要素座標系に変換する。
そして、ドラッグ中の要素の座標を、現在のマウス座標から上記座標の変位を加味して決める。

```javascript
// mousedown
const rc = elem.getBoundingClientRect();
const shiftX = event.clientX - rc.left;
const shiftY = event.clientY - rc.top;

// mousemove
elem.style.left = `${event.pageX - shiftX}px`;
elem.style.top = `${event.pageY - shiftY}px`;
```

### Potential drop targets (droppables)

今度はドロップ先の要素を特定することを考える。

* ドラッグ中の要素がいちばん手前にあるため、一時的に `hidden = true` する。
  すると、絶好の `elementFromPoint(clientX, clientY)` の応用状況となる。
* ドロップを受け入れることが可能な要素であるかどうかは、要素に CSS クラスを与えるなりなんなりすればいい。
  その上で `elem.closest()` により検索する。

### Tasks

#### Slider

* サッカーボールのコードをそのままパクるだけだと、スライダーが自由にドラッグしてしまう。
  これに拘束をかければ良い。とくに、y 座標の処理は不要。
* 与えられたサンドボックスコードは、すでに `DIV` が `position: relative` になっているので、
  サッカーボールのコードの配置関連コードは不要となる。

#### Drag superheroes around the field

* 要件 1 の急所は `document` に `mousedown` ハンドラーを実装することと、
  マウスカーソル位置から `closest('.draggable')` で得られる要素をドラッグすることの二つ。
* 要件 2 の縦スクロールが大きい場合の処理。次のものを利用する：
  * `document.documentElement.clientHeight`
  * `dragElement.offsetHeight`
  * `window.scrollBy(0, scrollY)`
* 要件 3 の横スクロール禁止。
  * `document.documentElement.clientWidth`
  * `dragElement.offsetWidth`
* 要件 4 は要件 2, 3 と一緒に実装する。
* このデモではドラッグ可能要素の `position` をドラッグ中の間だけ `fixed` にする。
  座標計算をより容易にする意味がある。

#### Comments

* 変位 `shiftX` を自分で計算するのではなく `event.offsetX` を代わりに使うといいようだ。
* 携帯電話で動かないという指摘が当然あるが、マウスではなく `pointerxxxx` イベントを使えばいいだろう。
* `elem.elementFromPoint()` の仕様は MDN と本書とで違うように見えるが、矛盾していない。

## Pointer events

<!-- https://javascript.info/pointer-events -->

マウスだけでなく、ペン、スタイラス、タッチスクリーンなど、ポインティングデバイス一般からの入力を処理する方法を見ていく。

### The brief history

歴史的には、まずタッチスクリーンを対応する必要が生じたので、次のようなタッチイベントが導入された：

* `touchstart`
* `touchend`
* `touchmove`

しかし、さらなるデバイスが登場したり、それらのイベントハンドラーを個別に書くのが面倒になったりしてくる。
そこで本章で見ていく一連のイベントが導入された。
これから書くスクリプトでは、マウスやタッチ固有のハンドラーではなく、ポインターハンドラーを書けばいい。

* [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/)
* [Pointer Events Level 3](https://w3c.github.io/pointerevents/)

### Pointer event types

* ポインターイベントは、`mousemove` に対応する `pointermove` といった具合に、
  マウスイベントと同様の名前が付けられている。
  それらに加え、ポインターイベントには三つの固有イベントが定義されている。
* 基本的には既存コードの `mousexxxx` を `pointerxxxx` に置換することでマウスもタッチなども動作すると期待してよい。
  ただし、CSS のいくつかの場所で `touch-action: none` を追加する必要があるかもしれない。

### Pointer event properties

* マウスイベントプロパティーと同じもの。`clientX`, `target`, etc.
* `pointerId`: イベントを発生させるポインターの ID
* `pointerType`: "mouse", "pen", "touch" のいずれかの文字列。
* `isPrimary`: マルチタッチの場合の、優先的なポインターであるかどうか？
* デバイスによってはさらなるプロパティーが仕様で定められているが、
  ほとんどのデバイスがこれらを対応していない。
  したがって、めったに使われないプロパティーということだ。

### Multi-touch

ユーザーがタッチスクリーンのある場所に触れた後、別の指をタッチスクリーンのどこかに置くと、
次のようなことが起こる：

* 最初の指のタッチでは `isPrimary=true` である `pointerdown` と、何らかの `pointerId`
* 次以降の指（最初の指がまだ触れていると仮定）では `isPrimary=false` である `pointerdown`
  と各指に対して異なる `pointerId`

タッチしている複数の指を、それぞれの `pointerId` を使って追跡することになる。
ユーザーが指を動かしてから離すと、`pointerdown` で得たのと同じ `pointerId` を持つ
`pointermove` と `pointerup` イベントが起こる。

* このデモを PC とマウスで試しても面白くないことに注意。

### Event: pointercancel

イベント `pointercancel` は、ポインターのやりとりが続いているときに発生するもので、
その後、何かが起きてそれが中断され、さらなるポインターイベントが発生しないようにする。

例えばドラッグ＆ドロップをポインターイベントで実装するなどすると、
ブラウザーの既定の挙動が `pointercancel` を発生させて妨害される。
ここではその回避策を述べている。

* まず、前章のマウスによるドラッグ＆ドロップで述べた仕組みがポインターイベントでも成り立つことから、
  ドラッグ要素の `dragstart` ハンドラーに `return false` させる。
* タッチデバイスの場合を考慮する。タッチ関連のブラウザーアクションはドラッグ＆ドロップ以外にある。
  それらについても問題を回避するには、ドラッグ要素に対して CSS で `touch-action: none` と設定する。

改良版サッカーデモでは、ボールをドラッグしようとすると、ブラウザーが余計なことをしなくなることしかまだ確認できない。

### Pointer capturing

ここでは `elem.setPointerCapture(pointerId)` と `elem.releasePointerCapture(pointerId)` を述べている。
Win32 API の `SetCapture(hWnd)`, `ReleaseCapture()` のポインター版と解釈できる。

前章のスライダーバーの実装では `document` に対してイベントハンドラーを定義していたが、
これらの捕捉用メソッドをスライダーに対して利用すればスマートだ：

* 文書全体に対してハンドラーを追加・削除する必要がなくなり、コードがすっきりする。
* 文書内に他のポインターイベントハンドラーがある場合、
  ユーザーがスライダーをドラッグしている間にポインターがよその要素に行っても、
  そのイベントハンドラーが引き起こされることがなくなる。

#### Pointer capturing events

万全を期すために、残りの二つのポインター固有のイベントについても述べられている。

* `gotpointercapture`: `elem.setPointerCapture()` が呼び出されたときに発生する。
* `lostpointercapture`: `elem.releasePointerCapture()` が明示的に呼び出されたときか、
  `pointerup` や `pointercancel` イベントにより自動的にポインター捕捉が解除されたときに発生する。

## Keyboard: keydown and keyup

<!-- https://javascript.info/keyboard-events -->

冒頭にいい警告がある。やりたいことは、キーボードを使うことが本当に必要であるのかと。

### Teststand

このデモは `keydown`, `keyup` イベントの概要と `event.preventDefault()` のおさらい。
既定の挙動を妨害すると、テキストボックスに文字が打ち出されなくなる。

### Keydown and keyup

まずは `event.key` と `event.code` の違いを理解する。
ひとまず前者を文字、後者を物理的キー（言い換えるとキーの位置）を表すものと解釈しておく。

* `event.key` は実際の文字（列）を値に取るか、文字がなければ特別な値を取る。
* `event.code` は "KeyA", "Digit8", "Enter", "Tab" などの文字列を値に取る。

本文では両者の違いについて細かく解説している。国によってキー配置が異なるから、
`event.key` を採るか `event.code` を採るかは、アプリケーションの目的による。

### Auto-repeat

同じキーを長時間押し続けていると `keydown` イベントが何度も繰り返し発生し、最後に
`keydown` が一度発生する。これを自動繰り返しという。
自動繰り返しイベントでは `event.repeat` の値は `true` となっている。

### Default actions

* OS あるいはそれ以下のレベルで定められているショートカットキーによるコマンド起動以外は、
  JavaScript のいつもの方法で既定の挙動を妨害できる。
* 電話番号用に `INPUT` タグの `keydown` イベントハンドラーを書く例はわかりやすい。
  しかし、普通は別のイベントハンドラーを書くこと。

### Legacy

この節に書いてあるイベントもプロパティーも旧式のものだ。今から書くコードでは採用しない。

### Mobile Keyboards

仮想キーボードを使用する場合、`e.key` は "Unindentified" となるはずだ。

### Tasks

#### Extended hotkeys

キー同時押しを判定するときには `keydown` だけでなく `keyup` の処理も必要となる。

* 可変個引数を取る関数の書き方を思い出す。
* JavaScript の `Set` は扱いづらい。

## Scrolling

<!-- https://javascript.info/onscroll -->

* スクロールを監視するには `scroll` イベントを処理する。
* イベント `scroll` は `window` とスクロール可能要素の両方で処理される。

### Prevent scrolling

今まで見てきた UI イベントとは異なり、`scroll` ハンドラーで
`event.preventDefault()` を使っても、スクロールを妨害することはできない。
このイベントはすでにスクロールが起こった後に発生するものだ。
したがって、妨害するにはスクロールの原因となるイベント、たとえば PGUP や PGDN キーを押されたのを感知して
`event.preventDefault()` を呼び出すなど、工夫する必要がある。

スクロールを許す方法はいろいろあるので、CSS の `overflow:` プロパティーを利用するのが確実だ。

### Tasks

#### Endless page

* 最後までスクロールするというのは、実際には閲覧者が文書の末端から何ピクセルか以上離れていないくらいの意味に解釈すること。
* この例題はナンセンスなものではなく、現実にはよく使われるパターンだ（商品リストなど）。
* イベントハンドラーは `window` に付与する。
* 今回はスクロールすると `document.documentElement.getBoundingClientRect()` の
  `top` と `bottom` が変動する。
* ウィンドウの高さは `document.documentElement.clientHeight` を見る。
* 今はドキュメントの下部がそこから何ピクセルか以上離れていないときを知る必要がある。

  ```javascript
  const doc = document.documentElement;
  while(doc.clientHeight + 100 < doc.getBoundingClientRect().bottom){
      document.body.add(now);
  }
  ```

#### Up/down button

ページのスクロールを助ける「トップへ」ボタンを作成する。

ページがウィンドウの高さ以上にスクロールされているときは、左上に「上へ」の矢印を表示する。
この矢印をクリックすると、ページが一番上にスクロールする。

* これも現実的な例だ。
* サンドボックスコードではすでに与えられているが、矢印を `hidden` な `DIV` 要素として最初から文書内に置く。
  * CSS で `position: fixed` とし、`left`, `top` をページの左上になるように決める。
  * 矢印のイベント `click` でページを天井までスクロールさせる。
    `window.scrollTo(pageXOffset, 0)` を使う。
* ページのイベント `scroll` でスクロール量をチェックし、必要に応じて矢印要素を表示・非表示する。
* 模範解答の `pageXOffset` などは `window.pageXOffset` などと同じ。

#### Load visible images

ページが所定の位置にスクロールされてから画像などをロードする問題だ。

本問では関数 `isVisible(elem)` を埋めるだけでいい。
これは `IMG` 要素のクライアント領域の上下端の座標と `document.documentElement.clientHeight`
とを比較すればいい。

この比較の数値をオフセットするとプリロードの効果が得られる。
