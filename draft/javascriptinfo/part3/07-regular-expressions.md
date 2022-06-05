---
title: Regular expressions
---

## Patterns and flags

<https://javascript.info/regexp-introduction>

JavaScript では正規表現を `RegExp` オブジェクトを介して利用できるし、文字列のメソッドに統合されてもいる。

### Regular Expressions

コンストラクターから正規表現オブジェクトを定義する方法：

```javascript
let regexp = new RegExp("pattern", "flags");
```

Perl のようなリテラル正規表現による定義方法もある：

```javascript
let regexp = /pattern/gmi;
```

どちらの場合も `RegExp` オブジェクトが生成する。

### Flags

JavaScript の正規表現フラグは次の六種だ：

| Flag | Specification |
|------|---------------|
| `i` | 大文字小文字を区別しない |
| `g` | マッチすべてを対応する |
| `m` | 複数行モード |
| `s` | `.` を改行文字にもマッチさせる |
| `u` | Unicode 完全サポート |
| `y` | 厳密な位置での検索 |

### Searching: str.match

呼び出し `str.match(regexp)` は、文字列 `str` の中で `regexp` にマッチするを返す。

フラグ `g` を指定すると、戻り値はマッチ文字列からなる配列だ。

フラグ `g` が指定されていない場合、戻り値は長さゼロの配列であり、さらに配列は次のプロパティーを含む。

* `groups`: おそらく括弧によるキャプチャー情報
* `index`: `str` のどの位置からマッチしているか
* `input`: `str` に等しい文字列

マッチするものがない場合、この呼び出しの結果は `null` となる。
スクリプトは、配列が返る場合と `null` が返る場合のどちらにも対応する必要がある。

### Replacing: str.replace

呼び出し `str.replace(regexp, replacement)` は、文字列 `str` の中で
`regexp` にマッチするものを `replacement` で置換する。

フラグ `g` を指定すると、マッチ部分すべてを置換する一方で、
指定しないと、せいぜい最初のマッチしか置換しない。

文字列 `replacement` には特別な意味を持つ文字列を含めることもある：

| Pattern | Specification |
|---------|---------------|
| `$&` | マッチ全体に等しい文字列 |
| `$` | マッチ以前に等しい文字列 |
| `$'` | マッチ以後に等しい文字列 |
| `$n` | キャプチャー参照 |
| `$<name>` | キャプチャー参照 |
| `$$` | 文字 `$` |

### Testing: regexp.test

呼び出し `regexp.test(str)` は、マッチがあるかどうかを `Boolean` 値で返す。

```javascript
/LOVE/i.test("I love JavaScript"); // true
```

## Character classes

<https://javascript.info/regexp-character-classes>

文字クラスとは、特殊な表記法であって、特定の集合から任意の記号にマッチするものだ。

よく使われる三種をまず紹介している：

| Class | Specification |
|-------|---------------|
| `\d` | 文字 0, 1, ..., 9 |
| `\s` | ソフトスペース、タブ、改良文字等の空白文字各種 |
| `\w` | ラテンアルファベットおよび `\d` およびアンダーバー |

正規表現には、普通の文字と文字クラスの両方が含まれることがある。

```javascript
"Is there CSS4?".match(/CSS\d/); // 'CSS4'
"I love HTML5!".match(/\s\w\w\w\w\d/); // ' HTML5'
```

### Inverse classes

各文字クラスには、同じ文字で大文字に表記される「裏クラス」が存在する。
裏クラスは、対応する表クラスの補集合だと考えられる。

```javascript
const str = "+7(903)-123-45-67";
str.match(/\d/g).join(''); // 79031234567
str.replace(/\D/g, "");
```

### A dot is "any character"

ドット `.` は、「改行以外の任意の文字」にマッチする特殊な文字クラスだ。

#### Dot as literally any character with "s" flag

ドット `.` が、改行も含めて文字通り「あらゆる文字」を意味するようにしたい場面はたくさんある。
これはフラグ `s` が行う。正規表現がこのフラグを持っている場合、
ドット `.` は文字通り任意の文字にマッチする。

```javascript
"A\nB".match(/A.B/s); // A\nB
```

囲み記事が面白い。フラグ `s` が対応されていない JavaScript エンジン環境では
`[\s\S]` や `[^]` でしのげとある。

## Unicode: flag "u" and class \p{...}

<https://javascript.info/regexp-unicode>

これは見慣れないトピックなのでしっかりチェックする。

昔の名残で、`String.length` など、4 バイト文字を正しく扱えない機能がいまだにある。

デフォルトでは、正規表現は 4 バイトの「長い文字」を 2 バイトの文字の対として扱う。
そして、それは文字列で起こるような奇妙な結果につながるかもしれない。
文字列とは異なり、正規表現にはこのような問題を解決するフラグ `u` がある。
さらに、Unicode プロパティー検索も利用できるようになる。

### Unicode properties \p{...}

Unicode の各文字には多くのプロパティーがある。
その文字がどのような「カテゴリー」に属しているかを述べ、その文字に関する雑多な情報を含む。

例えば、文字に Letter プロパティーがあれば、その文字は（何か言語の文字という意味で）
アルファベットに属していることを意味する。
Number プロパティーは、その文字が数字であることを意味する。

あるプロパティーを持つ文字を正規表現 `\p{...}` で検索することができる。
これにもフラグ `u` が必要だ。

例えば、`\p{Letter}` は任意の言語の文字を表す。略記 `\p{L}` も通じる。
次の検索は「何でもいいから言語の文字を全て探す」であり、三文字それぞれがマッチする。

```javascript
"Aბㄱ".match(/\p{L}/gu); // A,ბ,ㄱ
```

本文でメインカテゴリーとサブカテゴリーが長い一覧を形成している。
それでもまだ全てではなく、参考文献が列挙されている。

例えば <https://unicode.org/cldr/utility/character.jsp> のページを操作すると、
入力した一文字のプロパティーをすべて確認できる。

#### Example: hexadecimal numbers

```javascript
/x\p{Hex_Digit}\p{Hex_Digit}/u
```

#### Example: Chinese hieroglyphs

Unicode のプロパティーに Script がある。これは値を取ることができる。
キリル文字、ギリシャ文字、アラビア文字、漢字など、さまざまな文字がある。
例えば、キリル文字には `\p{sc=Cyrillic}`, 漢字には `\p{sc=Han}`, など。

```javascript
`Hello Привет 你好 123_456`.match(/\p{sc=Han}/gu); // 你,好
```

#### Example: currency

通貨記号であることを示す Unicode プロパティーは `\p{Currency_Symbol}`, `\p{Sc}`
が対応する。

```javascript
/\p{Sc}\d/gu
```

## Anchors: string start ^ and end $

メタキャラクター `^` と `$` はアンカーの一種だ。それぞれ文字ではなく、
テキストの先頭位置とテキストの末尾位置にそれぞれマッチする。

```javascript
/^Mary/.test("Mary had a little lamb"); // true
/snow$/.test("its fleece was white as snow"); // true
```

### Testing for a full match

両方を合わせた `^...$` は、文字列がパターンに完全にマッチするかどうかを調べるのによく使われる。
ユーザー入力を検証する場合などに有用だ。

フラグ `m` がある場合、アンカーは異なる動作をする。

### Tasks

#### Regexp ^$

正規表現 `/^$/` は空文字列にしかマッチしない。

## Multiline mode of anchors ^ $, flag "m"

<https://javascript.info/regexp-multiline-mode>

フラグ `m` で有効になる複数行モードだが、これは `^` と`$` の動作にしか影響しない。
複数行モードでは文字列の先頭と末尾だけでなく、行頭と行末でもマッチする。

### Searching at line start ^

次の文字列に対する `match(/^\d/gm)` と `match(/^\d/g)` の結果は異なる。
前者は長さ 3 の配列を返すが、後者は長さ 1 の配列を返す。

```text
1st place: Winnie
2nd place: Piglet
3rd place: Eeyore
```

### Searching at line end $

次の文字列に対する `match(/\d$/gm)` と `match(/\d$/g)` の結果は前項と同様の違いがある。

```text
Winnie: 1
Piglet: 2
Eeyore: 3
```

### Searching for \n instead of ^ $

フラグ `m` なしで、改行文字 "\n" を直接指定してマッチさせようとするのとどう違うのかを見る。
例えば前項のテキストに対して `match(/\d\n/g)` を考える。

1. テキストの最後が改行文字で終わっていない場合、テキスト末端近傍のマッチが異なる。
2. マッチ結果に改行文字が含まれるようになる。

## Word boundary: \b

<https://javascript.info/regexp-boundary>

単語境界位置にマッチする `\b` を学ぶ。単語境界位置は次の三種類だ：

1. 文字列の先頭の文字が `\w` にマッチする場合、その先頭。
2. 文字列内の二文字の間で、一方が `\w` にマッチし、もう一方が `\W` にマッチする場合。
3. 文字列の末尾の文字が `\w` にマッチする場合、その末尾。

```javascript
"Hello, Java!".match(/\bJava\b/); // "Java"
"Hello, JavaScript!".match(/\bJava\b/); // null
"Hello, Java!".match(/\bHello\b/); // "Hello"
"Hello, Java!".match(/\bJava\b/);  // "Java"
"Hello, Java!".match(/\bHell\b/);  // null
"Hello, Java!".match(/\bJava!\b/); // null
```

`\d` は `\w` 部分であるので、次もマッチする：

```javascript
"1 23 456 78".match(/\b\d\d\b/g); // ["23", "78"]
"12,34,56".match(/\b\d\d\b/g); // ["12", "34", "56"]
```

`\b` の急所は `\w` と深い関係があるということだろう。

### Tasks

#### Find the time

そうか。この問題には `\b` の指定が必要なのだ。

## Escaping, special characters

<!-- https://javascript.info/regexp-escaping -->

バックスラッシュ `\` は、例えば `\d` のように、文字クラスを表すのに使われることを見てきた。
つまり、これは正規表現における特殊文字だと言える。

他にも `[ ] { } ( ) \ ^ $ . | ? * +` のように、正規表現で特別な意味を持つ文字がある。
これらは、より強力な検索を行うために用いられる。

### Escaping

特別な意味を持つ文字を、見てくれどおりの文字そのものをマッチさせたいとする。
特殊文字を通常の文字として表現するには、その文字の直前にバックスラッシュ `\` を付ける。
このような行為を「文字をエスケープする」と言う。

```javascript
"Chapter 5.1".match(/\d\.\d/); // "5.1"
"Chapter 511".match(/\d\.\d/); // null

"function g()".match(/g\(\)/); // "g()"

"1\\2".match(/\\/); // '\'
```

最後の例で、文字列のバックスラッシュも正規表現のバックスラッシュもどちらもエス
ケープが必要であることに注意。

### A slash

スラッシュ `/` は特別な意味のある文字ではないが、リテラル正規表現を書くときには
エスケープが必要となる。`RegExp` コンストラクターで文字列から正規表現を生成する
ときにはこの限りでない。

### new RegExp

`RegExp` コンストラクターで文字列から正規表現を生成する場合には別の注意を要する。
リテラル文字列ではバックスラッシュが「食われる」ので、これをエスケープせねばならない。

```javascript
let regexp = new RegExp("\\d\\.\\d");

"Chapter 5.1".match(regexp); // "5.1"
```

## Sets and ranges [...]

<https://javascript.info/regexp-character-sets-and-ranges>

複数の文字または文字クラスを含む角括弧 `[ ]` 全体からなるパターンは、
この中にあるどれかの一文字にマッチする文字にマッチする。

### Sets

このようなパターンを集合と言う。通常の文字と混在して正規表現を形成することができる。

```javascript
// find [t or m], and then "op"
"Mop top".match(/[tm]op/gi); // ["Mop", "top"]

// find "V", then [o or i], then "la"
"Voila".match(/V[oi]la/); // null
```

### Ranges

角括弧は、文字範囲を含むこともできる。
例えば `[a-z]` は a から z までの範囲にある文字一文字に、
`[0-5]` は 0 から 5 までの数字一文字にそれぞれマッチする。

```javascript
"Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g); // "xAF"
```

* 小文字も探したい場合は、角括弧内に範囲 `a-f` を追加するか、正規表現にフラグ `i` を追加する。
* `[ ]` の中に文字クラスを使用することもできる。
* 複数のクラスを組み合わせることも可能だ。

文字クラスは文字範囲の略記法だと考えられる：

| Class | Character Set |
|-------|---------------|
| `\d` | `[0-9]` |
| `\w` | `[a-zA-Z0-9_]` |
| `\s` | `[\t\n\v\f\r ]` に Unicode の珍しい空白文字を加えたもの |

#### Example: multi-language \w

文字クラス `\w` だと漢字、キリル文字その他にマッチしない。マッチするようなものを自作する。
以前やった Unicode プロパティーを角括弧内に列挙することで、それを達成する。

```javascript
/[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;
```

文字範囲がわかっていれば、始点文字と終点文字とをマイナス文字で連結した集合で指定してもよい。

### Excluding ranges

補集合を指定するには、同じ要素列を `[^ ]` で囲む。

```javascript
/[^ ]/;
```

### Escaping in [...]

角括弧内ではほとんどの文字をエスケープせずに置くことができる。

* 文字 `. + ( )` はエスケープを要しない。
* マイナス文字 `-` は、角括弧の最初の要素でも最後の要素でもない限りはエスケープされない。
* キャレット文字 `^` は、角括弧の最初に書きたい場合にしかエスケープされない。
* 文字としての角括弧 `]` はいつでもエスケープされる。

角括弧の中のドット `.` は、文字としてのドットを意味する。

エスケープを要しない、されない、というのは、してもしなくても動くということだ：

```javascript
"1 + 2 - 3".match(/[-().^+]/g) // ["+", "-"]
"1 + 2 - 3".match(/[\-\(\)\.\^\+]/g); // ["+", "-"]
```

### Ranges and flag "u"

角括弧内に surrogate pairs がある場合には、正規表現にフラグ `u` を指定すること。
まともな文字が出力されなかったり、悪い場合にはエラーが生じる。

フラグ `u` を与えないと、角括弧内の surrogate pair それぞれは正規表現エンジンに
二文字として認識される。コードポイント値二つに分割されるということだろう。
その結果、surrogate pair で構成される文字二つで文字範囲を指定しようとすると、
意図に反した不正な範囲を形成してしまう可能性がある。

### Tasks

#### Java[^script]

もちろんフラグなしで考える。"Java" にはマッチしない。"JavaScript" にはマッチする。

#### Find the time as hh:mm or hh-mm

角括弧内にコロンとマイナスを置く方法が問われている。

## Quantifiers +, *, ? and {n}

<!-- https://javascript.info/regexp-quantifiers -->

例えば、+7(903)-123-45-67 のような文字列があり、その中のすべての数字を探したい。
今回は一桁の数字ではなく、完全な数字に興味がある。7, 903, 123, 45, 67 だ。
数は一桁以上の数字が並んだものだ。何個必要かを示すには量指定子をつける。

### Quantity {n}

量指定子は文字、文字クラス、`[ ]` 集合などに付加し、それがいくつ必要かを指定する。

最も単純な量指定子は中括弧で囲まれた数字 `{n}` だ。

* `\d{5}` は厳密に五桁の数字を表す。`\d\d\d\d\d` と等しい。
* `\d{3,5}` は三桁から五桁までの数を表す。
* `\d{3,}` は三桁以上の数を表す。

冒頭の問題に戻ると、求める正規表現は `\d{1,}` であることがわかる。

### Shorthands

頻繁に使われる量指定子には速記形が用意されている。

| Symbol | Description | Example |
|--------|-------------|---------|
| `+` | `{1,}` と等しい | `\d+` |
| `?` | `{0,1}` と等しい | `https?` |
| `*` | `{0,}` と等しい | `\d0*` |

### More examples

* 小数 `\d+\.\d+`
* 属性なしの開始 HTML タグ
  * `/<[a-z]+>/i`: 簡易版。
  * `/<[a-z][a-z0-9]*>/i`: h1 などが欲しいときはきっちりと書く。
* 属性なしの開始 HTML タグまたは終了タグ `/<\/?[a-z][a-z0-9]*>/i`

### Tasks

#### How to find an ellipsis "..." ?

ドットはメタキャラクターなので、リテラル正規表現で指定する場合にはエスケープする。

#### Regexp for HTML colors

`#ABCDEF` のように書かれた HTML 色を検索する正規表現。
ここでは最初に文字 `#` が来て、次に十六進数がちょうど六文字くるものだけを扱えばいい。

「ちょうど何文字」というのを表現するのに、単語境界指定などが要求される。
この小問は教育効果が意外に高い？

## Greedy and lazy quantifiers

<!-- https://javascript.info/regexp-greedy-and-lazy -->

次の例を考える。このテキストから二重引用符で囲まれている部分文字列をすべて得たい：

```text
a "witch" and her "broom" is one
```

単純に `/".+"/g` とすると、狙い通りにマッチしない。

```javascript
'a "witch" and her "broom" is one'.match(/".+"/g); // "witch" and her "broom"
```

### Greedy search

正規表現エンジンが正規表現 `".+"` をどのように照合するのかを段階的に述べている。

1. 正規表現一番目の位置である文字 `"` を、対象テキストの先頭から検索する。
   この場合には index 2 でマッチする。
2. 正規表現の次の文字 `.` を index 2 以降から検索する。すぐ次の文字 `w` にマッチする。
3. 正規表現の次の文字は `+` だ。最後の文字 `e` まで反復的にマッチする。
4. 正規表現の次の文字 `"` を検索したいが、すでに対象テキストを取り尽くしている。
   正規表現エンジンは `+` が多過ぎたと判断し、量指定子のマッチを一文字ぶん短くする。
   これをバックトラックという。
5. 文字 `"` が現れるまで `e`, `n`, `o`, ... とテストしていく。
6. すると、テキストのいちばん後ろにある `"` がマッチする。
7. これで照合処理が完了する。
8. 最初のマッチは `"witch" and her "broom"` で確定した。フラグ `g` があるので、
   エンジンは次の照合処理を開始する（今回はもうマッチがない）。

貪欲モードでは、量指定子で修飾された文字が可能な限り何度も反復される：
正規表現エンジンは `.+` に対して可能な限り多くの文字をマッチに追加し、
パターンの残りの部分がマッチしない場合はそれを一つずつ短縮していく。

貪欲モードが正規表現エンジンの既定挙動だ。

### Lazy mode

量指定子の不精モードは、貪欲モードの反対に「最小限の回数を繰り返す」というモードだ。
このモードを有効にするには、元となる量指定子に `?` を付ける（単独の `?` とは異なる意味であることに注意）。

```javascript
'a "witch" and her "broom" is one'.match(/".+?"/g); // ["witch", "broom"]
```

正規表現 `".+?"` はどのように照合されるのか：

1. 最初の文字 `"` についてはさっきと同じ処理となる。
2. 次の文字 `.` についてもさっきと同じだ。
3. 正規表現エンジンは次にある `+?` を見て、ドットの照合を一つきりで打ち切る。
   代わりに、残りパターンである `"` の照合処理をそこから開始する。
   `"` が見つかればそこで終了となるが、今回はそうではないので続行する。
4. それから、正規表現エンジンはドットの繰り返し回数を増やし、もう一回テストする。
   文字 `i`, `t`, `c`, ... と続ける。
5. そうこうしていると `"witch"` が得られる。
6. 次の検索は現在のマッチの終わりから始まり、さらに `"broom"` を得る。

不精モードは `+?` の他に `*?`, `??` も有効だ。上のアルゴリズムに準じる。

不精モードは必要のないことを繰り返さない。

現代的な正規表現エンジンは最適化がよく働くので、上記のアルゴリズムよりも効率良い処理をする可能性がある。

### Alternative approach

同じことをする正規表現が複数あることはよくある。

```javascript
'a "witch" and her "broom" is one'.match(/"[^"]+"/g); // ["witch", "broom"]
```

不精モードではダメで、この集合版が必要な場合もある。
例えば、`<a href="..." class="doc">` の形式で、何でもいいから `href` を持つリンクを見つけたいとする。
まず最初に思いつく正規表現は `/<a href=".*" class="doc">/g` だ（貪欲モードが先に思いつく）。

しかし、この正規表現では同一行にこのような A タグが複数ある場合には狙いどおりにマッチしない。
さっきの魔女のほうきと同じことが起こる。

そこで正規表現を不精にする： `/<a href=".*?" class="doc">/g`

しかし、次のようなテキストに対してはまた狙いを外れる：

```html
...<a href="link1" class="wrong">... <p style="" class="doc">...
```

今回は `/<a href="[^"]*" class="doc">/g` とするのが妥当だ。

### Tasks

#### A match for /d+? d+?/

せっかくだから `/\d+ \d+?/g`, etc. なども試すといい。

#### Find HTML comments

他の言語のコメントにも応用できる、つぶしの効く正規表現を習得できる。

* 複数行にまたがることが考えられる場合には正規表現フラグ `s` を指定する。
* 用いる不精モードはここでは `*?` だ。

#### Find HTML tags

キャレットあり集合を使うパターンと不精モードは、正規表現一つの中では本質的には共存しない気がする。

## Capturing groups

正規表現の意味を変えずに、パターンの一部を丸括弧で囲むことができる。これを捕捉グループと呼ぶ。
これには効果が二つある：

1. マッチした部分を別の項目として結果配列に取り込むことができる。
2. `( )` の後に量指定子を置くと、それは括弧全体に適用される。

### Examples

#### Example: gogogo

```javascript
'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

#### Example: domain

```javascript
"site.com my.site.com".match(/(\w+\.)+\w+/g); // ["site.com", "my.site.com"]
```

#### Example: email

ドメインのパターンが構築できたので、メールアドレスのパターンも行ける。
名前部分は `-` や `.` も使用可能であるから、正規表現では `[-.\w]+` あたりになる。
ドメインも若干手直しする。

```javascript
"my@mail.com @ his@site.com.uk".match(/[-.\w]+@([\w-]+\.)+[\w-]+/g); // ["my@mail.com", "his@site.com.uk"]
```

### Parentheses contents in the match

パターン内の丸括弧は左から右へ番号が割り当てられている。正規表現エンジンは
それぞれにマッチした内容を記憶し、結果に示すことができる。

メソッド `str.match(regexp)` は `regexp` にフラグ `g` がない場合、最初のマッチを探し、
配列として返す。中身は次のような具合だ：

* `result[0]`: 完全マッチ
* `result[1]`: 最初の丸括弧の中身
* `result[2]`: 二番目の丸括弧の中身

例えば、HTML タグ `<.*?>` を見つけて処理したい。タグの内容を別の変数に格納する。

```javascript
let str = '<h1>Hello, world!</h1>';
let tag = str.match(/<(.*?)>/);

tag[0]; // "<h1>"
tag[1]; // "h1"
```

#### Nested groups

捕捉グループを入れ子にすることもできる。番号はやはり左から右へと割り当てられる。

```javascript
let result = '<span class="my">'.match(/<(([a-z]+)\s*([^>]*))>/);
result[0]; // '<span class="my">'
result[1]; // 'span class="my"'
result[2]; // 'span'
result[3]; // 'class="my"'
```

#### Optional groups

グループがオプショナルであって、マッチに存在しない場合がある。
`( )?` とか `( )*` のようなものがある場合だ。
それでも、対応する結果配列の項目は存在し、値は `undefined` に等しい。

```javascript
let match = 'a'.match(/a(z)?(c)?/);

match.length; // 3
match[0]; // "a"
match[1]; // undefined
match[2]; // undefined
```

マッチするグループとしないグループがある例：

```javascript
let match = 'ac'.match(/a(z)?(c)?/)

match.length; // 3
match[0]; // "ac"
match[1]; // undefined
match[2]; // "c"
```

### Searching for all matches with groups: matchAll

フラグ `g` でマッチ全てを検索する場合、メソッド `match` はグループに対する内容を返さない。
捕捉グループが無視されて、たんにマッチを全て含む配列が返る。

メソッド `matchAll` は捕捉グループに対応した全検索機能だ。

1. 配列ではなく、反復可能なオブジェクトを返す。
2. フラグ `g` がある場合、すべてのマッチをグループを含む配列として返す。
3. マッチがない場合、空の反復可能なオブジェクトを返す。

マッチを `for...of` ループで得たり、次のように変数に代入したりする。

```javascript
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

tag1[0]; // "<h1>"
tag1[1]; // "h1"
tag1.index; // 0
tag1.input; // "<h1> <h2>"
```

### Named groups

Python のように、捕捉グループに名前を付けることもできる。`(?<name> )` の形式も同じだ。
メソッド `match` の戻り値のプロパティー `groups` から、指定した `name` でマッチそれぞれを参照する。

```javascript
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

let groups = "2019-04-30".match(dateRegexp).groups;
groups.year; // "2019"
groups.month; // "04"
groups.day; // "30"
```

メソッド `matchAll` の場合には、個々のマッチにプロパティー `groups` がある。

```javascript
let results = "2019-10-30 2020-01-01".matchAll(dateRegexp);
for(let result of results) {
    let {year, month, day} = result.groups;
    // ...
}
```

### Capturing groups in replacement

置換メソッド `str.replace(regexp, replacement)` では、置換文字列に捕捉グループの内容を
使用することができる。

その参照には、ドルマークと番号を組み合わせて指定する。

```javascript
"John Bull".replace(/(\w+) (\w+)/, '$2, $1'); // "Bull, John"
```

名前付きグループを使った場合には、ドルマークと名前を組み合わせて指定する。

```javascript
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;
let str = "2019-10-30, 2020-01-01";
str.replace(regexp, '$<day>.$<month>.$<year>'); // ["30.10.2019", "01.01.2020"]
```

### Non-capturing groups with ?:

量指定子は使いたいが、照合結果としては要しないこともある。
そういう場合には `(?: )` を指定することで捕捉グループを除外する。

### Tasks

#### Check MAC-address

量指定子を含むグループに対して量指定子を付けることができることに注意。

「文字列が～にマッチするか」という問いに対しては `^ $` でメインの正規表現を挟むこと。

#### Find color in the format #abc or #abcdef

この解答例だと RGB 成分が個別に取れない。

最後に `\b` を付けるのを忘れないようにする。そうしないと 4 桁にも 5 桁にもマッチする。

#### Find all numbers

整数、浮動小数点、負の数を含む、すべての十進数を検索する正規表現。
すべて 0 の場合にはその部分を省略しても許されるバージョンも考えられる。

#### Parse an expression

算術二項演算を表す文字列 `expr` を入力とし、第一オペランド、第二オペランド、演算子から
なる配列を出力とする関数 `parse(expr)` を実装する。

* オペランドに対する正規表現は直前の問いの結果を利用する。
* 演算子の集合は `[-+*/]` のように、マイナスを先頭に持ってくるのがコツとなる。
* 演算子の前後には空白文字がいくつあってもよいから `\s*` を入れる。

メソッド `match` の結果をそのまま返すことはたぶんできない。マッチを選り抜いて
新しく配列を作って返す。

## Backreferences in pattern: \N and \k&lt;name&gt;

<https://javascript.info/regexp-backreferences>

捕捉グループ `( )` の内容は、結果や置換文字列だけでなく、パターン自体にも利用することができる。

### Backreference by number: \N

番号 1, 2, 3, ... の捕捉グループの内容を `\1`, `\2`, `\3`, ... で参照できる。

番号が振られていない `(?: )` は参照されない。

```javascript
`He said: "She's the one!".`.match(/(['"])(.*?)\1/g); // "She's the one!"
```

### Backreference by name: \k&lt;name&gt;

名前付きグループ `(?<name> )` を使った場合には `\k<name>` で参照できる。

```javascript
`He said: "She's the one!".`.match(/(?<quote>['"])(.*?)\k<quote>/g); // "She's the one!"
```
