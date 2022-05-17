---
title: Data types
---

## Methods of primitives

<!-- https://javascript.info/primitives-methods -->

原子型とは次の七つを指す：
`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`.

* この分類はかなり疑問があるのだが、いちおう本文のまま引いておく。

### A primitive as an object

文字列や数値のような原子型でやりたいことはたくさんあるものの、できるだけ高速で軽量でなければならない。

* オブジェクトラッパーとは次の型を指す：
  `String`, `Number`, `Boolean`, `Symbol`, `BigInt`.
* 原子型の値に対してメソッドを呼び出すと、実際には対応するラッパーのインスタンスが一瞬生成されて、
  そのメソッドが呼び出される。その戻り値がメソッド呼び出しの結果になる。

  ```javascript
  "Hello".toUpperCase(); // == String("Hello").toUpperCase()
  ```

* したがって、オブジェクトラッパーのコンストラクターは直接呼び出しするようなものではない。
* `null`, `undefined` にはメソッドがない。

### Tasks

#### Can I add a string property?

原子型値にプロパティーを後付けしようとすると、

* "use strict" モードの場合には純粋にエラーになる。
* そうでない場合には、一瞬生成されるオブジェクトラッパーに対してプロパティーが追加される。
  この代入式が終了すると、このラッパーが消滅する。
  したがって、元の原子型値から追加プロパティーに参照すると `undefined` と評価される。

## Numbers

<!-- https://javascript.info/number -->

浮動小数点数の仕組みはどの言語でも通じるので必修。

JavaScript の数の型は、IEEE-755 準拠の数と、BigInt 系の二つに分類される。
ここでは前者を見ていき、後者はいずれ別の章で見る。

### More ways to write a number

Python のように、桁数の多いリテラル数値をアンダーバーで何桁かおきに区切って表現できる。
また、`1.23e4` や `1.23e-4` のような表記も有効。

#### Hex, binary and octal numbers

Python と同様の prefix を数リテラルに付加することで、それが何進数表記なのかを表せる。

### toString(base)

`toString()` 呼び出しで基数を指定できる。デフォルト値が 10 ということだ。

`(123456).toString(36)` などを `123456..toString(36)` とも書ける。これはいいことを知った。

### Rounding

基本的な関数：

```javascript
Math.floor(3.1) == 3;
Math.floor(-1.1) == -2;

Math.ceil(3.1) == 4;
Math.ceil(-1.1) == -1;

Math.round(3.1) == 3;
Math.round(3.6) == 4;
Math.round(3.5) == 4;

Math.trunc(3.1) == 3;
Math.trunc(-1.1) == -1;
```

数を小数点以下第 `n` 位に丸めたいときには、引数を `10**n` 倍したものを丸め関数に入力し、
出力を `10**n` で除算する。

`toFixed(n)` は丸めを伴う。しかも戻り値は文字列だ。

### Imprecise calculations

JavaScript とは本質的に関係がない IEEE-754 にまつわる、よくある問題について述べられている。

前項でなぜ丸め処理を紹介したのかが、これで納得がいくと思う。

### Tests: isFinite and isNaN

特別ではあるが、`Infinity` と `NaN` はいちおう数だ。それらのための関数が用意されている。

* 関数 `isNaN(value)` は引数を数に変換して、それが `NaN` であるかどうかをテストする。
  * これが存在する理由は、`NaN` を比較演算のオペランドに取ることが事実上できないからだ。
* 関数 `isFinite(value)` は引数を数に変換して、それが特別でない数かどうかを返す。
  * これをユーザー入力文字列が数であるかどうかをテストするのに援用することがある。

囲み記事で `Object.is()` について言及されている。

### parseInt and parseFloat

CSS では 100px や 12pt のような単位付きの値を指定することがよくある。
また、通貨記号が付きの 19€ のような金額から数値を抜き出したいこともよくある。
そのために関数 `parseInt` と `parseFloat` がある。

### Other math functions

おそらく演習問題の解法の幅を広げるために、以下の関数を紹介している：

* `Math.random()`
* `Math.min(a, b, ...)`
* `Math.max(a, b, ...)`
* `Math.pow(n, power)`

### Tasks

#### Sum numbers from the visitor

和を取るので、関数 `prompt()` の呼び出しに単項プラスを付けるなどして、明示的に数に変換する必要がある。
そうしないと、文字列の連結が生じる。これは以前にもやった。

#### Why 6.35.toFixed(1) == 6.3?

* Why の問いについては IEEE-754 の性質で説明がつく。
  ここにあるようにして `toFixed(20)` のような検証が思いつけるようになること。
* How の問いについては本文にあるように、小数点第何位の方式を採るしかない。

#### Repeat until the input is a number

先ほど記したように、ユーザー入力に対する検証と関数 `isFinite()` は相性がいい。

#### An occasional infinite loop

浮動小数点数は等号で比較するものではないということだ。

#### A random number from min to max

関数 `Math.random()` を与えられた範囲に引き伸ばす。GLSL の `mix` のような感じだ。

#### A random integer from min to max

個人的には `Math.floor()` を使うやり方を推奨。

## Strings

<!-- https://javascript.info/string -->

この内容に対応する Python でのやり方も身につけておく。練習問題が笑える。

文字列の内部フォーマットは常に UTF-16 であって、ページのエンコーディングとは関係ない。
これは JavaScript がブラウザー外でも動作する環境があることを考えると、固定の符号が採用されていることが理解できる。

### Quotes

* Python の f-string に対応するのはバッククォートによる文字列リテラル。
  ただし、評価部分は `${}` で囲む。
* 複数行にまたがる文字列リテラルを定義するには、バッククォートしか使えない。

### Special characters

バックスラッシュから始まる制御文字について述べている。よそでよく見かけるものとだいたい同じだ。

* `\b`, `\f`, `\v` はいつものと同じだが、互換性のために定義されているに過ぎず、現代では使われない。
* `\xXX`: 与えられた 16 進数に対応する Unicode 文字。
* `\uXXXX`:	与えられた 16 進数に対応する UTF-16 符号形式である Unicode 文字。
* `\u{XXXXXX}`: 与えられた 16 進数に対応する UTF-32 符号形式である Unicode 文字。
  `XXXXXX` 部分は一桁から六桁の 16 進数。

### String length

文字列の長さは読み取り専用プロパティー `length` で得る。

### Accessing characters

* 普通は `str[i]` で i 番目の文字を得る。文字列の長さよりも大きい番号のときには `undefined` となる。
* メソッド `str.charAt(i)` も i 番目の文字を得る。こちらは大きい番号のときに空文字列が返る。
* 文字列は iterable であり、`for...of` 文で文字列の各文字を反復できる。

### Strings are immutable

Python 同様、文字列は immutable な値だ。例えば上記のメソッドを左辺値として用いることはできない。

### Changing the case

| Method | Description |
|--------|-------------|
| `toLowerCase()` | 小文字に変換する |
| `toUpperCase()` | 大文字に変換する |

### Searching for a substring

文字列の中の部分文字列を探すには複数の方法がある。

#### str.indexOf

メソッド `str.indexOf(substr, pos)` 呼び出しは、文字列 `substr` が
文字列 `str` のどの位置にあるかを返す。

* 引数 `substr` が `str` の部分文字列でない場合には -1 を返す。
* 引数 `pos` は、指定されていたら、探索開始位置を表す。
* 候補が複数ある場合にはいちばん早い位置を返す。

メソッド `str.lastIndexOf(substr, pos)` もある。
これは候補が複数ある場合にはいちばん遅い位置を返す。

##### The bitwise NOT trick

戻り値が -1 か否かを判定するコードについて述べている。
これならコメント欄で +1 をテストすればいいではないかと指摘されている。

#### includes, startsWith, endsWith

これらは部分文字列であるかどうかを判定する。

| Method | Description |
|--------|-------------|
| `includes(substr, pos)` | `substr` が部分文字列であるかどうか |
| `startsWith(substr)` | `substr` から始まるかどうか |
| `endsWith(substr)` | `substr` で終わるかどうか |

### Getting a substring

次の三つを覚えておく：

| Method | Description |
|--------|-------------|
| `slice(start [, end])` | 指定範囲にある部分文字列を得る |
| `substring(start [, end])` | 同上 |
| `substr(start [, length])` | 長さを指定して部分文字列を得る |

* メソッド `slice` と `substring` は機能は同じだが、引数の扱いが異なる。
  前者は負の数を許し、後者は範囲の端点の逆転を許す。
* メソッド `substr` の `start` も負の数を認める。

### Comparing strings

比較演算子で lexicographical な比較を評価することはすでに述べられている。

#### Correct comparisons

メソッド `str.localeCompare(str2)` は順序関係を符号 (sign) で返す。

### Internals, Unicode

上級者向け。

#### Surrogate pairs

JavaScript では UTF-16 で文字を扱うので、たいていの文字は 2 バイトの数に対応する。
その範囲から漏れる文字は surrogate pair と呼ばれる 2 バイト文字の対で符号化される。

* そういう文字一文字から成る文字列に対して `length` を参照すると 2 が返る。
* メソッド `fromCodePoint()` と `codePointAt()` は surrogate pair を正しく扱う。

#### Diacritical marks and normalization

これは説明が難しい。一部の文字は、surrogate pair による表現方法が一意的でない。

本文で挙げている例は、次の連続する二文字で説明している：

* 「前の文字の上に点をつける」を指示する文字 `\u0307`
* 「前の文字の下に点をつける」を指示する文字 `\u0323`

メソッド `normalize()` はそのような文字列を「正規化」することができる。

### Tasks

#### Uppercase the first character

Python でいう `str.capitalize()` を書けという問題。JavaScript にこれがない理由は？

#### Check for spam

この問題は実用的なのに笑える。本質は case insensitive な比較を書けというものだろう。

#### Truncate the text

まさに `slice()` の出番だ。

#### Extract the money

これは前章の状況とは異なり、ドルマークが一文字目なので数のメソッド `parseInt()` は使えない。

## Arrays

<!-- https://javascript.info/array -->

Python の `list` に対応する型であると考えられる。

### Declaration

* `Array` のコンストラクターを呼び出す方法もあるが、配列リテラルで定義するのが普通だ。
* 文字列とは異なり配列オブジェクトは mutable であるので、添字参照を左辺値に書ける。
* Python のように、配列の各要素は型が異なっていてもよい。

### Get last elements with “at”

Python とは異なり、角括弧による要素の参照では負の添字が使えない。
メソッド `at()` はそれを許す。

### Methods pop/push, shift/unshift

| Methods | Description |
|---------|-------------|
| `pop()` | 配列の末尾から要素を削除する |
| `push(...)` | 配列の末尾に要素を追加する |
| `shift()` | 配列の先頭から要素を削除する |
| `unshift(...)` | 配列の先頭に要素を追加する |

### Internals

JavaScript エンジンは配列の要素を連続したメモリー領域に格納しようとする。
ほかにも最適化を行って、配列を非常に高速に動作させるようにしてする。
通常のオブジェクトのように扱う（余計なプロパティーを追加するなどする）と、最適化が壊れる。

### Performance

配列ではメソッド `push()` と `pop()` は速いが、他方でメソッド `shift()` と `unshift()` は遅い。
先頭の要素操作は、既存要素の配列内の移動を伴うからだ。

### Loops

配列を `for` ループで反復するには、添字をインクリメントするよりも `for...of` 文を適用するのがよい。
Python の事情とたぶん同じだろう。

### A word about "length"

文字列同様、プロパティー `length` が用意されている。

* 配列の長さの更新と同期して正しい値になる。
* 左辺値としても参照できる。配列を空にするのに `arr.length = 0` とすることもできる。

### new Array()

あえてコンストラクター `new Array()` を使って配列オブジェクトを生成する機会を考える。

### Multidimensional arrays

WebGL のコードを書くときに間接的に現れるかもしれない。

### toString

`Array.toString()` は特別に、要素をカンマ区切りで連結した文字列を返す。

`Array` には `Symbol.toPrimitive()` も `valueOf()` もなく、
`toString()` しか変換メソッドが実装されていない。

### Don't compare arrays with ==

JavaScript の `==` 演算は、こういう値の意味を持つオブジェクト同士では何の意味もないので使わない。
正しい比較方法は次章で論じられる。

### Tasks

#### Is array copied?

配列の問題というより、変数の理解の問題だ。

#### Array operations

追加メソッド、削除メソッドが正しく理解できているかを問う演習だ。

#### Calling in an array context

* `this` が `arr` を指すこと
* `arr.toString()` の内容が何であるかをわかっていること

#### Sum input numbers

関数 `prompt()` の戻り値をいつものように処理すること。

#### A maximal subarray

初版で線形オーダーのアルゴリズムを実装できる能力を身に付けておきたいものだ。

## Array methods

<!-- https://javascript.info/array-methods -->

### Add/remove items

前章のものに加え、要素操作メソッドはあと三つはある。

#### splice

メソッド `splice()` は削除したり追加したり置換したりと、多目的用途がある。

#### slice

メソッド `slice()` は Python と同じ。角括弧コロンのような特殊な記法はない。

#### concat

メソッド `concat()` は Python の `extend()` に相当する。ただし、実引数の
`Symbol.isConcatSpreadable` 値により連結方式が決まる。

### Iterate: forEach

メソッド `forEach()` は `for` ループを書かずに要素を反復することができる。

```javascript
arr.forEach(function(item, index, array) {
    // ... do something with item
});
```

### Searching in array

#### indexOf/lastIndexOf and includes

文字列のときに見たようなメソッドと同じようなものが配列にもある。文字の代わりに要素になっただけだ。

* 要素同士の比較は演算子 `===` で判定される。
* この三つのうちメソッド `includes()` だけが `NaN` を正しく検索できる。

#### find and findIndex

述語を与えて要素を検索するメソッドだ。

```javascript
let result = arr.find(function(item, index, array) {
    // if true is returned, item is returned and iteration is stopped
    // for falsy scenario returns undefined
});
```

* メソッド `find()` は述語が `true` であるような要素があるかどうかを判定する。
* メソッド `findIndex()` は述語が `true` であるような要素を返す。

#### filter

メソッド `filter()` は `find()` と引数リストが同じであり、
述語が `true` であるような要素をすべて返す。

### Transform an array

#### map

メソッド `map()` は写像を与えてその像を返す。

```javascript
let result = arr.map(function(item, index, array) {
    // returns the new value instead of item
});
```

#### sort(fn)

メソッド `sort()` は配列を in-place で並び替える。比較関数を与えることができる。

デフォルトの比較は文字列の比較であることに注意する。これは一般的には使えない。

```javascript
arr.sort((a, b) => a - b);

arr.sort((a, b) => a.localeCompare(b)));
```

#### reverse

メソッド `reverse()` は配列を in-place で逆順に並び替える。自身を返す。

#### split and join

* 文字列のメソッド `split()` は配列を返す。
* Python とは異なり、`join()` は配列のメソッドだ。
 
#### reduce/reduceRight

JavaScript では `reduce()` はメソッドだ。

### Array.isArray

`Array.isArray()` でオブジェクトが配列であることをテストする。

### Most methods support "thisArg"

述語を引数に取る配列メソッドのほどんどで、述語関数の内部から `thisArg` という値にアクセスできる。
これは関数スコープでの `this` と同じ値であるようだ。したがって、めったに利用されない。

### Tasks

#### Translate border-left-width to borderLeftWidth

文字列メソッドの問題かと思いきや？

#### Filter range

条件を満たす要素を全部見つけて新しい配列を作成して返す問題。

#### Filter range "in place"

このアルゴリズムには疑問があるが、言いたいことは前の問題の方針のほうが楽だということだろう。

#### Sort in decreasing order

本文中に解がある。

#### Copy and sort array

配列コピーが主題。その考え方は Python と同じ。

#### Create an extendable calculator

二項演算を表す文字列を `split()` でバラして変換して算術演算に持ち込む。

#### Map to names

メソッド `map()` の基本的な動作を確認する問題。

#### Map to objects

こちらも。

#### Sort users by age

ソートの簡単な問題。

#### Shuffle an array

ランダムシャッフルを実装する問題。メソッド `sort()` のキーを理解しているかが問われる。

#### Get average age

メソッド `reduce()` で和を取る方法は本文でやってある。

#### Filter unique array members

問題設定に疑問がある。

#### Create keyed object from array

これはデータベースの加工のような処理で興味深い。メソッド `reduce()` を応用するのは面白い。

## Iterables

<!-- https://javascript.info/iterable -->

* オブジェクトが iterable であるとは、オブジェクトがその構成要素を `for...of`
  ループで反復できることをいう。
* 配列や文字列は iterable だ。
* あるオブジェクトが配列ではなく、何かの集まりを表しているなら、
  `for...of` は構成要素を反復させるのに最適な構文だ。

### Symbol.iterator

オブジェクトに iterator を実装する方法を示している。ひじょうに覚えにくい。

* メソッド `[Symbol.iterator]` を定義する。それは次のようなオブジェクトを返すものとする：
  * プロパティー `current` を有する。一般には反復中の値を管理するためのデータだ。
  * プロパティー `last` を有する。集まりの最後の値を表す。
  * メソッド `next()` を有する。これは反復中の状況に応じて次のようなオブジェクトを返すものとする：
    * プロパティー `done` はまだ要素が残っているかどうかを表す Boolean 値とする。
    * プロパティー `value` は反復中の現在の要素を表す。

この節のオブジェクト `range` は以降も引き合いに出される。

### String is iterable

以前にも述べられたとおり、文字列を `for...of` で反復すると、先頭から末尾まで一文字ずつアクセスできる。

### Calling an iterator explicitly

反復可能なオブジェクトから iterator を直接得て、`for...of` ではなく `while` 文でループする例だ。
デザインパターンの教科書を読んだことがあれば自然に理解できる。

### Iterables and array-likes

次節で紹介するメソッドを説明するために「オブジェクトが配列風である」という用語を定義している。
すなわち、プロパティー `length` を備えているオブジェクトだ。

### Array.from

関数 `Array.from()` は反復可能オブジェクトまたは配列風オブジェクトをとり、本物の配列を返す。

* `Array.from(c).map(f)` のようなことを考えているのならば、それは `Array.from(c, f)` でいっぺんに実現できる。

## Map and Set

<!-- https://javascript.info/map-set -->

JavaScript にもこれらの機能が用意されている。

### Map

JavaScript のオブジェクトも連想配列の性質があると言えるが、
それとは違って本物の `Map` はキーに任意の型の値を許す。

意味はわかるだろうから、主要なメソッド、プロパティーを説明なしで記しておく：

* `new Map()`
* `map.set(key, value)`
* `map.get(key)`: 値がない場合には `undefined` が返ることに注意。
* `map.has(key)`
* `map.delete(key)`
* `map.clear()`
* `map.size`

その他注意点：

* クラス `Map` のオブジェクト `m` に対して `m[k]` は使わない。やらかしそうで怖い。
* 任意の型をキーに使えると書いたが、なんと `Object` も許されている。これは Python だとあり得ない。
* キーの比較関数は演算子 `===` と考えてよいのだが、例外的に `NaN` もキーとして扱えるように考慮されている。

### Iteration over Map

これも意味はわかるはずだから、メソッド名だけ列挙しておく：

* `map.keys()`
* `map.values()`
* `map.entries()`

これらを `for...of` ループの iterable オブジェクト指定部分で呼び出せる。

* ループ中の反復順序は要素の挿入順に従う。これは一般の `Object` と異なる。
* `Map` にもメソッド `forEach()` が用意されている。

### Object.entries: Map from Object

```javascript
new Map(Object.entries(obj));
```

### Object.fromEntries: Object from Map

`Object` を `Map` に変換するには `Object.entries()` を併用する。

```javascript
Object.fromEntries(map.entries());
// or
Object.fromEntries(map);
```

### Set

JavaScript にも集合を扱うクラスがある。機能だけ列挙しておく：

* `new Set(iterable)`
* `set.add(value)`
* `set.delete(value)`
* `set.has(value)`
* `set.clear()`
* `set.size`

### Iteration over Set

`for...of` ループに関係するメソッドを列挙しておく：

* `set.keys()`
* `set.values()`
* `set.entries()`

`set.forEach()` はインターフェイスにクセがあるか。
なぜ JavaScript はコレクションの `forEach` 引数リストを一致させたいのだろう。

### Tasks

#### Filter unique array members

考え方は Python と同じようだ。

#### Filter anagrams

いろいろと面白いコードがある。対象がアナグラムなのでソートが有用となる。

* `.split('').sort().join('')` で文字列をある意味で正規化する。

#### Iterable keys

少し前の章で述べられているように、反復可能オブジェクトから `Array.from()` で配列を生成する。

## WeakMap and WeakSet

<!-- https://javascript.info/weakmap-weakset -->

本章の説明のために、到達可能性の定義の復習から始まっている。

### WeakMap

`WeakMap` はキーが `Object` である連想配列であって、キー要素のゴミ収集を妨害しないものだ。

キーとなるオブジェクトが外部では参照されなくなると、対応する収容オブジェクトが失われて減る。

`WeakMap` のメソッドは `Map` よりも少ない。
反復操作とサイズ属性がないので、消滅時にそれを直接確認する術はない：

* `weakMap.get(key)`
* `weakMap.set(key, value)`
* `weakMap.delete(key)`
* `weakMap.has(key)`

この考え方は面白い。Python にも対応物があったか？

### Use case: additional data

キーオブジェクトがゴミ収集されたときに、その値が自動的に消えるとうれしい場合に
`WeakMap` を利用するといい。

```javascript
weakMap.set(john, "secret documents");
```

### Use case: caching

これを見て思ったが、逆に上記のメソッドしか使われていない `Map` があれば、
それは `WeakMap` に置き換えることができるのではないか。

### WeakSet

`WeakSet` は `WeakMap` の集合版だ。

* `set.add(value)`
* `set.delete(value)`
* `set.has(value)`

`WeakMap` も `WeakSet` も反復可能ではない。関連メソッドも備わっていない。

### Tasks

#### Store "unread" flags

オブジェクト `messages` を一切変更できない場合はこんなふうにラップする。

#### Store read dates

上の問題で付加的な情報を扱う場合には `WeakSet` を `WeakMap` に差し替えて、値を処理したい情報とする。

## Object.keys, values, entries

<!-- https://javascript.info/keys-values-entries -->

それを言い出すと `length` もオブジェクト属性ではなく静的メソッドのほうが柔軟であることになる。

### Object.keys, values, entries

`Map` のメソッド `keys()`, `values()`, `entries()` を一般化して `Object` に実装することを考える。

`Object` の場合はインスタンスメソッドではなく、クラスメソッドのような形式で用いる：

| Method | Description |
|--------|-------------|
| `Object.keys(obj)` | キーの配列を返す |
| `Object.values(obj)` | 値の配列を返す |
| `Object.entries(obj)` | キーと値の配列の配列を返す |

* これらのメソッドは本物の配列を返すことに注意する。当時は反復可能オブジェクトという考え方がなかったのだろう。
* 普段は問題にならないが、これらのメソッドは `Symbol` キーを無視する。

### Transforming objects

`Object` には `map()` や `filter()` が欠けているように見えるが、上述のメソッドが配列を返すことを利用すればいい。

キーと値の配列の配列をオブジェクトに変換する場合には `Object.fromEntries()` を呼び出す。

### Tasks

この章の問題はべらぼうに易しい。

#### Sum the properties

`Object.values()` を利用する絶好の機会。
さらに、関数型プログラミングが好みならば `reduce()` を利用する絶好の機会でもある。

#### Count properties

`Object.keys()` の長さを求めればいい。

## Destructuring assignment

<!-- https://javascript.info/destructuring-assignment -->

JavaScript では `Object` や `Array` を多用するが、関数にそれを入力するとき、
その全体が必要ではない場合がある。ここでは、それらを変数の束に分解するための特別な構文を学ぶ。
この構文は、さらに、多くの引数や既定値などを引数リストに持つ関数で威力を発揮する。

### Array destructuring

左辺値の書き方に特徴がある。右辺は配列とする。

```javascript
let arr = ["John", "Smith"]

let [firstName, surname] = arr;

let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);

let user = {
    name: "John",
    age: 30
};
for (let [key, value] of Object.entries(user)) {
    // ...
}

let guest = "Jane";
let admin = "Pete";
[guest, admin] = [admin, guest];
```

#### The rest '...'

分解代入において、主要でない部分に `...` を付加して値を押し込むことができる。

```javascript
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
```

この場合、変数 `rest` は配列となり、右辺の配列の後ろ二つの要素からなる。

#### Default values

次の構文で既定値を定義できる（右辺値は定数である必要はない。何なら関数呼び出しでもいい）。

```javascript
let [name = "Guest", surname = "Anonymous"] = arr;
```

### Object destructuring

`Object` バージョンの分解代入構文の例を本文からいくつか引用する：

```javascript
let options = {
    title: "Menu",
    width: 100,
    height: 200
};
```

このとき、次のような分解代入を書ける：

```javascript
let {width, height} = options;
```

既定値を指定する（配列の分解代入と同様に、値は定数である必要はない）：

```javascript
let {width = 111, height = 222} = options;
```

変数名をオリジナルのものと変える：

```javascript
let {width: w, height: h} = options;
```

なお、変数名の変更と既定値の指定を一度にできる。

#### The rest pattern "..."

配列の `...` と同様に、オブジェクトでも適用できる：

```javascript
let {title, ...rest} = options;
```

### Nested destructuring

分割代入は入れ子になっていても機能する。しかしこれはまず使わないだろう。

### Smart function parameters

この構文は関数のオプショナル引数を実装するのにうってつけだ：

```javascript
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    "function body";
}
```

### Tasks

#### Destructuring assignment

基本仕様の確認問題。

#### The maximal salary

無理に分解代入を適用するような問題ではない。

## Date and time

<!-- https://javascript.info/date -->

一日が 25 時間ある場合がある。

### Creation

コンストラクターで生成する。

* `new Date()`
* `new Date(milliseconds)`
* `new Date(datestring)`: cf. `Date.parse`
* `new Date(year, month, date, hours, minutes, seconds, ms)`:
  引数は指定しないとゼロになるだろう。

### Access date components

プロパティー直接参照の形式ではなく、メソッド `getXXX()` を呼び出す方法だ。
インターフェイスが旧式なのだ。

* 年は注意。`getFullYear()` が対応する。
* 月は `getMonth()` だ。しかし 0 から 11 までの整数を返す。
* 曜日は `getDay()` で、0 から 6 までの整数を返す。
* メソッド `getUTCXXX()` 系はローカルタイムではなく標準時を返す。
* 次のメソッドには対応する UTC 版がない：
  * `getTime()`
  * `getTimezoneOffset()`

### Setting date components

* `setFullYear(year, [month], [date])`
* `setMonth(month, [date])`
* `setDate(date)`
* `setHours(hour, [min], [sec], [ms])`
* `setMinutes(min, [sec], [ms])`
* `setSeconds(sec, [ms])`
* `setMilliseconds(ms)`
* `setTime(milliseconds)`

最後のものだけ UTC 版はない。

### Autocorrection

日付オブジェクトに範囲外の値を設定しても、自動で調整される。
例えば 8 月 32 日は 9 月 1 日になる。

### Date to number, date diff

* 日付 `date` が数に変換する状況では、その値は `date.getTime()` と同じだ。
* 日付同士の減算は数へのキャストが機能し、結果的に時差が得られる。

### Date.now()

`Date.now()` で `new Date().getTime()` と同じ値が得られる。

### Benchmarking

省略。

### Date.parse from a string

`Date.parse(str)` の完全な書式は YYYY-MM-DDTHH:mm:ss.sssZ だ。

* YYYY だけでも可。
* YYYY-MM だけでも可。
* YYYY-MM-DD だけでも可。
* T は文字通り T とする。
* ここで Z は文字通り Z とするか、+-hh:mm とする。

このメソッドはタイムスタンプを返す。

### Tasks

#### Create a date

普通のコンストラクターの使い方を確認する。

#### Show a weekday

日付から曜日を名前で返す関数を書け。

#### European weekday

省略。

#### Which day of month was many days ago?

実はコピーコンストラクターが使える。

#### Last day of month?

`Date` コンストラクターの日引数に何を渡せばいいのかが問われている。

#### How many seconds have passed today?

要するに本日の 0:00:00 を表すオブジェクトが欲しい。

#### How many seconds till tomorrow?

着想は上の問題と同じ。

#### Format the relative date

Twitter の日付表示のような関数を作れという問題。

## JSON methods, toJSON

<!-- https://javascript.info/json -->

自作オブジェクトをダンプするためだけにメソッド `toString()` を実装する必要はない。

* 対象オブジェクトの `toJSON()` が存在すれば `JSON.stringify()` はそれを利用する。
* デシリアライズの注意点として、例えばタイムスタンプ文字列は勝手に `Date` に変換されたりはしない。

### JSON.stringify

JSON とは値やオブジェクトを表現するための一般的な (RFC 4627) フォーマットだ。
JavaScript のために作られた仕様だが、他のプログラミング言語でも取り扱うことができるライブラリーがあるだろう。

次の二つのメソッドが重要だ：

| Methods | Description |
|---------|-------------|
| `JSON.stringify(value[, replacer, space])` | オブジェクトを JSON に変換する |
| `JSON.parse(str, [reviver])` | JSON をオブジェクトに変換する |

* スクリプトファイルに書かれるようなオブジェクトリテラルに似た文字列を返す。
* 引数 `value` として、オブジェクトだけではなく、配列、原子型値や `null` も受け付ける。
* メソッド、`Symbol` プロパティー、値が `undefined` のプロパティーは無視される。
* 循環参照がない限り、オブジェクトが別のオブジェクトで階層的になっていてもよい。

### Excluding and transforming: replacer

引数 `replacer` は JSON 化するプロパティーの配列を指定するか、
対応を与える `function(key, value)` を指定する。

* 特定のプロパティーしか JSON 化する必要がないときなど、配列で指定すればいい。
  ただし、本文の例のようにフィルターが厳し過ぎる。
* 逆に、特定のプロパティーだけ無視したい場合にはフィルター関数を指定する。
  無視したい `key` に対して `undefined` を返す関数を書けばいい。

`JSON.stringify()` の最初の呼び出しは特別だ。関数 `replacer` に対する最初の
実引数 `key, value` はそれぞれ空文字列と `JSON.stringify()` の実引数のほうの `value` に等しい。

### Formatting: space

引数 `space` は JSON 文字列における空白文字の個数を制御する数だ。
文字列を指定して空白文字列の代わりに出力させることもできる。

### Custom "toJSON"

JSON 化される値がメソッド `toString()` を有するならば `JSON.stringify()` はそれを採用する。

### JSON.parse

JSON 文字列をオブジェクトに復号するには `JSON.parse()` を用いる。

手書きの JSON の典型的な間違い：

* キーや文字列型の値を引用符で囲むのを忘れる。
* 引用符は二重引用符しか使えない。
* うっかり `new` コンストラクター呼び出し形式のオブジェクトを書いてしまう。

### Using reviver

引数 `reviver` は対応を与える `function(key, value)` を指定する。
符号化のときと同様に、特別に処理したいキーをフィルターするのに用いる。
例えば `Date` オブジェクトだった文字列を `Date` に戻すには、自力でそれを処理する。

### Tasks

#### Turn the object into JSON and back

この問題がわからなかったら、読者はどうかしている。

#### Exclude backreferences

与えられたオブジェクト `meetup` をそのまま `JSON.stringify()` に渡すと、
エラーメッセージに循環参照の場所が示される。

* `key` が空文字列であるかどうかのテストが必要だ。
  最初の呼び出しであるかどうかをチェックするためだ。
* あとは指示通りに `value` と `meetup` との比較をすればいい。
