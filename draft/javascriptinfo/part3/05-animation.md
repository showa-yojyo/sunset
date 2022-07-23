---
title: Animation
---

## Bezier curve

<https://javascript.info/bezier-curve> ノート。

Bezier 曲線はコンピューターグラフィックスで図形を描いたり、CSS アニメーションに
使ったり、いろいろな用途がある。 Bezier 曲線はひじょうに単純なもので、一度学習し
ておけば、ベクターグラフィックスや高度なアニメーションの世界でも違和感なく使える
ようになる。

### Control points

Bezier 曲線は制御点によって定義される。
2点、3点、4点、またはそれ以上の場合がある。

ノート：本書ではここに 2, 3, 4 点それぞれの場合の曲線の例が図示されている。

これらの曲線をよく見てみると、すぐに気づくことがある。

1. 制御点は常に曲線上にあるわけではない。
2. 曲線の次数は制御点から 1 を引いた数に等しい。
   二点の場合は直線、三点の場合は放物線、四点の場合は三次曲線となる。
3. 曲線は常に制御点の凸包の中にある。

最後の convex hull property を利用して、コンピュータグラフィックスでは、交点検定
を最適化することが可能だ。凸包が交差しないのであれば、曲線も交差しない。したがっ
て、最初に凸包の交差をチェックすれば、高速に「交差なし」という結果を得られる。凸
包は長方形や三角形など（上の図参照）、曲線よりもずっと単純な図形なので、凸包の交
差をチェックするのはずっと簡単だ。

ノート：曲線が平面上にあることを仮定しているが、それは問題にしなくていい。

Bezier 曲線の描画における主な価値とは、制御点を移動することによって、曲線が直感的に明らかな方法で変化することにある。
本書の例を使って、マウスを使って制御点を対話的に動かせるので試す。

見ての通り、曲線は接線 12 と接戦 34 に沿って伸びている。
練習を重ねると、必要な曲線を得るために、どのように点を配置すればよいかが分かってくる。
また、いくつかの曲線をつなげば、ほとんどどんなものでも得ることができる。

ノート：本書で言う接続とは、単に端点を共有する程度に留まる。

### De Casteljau's algorithm

ノート：このデモは De Casteljau の計算手順を視覚的に示すものだ。
制御点が三つの（すなわち放物線を形成する）例を試す。
制御点はマウスで動かすことができ、再生ボタンをクリックすると、
曲線パラメーター `t` に対する点を 0 から 1 まで評価する。

De Casteljau の三点 Bezier 曲線構築の計算手順：

1. 制御点を描く。当デモでは 1, 2, 3 とラベルを付けてある。
2. 制御点 1, 2, 3 の間の線分を作図する（茶色の線）。
3. パラメータ `t` を 0 から 1 へと変化させる。この例では 0.05 刻みにしてある。

   これらの `t` の値のそれぞれについて。

   * 茶色の線分それぞれにおいて、その始点から `t` に比例した距離にある点を取る。
     線分が二つあるので、点も二つある。

     例えば、`t=0` の場合、点は線分の始点、`t=0.25` の場合、始点から線分の長さの 25% にあり、
     `t=0.5` の場合、中間にあり、`t=1` の場合、線分の終点だ。

   * 今得られた二点を結ぶ（青い線分）。
4. つまり、`t=0.25` の場合は、線分の左 1/4 の端に点があり、`t=0.5` の場合は、線
   分の中央に点があることになる（赤い点）。
5. `t` は 0 から 1 まであり、`t` の値ごとに曲線に一点ずつ追加される。
   そのような点の集合が Bezier 曲線を形成する（赤い放物線）。

以上の手順は三制御点に対するものだが、四点以上の場合も本質的には同じだ。
この計算手順は再帰的であり、任意の数の制御点に対して一般化できる。

N 個の制御点が与えられたとする。

1. それらを結んで N - 1 個の線分を最初は得る。
2. 次に、0 から 1 までの各 `t` について、`t` に比例した距離の各線分上の点を取り、それらを端点とする線分を作図する。
   すると N - 2 個の線分が得られる。
3. 点が一つだけになるまで 2. を繰り返す。

これらの点が曲線を作る。

上記の説明で不明な点があれば、本書のライブサンプルを触って、どのように曲線が構築されるかを確認する。
アルゴリズムは再帰的なので、任意の次数の Bezier 曲線を構築することができる。
しかし、実際には多くの点はほとんど役に立たない。
通常、2, 3 個の制御点を取り、複雑な線はそのような小次数の曲線を端点で接続して表現する。その方が簡単だからだ。

ノート：次数の大きい Bezier 曲線は計算量が明らかに多い。

----

Bezier 曲線を指定するには制御点を用いる。それらは最初と最後の点を除いて曲線上にない。

また、いくつかの点を通る曲線を描き、すべての点が一本の滑らかな曲線になるようにするという問題もある。
この作業は補間と呼ばれるが、ここでは扱わない。

このような曲線には、Lagrange 多項式などの数学的な公式がある。コンピュータグラ
フィックスでは、多くの点を結ぶ滑らかな曲線を作るために、スプライン補間がよく使われる。

### Maths

制御点 $P_i$ が座標の組で与えられると、最初の制御点の座標は
${P_1 = (x_1, y_1)}$, 二番目は ${P_2 = (x_2, y_2)}$, というように、曲線の座標は
線分 ${[0,1]}$ からパラメータ $t$ に依存する方程式で記述される。

二点の公式：

$$
P = (1-t)P_1 + tP_2
$$

三点の公式：

$$
P = (1−t)^2P_1 + 2(1−t)tP_2 + t^2P_3
$$

四点の公式：

$$
P = (1−t)^3P_1 + 3(1−t)^2tP_2 +3(1−t)t^2P_3 + t^3P_4
$$

パラメーター $t$ が 0 から 1 まで動くと、各 $t$ の値 ${(x, y)}$ の集合がそのような制御点の曲線を形成する。

## CSS-animations

<https://javascript.info/css-animations> ノート。

CSS では、JavaScript を全く使わずに簡単なアニメーションを行える。
さらに、JavaScript を使って CSS アニメーションを制御することで、少ないコードでより良いアニメーションを作れる。

### CSS transitions

CSS 遷移の考え方は単純だ。あるプロパティーを記述し、その変化をどのようにアニメーションさせるかを記述する。
プロパティーが変化すると、ブラウザーがそのアニメーションを描画する。
つまり、プロパティーを変更するだけで、ブラウザーが流動的な遷移を行うのだ。
例えば、次の CSS は `background-color` の変化を 3 秒間アニメーションさせる。
これで、要素に `.animated` クラスがあれば 3 秒間の背景色の変化がアニメーションで表示される：

```css
.animated {
    transition-property: background-color;
    transition-duration: 3s;
}
```

ノート：値が CSS のプロパティー名となるプロパティーは初めて見ると思う。
本書のデモでは、ボタンをクリックすると背景がアニメーションで赤へと変化していく。
ボタンの `onclick` で `this.style.backgroundColor = 'red';` としている。これが最終状態だ。

CSS 遷移を記述するプロパティーは四つある：

* `transition-property`
* `transition-duration`
* `transition-timing-function`
* `transition-delay`

差し当たり、共通 `transition` プロパティーによって、property duration
timing-function delay の順番でまとめて宣言できることと、複数のプロパティーを一度に
アニメーションさせることができることを押さえておく。

```html
<style>
#growing {
    transition: font-size 3s, color 2s;
}
</style>

<script>
growing.onclick = function() {
    this.style.fontSize = '36px';
    this.style.color = 'red';
};
</script>
```

ノート：組 (property duration timing-function delay) をカンマ区切りで列挙できるのだろう。

### transition-property

プロパティー `transition-property` には、アニメートさせたいプロパティーのリストを記述する。
また、`all` と書くと、すべてのプロパティーをアニメートすることになる。
一般的に使われているプロパティーのほとんどはアニメート可能だが、できないプロパティーもある。

### transition-duration

プロパティー `transition-duration` でアニメーション時間を指定できる。
CSS 時間書式で指定する。秒なら `s`, ミリ秒なら `ms` だ。

### transition-delay

プロパティー `transition-delay` には、アニメーションを開始するまでの遅延時間を指定できる。
例えば、`transition-delay: 1s` で `transition-duration: 2s` の場合、
アニメーションは当該プロパティーの変化から 1 秒後に始まり、全体の継続時間は 2 秒となる。

負の値も許される。その場合、アニメーションはすぐに表示されるが、アニメーション
の開始点は与えられた値（時間）後になる。例えば、`transition-delay: -1s` で
`transition-duration: 2s` の場合、アニメーションは中間点から始まり、全体の継続時間は 1 秒となる。

コメント：デモのスクリプトに注意。`onclick` で CSS クラスを与える方法を採っている。

また、`transition-delay` を負の値にすることで、遷移の途中、例えば現在の秒に相当
する正確な数字から開始させることも可能だ。

### transition-timing-function

プロパティー `transition-timing-function` には、アニメーションの進行を時間軸に沿ってどのように配分するかを記述する。
このプロパティーは Bezier 曲線と階段関数の二種類の値を取ることができる。

#### Bezier curve

タイミング関数、次の条件を満たす四制御点からなる Bezier 曲線として設定できる：

1. 最初の制御点は (0, 0)
2. 最後の制御点は (1, 1)
3. 中間点では x の値は区間 (0, 1) 内でなければならず、y は何でもよい。

CSS での Bezier 曲線の構文はこうなる：

```text
cubic-bezier(x2, y2, x3, y3)
```

最初と最後の制御点は固定されているので、間の二点だけを指定する。

タイミング関数はアニメーション処理の速さを記述する：

1. x 成分は時刻を指定する: 0: 開始、1: 終了。
2. y 成分は処理の完了を指定する。0: 開始値、1: 最終値。

最も単純な変種は、アニメーションが等速で進む場合だ。これは曲線 `cubic-bezier(0, 0, 1, 1)` で指定することができる。

列車のデモは解説がほとんど要らない。要素の位置を指定するのに `left` を援用するくらいか。

次の曲線は初速がえらいことになっている。

組み込み曲線がいくつか用意されている。

* `linear`: `cubic-bezier(0, 0, 1, 1)` と形は同じ曲線。すなわち直線。
* `ease`: `cubic-bezier(0.25, 0.1, 0.25, 1.0)`
* `ease-in`: `cubic-bezier(0.42, 0, 1.0, 1.0)`
* `ease-out`: `cubic-bezier(0, 0, 0.58, 1.0)`
* `ease-in-out`: `cubic-bezier(0.42, 0, 0.58, 1.0)|`

`transition-timing-function` の既定値は `ease` だ。

Bezier 曲線をアニメーションがその範囲を超えるようにとることができる。制御点はど
んな y 座標でもかまわない。そうすると、曲線は非常に低いか高いか知らないが延長し
て、通常の範囲を超えるアニメーションになる。

ここで本書では `cubic-bezier(.5, -1, .5, 2)` のデモが来るが、この曲線のプロットが示されているのでわかりやすい。

二点目の y 座標を 0 以下にし、三点目については 1 以上にしたため、曲線は「正規の」象限の外に出る。
曲線の y 座標はアニメーション処理の完成度を測るものだ。
値 ${y = 0}$ はプロパティーの開始値に対応し、${y = 1}$ は終了値に対応する。
つまり、${y \lt; 0}$ の値はプロパティーを開始時の左 (`left`) から動かし、
${y \gt; 1}$ の値は終了時の左から動かす。

特定の課題のために Bezier 曲線を作図するのに、ツールがいろいろとある：

* 例えば、<https://cubic-bezier.com>
* ブラウザーの開発ツールも CSS における Bezier 曲線を特別に対応している。

  1. 開発者ツールを開く。
  2. Elements タブを選択し、右側の Styles サブパネルに注目する。
  3. CSS プロパティーで `cubic-bezier` とあるものは、その前にアイコンがある。
  4. このアイコンをクリックして曲線を編集する。

#### Steps

タイミング関数の `steps(number of steps[, start/end])` は、遷移を複数の段階に分割できる。

```html
<div id="digit"> <!-- border: 1px solid red; width: 1.2em; -->
    <div id="stripe">0123456789</div> <!-- display: inline-block; font: 32px monospace; -->
</div>
```

タグ `#digit` は幅が固定で枠があるので、赤い窓のように見える。

これからタイマーを作る。数字が一文字ずつバラバラに表示されるように。
そのために、`#digit` の外側に `#stripe` を `overflow: hidden` で隠し、
`#stripe` を段階的に左にずらしていくことにする。
各桁ごとに一歩ずつ移動し、九歩になる。

ノート：この表現がわかりにくい。

```css
#stripe.animate{
    transform: translate(-90%);
    transition: transform 9s steps(9, start);
}
```

第一引数は段階数だ。変換が九つの部分に分割される。
時間間隔も自動的に九分割されるので、`transition: 9s` であることから一桁あたり一秒ということになる。

第二引数は `start` または `end` と書く。
`start` はアニメーションの始まりで、最初の段階をすぐに作る必要があることを意味する。

桁をクリックするとすぐに 1 に変わり、次の秒の始めに変化する。このように処理が進行する：

* 0s: -10%; 1s の頭に最初の変化がすぐにある。
* 1s: -20%
* …
* 8s: -90%
* 最後の一秒は最終値を示す。

ここでは、`step()` に `start` を与えたので、最初の変化は即時だ。
代替値の `end` は、変更を最初ではなく、各秒の終わりに適用することを意味する。
つまり、`steps(9, end)` の処理は次のようになる：

* 0s: 0; 最初の一秒間は何も変化しない。
* 1s: -10%; 最初の一秒の終わりに変化が起こる。
* 2s: -20%
* …:
* 9s: -90%

`steps(9, end)` の動作デモもある。最初の桁が変わる前の休止時間に注目する。

また、`steps()` には定義済みの短縮形がある。

* `step-start`: `steps(1, start)` と同じ。アニメーションはすぐに開始され、ワン
  ステップを取る。
* `step-end`: `steps(1, end)` と同じ。`transition-duration` の終了時に、ワンス
  テップでアニメーションを作成する。

これらの値は、実際のアニメーションではなく、一段階の変化を表しているため、使用さ
れることはほとんどない。

### Event: "transitionend"

CSS アニメーションが終了すると、イベント `transitionend` が起こる。
このイベントはアニメーションが終了した後に何か行動するために広く用いられる。
また、アニメーションを結合することもできる。

船の例は、クリックするとそこへ向かって航行し始め、そのたびに右へ向かって遠くへ行く。
アニメーションは、遷移が終了するたびに再実行される関数 `go()` によって開始され、方向を反転させる。

ノート：コードの構造は `transitionend` が起こるたびに `go()` が呼び出される。
呼び出された回数が奇数か偶数かで船要素の CSS クラスとボックスの位置が更新される。

`transitionend` イベントオブジェクトには固有のプロパティーがある。

* `event.propertyName`: アニメーションが終了したプロパティー。
  プロパティーを複数同時に処理させる場合に有用だ。
* `event.elapsedTime`: アニメーションにかかった時間（`transition-delay` は含まず）。

### Keyframes

CSSの `@keyframes` 規則を使って、単純なアニメーションを複数結合できる。
これはアニメーションの「名前」と規則（何を、いつ、どこでアニメーションさせるか）を指定する。
それから、プロパティー `animation` を用いて、アニメーションを要素に取り付け、そのパラメーターを追加的に指定できる。

ノート：難しいかもしれない。本書の説明だけでは厳しい。

キーフレームについては多くの記事があり、詳細な仕様も記載されている。
常に動いているサイトでない限り、`@keyframes` が必要になることはあまりないだろう。

### Performance

CSS プロパティーのほとんどは数値であるため、アニメーションさせることができる。例
えば、`width`, `color`, `font-size` はすべて数値だ。これらをアニメーションにすると、
ブラウザーはこれらの数値を 1 フレームずつ徐々に変化させ、滑らかな効果を生み出す。
ただし、CSS プロパティーによって変更にかかる労力が異なるため、すべてのアニメー
ションが思いどおりに表示されるわけではない。

スタイルが変更されると、ブラウザーは三つの段階を経て新しい外観を描画する。

1. Layout: 各要素の幾何と位置を再計算する
2. Paint: 背景や色など、それぞれの場所でどのように見えるかを再計算する。
3. Composite: 最終結果を画面上のピクセルに描画し、CSS 変換がある場合はそれを適用する。

CSS アニメーションではこの処理がフレームごとに繰り返される。
しかし、色など、幾何や位置に影響を与えない CSS プロパティーは、レイアウト段階を飛ばすことができる。
色が変更された場合、ブラウザーは新しい幾何を計算せず、Paint Composite に進む。
また、直接 Composite に移動するプロパティーはほとんどない。
CSS プロパティーとそれがどの段階で引き起こされるかについては <https://csstriggers.com> に詳しい。

特に、多くの要素や複雑なレイアウトを持つページでは、計算に時間がかかることがある。
また、この遅延はデバイスのほとんどで実際に目にすることができ、カクカクした流動性の低いアニメーションとなる。

Layout 段階を飛ばしたプロパティーのアニメーションはより高速になる。
Paint も飛ばされるとより効果的だ。

プロパティー `transform` を選択するのが素晴らしい：

* CSS 変換は対象要素のボックス全体に作用する（回転、反転、伸縮、移動）。
* CSS 変換は隣接する要素に作用することはない。

以上の理由により、ブラウザーは Composite 段階で、既存の Layout と Paint の計算の
「上に」`transform` を適用する。
言い換えると、ブラウザーは Layout（サイズ、位置）を計算し、Paint 段階で色や背景などで塗り、
それから `transform` を必要とする要素ボックスに適用する。

プロパティー `transform` の変更（アニメーション）が、Layout と Paint の段階を引き起こす
ことはない。しかも、ブラウザーは CSS 変換のためにグラフィックスアクセラレーターを活用するため、
ひじょうに効率的な処理を行う。

プロパティー `transform` はひじょうに強力だ。要素に `transform` を用いると、
要素の回転や反転、拡大や縮小、移動など、さまざまなことが可能になる。つまり、
プロパティー `left`/`margin-left` の代わりに `transform: translateX(...)` を用いたり、
要素のサイズを大きくするために `transform: scale` を用いたりできる。

プロパティー `opacity` は Layout を引き起こすこともない。
これは、表示・非表示やフェードイン・フェードアウトの効果に利用できる。

通常、`transform` と `opacity` をペアで使うと、ほとんどの需要が解決され、流動的
で見栄えのするアニメーションが得られる。

たとえば、ここでは要素 `#boat` をクリックすると、`transform: translateX(300)` および
`opacity: 0` のクラスが追加され、`300px` 右に移動して消える。

ノート：IMG 要素の元々の CSS 定義を一目見ただけで `transition` の仕様が洗練されていることがわかる。

ノート：キーフレームの例は難解。

### Tasks

#### Animate a plane (CSS)

画像をクリックすると三秒かけて寸法を十倍にするアニメーションを作れ。
終了したらメッセージボックスを出せ。アニメーション中にクリックされるときの対応も考えろ。

私の答案はこう：

```css
#flyjet {
    width: 40px;
    height: 24px;
    transition-property: width, height;
    transition-duration: 3s;
}
```

```javascript
let done = false;
flyjet.onclick = function(event){
    if(done){
        return;
    }
    this.style.width = "400px";
    this.style.height = "240px";
    setTimeout(() => alert('Done!'), 3000);
    done = true;
};
```

フラグを使うのがみっともないのならば、イベントハンドラーを着脱する方法も考えられる。

本書では `transitionend` イベントを処理しろとある。なるほど。
ただし `width` と `height` の遷移終了それぞれに対してイベントが起こるので注意が要る。

#### Animate the flying plane (CSS)

前の課題の解答を修正して、画像を animate して元のサイズより大きくし、そして元のサイズに戻るようにしろ。

これは `transition-timing-function` に適当な Bezier 曲線を与えるだけでいい。

#### Animated circle

肥大化する円をアニメーションで表示する関数 `showCircle(cx, cy, radius)` を書け。

* `cx`, `cy` は円の中心のウィンドウ相対座標、
* `radius` は円の半径

とする。

1. ボタンの HTML コード片を書く。ブラウザーの検証コマンドを利用して構わない。
2. テンプレのスタイルシートの `width`, `height` をゼロにしておく。
3. スクリプト。

```javascript
function showCircle(cx, cy, radius){
    const circle = document.querySelector('div');
    circle.style.left = cx + 'px';
    circle.style.top = cy + 'px';
    circle.style.width = radius * 2 + 'px';
    circle.style.height = radius * 2 + 'px';
}
```

#### Animated circle with callback

単なる円ではなく、その中にメッセージを表示する必要があるとしよう。
メッセージはアニメーションが完了した後（円が最大になった時点）に表示されなければならない。そうでなければ醜く見える。

先の関数 `showCircle(cx, cy, radius)` は円を描くが、準備がいつできたかを追跡する方法を与えていない。
そこで、アニメーションが完了したときに呼び出されるコールバック引数を関数の引数リストに追加しろ。
コールバック関数は引数として円の `<div>` を受け取る必要がある。

このようにしたい：

```javascript
showCircle(150, 150, 100, div => {
    div.classList.add('message-ball');
    div.append("Hello, world!");
});
```

テキストを垂直方向に中央に置く方法がわからない。解答を見ると
`message-ball` に `line-height` を直接定義している。それでいいのか。

しかし、本問の急所はここだ：

```javascript
circle.addEventListener('transitionend', function handler() {
    circle.removeEventListener('transitionend', handler);
    callback(C);
});
```

## JavaScript animations

<https://javascript.info/js-animation> ノート。

JavaScript のアニメーションは CSS では扱えないものを扱える。
例えば、Bezier 曲線とは異なるタイミング関数で複雑な経路を移動したり、キャンバス上でアニメーションを行ったりする。

### Using setInterval

アニメーションは、一連のフレームとして実装できる。通常は、HTML/CSS のプロパ
ティーに変更を小さく加えていく。たとえば、`style.left` を 0px から 100px に変更
すると、要素が動く。そして、`setInterval()` でそれを増加させ、1 秒間に 50 回のよ
うに小さな遅延で 2px ずつ変化させると滑らかに見える。これは映画と同じ原理で、1
秒間に 24 フレームあれば十分滑らかに見える。

```javascript
let timer = setInterval(function() {
    if (style.left >= 100px){
        clearInterval(timer);
    }
    else{
        style.left += 2px;
    }
}, 20); // change by 2px every 20ms, about 50 frames per second
```

ノート：javascript - Get a number for a style value WITHOUT the "px;" suffix - Stack Overflow
https://stackoverflow.com/questions/8690463/get-a-number-for-a-style-value-without-the-px-suffix

### Using requestAnimationFrame

複数のアニメーションを同時に実行する場合を考える。
これらを別々に実行すると、それぞれに `setInterval(..., 20)` が設定されているにもか
かわらず、ブラウザーは 20ms ごとよりもずっと頻繁に再描画しなければならない。
これは、アニメーションの開始時間が異なるため、20ms ごとがアニメーションの種類に
よって異なるからだ。間隔が揃っていないのだから、20ms の中に独立した複数の実行があることになる。

```javascript
setInterval(animate1, 20); // independent animations
setInterval(animate2, 20); // in different places of the script
setInterval(animate3, 20);

// This is lighter than three independent calls:
setInterval(function() {
    animate1();
    animate2();
    animate3();
}, 20);
```

独立した複数の再描画をグループ化することで、ブラウザーが再描画するのが容易になり、
その結果、CPU 負荷が軽減し、見た目も滑らかになるはずだ。
もうひとつ注意すべきことがある。CPU に負荷がかかっていたり、再描画の頻度を少なくする理由があったり
（ブラウザーのタブが隠されているなど）するので、本当は 20ms ごとに実行するべきではない。

JavaScript でそれを知るにはどうしたらいいのか。
Animation timing という仕様があり、`requestAnimationFrame()` という関数が用意されている。
これは、これらすべてとそれ以上の問題に対応している。

```javascript
let requestId = requestAnimationFrame(callback);
```

この呼び出しにより、ブラウザーがアニメーションを行いたいときに最も近いタイミングで
関数 `callback` が実行されるようスケジュールされる。
コールバックで要素の変更を行うと、他の `requestAnimationFrame()`
コールバックや CSS アニメーションと一緒にまとめられる。そのため、幾何の再計算と
再描画は、複数回ではなく、一度だけ行われる。

戻り値 `requestId` は、呼び出しを取り消すために用いる。

```javascript
cancelAnimationFrame(requestId);
```

このコールバック関数は、ページロードの開始時点からのミリ秒単位の経過時間を引数に取る。
同じものを `performance.now()` を呼び出すことによっても得られる。
CPU に負荷がかかっていたり、ノートパソコンのバッテリーがほとんど放電していたり、
その他の理由がない限り、通常、コールバックはすぐに実行される。

以下のコードは、`requestAnimationFrame()` の最初の十回の実行の間の時間を示す。
通常、10ms から 20ms になる。

```javascript
let prev = performance.now();
let times = 0;

requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;
    if (times++ < 10) requestAnimationFrame(measure);
});
```

ノート：実際に実行するとそうでもない。

### Structured animation

### Timing functions

#### Power of n

#### The arc

#### Back: bow shooting

#### Bounce

#### Elastic animation

### Reversal: ease*

#### easeOut

#### easeInOut

### More interesting "draw"

### Summary

### Tasks

#### Animate the bouncing ball

#### Animate the ball bouncing to the right

### Comments
