---
title: Audio
---

[How to Remove Audio from Video using FFmpeg. Bonus: Add, Extract, Replace - OTTVerse](https://ottverse.com/add-remove-extract-audio-from-video-using-ffmpeg/)
より。

## ビデオから音声を引き剥がす

音声トラックが一つしかないことがわかっていれば次のようにする：

```console
ffmpeg -i videoWithAudio.mp4 -c:v copy -an videoWithoutAudio.mp4
```

特定のトラックだけを引き剥がす場合には、オプション `-map` を使う。
引数の書式はいろいろあるが、指定必須なものは `input_file_id` だ。

```text
input_file_id
input_file_id:stream_specifier
input_file_id:stream_specifier?
```

例：音声以外は入力ビデオファイルのすべてのストリームを採用したいので、先に `-map 0`
で全選択しておき、それから `-map 0:a:1` で音声に関してはそのトラック 2 を指定する。

```console
ffmpeg -i videoWithAudio.mp4 -map 0 -map 0:a:1 -copy videoOutput.mp4
```

負の map というのもある。例えば `-map -0:a:0` は音声トラック 1 を無視することを指定する。
次のコマンドは最初のコマンドと同じ結果を生じる：

```console
ffmpeg -i videoWithAudio.mp4 -map 0 -map -0:a videoWithoutAudio.mp4 
```

## ビデオに音声を追加する

追加したい音声を含むファイルを用意し、再 encode なしでストリームを混ぜる：

```console
ffmpeg -i video.mp4 -i audio.mp3 \
  -c copy \
  -map 0:v:0 -map 1:a:0 \
  videoWithAudio.mp4
```

## MP4 から音声ファイルを得る

望みなら音声を再 encode してもよい。

```console
ffmpeg -i videoWithAudio.mp4 -vn -c:a copy onlyAudio.aac
ffmpeg -i videoWithAudio.mp4 -vn -c:a libmp3lame -q:a 1 onlyAudio.mp3
```

## MP4 の音声を差し替える

上述の操作を組み合わせるよりも良い方法がある。

```console
ffmpeg -i video_with_audio.mp4 -i newAudio.wav \
  -map 0:0 -map 1:0
  -c:v copy \
  -c:a libmp3lame -q:a 1 -shortest
  video_with_newAudio.mp4
```

このコマンド例では `-map 0:0 -map 1:0` で MP4 と WAV それぞれから映像と音声をそれぞれ選択する。
入力ファイルのストリーム構成を知らないと正しい番号を指定できないことに注意。

映像は再 encode せず、音声は再 encode して新しい MP4 ファイルにまとめる。
オプション `-shortest` でストリームの長さを短い方に揃える。
