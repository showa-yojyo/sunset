---
title: Filters (libavfilter)
---

## Filtering Introduction

FFmpeg のフィルターは libavfilter ライブラリーで実装されている。
このライブラリーではフィルター一つで入力と出力を複数持つことができる。
説明のために次のような filtergraph を考える：

```console
ffmpeg -i INPUT -vf "split [main][tmp]; [tmp] crop=iw:ih/2:0:0, vflip [flip]; [main][flip] overlay=0:H/2" OUTPUT
```

本文でアスキーアートで説明されているものを改めて模式化する：

```mermaid
flowchart LR
  INPUT --> split --"[main]"--> overlay --> OUTPUT
  split --"[tmp]"--> crop --> vflip --"[flip]"--> overlay
```

* 角括弧パターンはラベルを指定
* `split`, `crop`, `vflip`, `overlay` はいずれもフィルター
* フィルター `split` はおそらくラベル複数を「出力」とする
* フィルター `overlay` はおそらくラベル複数を「入力」とする
  * 引数 `0:H/2` を取るらしい
* フィルター `crop` は映像の切り取りだろう
  * 引数 `iw:ih/2:0:0` を取るらしい
* フィルター `vflip` は垂直方向にひっくり返すのだろう
  * 引数はないらしい

引数の説明が下の方にある。

* `crop=iw:ih/2:0:0` は `=出力幅:出力高:出力位置x:出力位置y` の意。`iw`, `ih`
  はそれぞれ入力幅と入力高。座標系原点は左上だろうから（画像なので）、映像の上半分を切り抜く（残るほう）。
* `overlay=0:H/2` は主映像に重ね合わせる映像の座標を設定する。
  貼り付ける位置は画面の下半分ということになる。

## Audio

`-vf` 系。試したもの：

* `aecho`: これはかなり上手くいく。
* `afade`
* `amix`: パロディウスのアーンオーウフワーオで確認。
* `areverse`: 逆再生。普通は始点近傍をトリムしてから適用する。
* `atempo`: 単純ゆえ上手くいく。
* `atrim`: 単純ゆえ上手くいく。
* `chorus`
* `flanger`: ノーオプション。
