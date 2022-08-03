---
title: JavaScript チェック項目集
---

## Part 1

* Type conversions
* 比較演算子の使い方 `===` など
* `??`
* モジュールに 'use strict' は不要
* JSDoc の「導入方法」
* Mocha の「導入方法」
* `Object.assign()` を使う
* `this` 周り
* 演算子 `?.` を使うか
* さらに `?.()`, `?.[]` も使うか？
* `parseInt()`, `parseFloat()`
* `Object.fromEntries()` をもう一度調べる
* `...` 代入
* もちろん `setTimeout()`, `setInterval()`
* `call()`, `apply()`
  * `call()` を少し試す。`null`, `undefined` を与えたときの挙動が MDN の記載どおりであることを確認。
  * `apply()` は `call()` とほとんど同じ。たとえば演習問題の一問目は次でも同じだ：

    ```javascript
    function spy(func) {
        wrapped.calls = [];
    
        function wrapped(...args){
          wrapped.calls.push(args);
          return func.call(this, ...args);
        };
        
        return wrapped;
    }
    ```

  * 二問目では矢関数を採用しない場合には `this` を変なスコープで保存しないとうまく動かない。

    ```javascript
    function delay(f, ms){
        function wrapped(...args){
            let savedThis = this;
            return setTimeout(
                //() => f.call(this, ...args),
                function(){ return f.call(savedThis, ...args); },
                ms);
        }

        return wrapped;
    }
    ```

* debounce
* throttle
* `bind()`
* `Promise`
* `async`/`await` など
* スクリプトタグの defer や async の理解は問題ないか
* `Proxy` で何か面白いことができないか

## Part 2

* Walking the DOM で述べられている基本的 API の理解を確認する
* Insertion methods 全部確認
* `elem.classList`
* `window.getComputedStyle(elem)` を上手く使えないか
* CSS positioning 各種
* `element.addEventListener()` のオプション
* 要素 `elem` 上でイベント `event` を発生させるには `elem.dispatchEvent(event)` を呼び出す。
* `CustomEvent`
* `closest()`

## Part 3

* `requestAnimationFrame()`
