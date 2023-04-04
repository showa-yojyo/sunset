---
title: Oh My Posh 利用ノート
---

## 資料

* [Introduction | Oh My Posh](https://ohmyposh.dev/docs)
* [Homebrew](https://brew.sh/)

## 目標

1. Oh My Posh を Windows と WSL Ubuntu の両方にインストールする
2. 推奨フォントを Windows にインストールする
3. 推奨フォント設定を Windows Terminal と VS Code に実施する
4. プロンプトをカスタマイズする

## 本体をインストールする

Oh My Posh 本体を Windows と WSL Ubuntu それぞれにインストール、更新、アンインストールする方法を記す。

### Windows

Oh My Posh 本体 を Windows へインストールするには `winget` を用いる。
したがって Oh My Posh を更新、アンインストールするのにも `winget` を用いる。

```doscon
winget install --id JanDeDobbeleer.OhMyPosh
winget upgrade --id JanDeDobbeleer.OhMyPosh
winget uninstall --id JanDeDobbeleer.OhMyPosh
```

インストールすると環境変数 `PATH` が更新され、パス指定なしで `oh-my-posh.exe` が実行可能になる。
インストールしたセッションのコンソールをいったん終了するといい。

この手順が完了すると、上述の実行可能ファイルとテーマ各種がインストールされる。

### WSL

シェルは Bash を想定。

> A [Homebrew](https://brew.sh/) formula is available for easy installation.
> When installing Homebrew for Linux, be sure to follow Next steps instructions
> to add Homebrew to your PATH and to your bash shell profile script, and
> Requirements to build Oh My Posh.

Homebrew についてはすでにインストール済みであるとし、ノートを割愛する。
Homebrew がなくても Oh My Posh 単品でインストールすることは可能だが、更新やアンインストールの手間を考えると前者のほうがいい。

```console
brew install jandedobbeleer/oh-my-posh/oh-my-posh
brew update && brew upgrade oh-my-posh
brew uninstall oh-my-posh
```

インストール手順が完了すると、実行形式 `$(brew --prefix)/bin/oh-my-posh` と
テーマ各種を格納するディレクトリー `$(brew --prefix oh-my-posh)/themes` が得られる。

## 推奨フォントをインストールする

フォントを別途インストールすることが推奨されている。

> Oh My Posh was designed to use [Nerd Fonts](https://www.nerdfonts.com/). Nerd Fonts are popular fonts that
> are patched to include icons. We recommend [Meslo LGM NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip), but any Nerd Font
> should be compatible with the standard themes.

リンク先からフォントをダウンロードして Windows のインストールするのかと思いきや、
Oh My Posh 自身がフォントのインストールをサポートしている。
次のコマンドを管理者権限で起動したコンソールから実行する：

```console
oh-my-posh font install
```

コンソール上にメニューが現れるので、本文で推奨されている `Meslo` を選択、決定などする。
成功するとその旨が表示される。念のため `C:\Windows\Fonts` を調べるといい。

## 推奨フォントを端末エミュレーターに設定する

次に Windows Terminal および VS Code それぞれで端末ウィンドウのフォントを指定する。
Windows Terminal のフォント設定は例えば `Settings` から
`Defaults --> Appearance` の `Font face`, `Font size` を調整して `Save` ボタンを押す。
もしくは下記のように JSON ファイルをエディターで書き換えてもよい：

> This can be easily done by modifying the Windows Terminal settings (default
> shortcut: `Ctrl + Shift + ,`). In your `settings.json` file, add the `font.face`
> attribute under the `defaults` attribute in profiles

VS Code の端末フォントの設定は `settings.json` を編集するならば
`terminal.integrated.fontFamily` を推奨フォント名 `MesloLGM NF` に指定する。

## プロンプトを Oh My Posh に割り当てさせる

Oh My Posh にプロンプト文字列を動的に構成させる方法を記す。これはシェルごとの構成になる。

### Bash

> Add the following to `~/.bashrc` (could be `~/.profile` or `~/.bash_profile` depending on your environment):
>
> ```shell
> eval "$(oh-my-posh init bash)"
> ```

自分のスタートアップファイルを確認して、環境変数 `PS1` などを初期化しているコードを含む方に追加すると整合する。
コマンド `oh-my-posh init bash` は環境変数 `PROMPT_COMMAND` を独自関数プラス既存の `PROMPT_COMMAND` で置き換える。

### PowerShell

TBW

## プロンプトをカスタマイズする

以下、Bash の場合で述べる。
先述のコマンド `oh-my-posh init` で定義される関数 `_omp_hook()` を見ればわかるように、
コマンド `oh-my-posh print primary` が Bash 環境変数 `PS1` の値を割り当てる。注目するべきは `--config="$POSH_THEME"` だ。

シェルのスタートアップに追加した `eval` 呼び出しを例えば次のように書き換える：

```shell
eval "$(oh-my-posh init bash --config ~/.omp.json)"
```

これにより環境変数 `POSH_THEME` が `~/.omp.json` に割り当てられ、`PROMPT_COMMAND` の構成はその影響を受ける。
自作テーマを与えるには、既存テーマを複製したものを編集すればいい。既存テーマの場所は後述するコツで述べる。

### Block

> [Block | Oh My Posh](https://ohmyposh.dev/docs/configuration/block)

設定オブジェクトは `blocks` という配列型属性を一つ含む。その属性をいくつか述べる。

属性 `type` の値が `rprompt` の場合、断片はキャレットの右に揃えられる。
このようなブロックは高々一つしか許されない。

属性 `newline` は値がどちらであっても、`bash` と `pwsh` の場合にはプロンプトが一行目にあるとき、シェル
セッション開始時には、最初のブロックに定義されている改行を表示しない。

属性 `overflow` は右寄せブロックに対しては、ブロックが長過ぎて左寄せのブロックか
らはみ出る場合、ブロックを壊すか、非表示にするかを指示する。

### Segment

> [Segment | Oh My Posh](https://ohmyposh.dev/docs/configuration/segment)

ブロックオブジェクトには次の型のオブジェクトからなる配列 `segments` を値とする属性がある。
この構成要素の型を Segment と呼ぶ。

以下、Segment の属性をいくつか説明する。

属性 `type` には Segment の類型を指示する文字列を与える。私が使いたいものは次のものだ：

| 値 | 意味 |
|----|------|
| `git` | 位置する Git リポジトリーの情報を示す |
| `node` | アクティブ Node.js バージョン示す |
| `npm` | アクティブ NPM バージョンを示す |
| `path` | 現在のパスを示す |
| `python` | アクティブ Python バージョンおよび仮想環境を示す |
| `root` | 現在ユーザーが root である場合に表示する |
| `shell` | 現在のシェルを示す |
| `time` | 現在時刻を書く |
| `text` | 文字列を書く |

この値によって Segment の属性 `properties` の値オブジェクトの構成が決まることに注意する。
対応 `type` を知るには、上記リンク先のページ左側の Segment ツリーを見るといい。

属性 `style` には次の選択肢がある：

| 値 | 特徴 |
|----|------|
| `powerline` | 属性 `powerline_symbol` の値により segment を分割 |
| `plain` | 透過背景に文字しかない単純な描画 |
| `diamond` | `powerline` の変種で、始点にも対応 |
| `accordion` | `powerline` の変種で、無効時でもテキストなしで描画 |

本稿では断りのない限り値 `powerline` を与えているものとする。

属性 `foreground`, `background` には文字色、背景色をそれぞれ指定する。
値の書式は `#rrggbb` 形式で指定するのが無難。透明は `transparent` とする。
より高級な属性 `foreground_templates`, `background_templates` も存在し得る。

属性 `template` がいちばん重要だ。この Segment の内容を与える Template を定義する。
文法および有効キーワードは [Templates | Oh My Posh](https://ohmyposh.dev/docs/configuration/templates)
を参照。属性 `templates` は Segment の Template 文字列を複数行にまたがるようにするものだ。
属性 `template_logic` に基づき、狙いに応じて結果となり得るものが二つある：

* `first_match`: 配列のうち最初の非空白文字列であるもの
* `join`: 配列要素すべてを評価し、非空白文字列のものすべてを結合したもの

属性 `properties` は適当なオブジェクトの配列を値にとるものであり、Segment の描画調整に主に用いられる。
属性 `include_folders` および `exclude_folders` はどの Segment においても考慮される
Property の属性であり、パス文字列の配列を値にとる。特殊な属性についてはおそらく属性
`type` により定まるものと考えられる。

## コツ

### プレビュー

1. 一時的な設定ファイルを用意する。この説明では `omp-temp.json` とする。
2. 次のコマンドを実行する：

   ```console
   oh-my-posh print primary --config omp-temp.json --shell uni
   ```

この出力が Oh My Posh プロンプト文字列だ。次で述べるコツと併用するといい。

### Segment 単位のオンオフ切り替え

> Sometimes run into a situation where you don't want to see a specific segment
> but the use-case does not justify using a conditional template. In this case
> you can use the `oh-my-posh toggle <type>` command to toggle the segment on or
> off. This works on a **per shell session basis**, meaning that if you toggle a
> segment off in one instance of a shell, it will not disable in the others.

例えばプロンプトには `type` が `python` である Segment を含んでいて現在それが表
示されるが、今はたまたま Node.js をやっているので一時的に表示をオフにしたいとす
る。こういうときに

```console
$ oh-my-posh toggle python
```

とする。直後のプロンプト表示から当該 Segment の表示がオフになる。このコマンドを
再び実行すると、Python 情報 Segment 表示がオンに戻る。

> To list the currently toggled segments, use `oh-my-posh get toggles`.

このコマンドは表示オフ Segment のすべてが一覧できる。

### インストール済みテーマを確認する

PowerShell ならば次のコマンドでインストールされているテーマとそのプレビューを一覧することが可能だ：

```powershell
Get-PoshThemes
```

Bash ならばテーマディレクトリーが次のパスにある。演習として
PowerShell `Get-PoshThemes` 相当の機能を自分で実装してみるのもありだろう。

```shell
$HOMEBREW_PREFIX/Cellar/oh-my-posh/$(oh-my-posh version)/themes
```
