---
title: Advanced working with functions
---

## Recursion and stack

<!-- https://javascript.info/recursion -->

読者がプログラミングに慣れているならば、この章を読み飛ばせるだろうと言っているので、
JavaScript の再帰関数の性質はよその言語と同じと思われる。

### Two ways of thinking

以前やった関数 `pow(x, n)` を引き合いに出して、再帰関数の仕組みを説明している。

* 再帰関数のコードは、ループ版よりも短いのが普通だ。
* ネストされた呼び出しの最大数（最初のものを含む）は再帰深度と呼ばれる。
* 最大再帰深度は JavaScript エンジンによって制限されている。
  10000 はあると期待できるようだ。
* 再帰関数の呼び出しの深さの限界を伸ばす tail call optimization という概念は知らなんだ。

### The execution context and stack

関数呼び出しに伴うデータ構造、実行コンテキストスタックの概念を述べている。

#### pow(2, 3)

`pow(2, 3)` 呼び出しを例に、実行コンテキストスタックを模式的に説明している。

関数呼び出しのときにはスタックにコンテキストが一つ積まれる。

#### pow(2, 2)

さらにコンテキストスタックにコンテキストが一つ積まれる。
`pow(2, 2)` のものが `pow(2, 3)` のものの上に積まれる。

#### pow(2, 1)

さらに `pow(2, 1)` のレコードが `pow(2, 2)` のコンテキストの上に積まれる。

#### The exit

`pow(2, 1)` は base case なのでこれ以上の関数呼び出しを生じない。
値を返すときに、スタックから `pow(2, 1)` のコンテキストが降ろされる。

すると、スタックのてっぺんは `pow(2, 2)` のコンテキストとなる。
それから `pow(2, 2)` の実行が再開されて、以下同様にしてスタックが小さくなっていく。

* 再帰関数呼び出しがコンテキストスタックの管理に、一般に相当のメモリーを消費することを理解する。
* それゆえ、ループベースの関数はメモリーを節約できることを理解する。
* どんな再帰関数でもループで書ける。ループ版のほうが効率的であり得る。

### Recursive traversals

同じ構造のオブジェクトが入れ子になっているオブジェクトを扱う再帰関数を書く。
この例では次の部分に注目する：

* 対象オブジェクトの配列に対しては、それを確認するために `Array.isArray()` を呼び出す。
  今回の処理は集計なので、メソッド `reduce()` も有用だ。
* 対象オブジェクトに対しては、`for...of Object.values()` ループで全プロパティーの値を集計する。

### Recursive structures

JavaScript の世界で再帰的構造データといえば、もちろん HTML 文書だ。

#### Linked list

単方向リスト構造も再帰的構造データの一種だと言える。

おそらく繰り返しになるからだろうが、アイテムを順次アクセスするコードが掲載されていない。

### Tasks

#### Sum all numbers till the given one

1 から `n` までの自然数の和を返す関数を三パターン書けという、たいへん基本的な問題だ。
もちろん、ループを使う版と再帰関数版がパターンに含まれる。
最後に和の公式を実装した O(1) オーダーのコードを書いて締める。

もっとも、この演習問題の本質は計算時間の比較検討にあると思われる。
さらに、スタックオーバーフローの実験もここでやってしまうか。

#### Calculate factorial

典型的な問題が続く。

#### Fibonacci numbers

典型的な問題がさらに続く。解説がひじょうに親切だ。

#### Output a single-linked list

ここでやるからさっきは単方向リストを扱うコードがなかったのだ。
当然、再帰関数版とループ版を書く。

#### Output a single-linked list in the reverse order

再帰関数版のほうがループ版よりも自然な例を挙げろと言われたときのために、この問題を覚えておくと良さそうだ。
自然な設定ではないのが難点だ。

## Rest parameters and spread syntax

<!-- https://javascript.info/rest-parameters-spread -->

JavaScript の組み込み関数の多くは、任意の数の引数を受け付ける。
ユーザー定義関数でも同じことができる。

* `...` は仮引数にも実引数にも現れることがある。
  仮引数の場合は引数リストの最後になければならない。
  実引数の場合は、対象が配列であることを前提とする。
  要素がバラバラに並べたものに置き換わる。
* 普通の関数の `arguments` は Bash とかのシェルのような着想？

### Rest parameters ...

引数リストの最後の仮引数名の直前に `...` を付けると、この機能が有効になる。

```javascript
function showName(firstName, lastName, ...titles) {
    // function body
}
```

この場合、関数本体からは引数 `tiles` を配列としてアクセスする。

### The "arguments" variable

通常形式の関数には `arguments` という、隠れた配列風オブジェクトにアクセス可能だ。
これは関数に渡されたすべての引数からなる。

* 旧式の機能だ。
* 添字による参照とプロパティー `length` は使えるが、まともな配列メソッドはない。
* 矢関数には `arguments` は存在しない。

### Spread syntax

反復可能オブジェクトを「カンマ区切りの値の列」に変換する機能だと理解する。

```javascript
Math.max(3, 5, 1);

let arr = [3, 5, 1];
Math.max(...arr);

let arr = [3, 5, 1];
let arr2 = [8, 9, 15];
let merged = [0, ...arr, 2, ...arr2];
```

### Copy an array/object

配列やオブジェクトを複製するのに `...` を応用することができる：

```javascript
let arr = [1, 2, 3];
let arrCopy = [...arr];

let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj };
```

## Variable scope, closure

<!-- https://javascript.info/closure -->

* JavaScript は関数指向言語。
* この章では変数は `let` または `const` で宣言されているものとする。

### Code blocks

変数のスコープは、それが宣言されたブロック内となる。

### Nested functions

JavaScript ではある関数を定義するのに、別の関数の内側でそれをすることができる。

* 入れ子になった関数は外側の変数にアクセスできる。
* 入れ子になった関数は、新しいオブジェクトのプロパティーとして、あるいはそれ自体の結果として返すことができる。
  その関数はほかの場所で使用することができ、どこにいても同じ外部変数にアクセスできる。

```javascript
function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter = makeCounter();
counter();
counter();
counter();
```

### Lexical Environment

まともなプログラマーを目指すならば lexical environment の概念を習得したい。

#### Step 1. Variables

実行中の関数、コードブロック、スクリプト全体は、それぞれが内部的な（表に出てこない）関連オブジェクトとして
lexical environment と呼ばれるものと関連している。

LE は二つの構成要素がある：

1. 局所変数すべてをプロパティーとして保存するオブジェクト。これを environment record と呼ぶ。
2. 外側のコードに関連する LE への参照。

細かい記述が続いているものの、本文のイラストで理解できる。

#### Step 2. Function Declarations

前に述べられたことを LE という言葉を使って言い直している：
関数宣言は即座に完全に初期化される。
LE が作られると、関数宣言はすぐに呼び出せる。これは `let` 変数とは対照的だ。
そのため、関数宣言として宣言された関数は、宣言そのものよりも前に呼び出せる。

#### Step 3. Inner and outer Lexical Environment

関数が実行されると、呼び出しの最初に、新しい LE が自動的に作成され、
呼び出しの局所変数と引数が保存される。

関数呼び出しの際には、内側（関数呼び出し用）と外側（グローバル）の LE がそれぞれ存在する。

コードが変数にアクセスしようとすると、まず内側の LE が検索され、次に外側の LE が検索され、
さらに外側の LE が検索され、グローバル変数が検索される。
もし変数がどこにも見つからなかったら、それは "use strict" モードではエラーだ。

#### Step 4. Returning a function

先ほどの関数 `makeCounter` で LE の更新を考察している。

関数はすべて、それが作成された LE を記憶している。
関数はすべて ``[[Environment]]`` という隠しプロパティーを持っていて、
関数が作られた LE に対する参照を保持する。

囲み記事で closure について説明している。次のことを押さえておくのがだいじだ：

* 定義（外部の変数にアクセスできる関数）
* JavaScript のすべての関数が closure であること
* LE の概念

### Garbage collection

LE は関数呼び出しが終了すると、すべての変数とともにメモリーから削除されるのが通例だ。
JavaScript における到達可能性ルールが LE にも適用される。

ただし、関数の終了後も到達可能な入れ子関数がある場合、
それは LE を参照する `[[Environment]]` プロパティーを持っている。
その場合、LE は関数の終了後でも到達可能なので、生き続けることになる。

#### Real-life optimizations

ブラウザーによっては、関数 LE を最適化する。
副作用としてデバッガーで見えなくなる外側の変数が生じる。

### Tasks

演習問題はすべて理解する。重要な概念なので問題数が多い。
 
#### Does a function pickup latest changes?

この状況で出力されるのが "Pete" でなかったら驚く。

#### Which variables are available?

LE というか、変数のスコープの概念を正確に理解しているかを問うている。

#### Are counters independent?

本文を読んでいるときに少し頭によぎった疑問が問題になっている。
`makeCounter()` を二度呼び出して、カウンターを二つ作ると、それぞれの呼び出しは（期待通りに）独立しているか？

#### Counter object

落とし穴がありそうでない問題。

#### Function in if

この関数はスコープが `if` ブロックに一致するので、それを抜けてからの呼び出しはエラーとなる。

#### Sum with closures

C/C++ 標準ライブラリーの `std::bind()` の考え方か。

#### Is variable visible?

この問題はエラーメッセージの内容を言い当てれば正解だな。

#### Filter through function

「関数を返す関数を書け」問題。早く慣れることだ。

#### Sort by field

これも「関数を返す関数を書け」問題。

#### Army of functions

問題文の関数がどうおかしいのか、原因もいっしょにすぐにわかる。しかし修正方法がよくわからない。
正解は「局所変数を新しく設けて、一個外側の LE の変数のコピーを作る」だ。

## The old "var"

<!-- https://javascript.info/var -->

* 自前のコードで `var` を使うことはない。
* 古いスクリプトを `var` から `let` に移行するのであれば、違いを理解しておくことは重要だ。

### "var" has no block scope

`var` 変数は関数スコープか大域スコープのどちらか一方をとる。
だから、ブロックを貫通して見えると言っても、
関数内の何らかのスコープで宣言された `var` 変数を関数の外側から見ることはできない。

### "var" tolerates redeclarations

`var` 変数は再宣言に耐える。エンジンが同一変数の二度目以降の `var` 宣言を単に無視するだけだ。

### "var" variables can be declared below their use

`var` 変数は、宣言位置がスコープの先頭にあったかのように扱われる。

### IIFE

昔の JavaScript プログラマーは `var` 変数をどうしてもスコープに持たせたいときにはこのようにした：

```javascript
(function() {
    var message = "Hello";
    // ...
})();
```

## Global object

<!-- https://javascript.info/global-object -->

* グローバルオブジェクトは、どこでも利用可能な変数や関数を提供する。言語や環境に組み込まれている。
  * ブラウザーでは `window`
  * Node.js では `global`
* グローバルオブジェクトの標準的な名前は `globalThis` という。
  * ブラウザーだと `window == globalThis` となる。

本章では環境がブラウザーであると仮定して `window` を使用する。

* グローバルオブジェクトのすべてのプロパティには直接アクセスできる。
  例えば `window.alert` でも `alert` でもいい。
* ブラウザーでは、グローバル関数や `var` 変数はグローバルオブジェクトのプロパティーとなる。
* グローバルオブジェクトにプロパティーを追加すると、やはりこれも直接アクセスできるようになる。

グローバル変数は推奨されない。

### Using for polyfills

グローバルオブジェクトを利用して、最新の言語機能の対応状況をテストすることもできる。
例えば `window.Promise === undefined;`

## Function object, NFE

<!-- https://javascript.info/function-object -->

JavaScript では関数はオブジェクトだ。
呼び出すだけでなく、プロパティーの追加や削除、参照渡しなど、オブジェクトとして扱うことができる。

### The "name" property

関数の属性 `name` はいつでも有効だ。かなり無茶な定義をしても名前が得られる。最悪でも空文字列が得られる。

### The "length" property

関数の属性 `length` は引数リストの引数の個数に等しい。いつでも有効だ。

* `...` のついた引数はこの個数に含まれない。

### Custom properties

関数に対してプロパティーを勝手に定義できる。これは関数の局所変数とは別物だ。

このようなプロパティーはしばしば closure の代わりになる。

### Named Function Expression

NFE の何がありがたいのか。関数内部から自身を参照できるくらいか。

### Tasks

#### Set and decrease for counter

オリジナルの実装は次のもので、ここに処理を加えて `set(value)` や `decrease()` を呼び出せるようにする。

```javascript
function makeCounter() {
    function counter() {
        return counter.count++;
    };

    counter.count = 0;

    return counter;
}
```

ありがたいことにサンドボックスにはテストコードが付いている。

#### Sum with an arbitrary amount of brackets

関数を書いて、その `toString()` で現在の和を表示させるという着想か。

## The "new Function" syntax

<!-- https://javascript.info/new-function -->

めったに利用されないが、実行時に関数を定義する機能がある。

### Syntax

```javascript
let sum = new Function('a', 'b', 'return a + b');
```

* 最初から最後の一つ手前までの引数は仮引数名の配列を指定する。
* 最後の引数は文字列で、関数本体のソースコードそのものを指定する。

サーバーからコードを受け取るときや、複雑なウェブアプリケーションでテンプレートから関数を動的に定義するときなど、
特殊な場合に使用される。

### Closure

このようにしてできた関数の LE は特殊で、その隠しプロパティー `[[Environment]]` はグローバルのそれ固定となる。
定義時の LE は考慮されない。

* あたかもグローバルスコープで関数が定義されたかのような扱いになるということだろう。

これで作られた関数が外部の変数にアクセスするようなコードを含んでいると、
minifier がそれをダメにする可能性が高い。

## Scheduling: setTimeout and setInterval

<!-- https://javascript.info/settimeout-setinterval -->

ある関数を今すぐには実行せず、未来のある時刻に実行することを決めることがある。
これを呼び出し時間調整ということにする。

まずは次の関数二つを習う：

* `setTimeout`
* `setInterval`

これらは JavaScript 仕様にないにも関わらず、ブラウザーすべてと Node.js が実装している。

### setTimeout

```javascript
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);
```

* `func` または `code` は呼び出し時間調整をする関数またはそのソースコード文字列。
* `delay` は実行遅延時間。単位はミリ秒。デフォルトはゼロ。
* 残りの引数は `func` または `code` の実引数

#### Canceling with clearTimeout

`setTimeout` の戻り値はタイマー ID であり、呼び出し時間調整を取り消すときに必要となる値だ。

```javascript
clearTimeout(timerId);
```

### setInterval

```javascript
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);
```

時間 `delay` が経過するたびに指定された関数を呼び出し、さらに時間 `delay` が経過するとまた呼び出す。
これを繰り返す。

呼び出し時間調整を取り消すには `clearInterval(timerId)` とする。

### Nested setTimeout

関数 `setInterval` は定期的に何かを実行し続けるのに利用できることがわかった。
そのような方法はもう一つある。関数 `setTimer` を入れ子に仕掛ける方法だ。

定期的というか、むしろ時間間隔を柔軟に調整できる手法だ。
本文のリクエスト送信の擬似コードでは、入れ子になった方の `setTimer` の値 `delay` が倍増していく。

入れ子 `setTimeout` 方式は、単体の `setInterval` よりも正確に実行間の遅延を設定することができる。
このイラストが `delay` の意味を明確に説明している。
前者は隣接する関数呼び出しの開始時刻同士の間隔が `delay` で、
後者は隣接する関数呼び出しの終了時刻と開始時刻の間隔が `delay` だということだ。

`setInterval` で処理する関数の実行時間が `delay` よりも長い場合には、
次の関数呼び出しは直ちに起こることになる。

* 上記をよく覚えておく。
* 囲み記事のキャンセルの重要性についても注目する。

### Zero delay setTimeout

`setTimeout(func, 0)` の挙動について述べられている。

* `delay` がゼロでなくても現在実行中のコードが終了してからでないと `func` が呼び出されないはずだ。
* ブラウザーでは、入れ子タイマーを実行できる頻度に制限がある。HTML5 標準では、
  五つの入れ子タイマーを実行したら、その間隔は最低でも 4 ミリ秒になるように強制されるとなっている。

### Tasks

#### Output every second

タイマーものはデバッグも動作検証も難しい。

#### What will setTimeout show?

これは本文の記述を理解できているかを確認するだけの問いだ。

## Decorators and forwarding, call/apply

<!-- https://javascript.info/call-apply-decorators -->

無視できない内容であるので、先に進むのを止めてコードをじっくり動かす。
ここから何章か、コードをデバッガーで起動して言語の急所を体で覚える。

* 何かのはずみで `this` が未定義になる症状。そういうときには `.call()` を思い出せ。
* `.call()` の変種で `.apply()` というのがある。引数リストの形式が異なる。
* メソッドを「拝借する」イディオムが存在する。

### Transparent caching

入力された関数に対しておまけの処理を追加した関数を定義して、それを出力することがわかる。
よくあるデコレーターパターンだ。

### Using "func.call" for the context

先ほどのデコレーターにオブジェクトメソッドを入力するとエラーが起こる。
関数には組み込みメソッド `call` があり、これを用いて明示的に関数を呼び出す必要があった。

```javascript
func.call(context, arg1, arg2, ...);
```

* 第一引数 `context` が指定するのが `func` 関数本体で `this` を参照するときに実際に参照されるものだ。
* 第二引数以降が `func` への入力引数だ。

本文の最初のデコレーター関数の `func` 呼び出しを `func.call` 呼び出しに置き換えると、
入力がフリー関数でもオブジェクトメソッドでも正しく機能するようになる（コードを実行して実際に確認するといい）。

### Going multi-argument

先ほどのデコレーターをより一般化する。`func` の引数リストを任意にしたい。
これには、以前学んだ `arguments` と `...` を組み合わせるとしっくり来る。

```javascript
let result = func.call(this, ...arguments); 
```

キャッシュ処理には `Map` のキーを `func` の入力ではなく、入力全体のハッシュ値
`hash(arguments)` とすることで対応されている。これは主題ではないので、当分忘れてしまっていいだろう。

### func.apply

`call` とよく似た `apply` が存在する。

```javascript
func.call(context, ...args);
func.apply(context, args);
```

* これらの使い分けは、`args` が反復可能でしかないか、配列風でしかないかで決めるのか。
* 両方使える場合には `apply` のほうがおそらく高速だ。

### Borrowing a method

配列風オブジェクト `arguments` に対して `join` を適用したいが、本物の配列ではないのでそのメソッドはない。
そこで、次のように別の配列の `join` を間借りするために `call` を応用する：

```javascript
function hash() {
    return [].join.call(arguments);
}
```

### Decorators and function properties

デコレーターパターンで注意することは、新しい関数では元の関数のプロパティーが失われていることだ。

### Tasks

#### Spy decorator

関数 `func` へのすべての呼び出しを、その実引数のリストを覚えておくことで
`calls` プロパティーに保存する。

* プロパティー `func.calls` を勝手に定義する。初期値を例えば空の配列とする。
* ラッパーの処理は次の二つからなる：
  * `func.calls.push()` で、一度の呼び出しに対応するオリジナルの入力引数すべてを追加する。
  * `func` をオリジナル引数で呼び出し、戻り値をそのまま返す。
    呼び出しには `func.call()` か `func.apply()` を利用する。
    今回は特に制約がないので、高速なほうの `apply` にするのが自然だ。

#### Delaying decorator

ほとんど `setTimeout` と同じ関数を作れということか。
引数だけ変えて何度も呼び出すような状況では有用なのかもしれない。

#### Debounce decorator

まず `debounce` の仕様を理解する。短時間で連続するような呼び出しに対して、
前回の呼び出しから指定時間以上経過している呼び出しだけを採用するようなデコレーターだ。

急所は `setTimeout` を呼ぶ前に前回のタイマーを取り消すところだ。
タイマー ID をデコレーターのスコープで保存しておく。

#### Throttle decorator

上のと同じインターフェイスの関数 `throttle` は、仕様がかなり異なる。
`func` のラッパーが複数呼び出された場合、指定時間内に最大一回、`func` を呼び出す。

マウスイベントの追跡に応用する予定なので、できれば習得したいものだが、
このコードがたいへん覚えにくい。

* 関数 `throttle`
  * このスコープで保存しておく変数を宣言する。フラグと `this` と `arguments` の三点。
  * 関数 `wrapper` を定義し、それを出力とする。
* 関数 `wrapper`
  * フラグがオンのときに限り、呼び出すための引数を `throttle` のスコープに保存して終了。
  * フラグをオンにする。
  * オリジナル `func` を現在の実引数 `this` および `arguments` を入力として呼び出す。
  * タイマーを仕込む。
* 関数 `setTimeout` のコールバック
  * フラグをオフにする。
  * 呼び出すための引数がなぜか保存されていれば、それを `wrapper` に入力、呼び出す。
  * 呼び出すための引数をリセット。

オリジナルの `func` を呼び出す場合とラッパー版を呼び出す場合がある。
タイマーに仕込むのは局所関数 `wrapper` のほうだ。相当複雑だ。

## Function binding

<!-- https://javascript.info/bind -->

`this` が失われる現象を述べるのはこの章だった。

### Losing "this"

現象のおさらい。次のコードが `undefined` を出すとする：

```javascript
let user = {
    firstName: "John",
    sayHi(){
        lert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user.sayHi, 1000);
```

### Solution 1: a wrapper

関数ブロックで包む：

```javascript
setTimeout(function() {user.sayHi();}, 1000);

setTimeout(() => user.sayHi(), 1000);
```

### Solution 2: bind

上の単純な解法は実はわずかに脆弱なところがある。一秒経つ前に `user` が別のオブジェクトを指す可能性が否定できない。
このあとの `askPassword()` の演習問題は上の方法を使いたくなるが、`bind()` を採用する版に比べて品質が劣る。

```javascript
let sayHi = user.sayHi.bind(user);
// ...
setTimeout(sayHi, 1000);
```

`bind()` の意味は難しくない。指定されたものを `this` とする。
というか、もしかすると C++ のそれと同じことをやっているのかもしれない。

### Partial functions

`bind` できるのは `this` に限らない。

```javascript
let bound = func.bind(context, [arg1], [arg2], ...);
```

### Going partial without context

次のような呼び出しが有効である関数 `partial` を実装することができる：

```javascript
let user = {
    firstName: "John",
    say(time, phrase) {
        alert(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());
```

### Tasks

#### Bound function as a method

ブラウザーのコンソールで試すときには、"use strict" モードでの結果がこの解答に一致する。

#### Second bind

`bind` の戻り値をさらに `bind` するとどうなるかという問題。
こういうのを思いつくようにならないといけない。

#### Function property after bind

デコレーターパターンの法則のようなもので、オリジナルのプロパティーは失われる。

#### Fix a function that loses "this"

`bind` を使って `this` を固定する方法を確かに習得したかを問う。
`this` のためのオブジェクトを二回書く必要がある。

#### Partial application for login

さらに、引数を伴う `bind` の書き方を確認する問題。

### Comments

コメント欄に `bind` と前節の `call`/`apply` との違いを端的に述べている人がいて良い。

## Arrow functions revisited

<!-- https://javascript.info/arrow-functions -->

矢関数はコンテキスト不要な条件のときに採用するのがよい。

### Arrow functions have no "this"

矢関数には `this` がない。
それを矢関数の内側から参照しようとすると、外側にあるそれを参照しに行く。

矢関数を `new` を伴う形で呼び出すことはできない。
つまり constructor として利用することができない。

### Arrows have no "arguments"

矢関数には `arguments` がない。
それを矢関数の内側から参照しようとすると、外側にあるそれを参照しに行く。

この性質をデコレーターを書くときに利用することができる。

```javascript
function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms);
    };
}
```
