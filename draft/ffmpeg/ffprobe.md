---
title: FFprobe
---

[ffprobe - Comprehensive Tutorial with 7 Examples - OTTVerse](https://ottverse.com/ffprobe-comprehensive-tutorial-with-examples/)
などから。

## 習得したいこと

* バナーを出力しない
* ストリーム指定方法
* デフォルト表示のタグを出力しない
* `-show` 系コマンド

## コマ数を得る

長くて覚えられない：

```console
ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -print_format csv input.mp4
```

出力をさらに単純にするために `-print_format default=nokey=1:noprint_wrappers=1` と変えるのもある。

## バナーを出力させない

```console
ffprobe -hide_banner
```

## 頼んでいない情報を出力させない

```console
ffprobe -v error
```

以上より、次のように `alias` しておくと良いと思われる：

```shell
alias ffprobe='ffprobe -v error -hide_banner'
```

## ストリーム指定

次のようにオプション `-select_streams` を使用してストリームを指定する。

```console
ffprobe -select_streams v:0 -show_entries stream=bit_rate
```

こんな感じのテキストが出力される：

```text
[STREAM]
bit_rate=6942554
[/STREAM]
```

タグが邪魔ならば `-print_format default=noprint_wrappers=1` を与えて取り除く。

## ファイル要素の情報を得る

* `-show_streams`
* `-show_format`
* `-show_packets`
* `-show_frames`

```console
ffprobe -select_streams v:0 -show_streams input.mp4
ffprobe -select_streams v:0 -show_packets input.mp4
ffprobe -select_streams v:0 -show_frames input.mp4
ffprobe -select_streams v:0 -show_format input.mp4
```

## 出力書式を変える

オプション `-print_format` で書式を CSV, JSON, XML, etc. から選択可能。

```console
ffprobe -print_format json -show_format input.mp4
ffprobe -print_format csv -show_format input.mp4
ffprobe -print_format xml -show_format input.mp4
```

## 属性個別の値を出力する

ここでは出力にクセのない `-print_format flat` を多用しているが、都合の良い書式で問題ない。
知りたい属性によって `-show_entries` の引数を適宜設定するのが急所だ。

```console
ffprobe -print_format flat -select_streams v:0 -show_entries stream=width,height input.mp4
ffprobe -print_format default=noprint_wrappers=1 -select_streams v:0 -show_entries packet=pts_time input.mp4 | head
ffprobe -print_format xml -show_entries stream=duration input.mp4
ffprobe -print_format flat -select_streams v:0 -show_entries frame=pict_type input.mp4 | head
ffprobe -print_format flat -select_streams v:0 -show_entries stream=bit_rate input.mp4
ffprobe -print_format flat -select_streams v:0 -show_entries stream=codec_name,codec_long_name,profile,codec_tag_string input.mp4
ffprobe -print_format flat -select_streams v:0 -show_entries stream=pix_fmt input.mp4
```

## TODO

* bit rate: 一秒当たりのデータ量と考えられる。小さ過ぎると人間の声に聞こえないなど。
* picture type: 
* pixel format: 画像形式
