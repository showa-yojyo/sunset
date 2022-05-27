---
title: Modules
---

## Modules, introduction

<!-- https://javascript.info/modules-intro -->

JavaScript は長い間モジュールのサポートがなかったが、2015 年に標準仕様に現れる。
今ではすべての主要なブラウザーと Node.js でサポートされている。

### What is a module?

* モジュールは単なるファイルだ。
* モジュールは互いにロードすることができ、`export` と `import` を使ってモジュール構成要素を交換する。
  例えば、あるモジュールの関数を別のモジュールから呼び出すことができる。

モジュールファイルで `export` をオブジェクト宣言の前に置くと、外側からそれをロードできる。

`import` でロードすることができる。ロードしたいオブジェクトとモジュールファイルパスを指定する：

```javascript
import {sayHi} from './sayHi.js';
```

モジュールは特別なキーワードや機能をサポートしているので、スクリプトの
`type="module"` という属性を使って、モジュールとして扱われることを宣言する必要がある。

```html
<script type="module">
    import {sayHi} from './say.js';

    document.body.innerHTML = sayHi('John');
</script>
```

`file://` プロトコルでは `import`/`export` は機能しない。

### Core module features

モジュールのコードと今までのスクリプトのコードとの違いを見ていく。

#### Always "use strict"

モジュールは自動的に "use strict" モードになる。この文言を明示的に書かなくて済む。

#### Module-level scope

各モジュールは固有のスコープを有する。

#### A module code is evaluated only the first time when imported

同じモジュールが他の複数のモジュールにロードされる場合、
そのコードは最初のロード時にしか実行されない。

トップレベルのモジュールコードは、初期化、モジュール固有の内部データ構造の作成に用いるべきだ。
何度でも呼び出すような用途のものは、関数として `export` する必要がある。

この一度きりの評価という性質を利用して、モジュールを構成することができる。

#### import.meta

オブジェクト `import.meta` は現在のモジュールの情報を含む。

#### In a module, "this" is undefined

モジュールスコープでは `this` が存在しない。

### Browser-specific features

#### Module scripts are deferred

* `<script type="module" src="...">` は HTML 処理を妨げない。
* モジュールスクリプトは HTML 文書の準備が完全に整うまで待機し、それから実行される。
* スクリプトの相対的な順序は維持される。ドキュメント内で最初に現れるスクリプトが最初に実行される。

言い換えると、モジュールスクリプトは完全にロードされた HTML ページを常に扱うということだ。

モジュールを使うときに注意しなければならないのは、HTML ページは読み込まれると同時に表示され、
JavaScript モジュールはその後に実行されるので、閲覧者が JavaScript アプリケーションの準備ができる前にページを見るかもしれないことだ。
まだ動作しない機能がある可能性がある。

#### Async works on inline scripts

モジュール以外のスクリプトでは `async` 属性は外部スクリプトにのみ作用する。
非同期スクリプトは、他のスクリプトや HTML ページとは無関係に、準備ができると直ちに実行される。

モジュールスクリプトの場合は、インラインスクリプトでも機能する。

カウンターや広告、ドキュメントレベルのイベントリスナーなど、何にも依存しない機能に向いている。

#### External scripts

今のところ、よそのウェブサイトのモジュールを
`<script type="module" src="xxxx">` でロードするには、許可する設定が先方側でなされている必要があると覚えておく。

#### No "bare" modules allowed

ブラウザー環境では、`import` 文の `from` モジュールスクリプトは相対パスか URL でなければならない。

#### Compatibility, "nomodule"

古いブラウザーに対応したい場合にはこうする：

```javascript
<script type="module">
    // ...
</script>
<script nomodule>
    // code for old browsers
</script>
```

### Build tools

ブラウザーモジュールを生で使用することはほとんどない。
Webpack などの特別な道具でまとめて、本番サーバーに配備する。

ビルドツールは次のようなことをする：

1. HTML の `<script type="module">` に置かれることを意図したメインモジュールを取る。
2. その依存関係を分析する。インポート、そしてインポートのインポート、等々。
3. すべてのモジュールから単一のファイルを構築し、元あった `import` 文をバンドラー関数で置き換え、
   それが動作するようにする。
4. その他、変換処理や最適化処理。

バンドルツールを使うと、スクリプトが一つのファイルにまとめられるとき、
それらのスクリプト内の `import`/`export` 文は、特別なバンドル関数に置き換えられる。
その結果、まとめられたスクリプトは `import`/`export` を含まず、
`type="module"` を必要としない通常のスクリプトに入れることができる。

## Export and Import

<!-- https://javascript.info/import-export -->

### Export before declarations

オブジェクト宣言の直前にキーワード `export` を置くのが基本的だろう。

### Export apart from declarations

`export` はオブジェクトの宣言と個別に書いてもいい。個別に書く場合には、
`export` のあとに中括弧を書いて、その中にオブジェクトをカンマ区切りで列挙する。

### Import *

モジュールロードには `import * as XXX from YYY` という構文もある。
Python と違ってモジュール名がファイル名を同じでないので `as XXX` が必須となるのだろう。

利用するモジュール要素だけを明示的に指定して `import` するほうが望ましい。

### Import "as"

ロードするモジュール要素に別の名前を付けるために `import {XXX as YYY} from ZZZ` という構文もある。

### Export "as"

反対に、ロードさせるモジュール要素に別の名前を付けることもできる。
`export {XXX as YYY}` という構文もある。別の名前というより、公式名という扱いだ。

### Export default

あるモジュールが単一のオブジェクトしか外部に見せないような造りだとする。
こういう状況では特別な構文 `default export` を使うのがいい。

本文の例では、モジュール user.js が次のクラス宣言だけであるとする：

```javascript
export default class User {
    // class body
}
```

それを利用するモジュール main.js では、クラス `User` を利用するのに、
次のように中括弧なしで単純に書けるようになる：

```javascript
import User from './user.js';
```

* 一つのモジュールに `default` と名前付きの `export` の両方を持つことができますが、
 それらを混在させないのが実践的だ。
* `default export` はファイルにつき一つまでなので、そのモジュール要素には名前がないかもしれない。

#### The "default" name

* `export {XXX as default};` で、宣言と `export` を個別にする場合の `default export` オブジェクトを指定する。
* `import {default as XXX} from YYY;` はモジュールスクリプト `YYY` の `default export` オブジェクトに別名 `XXX` で参照する。
* `import * as XXX from YYY;` 形式でロードするときの `YYY` の `default export` オブジェクトを
  `XXX.default` で参照できる。

#### A word against default exports

好きに名前を付けられると混乱するので、モジュールスクリプトの名前に対応したものにするのが普通だ。

```javascript
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
```

### Re-export

あるモジュールから `import` したものを、別の名前に付け替えて `export` する構文がある。
名前付き `export` と `default export` のどちらの形式も選べる：

```javascript
export {XXX} from YYY;

export {default as XXX} from YYY;
```

* この構文はパッケージを編成するときに応用されるものらしい。
* この特殊な `export` をしたモジュール自身は、この `XXX` をこの名前で参照できない。

#### Re-exporting the default export

`default export` 要素を `export` し直すのには、変な手続きが要る。
今、モジュールスクリプト `YYY` で `default export` されたオブジェクト `XXX` があるとする。
`XXX` を `export` し直すには、次の二行を書く：

```javascript
export * from YYY;
export {default} from YYY;
```

## Dynamic imports

<!-- https://javascript.info/modules-dynamic-imports -->

これまでの `import` は静的であると言う。
モジュールパスは実行時評価されるような文字列であってはならない。

さらに、`import` 文を `if` ブロックで囲んで、条件付きでロードするというようなことも許されない。

* `import` を非同期関数呼び出しのように使うと動的インポート。
* この方法はモジュールではないスクリプトに対しても適用できる。

### The import() expression

式 `import(module)` はモジュールをロードし、そのすべての `export` を含むモジュールオブジェクトに
resolve される `Promise` を返す。この方式の `import` はコード内の任意の場所から、動的に呼び出すことができる。

* モジュールでないスクリプトでも、この呼び出しができる。
* `import()` は `super()` と似ていて、関数呼び出しではない。
  `import` を変数にコピーしたり、`call`/`apply` を使ったりすることはできない。
