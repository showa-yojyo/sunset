---
title: Binary data, files
---

JavaScript でバイナリーデータやバイナリーファイルを扱う方法を学習する。

## ArrayBuffer, binary arrays

<https://javascript.info/arraybuffer-binary-arrays> の学習ノート。

Web 開発では、バイナリーデータに出会うのはファイル（作成、アップロード、ダウン
ロード）を扱う際がほとんどだ。画像処理もそうだ。これらはすべて JavaScript で可能
であり、バイナリー演算は高性能だ。そのためのクラスがたくさんある。いくつか挙げる
と：

* `ArrayBuffer`
* `Uint8Array`
* `DataView`
* `Blob`
* `File`

JavaScript のバイナリーデータは、他の言語の標準的な実装とは異なる。

基本的なバイナリーオブジェクトは `ArrayBuffer` で、固定長の連続したメモリー領域への参照だ。
次のコードで 16 バイトの連続したメモリー領域を確保し、ゼロで埋めておく：

```javascript
let buffer = new ArrayBuffer(16);
```

----

`ArrayBuffer` は何かの配列ではない。`ArrayBuffer` は `Array` と共通点がないのだ：

* 長さは固定で、増やしたり減らしたりしない。
* メモリーにちょうどの容量が必要だ。
* 個々のバイトにアクセスするには、`buffer[index]` のようにするのではなく、別にビューオブジェクトが必要だ。

----

ビューオブジェクトは、それ自体には何も保存しない。
`ArrayBuffer` に格納されたバイトに解釈を与えるのは、次のクラスだ：

* `Uint8Array`: `ArrayBuffer` の各バイトを個別の数値として扱い、0 から 255 までの値を指定できる。
  このような値を 8 ビット符号なし整数と呼ぶ。
* `Uint16Array`: 2 バイトごとに整数として扱い、0 から 65535 までの値をとれる。
  16 ビット符号なし整数。
* `Uint32Array`: 4 バイトごとに整数として扱い、0 から 4294967295 までの値をとれる。
  32 ビット符号なし整数。
* `Float64Array`: 8 バイトごとに、${5.0 \times 10^{-324} }$ から ${1.8 \times
  10^{308} }$ までの浮動小数点数として扱う。

したがって、16 バイトの `ArrayBuffer` バイナリーデータを、

* 16 個の「小さな数」、
* 8 個の大きな数（各 2 バイト）、
* 4 個のさらに大きな数（各 4 バイト）、
* 2 個の高精度浮動小数点値（各 8 バイト）

のいずれにも解釈することができる。

`ArrayBuffer` は中核となるオブジェクトであり、すべての根源であり、生のバイナリー
データだ。この中に書き込んだり、反復したり、基本的に操作のほとんどすべてを行う場
合は、ビューを用いる必要がある。

学習者ノート：このコード例からわかるように、上記のビュークラスを `ArrayBuffer`オ
ブジェクトから生成して、そのビューのメソッドを呼び出す形で元のバイナリーデータを
参照したり操作したりするのが基本だ。

### TypedArray

これらのビューの共通項は `TypedArray` だ。これらは同じメソッドとプロパティーの集合を共有する。

`TypedArray` と呼ばれるコンストラクターがあるわけではなく、`Int8Array` や
`Uint8Array` などの `ArrayBuffer` 上のビューを表す共通の呼び名のようなものだと捉
えられる。以下、例えば `new TypedArray` のようなコードは`new Int8Array` や
`new Uint8Array` などのいずれかを意味するものとする。

型付き配列は通常の配列のように振る舞う。インデックスを持ち、反復可能だ。
型付き配列のコンストラクターは引数の型によって異なる挙動を呈する。

本書ではオーバーロードのようなものが五つあると言っている：

```javascript
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

1. すでに見たように、`ArrayBuffer` オブジェクト `buffer` が与えられると、その上に
   ビューが生成される。オプションで、開始する `byteOffset` (既定値は 0) と `length`
   (既定値はバッファーの終端まで) を指定すると、ビューはバッファーの一部だけを被覆
   する。
2. `Array` あるいは配列風オブジェクト `object` が与えられると、それと同じ長さの
   型付き配列を生成し、オブジェクトの内容をそこへコピーする。
   これを利用して、最初からデータを入れておくことができる。
3. もし、別の `TypedArray` `typedArray` が与えられると、同じように、それと同じ長
   さの型付き配列を作成し、値をコピーする。必要に応じて、値は新しい型に変換される。
4. 数値引数 `length` から生成する場合、その要素数を含む型付き配列を生成する。
   そのバイト長は長さに要素一つあたりのバイト数 `TypedArray.BYTES_PER_ELEMENT` を乗じた値に等しい。
5. デフォルトコンストラクターは長さゼロの型付き配列を生成する。

`ArrayBuffer` に言及することなく、直接 `TypedArray` を生成しても、ビューは基礎となる
`ArrayBuffer` がないことには存在できないため、自動的に生成される。

基礎となる `ArrayBuffer` に参照するために、`TypedArray` には次のプロパティーがある：

* `buffer`: `ArrayBuffer` を参照する。
* `byteLength`: `ArrayBuffer` の長さ。

したがって、元のバッファーを共有させながら、一つのビューから別のビューに移動することができる。

```javascript
let arr8 = new Uint8Array([0, 1, 2, 3]);
// another view on the same data
let arr16 = new Uint16Array(arr8.buffer);
```

ビュー一覧割愛。

----

`Int8Array` のような名前のビューがあるにもかかわらず、JavaScript には int や int8 のような単一値型はない。
`Int8Array` とは、これらの個々の値の配列ではなく、`ArrayBuffer` のビューであるため、これは理にかなっている。

#### Out-of-bounds behavior

型付き配列に境界外の値を書き込もうとすると、エラーにはならないものの余分なビットが切り捨てられる。
例えば、`Uint8Array` に 256 を書き込もうとする。二進数では 256 は b100000000 だ。
`Uint8Array` は値一つにつき 8 ビットしか用意していないので、利用できる範囲は 0 から 255 までだ。

大きな数値の場合は、右端の（桁の小さい方の）8 ビットだけが格納され、残りは切り捨てられる。
すなわち、256 の場合には 0 になる。257 の場合には 1 になる。言い換えると、mod 256 で保存される。

`Uint8ClampedArray` はこの点で特殊で、この動作が異なる。255 より大きい数には 255 を、
負の数には 0 を保存する。画像処理に用いると便利だ。

### TypedArray methods

`TypedArray` は通常の `Array` のメソッドがあるが、特筆すべき例外がある。

反復処理、`map`, `slice`, `find`, `reduce` などはできる。しかし、できないこともある。

* メソッド `splice`: なぜなら、型付き配列はバッファー上のビューであり、バッ
  ファーとは固定かつ連続したメモリー領域だからだ。
* メソッド `concat`

追加的に、メソッドが二つある：

* `arr.set(fromArr, [offset])`: `fromArr` から `arr` にすべての要素をコピーし、
  位置は `offset` から始まる。
* `arr.subarray([begin, end])`: `begin` から `end` まで同じ型の新しいビューを生
  成する。これはメソッド `slice` に似ているが、何もコピーせず、ただ新しいビュー
  を生成して、与えられたデータ片を操作するだけだ。

これらのメソッドにより、型付き配列のコピーや混合、既存の配列からの新しい配列の生
成などができる。

### DataView

`DataView` は `ArrayBuffer` の上にある特殊で柔軟な「型なし」ビューだ。
これにより、任意のオフセットのデータに任意のフォーマットでアクセスできる。

* 型付き配列の場合、コンストラクターでフォーマットを指定する。
  配列全体は一様であるものとする。`arr[i]` で i 番目の数を表す。
* 一方、`DataView` では、`getUint8(i)` や `getUint16(i)` のようなメソッドでデータを参照する。
  フォーマットはコンストラクターの実行時ではなく、メソッド呼び出し時に選択する。

```javascript
new DataView(buffer, [byteOffset], [byteLength]);
```

* `buffer`: 基礎となる `ArrayBuffer` オブジェクト。型付き配列とは異なり、
  `DataView` は自分自身でバッファーを生成しない。利用者が用意する必要がある。
* `byteOffset`: ビューの開始バイト位置。
* `byteLength`: ビューのバイト長。

`DataView` は、さまざまな形式のデータを同じバッファーに格納する場合に便利だ。
例えば、16 ビット整数と 32 ビット浮動小数点数のペアの連なりを格納する場合、
`DataView` を使えばアクセスが容易だ。

### Tasks

#### Concatenate typed arrays

`Uint8Array` オブジェクトからなる配列が与えられたとき、それらを一つの配列に連結して返す関数
`concat(arrays)` を書け。

学習者ノート：テストコードを見れば題意は理解できる。
まずは適切な長さの `Uint8Array` オブジェクトを生成して、元の要素をコピーしていけば動く関数はできる。
実行時効率を考えて、適切なメソッドを採用するのに神経を使え。

`TypedArray` を使う問題では、言われていなくても実行時効率を要求されていると想定するのが普通だ。
そうでなければ、こんな型は使わないのだから。

## TextDecoder and TextEncoder

<https://javascript.info/text-decoder> の学習ノート。

バイナリーデータが実際には文字列である場合はどうだろう。例えば、テキストデータを
含むファイルを受け取った。組み込み `TextDecoder` オブジェクトを使えば、与えられ
たバッファーと符号方式に対して、その値を実際の JavaScript 文字列に読み込むことが
できる。

その処理をするために、次のオブジェクトをまず生成する：

```javascript
let decoder = new TextDecoder([label], [options]);
```

* `label`: 既定値は `utf-8` だが、`big5`, `windows-1251`, その他多くの符号方式が対応済みだ。
* `options`
  * `fatal: true/false`: もし `true` ならば、復号できない文字の場合に例外を発生させる。
    そうでなければ文字 `\uFFFD` に置換する。
  * `ignoreBOM: true/false`: BOM を無視するかどうか。ほとんど必要ない。

それからメソッドを呼び出すことで文字列を得る：

```javascript
let str = decoder.decode([input], [options]);
```

* `input`: 復号するべき `BufferSource` オブジェクト。
* `options`
  * `stream: true/false`: ストリームを復号するときに、デコーダーが繰り返し呼び出
    され、データの塊を受信するときに `true` とする。この場合、マルチバイト文字が
    塊の間で分割されることがある。このオプションは `TextDecoder` に「未完成の」
    文字を記憶させ、次の塊が来たときに復号するように指示する。

例を見ると、`input` には `TypedArray` オブジェクトを渡している。

### TextEncoder

`TextEncoder` はその逆で、文字列をバイト列に変換する。

```javascript
let encoder = new TextEncoder();
```

符号化形式は UTF-8 しか対応しない。

メソッドは二つある：

* `encode(str)`: 文字列 `str` から変換されて得られる `Uint8Array` を返す。
* `encodeInto(str, destination)`: 文字列 `str` を `Uint8Array` であるべき
  `destination` に符号化する。

ノート：UTF-8 しか対応していないので、`Uint8Array` でアクセスするべきバイト列が生じる。

## Blob

<https://javascript.info/blob> の学習ノート。

`ArrayBuffer` と `TypedArray` 各種は ECMA 標準規格の一部であり、同時に JavaScript の一部でもある。
ブラウザーには高水準のオブジェクトがさらにあり、とりわけ `Blob` がある。

`Blob` はオプションの文字列 `type`（通常は MIME-type）と `blobParts`（他の `Blob` オブジェクト、文字列、
`BufferSource` の連なり）で構成されている。

ノート：本書の模式図を頭に叩き込んでおくといい。

```javascript
new Blob(blobParts, options);
```

* `blobParts`: `Blob`/`BufferSource`/`String` の配列。
* `options`
  * `type`: Blob の種類を表す文字列値。例えば "image/png" のような MIME-type であることが普通だ。
  * `endings`: `Blob` を現在の OS の EOL に対応させるために、行末を変換するかどうか。
    既定値は "transparent" だが、"native" にすることもできる。前者は何もせず、後者は OS 固有の EOL に変換する。

`Blob` オブジェクトから部分を取り出すにはメソッド `slice()` を用いる。
引数は `array.slice()` と同様で、負の数も許される。

```javascript
blob.slice([byteStart], [byteEnd], [contentType]);
```

* `byteStart`: 開始バイト位置
* `byteEnd`: 終了バイト位置（の一つ次）
* `contentType`: 得られる部分の型。既定値は `blob` と同じ。

----

`Blob` 内のデータを直接変更することはできない。
しかし、`Blob` の一部を slice し、そこから新しい `Blob` オブジェクトを生成し、
それらを新しい `Blob` に混ぜるなどすることは可能だ。

この動作は JavaScript の文字列に似ている。文字列の中の文字を変更することはできないが、
新たに修正した文字列を作ることはできる。

JavaScript では、こういうオブジェクトの性質を「オブジェクトが immutable である」という。

### Blob as URL

`Blob` は、`<a>`, `<img>` などのタグの URL として簡単に使用でき、その中身を表示することができる。

プロパティー `type` のおかげで、`Blob` オブジェクトをダウンロード・アップロードすることもでき、
その値はネットワーク要求で Content-Type に自然になる。

リンクをクリックすると、hello world の中身を含む動的に生成された `Blob` がファイルとしてダウンロードされる例：

```html
<!-- download attribute forces the browser to download instead of navigating -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

また、JavaScript でリンクを動的に作成し、`link.click()` でクリックを模倣すると、ダウンロードが自動的に開始する。
HTML を一切使用せずに、動的に生成された `Blob` をダウンロードさせる類似のコード：

```javascript
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL()` は `Blob` を受け取り、`blob:<origin>/<uuid>` という形式から
`Blob` に対応する一意の URL を生成する。

`link.href` の値はこのようなものだ：

```text
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

`URL.createObjectURL()` が生成した URL それぞれに対して、ブラウザーは
URL から `Blob` への写像を内部に保存する。そのため、そのような URL は短いが、
`Blob` にアクセスできます。

生成された URL（およびそれを含むリンク）は、現在のドキュメントが開いている間のみ
有効だ。また、`<img>`, `<a>` など、URL を基本的には必要とするあらゆるオブジェクトで
`Blob` を参照できる。

しかし、副作用がある。`Blob` の写像がある一方で、`Blob` 自体はメモリーに常駐する。
ブラウザーはこれを解放できない。

写像はドキュメントのアンロード時に自動的に消去されるため、`Blob` オブジェクトは
そのときに解放される。しかし、ページの寿命が長い場合、解法はすぐには起こらない。

そのため、URL を作成すると、その `Blob` は不要になったとしても、メモリーに格納され続ける。

`URL.revokeObjectURL(url)` は内部写像から参照を削除し、`Blob` を削除して（他に
参照がない場合）、メモリーを解放することができる。

最後の例では、`Blob` を一度だけ使用してすぐにダウンロードすることを意図しているた
め、`URL.revokeObjectURL(link.href)` をすぐに呼び出している。

クリック可能な HTML リンクを使用する前の例では、
`URL.revokeObjectURL(link.href)` を呼び出すことはしないが、これは `Blob` の URL が無効になるからだ。
失効後、写像が削除されると、URL は機能しなくなる。

### Blob to base64

### Image to blob

### From Blob to ArrayBuffer

### From Blob to stream

### Summary

### Comments

## File and FileReader

<https://javascript.info/file> の学習ノート。

### FileReader

### Summary

### Comments
