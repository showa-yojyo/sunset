---
title: Miscellaneous
---

## Proxy and Reflect

* `Proxy` というクラスが標準にある。それでオブジェクトをラップすることができる。
* 未翻訳辞書の例は自然。
* `set()` を操作するときには `true`/`false` を返すことを忘れない。
* `Proxy` は関数にも適用できる。`apply()` を実装することになる。
* `Reflect` という `Proxy` の単純版がある。両者を同時に使うこともある。
* `Proxy` は組み込み型の内部情報と private メンバーにまでは手が届かない。
* `Proxy.revocable()` は proxy とオリジナルオブジェクトとの結びつきをキャンセルすることを可能にする。
  それには、後で戻り値の `revoke()` を呼び出す。
* `Proxy` オブジェクトをデバッガーで watch すると、属性が全部角括弧モノであることがわかる。
* Guest/Admin の例を検証する。このような不具合を解消するのに `Reflect` が有用だということか。
  デバッガーでチェックすると `target`, `receiver` がそれぞれ `guest`, `admin` を指している。
* `getName` の例は `Proxy` の深刻な制限だ。
* `get()` の引数リストは全部書く。
* 演習問題の最後が著しく難しい。

## Eval: run a code string

`eval()` は使うな。

## Currying

例えば関数 `f(a, b, c)` から関数 `f(a)(b)(c)` へ変換するような操作を currying という。
この用語はプログラミング言語に依らない。二変数関数の場合は次のような関数
`curry` がそれを実現する：

```javascript
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
```

* 個数が一般の引数を持つ関数を curry するには、本文のような再帰関数を書く。
  解説どおりの動きになっているかをデバッガーで確認する。

## Reference Type

ここまで来た読者ならば、最初の三項演算子の例がエラーになるのは肌感覚でわかる。

* `user.hi()` にせよ `user.hi` にせよ、ドットはそもそも関数を返していない。
  参照型なる実体（これは言語内部の型と理解する）を返し、
  それの特別な処理により `this` が確定する。
* 最後の演習問題の (4) ような場合ですら `this` が確定しないことに注意。
  論理的にも評価的にも (2) と同じのはずだが。

## BigInt

* リテラル値なら数値のケツに `n` を付けて定義する。直接には `BigInt()` を呼び出す。
* 二項算術演算は `BigInt` 同士でしか評価されない。普通の数型を自動的に昇格したりはしない。
* `BigInt` は例外的に単項演算子の `+` がオーバーロードされていない。
* 比較演算子、論理演算子は `BigInt` vs `Number` を対応する。
