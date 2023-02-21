---
title: 解像度
status: WIP
---

ビデオの解像度を確認する方法と変更する方法を記す。

## ビデオの解像度を確認する

まずビデオの解像度を `ffprobe` で確認する。コマンドラインオプションを細かく指定すれば解像度だけを
`WxH` の形式で出力できる。これは目視確認用途（機械向けでない）コマンドとしたい：

```console
ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 input.mp4
```

ツールに関する一般的な注意点については [ffprobe](./ffprobe) のページを参照。

## 映像を伸縮変換する

伸縮操作の基本は映像フィルター `scale` を用いるものだろう。

```console
ffmpeg -i input.mp4 -vf scale=w=${width}:h=${height} ... output.mp4
ffmpeg -i input.mp4 -vf scale=${width}:${height} ... output.mp4
ffmpeg -i input.mp4 -vf scale=${width}x${height} ... output.mp4
```

品質が劣化するのが気になる場合は `...` に encoding 指定をする。
例えば libx264 の低速プリセットで `crf=18` を使用すると：

```console
ffmpeg -i input.mp4 -vf scale=$w:$h -preset slow -crf 18 output.mp4
```

入力画面の幅と高さをそれぞれ `iw` と `ih` で参照できる。

* 例：画面幅を二倍に拡大する `scale=iw*2:ih` この `*` はシェルに展開されない。
* 例：寸法を半分にする `scale=iw/2:ih/2` こちらは引用符で囲むこと。

### アスペクト比を保って伸縮する

FFmpeg では、アスペクト比を保ったまま動画を拡大縮小したい場合、 `height` か
`width` のどちらかの引数を値で設定し、もう一方の引数の値を `-1` に設定する。

映像形式によっては画面寸法が 2 の倍数であることを要求する。そのときは `-1` の代
わりに `-2` を指定する。

```console
ffmpeg -i input.mp4 -vf scale=320:-2 output.mp4
```

次のようにすれば最小の幅と高さを決められる。単純な方法で質の悪い拡縮を防げる：

```console
ffmpeg -i input.mp4 -vf "scale='min(320,iw)':'min(240,ih)'" output.mp4
```

## 参考

* [Resize/Scale/Change Resolution of a Video using FFmpeg Easily - OTTVerse](https://ottverse.com/change-resolution-resize-scale-video-using-ffmpeg/)
* [Scaling – FFmpeg](https://trac.ffmpeg.org/wiki/Scaling)
