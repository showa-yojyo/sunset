---
title: ffplay
status: RC
---

WSLg が有効になっている必要があるが、`ffplay` でコンソールから手を離さずにビデオ
を再生することが可能だ。

```console
ffplay video.mp4
```

## 起動

例によって開始時の出力が邪魔なので、`alias` を定義しておく：

```shell
alias ffplay='ffplay -v error -hide_banner'
```

`ffmpeg` コマンドの出力結果を `ffplay` で確認するのに、ファイル出力をせずにパイプで済ませることができる。
例えば：

```console
ffmpeg -i input.mp4 ... -f matroska - | ffplay ... -
```

## キーボード操作

`ffplay` のビューワーウィンドウがアクティブになっている状態で、キーボードのキー
押しイベントをいくつか受け入れる：

| キー | コマンド |
|----------|-------|
| <kbd>q</kbd> or <kbd>ESC</kbd> | Quit. |
| <kbd>f</kbd> | Toggle full screen. |
| <kbd>p</kbd>, <kbd>SPC</kbd> | Pause. |
| <kbd>m</kbd> | Toggle mute. |
| <kbd>9</kbd> or <kbd>0</kbd> or <kbd>/</kbd> or <kbd>*</kbd> | Decrease and increase volume respectively. |
| <kbd>a</kbd> | Cycle audio channel in the current program. |
| <kbd>v</kbd> | Cycle video channel. |
| <kbd>t</kbd> | Cycle subtitle channel in the current program. |
| <kbd>c</kbd> | Cycle program. |
| <kbd>w</kbd> | Cycle video filters or show modes. |
| <kbd>s</kbd> | Step to the next frame. Pause if the stream is not already paused, step to the next video frame, and pause. |
| <kbd>left</kbd> or <kbd>right</kbd> | Seek backward/forward 10 seconds. |
| <kbd>down</kbd> or <kbd>up</kbd> | Seek backward/forward 1 minute. |
| <kbd>page down</kbd> or <kbd>page up</kbd> | Seek to the previous/next chapter. or if there are no chapters Seek backward/forward 10 minutes. |

## マウス操作

`ffplay` のビューワーウィンドウがアクティブになっている状態で、受け入れられるマウスイベントがある。

| イベント | コマンド |
|----------|----------|
| right mouse click | Seek to percentage in file corresponding to fraction of width. |
| left mouse double-click | Toggle full screen. |

## コマンドラインオプション

画面寸法指定など。

* `-autoexit`: 再生が終了すると直ちにビューワーを終了する
* `-x`: 画面幅
* `-y`: 画面高

```console
ffmpeg ... -f yuv4mpegpipe -| ffplay ... -
```
