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

### Example: "time-formatted"

### Observing attributes

### Rendering order

### Customized built-in elements

### References

### Summary

### Tasks

#### Live timer element

### Comments

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
