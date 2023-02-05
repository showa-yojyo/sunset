---
title: youtube-dl 利用ノート
---

<https://github.com/ytdl-org/youtube-dl/blob/master/README.md>

```console
bashbash$ youtube-dl --version
2021.12.17
```

## このツールは何であるのか

> youtube-dl - download videos from youtube.com or other video platforms
>
> youtube-dl is a command-line program to download videos from YouTube.com and
> a few more sites. It requires the Python interpreter, version 2.6, 2.7, or
> 3.2+, and it is not platform specific. It should work on your Unix box, on
> Windows or on macOS. It is released to the public domain, which means you can
> modify it, redistribute it or use it however you like.

基本構文：

```console
bash$ youtube-dl [OPTIONS] URL [URL...]
```

## インストール

WSL2 に最初から入っていたのでそのまま使う。実態は Python スクリプトなので、仮にシステムになかったとしてもどうにでもなる。

## 構成

* `/etc/youtube-dl.conf`
* `$HOME/.config/youtube-dl/config`

## 保存ファイル名のテンプレート

オプション `-o`, `--output TEMPLATE` は保存ファイル名のテンプレートを指定する重
要なものだ。基本は `youtube-dl -o OUTPUT_PATH URL` のように指定する。

`OUTPUT_PATH` に Python の文字列書式の要領で特別なパターンを含めることも可能だ。
例えば `%(NAME)s` や `%(NAME)05d` のようなものだ。
`youtube-dl` で有効な `%(XXXX)` のうち、よく使うものの一覧を記しておく：

TBW

もちろん `%(XXXX)` などのパターンが対応する実際の値に置換される。適切な値が存在
しない場合、オプション `--output-na-placeholder` で指定された値に置換される。こ
の既定値は文字列 `NA` だ。

数値列の場合は、数値に関連する書式を使用できる。例えば、`%(view_count)05d` とす
ると、`00042` のように 5 文字までのゼロで埋め尽くされた view count が文字列とし
て出力されます。

出力テンプレートには任意の階層パスを含めてもよい。たとえば、

```text
-o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s
```

とすると、結果としてこのパステンプレートに対応するディレクトリーに各ビデオをダウ
ンロードする。見つからないディレクトリーがあれば自動的に作成する。

### 例

```console
bash$ youtube-dl --get-filename -o '%(title)s.%(ext)s' BaW_jenozKc
youtube-dl test video ''_ä↭𝕐.mp4    # All kinds of weird characters

bash$ youtube-dl --get-filename -o '%(title)s.%(ext)s' BaW_jenozKc --restrict-filenames
youtube-dl_test_video_.mp4          # A simple file name

# Download YouTube playlist videos in separate directory indexed by video order in a playlist
bash$ youtube-dl -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' https://www.youtube.com/playlist?list=PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re

# Download all playlists of YouTube channel/user keeping each playlist in separate directory:
bash$ youtube-dl -o '%(uploader)s/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' https://www.youtube.com/user/TheLinuxFoundation/playlists

# Download Udemy course keeping each chapter in separate directory under MyVideos directory in your home
bash$ youtube-dl -u user -p password -o '~/MyVideos/%(playlist)s/%(chapter_number)s - %(chapter)s/%(title)s.%(ext)s' https://www.udemy.com/java-tutorial/

# Download entire series season keeping each series and each season in separate directory under C:/MyVideos
bash$ youtube-dl -o "C:/MyVideos/%(series)s/%(season_number)s - %(season)s/%(episode_number)s - %(episode)s.%(ext)s" https://videomore.ru/kino_v_detalayah/5_sezon/367617

# Stream the video being downloaded to stdout
bash$ youtube-dl -o - BaW_jenozKc
```

## FAQ

次のコマンドは初回実行時とそれ以降とで挙動が異なる：

```console
bash$ youtube-dl --download-archive archive.txt "https://www.youtube.com/playlist?list=PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re"
```

## 精選コマンドラインオプション

* `--list-extractors`: TODO
* `--extractor-descriptions`: TODO
* `--flat-playlist`: プレイリストの動画は抽出せず、一覧表示しかしない。これを多用したい。

### Video Selection

プレイリストの部分集合を取得するのに有用なオプション：

* `--playlist-start NUMBER`
* `--playlist-end NUMBER`
* `--playlist-items ITEM_SPEC`: 番号直接指定。書式は `curl` に似ているか？

```console
# Download only the videos uploaded in the last 6 months
bash$ youtube-dl --dateafter now-6months

# Download only the videos uploaded on January 1, 1970
bash$ youtube-dl --date 19700101

$ # Download only the videos uploaded in the 200x decade
bash$ youtube-dl --dateafter 20000101 --datebefore 20091231
```

タイトル文字列の正規表現マッチによる問い合わせオプション：

* `--match-title REGEX`: マッチするものしか扱わない。
* `--reject-title REGEX`: マッチするものを扱わない。

タイムスタンプによる問い合わせオプション。ダウンロード済みなものを手動で除けるときに指定するか：

* `--date DATE`
* `--datebefore DATE`: 指定日付またはそれ以前のビデオを扱う。
* `--dateafter DATE`: 指定日付またはそれ以降のビデオを扱う。

### Filesystem Options

一括ダウンロード用（再利用性があるので有用）：

* `-a`, `--batch-file FILE`: URL 一覧ファイルを与えてダウンロードさせる。

保存ファイルの名前に関するオプション：

* `--id`: 保存ファイル名をビデオの ID ベースにする。
* `-o`, `--output TEMPLATE`: このオプションは重要なので別途述べる。

### Verbosity / Simulation Options

* `-q`, `--quiet`: 他のツールでよく目にするそれと同じ意味。
* `-v`, `--verbose`: 他のツールでよく目にするそれと同じ意味。

* `-s`, `--simulate`: ビデオをダウンロードさせないし、何もディスクに保存させない。
* `--skip-download`: ビデオをダウンロードさせない。

* `-e`, `--get-title`: タイトルを出力。`-qs` を暗黙に含む。
* `--get-id`: ビデオの ID を出力。`-qs` を暗黙に含む。
* `--get-duration`: ビデオの再生時間。`-qs` を暗黙に含む。
* `--get-filename`: ビデオのファイル名。これは保存時に考慮される？`-qs` を暗黙に含む。

* `-j`, `--dump-json`: JSON 形式でビデオの情報を得る。`-qs` を暗黙に含む。
* `-J`, `--dump-single-json`: 各コマンドライン引数の JSON 情報を表示。`-qs` を暗黙に含む。
* `--print-json`: JSON 形式で情報を得る。かつビデオもダウンロードする。`-q` を暗黙に含む。

### Video Format Options

* `-f`, `--format FORMAT`: TODO 後回し
* `-F`, `--list-formats`: 有効な映像形式すべてを得る。

### Post-processing Options

* `-x`, `--extract-audio`: ビデオを音声のみのファイルに変換する。要 FFmpeg, etc.
* `--audio-format FORMAT`: 音声形式を指定する。上記オプションと共に指定する。
