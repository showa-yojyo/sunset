---
title: Storing data in the browser
---

## Cookies, document.cookie

<https://javascript.info/cookie> ノート。

Cookie とは小さな文字列であって、ブラウザーに直接保存されるデータだ。 Cookie は
HTTP の一部であり、RFC 6265 で定義されている。 Cookie は通常、HTTP-header 応答
`Set-Cookie` を使用してウェブサーバーが設定する。その後、ブラウザーは `Cookie`
HTTP-header を使用して、同じドメインへのほとんどすべての要求に cookie を自動的に
追加する。

最も広く使われている事例のひとつが認証だ。

1. サインインすると、サーバーは応答 `Set-Cookie` HTTP-header を使って、固有の
   セッション識別子を持つ cookie を設定する。
2. 次回、同じドメインに要求が送られると、ブラウザーは `Cookie` HTTP-header を
   使ってネット上で cookie を送信する。
3. したがって、サーバーは誰が要求を行ったかを知っている。

ブラウザーから cookie にアクセスすることもできる。プロパティー `document.cookie`
を用いる。

### Reading from document.cookie

値 `document.cookie` は、セミコロンで区切りの name=value ペアで構成されている。
それぞれが個別の cookie だ。特定の cookie を見つけるには、`document.cookie` を
`;` で split し、正しい名前を見つければいい。そのためには正規表現か配列関数を使
える。この章の終わりには cookie を操作するためのヘルパー関数がある。

ノート：ブラウザーの適当なタブで検証ツールの Console を開いて `document.cookie`
をチェックするといい。

### Writing to document.cookie

`document.cookie` に書き込みができる。これはデータプロパティーではなく、アクセッ
サーだ。特に代入は特別に扱われる。 `document.cookie` への書き込み操作は、その中
に記述された cookie だけを更新し、他の cookie には触れない。例えば、この呼び出し
は `user` という名前と `John` という値を持つ cookie を設定する：

```javascript
document.cookie = "user=John";
```

代入後に `document.cookie` を出力すると、先に述べた理由でおそらく cookie が複数
表示されるだろう。

技術的には、名前と値はどんな文字でも持つことができる。有効な書式を維持するため
に、組み込み関数 `encodeURIComponent` を使ってエスケープする必要がある。

```javascript
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
```

----

制限が少しある。

* `encodeURIComponent` の後の name=value は 4KB を超えてはいけない。したがっ
  て、cookie に巨大なものを保存することはできない。
* ドメインあたりの cookie の総数は約 20+ に制限されているが、正確な制限はブラウ
  ザーによる。

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

`path` のプレフィクスは絶対でなければならない。そのパスの下にあるページから
cookie にアクセスできるようにする。既定値は現在のパスだ。

もし cookie が `path=/admin` で設定されると、ページ `/admin` および
`/admin/something` で見ることができ、 `/home` や `/adminpage` では見えない。

通常、cookie をすべてのページからアクセスできるように、`path` をルートに設定する
必要がある：

```text
path=/
```

### domain

```text
domain=site.com
```

`domain` は、cookie がアクセス可能な場所を定義する。しかし実際には制限がある。ど
んなドメインでも設定できるわけではない。 Cookie を別の第二レベルドメインからアク
セスできるようにする方法はないので、 other.com は site.com で設定された cookie
を決して受け取らない。これは安全上の制限で、あるサイトでのみ利用可能であるべき機
密データを cookie に保存できるようにするためだ。

既定では、cookie はそれを設定したドメインでのみアクセス可能だ。 forum.site.com
のようなサブドメインにも共有されない。しかし、これを変更することができる。
forum.site.com のようなサブドメインが site.com で設定された cookie を取得できる
ようにしたい場合、それは可能だ。そのためには、site.com で cookie を設定するとき
に、`domain` オプションを明示的にルートドメインに設定する必要がある。そうすれ
ば、すべてのサブドメインがそのような cookie を見ることになる。

```javascript
// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; domain=site.com"

// at forum.site.com
// document.cookie has cookie user=John
```

歴史上の理由から、`domain=.site.com` も同じように動作し、サブドメインから cookie
にアクセスできるようになる。これは古い記法で、古いブラウザー対応をする場合に使わ
れる。

まとめると、オプション `domain` はサブドメインでも cookie にアクセスしてもいいよ
うにできるものだ。

### expires, max-age

Cookie に次に述べるオプションがない場合、ブラウザーを閉じると消える。
このような cookie はセッション cookie と呼ばれる。

ブラウザーを閉じても cookie が残るようにするには、オプション
`expires` かオプション `max-age` のどちらかを設定する。

```text
expires=Tue, 19 Jan 2038 03:14:07 GMT
```

Cookie の有効期限は、ブラウザーが自動的に cookie を削除する時刻だ。

日付は GMT で、正確にこの形式でなければならない。日付は `date.toUTCString()` で
得られる。

```javascript
let date = new Date(Date.now() + 86400e3);
document.cookie = "user=John; expires=" + date.toUTCString();
```

オプション `expires` を過去の日付に設定すると、その cookie は消える。

```text
max-age=3600
```

Cookie の有効期限を現在の時点から秒単位で指定する。
0 または負の値を設定した場合、その cookie は消える。

```javascript
// cookie will die in +1 hour from now
document.cookie = "user=John; max-age=3600";

// delete cookie (let it expire right now)
document.cookie = "user=John; max-age=0";
```

ノート：絶対時刻で指定するか、相対時刻で指定するかでオプションを決めればいいようだ。

### secure

Cookie はなるべく HTTPS でしか転送されないようにする。既定では <http://site.com>
で cookie を設定すると、<https://site.com> にも表示され、その逆もまた成り立つ。
つまり、cookie はドメインベースであり、プロトコルを区別しない。

オプション `secure` があると、もし cookie が <https://site.com> で設定されると、
同じサイトが HTTP で、つまり <http://site.com> としてアクセスされたとき、 cookie
が見えなくなる。

Cookie が暗号化されていない HTTP で決して送られるべきでない機密性の高い内容を持
つなら、 `secure` フラグが妥当だ。

### samesite

これもセキュリティ属性だ。これはいわゆる XSRF (cross-site request forgery) 攻撃
から保護するために設計されている。

#### XSRF attack

サイト bank.com にログインしているとする。つまり、そのサイトの認証 cookie を利用
者が持っている。ブラウザーは要求ごとにこの cookie を bank.com に送信し、利用者を
認識させ、機密の財務処理すべてを実行するようになっている。

さて、その利用者が別のウィンドウで偶然、別のサイト evil.com にたどり着いた。
そのサイトには、ハッカーの口座への取引を開始するフィールドを含むフォーム
`<form action="https://bank.com/pay">` を bank.com に送信する JavaScript コードがある。
ブラウザーは、フォームが evil.com から送信されたとしても、
bank.com というサイトにアクセスするたびに認証済み cookie を送信するので、銀行は
実際に支払いを実行する。こういう構造の攻撃を Cross-Site Request Forgery という。

実際の銀行はもちろんそれから守られている。サイト bank.com が生成するフォームすべてに、
XSRF 保護トークンという特別なフィールドがあり、悪意のあるページが遠隔ページから
生成したり抽出したりすることはできないのだ。
サイト `bank.com` は、フォームを受信するたびに、このようなトークンをチェックする。

しかし、このような保護機能を実装するには時間がかかる。フォームすべてに必要なトー
クンフィールドがあることを確認し、さらに要求すべてをチェックする必要がある。

#### Enter cookie samesite option

Cookie オプション `samesite` は、このような攻撃から守るための別の用意だ。
これは理論的には XSRF 保護トークンを必要としないはずだ。
このオプションには取り得る値が二つある。

```text
samesite=strict
```

`samesite=strict` cookie クッキーは利用者が同じサイトの外から来た場合、決して送
信されない。言い換えれば、利用者がメールからのリンクをたどろうが、evil.com から
フォームを送信しようが、あるいは他のドメインから発信された何らかの操作をしよう
が、cookie は送信されない。

認証 cookie にオプション `samesite` があれば、evil.com からの送信は cookie なし
で来るので、 XSRF 攻撃は成功する可能性がない。そのため、bank.com は利用者を認識
できず、支払いを続行することができない。

この保護機能は信頼できる。例えば、bank.com の他のページからのフォーム送信のように、
bank.com から来る操作のみが `samesite` cookie を送信する。

とはいえ、不都合もある。利用者が自分の手形からなど、bank.com への正当なリンクを
たどったときにbank.com が自分を認識しないことに驚くだろう。確かに、その場合は
`samesite=strict` cookie は送信されない。

Cookie を二つ使うことでそれを回避できる。一つは一般的な認識用で、「こんにちは、
ジョン」と言うためだけに使用する。もう一つは `samesite=strict` でデータ変更操作
のために使用する。そうすれば、サイトの外から来た人は歓迎されることを見るが、二つ
目の cookieを送信するためには、銀行のウェブサイトから支払いを開始する必要があ
る。

```text
samesite=lax
```

XSRF からも保護し、利用者エクスペリエンスを損なわない、より緩やかな方法だ。

`lax` モードは `strict` と同様に、サイト外から来たときにブラウザーが cookie を送
信することを禁じる、例外が追加されている。

`samesite=lax` cookie は、これらの条件が両方とも真である場合に送信される。

1. HTTP メソッドが安全であること

   安全な HTTP メソッドの完全なリストは仕様 RFC7231 にある。基本的に、これらのメ
   ソッドはデータの読み込みに使われるべきもので、書き込みには使われない。また、
   データを変更する操作を行ってはいけない。リンクをたどるのは常に GET であり、安全
   なメソッドだ。
2. 操作がトップレベルのナビゲーションを実行する（ブラウザーのアドレスバーの URL
   を変更する）。

   通常は真だが、ナビゲーションが `<iframe>` 内で実行される場合は、トップレベル
   ではない。また、ネットワーク要求のための JavaScript メソッドはナビゲーション
   を行わないので、適合しない。

つまり、`samesite=lax` が行うのは、基本的に最も一般的な「URL へ移動」操作に
cookieを持たせることだ。例えば、これらの条件を満たす手形からウェブサイトのリンク
を開くことだ。しかし、他のサイトからのネットワーク要求やフォーム送信のような、よ
り複雑なものは cookie を失う。もしそれでいいのであれば、`samesite=lax` を追加し
ても、おそらく利用者エクスペリエンスを壊すことはなく、保護機能を追加することがで
きる。

全体として、`samesite` は素晴らしいオプションだ。

欠点としては、

* `samesite` は、2017 年前後の古いブラウザーでは無視される。

そのため、`samesite` にのみ保護を頼ると、古いブラウザーは脆弱になる。

それでも、`samesite` と XSRF トークンのような他の保護手段を併用することで、
さらに防御の層を厚くすることができるはずだ。

### httpOnly

このオプションは JavaScript とは何の関係もない。

ウェブサーバーはヘッダー `Set-Cookie` を使用して cookie を設定する。
また、オプション `httpOnly` を設定することもある。

このオプションは、JavaScript から cookie へアクセスすることを禁じる。このような
cookie を見たり、`document.cookie` を使用して操作したりできない。

これは、ハッカーが自分の JavaScript コードをページに注入し、利用者がそのページを
訪れるのを待つという特定の攻撃から守るための予防措置として使われている。
ハッカーが私たちのサイトに自分のコードを注入することはまったくできないはずだが、
それを許してしまうバグがあるのかもしれない。

通常、そのようなことが起こり、利用者がハッカーの JavaScript コードを含むウェブ
ページにアクセスすると、そのコードが実行され、認証情報を含む利用者クッキーを持
つ `document.cookie` にアクセスできるようになる。それはまずい。

しかし、もし cookie が `httpOnly` であれば、`document.cookie` はそれを見ないので
保護される。

### Appendix: Cookie functions

手動で `document.cookie` を修正するよりも便利な、cookie を扱うための小さな関数群
を紹介する。そういうライブラリーはたくさんあるので、これらはデモ用だ。しかし、こ
れらも完全に動作する。

#### getCookie(name)

Cookie にアクセスする最も短い方法は、正規表現を用いることだ。
関数 `getCookie(name)` は与えられた名前を持つ cookie を返す。

```javascript
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

パターン `; name=<value>` にマッチするように `RegExp` を動的に生成する。

ノート：正規表現。
最初の捕捉なし丸括弧は「行頭または `; ` のいずれか」を意味する。
リテラル正規表現はメタキャラクターのエスケープを行うためものの。
最後の丸括弧が `<value>` を得るためのもので、`;` 直前までの最長パターンを表す。

#### setCookie(name, value, options)

Cookie の名前を、既定では `path=/` であるように、指定された値に設定する。

#### deleteCookie(name)

Cookie を削除するには、有効期限を負の値にして呼び出すことで行う。

```javascript
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}
```

----

Cookie を更新または削除するときは、設定したときとまったく同じ `path` と `domain`
を用いる必要がある。

### Appendix: Third-party cookies

Cookie がサードパーティー cookie であるとは、利用者が訪問しているページ以外のド
メインが置いた cookie だ。

例えば：

1. ドメイン site.com のページで、他のサイトのバナー
   `<img src="https://ads.com/banner.png">` を読み込む。
2. バナーとともに、ads.com の遠方サーバーはヘッダー `Set-Cookie` に `id=1234` の
   ような cookie を設定する場合がある。このような cookie はドメイン ads.com から
   発信され、ads.com でのみ表示される。
3. 次に ads.com にアクセスすると、遠方サーバーは `id` cookie を取得し、利用者を
   認識する。
4. さらに重要なことに、利用者が site.com から、同じくバナーを持っている他のサイ
   トに移動すると、ads.com は ads.com に属する cookie を取得するため、訪問者を認
   識し、サイト間を移動する際に追跡することができることだ。

ノート：図を描ける。

サードパーティー cookie は、その性質上、従来から追跡や広告サービスに使用されてい
る。これらは発信元のドメインに結びついているため、ads.com は異なるサイト間で同じ
利用者を追跡することができる（すべてのサイトがアクセスした場合）。当然ながら、追
跡されることを好まない人もいるので、ブラウザーでそのような cookie を無効にでき
る。

また、最近のブラウザーの中には、このような cookie に対して特別な政策を採用してい
るものもある。

* Safari はサードパーティー cookie をまったく許可しない。
* Firefox にはサードパーティーの cookie を遮断するべく、サードパーティードメイン
  の「ブラックリスト」が用意されている。

----

`<script src="https://google-analytics.com/analytics.js">` のように第三者のドメ
インからスクリプトをロードし、そのスクリプトが `document.cookie` を使って cookie
を設定する場合、その cookie はサードパーティーではない。

スクリプトが cookie を設定するなら、そのスクリプトがどこから来たかに関係なく、そ
の cookie は現在のウェブページのドメインに属する。

### Appendix: GDPR

ここも JavaScript とは全く関係なく、cookie を設定する際に気をつけるべきことを述べる。

欧州には GDPR と呼ばれる法律があり、ウェブサイトが閲覧者のプライバシーを尊重する
ために一連の規則を施行している。その規則一つに、追跡 cookie について、利用者から
の明示的な許可を必要とすることがある。ただし、これはあくまで cookie の追跡、識
別、許可に関するものであって、ある情報を保存するだけで、利用者を追跡も特定もしな
い cookie を設定するのであれば、それは自由だ。しかし、認証セッションや追跡 ID を
持つ cookie を設定するのであれば、利用者がそれを許可しなければならない。

ウェブサイトには一般に、GDPR に従うための変種が二つある。どちらもすでにウェブで
見たことがあるはずだ。

1. ウェブサイトが、認証された利用者だけに追跡 cookie を設定したい場合。

   これを行うには、登録フォームに「プライバシーポリシーを受け入れる」のような
   チェックボックスを設け、利用者はそれをチェックしなければならず、その後ウェブ
   サイトは認証 cookie を自由に設定することができるようになる。

2. ウェブサイトがすべての人に追跡 cookie を設定したい場合。

   合法的に行うには、ウェブサイトは新規訪問者にモーダルなスプラッシュスクリーン
   を表示し、cookie に同意するよう求める。そうすれば、ウェブサイトはそれらを設定
   し、サイトの内容を見せることができる。しかし、それは新しい訪問者にとって邪魔
   になることがある。内容ではなく、そのような「クリックしなければならない」
   画面を見ることを好む人はいない。それでも GDPR では明示的な同意が必要だ。

GDPR は cookie だけでなく、他のプライバシー関連の問題についても言及しているが、
ここでは述べない。

## LocalStorage, sessionStorage

<https://javascript.info/localstorage> ノート。

ウェブストレージオブジェクト `localStorage` および `sessionStorage` により、ブラウザーにキー
と値のペアを保存することができる。
これらのオブジェクトの面白いところは、データがページの更新 (`sessionStorage`)
やブラウザーの完全な再起動 (`localStoregae`) にも影響を受けないことにある

Cookie がすでにありながら、さらなるオブジェクトがなぜ必要なのだろうか：

* Cookie とは異なり、ウェブストレージオブジェクトは要求ごとにサーバーに送信され
  るわけではない。そのため、データをより多く保存することができる。
* これもまた cookie とは異なり、サーバーは HTTP ヘッダーを介してストレージオブ
  ジェクトを操作することができない。すべては JavaScript で行われる。
* ストレージはオリジン拘束性がある。つまり、異なるプロトコルやサブドメインは、異
  なるストレージオブジェクトを割り出し、互いにデータにアクセスすることはできな
  い。

どちらのストレージオブジェクトも同じメソッドとプロパティを備えている：

* `setItem(key, value)`: キーと値のペアを格納する。
* `getItem(key)`: キーで値を取得する。
* `removeItem(key)`: - キーとその値を削除する。
* `clear()`: すべて削除する。
* `key(index)`: 任意の位置のキーを取得する。
* `length`: 保存する項目の数。

`Map` に似ていると憶えればいい。それに `key(index)` が付いたものだと考えられる。

### localStorage demo

`localStorage` の主な機能：

* 同じオリジンのすべてのタブとウィンドウで共有される。
* データに有効期限がない。ブラウザーの再起動はもちろん、OS の再起動後もデータが残る。

例えば、次のコードをまず実行する：

```javascript
localStorage.setItem('test', 1);
```

そしてブラウザーを閉じたり開いたり、あるいは同じページを別のウィンドウで開くだけ
で、このようにして値を取得できる：

```javascript
localStorage.getItem('test'); // 1 
```

同じオリジンであればよく、URL パスは異なっていてもよい。 `localStorage` は同じオ
リジンを持つすべてのウィンドウで共有されるので、あるウィンドウでデータを設定する
と、その変更は別のウィンドウからも見えるようになる。

### Object-like access

また、普通のオブジェクトの方法でキーを取得、設定することもできる。
これは歴史的な理由で認められており、ほとんど機能しているが、一般的には推奨されない。

1. もしキーが利用者によって生成されたものであれば、どんなものでもあり得る。
   `length` や `toString` あるいは `localStorage` の他の組み込みメソッドでも。
   この場合、`{get,set}Item()` は問題なく動作するが、オブジェクト風アクセスは失敗する。
2. イベント `storage` があり、データを変更したときに起こる。
   そのイベントは、オブジェクト風アクセスでは起こらない。

### Looping over keys

ストレージオブジェクトは概念としてはコレクションであるものの、反復可能機能を提供していない。
いちおう `for in` ループを書けるが、必要のない組み込みフィールドもキーとして出てくる。
なので、本書では `Object.keys(localStorage)` を反復処理することを推奨している。

### Strings only

ストレージオブジェクトはキーと値の両方が文字列でなければならない。
数値やオブジェクトなど他の型であった場合は、自動的に文字列に変換される。

オブジェクトを保存したければ JSON がある。
また、デバッグ用にストレージオブジェクトを JSON にすることもある：

```javascript
JSON.stringify(localStorage, null, 2);
```

### sessionStorage

`sessionStorage` は `localStorage` に比べると使用頻度が低い。
プロパティーやメソッドは同じだ、より限定的だ。

* `sessionStorage` は現在のブラウザータブ内にしか存在しない。
  * 同じページを表示する別のタブでは、別のストレージを持つ。
  * しかし、同じタブ内の `iframe` 間では共有される（同じオリジンから来たとする）。
* データはページの更新には耐えるが、タブを閉じたり開いたりするのには耐えられない。

```javascript
sessionStorage.setItem('test', 1);
```

このコードを実行して、画面を更新すると

```javascript
sessionStorage.getItem('test');
```

で値がまだ得られる。しかし、同じページを別のタブで開き、そこでもう一度試してみる
と、上記のコードは `null` を返す。これはまさに、`sessionStorage` がオリジンだけ
でなく、ブラウザーのタブにも束縛されているためだ。そのため、`sessionStorage` の
使用は控えられる。

### Storage event

`localStorage` や `sessionStorage` のデータが更新されると、イベント `storage` が起こる。
そのときのイベントのプロパティーは次のとおり：

* `key`: 変更されたキー。`clear()` が呼び出された場合は `null`.
* `oldValue`: 古い値。キーが新しく追加された場合は `null`.
* `newValue`: 新しい値。キーが削除された場合は `null`.
* `url`: 更新が発生したドキュメントの URL.
* `storageArea`: 更新が発生した `localStorage` または `sessionStorage` オブジェクト。

重要なのは、このイベントは、ストレージにアクセス可能なすべてのウィンドウオブ
ジェクトで発生するということだ（イベントを発生させたオブジェクト自身以外で）。

ウィンドウが二つあり、同じサイトであるとする。そのため、`localStorage` はそれら
の間で共有される。

（以下のコードをテストするために、このページを二つのブラウザウィンドウで開くといいだろう）

両方のウィンドウが `window.onstorage` を listen していれば、それぞれのウィンドウ
はもう一方のウィンドウで発生した更新に反応する。

イベントは `event.url` として、データが更新されたドキュメントの URL を含むことに注意。
イベントは `sessionStorage` と `localStorage` の両方に対して同じなので、
`event.storageArea` は変更された方を参照する。変更に「応答」するために、
そこに何かを設定し直したいと思うこともあるかもしれない。

これにより、同じオリジンからの異なるウィンドウでメッセージを交換できる。

最近のブラウザーは Broadcast channel API という同一生成元ウィンドウ間通信のため
の特別な API も対応しており、こちらはより充実した機能を備えているが、あまり充実
していない。 `localStorage` を基本にした、この API を polyfill するライブラリー
があり、どこでも利用できるようになっている。

### Tasks

#### Autosave a form field

変更するたびにその値を自動保存するテキストエリア欄を作れ。
利用者が誤ってページを閉じてしまい、再び開いたときに、未完成の入力が所定の位置にあるようにしろ。

ノート：
Clear ボタンの存在がヒントになっている。`onclick` でもストレージを更新する必要がある。
「変更するたびに」をチェックするイベントハンドラーは `oninput` に仕込む。

## IndexedDB

<https://javascript.info/indexeddb> ノート。

IndexedDB はブラウザーに組み込まれたデータベースであり、`localStorage` よりもはるかに強力だ。

* ほとんどの種類の値をキーで保存でき、キーの型は複数対応。
* 信頼性の高いトランザクションをサポート。
* キーレンジクエリー、インデックスをサポート。
* `localstorage` よりはるかに大きなデータ量を保存できる。

その力は、従来のクライアントサーバーアプリケーションでは過剰だ。 IndexedDB はオ
フラインのアプリケーションを想定しており、ServiceWorkers や他の技術と組み合わせ
ることを想定している。

仕様書 <https://www.w3.org/TR/IndexedDB> に記載されている IndexedDB のネイティブイ
ンターフェースは、イベントベースだ。

また、<https://github.com/jakearchibald/idb> のような `Promise` ベースのラッパー
の助けを借りて、async/await を利用することもできる。これはかなり便利だが、ラッ
パーは完璧ではなく、すべての状況でイベントを置き換えることはできない。そこで、ま
ずはイベントから始めて、IndexedDB を理解した後に、ラッパーを使うことにする。

----

技術的には、データは通常、ブラウザーの設定や拡張機能などとともに、訪問者のホーム
ディレクトリーに保存される。
ブラウザーや OS レベルの利用者によって、それぞれ独立した格納領域を持っている。

### Open database

IndexedDB を使い始めるには、まずデータベースを開く（接続する）。

```javascript
let openRequest = indexedDB.open(name, version);
```

* `name`: データベースの名前を示す文字列
* `version`: 正の数で示されるバージョン値

異なる名前のデータベースを多数持つことができるが、それらはすべて現在のオリジン内
に存在する。異なるウェブサイトが互いのデータベースにアクセスすることはできない。

この呼び出しが返すオブジェクトを `openRequest` とする。そのイベントをなるべく listen する。

* `success`: データベースが準備できた。データベースオブジェクト `openRequest.result` を今後の呼び出しに使用する。
* `error`: 接続失敗。
* `upgradeneeded`: データベースの準備はできているが、バージョンが古い。

IndexedDB には、サーバーサイドデータベースにはない「スキーマのバージョン管理」と
いう機構が組み込まれている。サーバーサイドのデータベースとは異なり、IndexedDB は
クライアントサイドで、データはブラウザーに保存されるため、開発者はそれにフルタイ
ムでアクセスすることができない。そのため、私たちがアプリケーションの新バージョン
を公開し、利用者が私たちのウェブページにアクセスしたとき、データベースを更新する
必要が生じることがある。ローカルのデータベースのバージョンが `open()` で指定され
たものより小さい場合、特別なイベント `upgradeneeded` が発生し、必要に応じてバー
ジョンを比較し、データ構造をアップグレードすることができる。

イベント `upgradeneeded` は、データベースがまだ存在しない（バージョンが 0 であ
る）場合にも起こされるので、初期化を実行できる。例えば、アプリケーションの最初の
バージョンを公開したとする。そして、バージョン 1 のデータベースを開
き、`upgradeneeded` ハンドラーで次のように初期化できる：

```javascript
let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
    // triggers if the client had no database
    // ...perform initialization...
};

openRequest.onerror = function() {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
    let db = openRequest.result;
    // ...
};
```

そして後日、バージョン 2 を公開します。次ようにアップグレードを実行することができる：

```javascript
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = function(event) {
    // the existing database version is less than 2 (or it doesn't exist)
    let db = openRequest.result;
    switch(event.oldVersion) {
    case 0:
        // version 0 means that the client had no database
        // perform initialization
    case 1:
        // client had version 1
        // update
    }
};
```

現在のバージョンは 2 なので、`onupgradeneeded` ハンドラーには、

* 初めてアクセスする利用者で、データベースがない場合に適したバージョン 0 用と、
* アップグレードのためのバージョン 1 用の

コード分岐を用意することに注意。
そして、`onupgradeneeded` ハンドラーがエラーなく終了した場合に限り、
イベント `openRequest.onsuccess` が起動し、データベースは正常に開かれたとみなされる。

データベースを削除するには次のようにする：

```javascript
indexedDB.deleteDatabase(name);
```

----

古い `open()` 呼び出しバージョンを使ってデータベースを開くことはできない。現在の
ユーザーデータベースのバージョンが `open()` 呼び出しのものより新しい場合、例えば
既存の DB のバージョンが 3 で `open(..., 2)` をしようとすると、失敗して
`openRequest.onerror` が発動する。

レアケースだが、例えば代理キャッシュから古い JavaScript コードを読み込んだ場合、
このようなことが起こり得る。つまり、コードは古くても、データベースは新しいという
ことだ。

エラーから守るために、`db.version` をチェックし、ページの再読み込みを提案する必
要がある。古いコードを読み込まないように、適切な HTTP キャッシュヘッダーを使用す
れば、このような問題が発生することはないだろう。

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
