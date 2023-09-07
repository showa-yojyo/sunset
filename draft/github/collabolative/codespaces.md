---
title: GitHub Codespaces ノート
---

どうも基本は有料の機能らしい。

## Getting started with GitHub Codespaces

### Quickstart for GitHub Codespaces

* Introduction
  * You'll work in the browser version of Visual Studio Code, which is initially
    the default editor for GitHub Codespaces.
* Creating your codespace
  * `Use this template --> Open in a codespace`: これでブラウザーに VS Code 風 UI が現れる。
* Running the application
  * そこのコンソールで `npm run dev` を実行する。
  * 本家同様のポップアップが出現する。`Open in Browser` を押す。
* Edit the application and view changes
  * `haikus.json` を編集する。
  * 画面を手動でリフレッシュ。
* Committing and pushing your changes
  * 変更部分をすべてコミットすると `Publish Branch` ボタンが現れる。それを押す。
  * リポジトリーを選択する。これで自分のアカウントにリポジトリーが追加される。
* Personalizing with an extension
  * 上手くいかない。
  * `Settings Sync` を ON にすると吉。

### Understanding the codespace lifecycle

* About the lifecycle of a codespace
  * The lifecycle of a codespace begins when you create a codespace and ends
    when you delete it.
* Creating a codespace
  * There are limits to the number of codespaces you can create, and the number
    of codespaces you can run at the same time. 二種類ある制限。
  * To speed up codespace creation, repository administrators can enable GitHub
    Codespaces prebuilds for a repository.
* Saving changes in a codespace
  * When you connect to a codespace through the web, auto-save is enabled
    automatically for the web editor and configured to save changes after a
    delay.
  * Your work will be saved on a virtual machine in the cloud.
* Timeouts for GitHub Codespaces
  * スペースを一定時間放置すると自動的に片付けられる。
  * 自動シャットダウンしてもデータは保存される。
* Rebuilding a codespace
* Stopping a codespace
  * For example, if you're using a codespace in the VS Code web client and you
    close the browser tab, the codespace remains running on the remote machine.
* Deleting a codespace
  * If you create a codespace, it will continue to accrue storage charges until
    it is deleted, irrespective of whether it is active or stopped.
  * 金がかかってはかなわん。
* Losing the connection while using GitHub Codespaces
  * If you lose connection to the internet while working in a codespace, you
    will not be able to access your codespace.

### Deep dive into GitHub Codespaces

> GitHub Codespaces is an instant, cloud-based development environment that uses
> a container to provide you with common languages, tools, and utilities for
> development.

* Creating your codespace
  * スペースを開く方法は先述の方法以外にも複数ある。
  * You can create a codespace on GitHub.com, in Visual Studio Code, or by using
    GitHub CLI.
  * GitHub リポジトリーには shallow clone という概念がある。
  * Your repository is cloned into the `/workspaces` directory in the codespace
  * コンテナーという概念を理解しないとダメそうだ。コンテナーが作成されてからス
    ペースに接続。
* Codespaces lifecycle
  * Auto save をオンにしておくとよい。
  * 停止する方法は一つは習得しておく。
* Running your application
  * ポートの転送とは？
* Committing and pushing your changes
  * Git is installed by default in your codespace and so you can rely on your
    existing Git workflow.
  * スペースを公開するという考え方をする。
* Personalizing your codespace with extensions or plugins
  * VS Code の本物の拡張で設定を同期できる。
* About the directory structure of a codespace
  * When you create a codespace, your repository is cloned into the /workspaces
    directory in your codespace. This is a persistent directory that is mounted
    into the container.
  * `~/.bashrc` を書ける。
  * コンテナーの rebuild に注意する。これがデータを壊す。

## Developing in a codespace

> You can use your codespace in the browser or in a choice of code editors.

### Developing in a codespace

ブラウザーの場合：

github.com/codespaces で利用可能なスペースすべてを確認する。

> Alternatively, you can see any of your codespaces for a specific repository by
> navigating to that repository and selecting Code. The dropdown menu will
> display all active codespaces for a repository.

GitHub CLI の場合：

> You can use GitHub CLI to create a new codespace, or start an existing
> codespace, and then SSH to it. Once connected, you can work on the command
> line using your preferred command-line tools.

```console
bash$ gh codespace --help
```

### Creating a codespace for a repository

> You can use GitHub Codespaces on your personal GitHub.com account, with the
> quota of free use included each month for accounts on the Free and Pro plans.

それなら良かった。

> If you create a codespace from a repository, the codespace will be associated
> with a specific branch, which cannot be empty.

1. リポジトリー画面で対象ブランチを選択する。
2. `Code --> Codespaces --> Create codespace on <BRANCH-NAME>`
3. ここでオプション設定なのだが……。

GitHub CLI では：

```console
bash$ gh codespace create -r OWNER/REPO -b BRANCH --devcontainer-path PATH -m MACHINE-TYPE
```

### Creating a codespace from a template

> If you're starting a new project, you can get started with development work
> quickly by creating a codespace from a template.

クイックスタートでやったようなものだ。

空白のテンプレから始めることも可能。

> With a blank template, you'll start with an empty directory, with access to
> cloud-based compute resources and the tools, languages, and runtime
> environments that come preinstalled with the default codespace image. With
> other templates, you'll get starter files for the technology you're working
> with, plus typically some extra files such as a README file, a `.gitignore`
> file, and dev container configuration files containing some custom environment
> configuration.

テンプレートはどこにあるのか：

github.com/codespaces から `Templates --> See all --> Blank --> Use this template` など。
テンプレートリポジトリーからスペースを開くの方法は先述。

> Typically, Git will come preinstalled, and the working directory will be
> automatically initialized as a Git repository unless you started from GitHub's
> blank template.

Git くらい入れておけばいいじゃないか。

Publish の概念については先述。

### Deleting a codespace

Codespace の維持にはコストがかかるので、不要なものは削除することだ。

github.com/codespaces から `Your codespaces --> XXXX --> Delete`

```console
bash$ gh codespace delete
```

有用なコマンドラインオプションあり。

### Opening an existing codespace

Open というより resume という。

対象リポジトリー画面を開いて `,` キーを押す。それから `Resume this codespace`

`Your codespaces` から開くことも可能。何で開くかも選択する。

### Working collaboratively in a codespace

> Visual Studio Live Share lets you collaboratively edit and debug with others
> in real time, within a codespace. You can securely share your current
> codespace, or access a codespace created by someone else.

Live Share 拡張を VS Code にインストールする。

### Using source control in your codespace

VS Code 上での Git 操作と同様。

### Using GitHub Codespaces for pull requests

Pull request を開いた画面の `Code` でスペースを開ける。

VS Code の Activity Bar の Pull request アイコン。

### Stopping and starting a codespace

`Your codespaces` 画面 `Stop codespace` 項目。

再開は同じ画面のスペース名を選ぶ。

### Forwarding ports in your codespace

> You can forward ports in your codespace to test and debug your application.
> You can also manage the port protocol and share the port within your
> organization or publicly.

> You can manually forward a port that wasn't forwarded automatically.

VS Code でいう Panel に `PORTS` というタブがある。`Add Port` でポート番号を追加する。

HTTP を HTTS に変えられる。右クリックメニューの `Change Port Protocol`

この記事は難しい。

### Rebuilding the container in a codespace

> When you work in a codespace, your development environment is a Docker
> container that runs on a virtual machine.

Docker 知らない。

VS Code のコマンドに Codespaces: Rebuild Container というのがある。

GutHub CLI:

```console
bash$ gh codespace rebuild
```

残りは何を言っているのかわからない。

### Default environment variables for your codespace

Codespace のセッションで定義されているシェルの環境変数か。

### Persisting environment variables and temporary files

再構築しない限りファイル `$HOME/.bashrc` で環境変数を定義する方法がある。

> You can edit the `devcontainer.json` configuration file for the repository

```json
{
    "remoteEnv": {
      "VARNAME": "value"
   }
}
```

> If you are using a custom `Dockerfile` you can set the environment variable
> there by adding `ENV VARNAME=value`.

### Connecting to a private network

> You can connect GitHub Codespaces to resources on a private network, including
> package registries, license servers, and on-premises databases.

* Using a GitHub CLI extension to configure your local machine as a gateway to
  remote resources.
* Using a VPN.

> IP addresses for codespaces are dynamically assigned, meaning your codespace
> is not guaranteed to have the same IP address day to day.

### Getting started with GitHub Codespaces for machine learning

これは当世風だから後に取っておく。

### Using GitHub Codespaces in Visual Studio Code

GitHub Codespaces 拡張を VS Code にインストールして GitHub に接続する？

> If you would prefer to open any new codespaces in VS Code automatically, you
> can set your default editor to be VS Code.

> If you prefer to work in the browser, but want to continue using your existing
> VS Code extensions, themes, and shortcuts, you can turn on Settings Sync.

ここから先の練習は取っておく。

### Using GitHub Codespaces in your JetBrains IDE

割愛。

### Using GitHub Codespaces with GitHub CLI

> To use `gh` to work with GitHub Codespaces, type `gh codespace SUBCOMMAND`

> GitHub Codespaces creates a local SSH key automatically to provide a seamless
> authentication experience.

## Customizing your codespace

> GitHub Codespaces is a dedicated environment for you. You can configure your
> repositories with a dev container to define their default GitHub Codespaces
> environment, and personalize your development experience across all of your
> codespaces with dotfiles and Settings Sync.

### Personalizing GitHub Codespaces for your account

リポジトリー `dotfiles` を用いてカスタマイズを実現する。

> GitHub Codespaces personalization applies to any codespace you create.

> Settings Sync allows you to synchronize configurations such as settings,
> keyboard shortcuts, snippets, extensions, and UI state across machines and
> instances of VS Code.

> For example, a common use of Settings Sync would be to sync your settings from
> your VS Code desktop application, which you use for local work, to codespaces
> you open in the browser.

まさにこれをやりたい。

* まず普通の VS Code の `Settings Sync` をオンにする。Activity Bar の歯車アイコンから。
* GitHub ユーザー `Settings --> Codespaces --> Settings Sync` をオンにする。
* オプションで逆方向の同期も可能だが、これは要らない。

あるいは、

> Alternatively, you may want to use the same settings across all codespaces you
> open in the web client, while leaving your local VS Code application
> unaffected.

こちらは割愛。

> For codespaces opened in the VS Code web client, Settings Sync is disabled by
> default.

> Settings Sync is enabled in your user preferences automatically if you open a
> codespace in the web client and turn on Settings Sync in the codespace.

あとは trusted repositories という考えがあり、それも自動同期の要因になる。

他にも `Settings Sync` が見られる箇所があるが、方法は同様なので省略。

リポジトリー `dotfiles` について。

> When you create a new codespace, GitHub clones your selected `dotfiles`
> repository to the codespace environment, and looks for one of the following
> files to set up the environment.

ファイル `install.sh`, etc. をコピーする。ない場合に変なシンボリックリンクが作ら
れる。

> Any changes to your selected dotfiles repository will apply only to each new
> codespace, and do not affect any existing codespace.

GitHub ユーザー `Settings --> Codespaces --> Automatically install dotfiles` をオンにする。

### Renaming a codespace

ブラウザーの場合は `Your codespaces` 画面のスペース項目から `Rename` を押す。

### Changing the shell in a codespace

> If you open a new codespace in the VS Code web client, or connect to a
> codespace over SSH, the terminal opens with a `bash` session running by
> default.

それでいい。新しいシェルなぞ不要。

### Changing the machine type for your codespace

仮想マシンのメモリーとディスク容量を増やしたいときに検討する。

> Each machine type has a different level of resources and a different billing
> tier.

銭によって選択肢が決まる。

> By default the machine type with the lowest valid resources is used when you
> create a codespace. You can choose an alternative machine type either when you
> create a codespace or at any time after you've created a codespace.

変更可能性で言えば、対照的なのが：

> Unpublished codespaces (codespaces created from a template that are not linked
> to a repository on GitHub) always run on a virtual machine with the same
> specifications. You can't change the machine type of an unpublished codespace.

`Your codespaces` 画面スペース項目の `Change machine type` を押す。

> If you changed to a virtual machine with a different storage capacity (for
> example, from 32 GB to 64 GB), your codespace will be unavailable for a short
> time while the machine type is changed.

同サイズの場合には次回起動時に使える。

### Setting your default editor for GitHub Codespaces

ユーザー `Settings --> Codespaces --> Editor preference` で：

* Visual Studio Code (desktop application)
* Visual Studio Code (web client application)
* JetBrains Gateway - for opening codespaces in a JetBrains IDE
* JupyterLab - the web interface for Project Jupyter

ただし

> When you create a new codespace from a template, it is always opened in the
> Visual Studio Code web client.

VS Code 側設定は先述。

> The first time you open a codespace this way you must give permission to open
> the application.

### Setting your default region for GitHub Codespaces

日本から利用する場合には Southeast Asia でいいのか？

### Setting your timeout period for GitHub Codespaces

> A codespace will stop running after a period of inactivity. By default this
> period is 30 minutes, but you can specify a longer or shorter default timeout
> period in your personal settings on GitHub.

ユーザー `Settings --> Codespaces --> Default retension period` で期間を設定して `Save`

### Configuring automatic deletion of your codespaces

保管料という金銭に関わる概念があるので、保管期間を短く設定することが可能。

> The retention period is reset every time you connect to a codespace, and the
> retention countdown restarts when the codespace is stopped.

スペースによって保管期間が異なることがある。

削除までの期間は Codespaces 画面スペース項目右上辺りで確認可能。

`Your codespaces` 画面スペース項目の `Keep codespace` を押すと自動削除を免れる。
そのぶん保存域や保管料に跳ね返る。

## Setting up your project for GitHub Codespaces

### Adding a dev container configuration to your repository

> You can add a custom dev container configuration to your repository to set up
> the GitHub Codespaces development environment for your codebase.

#### Introduction to dev containers

> When you work in a codespace, the environment you are working in is created
> using a development container, or dev container, hosted on a virtual machine.

> Whenever you work in a codespace, you are using a dev container on a virtual
> machine.

> If you don't define a configuration in the repository then GitHub Codespaces
> uses a default configuration, which contains many of the common tools that
> your team might need for development with your project.

> The configuration files for a dev container are contained in a `.devcontainer`
> directory in your repository.

> When you create a codespace from a template, you might start with one or more
> dev container configuration files in your workspace.

主な設定は `devcontainer.json` だ。開発コンテナーというものを規定する。

> The `devcontainer.json` file is usually located in the `.devcontainer`
> directory of your repository.

内容の方向性：

> Things like linters are good to standardize on, and to require everyone to
> have installed, so they're good to include in your `devcontainer.json` file.
> Things like user interface decorators or themes are personal choices that
> should not be put in the `devcontainer.json` file.

> You can add a `Dockerfile` as part of your dev container configuration.

`Dockerfile` はコンテナーイメージを作成するために必要な指示を含むテキストファイルだ。

> The `Dockerfile` for a dev container is typically located in the
> `.devcontainer` folder, alongside the `devcontainer.json` in which it is
> referenced.

`Dockerfile` の例が続く。割愛。

> For information about what's included in the default Linux image, see the
> `devcontainers/images` repository.

> If you use Codespaces in Visual Studio Code, or in a web browser, you can
> create a dev container configuration for your repository by choosing from a
> list of predefined configurations.

VS Code で作業する場合には Dev Containers 拡張があると良い。

> You can add features to a `devcontainer.json` file from VS Code or from your
> repository on GitHub.com.

> If you don't already have a devcontainer.json file in your repository, you can
> quickly add one from GitHub.com.

`Code --> Codespaces --> Configure dev container`

最後は rebuild 手順。割愛。

#### Setting up a Node.js project for GitHub Codespaces

> Get started with a Node.js, JavaScript, or TypeScript project in GitHub
> Codespaces by creating a custom dev container configuration.

とにかくやってみよう。

> After you complete this tutorial, you'll be able to add a dev container
> configuration to your own repository, using either the VS Code web client or
> the VS Code desktop application.

実際やるとハマる箇所が一つ。リビルド後 `npm start` するとモジュールがないエラーが生じる。
考えにくいが、エディターの拡張が干渉しているらしい。デバッガーを無効にするとサーバーが動く。

#### Setting up a C# (.NET) project for GitHub Codespaces

`PORT` タブの項目右クリックで `Open in Browser` を押す手順を覚える。

#### Setting up a Java project for GitHub Codespaces

VS Code の Java 拡張が有効になっていることを確認するべし。いつも無効になっているから。

#### Setting up a PHP project for GitHub Codespaces

これは容易い。

#### Setting up a Python project for GitHub Codespaces

Python はよく知っているので問題ない。デバッガーについては他の演習と同様の注意をする。

### Configuring dev containers

> You can customize the dev container configuration for your repository.

上記の演習が終わったので構成の意味が体では理解できた今やるのがいい。

#### Setting a minimum specification for codespace machines

> Each machine type has different resources (processor cores, memory, storage)
> and, by default, the machine type with the least resources is used.

これは以前確認した。`devcontainer.json` でそれを指定可能だというのが本稿の主旨だ。

> You can't change the machine type of an unpublished codespace.

```json
"hostRequirements": {
   "cpus": 8,
   "memory": "8gb",
   "storage": "32gb"
}
```

これにより、GitHub Codespaces 画面上の Machine type 選択欄で低スペック項目が選択不能になる。

#### Adding features to a devcontainer.json file

> You can use features to quickly add tools, runtimes, or libraries to your
> codespace image.

`devcontainer.json` の `features` に値を設定するのだが、先の演習では VS Code の
`add dev` 方式でそれを行った。

#### Automatically opening files in the codespaces for a repository

VS Code ブラウザー版限定。演習における README が実例。

```json
"customizations": {
  "codespaces": {
    "openFiles": [
      "README.md",
      "scripts/tsconfig.json",
      "docs/main/CODING_STANDARDS.md"
    ]
  }
}
```

#### Specifying recommended secrets for a repository

> You should use recommended secrets for secrets that the user who creates the
> codespace, rather than the owner of the repository or organization, must
> provide.

```json
"secrets": {
  "NAME_OF_SECRET_1": {
    "description": "This is the description of the secret.",
    "documentationUrl": "https://example.com/link/to/info"
  },
  "NAME_OF_SECRET_2": { }
}
```

> You can omit `description` and `documentationUrl`, as shown by
> `NAME_OF_SECRET_2` in the previous code example.

### Setting up your repository for GitHub Codespaces

#### Facilitating quick creation and resumption of codespaces

> You can make it easy for people to work on your repository in a codespace by
> providing a link to the codespace creation page. One place you might want to
> do this is in the `README` file for your repository. For example, you can add
> the link to an "Open in GitHub Codespaces" badge.

百聞は一見に如かず。キャプチャーがわかりやすい。ああアレかと思える。

> Alternatively, you can link to the "Resume codespace" page, which provides a
> quick way for people to open a codespace they were working on recently.

こちらも普通か。

| URL | Codespace |
|-----|-----------|
| `https://codespaces.new/OWNER/REPO-NAME` | REPO-NAME の既定ブランチ |
| `https://codespaces.new/OWNER/REPO-NAME/tree/BRANCH-NAME` | REPO-NAME のブランチ BRANCH-NAME |
| `https://codespaces.new/OWNER/REPO-NAME/pull/PR-SHA` | Pull request PR-SHA のブランチ |

手順はこう：

> You can use the "Share a deep link" option to configure more options for the
> codespace and build a custom URL, then copy a Markdown or HTML snippet for an
> "Open in GitHub Codespaces" badge.

リポジトリー画面の `Code --> Codespaces --> Share a deep link` を押す。
その UI を見れば全部わかる。

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/showa-yojyo/showa-yojyo.github.io?quickstart=1)

`Quick start` の意味：

> Add `?quickstart=1` to a `codespaces.new` URL, such as the URLs listed in the
> previous section of this article. This produces a URL that displays a "Resume
> codespace" page.

#### Setting up a template repository for GitHub Codespaces

> You can help people get started with a project by setting up a template
> repository for use with GitHub Codespaces.

テンプレートリポジトリーを自作することが可能。

> If you don't have one, create a `README` for your template repository to
> describe the purpose of your template and how to get started with it.

github.com/codespaces の `See all` の各テンプレートが参考になる。

あとは `devcontainer.json` だ。

## Prebuilding your codespaces

> To speed up codespace creation, you can configure your project to prebuild
> codespaces for specific branches in specific regions.

### About GitHub Codespaces prebuilds

> GitHub Codespaces prebuilds help to speed up the creation of new codespaces
> for large or complex repositories.

事前ビルドが有益な可能性がある場合は：

> If it currently takes more than 2 minutes to create a codespace for a
> repository, you are likely to benefit from using prebuilds.

事前ビルドの自動更新あり：

> By default, whenever you push changes to your repository, GitHub Codespaces
> uses GitHub Actions to automatically update your prebuilds.

いいときには `Prebuild ready` ラベルがマシンタイプ一覧項目に現れる。

時間効率に関する説明がここにある。

> By default, each push to a branch that has a prebuild configuration results in
> a GitHub-managed GitHub Actions workflow run to update the prebuild.

プッシュごとに重い処理が入ると考えた方がいい。

### Configuring prebuilds

> You can set up a prebuild configuration for the combination of a specific
> branch of your repository with a specific dev container configuration file.

ブランチごとなのだが、

> Any branches created from a prebuild-enabled parent branch will typically also
> get prebuilds for the same dev container configuration.

> Prebuilds are created using GitHub Actions.

無償ではない：

> The prebuild will consume storage space that will either incur a billable
> charge or, for repositories owned by your personal account, will use some of
> your monthly included storage.

TODO: 演習

### Allowing a prebuild to access other repositories

> You can permit your prebuild to access other GitHub repositories so that it
> can be built successfully.

だんだん複雑になってきている。

`devcontainer.json` で permissions を定義する。

個人アクセストークンのため、新規アカウントを作成することになる。

> we strongly recommend creating a new account with access only to the target
> repositories required for your scenario.

> Give the new account read access to the required repositories.

### Managing prebuilds

> The prebuilds that you configure for a repository are created and updated
> using a GitHub Actions workflow, managed by the GitHub Codespaces service.

記述されている UI が確認できない。

### Testing dev container configuration changes on a prebuild-enabled branch

ここも時期尚早。

> After everything looks good, we also recommend creating a new codespace from
> your test branch to ensure everything is working.

## Managing your codespaces

### Managing secrets for your codespaces

> You can add secrets to your personal account that you want to use in your
> codespaces.

> Once you have created a secret, it will be available when you create a new
> codespace or restart the codespace.

`Settings --> Codespaces --> New secrets`

> A secret is exported as an environment variable into the user's terminal
> session.

Codespace で機密情報が利用可能になるタイミングに注意。

### Managing access to other repositories within your codespace

> You should only authorize permissions for repositories you know and trust.

### Reviewing your security logs for GitHub Codespaces

> When you perform an action related to GitHub Codespaces in repositories owned
> by your personal account, you can review the actions in the security log.

`Settings --> Security log` で `codespaces` イベントをフィルター。

### Managing GPG verification for GitHub Codespaces

> You can allow GitHub to automatically use GPG to sign commits you make in your
> codespaces, so other people can be confident that the changes come from a
> trusted source.

GPG 一般はよくわからない。

> After you enable GPG verification, GitHub will automatically sign commits you
> make in GitHub Codespaces, and the commits will have a verified status on
> GitHub.

リポジトリーを絞れ：

> If you have previously enabled GPG verification for all repositories, we
> recommend changing your preferences to use a selected list of trusted
> repositories.

やり方：

アカウント `Settings --> Codespaces --> GPG verification` で `Enable` を押す。

> Once you enable GPG verification, it will automatically take effect in any new
> codespaces you create from the relevant repositories. To have GPG verification
> take effect in an existing active codespace, you will need to stop and restart
> the codespace.

よく手を入れるリポジトリーを入れておこうか。

## Managing GitHub Codespaces for your organization

割愛。

## Reference

### Allowing your codespace to access a private registry

これは高度な技術だ。

### Using GitHub Copilot in GitHub Codespaces

まだ早い。

### Using the GitHub Codespaces plugin for JetBrains

JetBrains とは？

### Using the Visual Studio Code Command Palette in GitHub Codespaces

おそらく VS Code の GitHub Codespaces 拡張を採用する必要がある。

### Security in GitHub Codespaces

TODO

### Disaster recovery for GitHub Codespaces

> This article describes guidance for a disaster recovery scenario, when a whole
> region experiences an outage due to major natural disaster or widespread
> service interruption.

安全な地域に退避する。

## Troubleshooting GitHub Codespaces

### GitHub Codespaces logs

```console
bash$ gh codespace logs
bash$ gh codespace logs -c <CODESPACE-NAME>
```

* `Codespaces: Export Logs`
* `Codespaces: View Creation Log`

ブラウザーの開発ツールの Console を見てもいい。

> If you encounter issues using GitHub Codespaces in a Chromium-based browser,
> you can check if you're experiencing another known issue with VS Code in the
> microsoft/vscode repository.

> If the Simple Browser tab does not open automatically, you can open the Simple
> Browser manually to view the application.

これはおすすめ。

### Troubleshooting GitHub Codespaces clients
### Getting the most out of your included usage
### Exporting changes to a branch
### Troubleshooting creation and deletion of codespaces
### Troubleshooting authentication to a repository
### Troubleshooting your connection to GitHub Codespaces
### Troubleshooting prebuilds
### Troubleshooting personalization options for GitHub Codespaces
### Troubleshooting port forwarding for GitHub Codespaces
### Troubleshooting GPG verification for GitHub Codespaces
### Working with support for GitHub Codespaces
