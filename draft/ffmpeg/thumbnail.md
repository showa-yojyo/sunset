---
title: 静止画像抽出
status: WIP
---

既存のビデオファイルから静止画像をキャプチャーする方法のノート。

## ビデオから時刻を指定して静止画像を切り出す

```console
ffmpeg -i input.mp4 -ss 00:00:03 -frames:v 1 output.jpg
```

オプション `-ss` などの時間指定方法に関しては基本編を参照。出力オプションとして指定することを覚えておくこと。

オプション `-frames:v 1` は `1` フレーム後にストリームへの書き込みを停止するように指示するものだ。

## ビデオから定期的に静止画像を切り出す

いろいろとオプションを盛り込んでいるが、要点は encoding オプションを同時に追加できることと、
出力ファイルの形式を静止画像のものにすることの二点だ。

```console
ffmpeg -i output.mp4 -r 1 -f image2 screenshot-%03d.jpg
```

* オプション `-r 1` は 1Hz を意味する。すなわち一秒間に一枚。
* オプション `-f image2` は先述のとおり。
* 引用元 (OTTVerse) の述べる通り、フレーム精度は高いというわけではない。

以上に記したコマンドのどれでも、出力オプションとして映像操作各種を指定することもできる。
例えば `-s 1280x720` などを入力ファイル名から出力ファイル名の間に置いてもいい。

## TODO

* ビデオにサムネイルを定義する

## 参照

* [Thumbnails &amp; Screenshots using FFmpeg - 3 Efficient Techniques - OTTVerse](https://ottverse.com/thumbnails-screenshots-using-ffmpeg/)
