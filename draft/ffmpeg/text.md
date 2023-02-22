---
title: テキスト
status: WIP
---

フィルター `drawtext` を使用してテキストを画面に動的に重ね合わせる。
タイムコード、解像度、ウォーターマークを表示するのに使える。
また、フォント、フォントサイズ、位置、背景色、整列、複数行などの設定方法を見ていく。

いちばん単純な描画例：

```console
ffplay -vf "drawtext=text='東京都新宿区
新宿中央公園':fontfile=/usr/share/fonts/opentype/ipaexfont-mincho/ipaexm.ttf:
  x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=deeppink"
```

* `text` の値は描画するテキスト自体。上の例では改行文字を含む。長い文字列を扱うには
  `textfile` を採用することを検討したい。
* `fontfile` の指定が煩雑なのが気になるが、解決を後回しにする。
* `fontsize`, `fontcolor` はその名前のとおりの値を取る。単位？
* その他 `x`, `y` はよそでも見かける引数。

ウィンドウにテキストを描く例：

```console
ffmpeg -i input.mp4 -vf "drawtext=text='東京都新宿区
新宿中央公園':fontfile=/usr/share/fonts/truetype/fonts-japanese-gothic.ttf:
  x=(w-text_w)/2:y=(h-text_h)/2:
  fontsize=20:
  fontcolor=white:
  box=1:boxcolor=black@0.5:boxborderw=20" \
  -c:a copy output.mp4
```

* `box`: テキストの周囲に枠を描く (`1`) かどうか。
* `boxborderw`: その枠の太さ。
* `boxcolor`: テキストを囲む箱を描くときに塗る色。

映画のスタッフロールのようなもの：

```console
ffmpeg -i input.mp4 -vf "drawtext=textfile=credits.txt:
  x=0:y=h-80*t:
  fontfile=/usr/share/fonts/truetype/fonts-japanese-gothic.ttf:
  fontsize=12:fontcolor=white@0.9:
  box=:boxcolor=black@0.6" \
  -c:a copy drawtext-credits.mp4
```
