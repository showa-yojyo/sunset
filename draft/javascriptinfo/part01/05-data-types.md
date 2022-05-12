---
title: Data types
---

## Methods of primitives

* 原子型とは次の七つを指す：
  `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.
* オブジェクトラッパーとは次の型を指す：
  `String`, `Number`, `Boolean`, `Symbol` and `BigInt`.
* 原子型の値に対してメソッドを呼び出すと、実際には対応するラッパーのインスタンスが一瞬生成されて、
  そのメソッドが呼び出される。その戻り値がメソッド呼び出しの結果になる。
* したがって、オブジェクトラッパーのコンストラクターは直接呼び出しするようなものではない。
* `null`, `undefined` にはメソッドがない。

## Numbers

浮動小数点数の仕組みはどの言語でも通じるので必修。

* JavaScript の数の型は、IEEE-755 準拠の数と、BigInt 系の二つに分類される。
* Python のように、桁数の多いリテラル数値をアンダーバーで何桁かおきに区切って表現できる。
* `toString()` 呼び出しで基数を指定できる。デフォルト値が 10 ということだ。
* `(123456).toString(36)` などを `123456..toString(36)` とも書ける。これはいいことを知った。
* `toFixed()` は丸めを伴う。
* 関数 `isNAN()` は代えが効かない。
* `parseInt()`, `parseFloat()` などもある。

## Strings

この内容に対応する Python でのやり方も身につけておく。練習問題が笑える。

* Python の f-string に対応するのはバッククォートによる文字列リテラル。
* Unicode のコードポイント直接指定方式が三つある。
* Python 同様、文字列は immutable な値だ。
* よくある文字列操作メソッド、部分文字列、比較など。
* ほとんど使わないメソッド
  * `fromCodePoint()` と `codePointAt()` は surrogate pair を正しく扱う。
  * `normalize()` で Unicode文字列を「正規化」することができる。

## Arrays

* 配列メソッド `at()` がいちばん有用な言語かもしれない。
* 基本的なメソッド
* ループでの扱い方

## Array methods

* `splice()` は削除したり追加したり置換したりと、多目的用途がある。
* `slice()` は Python と同じ。特殊な記法はない。
* `concat()` は Python の `extend()` に相当する。ただし、実引数の
  `Symbol.isConcatSpreadable` 値により連結方式が決まる。
* `forEach()`, `filter()`, `map()` など、関数を取るメソッドを優先して習得したい。
* Python とは異なり、`join()` は配列のメソッドだ。
* `reduce()` 系はメソッドだ。
* `Array.isArray()` でオブジェクトが配列であることをテストする。

## Iterables

`Symbol.iterator` と `Array.from()` を習う。

* この章の `range` の例はあとで参照される。

## Map and Set

* クラス `Map` のオブジェクト `m` に対して `m[k]` は使わない。やらかしそうで怖い。
* コレクションクラスにはメソッド `forEach()` が用意されている。
* `Object` を `Map` に変換するには `Object.entries()` を併用する。
* `Set.forEach()` はインターフェイスにクセがある。

## WeakMap and WeakSet

キーとなるオブジェクトが外部で消滅すると、対応する収容オブジェクトが失われて減る。
もっとも、これらのクラスには反復操作とサイズ属性がないので、消滅時にそれを直接確認する術はない。
この考え方は面白い。Python でも対応物があったかな？

## Object.keys, values, entries

それを言い出すと `length` もオブジェクト属性ではなく静的メソッドのほうが柔軟であることになる。

## Destructuring assignment

このコードの書き方は楽になるので覚える。代入式の左辺にデフォルト引数が指定できる。

## Date and time

一日が 25 時間ある場合がある。

## JSON methods, toJSON

* JSON は言語に依存しない、データのみの仕様であるので、JavaSript 特有のオブジェクト属性はシリアライズされない。
* 考えてみれば当然だが、オブジェクト属性同士の循環参照は認められない。
* 対象オブジェクトの `toJSON()` が存在すれば `JSON.stringify()` はそれを利用する。
* デシリアライズの注意点として、例えばタイムスタンプ文字列は勝手に `Date` に変換されたりはしない。
