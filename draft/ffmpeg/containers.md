---
title: Containers
---

## MP4 ファイルを連結する

二つ以上の MP4 ファイルを自然に連結することだけでなく、音声だけまたは映像だけを
連結したり、ディレクトリー内のすべてのビデオを連結したり、画面寸法の異なるビデオ
を連結したりすることも可能だ。

### 基本形

いちばん単純な場合は画面寸法、ピクセルフォーマット、codec などが同じである MP4
ファイル二つを連結するものだ。処理は二段階からなる：

1. 連結したいファイルの名前とパスが記載されたテキストファイルを用意する
2. このテキストファイルを `ffmpeg` コマンドに与える

テキストファイルの内容は次のようなものだ：

```text
file '/path/to/input0.mp4'
file '/path/to/input1.mp4'
```

コマンドラインはこうなる：

```console
ffmpeg -f concat -safe 0 -i fileList.txt -c copy output.mp4
```

* `-f concat`: demux を `concat` とする。
* `-safe 0`: ファイルパスに対するチェックを大甘にする。

### 異なるストリームのビデオファイルを連結する

このような場合にはファイルを連結する前に再エンコードする必要がある。

* 結合前のファイルに対して再エンコードする。結合する前に品質を正確に制御できる。
* 映像フィルターのほうの `concat` を用いる。

後者の例は次のようなものだ。出力オプションで encode 処理を入れる余地があることに注意。

```console
ffmpeg -i input0.mp4 -i input1.mp4 -i input2.mp4 \
  -filter_complex "[0:v] [0:a] [1:v] [1:a] [2:v] [2:a] 
    concat=n=3:v=1:a=1 [vv] [aa]" \
  -map "[vv]" -map "[aa]" output.mp4
```

### 中間ファイル形式を使用して連結する

ビデオファイルを TS フォーマットに変換すると直接連結が可能になる。

```console
ffmpeg -i input.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts obj.ts
```

* `-bsf:v h264_mp4toannexb`: ビットストリームフィルター指定。ビットストリーム
  フィルターは、符号化されたストリームデータに対して動作し、復号なしでビットスト
  リームレベルの変更を行うものだ。

TS ファイルを普通の `cat` を実行するか、FFmpeg の `concat` コマンドを使えばいい。

```console
cat obj0.ts obj1.ts > output.ts
ffmpeg -i "concat:obj0.ts|obj1.ts" -c copy -bsf:a aac_adtstoasc output.mp4
```
