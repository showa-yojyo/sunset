## Transition Effects

フィルター `xfade` を中心にパイプラインを組み立てる。

```console
ffmpeg \
  -i input0.mp4 \
  -i input1.mp4 \
  -filter_complex "xfade=transition=<FADE_TYPE>:
  duration=<TRANSITION_DURATION_IN_SECONDS>:
  offset=<OFFSET_RELATIVE_TO_FIRST_STREAM_IN_SECONDS>"
  output.mp4
```

* `input0.mp4` から `input1.mp4` へ transit するものだ。
* 次の引数でフィルター `xfade` を使う：

  * `<FADE_TYPE>`: `xfade` が対応する `fade`, `dissolve`, `wipeleft`, `wiperight`, etc. を指定する。
  * `<TRANSITION_DURATION_IN_SECONDS>`: 遷移を継続させる時間を指定する。
  * `<OFFSET_RELATIVE_TO_FIRST_STREAM_IN_SECONDS>`: 最初のビデオから何秒後に遷移を開始するかを秒単位で指定する。

* 最後に出力ファイルを指定する。望むなら encoding オプションを追加的に指定する。

Note: 困ったときの `settb=AVTB,fps=30`
