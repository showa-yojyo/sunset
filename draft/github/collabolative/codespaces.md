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

## Setting up your project for GitHub Codespaces

## Prebuilding your codespaces

## Managing your codespaces

## Managing GitHub Codespaces for your organization

## Reference

## Troubleshooting GitHub Codespaces
