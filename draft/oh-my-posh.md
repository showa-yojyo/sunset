---
title: Oh My Posh 利用ノート
---

> Oh My Posh is a custom prompt engine for any shell that has the ability to
> adjust the prompt string with a function or variable.

本稿では次を目標とする：

1. Oh My Posh を Windows と WSL Ubuntu の両方にインストールする
2. 推奨フォントを Windows にインストールする
3. 推奨フォント設定を Windows Terminal と Visual Studio Code に実施する
4. プロンプトに Oh My Posh を組み込む
5. プロンプトをカスタマイズする

実施する事柄を表にまとめる：

| タスク | Windows | Ubuntu |
|--------|---------|--------|
| Oh My Posh をシステムにインストールする | Yes | Yes |
| 推奨フォントを設定する | Yes | No |
| プロンプトに Oh My Posh を組み込む | Yes | Yes |
| プロンプトを構成する | Yes/No | No/Yes |

次を事前条件をする（本ノート当該項目それぞれを参照）：

* WSL は導入済みであり、Distribution は Ubuntu であるとする。さらにシェルは Bash
  であるとする。
* Windows Terminal は導入済みであるとする。そこでは WSL も PowerShell も対応済み
  とする。
* Visual Studio Code は導入済みであるとする。

## 資料

* [Introduction | Oh My Posh](https://ohmyposh.dev/docs)
* [Homebrew](https://brew.sh/)

## Oh My Posh をシステムにインストールする

Oh My Posh 本体を Windows と WSL Ubuntu それぞれにインストール、更新、アンインス
トールする方法を記す。

### Windows

Oh My Posh 本体 を Windows へインストールするには `winget` を用いる。
したがって Oh My Posh を更新、アンインストールするのにも `winget` を用いる。

```doscon
winget install --id JanDeDobbeleer.OhMyPosh
winget upgrade --id JanDeDobbeleer.OhMyPosh
winget uninstall --id JanDeDobbeleer.OhMyPosh
```

この手順が完了すると、上述の実行可能ファイルとテーマ各種がファイルシステムにイン
ストールされる。

インストールすることで環境変数 `PATH` が更新されて `oh-my-posh.exe` が実行可能に
なる。インストールしたセッションのコンソールをいったん終了するといい。

### WSL

シェルは Bash を想定。

> A [Homebrew](https://brew.sh/) formula is available for easy installation.
> When installing Homebrew for Linux, be sure to follow Next steps instructions
> to add Homebrew to your PATH and to your bash shell profile script, and
> Requirements to build Oh My Posh.

Homebrew についてはすでにインストール済みであるとし、ノートを割愛する。 Homebrew
がなくても Oh My Posh 単品でインストールすることは可能だが、更新やアンインストー
ルの手間を考えると前者のほうがいい。

インストール、更新、アンインストールのコマンドはそれぞれ次のとおり：

```console
brew install jandedobbeleer/oh-my-posh/oh-my-posh
brew update && brew upgrade oh-my-posh
brew uninstall oh-my-posh
```

インストール手順が完了すると、実行形式 `$(brew --prefix)/bin/oh-my-posh` とテー
マ各種を格納するディレクトリー `$(brew --prefix oh-my-posh)/themes` が得られる。

## 推奨フォントをシステムにインストールする

Oh My Posh を余すとこなく利用するのにフォントを別途インストールすることが推奨さ
れている。

> Oh My Posh was designed to use [Nerd Fonts](https://www.nerdfonts.com/). Nerd Fonts are popular fonts that
> are patched to include icons. We recommend [Meslo LGM NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip), but any Nerd Font
> should be compatible with the standard themes.

リンク先からフォントをダウンロードして Windows のインストールするのかと思いき
や、Oh My Posh 自身がフォントのインストールをサポートしている。次のコマンドを管
理者権限で起動したコンソールから実行する：

```console
oh-my-posh font install
```

コンソール上にメニューが現れるので、本文で推奨されている `Meslo` を選択、決定などする。
成功するとその旨が表示される。念のため `C:\Windows\Fonts` を調べるといい。

最後に、特殊フォントは必要ではないことを心に留めておく：

> If you are not interested in using a Nerd Font, you will want to use a theme
> which doesn't include any Nerd Font icons. The `minimal` themes do not make use
> of Nerd Font icons.

### 推奨フォントを端末エミュレーターに設定する

次に Windows Terminal および Visual Studio Code それぞれで端末ウィンドウのフォン
トを指定する。

#### Windows Terminal

Windows Terminal のフォント設定は例えば `Settings` から `Defaults
--> Appearance` の `Font face`, `Font size` を調整して `Save` ボタンを押す。もし
くは下記のように JSON ファイルをエディターで書き換えてもよい：

> Once you have installed a Nerd Font, you will need to configure the Windows
> Terminal to use it. This can be easily done by modifying the Windows Terminal
> settings This can be easily done by modifying the Windows Terminal settings
> (default shortcut: `Ctrl + Shift + ,`). In your `settings.json` file, add the
> `font.face` attribute under the `defaults` attribute in profiles

いずれの方法にせよ、同じ結果になる。

#### Visual Studio Code

> This can be done by changing the Integrated: Font Family value in the Terminal
> settings (default shortcut: `CTRL + ,` and search for `Integrated: Font
> Family` or via `Users --> Features --> Terminal`).
>
> If you are using the JSON based settings, you will need to update the
> `terminal.integrated.fontFamily` value. Example in case of `MesloLGM NF` Nerd
> Font:

利用者ノート：ところがこれが上手くいかない。各種アイコン文字が豆腐になる。
おそらく VS Code のクセではないか。

## プロンプトを Oh My Posh に割り当てさせる

Oh My Posh にプロンプト文字列を動的に構成させる方法を記す。これはシェルごとの構
成になる。まずは設定ファイルを指定せず、既定の構成を適用する方法を記す。

### Bash

私は Bash をメインに利用しているので、ここから始める。

> Add the following to `~/.bashrc` (could be `~/.profile` or `~/.bash_profile` depending on your environment):
>
> ```shell
> eval "$(oh-my-posh init bash)"
> ```

自分のスタートアップファイルを確認して、環境変数 `PS1` などを初期化しているコー
ドを含む方に追加すると整合する。コマンド `oh-my-posh init bash` は環境変数
`PROMPT_COMMAND` を独自関数プラス既存の `PROMPT_COMMAND` で置き換えるシェルコー
ドを生成する。このコードは是非とも一読しておきたい。

起動ファイルを編集、保存したのちに `source` するかセッションを再起動することで、
端末画面上のプロンプトの見栄えが著しく変化することが確認できるはずだ。

### PowerShell

私は PowerShell をほとんど利用しないが、Oh My Posh の機能を堪能するべくこちらも試す。

> Edit your PowerShell profile script, you can find its location under the
> `$PROFILE` variable in your preferred PowerShell version.

Bash でいうところの `.bash_profile` のようなファイルをテキストエディターで開く。
実際には `Microsoft.PowerShell_profile.ps1` のような名前のファイルだ。
そして次のような行を加えておく：

```pwsh
oh-my-posh init pwsh | Invoke-Expression
```

この起動ファイルを編集、保存する。PowerShell セッションが開いていればそこで
`.$PROFILE` を実行するか、あるいは PowerShell を再起動すれば、端末画面内のプロン
プトの見栄えが変化していることが確認できる。

## プロンプトをカスタマイズする

> For your convenience, the existing themes from Oh My Posh have been added to
> version 3, so you can get started even without having to understand the
> theming.

Oh My Posh は既定のテーマを用意しているためテーマを自作しなくても利用できる。あ
くまでも利便性のためにそうなっているだけであり、プログラマーがテーマをカスタマイ
ズして作業するのが Oh My Posh の常識だ。

### Bash

先述のコマンド `oh-my-posh init` が生成するコードが含む関数 `_omp_hook()` を見れ
ばわかるように、コマンド `oh-my-posh print primary` が Bash 環境変数 `PS1` の値
を割り当てる。注目するべきは `--config="$POSH_THEME"` の部分だ。この環境変数の値
がテーマファイルを示す。

シェルのスタートアップファイルに追加した `eval` 呼び出しを、例えば次のように書き
換える：

```shell
eval "$(oh-my-posh init bash --config ~/.omp.json)"
```

これにより環境変数 `POSH_THEME` にパス `~/.omp.json` を割り当て、環境変数
`PROMPT_COMMAND` はその影響を受ける。自作テーマを与えるには、既存テーマファイル
を複製し、それを好みで編集すればいい。既存テーマの場所は後述するコツで述べる。

### PowerShell

考え方は Bash の場合と同じだ。スタートアップファイル `$PROFILE` に加えた行を次のように修正する：

```pwsh
oh-my-posh init pwsh --config "$env:USERPROFILE\omp.json" | Invoke-Expression
```

テーマファイルはパス `%USERPROFILE%omp.json` に用意したものとする。

> When using oh-my-posh in Windows and the WSL, know that you can share your
> theme with the WSL by pointing to a theme in your Windows user's home folder.

二重管理を避け、テーマファイルをどちらか一方の環境で管理するのが望ましい。
Windows から WSL にある設定ファイルを指定するならば、
WSL Ubuntu がドライブ U にマウントされているとして次のように書ける：

```pwsh
oh-my-posh init pwsh --config "U:\home\USERNAME\PATH\TO\omp.json" | Invoke-Expression
```

普通は Windows 側に設定ファイルを置いて WSL 側から `/mnt/c/...` で参照するのが安定するだろうが、
私は WSL の Git でバージョン管理をしたいのでそれを避けざるを得ない。

### テーマファイルを編集する

以下、JSON 形式でテーマファイルを管理するものとする。

後述するインストール済みテーマを確認するの節の内容に沿って既存のテーマを下見し、
気に入ったものを複製して `HOME` などに `omp.json` などの名前で置いたことを前提と
して記す。

> To fully understand how to customize a theme, read through the documentation
> in the configuration and segments sections. The configuration section covers
> the basic building blocks and concepts of Oh My Posh themes, while the
> segments section covers how to configure each available segment.

テーマプレビュー、仕様書、エディター、端末画面を反復しながらカスタマイズするしか
テーマの何たるかを理解する手段はない。

#### テーマオブジェクト概要

> Oh My Posh renders your prompt based on the definition of blocks (like Lego)
> which contain one or more segments.

Block と Segment の概念が重要だとわかるが、それでもテーマオブジェクトにもわずかな属性がある。
カスタマイズの観点からはそれほど重要ではない属性でありそうだが、目を通しておこう。

> Oh My Posh themes can utilize JSON Schema to validate their contents. Themes
> should include a link to the external schema document which prescribes the
> appropriate structure and contents for various elements. If your code editor
> is configured to use JSON Schema, it will compare your custom theme to the
> external document, and issue warnings for discrepancies.

Visual Studio Code でテーマ JSON ファイルを編集するときにこの事実が効いてくる。
テキスト補完時に適切な選択肢を提示してくれるのだ。


#### Block

> [Block | Oh My Posh](https://ohmyposh.dev/docs/configuration/block)

設定オブジェクトは `blocks` という配列型属性を一つ含む。その属性をいくつか述べる。

属性 `type` の値が `rprompt` の場合、断片はキャレットの右に揃えられる。
このようなブロックは高々一つしか許されない。

属性 `newline` は値がどちらであっても、`bash` と `pwsh` の場合にはプロンプトが一
行目にあるとき、シェルセッション開始時には、最初のブロックに定義されている改行を
表示しない。

属性 `overflow` は右寄せブロックに対しては、ブロックが長過ぎて左寄せのブロックか
らはみ出る場合、ブロックを壊すか、非表示にするかを指示する。

#### Segment

> [Segment | Oh My Posh](https://ohmyposh.dev/docs/configuration/segment)

ブロックオブジェクトには次の型のオブジェクトからなる配列 `segments` を値とする属性がある。
この構成要素の型を Segment と呼ぶ。

以下、Segment の属性をいくつか説明する。

属性 `type` には Segment の類型を指示する文字列を与える。私が使いたいものは次のものだ：

| 値       | 意味                                             |
| -------- | ------------------------------------------------ |
| `git`    | 位置する Git リポジトリーの情報を示す            |
| `node`   | アクティブ Node.js バージョン示す                |
| `npm`    | アクティブ NPM バージョンを示す                  |
| `path`   | 現在のパスを示す                                 |
| `python` | アクティブ Python バージョンおよび仮想環境を示す |
| `root`   | 現在ユーザーが root である場合に表示する         |
| `shell`  | 現在のシェルを示す                               |
| `time`   | 現在時刻を書く                                   |
| `text`   | 文字列を書く                                     |

この値によって Segment の属性 `properties` の値オブジェクトの構成が決まることに注意する。
対応 `type` を知るには、上記リンク先のページ左側の Segment ツリーを見るといい。

属性 `style` には次の選択肢がある：

| 値          | 特徴                                               |
| ----------- | -------------------------------------------------- |
| `powerline` | 属性 `powerline_symbol` の値により segment を分割  |
| `plain`     | 透過背景に文字しかない単純な描画                   |
| `diamond`   | `powerline` の変種で、始点にも対応                 |
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

属性 `properties` は適当なオブジェクトの配列を値にとるものであり、Segment の描画
調整に主に用いられる。属性 `include_folders` および `exclude_folders` はどの
Segment においても考慮されるProperty の属性であり、パス文字列の配列を値にとる。
特殊な属性についてはおそらく属性`type` により定まるものと考えられる。

#### Templates

> [Templates | Oh My Posh](https://ohmyposh.dev/docs/configuration/templates)

Segment の看板属性とも言える `template` の書式の仕様だ。Go 言語の知識があれば有利らしい。

## コツ

### プレビュー

1. 一時的な設定ファイルを用意する。この説明では `omp-temp.json` とする。
2. 次のコマンドを実行する：

   ```console
   oh-my-posh print primary --config omp-temp.json --shell uni
   ```

この出力が Oh My Posh プロンプト文字列だ。次で述べるコツと併用するといい。

もっとも、`oh-my-posh init bash --config` がプロンプト表示時に常時評価されるので、
いつも使っている JSON を編集しつつ、端末で `Enter` を押すのが楽だ。

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

PowerShell ならば次のコマンドでインストールされているテーマとそのプレビューを一
覧することが可能だ：

```powershell
Get-PoshThemes
```

Bash ならばテーマディレクトリーが次のパスにある。演習として
PowerShell `Get-PoshThemes` 相当の機能を自分で実装してみるのもありだろう。

```shell
$HOMEBREW_PREFIX/Cellar/oh-my-posh/$(oh-my-posh version)/themes
```

ブラウザーが開いていればオンラインで確認するのが早いかもしれない：
[Themes | Oh My Posh](https://ohmyposh.dev/docs/themes)

### 言語系 Segment の `properties` の内容は似ている

次の Segment の属性 `type` が `python`, `ruby`, `node` などの場合には属性
`properties` の値オブジェクトにおいて、キー `home_enabled`, `display_mode`,
`fetch_version`, その他が共通して有効だ。

```json
{
    "type": xxxx,
    "style": "powerline",
    "powerline_symbol": xxxx_symbol,
    "template": " {{ .Full }}",
    "properties": {
        "home_enabled": true,
        "fetch_version": true,
        "display_mode": "files"
    }
}
```

属性 `home_enabled` の既定値は `false` であるが、これは `HOME` にスクリプトファ
イルがないことが普通だからと考えられる。

属性 `fetch_version` の既定値は `true` であり、これが自然なので明記しなくていい。

属性 `display_mode` の既定値は文字列 `files` であり、言語に関係するファイルが
`PWD` にある場合に Segment が有効になることを指示する。言語によってはもっと細か
い制御をする値が用意されている。

### 時刻を JST で表示する

Segment の構成を模索中。時刻書式の指定を Go 言語方式でする。これは難解だ。

```json
{
     "type": "time",
     "style": "plain",
     "invert_powerline": true,
     "foreground": "#ff1493",
     "properties": {
       "time_format": "15:04:05 JST+9:00"
     },
     "template": " \uf64f {{ dateInZone .Format .CurrentDate \"Asia/Tokyo\" }}"
}
```

### 色指定をする

> [Colors | Oh My Posh](https://ohmyposh.dev/docs/configuration/colors)

パレットの概念がある。同じ色を何度も指定するようなテーマを実現するのならば上手く
使いたい。
