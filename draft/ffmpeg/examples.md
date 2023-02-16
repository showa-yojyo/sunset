---
title: Examples
---

## Video and Audio grabbing

割愛。WSL では動作確認できない。

## X11 grabbing

割愛。WSL では動作確認できない。

### Video and Audio file format conversion

`ffmpeg` が対応している形式なら何でも入力たり得る。使えそうな例を拾っていこう。

----

入力オプション `-s size` でコマの寸法を指定しながら音声ファイル `a.wav` と YUV
生映像ファイル `a.yuv` を MPEG ファイル `a.mpg` に変換する：

```console
ffmpeg -i a.wav -s 640x480 -i a.yuv a.mpg
```

----

`a.wav` をサンプルレート 22050Hz の MPEG 音声に変換する。
出力オプション `-ar rate` で sampling rate を指定する：

```console
ffmpeg -i a.wav -ar 22050 a.mp2
```

----

複数のフォーマットに同時に encode することができ、入力ストリームから出力ストリー
ムへの写像を定義できる：

```console
ffmpeg -i a.wav \
    -map 0:a -b:a 64k a.mp2 \
    -map 0:a -b:a 128k b.mp2
```

オプション `-map file:index` は各出力ストリームにどの入力ストリームを使うかを出
力ストリームの定義順で指定する。したがって `-map 0:a` の意味は「入力 `0` である
`a.wav` から音声 (`a`) を指定する」だ。

オプション `-b:a bitrate` は音声ビットレートを指定する。

したがって、コマンドの意味は
「`a.wav` を 64kbits の `a.mp2` と 128kbits の `b.mp2` にそれぞれ変換する」だ。

----

ビデオから画像を抽出したり、多数の画像からビデオを作成したりすることが可能だ。
前者はこう：

```console
ffmpeg -i foo.avi -r 1 -s WxH -f image2 foo-%03d.jpeg
```

このコマンドはビデオ `foo.avi` から一秒間に一コマを抽出 (`-r 1`) し、ファイル名
`foo-001.jpeg`, `foo-002.jpeg`, ... で出力する。各画像を新しい `WxH` の値に合わ
せて伸縮する。

Note: オプション `-f image2` はこの場合は指定してもしなくても同じこと。

限られた数のコマを抽出したい場合は、上記のコマンドと `-frames:v` または `-t`
を組み合わせたり、`-ss` と組み合わせて、ある時点から抽出を開始するといい。

逆に、多数の画像からビデオを作成する場合はこう：

```console
ffmpeg -f image2 -framerate 12 -i foo-%03d.jpeg -s WxH foo.avi
```

* オプション `-f image2` は前述の demuxer 版。
* オプション `-framerate 12` は `image2` 固有オプションらしい。
  ビデオストリームのフレームレートを指定する。既定値は 25 とのこと。

`foo-%03d.jpeg` という構文は C の関数 `printf` で使う構文と同じだと思っていい。
整数を受け付ける書式しか適していないが。

画像列をインポートする際、オプション `-i` は `image2` 固有オプション
`-pattern_type glob` を選択することにより、シェル風ワイルドカードパターンの展開
(globbing) も内部で扱っている。例：

```console
ffmpeg -f image2 -pattern_type glob -framerate 12 -i 'foo-*.jpeg' -s WxH foo.avi
```

----

同種のストリームを多数出力にすることが可能。次のコマンドは出力ファイル
`test12.nut` に入力ファイルの最初の四ストリームを逆順に格納する：

```console
ffmpeg -i test1.avi -i test2.avi -map 1:1 -map 1:0 -map 0:1 -map 0:0 -c copy -y test12.nut
```

* オプション `-map 1:1` は `test2.avi` からストリーム `1` を選択する。
* オプション `-map 1:0` は `test2.avi` からストリーム `0` を選択する。
* オプション `-map 0:1` は `test1.avi` からストリーム `1` を選択する。
* オプション `-map 0:0` は `test1.avi` からストリーム `0` を選択する。
* オプション `-c copy` は decoding/encoding を行わない。
* オプション `-y` はプロンプトなしで出力ファイルを上書きする。

したがって、出力ビデオの映像と音声は `test2.avi` のものが「優先」して再生する。

----

固定ビットレートビデオ出力を強制する場合:


```console
ffmpeg -i myfile.avi -b 4000k -minrate 4000k -maxrate 4000k -bufsize 1835k out.m2v
```

* `-b 4000k` は「ビットレートを 4000k とする」の意。
* `-minrate bitrate`, `-maxrate bitrate` はオプション名の示唆するとおりだろうが、
  ヘルプに記載がない。`man ffmpeg-codecs` を当たると見つかる。
  固定ビットレート指定の場合には前者が有用。
  後者を用いるときには次の `-bufsize` 指定を必要とする。
* `-bufsize integer` はレート制御バッファーサイズをビット単位で指定する。
  今回の値はどうして出てきたのか不明。
