---
title: FFmpeg 利用ノート
---

## 基本

`ffprobe -i INPUT_FILE`
    ビデオの情報を確認する

* フォーマット変換
  * `ffmpeg -i INPUT.{EXT1,EXT2}`: 基本形
  * その他オプションあり版

* ビデオ再生の一部をトリム

  `ffmpeg -i INPUT -ss STARTTS -to ENDTS -c copy OUTFILE`

* ビデオから音声を捨てる
* ビデオから音声を引き抜く
  * `ffmpeg -i INPUT.EXT1 -vn -acodec copy OUTPUT.mp3`
* ビデオに音声をかぶせる
* スナップショット画像
  * `ffmpeg -y -ss 00:$i -i $INPUT -frames:v 1 -q:v 2 ${OUTPUT}.jpg`
  * `ffmpeg -y -ss 00:$i -i $INPUT -vf scale='trunc(ih*dar):ih',setsar=1/1 -frames:v 1 -q:v 2 ${OUTPUT}.jpg`

## 基本オプション

`ffmpeg` の実行コマンドラインは次の形式をとり、中括弧部分は必須、角括弧はオプショナルだ：

```text
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...
```

* `-hide_banner` (global) バナー出力をさせない。
* `-loglevel [flags+]loglevel` (global)
  * ライブラリーが使用するログレベルとフラグを指定する。引数は `+` で区切って指定。
  * 例 `repeat+level+error`
* `-v [flags+]loglevel`: `-loglevel` と同じ。

### よく使うオプション

#### 主要オプション

* `-f fmt` (input/output): 入力ファイルまたは出力ファイルの形式を強制する。
* `-i input_url` (input) 処理の入力となるビデオのパスだ。複数あり得る。
* `-y` (global) 出力ファイルがすでに存在する場合、構わず上書き保存する。

* `-c[:stream_specifier] codec` (input/output, per-stream)
  * 出力前の指定は対象ストリームの encoder を、入力前の指定は decoder をそれぞれ決める。
    * 引数 `codec` は decoder / encoder の名前、または文字列 `copy` を指定する。
    * 変換用途で encoder を指定することが多い。
    * オプション `-c` は後に指定されたものが優先される。CSS のようなものだ。
  * `-c` は `-codec` の短縮形。

* `-t duration` (input/output)
  * (input) 入力ファイルから読み込まれるデータの継続時間
  * (output) 出力が `duration` に達した後、書き込みを停止する。
* `-to position` (input/output)
  * 出力の書き込みまたは入力の読み取りを `position` で停止する。

オプション `-to` と `-t` は同時に機能しない。両方指定すると `-t` が優先される。

* `-ss position` (input/output)
  * (input) この入力ファイルの位置まで seek する。厳密には `position` にセットされないことが普通だ。
  * (output) タイムスタンプが `position` に達するまで、入力を復号しつつも捨てる。

時間ではなくコマ数で指定するオプションもある：

* `-frames[:stream_specifier] framecount` (output,per-stream)
  * `framecount` コマ後に出力ストリームへの書き込みを停止する。
  * 例 `-frames:v 1`: 最初のコマだけ書き出す。

* `-q[:stream_specifier] q` (output,per-stream)
  * VBR, 固定品質スケールを使用する。このオプションの意味はコーデックに依存する。
  * `stream_specifier` なしで使用された場合、映像ストリームにのみ適用される。
* `-qscale`: `-q` と同じ。

フィルター関係：

* `-filter[:stream_specifier] filtergraph` (output,per-stream)
  * フィルターグラフを作成し、それを使ってストリームにフィルターをかける。
  * 引数 `filtergraph` はストリームに適用するフィルターグラフの記述。ストリームが同じ種類
    である入力と出力を持つ必要がある。入力と出力はラベル `in`, `out` にそれぞれ関連付けられる。
  * 複数の入出力を必要とするグラフを定義するには、オプション `-filter_complex` を使う。

#### 映像

* `-vframes number` (output): `-frames:v number` と同じ。
* `-r[:stream_specifier] fps` (input/output,per-stream)
  * フレームレートを Hz 単位で指定する。
* `-vn` (input/output): 映像を無効にする。
  * (input) ファイルの音声ストリームすべてがフィルターされたり、自動選択や、特定の出力に写像されたりするのを防ぐ。cf. `-discard`
  * (output) ビデオ録画を無効にする。つまり、特定の映像ストリームの自動選択または写像を無効にする。cf. `-map`
* `-vcodec codec` (output): `-c:v` と同じ。
* `-vf filtergraph`: `-filter:v` と同じ。

ここからはドキュメントに記載が見つからないオプション。運用例は普通にある。

* `-b:v BPS`
  * ビデオのビットレートを指定する。
  * 例 `-b 4000k`
* `-minrate BPS`: ビデオのビットレート上限を指定
* `-maxrate BPS`: ビデオのビットレート下限を指定
* `-bufsize BITS`: バッファー容量を指定

#### 映像オプション上級

* `-pix_fmt[:stream_specifier] format` (input/output,per-stream)

#### 音声

* `-ar[:stream_specifier] freq` (input/output,per-stream)
  * 音声サンプリング頻度を指定。
  * 例 `-ar 44100`
* `-ac[:stream_specifier] channels` (input/output,per-stream)
  * 音声チャンネルの数を指定する。
  * 例 `-ac 2`
  * (input) 既定では 1 に設定される。
  * (output) 既定では入力にある音声チャンネルと同じ数に設定される。
* `-an` (input/output): マップブロック
  * (input) ファイルの音声ストリームすべてがフィルターされたり、自動的に選択さ
    れたり、任意の出力に写像されたりするのを防ぐ。
  * (output) 指定の音声ストリームの自動選択または写像を無効にする。cf. `-map`.
* `-acodec codec` (input/output): `-c:a` と同じ。
* `-af filtergraph`: `-filter:a` と同じ。

#### 上級オプション

* `-map [-]input_file_id[:stream_specifier][?] | [linklabel]` (output)
* `-filter_complex filtergraph` (global)


* `-strict`: ????

#### 不明オプション

* `-crf`: ????
* `-safe`: ????
* `-vb`: ????

### 時間指定

オプション `-ss`, `-to`, etc. で指定可能な引数の書式を記す：

1. `[-][HH:]MM:SS[.m...]`
2. `[-]S+[.m...][s|ms|us]`

ここで、角括弧内はオプショナル。縦棒は選択、各記号の意味は次のとおり：

* `-` 負の量であることを指定する
* `HH` 時間数
* `MM` 分数（最大二桁）
* `SS` 秒数（最大二桁）
* `S+` 秒数
* `.m...` 部分は `SS` に対する小数点以下
* リテラル接尾辞 `s`, `ms`, `us` は、それぞれ秒、ミリ秒、マイクロ秒であることを定する

### stream_specifier

コマンドラインオプションで per-stream 印が付いているものにはストリームを指定できる。
`stream_specifier` は対象オプションをどのストリームに適用するかを指示するパターンだ。

`stream_specifier` は、オプション名の後に `:` で区切られたパターンだ。例えば、

```text
-codec:a:1 ac3
```

は `a:1` 部分が `stream_specifier` であり、意味は「2 番目 (`1` + 1) の音声ストリーム (`a`)」だ。
したがって、オプション全体の意味は「二番目の音声ストリームに対して `ac3` コーデックを選択する」だ。

`stream_specifier` は複数のストリームにマッチさせることができる。
その場合、ストリームすべてに対象オプションが適用される。

空の `stream_specifier` はストリームすべてにマッチする。
例えば、`-codec copy` はすべてのストリームを（再エンコードなしに）コピーする。

## 未確認コマンド

* スケーリング `-vf scale=[width]:[height]`
  * `ffmpeg -i input.avi -vf scale=320:240 output.avi`
* 直角回転
* 最適化

## 参考・パクリ元

* [ffmpeg Documentation](https://ffmpeg.org/ffmpeg.html)
* [ffmpeg Tips](https://fabacademy.org/2020/labs/kannai/students/tatsuro-homma/project/ffmpeg.html)
* [FFmpeg - tips and tricks &#x7c; There and back again](https://www.preining.info/blog/2022/11/ffmpeg-tips-and-tricks/)
