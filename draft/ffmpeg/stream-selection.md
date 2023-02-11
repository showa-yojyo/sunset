---
title: Stream Selection
---

ここはオプション `-map` に関する説明だ。

`ffmpeg` には各出力ファイルのストリーム選択を手動で制御するためのオプション
`-map` がある。ユーザーは `-map` を飛ばして、以下に述べられる `ffmpeg` にスト
リームを自動的に選択させることができる。オプション `-vn`, `-an`, `-sn`, `-dn`
は、複雑なフィルタグラフー出力であるストリームを除き、手動で map されたか自動的
に選択されたかにかかわらず、映像、音声、字幕、データストリームを含めるのを飛ばす
のに使用できる。

## 4.1 Description

本節ではストリーム選択に関わる様々な規則について述べる。それから、これらの規則が
どのように適用されるかを例を挙げて示す。

### 4.1.1 Automatic stream selection

特定の出力ファイルに map オプションがない場合、`ffmpeg` は出力フォーマットを検査
し、映像、音声、字幕など、どの種類のストリームを含められるかを検査する。許容され
るストリーム種別ごとに、入力すべてから一つのストリームを（利用可能である限り）選
択する。

ストリーム選択基準は次に基づく：

* 映像は最も解像度の高いストリーム
* 音声は最も多くのチャンネルを含むストリーム
* 字幕は、最初に発見した副字幕ストリームになる。注意点：出力形式の既定の字幕エン
  コーダーは、文字ベースか画像ベースのどちらかで、同じ種類の字幕ストリームだけが
  選択される。

同種のストリームで等しく評価されるものが複数ある場合、最低インデックスストリーム
が選択される。

データまたは添付ストリームに関しては自動的に選択されることはない。`-map` 指定時
にしか採用されない。

### 4.1.2 Manual stream selection

オプション `-map` が使用された場合、ユーザーマップストリームしか出力ファイルに含まれない。
ただし、以下で述べられる filtergraph 出力に関する例外がある。

### 4.1.3 Complex filtergraphs

ラベルのないパッドを持つ複雑な filtergraph 出力ストリームがある場合、それらは最
初の出力ファイルに追加される。これは、そのストリーム種別が出力フォーマットで対応
されていない場合、致命的なエラーになる。map オプションがない場合、これらのスト
リームを含めると、その種別のストリーム自動選択が飛ばされることになる。map オプ
ションが存在する場合、マップされたストリームに加えて、これらの filtergraph スト
リームが含まれる。

ラベル付きパッドを持つ複雑な filtergraph 出力ストリームは、一度だけ、正確にマッ
プされなければならない。

----

TODO: ラベルとは？ パッドとは？

### 4.1.4 Stream handling

ストリーム処理はストリーム選択に依存しない（例外は後述する字幕）。ストリーム
処理は、特定の出力ファイル内のストリームに指定されたオプション `-codec` によって
設定される。特に、codec オプションは、ストリーム選択処理の後に `ffmpeg` が適用す
るため、後者に影響を与えない。オプション `-codec` が指定されていないストリーム種
別に対しては、`ffmpeg` は出力ファイルの muxer によって登録された既定の encoder
を選択する。

### 4.2 Examples

次の例は `ffmpeg` のストリーム選択方法の動作、癖、制限を説明するためのものだ。
次のような入力ファイルがあるとする（三つすべてを入力とする）：

```text
input file 'A.avi'
    stream 0: video 640x360
    stream 1: audio 2 channels

input file 'B.mp4'
    stream 0: video 1920x1080
    stream 1: audio 2 channels
    stream 2: subtitles (text)
    stream 3: audio 5.1 channels
    stream 4: subtitles (text)

input file 'C.mkv'
    stream 0: video 1280x720
    stream 1: audio 2 channels
    stream 2: subtitles (image)
```

メモ：このような情報はファイルに対して `ffprobe` を実行すれば確認できる。

#### Example: automatic stream selection

```console
ffmpeg -i A.avi -i B.mp4 out1.mkv out2.wav -map 1:a -c:a copy out3.mov
```

出力ファイルは三つ指定されている。最初の二つ (`out1.mkv`, `out2.wav`) はオプショ
ン `-map` がないので、これらのファイルストリームを自動選択する。

`out1.mkv` は Matroska コンテナーファイルで、映像、音声、字幕のストリームを受け付ける。
よって、`ffmpeg` は各種別の一つを選択しようとする：

* 映像：すべての入力ビデオストリームの中で最も解像度の高いものは `B.mp4` のスト
  リーム 0であるので、それを選択する。
* 音声：チャンネル数が最も多い `B.mp4` からストリーム 3 を選択する。
* 字幕：`A.avi` と `B.mp4` のうち最初の字幕ストリームである `B.mp4` からストリー
  ム 2 を選択する。

`out2.wav` は音声ストリームのみを受け付ける。したがって、`B.mp4` のストリーム 3
のみが選択される。

For out3.mov, since a -map option is set, no automatic stream selection will occur. The -map 1:a option will select all audio streams from the second input B.mp4. No other streams will be included in this output file.

For the first two outputs, all included streams will be transcoded. The encoders chosen will be the default ones registered by each output format, which may not match the codec of the selected input streams.

For the third output, codec option for audio streams has been set to copy, so no decoding-filtering-encoding operations will occur, or can occur. Packets of selected streams shall be conveyed from the input file and muxed within the output file.

#### Example: automatic subtitles selection

```console
ffmpeg -i C.mkv out1.mkv -c:s dvdsub -an out2.mkv
```

Although out1.mkv is a Matroska container file which accepts subtitle streams, only a video and audio stream shall be selected. The subtitle stream of C.mkv is image-based and the default subtitle encoder of the Matroska muxer is text-based, so a transcode operation for the subtitles is expected to fail and hence the stream isn’t selected. However, in out2.mkv, a subtitle encoder is specified in the command and so, the subtitle stream is selected, in addition to the video stream. The presence of -an disables audio stream selection for out2.mkv.

#### Example: unlabeled filtergraph outputs

```console
ffmpeg -i A.avi -i C.mkv -i B.mp4 -filter_complex "overlay" out1.mp4 out2.srt
```

A filtergraph is setup here using the -filter_complex option and consists of a single video filter. The overlay filter requires exactly two video inputs, but none are specified, so the first two available video streams are used, those of A.avi and C.mkv. The output pad of the filter has no label and so is sent to the first output file out1.mp4. Due to this, automatic selection of the video stream is skipped, which would have selected the stream in B.mp4. The audio stream with most channels viz. stream 3 in B.mp4, is chosen automatically. No subtitle stream is chosen however, since the MP4 format has no default subtitle encoder registered, and the user hasn’t specified a subtitle encoder.

The 2nd output file, out2.srt, only accepts text-based subtitle streams. So, even though the first subtitle stream available belongs to C.mkv, it is image-based and hence skipped. The selected stream, stream 2 in B.mp4, is the first text-based subtitle stream.

#### Example: labeled filtergraph outputs

```console
ffmpeg -i A.avi -i B.mp4 -i C.mkv -filter_complex "[1:v]hue=s=0[outv];overlay;aresample" \
       -map '[outv]' -an        out1.mp4 \
                                out2.mkv \
       -map '[outv]' -map 1:a:0 out3.mkv
```

The above command will fail, as the output pad labelled [outv] has been mapped twice. None of the output files shall be processed.

```console
ffmpeg -i A.avi -i B.mp4 -i C.mkv -filter_complex "[1:v]hue=s=0[outv];overlay;aresample" \
       -an        out1.mp4 \
                  out2.mkv \
       -map 1:a:0 out3.mkv
```
This command above will also fail as the hue filter output has a label, [outv], and hasn’t been mapped anywhere.

The command should be modified as follows,

```console
ffmpeg -i A.avi -i B.mp4 -i C.mkv -filter_complex "[1:v]hue=s=0,split=2[outv1][outv2];overlay;aresample" \
        -map '[outv1]' -an        out1.mp4 \
                                  out2.mkv \
        -map '[outv2]' -map 1:a:0 out3.mkv
```

The video stream from B.mp4 is sent to the hue filter, whose output is cloned once using the split filter, and both outputs labelled. Then a copy each is mapped to the first and third output files.

The overlay filter, requiring two video inputs, uses the first two unused video streams. Those are the streams from A.avi and C.mkv. The overlay output isn’t labelled, so it is sent to the first output file out1.mp4, regardless of the presence of the -map option.

The aresample filter is sent the first unused audio stream, that of A.avi. Since this filter output is also unlabelled, it too is mapped to the first output file. The presence of -an only suppresses automatic or manual stream selection of audio streams, not outputs sent from filtergraphs. Both these mapped streams shall be ordered before the mapped stream in out1.mp4.

The video, audio and subtitle streams mapped to out2.mkv are entirely determined by automatic stream selection.

out3.mkv consists of the cloned video output from the hue filter and the first audio stream from B.mp4.
