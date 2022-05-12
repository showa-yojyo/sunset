---
title: Document
date: 2022-05-10 (Tue)
---

JavaScript を使って Web ページを操作する方法。

## Browser environment, specs

<!-- https://javascript.info/browser-environment -->

* プラットフォーム固有の機能をホスト環境という。
  JavaScript の標準機能に加えて、何か特別な情報や機能が備わっているということだ。
* ブラウザー環境ではグローバルオブジェクト `window` がその一つだ。

### DOM (Document Object Model)

* グローバルオブジェクト `document` も重要だ。ページ上のあらゆるものにアクセスできる。

### BOM (Browser Object Model)

* ブラウザー環境では BOM という一連のグローバルオブジェクトも用意されている。
  例えば `navigator` や `location` が該当する。
  * `navigator` は、ブラウザーと OS に関する情報だ。次のような情報などを含む：
    * `navigator.userAgent`: 現在のブラウザー
    * `navigator.platform`: プラットフォーム
  * 関数 `alert()`, `confirm()`, `prompt()` もまた BOM の一部だ。

### Summary

* 重要な仕様書
  * [DOM specification](https://dom.spec.whatwg.org/)
  * [CSSOM specification](https://www.w3.org/TR/cssom-1/)
  * [HTML specification](https://html.spec.whatwg.org/)
* 調べ物をするときには WHATWG や MDN を関連ワードに加えて検索する。

## DOM tree

<!-- https://javascript.info/dom-nodes -->

木構造のオブジェクト `document` から子ノードをたどるようにして、文書の構成要素にアクセスする。

### An example of the DOM

* HTML の構造。各タグはノードだ。
* タグでなくてもノードであり得る。例えばテキストノード。
* `HEAD` と `BODY` に関しては、空白文字が一部実際の内容と異なって
  DOM オブジェクト化されていたり、いなかったりする。

### Autocorrection

* 不正な形式の HTML であっても、ブラウザーが適宜修正して DOM オブジェクトを構築する。
* 以前スクレイピングをしていてハマったのでここにも記すと、
  `TABLE` の `TBODY` ノードについては、あるものだと決め打った方がいい。

### Other node types

* DOM においてはコメントも独自のノードを形成する。
* 現場では次の四種のノードを扱うのが普通だ：
  * 文書ノード `document` は DOM の受付のようなオブジェクトだ。
  * 要素ノード。HTML タグを表す。
  * テキストノード
  * コメントノード

### See it for yourself

Google Chrome の開発ツール Elements タブで現在の HTML 文書の DOM をチェックできる。
そこで確認できるツリーは簡略版であり、テキストノードや空白のみノードは省略されている。
このタブおよびサブタブ Styles, Computed, Event Listeners から DOM を直接編集することもできる。

### Interaction with console

* Elements タブで要素を選択した後、Esc キーで Console を開く。
  変数 `$0` にそのノードが割り当てられいる。
* コンソールには `inspect()` という関数もある。

## Walking the DOM

<!-- https://javascript.info/dom-navigation -->

### On top: documentElement and body

まずは公式三つを覚える：

```text
<html> = document.documentElement
<body> = document.body
<head> = document.head
```

### Children: childNodes, firstChild, lastChild

* 子ノードは `childNodes`, `firstChild`, `lastChild` で参照する。
* 子ノードがあるかどうかをテストするにはメソッド `hasChildNodes()` を用いる。

#### DOM collections

* 子ノードコレクションをループで回す実用上の方法は二つ：
  * `for ... of` 文
  * `Array.from(childNodes).forEach()`, etc.

### Siblings and the parent

* 兄弟ノードは `nextSibling`, `previousSibling` で参照する。あまり使わないかもしれない。
* 親ノードは `parentNode` で参照する。

### Element-only navigation

ノードと要素を区別するといい。上記の属性はノードのすべての分類を参照する。
テキストノードもコメントノードも不要という場合は多い。そういう場合には別の参照方法を採用する：

* 子要素は `children`, `firstElementChild`, `lastElementChild` で参照する。
* 兄弟要素は `previousElementSibling`, `nextElementSibling` で参照する。
* 親要素は `parentElement` で参照する。

### More links: tables

DOM 要素の型によっては、特有の追加的属性が用意されている。例えば `TABLE` など。
「何列目の何行目」のような処理を書きやすい。

* [仕様](https://html.spec.whatwg.org/multipage/tables.html)

### Tasks

演習問題は実際にブラウザーの開発ツールで HTML を Elements タブで即席で生成して、
Console で試せる。

#### DOM children

`firstNode` と `firstElementChild` の指すオブジェクト、等々が違うことを理解する。
テキストノードが探索の邪魔だということを実感する。

深いノードを `document` からアクセスしようとすると、ドットが多くなって煩雑に感じる。

#### The sibling question

子が存在することは仮定していい。

#### Select all diagonal cells

私の解答はコメント欄の RGS サンの解答に近い。
`map()` ではなく `forEach()` を採るしか違いがない。

## Searching: getElement*, querySelector*

<!-- https://javascript.info/searching-elements-dom -->

木構造に頼らないノード参照方法を習得する。

### document.getElementById or just id

* 要素に ID 属性があれば `document.getElementById(elemId)` が最も自然な参照方法だ。
* もしくは ID の値と同じ識別子のオブジェクトを参照することができる。
  これは `window.elemId`, `window['elemId']` と同じことだ。

### querySelectorAll

スクレイピングでおなじみの `elem.querySelectorAll(css)` も便利だ。
戻り値は要素のコレクションだ。

### querySelector

メソッド `elem.querySelector(css)` はそのシングル版。全部は要らない場合に採用する。

### matches

メソッド `elem.matches(css)` は自身が指定セレクターにマッチするかを判定する。

### closest

メソッド `elem.closest(css)` はマッチする要素のうち、先祖方向に最近傍にあるものを返す。

このメソッドはあとでイベント処理を書くときにちょくちょく利用するので覚える。

### getElementsBy*

メソッド `elem.getElementsBy` 系は覚えなくていい。前述の汎用メソッドで事足りる。

### Live collections

メソッド `elem.getElementsBy` 系は `querySelector` 系とは異なり、戻り値の DOM が live だという性質がある。
HTML の構造が変化すると同時に戻り値も変化する。

### Summary

メソッド `elemA.contains(elemB)` で、指定要素が自身をルートとする部分木にいるかどうかを判定する。

### Tasks

#### Search for elements

なるべく `querySelector` 系を利用する。開発ツールの Console タブで
`$()` とあわせて `$x()` でも XPath を指定することで参照できるように能力をつける。

```javascript
$x('//table[@id="age-table"]')[0];
$x('//table//label');
$x('//table[@id="age-table"]//td')[0];
$x('//form[@name="search"]')[0];
$x('//form[@name="search"]/input')[0];
$x('//form[@name="search"]/input').at(-1);
```

## Node properties: type, tag and contents

<!-- https://javascript.info/basic-dom-node-properties -->

### DOM node classes

```mermaid
classDiagram
    direction TB

    EventTarget <|-- Node
    Node <|-- Text
    Node <|-- Element
        Element <|-- HTMLElement
            HTMLElement <|-- HTMLInputElement
            HTMLElement <|-- HTMLBodyElement
            HTMLElement <|-- HTMLAnchorElement
        Element <|-- SVGElement
    Node <|-- Comment

    class EventTarget{
        <<abstract>>
    }
    class Node{
        <<abstract>>
        +number nodeType
        +string nodeName
        +string nodeValue
        +string textContent
    }
    class Text{
        +string data
    }
    class Comment{
        +string data
    }
    class Element{
        +string tagName
        +string innerHTML
        +string outerHTML
    }
    class HTMLElement{
        +string id
        +boolean hidden
    }
    class HTMLInputElement{
        +string value
    }
    class HTMLAnchorElement{
        +string href
    }
```

* 要素の型を動的に判定するには `constructor.name` を調べるなど、これまでに学んだ手法を何か用いればいい。

### The "nodeType" property

* `Node.nodeType` の値はノードの型の分類を表す。
  * 1: 要素
  * 3: テキスト
  * 9: `document`

### Tag: nodeName and tagName

`Element.tagName` は HTML のタグ名。

### innerHTML: the contents

`innerHTML` は要素の中身の HTML を文字列として持っている。
これを書き換えると、HTML の構造が対応する内容に変わる。

これはあとでたくさん利用するので覚えておく。

### outerHTML: full HTML of the element

`outerHTML` は要素自身＋中身の HTML を文字列として持っている。

### nodeValue/data: text node content

`Element` ではない `Node` に対しては `nodeValue` と `data` 属性が「中身」に相当する。
これらはほとんど同じだ。タイプし易い後者をよく使う。

### textContent: pure text

`textContent` は中身のテキスト表現を文字列で表したものとなる。
HTML タグが外された内容とでも言おうか。
このプロパティーは書き込みが安全であるので好まれる。

### The "hidden" property

フラグ `elem.hidden` は DOM 要素の表示・非表示状態だ。
値が `true` である状態は CSS の `display: none` に相当する。

### More properties

* 標準的な HTML 属性のほとんどは、対応する DOM プロパティーがある。
* ブラウザーの Console で `console.dir(elem)` を使って要素を出力し、プロパティー一覧を得られる。
  Elements タブにある Properties を調べてもよい。

### Tasks

#### Count descendants

項目テキスト（入れ子のそれを含まない）を表示する問題はよく覚えておく。
明示的に `firstChild` を参照するのがミソ。さらにテキストノードを詳しく見ればいい。

#### What's in the nodeType?

どう考えても 1 以外の可能性がない。

#### Tag in comment

コメントノードの木構造は一つしかない。

#### Where's the "document" in the hierarchy?

最後の小問の `__proto__` の連鎖は今までありそうでなかった。
こう書くとスーパークラスの名前が順に得られるのか。

## Attributes and properties

<!-- https://javascript.info/dom-attributes-and-properties -->

HTML 要素に非標準的属性、カスタム属性を定義したときにどうなるか。

### DOM properties

DOM オブジェクトにはプロパティーやメソッドを自由に追加することができるし、
要素の `property` に追加することもできる。JavaScript の他のオブジェクトと同じように扱える。

### HTML attributes

HTML ではタグは属性を持つことができる。あるタグが `id` などの標準的な属性を持つ場合、
それに対応するプロパティが DOM の対応するオブジェクトで作成される。
しかし、その属性が非標準のものである場合はそうはいかない。

属性が標準であってもなくても、次のメソッドはそれにアクセスできる方法がある：

| Method | Description |
|--------|-------------|
| `elem.hasAttribute(name)` | 属性があるかどうか |
| `elem.getAttribute(name)` | 属性の値を得る |
| `elem.setAttribute(name, value)` | 属性の値を決める |
| `elem.removeAttribute(name)` | 属性を削る |

`elem.attributes` で属性を全部参照する。各オブジェクトには `name` と `value` がある。

以上の機能は属性名の大文字小文字を区別しない。値は文字列型だ。

### Property-attribute synchronization

* DOM オブジェクトの属性と JavaScript オブジェクトの属性は同期している。
  例外的に `input` 要素の `value` 値はそうなっていない。

### DOM properties are typed

ドット記法で属性にアクセスする場合、値の型がそれらしいものになる。

### Non-standard attributes, dataset

カスタム属性の標準的な定義方法は、属性名を `data-` から始めるというものだ。
この属性名はユーザーのために予約されている。

* `elem.dataset` でカスタム属性の集合にアクセスでき、さらにここからドットで
  カスタム属性名の `data-` 以降の識別子を付けると個々のカスタム属性にアクセスできる。
* `data-order-state` のような属性名は `dataset.orderState` のように変名される。

### Tasks

いろいろな方法を試すこと。

#### Get the attribute

属性値の参照方法は理解を深めて損はない。
スクレイピングのときに選択肢が多いと成功しやすくなるはずだ。

#### Make external links orange

実際にはもっと安定した方法を選びそうだ。コメント欄にある読者の考えも参考にする。

## Modifying the document

<!-- https://javascript.info/modifying-document -->

HTML 文書を動的に変化させる方法を学ぶ。この章はひじょうに重要だ。

### Example: show a message

ここに示された静的な HTML にあるボックス要素を動的に表示したい。

### Creating an element

| Method | Description |
|--------|-------------|
| `document.createElement(tag)` | 新しく要素を生成する |
| `document.createTextNode(text)` | 新しくテキストノードを生成する |

呼び出した直後の時点では、生成したノードは文書内に現れていない。

#### Creating the message

先ほどのボックス要素を動的に定義する。
生成した DOM オブジェクトのプロパティーを操作する。

* プロパティー `className` で CSS のクラスを割り当てる。
* プロパティー `innerHTML` に要素の中身部分を HTML コード片で定義する。

### Insertion methods

生成した要素を明示的に挿入することで文書を更新する。いろいろなメソッドがある：

| Method | Description |
|--------|-------------|
| `node.append(xxx)` | 末尾ノードとして加える |
| `node.prepend(xxx)` | 先頭ノードとして加える |
| `node.before(xxx)` | 直前ノードとして加える |
| `node.after(xxx)` | 直後ノードとして加える |
| `node.replaceWith(xxx)` | ノードを置き換える |

ここで `xxx` は DOM ノード（複数可）または生の文字列（勝手にテキストノードに変換される）とする。

* テキストを挿入する各方法は、文字をエスケープするのかどうかを確認してから採用すること。

### insertAdjacentHTML/Text/Element

`elem.innerHTML` に代入するのと同様の HTML 文字列をノードに挿し込むメソッドもある。

| Method | Description |
|--------|-------------|
| `elem.insertAdjacentHTML(where, html)` | 文字列を HTML としてノードに挿し込む |
| `elem.insertAdjacentText(where, text)` | 上のテキスト版 |
| `elem.insertAdjacentElement(where, elem2)` | 上の要素版 |

ここで `where` は位置を表す文字列だ：

| Value | Description |
|-------|-------------|
| "beforebegin" | `elem` の直前に挿し込む |
| "afterbegin" | `elem` 内先頭子要素として挿し込む |
| "beforeend" | `elem` 内末尾子要素として挿し込む |
| "afterend" | `elem` の直後に挿し込む |

最初のもの以外は、先述のメソッドが手軽な代替手段であるため、ほとんど用いられない。

### Node removal

ノードの削除には `node.remove()` を呼び出す。

説明が前後するが、前述の挿入メソッドで引数に既存のノードを指定すると、
その既存ノードはページ内で引っ越しをする。この用途では `remove()` はお呼びでない。

### Cloning nodes: cloneNode

ノードを複製するには `node.cloneNode(deep)` を呼び出す。

* `node.cloneNode(true)` は深いコピーを行う：部分木を含めて複製される。
* `node.cloneNode(false)` は浅いコピーを行う。`node` 自体しか複製されない。
* 本文の例コードは属性 `id` も複製してしまうので、何らかの対処をしなくてはならない。

### DocumentFragment

クラス `DocumentFragment` はノードを集約したオブジェクトだと考えられる。
新規ノードを単体で追加するというより、複数を一気に扱うのに利用する。

### Old-school insert/remove methods

以下のメソッドは古風なので、自作のコードでは採用を避ける：

* `parent.appendChild(node)`
* `parent.insertBefore(node, nextSibling)`
* `parent.replaceChild(node, oldChild)`
* `parent.removeChild(node)`

### A word about "document.write"

これも旧式のメソッドだが、`document.write()` はロード時にしか意味がない。

### Tasks

#### createTextNode vs innerHTML vs textContent

`innerHTML` 以外の方法はテキストを安全に扱うことに注目。
`createTextNode()` や `innerText` が何らかのタグ要素を生じることはない。

#### Clear the element

`clear(elem)` は覚えておくこと。
どうしてもループでノードを消すときには、先頭を繰り返し参照する。

#### Why does "aaa" remain?

重要度 1 の問題だが、テーブルはスクレイピングでハマりがちな要素だ。見るほうがいい。
この解答の説明が正しいことを開発ツールで確認できる。

#### Create a list

`textContent` はこの場合は `innerText` でも同じ。

#### Create a tree from the object

オブジェクトから `ul` 要素を生成するコードのフォームを覚えておく。

#### Show descendants in a tree

再帰関数と `reduce()` の相性が悪いことはわかった。

#### Create a calendar

カレンダーの問題を DOM の構築で実装する。Chrome のクセなのか、日曜と月曜に隙間が空く。
本書の解答は `innerHTML` に HTML コード片を文字列で連結していくものだ。

#### Colored clock with setInterval

時計の問題はボタンの有効化・無効化処理も入れておきたい。
どちらのボタンも `elem.disabled` をそれぞれ更新する。

#### Insert the HTML in the list

リストの問題は `after()` でコツコツ挿し込むようではダメだ。
`insertAdjacentHTML()` をすぐに思い付かないとダメだ。

#### Sort the table

テーブルのソート問題。急所が複数あり難しい。

* テーブルの全行を参照するには `table.tBodies[0].rows` とする。このテーブルにはヘッダーがある。
* いったん配列に変換してソートする。ソート済み配列を
  `table.tBodies[0]` に `append()` するのが直感的でない。
* 文字列のソートは丁寧に `string.localeCompare()` を用いる。これはオブジェクトメソッドだ。

## Styles and classes

<!-- https://javascript.info/styles-and-classes -->

JavaScript の話題に入る前に、HTML 要素にスタイルを与えるには次の二つの方法があることを確認しておく：

* スタイルシートでクラスを定義し、要素の属性 `class` にそれを指定する。
* 要素の属性 `style` にスタイル定義を直接指定する。

JavaScript ではどちらの方法も採れるが、クラスを扱うのが望ましい。
それができない場合にのみ `elem.style` から設定するようにする。

### className and classList

* `elem.className` で CSS クラスの全体にいっぺんにアクセスできる。HTML タグの属性 `class` に対応する。
* `elem.classList` で CSS クラスのリストにアクセスすることができる。次の操作用メソッドがある：
  * `add(className)`
  * `remove(className)`
  * `toggle(className)`: 状態に応じて `add()` もしくは `remove()` のどちらか一方を実行する。
    このメソッドが用意されている事実は興味深い。
  * `contains(className)`

### Element style

`elem.style` で適用されているスタイルにアクセスできる。このオブジェクトはキーが
CSS の `width`, `background-color`, `font-family` などに対応する文字列を有する。
ただし、名前はキャメルケース化されている。

### Resetting the style property

CSS の特定の属性を既定値に戻すには、空文字列を割り当てる。

```javascript
document.body.style.display = "";
```

`elem.style` 自体は read-only であることに注意。全体を上書きしたいときには
`elem.cssText` を用いる。これは `elem.setAttribute('style', ...)` と同じことだ。
スタイル全体の文字列そのものを割り当てる。

### Mind the units

単位付きの属性には、単位付きの値を文字列として設定する必要がある。

```javascript
document.body.style.margin = '20px';
```

### Computed styles: getComputedStyle

`window.getComputedStyle(elem)` で最終的なスタイルを得ることになる。
本書の例のような状況だと、属性を直接参照してもまともな値が得られない。
次のようにすることで、意味のある値が得られる：

```javascript
let computedStyle = getComputedStyle(document.body);
alert(computedStyle.marginTop);
alert(computedStyle.color);
```

ちなみに、MDN では次のようなコードを提示している：

```javascript
let computedStyle = window.getComputedStyle(document.body);
alert(computedStyle.getPropertyValue('margin-top'));
alert(computedStyle.getPropertyValue('color'));
```

* JavaScript とは離れて、CSS における computed style value と resolved style value
  の概念の説明がある。
* `getComputedStyle()` は完全な名前を指定する必要がある。

### Tasks

演習問題は一題だけある。

#### Create a notification

CSS のクラスをオプションで結果的に複数指定できることに注意。
前章の演習問題に使われなかった `elem.remove()` もある。

## Element size and scrolling

<!-- https://javascript.info/size-and-scroll -->

HTML 要素の `width` や `height` など、測量情報を扱いたい。
JavaScript で要素を移動したり配置したりする際に、これらのプロパティーを必要とすることがよくある。
要素はすべて矩形であると考えていい。

### Sample element

* 冒頭の `DIV#example` 要素のスタイル定義を見て、ボックスの簡単なスケッチを脳裡に描くようにする。
  * `width`: 要素の水平方向の長さ
  * `height`: 要素の垂直方向の長さ
  * `border`: 要素の枠の幅の長さ
  * `padding`: 要素の枠と中身の間の空間の幅
  * `overflow`: スクロールバーを議論するために、このプロパティーを扱う。
* マージンは要素自身の部分ではないので考慮しない。
* この状況では `width` が垂直スクロールバーの幅を含んた長さであることを覚えておく。
  一般的には、`height` は水平スクロールバーの幅を含むのだろう。
* 中身が多い場合には `padding-bottom` 部分にあふれることがある。

この章を学習するときにはサンドボックスのページを別ウィンドウで開いて、いちいち確認するといい。

### Geometry

ボックスに対する測量要素は外側から offset, client, scroll なんとかという呼称になる。

### offsetParent, offsetLeft/Top

`elem.offsetParent` は `elem` を含む最も近くにある要素への参照であって、
ブラウザーが `elem` の座標を計算するのに用いるものだ。次の規則で決まる：

* CSS の `position` が `absolute`, `relative`, `fixed`, `sticky` ならば、関連要素
* テーブルの内側にあれば `TD`, `TH`, `TABLE` のいちばん近い先祖要素
* それ以外の場合は `BODY`

これは `null` である場合がある。特に `display: none` なスタイルがならばそうなる。

* `elem` の CSS が `display: none` であるか、ページ内にない場合
* `elem` が `BODY` 要素または `HTML` 要素である場合
* `elem` の CSS が `position: fixed` である場合

`elem.offsetLeft` および `elem.offsetTop` はドット量であって、
`elem.offsetParent` の原点から `elem` の原点への変位量の水平成分および垂直成分だ。

* オフセット量は単位が px である `number` 型の値だ。

これらのプロパティーが JavaScript を書くときに必要になることはほとんどない。

### offsetWidth/Height

`offsetWidth` と `offsetHeight` はボックスの枠まで含んだ領域に対しての測量だ。
冒頭の例でいうと、

* `offsetWidth` は次の量の和となる：
  * CSS の `width`
  * CSS の `padding` の二倍
  * CSS の `border` の二倍
* `offsetHeight` も同様に：
  * CSS の `height`
  * CSS の `padding` の二倍
  * CSS の `border` の二倍

オフセット系測量値がまともに得られるのは、要素やその先祖要素が `display: none`
以外である必要がある。さもなければ、先祖要素と各測量はそれぞれ `null` やゼロに評価される。

### clientTop/Left

`elem.clientLeft` は `elem` の左境界の幅を px 単位で表した値と解釈できる。
ただし、アラビア語やヘブライ語などの環境では垂直スクロールバーを加味する。
つまり、この値は枠幅＋バーの幅となる。

`elem.clientTop` は `elem` の上境界の幅を px 単位で表した値と解釈できる。
水平スクロールバーがボックス上部に現れることはないはずなので、こちらのほうがわかりやすい。

### clientWidth/Height

`elem.clientWidth` は `elem` の両側の詰め物幅＋正味の幅の値。
垂直スクロールバー幅は除外される。冒頭の例でいうと次の和だ：

* CSS の `width` から垂直スクロールバーの幅の長さを引いた長さ
* CSS の `padding` の二倍

`elem.clientHeight` はその垂直方向版。冒頭の例でいうと次の和だ：

* CSS の `height`
* CSS の `padding` の二倍

### scrollWidth/Height

`elem.scrollWidth` は `elem.clientWidth` に似ているが、水平方向のスクロールアウト部分も込めた全体の長さを表す。
冒頭の例ではスクロールアウトがないので `elem.clientWidth` に等しい。

`elem.scrollHeight`: 垂直方向版。

スクロール系の値を `elem.style.width` や `elem.style.height` に代入すると、
ボックス寸法をその量に拡大してスクロールバーが消える。

### scrollLeft/scrollTop

`elem.scrollLeft` はスクロールアウトされて表示されていない部分の水平方向の寸法。
冒頭の例ではそれが生じない。

`elem.scrollTop` は垂直方向版。スクロールバーを下に動かすたびに値が増える。
つまり、スクロールアウトされているうちの上の方の高さということだ。

ここまで見てきた測量プロパティーは read-only なのだが、これら二つは書き込み可。
例えば `elem.scrollHeight` を増やせば増やすほど、中身の下の方が画面に出てくるようになる。
言い換えると、コードによりスクロールする。

### Don't take width/height from CSS

CSS から `width`, `height` を直接得てはならない。`getComputedStyle()` もダメだ。
この方法が悪い理由が三つ挙げられている。代わりに本章で見てきたプロパティーを利用することだ。

### Tasks

#### What's the scroll from the bottom?

`elem.scrollBottom` を定義する問題。明らかに枠の寸法の取り扱いが主題になる。
`elem.scrollTop` の図を見ると、これは枠の寸法を含んでいる。
したがって `offsetTop` か `clientTop` のどちらを採用するのかを理解すればいい。

#### What is the scrollbar width?

「十分大きなボックス要素を生成したら、その環境ではスクロールバーの寸法はいくらか」
という意味だ。

#### Place the ball in the field center

描画コードをよく書く人間なので、こういう問題は難しくないと思ったら、変な落とし穴がある。

また、`Math.round()` を使って px 幅にわざわざ変換するのが丁寧らしい。

* 与えられたデータはたまたまサイズが偶数なので 2 で割るだけでも動くということか？
* ボールのほうには client ではなく offset を採用しているのも細かいようだが大事だ。
* コメント欄の `field.style.cssText` の解答は観点がいい。

#### The difference: CSS width versus clientWidth

模範解答は後へ行くほど理解の程度が高いことを示しているのだろう。

## Window sizes and scrolling

<!-- https://javascript.info/size-and-scroll-window -->

ページ全体やウィンドウの寸法を得るにはどうすればよいか。

### Width/height of the window

スクロールバー部分は寸法として要らない。`document.documentElement` の client サイズを得る。

`window.innerWidth` などはスクロールバーの寸法を含むので、ふつうはありがたくない。

### Width/height of the document

これらの値については泥臭い手法を採らねばならない。
`document.body` と `document.documentElement` の scroll, offset, client 寸法の `Math.max()` を得る。

### Get the current scroll

読み取り専用の `window.pageXOffset`, `window.pageYOffset` でスクロール位置を得る。

### Scrolling: scrollTo, scrollBy, scrollIntoView

通常の要素をスクロールさせる方法は前章で述べられたとおり。
文書全体についても `documentElement` に対して同様の方法でスクロールできるが、
次のメソッドを利用する方がいい：

| Method | Description |
|--------|-------------|
| `window.scrollBy(x, y)` | 現在からの相対的な位置を与えてスクロールする |
| `window.scrollTo(x, y)` | 表示部分の左上座標が文書の原点からの変位になるようにスクロールする |

### scrollIntoView

`elem.scrollIntoView(alignToTop)` は先頭か末尾にスクロールする。

* コメント欄で引数がオブジェクト版のものが存在することが指摘されている。
  MDN で調べると、スクロールのアニメーション有無を指定することができたりするようだ。

### Forbid the scrolling

ページ全体でのスクロールを禁止するには次のようにする：

```javascript
document.body.style.overflow = "hidden";
```

この手法は利用することがあるので覚えておく。

## Coordinates

<!-- https://javascript.info/coordinates -->

座標系にはウィンドウ座標系とドキュメント座標系の二つがあると、まず述べている。
それぞれ CSS の `position: fixed` と `position: absolute` に類似しているという。
前者での座標系を `clientX`, `clientY` と言い、
後者での座標系を `pageX`, `pageY` と言う。

### Element coordinates: getBoundingClientRect

`elem.getBoundingClientRect()` はボックスがウィンドウ座標系で得られる。
それゆえ、値が負である成分を含むことがある。

* 実際には `width`, `height` は負にはならないとある。
* 明らかな注意点として、`right` と `bottom` の意味は CSS でのそれと異なることがある。

### elementFromPoint(x, y)

`document.elementFromPoint(x, y)` はウィンドウ座標系でその位置にある要素を返す。
要素が複数ある場合（それは普通のことだ）には、ノードのより内側にある要素が得られる。

* 視界外の座標を与えると `null` が返る。
* このメソッドは後の章の演習問題でよく使うので覚えておく。

### Using for "fixed" positioning

* 今回は座標を厳密に指定できるので、新規要素の親子関係はどうでもいい。
  したがって `document.body.append()` を使える。
* 小さな要素を動的に生成する場合には `cssText = "position: fixed; color: red";`
  のような即席の設定方法がよく馴染む。
* 仮に `innerHTML` ではなく `innerText` 版を実装しても十分利用価値がある。
* 断ってあるように、Hello world が表示されている間にスクロールすると、これもズレる。

### Document coordinates

ウィンドウ座標系とドキュメント座標系の関係は単純な公式で表される。
スクロールアウトされた部分の寸法が、座標変換の変位になっている。

### Tasks

良問と思われる。

#### Find window coordinates of the field

サッカーフィールドの問題はシンプルにやればいいと思う。
ここで `getComputedStyle()` を思い出せる人ならば、このチュートリアルをそもそも今頃習っていないと思う。

```javascript
const rect = field.getBoundingClientRect();
`
Upper-left, outer corner: ${rect.x}, ${rect.y}
Bottom-right, outer corner: ${rect.right}, ${rect.bottom}
Upper-left, inner corner: ${rect.x + field.clientLeft}, ${rect.y + field.clientTop}
Bottom-right, inner corner: ${rect.x + field.clientLeft + field.clientWidth}, ${rect.y + field.clientTop + field.clientHeight}
`;
```

#### Show a note near the element

`positionAt(anchor, position, elem)` の最初のバージョン。急所が二つある。

* `top` のケースではノート自身の高さが必要になる（その長さだけ上にずらす）。
* これが大事なのだが、アンカー要素の寸法を client ではなく offset から得ること。
  与えられたテストデータでは client でもきれいに表示されるが、題意からしてこちらのほうが相応しい。

#### Show a note near the element (absolute)

ドキュメント座標系バージョンはヒントにある手順に従えばいい。
問題はそこではなく、サンドボックスを同時に開くとどういうわけか表示が乱れる。

#### Position the note inside (absolute)

前問と合体させても良かったのでは？
