---
title: Storing data in the browser
---

## Cookies, document.cookie

<https://javascript.info/cookie> ノート。

Cookie とは小さな文字列であって、ブラウザーに直接保存されるデータだ。
Cookie は HTTP の一部であり、RFC 6265 で定義されている。
Cookie は通常、HTTP-header 応答 `Set-Cookie` を使用してウェブサーバーが設定する。
その後、ブラウザーは `Cookie` HTTP-header を使用して、同じドメインへのほとんどすべての要求に cookie を自動的に追加する。

最も広く使われている事例のひとつが認証だ。

1. サインインすると、サーバーは応答 `Set-Cookie` HTTP-header を使って、固有のセッション識別子を持つ cookie を設定する。
2. 次回、同じドメインに要求が送られると、ブラウザーは `Cookie` HTTP-header を使ってネット上で cookie を送信する。
3. したがって、サーバーは誰が要求を行ったかを知っている。

ブラウザーから cookie にアクセスすることもできる。プロパティー `document.cookie` を用いる。

### Reading from document.cookie

値 `document.cookie` は、セミコロンで区切りの name=value ペアで構成されている。それぞれが個別の cookie だ。
特定の cookie を見つけるには、`document.cookie` を `;` で split し、正しい名前を見つければいい。
そのためには正規表現か配列関数を使える。
この章の終わりには cookie を操作するためのヘルパー関数がある。

ノート：ブラウザーの適当なタブで検証ツールの Console を開いて `document.cookie` をチェックするといい。

### Writing to document.cookie

`document.cookie` に書き込みができる。これはデータプロパティーではなく、
アクセッサーだ。特に代入は特別に扱われる。
`document.cookie` への書き込み操作は、その中に記述された cookie だけを更新し、他の cookie には触れない。
例えば、この呼び出しは `user` という名前と `John` という値を持つ cookie を設定する：

```javascript
document.cookie = "user=John";
```

代入後に `document.cookie` を出力すると、先に述べた理由でおそらく cookie が複数表示されるだろう。

技術的には、名前と値はどんな文字でも持つことができる。有効な書式を維持するために、
組み込み関数 `encodeURIComponent` を使ってエスケープする必要がある。

```javascript
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
```

----

制限が少しある。

* `encodeURIComponent` の後の name=value は 4KB を超えてはいけない。したがって、cookie に巨大なものを保存することはできない。
* ドメインあたりの cookie の総数は約 20+ に制限されているが、正確な制限はブラウザーによる。

----

Cookie にはオプションがいくつかあり、その多くは重要なのでなるべく設定する。

オプションは key=value の後にセミコロンで区切って、以下のように並べる：

```javascript
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

### path

```text
path=/mypath
```

`path` のプレフィクスは絶対でなければならない。そのパスの下にあるページから cookie にアクセスできるようにする。
既定値は現在のパスだ。

もし cookie が `path=/admin` で設定されると、ページ `/admin` および `/admin/something` で見ることができ、
`/home` や `/adminpage` では見えない。

通常、cookie をすべてのページからアクセスできるように、`path` をルートに設定する必要がある：

```text
path=/
```

### domain

```text
domain=site.com
```

`domain` は、cookie がアクセス可能な場所を定義する。しかし実際には制限がある。
どんなドメインでも設定できるわけではない。
Cookie を別の第二レベルドメインからアクセスできるようにする方法はないので、
other.com は site.com で設定された cookie を決して受け取らない。
これは安全上の制限で、あるサイトでのみ利用可能であるべき機密データを cookie に保存できるようにするためだ。

既定では、cookie はそれを設定したドメインでのみアクセス可能だ。
forum.site.com のようなサブドメインにも共有されない。
しかし、これを変更することができる。
forum.site.com のようなサブドメインが site.com で設定された cookie を取得できるようにしたい場合、それは可能だ。
そのためには、site.com で cookie を設定するときに、`domain` オプションを明示的にルートドメインに設定する必要がある。
そうすれば、すべてのサブドメインがそのような cookie を見ることになる。

### expires, max-age

### secure

### samesite

#### XSRF attack

#### Enter cookie samesite option

### httpOnly

### Appendix: Cookie functions

#### getCookie(name)

#### setCookie(name, value, options)

#### deleteCookie(name)

### Appendix: Third-party cookies

### Appendix: GDPR

### Summary

### Comments

## LocalStorage, sessionStorage

<https://javascript.info/localstorage> ノート。

### localStorage demo

### Object-like access

### Looping over keys

### Strings only

### sessionStorage

### Storage event

### Summary

### Tasks

#### Autosave a form field

### Comments

## IndexedDB

<https://javascript.info/indexeddb> ノート。

### Open database

#### Parallel update problem

### Object store

### Transactions

### Transactions' autocommit

### Error handling

#### Event delegation

### Searching

#### By key

#### By a field using an index

### Deleting from store

### Cursors

### Promise wrapper

#### Error handling

#### "Inactive transaction" pitfall

#### Getting native objects

### Summary

### Comments
