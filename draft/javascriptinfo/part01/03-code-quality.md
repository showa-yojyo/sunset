---
title: Code quality
date: 2022-05-14 (Sat)
---

## Debugging in the browser

Google Chrome の開発ツールを例にとって、デバッグの手法がいくつか紹介されている。
Chrome の文書を併せて一読するべし。作業効率が無視できないほど違ってくる。

### The "Sources" panel

Sources パネルの開き方を習得する。開発ツールの開き方がわかっていればすぐにわかるものだ。

### Console

Console パネルは JavaScript 専用の REPL コンソールだ。
Sources パネルから Esc キーでコンソールが開くのは知らなんだ。

### Breakpoints

Sources パネルのコードビューにおける Breakpoint の追加方法を習得する。
追加方法は複数ある。行番号をクリックするのが基本だ。

さらに Conditional breakpoint も拾得したい。ぜひ習得したい。

### The command "debugger"

コード中に `debugger` 文を書くと、そこに breakpoint を置いたのと同値になる。
これは開発ツールが表示されているときにしか有効にされないものだと思ってよい。

### Pause and look around

JavaScript Debugging 内から Watch, Call Stack, Scope 各ビューを確認できる。
他の言語のデバッガーにある機能にそれぞれ対応する。

### Tracing the execution

トレースコマンド各種。コマンドとショートカットキーを体で覚える。

* Step into コマンドは知らない。これは別途時間を取って学習する。
* Continue to here コマンドも手軽で便利だろう。

### Logging

`console.log()` について紹介。
値はコンソールに出力されるので、普通のユーザーは目にしないと期待される。

## Coding Style

コードはきれいで読みやすいものでなければならない。
複雑なタスクを、正しく、かつ人間が読めるようにコードにすることがプログラミングの技だ。
良いコードスタイルはそれを大いに支える。

もっとも VS Code の Format Document コマンド任せで十分だ。
真面目に読むとしたら Style Guides 節の各リンク先だろう。

### Syntax

著者の提唱するコードスタイルがコードに注釈が付いたイラストの形で示されている。
こういうのは VS Code の Format Document コマンドに任せる。

#### Curly Braces

こういう中括弧の入れ方をエジプト式というのか。

単文でもコードブロックを設けるという意見に賛同する。

#### Line Length

テキストエディターに縦線が薄く描かれているから、それに従えばいいだろう。

#### Indents

著者は空行もインデントの一種だと捉えている。

#### Semicolons

以前述べたように、セミコロンは statement の末尾に必ず書くことだ。

#### Nesting Levels

どの言語でも深い入れ子は敬遠されるものだ。

### Function Placement

関数定義と、それらを呼び出すコードをのどちらを先に書くかという問題だ。
JavaScript の場合には、どちらの方式でも有効なコードなので、こういうことを考える余地がある。

### Style Guides

リンクを転載する。

* [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
* [StandardJS](https://standardjs.com/)

### Automated Linters

おせっかいツールの紹介。著者は [ESLint](https://eslint.org/) を採用している。

この手のツールも VS Code に仕込めるはずだ。

### Tasks

#### Bad style

コードレビューをするつもりで指摘していこう。

## Comments

### Bad comments

初心者はコードの中で何が起こっているのかを説明するためにコメントを使いがちだ。
コメントが必要なほどコードが不明確なら、コメントを使うのではなく、コードを書き直すべきなのだ。

#### Recipe: factor out functions

コードの一部を関数に置き換えることが有益な場合もある。

#### Recipe: create functions

コードの層が生じているならば、関数として括り出す。

### Good comments

* コード全体を俯瞰するようなコメントは良いものだ。
* [JSDoc](http://en.wikipedia.org/wiki/JSDoc) を導入する。いろいろと利点がある。
* コードがすべてではない。

## Ninja code

見出しは忍者なのに、引用は中国の古の賢人たちの言葉なのは怪しい。

### Comments

本文よりもコメント欄のほうが重要。
コメント欄を読まないとこの回の意味がわからないまである。

## Automated testing with Mocha

この回はとくに重要なので時間をとって取り組む。サンドボックスを開いて実際に試すこと。

* `it.only()` は、他にテストがどれだけたくさんあっても、ほんとうにこのテストしか実行されなくなる。

### Why do we need tests?

自動テストでは、製品コードとは別にテスト用のコードを書く。
自動テストは、製品機能をさまざまな方法で実行し、結果を期待するものと比較する。

### Behavior Driven Development (BDD)

BDD とはテストと文書と例を一体化したものだ。

### Development of "pow": the spec

まだ Mocha を紹介していないが、次の要素を説明している：

* `describe("title", function() { ... })`: おそらく test suite に相当する。
* `it("use case description", function() { ... })`: おそらく test case に相当する。
* `assert.equal(value1, value2)`: 他言語のテストパッケージにあるものと同等

### The development flow

ここで Mocha の名前がようやく現れる。

### The spec in action

本チュートリアルで用いるパッケージ群：

* [Mocha](http://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Sinon](http://sinonjs.org/)

これらを組み込んだ HTML ページの外観。

### Initial implementation

初期版は次のコードとする：

```javascript
function pow(x, n) {
    return 8; // :) we cheat!
}
```

明らかに正しくないのだが、テストの初期版も次のような感じなので成功する：

```javascript
describe("pow", function() {
    it("raises to n-th power", function() {
      assert.equal(pow(2, 3), 8);
    });
});
```

### Improving the spec

次のテストを追加することで、失敗させる：

```javascript
it("3 raised to power 4 is 81", function() {
    assert.equal(pow(3, 4), 81);
});
```

一つのテストは一つのことをチェックする。初期版も修正しておく：

```javascript
describe("pow", function() {
    it("2 raised to power 3 is 8", function() {
      assert.equal(pow(2, 3), 8);
    });
});
```

### Improving the implementation

ここで `pow()` の実装をまともにする。それからテスト項目を追加するやり方を柔軟にする。
これで 3 乗のテストは比較的網羅できるようになる：

```javascript
describe("pow", function() {
    function makeTest(x) {
        let expected = x * x * x;
        it(`${x} in the power 3 is ${expected}`, function() {
            assert.equal(pow(x, 3), expected);
        });
    }

    for (let x = 1; x <= 5; x++) {
        makeTest(x);
    }
});
```

### Nested describe

関数 `describe()` の入れ子を形成することで、テストを階層的に構築する。

```javascript
describe("pow", function() {
    describe("raises x to power 3", function() {
        // ...
    });

    // ... more tests to follow here, both describe and it can be added
});
```

* `before`/`after` と `beforeEach`/`afterEach` の紹介。
  後の章の演習問題のコードにこれらが現れることがあるので、そのとき思い出す。

### Extending the spec

* テストコードを先に拡充してから、開発コードを修正していく。これの反復だ。
* `assert.isNaN()` など、その他の assertion も使っていく。

### Tasks

#### What's wrong in the test?

このような書き方だと、エラーが発生した場合、何が問題だったのかがわかりにくくなる。
複雑な実行フローの途中でエラーが発生した場合、その時点のデータを把握する必要が生じ、
実際にテストをデバッグしなければならなくなる。これでは自動テストの意味がない。

* `it.only()` の挙動はこの説明ではよくわからない？

### Comments

コメント欄ではこの章は不評のようだが、単体テストのトピックが重要であることは間違いない。

## Polyfills and transpilers

MDN のページを見ると polyfill という不思議な単語が頻出する。この章の本文でやっと定義を確認できた。

### Transpilers

Transpiler とは、ソースコードを別のソースコードに変換するソフトウェアだ。
最新のコードを解析し、古い構文を使って書き換え、古いエンジンでも動作させるようにする。

* ここでは演算子 `??` を含むコードを書き換える例を挙げている。
* [Babel](https://babeljs.io/) は著名な transpiler の筆頭だ。
* [Webpack](https://webpack.js.org/) のような最新のプロジェクトビルドシステムは、コード変更のたびに
  transpiler を自動的に実行する手段を提供しているので、開発プロセスに組み込むのが容易だ。

### Polyfills

新しい機能を更新・追加するスクリプトを polyfill と呼ぶ。
「隙間を埋める」「足りない実装を追加する」ものだ。
