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

### `call()`, `apply()`

`call()` を少し試す。`null`, `undefined` を与えたときの挙動が MDN の記載どおりであることを確認。

`apply()` は `call()` とほとんど同じ。たとえば演習問題の一問目は次でも同じだ：

```javascript
function spy(func) {
    wrapper.calls = [];

    function wrapper(...args){
        wrapper.calls.push(args);
        return func.call(this, ...args);
    };

    return wrapper;
}
```

二問目では矢関数を採用しない場合には `this` を変なスコープで保存しないとうまく動かない。

```javascript
function delay(f, ms){
    function wrapper(...args){
        let savedThis = this;
        return setTimeout(
            //() => f.call(this, ...args),
            function(){ return f.call(savedThis, ...args); },
            ms);
    }

    return wrapper;
}
```

### `debounce()`

`debounce()` は `clearTimeout()` を無効な ID を与えて呼び出せることが許されているのを利用する。

```javascript
function debounce(f, ms){
  let timeoutId;
  function wrapper(){
    //let savedThis = this;
    //let savedArgs = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => f.call(this, ...arguments),
      //function(){ return f.call(savedThis, ...savedArgs); },
      ms);
  }
  return wrapper;
}
```

最後の一回の変更だけ処理すれば十分であるような状況において、このデコレーターが有用だ。
テキストボックスの更新内容をどこかに送る例が挙げられる。他にもあるだろう。

### `throttle()`

`f.call()` と `wrapper.call()` を使い分けるなど、実装が難しいということを憶えておく。
`savedThis` は省略できそうだ？

```javascript
function throttle(f, ms){
    let isThrottled = false;
    let savedArgs;
    function wrapper(){
        if (isThrottled) {
            savedArgs = arguments;
            return;
        }
        isThrottled = true;

        f.call(this, ...arguments);

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                wrapper.call(this, ...savedArgs);
                savedArgs = null;
            }
        }, ms);
    }
    return wrapper;
}
```

`requestAnimationFrame()` を `throttle()` のように使えるという情報がある。

良資料 [Debouncing and Throttling Explained Through Examples - CSS-Tricks](https://css-tricks.com/debouncing-throttling-explained-examples/)

### `bind()`

引数の順序をうまく扱えないか？ こう書き換えるとどうだろう：

```javascript
function partial(func, ...args) {
    return function(...argsBound) {
        return func.call(this, ...argsBound, ...args);
    }
}
```

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
