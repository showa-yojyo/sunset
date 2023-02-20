---
title: 部分ビデオ
status: WIP
---

ビデオの部分を捨てたり、同じことだが残したりする方法を記す。時間指定、時刻指定オ
プションを理解することが鍵となる。また、コマンド外での時間計算を要しない方法をな
るべく選ぶのもコツだ。

## 時間指定表

先にオプション早見表を記す。まずは一部を捨てるコマンド：

| 指定方式 | コマンド | 外で計算 |
|----------------------------|-----------------------------|------|
| 開始から指定時間だけ捨てる | `-ss DURATION -i INPUT ... OUTPUT` | NO |
| 開始から指定時刻まで捨てる | `-ss POSITION -i INPUT ... OUTPUT` | NO |
| 終了までの指定時間だけ捨てる | `-i INPUT -t DURATION ... OUTPUT` | YES |
| 指定時刻から終了まで捨てる | `-i INPUT -to POSITION ... OUTPUT` | YES |

終了時間付近のカットは時刻なり時間なりをあらかじめ計算しておかねばならない。

一部を残すコマンド：

`-sseof POSITION -i` を用いると、時刻を終端基準とし、かつ時間軸が逆向きになる。
したがって引数は負の数を指定する必要がある。

| 指定方式 | コマンド | 外で計算 |
|----------------------------|-----------------------------|------|
| 開始から指定時間だけ残す | `-i INPUT -t DURATION ... OUTPUT ` | NO |
| 開始から指定時刻まで残す | `-i INPUT -to POSITION ... OUTPUT` | NO |
| 終了までの指定時間だけ残す | `-sseof -DURATION -i INPUT ... OUTPUT` | NO |
| 指定時刻から終了まで残す | `-ss POSITION -i INPUT ... OUTPUT` | NO |

内側を残す方法は上記をどうにか組み合わせる。

* `-t duration` (input/output)
  * (input) 入力ファイルから読み込まれるデータの継続時間
  * (output) 出力が `duration` に達した後、書き込みを停止する。
* `-to position` (input/output)
  * 出力の書き込みまたは入力の読み取りを `position` で停止する。

オプション `-to` と `-t` は同時に機能しない。両方指定すると `-t` が優先される。

* `-ss position` (input/output)
  * (input) この入力ファイルの位置まで seek する。厳密には `position` にセットさ
    れないことが普通だ。
  * (output) タイムスタンプが `position` に達するまで、入力を復号しつつも捨てる。
* `-sseof position` (input)
  * `-ss` の EOF 基準バージョン。0 は EOF を指し、負の値はより BOF に近づく。

## 再エンコードをしつつ切り出す

この手の操作時に同時に再エンコード処理を試みるとフレーム精度を得られる。
見返りに、エンコード処理は少なくない時間を要する。

```console
ffmpeg -i input.mp4 -ss 00:03 -to 00:08 -c:v libx264 -crf 30 output.mp4
```

* `-c:v libx264 -crf 30`: H.264 で encode し直す。
  `-crf 30` は H.264 encoding オプションであり、この値が小さいほど品質が良い。
* `-ss`, `-to` が出力側オプションであることに注意する。

## 再エンコードなしで切り出す

再エンコードをしない場合は高速で切り出せる：

```console
ffmpeg -ss 00:00:03 -i input.mp4 -to 00:00:08 -c copy output.mp4
```

今度はオプション `-ss` が入力側に来ることに注意する。これが高速の理由の一つだ。
ただし、それゆえにフレーム正確度が落ちる。

オプション `-codec: copy` は出力側に与えると encoding を省略するので高速だ。

## 参照

* [How to Cut Video Using FFmpeg in 3 Easy Ways (Extract/Trim) - OTTVerse](https://ottverse.com/trim-cut-video-using-start-endtime-reencoding-ffmpeg/)
* [How i could cut the last 7 second of my video with ffmpeg? - Super User](https://superuser.com/questions/744823/how-i-could-cut-the-last-7-second-of-my-video-with-ffmpeg)
