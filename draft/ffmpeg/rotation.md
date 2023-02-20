---
title: 回転・反転
status: RC
---

映像を 90 度回転させたり反転させたりする技法を覚えておくと何かのときに助かる。それを習得しよう。

## 回転

映像フィルター `transpose` の基本形は次のとおり：

```console
ffmpeg -i input.mp4 -vf "transpose=dir=1" -c:a copy output.mp4
```

引数 `dir` の値は数字かキーワードで指定できる。都合の良いほうを使っていい：

| number | id | transform |
|-----|-----|----------|
| 0 | cclock_flip | +90 度回転してミラー |
| 1 | clock | -90 度回転
| 2 | clock | +90 度回転
| 3 | clock_flip | -90 度回転してミラー |

有効な値には `4`..`7` もあるが、これは非推奨だ。代わりに後述の引数を指示する。

180 度回転は `transpose` を合成すれば実現できる。

FFmpeg に縦長・横長を判定させて必要な場合に限り回転させるというコマンドもあり得る。
引数 `passthrough=landscape` 等を指定する。「横長ならば横長のままとする」の指示を意味する：

```console
ffmpeg -i input.mp4 -vf "transpose=dir=2:passthrough=landscape" -c:a copy output.mp4
```

## 反転

映像フィルター `hfilter`, `vfilter` を用いる。オプションがないので紛れもない。

```console
ffmpeg -i input.avi -vf "hflip" -c:a copy output.avi
ffmpeg -i input.avi -vf "vflip" -c:a copy output.avi
```

## 参照

* [How to Rotate A Video using FFmpeg Easily - OTTVerse - OTTVerse](https://ottverse.com/rotate-a-video-using-ffmpeg-90-180/)
* [rotation - Rotating videos with FFmpeg - Stack Overflow](https://stackoverflow.com/questions/3937387/rotating-videos-with-ffmpeg)

