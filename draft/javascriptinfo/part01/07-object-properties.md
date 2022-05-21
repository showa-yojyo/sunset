---
title: Object properties configuration
---

オブジェクトの特性をさらに深く研究する。

## Property flags and descriptors

<!-- https://javascript.info/property-descriptors -->

### Property flags

オブジェクトプロパティーには値のほかに三つの特別な属性がある。
それらは次のフラグだ：

* writable: このプロパティーの値を変更できるか否か。
* enumerable: `for...in` ループでオブジェクトプロパティーを反復させると、このプロパティーが現れるか否か。
* configurable: このプロパティーが削除可能であり、ここに書いた特別な属性を更新できるか否か。

通常の方法でプロパティーを作成すると、これらは `true` だ。

`Object.getOwnPropertyDescriptor(obj, propertyName)` は上述のプロパティーの情報すべてを返す。

`Object.defineProperty(obj, propertyName, descriptor)` は上述のフラグを変更する。
このメソッドで新規プロパティーを値だけを割り当てるように定義すると、特別なフラグはすべて `false` となる。

* Non-configurable というのは `defineProperty` できないということ。

### Non-writable

次のようにすると `user.name` への代入が無効化される：

```javascript
let user = {
    name: "John"
};

Object.defineProperty(user, "name", {
    writable: false
});

user.name = "John";
```

* "use strict" モードがオフの場合にはエラーが発生せずに、代入は静かに失敗する。
  この振る舞いは他のフラグに対する `defineProperty` でも同様だ。
* `name` がまだプロパティーではない場合には、無効を明示的に指定する必要はない。

### Non-enumerable

まず、オブジェクト `user` にメソッド `toString` を普通に定義する。
それから `user` に対して `for...in` ループを書くと、このメソッドがプロパティーとして拾われる。
それを避けるときには、前項の要領で `enumerable: false` を指定する。

* `Object.keys(user)` の出力でも `toString` を除外する。

### Non-configurable

組み込みオブジェクトやプロパティーには、フラグ `configurable: false` が設定されているものもある。
例えば `Math.PI` を上書きしようとしても失敗する。さらに `writable: true` を指定しても失敗する。

* いったん `configurable: false` にすると、`configurable: true` に変えることはできない。
* `configurable: false` であっても、なぜか `writable: false` への変更は成功する。

### Object.defineProperties

このメソッドは一度にプロパティー複数を定義する。

```javascript
Object.defineProperties(user, {
    name: { value: "John", writable: false },
    surname: { value: "Smith", writable: false },
    // ...
});
```

### Object.getOwnPropertyDescriptors

このメソッドはオブジェクトのプロパティーと特別フラグをすべて返す。

これと前項のメソッドを利用して、オブジェクトを精密に複製することができる。

### Sealing an object globally

以上の機能はオブジェクトプロパティー単位で動作する。
オブジェクト全体へのアクセスを制限する次のようなメソッドもある：

| Method | Description |
|--------|-------------|
| `Object.preventExtensions(obj)` | 新しいプロパティーを追加するのを禁じる |
| `Object.seal(obj)` | プロパティーを追加したり削除したりするのを禁じる |
| `Object.freeze(obj)` | さらに変更も禁じる |

テストするメソッドはめったに使われないが、次のとおり：

| Method | Description |
|--------|-------------|
| `Object.isExtensible(obj)` | プロパティーの追加が禁じられているか |
| `Object.isSealed(obj)` | プロパティーの追加か削除が禁じられているか |
| `Object.isFrozen(obj)` | プロパティーの追加か削除か変更が禁じられているか |

上のメソッド群で seal と freeze 系は特別な属性 `configurable: false` もセットしたりチェックしたりする。

## Property getters and setters

<!-- https://javascript.info/property-accessors -->

オブジェクトのプロパティーは二種類ある。

* データプロパティー。今まで見てきたプロパティーはすべてこの分類だ。
* アクセッサープロパティー。値の取得や設定を実行するメソッドだ。

<!-- ここ図式化してもいいか -->

### Getters and setters

オブジェクトリテラルに対する「値の取得や設定を実行するメソッド」を定義する方法。

```javascript
let obj = {
    get propName() {
        // getter, the code executed on getting obj.propName
    },

    set propName(value) {
        // setter, the code executed on setting obj.propName = value
    }
};
```

上の定義のあと、標準的な記法 `obj.propName` で左辺値でも右辺値でもアクセスできる。
仮に `set` 側メソッドの定義を与えないと、右辺値としてしかアクセスできない。

### Accessor descriptors

既存のオブジェクトに `Object.defineProperty()` 系メソッドで「値の取得や設定を実行するメソッド」を定義する方法。

```javascript
Object.defineProperty(obj, 'propName', {
    get propName() {
        // getter, the code executed on getting obj.propName
    },
  
    set(value) {
        // setter, the code executed on setting obj.propName = value
    }
});
```

* アクセッサープロパティーを定義するときには
  `get`, `set`, `enumerable`, `configurable` の組み合わせのみが許される。
* データプロパティー定義の特別属性の組み合わせと、
  アクセッサープロパティー定義のそれとを混ぜることは許されていない。失敗する。

### Smarter getters/setters

ひじょうに典型的な `get`, `set` メソッドの定義例。

### Using for compatibility

こちらもひじょうに典型的な実装例。
