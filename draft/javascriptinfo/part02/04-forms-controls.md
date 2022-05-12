---
title: Forms, controls
date: 2022-05-05 (Thu)
---

HTML の `FORM`, `INPUT`, `SELECT` 各要素に関係するイベントを習う。

## Form properties and methods

<!-- https://javascript.info/form-elements -->

これらの要素にある特別な性質を理解することで、フォーム作業を便利にする。

### Navigation: form and elements

* `document.forms` でページ内のフォームを参照できる。
  プロパティー `name` もしくはインデックスで個別のフォームを参照する。
* フォーム `form` 内の構成要素を `form.elements` で参照できる。
  プロパティー `name` もしくはインデックスで個別の要素を参照する。
* チェックボックスやラジオボタンなど、同じ `name` の構成要素が複数存在する場合がある。
  このとき `form.elements[name]` もまたコレクションだ。
* この参照方法は、フォームの DOM 木構造に依存していない。
  木構造がどれだけ入り組んでいようが使いやすい。
* フォーム `form` が `FIELDSET` を含んでいて、それが `name=loginId` であるフォーム要素を含んでいるとする。
  この場合にも `form.elements.loginId` で参照できるし、`FIELDSET` の `elements` から参照できる。
* `.elements` を略記する参照方法もある。

### Backreference: element.form

フォーム構成要素 `element` は親 `FORM` を `element.form` で参照できる。

### Form elements

#### input and textarea

* テキストボックスやテキストエリア中の文字列ならば `input.value` を、
  チェックボックスやラジオボタンの選択ならば `input.checked` をそれぞれ参照する。
* テキストエリアの `innerHTML` を使ってはならない。現在の値が格納されているわけではない。

#### select and option

* `SELECT` 要素のプロパティー
  * `select.options`: 選択肢のコレクション。つまり子 `OPTION` 要素全部。
  * `select.value`: 現在選択されている `OPTION` の値。
  * `select.selectedIndex`: 現在選択されている `OPTION` のインデックス。
* 現在の選択肢をスクリプトからセットするには、次のどの方法でもいい：
  * `select.options[2].selected = true;`
  * `select.value = XXXX;`
  * `select.selectedIndex = 2;`
* `SELECT` 要素が複数の選択を許すモードの場合、つまり属性 `multiple` があるとき、
  スクリプトからは `select.options` を反復して対象選択肢を参照することになる。

#### new Option

`OPTION` 要素をスクリプトから生成する場合、`document.createElement('option')`
でもいいかもしれないが、便利なクラスがある。

```javascript
option = new Option(text, value, defaultSelected, selected);
```

* `defaultSelected` が少しわかりにくい。この値を `true` とすると
  `OPTION` タグの属性 `selected` が生成される。

### Tasks

#### Add an option to select

現在選択されている選択肢を参照するコードが、実は少し長くなるということがわかる。
`SELECT` 要素のプロパティーへの参照が二つあるからだ。

## Focusing: focus/blur

* ユーザーがクリックしたり TAB キーを押したりすると、フォーム構成要素が focus される。
* HTML から見ると構成要素には `autofocus` という属性もある。フォームがロードされた直後に
  focus されている要素であることを示すものだ。
* 構成要素の focus が外れることを blur という。こちらのほうが重要かもしれない。
  データの入力が完了したことを示唆するからだ。

### Events focus/blur

<!-- https://javascript.info/focus-blur -->

* `focus`, `blur` イベントを入力検査に利用することをメールアドレスのデモを作って考える。
  このコードはこれまでの学習内容で理解できる。
* 現代の HTML では `required` や `pattern` などの属性が用意されている。
  このメールアドレスの検証デモのような場合には、これらの属性で事足りることがある。

### Methods focus/blur

フォーム構成要素にはメソッド `focus`, `blur` がある。
これらをスクリプトから呼び出すと、それぞれに対応するユーザーの対話的操作を実現できる。

`blur` ハンドラーは focus を失った後で動作するので、
このハンドラーで `event.preventDefault()` を呼び出して focus を失うのを妨害することはできない。

### Allow focusing on any element: tabindex

元々 focus 機能を有する HTML 要素は限定されている。上述のフォーム関連要素と `A` などだ。
対応されていない要素に `elem.focus()` などを呼び出してもハンドラーは反応しない。
ただし、HTML の要素に属性 `tabindex` を付与すると、focus を受けるように変えられる。

* どんな HTML 要素に対しても `tabindex` を持たせることができる。
* この属性値は TAB キーを押すと focus が当たる順序だ。
  * `tabindex` が明示されていない要素は、ページ内で登場する順序が考慮されてこの値が決まる。
  * `tabindex="0"` である要素は、`tabindex` 値が 1 以上の要素すべての後に「来る」。
  * `tabindex="-1"` である要素は TAB キーを無視するが focus を当てることはできる。
* JavaScript からは `elem.tabIndex` で参照する。
* CSS の `:focus` も覚えておくこと。

### Delegation: focusin/focusout

一般的な UI イベントとは異なり、`focus` も `blur` も bubbling をしない。
したがって、親フォームに子要素のためのイベントハンドラーを書くことができない。

解決策は次のいずれか：

* `form.addEventListerer()` のオプションで capturing を有効にする。
* `focusin`, `focusout` イベントを採用する。これらは `focus`, `blur` の
  bubbling 版のようなものだ。

### Tasks

#### Editable div

* 模範解答を見ると思った以上に単純で驚く。
* `blur` ハンドラーを仕込むのは `focus` ハンドラー中となる。
  これはマウスやポインターのときと同じ考え方が良いということだ。
* メソッド `replaceWith()` の存在を忘れていた。

#### Edit TD on click

* これをきっちりと実装するのは難しい。
* 親要素である `TABLE` に取り付けるハンドラーは `click` イベントのものだ。
* 対象 `TD` と同じ幾何の `TEXTAREA` を生成する。
* 編集終了コマンド用ボタンは即席で追加する。
  `td.insertAdjacentHTML("beforeend", code)` が適任だ。
* OK 終了と Cancel 終了とで、`TD` に載せる内容が最終的に異なる。

#### Keyboard-driven mouse

* ねずみの `PRE` がキーイベントを拾うように手を入れる。
  この要素の `tabindex` を特殊な値でセットすればいい。
* この間、ねずみ要素の CSS を `position: fixed` にする。

コメント欄のコードも試すのが良さそうだ。

## Events: change, input, cut, copy, paste

<!-- https://javascript.info/events-change-input -->

### Event: change

* `change` イベントが発生するのは、要素が変化するのを完了するときだ。
  * テキスト入力の場合は focus が外れたときに `change` イベントが発生する。
    * コードをいじって試したところ、`change`, `blur` の順に発生する。
  * `SELECT` とチェックボックスやラジオボタンの `INPUT` 要素の場合は
    選択肢が変化したときに `change` イベントが発生する。

### Event: input

* `input` イベントは、ユーザーによって値が変更された後に毎回発生する。
* マウスによる貼り付けや音声認識によるテキスト入力など、キーボード操作を伴わない値の変更でも発生する。
* その性質上、`input` ハンドラーで `event.preventDefault()` は無意味となる。イベントはすでに終了している。

### Events: cut, copy, paste

* `cut`, `copy`, `paste` イベントは、それぞれに対応する操作がなされるときに発生する。
* ここにあるデモを動かせばわかるが、これらのハンドラーでは `event.preventDefault()` が効く。
  JavaScript でクリップボードの内容をある程度は操作できることを意味する。
* `cut`, `copy` ハンドラーでは `event.clipboardData.getData(...)` でクリップボードの内容を取得できない。
  代わりに `document.getSelection()` を呼ぶ。

#### Safety restrictions

* クリップボードイベントを `dispatchEvent()` を用いて生成することは禁止されている。
* クリップボードに関しては、現代的な `navigator.clipboard` という API が用意されている。

### Tasks

#### Deposit calculator

* 私の環境だとイベントハンドラーを割り当てる処理は
  `form.addEventListener("input", calculate)` だけで十分動作する。
* その他
* 複利計算の公式は与えられている。
  * 細かいことを言えば、入力をチェックする必要がある。
    主題ではないからだろうが、模範解答ではチェックが甘い。
  * 画面の金利はパーセント表示であることに注意。
  * バーの高さを、初期預金残高の高さが固定であることから決める。

## Forms: event and method submit

<!-- https://javascript.info/forms-submit -->

* `submit` イベントはフォームが投稿されたときに発生する。
  このイベントを使用する理由は、サーバーに送信する前に検証したり、送信を中止して何か処理したいからだ。
* `form.submit()` メソッドを使うと、JavaScript からフォームの送信を開始することができる。
  これを応用することで、独自のフォームを動的に作成し、サーバーに送信することもできる。

### Event: submit

* `submit` イベントが発生する場合は二通りある。
  * タグ属性 `type` の値が "submit" または "image" である `INPUT` 要素がクリックされた
  * 入力フィールドで ENTER キーが押された
    * この場合になぜか `click` イベントも発生する。
* 他のほとんどの UI イベントと同様に、`event.preventDefault()` や `return false`
  パターンで `submit` イベントの既定の振る舞い、つまり送信を妨害できる。

### Method: submit

フォームをプログラムから送信するには `form.submit()` を呼び出す。
このときは `submit` イベントは生成されない。

### Tasks

#### Modal form

次の関数 `showPrompt(html, callback)` を作成する：

* 構成要素
  * メッセージを構成する `html`
  * 入力フィールド
  * OK ボタン
  * CANCEL ボタン
* ユーザーがテキストフィールドに何かを入力して Enter キーまたは OK ボタンを押すと、
  入力された値 `value` で `callback(value)` が呼び出される。
* ユーザーが Esc キーまたは CANCELを 押すと `callback(null)` が呼ばれる。
* 結果によらず、入力処理が終了したらフォームを削除する。
* 要件
  * フォームはウィンドウの中央に表示する。
  * フォームは、ユーザーがフォームを閉じるまで、ページの他の部分との操作を許さない。
  * フォームを表示したとき、ユーザーにとっての focus は `INPUT` の中にある。
  * Tab / Shift+Tab キーは、このフォームフィールド間しか移動させない。

手順

* Click the button below の見出しと直後のボタンのガワを HTML にハードコードする。
* サンドボックスのコードにもうフォームのガワ `div#prompt-form-container` だけできている。
  初期状態でこれを非表示にするために CSS を少しいじる。
  これが終わるまでは、ボタンをクリックできない。
* `INPUT#show-button` の `click` ハンドラーを書く。中身は usage example のコードとする。
* `showPrompt(html, callback)` を実装する。
  * 「ページの他の部分との操作を許さない」ためだけの巨大な `DIV` 要素を生成する。
    * CSS 定義を別途済ませておく。模範解答のプロパティーすべてが意味を持つ。
  * フォーム部分の初期化をする。
    * `html` を `DIV#prompt-form-message` の `innerHTML` にセットする。
    * テキストボックスの中身を空にする。
  * Enter/OK 用の処理を実装する。これがフォームの `submit` イベントハンドラーだ。
  * Esc/CANCEL 用の処理を実装する。
    * `keydown` イベントハンドラーで `event.key == Escape` のときの処理を仕様どおりに実装する。
    * CANCEL ボタンに対して `click` イベントハンドラーを仕様どおりに実装する。
  * 入力処理終了後の後始末をする。
    * 巨大な `DIV` 要素を削除する。
    * フォームを非表示にする。
    * 入力値 `value` を実引数にして `callback(value)` を呼び出す。
  * TAB キーの処理はよくわからない。
