---
title: Windows Subsystem for Linux GUI 利用ノート
---

## 本稿の約束事一覧

* 本稿では WSL と言えば WSL 2 を指す。これは現在正常に稼働しているとする。
* WSL の distribution は Ubuntu しかインストールしていない。以下の記述で Ubuntu
  とある部分すべてを他の distribution に置換して読んでも、機能として成立するはず
  だ。
* WSLg に関する作業だけでなく、Ubuntu パッケージを新しくインストール (`sudo apt
  install PACKAGE`) する前には必ず `sudo apt update` を実行しておく。
* 本稿執筆時の環境情報は後述。

## 目的など

画像を表示したり、音声を再生したりする Linux プログラムを正常に実行したい。ここ
でいう Linux プログラムは、結果としてそうなるものも含む。例えば、Matplotlib プ
ロットを出力する Python スクリプトなども含まれる。

メディアファイルの内容を確認するだけならば Windows 側のアプリケーションを呼び出
せば十分だが、どうしても WSL 側でウィンドウを生成したい場合がある：

* Pillow の `show` またはそれを間接的に利用するアプリケーション
* FFmpeg の `ffplay`

幸い、最近になって WSLg というものが Windows 10 の WSL でも動作するようになって
くれた。WSLg とは何か、開発陣の言葉から引用するとこうだ：

> WSLg is short for Windows Subsystem for Linux GUI and the purpose of the
> project is to enable support for running Linux GUI applications (X11 and
> Wayland) on Windows in a fully integrated desktop experience. [[1]]

コマンドラインから GUI を起動できるのはひじょうに便利なので、環境構築を確実にし
たい。

## 準備

私の環境は次のとおり。WSL が稼働しているので、WSL のインストールについては述べ
ず、 WSLg のインストール、更新、状態確認に集中して記述する。

| 項目 | 状態 |
|---------|----------------------|
| Windows | Home 10.0.19045.2908 |
| GPU | Intel ドライバー |
| WSL | WSL 2 インストール済み |

もっとも、WSL すらインストールされていない場合、それをインストールすれば WSLg も
同時にインストールされると開発陣の文書に述べられている。そちらのほうが話が早いの
で、このノートは不要かもしれない。

### WSLg 稼働実績がない場合

WSLg を一度も動作したことがない場合には Windows 側のコンソールで次のコマンドを実
行しておく必要があるはずだ：

  ```console
  wsl --update
  wsl --shutdown
  ```

コツをまとめる：

* すべての `wsl` コマンドは管理者として実行する。
* コマンド `wsl --update` は WSL と WSLg の両方を最新に更新すると覚えておいて間
  違いない。
* 変更を有効にするには WSL の再起動が要る。そのための `wsl --shutdown` だ。この
  コマンドはいつもならメモリー確保目的で実行しているものだ。

あとは GUI パッケージを Ubuntu 端末から `apt` で得て実行する。これで WSLg が有効
になっていて欲しい。

## 動作確認

WSLg のおかげで動作するアプリケーションは、Windows からでも Ubuntu からでも起動
可能だ。

WSLg インストール初期状態では、おそらく Linux GUI アプリケーションもいくつかイン
ストールされている。まずはそれが正しく起動することを確認する。Windows にわざわざ
入れていないもの、例えば ImageMagick 辺りが良い。

### Windows から

Windows メニューの Ubuntu フォルダー以下にある項目を何か選択すると、そのウィンド
ウが起動する。本稿執筆時点での私の Windows スタートメニューのショートカットの宛
先をチェックするとこうだ：

| Application | Command |
|-------------|---------|
| Caffeine (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/caffeine` |
| ImageMagick (color depth=q16) (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/display-im6.q16 -nostdin ` |
| Tilix (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/tilix` |
| WSLView (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/wslview ` |

このことから、他の Ubuntu GUI アプリケーションも同じ要領で Windows 側から実行可
能だと思われる。

### Ubuntu から

まず、上記のアプリケーションをコマンドラインから直接実行して、ウィンドウが正常に
出現することを確認したい。万が一 GUI アプリケーションが何もインストールされてい
ない場合には、Ubuntu 端末からパッケージマネージャーで適当なものをまずインストー
ルする：

```console
bash$ sudo apt install ImageMagick
```

インストールが完了すると、Ubuntu からコマンドライン実行でアプリケーションが起動
する。起動を確認したらいったん終了し、今度は Windows スタートメニューの Ubuntu
フォルダーを確認する。当該アプリケーションの起動ショートカットが新しく現れている
はずだ。このリンク追加処理はWSLg が行うものだ。

## 実践例

画像ファイル、音声ファイル、映像ファイルを好きなプログラムで表示、視聴したい。
FFmpeg をインストールすれば `ffplay` でそれらすべてを再生できる：

```console
bash$ ffplay speaking-cat.mp4
```

ImageMagick をインストールすれば、コマンド `display` で画像を専用ウィンドウに出
力できる。

```console
bash$ display funny-cat.jpg
```

## 文献

* [microsoft/wslg: Enabling the Windows Subsystem for Linux to include support
  for Wayland and X server related scenarios][1]: GitHub にある当開発サイトの
  README に目を通しておけば、少なくとも正常動作時に欲しい情報は十分得られる。異
  常時には Wiki の関連項目を当たること。

[1]: https://github.com/microsoft/wslg
