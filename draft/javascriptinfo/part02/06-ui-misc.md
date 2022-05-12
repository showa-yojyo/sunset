---
title: Miscellaneous
date: 2022-05-07 (Sat)
---

## Mutation observer

<!-- https://javascript.info/mutation-observer -->

`MutationObserver` を学ぶ。DOM ノードを監視し、変化を検出したときにコールバックを呼び出すものだ。
典型的な Observer パターンだ。

### Syntax

```javascript
let observer = new MutationObserver(callback);
observer.observe(node, config);
```

ここで `config` はどの種類の変化に反応するかを指定する key-value オブジェクトで、値は真偽型だ。

* `childList`: `node` の子の変化
* `subtree`: `node` の子孫すべての変化
* `attributes`: `node` の属性の変化
* `characterData`: `node.data` を観察するかどうか
* `attributeOldValue`: `callback` に新旧両方の属性値を渡すかどうか（否ならば変化後の値のみ渡す）。
* `characterDataOldValue`: `callback` に新旧両方の `node.data` の値を渡すかどうか

`config.attributeFilter` は属性の名前の配列。そこにあるものしか観察しない。

コールバック関数は次のような形だ。

```javascript
function callback(mutations, observer){ /* ... */ }
```

* 引数 `mutations` は次で述べる key-value 仕様のオブジェクトの配列
  * `type`: 変化の種類を表す値。文字列 "attributes", "characterData", "childList" のいずれか。
  * `target`: 変化したノード。
  * `addedNodes`: 追加されたノード。
  * `removedNodes`: 削除されたノード。
  * `previousSibling`: 追加削除変化のあったノードの兄ノード。
  * `nextSibling`: 追加削除変化のあったノードの弟ノード。
  * その他
* 引数 `observer` は観察している `MutationObserver` オブジェクト自身

### Usage for integration

* 広告スペースなどの不要な要素が DOM に現れたときにそれを検出し、削除することができる。
* DOM に何らかのノードが動的に変化したとき、関連ノードをリサイズする。
* その他

### Usage for architecture

外部からロードするなど、動的に生成した HTML に対して、さらに動的に何か装飾的な処理をしたい場合に
`MutationObserver` を応用するのは適している。

#### Dynamic highlight demo

`MutationObserver` のコールバックでは `mutations` をフィルターして、所望のノードをまずは得る。
フィルターとして次のものを駆使する：

* 演算子 `instanceof`
* メソッド `node.matches()`
* メソッド `node.querySelectorAll()`

### Additional methods

観察をやめるためのメソッドが用意されている。

* `observer.disconnect()`: 観察をやめる。このとき未済の変化があり得る。
* `observer.takeRecords()`: `callback` が処理していない `mutations` を返す。
  * 呼び出すと観察キューのような領域から

上記のメソッドを両方利用する場合、後者を先に呼ぶ。

## Selection and Range

<!-- https://javascript.info/selection-range -->

ページ内の選択と、フォームフィールド内の選択に分類する。

JavaScript は既存の選択範囲にアクセスしたり、DOM ノードの全体または一部を選択・解除したり、
選択内容をページから削除したり、タグに包んだりすることができる。

### Range

選択範囲の基本は `Range` で、開始点と終了点で表現される。
このオブジェクトは、引数なしで作成する。それから
`range.setStart(node, offset)` と `range.setEnd(node, offset)` を呼び出して選択範囲の境界を設定する。
始点は対象範囲の最初の点であり、終点は対象範囲の上界の最初の点だ。

* この二つのメソッドはペアで利用するが、第一引数の `node` は共通の値である必要はない。

#### Selecting the text partially

第二引数 `offset` は、第一引数 `node` がテキストノードならば、テキスト文字列のインデックスを指定する。

#### Selecting element nodes

第二引数 `offset` は、第一引数 `node` が要素ならば、子のインデックスを指定する。

#### Selecting a bigger fragment

この二つのメソッドはペアで利用するが、指定範囲がテキスト型とノード型をまたがっても構わない。

### Range properties

`Range` のプロパティーを見ていく。

| Property | Description |
|----------|-------------|
| `startContainer`, `startOffset` | 開始のノードとインデックス |
| `endContainer`, `endOffset` | 終了のノードとインデックス |
| `collapsed` | 範囲が空ならば `true` |
| `commonAncestorContainer` | 範囲内にあるノードすべての先祖であって最も若いノード |

### Range selection methods

`setStart`, `setEnd` で何でもできるが、範囲を操作するための便利なメソッドがたくさんある。
いずれも `node` はテキストノード、要素のどちらでも構わない。

| Method | Description |
|--------|-------------|
| `setStart(node, offset)` | 開始位置を `node` から `offset` 番目とする |
| `setStartBefore(node)` | 開始位置を `node` の直前とする |
| `setStartAfter(node)` | 開始位置を `node` の直後とする |
| `setEnd(node, offset)` | 終了位置を `node` から `offset` 番目の直前とする |
| `setEndBefore(node)` | 終了位置を `node` の直前とする |
| `setEndAfter(node)` | 終了位置を `node` の直後とする |

他にもこういうものがある：

| Method | Description |
|--------|-------------|
| `selectNode(node)` | `node` 全体を範囲とする |
| `selectNodeContents(node)` | `node` 収容物全体を選択できる範囲とする |
| `collapse(toStart)` | 始点に合わせるか終点に合わせるかを指定して範囲を空にする |
| `cloneRange()` | 範囲オブジェクトを複製する |

### Range editing methods

範囲を操作するメソッドがいくつか用意されている。

| Method | Description |
|--------|-------------|
| `deleteContents()` | 収容物をページから削除する |
| `extractContents()` | 収容物をページから取り除くと同時にそれを `DocumentFragment` として返す |
| `cloneContents()` | 収容物を複製してそれを `DocumentFragment` として返す |
| `insertNode(node)` | `node` を範囲の先頭に挿し込む |
| `surroundContents(node)` | 範囲を `node` で囲む |

### Selection

ページの選択範囲は `Selection` オブジェクトで表現される。

* `window.getSelection()` や `document.getSelection()` で取得することができる。
* 選択範囲には 0 個以上の `Range` を含めることができる。

### Selection properties

`Selection` オブジェクトから `i` 番目の `Range` オブジェクトを得るには
メソッド `getRangeAt(i)` を使う。

`Selection` の主なプロパティー：

| Property | Description |
|----------|-------------|
| `anchorNode` | 選択がここで始めるというノード |
| `anchorOffset` | `anchorNode` におけるインデックス |
| `focusNode` | 選択がここで終わるというノード |
| `focusOffset` | `focusNode` におけるインデックス |
| `isCollapsed` | 選択が空ならば `true` |
| `rangeCount` | 選択中にある範囲の個数 |

アンカーとフォーカスの前後関係は固定されていない。

### Selection events

* `elem.onselectstart`: 要素 `elem` 上で選択が開始されるときのイベント。
* `document.onselectionchange`: 選択が変更または開始されたときのイベント。
  文書内の選択すべてを追跡する。

#### Selection tracking demo

選択によってはアンカーもフォーカスも `undefined` となるようだ。

#### Selection copying demo

プレーンテキストとして複製するか、書式を保ちつつ複製するかで方法を変える。

* `document.getSelection().toString()`: プレーンテキストとして内容を得る。
* `Selection` を構成する各 `Range` に対して `cloneContents()` を順次呼び出す。
  戻り値の `DocumentFragment` を得られた順に何かする。

### Selection methods

基本的なメソッド：

| Method | Description |
|--------|-------------|
| `getRangeAt(i)` | `i` 番目の `Range` オブジェクト |
| `addRange(range)` | （選択に含まれていない？）範囲を追加する |
| `removeRange(range)` | 指定の範囲を削除する |
| `removeAllRanges()` | 範囲すべてを削除する |
| `empty()` | 同上 |

便利メソッド：

| Method | Description |
|--------|-------------|
| `collapse(node, offset)` | 現在の選択範囲を `node` の `offset` 位置を指す空範囲とする |
| `setPosition(node, offset)` | 同上 |
| `collapseToStart()` | 選択を現在のそれの開始位置にある空範囲に縮める |
| `collapseToEnd()` | 上の終了位置版 |
| `extend(node, offset)` | 選択の focus を `node` の `offset` に動かす |
| `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` | いちばん詳細な指定で選択 |
| `selectAllChildren(node)` | `node` の子すべてを選択する |
| `deleteFromDocument()` | 内容をページから削除する |
| `containsNode(node, allowPartialContainment = false)` | `node` を含んでいるか |

置換でない方法のメソッドを使って選択を指定し直すときには、
まず選択をリセットしてからメソッドを呼び出すのが安全だ。

### Selection in form controls

`INPUT` や `TEXTAREA` のようなフォーム要素は、より単純な API で選択を取り扱う。

| Property | Description |
|----------|-------------|
| `selectionStart` | 選択開始位置 |
| `selectionEnd` | 選択終了位置 |
| `selectionDirection` | 選択方向を表す文字列 "forward", "backward", "none" |

| Event | Description |
|-------|-------------|
| `onselect` | 何かが選択されたときのイベント |

| Method | Description |
|--------|-------------|
| `select()` | テキストボックスにあるすべてを選択する |
| `setSelectionRange(start, end, [direction])` | テキストを選択する |
| `setRangeText(replacement, [start], [end], [selectionMode])` | テキスト範囲を置換する |

オプション引数 `selectionMode` は置換後の選択状態を指定する文字列だ：

* "select": 新しいテキストが選択となる。
* "start": 新しいテキストの先頭が選択（空）となる。
* "end": 新しいテキストの末尾が選択（空）となる。
* "preserve": なるべく選択を保つ。

#### Example: tracking selection

* イベント `onselect` は選択を削除した瞬間には発動しない。
* テキストボックス内の選択イベントは `document.onselectionchange` を引き起こさい。

#### Example: moving cursor

`selectionStart` と `selectionEnd` を変更することで、選択範囲を設定することができる。
両者を同じ値にすると、キャレットをその位置に移動させる。

#### Example: modifying selection

選択範囲の内容を変更するには、強力なメソッド `setRangeText` を使用する。

* 最も単純な引数一つの呼び出しでは、ユーザーが選択した範囲を置換してから範囲を解除する。
* デモのように、すべての引数を指定すると置換後のテキストが選択される。

#### Example: insert at cursor

空範囲に対してメソッド `setRangeText` を使用すると、そこにテキストを追加することになる。

### Making unselectable

何かを選択不能にする三つの方法が述べられている。

* CSS で `user-select: none` を与える。
* `onselectstart` または `onmousedown` イベントで既定の処理を無効化する。
* 選択が起きた後に `document.getSelection().empty()` を呼び出す。

最後の方法は画面がチカチカするなどの副作用があるので、まず使われない。

## Event loop: microtasks and macrotasks

<!-- https://javascript.info/event-loop -->

ブラウザー JavaScript の実行フローはイベントループに基づく。

### Event Loop

JavaScript でもイベントループの概念は他言語のそれとまったく同じようだ。ほとんどの時間は何もしていない。
スクリプト、ハンドラー、イベントがアクティブになった場合に実行されるだけだ。

* イベントループが持つタスクキューを v8 用語でマクロタスクキューと呼ぶ。
* エンジンがタスクを実行している間、レンダリングは決して行われない。
  タスクの処理時間の長さは問題にならない。
  タスクが完了してからでないと DOM に変更が加えられない。
* タスクに時間がかかりすぎると、ブラウザーは他のタスクができなくなる。
  そのため、時間が経つと Page Unresponsive などの警報を出し、
  ページ全体でタスクを終了させようと言う。

### Use-case 1: splitting CPU-hungry tasks

CPU を食うタスクを小分けにしてキューに押し込む手法を考察している。
`setTimeout()` で順次部分をキューに押し込むことで、タスク全体が画面をブロックするのを緩和する。

* `setTimeout()` は最低でも 4ms 経過しないとコールバックをしない。
  そのため、スケジュールのタイミングにコツがいる。

### Use case 2: progress indication

時間がかかるタスクを小分けにしないと、画面を更新する次の機会はタスク全体の終了後なので、
プログレスバーのような進捗表示をすることができない。

### Use case 3: doing something after the event

`targ.dispatchEvent(event)` 呼び出しを `setTimeout()` でラップするパターンのおさらい。

### Macrotasks and Microtasks

* マクロタスクの他に、マイクロタスクという概念もある。
* マイクロタスクは私たちのコードからだけ発生する。それらは通常 `Promise` が生成する。
  `.then()`/`.catch()`/`.finally()` ハンドラーの実行がマイクロタスクになる。
* マイクロタスクは `await` の舞台裏としても使われる。
* 特殊な関数 `queueMicrotask(func)` がある。関数 `func` の実行をマイクロタスクキューに待つ。

すべてのマクロタスクの直後に、エンジンはマイクロタスクキューからすべてのタスクを実行する。
他のマクロタスク、レンダリング、その他の何かを実行する前に、マイクロタスクを実行する。

リッチなイベントループの図は次のようになります
（順番は上から下へ、つまり、最初にスクリプト、次にマイクロタスク、レンダリング、といった具合になります）。

すべてのマイクロタスクは、他のイベント処理、レンダリング、その他マクロタスクが行われる前に完了する。
これは重要なことで、マイクロタスク間でアプリケーション環境が基本的に同じであることが保証される。
マウス座標の変更や新しいネットワークデータなどはない。

* ある関数を非同期で（現在のコードの後で）実行したいが、
  変更がレンダリングされたり新しいイベントが処理される前に実行したい場合は、
  関数 `queueMicrotask` を使ってスケジュールする。
  * プログレスバーのコードで `setTimeout` の代わりに `queueMicrotask` を使うと、
    数字の表示が最後の一度きりになる。

### Tasks

#### What will be the output of this code?

直接実行して結果を確認してからそれを解答とするのは論外だ。
