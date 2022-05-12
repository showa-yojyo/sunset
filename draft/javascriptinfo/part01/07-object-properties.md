---
title: Object properties configuration
---

## Property flags and descriptors

オブジェクトプロパティーには値のほかに三つの特別な属性がある（値も属性の一種）。

* `Object.getOwnPropertyDescriptor(obj, propertyName)`
* `Object.defineProperty(obj, propertyName, descriptor)`
* Non-configurable というのは `defineProperty` できないということ。

## Property getters and setters

`get()` と `set()` の定義方法。
これらをあとから `Object.defineProperty()` で追加定義することもできる。
