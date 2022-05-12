---
title: Code quality
---

## Debugging in the browser

Google Chrome の開発ツールを例にとって、デバッグの手法がいくつか紹介されている。
次のことを習得できる：

* Sources パネルの開き方
  * Esc キーでコンソールが開くのは知らなんだ。
* Sources パネルのビューにおける Breakpoint の追加方法
  * さらに Conditional breakpoint も
* コード中に `debugger` 文を書くと、そこに breakpoint を置いたのと同値になる。
* Watch, Call Stack, Scope 各ビュー
* トレースコマンド各種。コマンドとショートカットキーを体で覚える。
  * Step into コマンドは知らない。
  * Continue to here コマンドも手軽で便利だろう。
* あとは `console.log()` について紹介。

Chrome の文書を併せて一読するべし。作業効率が無視できないほど違ってくる。

## Coding Style

もっとも VS Code の Format Document コマンド任せで十分だ。
真面目に読むとしたら Style Guides 節の各リンク先だろう。

## Comments

JSDoc を紹介しているので確認しておく。

## Ninja code

コメント欄のほうが重要。コメント欄を読まないとこの回の意味がわからないまである。
見出しは忍者なのに、引用は中国の古の賢人たちの言葉なのか。

## Automated testing with Mocha

この回はとくに重要なので時間をとって取り組む。サンドボックスを開いて実際に試すこと。

* `it.only()` は、他にテストがどれだけたくさんあっても、ほんとうにこのテストしか実行されなくなる。
* コメント欄ではこの章は不評のようだが、単体テストのトピックが重要であることは間違いない。

## Polyfills and transpilers

MDN のページを見ると polyfill という不思議な単語が頻出する。この章の本文でやっと定義を確認できた。
