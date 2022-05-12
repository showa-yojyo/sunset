---
title: Advanced working with functions
---

## Recursion and stack

再帰関数の呼び出しの深さの限界を伸ばす tail call optimization という概念は知らなんだ。

## Rest parameters and spread syntax

* `...` は仮引数にも実引数にも現れることがある。
  仮引数の場合は引数リストの最後になければならない。
  実引数の場合は、対象が配列であることを前提とする。
  要素がバラバラに並べたものに置き換わる。
* 普通の関数の `arguments` は Bash とかのシェルのような着想？

## Variable scope, closure

* JavaScript は関数指向言語。
* まともなプログラマーを目指すならば lexical environment の概念を習得したい。
* この説明で strict mode が何であるのかが明白になる。
* せめて closure の定義くらいは言えるようになること。
* ブラウザーによっては関数 lexical environment を最適化する。
  副作用としてデバッガーで見えなくなる外側の変数が生じる。
* 演習問題はすべて理解する。

## The old "var"

自前のコードで `var` を使うことはない。

## Global object

ブラウザーだと `window == globalThis` となる。

## Function object, NFE

* 関数の属性 `name`, `length` はいつでも有効。
* 関数に対してプロパティーを勝手に定義できる。これは関数の局所変数とは別物だ。
* NFE の何がありがたいのか。関数内部から自身を参照できる？

## The "new Function" syntax

こういう機能がある。安全な `eval()` として使えるのだろう。

```javascript
let sum = new Function('a', 'b', 'return a + b');
```

ただし、これで作られた関数が外部の変数にアクセスするようなコードを含んでいると、
minifier がそれをダメにする可能性が高い。

## Scheduling: setTimeout and setInterval

必修。

* タイマー系関数には仕込む関数呼び出しの実引数をいくらでも指定できる。`setTimeout(alert, 1000, 'Hello')`
* タイマー系関数にはキャンセルの手段が用意されている。
* `setTimeout` を入れ子にすることで `setInterval` の非一樣間隔版を実装する。
* タイマー系関数は lexical environment の寿命が指定処理の発動まで存続する。メモリーを食いがち？
* タイマー系関数に時刻ゼロを指定するときの、実際の発動時刻は現在の処理終了直後となる。
* タイマー系関数にまつわる 4 ミリ秒ルール。
* 演習問題を完全に理解すること。意外に同じ値を出力し続けるコードを書いてしまう。

## Decorators and forwarding, call/apply

無視できない内容であるので、先に進むのを止めてコードをじっくり動かす。
ここから何章か、コードをデバッガーで起動して言語の急所を体で覚える。

* 何かのはずみで `this` が未定義になる症状。そういうときには `.call()` を思い出せ。
* `.call()` の変種で `.apply()` というのがある。引数リストの形式が異なる。
* メソッドを「拝借する」イディオムが存在する。

## Function binding

`this` が失われる現象を述べるのはこの章だった。

* 矢印関数は実はわずかに脆弱なところがある。
  `askPassword()` の演習問題は矢印を使いたくなるが、`bind()` を採用する版に比べて品質が劣る。
* `bind()` の意味は難しくない。指定されたものを `this` とする。
  というか、もしかすると C++ のそれと同じことをやっているのかもしれない。
* Bound function as a method の結果が私の環境と異なる。コメント欄にあるものですらない。
* コメント欄に `bind` と前節の `call`/`apply` との違いを端的に述べている人がいて良い。

## Arrow functions revisited

* 矢印関数はコンテキスト不要な条件のときに採用するのがよい。
* 矢印関数には `this` がない。それを矢印関数の内側から参照しようとすると、外側にあるそれを参照しに行く。
  * したがって、矢印関数を constructor として利用することはできない。
* 矢印関数には `arguments` がない。先ほどと同様。

