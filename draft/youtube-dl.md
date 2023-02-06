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

もちろん `%(XXXX)s` などのパターンが対応する実際の値に置換される。適切な値が存在
しない場合、オプション `--output-na-placeholder` で指定された値に置換される。こ
の既定値は文字列 `NA` だ。

数値列の場合は、数値に関連する書式を使用できる。例えば、`%(view_count)05d` とす
ると、`00042` のように 5 文字までのゼロで埋め尽くされた `view_count` が文字列と
して出力される。

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

# Download entire series season keeping each series and each season in separate directory under C:/MyVideos
bash$ youtube-dl -o "C:/MyVideos/%(series)s/%(season_number)s - %(season)s/%(episode_number)s - %(episode)s.%(ext)s" https://videomore.ru/kino_v_detalayah/5_sezon/367617
```

## 精選コマンドラインオプション

GNU 様式のオプション：

* `-h`, `--help`
* `--version`

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

### Thumbnail Options

サムネイル画像を別途得ることも可能だ。

* `--write-thumbnail`: サムネイル画像も保存する。
* `--write-all-thumbnails`: サムネイル画像すべてを保存する。
* `--list-thumbnails`: サムネイル一覧情報を出力する。ビデオはダウンロードしない。

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

## 実践

### `youtube-dl` のコマンドラインオプションを確認する

```console
youtube-dl --help
```

### `youtube-dl` のバージョンを確認する

```console
youtube-dl --version
```

### ビデオをダウンロードする

オプションなしで URL を指定するだけでダウンロードは可能だ：

```console
youtube-dl https://www.youtube.com/watch?v=$VIDEO_ID
```

単純なコマンドラインだと保存ファイル名がゴチャゴチャしがちなので、なるべくオプ
ション `--id` を指定するか、またはオプション `-o` でファイル名を直接指定する。

```console
youtube-dl --id https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --output "%(id)s-%(title)s.%(ext)s" https://www.youtube.com/watch?v=$VIDEO_ID
```

### 音楽をダウンロードする

まず `-x` オプション単体だと `m4a` ファイルを保存する。

```console
youtube-dl -x https://www.youtube.com/watch?v=$VIDEO_ID
```

普通は MP3 で保存したいので、オプション `--audio-format mp3` を併用する。
これは先ほどのコマンド実行後に手動で `ffmpeg -i xxxx.m4a xxxx.mp3` を呼び出すのと同じだと考えていい。

```console
youtube-dl -x --audio-format mp3 -o "%(id)s-%(title)s.%(ext)s" "https://www.youtube.com/watch?v=$VIDEO_ID"
```

以下、コマンドライン例でオプション `-o` 指定は省略するが、実際にはなるべく指定する。

### ビデオファイル本体は要らない

オプション `--skip-download` でビデオのダウンロードを阻止できる。

### ビデオの情報だけを取得する

属性単品はオプション `--get-xxxx` を指定する。

```console
youtube-dl --skip-download --get-title https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-url https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-id https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-thumbnail https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-description https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-duration https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-filename https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --get-format https://www.youtube.com/watch?v=$VIDEO_ID
```

一度の実行で複数種類指定してもよい。

```console
youtube-dl --skip-download --get-title --get-description https://www.youtube.com/watch?v=$VIDEO_ID
```

ビデオ情報をなるべく詳細に取得するには JSON 出力を採用する。

```console
youtube-dl -j https://www.youtube.com/watch?v=$VIDEO_ID > $VIDEO_ID.json
```

ビデオごとの属性は作業するたびにコマンド `jq 'keys' < xxxx.json` で確認するほうがいい。
有用かつ YouTube の仕様が変化しても存続するであろう属性の名前を挙げておく：

* `description`: ビデオの説明文
* `duration`: ビデオの再生時間（秒？）
* `fps`: FPS (e.g. 30)
* `height`: 解像度縦幅（ドット）
* `id`: ビデオ ID 文字列
* `title`: ビデオのタイトル
* `upload_date`: アップロード日だろう
* `view_count`: 再生数だろう
* `webpage_url`: このビデオのメイン URL
* `width`: 解像度横幅（ドット）

### サムネイル

上記の阻止オプションとサムネイルオプションを併用するのが基本だ。

#### サムネイル画像の URL が欲しい

```console
youtube-dl --skip-download --get-thumbnail https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --list-thumbnails https://www.youtube.com/watch?v=$VIDEO_ID
```

#### サムネイル画像だけが欲しい

```console
youtube-dl --skip-download --write-thumbnail https://www.youtube.com/watch?v=$VIDEO_ID
youtube-dl --skip-download --write-all-thumbnails https://www.youtube.com/watch?v=$VIDEO_ID
```

### YouTube プレイリスト

ここからはプレイリストに関する操作コマンドを書き連ねていく。ビデオをダウンロード
しない操作から述べていく。

#### 情報一覧

オプション `--get-xxxx` 系はプレイリストに対しても有効だ。各ビデオに対する情報を
出力する。属性単体を見るときに手軽で便利だ。

```console
youtube-dl --skip-download --get-title https://www.youtube.com/playlist?list=$PLAYLIST_ID
youtube-dl --skip-download --get-id https://www.youtube.com/playlist?list=$PLAYLIST_ID
```

#### 情報を JSON 形式で得る

JSON 出力は二通り考えられる。単一ビデオの JSON 情報をビデオごとに反復させる方法と、オプション
`--dump-single-json` を指定する方法だ。後者のほうが良いだろう。

```console
youtube-dl -J https://www.youtube.com/playlist?list=$PLAYLIST_ID > dump-single-line.json
```

いったん JSON をファイルに保存するのを勧める。これを `jq` などで解析、整形するのが実践的だろう。

```console
jq '.entries[0] | keys' < dump-single-line.json
jq '.entries[] | [.webpage_url, .title] | join("\t")' < dump-single.json
```

`--dump-single-json` の各エントリーのキーは先述のものと同じと思われる。
しかし毎回チェックするといい。

* `n_entries`: プレイリストが含むビデオの個数
* `playlist_index`: ビデオがプレイリストにある場合、そのインデックス（これは疑問アリ）

JSON は構造的でありすぎるという場合には CSV や TSV 形式に変換するといい：

```console
jq '.entries[] | [.playlist_index, .title, .webpage_url] | @tsv' < dump-single.json
```

`webpage_url` だけをテキストファイルに保存しておいて、オプション `--batch-file`
で一括ダウンロードするという運用が考えられる。ファイルが要らなければ `-` にパイプしてもよい。

#### プレイリストのビデオをすべて取得する

最も official な手法はオプション `--download-archive` を用いるものと思われる。
これを採用すると、一度ダウンロードしたファイルは次回以降のダウンロードを省略してくれる。

```console
youtube-dl --download-archive archive.txt https://www.youtube.com/playlist?list=$PLAYLIST_ID
```

他の方法としては、上述の JSON データを用意してから、それを編集して欲しいものを部分的に得るというものがあるだろう。

TODO:

```console
youtube-dl --output "%(title)s.%(ext)s" --yes-playlist https://www.youtube.com/playlist?list=$PLAYLIST
```
