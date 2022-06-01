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
