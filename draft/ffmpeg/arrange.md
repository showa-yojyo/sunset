---
title: 映像を配列する
status: RC
---

FFmpeg は複数の入力映像を縦や横に並べて組み立てることが可能だ。テキストファイル同士の
`diff` のように、微妙に異なる映像を並べる機会もありそうなので、その方法を習得しよう。

## 水平に並べる

ビデオ二つを水平に並べる方法がある。次の条件を必要とする：

1. 両者の画面高が同じであること。
2. 両者のピクセルフォーマットが同じであること。

MP4 ビデオ二つを水平に並べるコマンドはこのようなものだ：

```console
ffmpeg -i input0.mp4 -i input1.mp4 -filter_complex "hstack=inputs=2" output.mp4
```

* 映像フィルター `hstack` を用いる。これは `overlay` などの類似フィルターよりも高速に処理されるとマニュアルにある。
* 引数 `inputs` に入力数を指定することでビデオは二つだけでなく、一度のフィルターで三つ以上並べることもできる。
* 引数 `shortest` を用いて値を `1` に指定すると、尺を入力映像のうち最短の長さに合わせる。

コマンドを実行して何か黄色いメッセージが出てきたらオプション `-vsync 2` を併用してやり直す。

## 垂直に並べる

ビデオを垂直に並べるには `hstack` の代わりに `vstack` を用いる。
入力の条件は方向を考慮して `hstack` に準じる。

```console
ffmpeg -i input0.mp4 -i input1.mp4 -filter_complex "vstack=inputs=2" output.mp4
```

## グリッドレイアウト

以上を組み合わることで 2x2 レイアウトを実現することもできるが、効率がより良い
フィルター `xstack` があるのでそれを利用したい。説明が難しいので先に例を示す。簡
単のために、入力映像の画面寸法はすべて同じであると仮定する：

```console
ffmpeg \
  -i input0.mp4 -i input1.mp4 \
  -i input2.mp4 -i input3.mp4 \
  -filter_complex "xstack=inputs=4:layout=0_0|0_h0|w0_0|w0_h0:shortest=1"
  output.mp4
```

これは次のようなレイアウトになる：

```text
input0 input2
input1 input3
```

引数 `layout` の値は縦棒区切りの謎の記号だが、これで出力における各映像入力の位置を指示する。
`posx_posy` のような形式で座標を指定している。数字は序数で `w0` や `h0` はそれぞれ
入力映像 `0` の幅と高さだ。

同系統のフィルターと同様に、入力映像すべてが同一のピクセルフォーマットでなければならない。

グリッドの個数は 2 以上でも可能だし、同一の映像入力を用いてもよい。
ビートマニアの V のクリップのようなことが実現できる。

## 音声を考慮する

以上のコマンド例では音声処理を考慮しなかった。方針はいくつかあるだろう：

1. 無音声にする
2. 一つの入力音声しか残さない
3. 入力ファイルすべての音声を残す

FFmpeg ルールにより、先述のコマンド例では最初に発見された音声ストリームが適用される。
自動的に方針 2. が採用されていたわけだ。

方針 1. は出力オプションに `-an` でも指定しておけばいい。

方針 3. は何らかの音声フィルターを利用する。入力 MP4 ファイルがステレオ音声なら
ば次のようにしておけば無難だろう（グリッドレイアウトでも同様）：

```console
ffmpeg -i input0.mp4 -i input1.mp4 \
  -filter_complex "
    [0:v][1:v]vstack=inputs=2[v];
    [0:a][1:a]amerge=inputs=2[a]" \
  -map "[v]" -map "[a]" -ac 2 output.mp4
```

## 参照

* [Stack Videos Horizontally, Vertically, in a Grid With FFmpeg - OTTVerse](https://ottverse.com/stack-videos-horizontally-vertically-grid-with-ffmpeg/)
* [Vertically or horizontally stack (mosaic) several videos using ffmpeg? - Stack Overflow](https://stackoverflow.com/questions/11552565/vertically-or-horizontally-stack-mosaic-several-videos-using-ffmpeg)
