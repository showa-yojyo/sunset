---
title: スライドショウ
status: RC
---

大量の静止画像からビデオを生成する方法を記す。
画像ファイルは共通のパターンに連番が振られているようなものを想定する：

コマンドの基本形は次のとおりで、単純な成果で良ければフィルターを用いることはなく実現できる。

```console
ffmpeg -framerate 10 -i filename-%03d.jpg output.mp4
ffmpeg -framerate 10 -i filename-%d.jpg output.mp4
ffmpeg -framerate 10 -pattern_type glob -i "filename-*.jpg" output.mp4
```

大量のファイルの名前がどうであるかによって、オプションが若干異なる。

1. `filename-%03d.jpg` or `filename-%d.jpg` パターン
2. `filename-*.jpg` パターン

パターン 2 のときに入力オプションが必要になる。

* `-framerate` で FPS 値を指定する。画像が切り替わってから次の画像に進む秒数。
* `-pattern_type glob` で画像ファイルパスをシェルのワイルドカード形式で指示することを示唆する。
  引数を引用符で囲むこと。

## 各画像の表示時間を可変にする

上記の方法だと FPS 頼みなので同じテンポで絵が切り替わる。
ビデオを連結するときに使う方法を画像に対して行えば、画像ごとに表示間隔を設定することが可能だ。
次のようなテキストファイル `input.txt` を用意する：

```text
file '/path/to/image1.png'
duration 5
file '/path/to/image2.png'
duration 1
file '/path/to/image3.png'
duration 3
...
file '/path/to/imagelast.png'
duration 2
file '/path/to/imagelast.png'
```

末端付近で `file` エントリーが重複させるのがコツとなる。二度目は `duration` を指定しない。

そして連結コマンドを実行する：

```console
ffmpeg -f concat -i input.txt -vsync vfr -pix_fmt yuv420p output.mp4
```

出力オプション `-vsync vfr` は、同じタイムスタンプを持つフレームが二つと存在しないように、
タイムスタンプのまま通過させるか、一つを除いて捨てることを指定する。

## 一枚絵のビデオを作成する

次のコマンドは画像ファイル `input.jpg` を `10` 秒間表示するだけのビデオを出力する：

```console
ffmpeg -loop 1 -i input.jpg -c:v libx264 -t 10 output.mp4
```

次のコマンドは再生時間を音楽に合わせて `input.mp3` を BGM とする MP4 ビデオを出力する：

```console
ffmpeg -loop 1 -i input.jpg -i input.mp3 -c:v libx264 -c:a copy -shortest output.mp4
```

## 参考

* [Create Video from Images using FFmpeg - OTTVerse](https://ottverse.com/create-video-from-images-using-ffmpeg/)
* [Slideshow – FFmpeg](https://trac.ffmpeg.org/wiki/Slideshow)
