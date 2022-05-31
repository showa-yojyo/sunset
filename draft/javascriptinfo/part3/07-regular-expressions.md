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
