---
title: Modules
---

## Modules, introduction

* `file://` プロトコルでは `import`/`export` は機能しない。
* モジュールは自動的に strict mode になるので、アレを明示的に書かなくて済む。
* モジュールは HTML ファイル内に定義することもできる。
* モジュールは自動的に `defer` になる。

## Export and Import

* `export` は変数や関数の定義と同時に書いてもいいし、それらと個別に書いてもいい。
* `import` は必要な要素だけそうするのが色々と有利だ。
* `export default` 構文というのがある。中括弧なして `import` させる。
  その場合には `export` される要素に名前がないことがあってもよい。
  個別に `export { XXX as default}` のような指定をする。
  * `default` 要素を `import` する側で好きな名前を付けてもよい。

## Dynamic imports

* `import` を非同期関数呼び出しのように使うと動的インポート。
* この方法はモジュールではないスクリプトに対しても適用できる。
