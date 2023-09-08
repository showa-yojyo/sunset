---
title: Repositories ノート
---

## Creating and managing repositories

### About repositories

* Visibility を設定可能
* アカウント個別に何らかの操作権限を与えることも可能
* GitHub Free プランでも無制限
* Issues を利用可能
* Discussions を利用可能
* Pull requests 可能

* About repository visibility
  * Private repositories are only accessible to you, people you explicitly share
    access with, and, for organization repositories, certain organization
    members.
  * People with admin permissions for a repository can change an existing
    repository's visibility.

* Limits for viewing content and diffs in a repository
  * GitHub と API のどちらでも制限される。だいたい同じ制限。
  * 生ファイルを raw.githubusercontent.com からアクセス可能。これは `Raw` ボタン。
  * 差分が巨大になる可能性があるので、コミットなどにも制限がある。例えば In a
    pull request, no total diff may exceed 20,000 lines that you can load or 1
    MB of raw diff data.

### Best practices for repositories

* Create a `README` file
  * リポジトリーごとに `README` を設ける。
  * You can add a `README` file to a repository to communicate important
    information about your project. A `README`, along with a repository license,
    citation file, contribution guidelines, and a code of conduct, communicates
    expectations for your project and helps you manage contributions.
* Favor branching over forking
  * 単一のリポジトリーで作業し、ブランチ間で pull request をするのがよい。
  * 保護ブランチ
* Use Git Large File Storage
  * GitHub ではファイルサイズの上限が設けられている。
  * To track large files in a Git repository, we recommend using Git Large File
    Storage (Git LFS).

### Creating a new repository

* Creating a new repository from the web UI
  * 画面右上プラスボタンから `New repository` を押す。
  * テンプレートを利用する場合としない場合とで操作が異なる。しない場合には次の
    ファイルを追加可能：
    * `README`
    * `.gitignore`
    * ライセンスファイル

* Creating a new repository from a URL query
  * `https://github.com/new?name=XXXX&owner=YYYY` のような URL にアクセスすると
    リポジトリーが生成されるようだ。問い合わせ引数は色々用意されている。

### Creating a repository from a template

> You can generate a new repository with the same directory structure and files
> as an existing repository.

これは有用な機能だが、Git 本体に欲しい。

* About repository templates
  * Branches created from a template have unrelated histories, which means you
    cannot create pull requests or merge between the branches.
  * 強いて言えば fork に近い。
  * 履歴をテンプレート元リポジトリーから全く引き継がない。
* Creating a repository from a template
  * Codespaces のときと似た位置に UI がある。`Use this template --> Create a new repository`

### Creating a template repository

* リポジトリーを作成してからそれをテンプレートにすればよい。
* テンプレートリポジトリーには Git LFS を使って保存されたファイルを含められない。

リポジトリー画面 `Settings --> Template Repository` にチェックを入れる。

### Creating an issues-only repository

この話題は要るか？

### Duplicating a repository

これは用語の確認と Git だけで閉じた操作ということで意味がある。

```console
bash$ git clone --bare https://github.com/EXAMPLE-USER/OLD-REPOSITORY.git
bash$ cd OLD-REPOSITORY.git
bash$ git push --mirror https://github.com/EXAMPLE-USER/NEW-REPOSITORY.git
bash$ cd ..
bash$ rm -rf OLD-REPOSITORY.git
```

LFS 絡みのときは：

```console
bash$ git clone --bare https://github.com/EXAMPLE-USER/OLD-REPOSITORY.git
bash$ cd OLD-REPOSITORY.git
bash$ git lfs fetch --all
bash$ git push --mirror https://github.com/EXAMPLE-USER/NEW-REPOSITORY.git
bash$ git lfs push --all https://github.com/EXAMPLE-USER/NEW-REPOSITORY.git
bash$ cd ..
bash$ rm -rf OLD-REPOSITORY.git
```

### Cloning a repository

GitHub のリポジトリーをローカルにクローンする方法。超基本。

```console
git clone https://github.com/PATH-TO/REPOSITORY
```

あるいは

```console
bash$ gh repo clone https://github.com/PATH-TO/REPOSITORY
```

### Troubleshooting cloning errors

* HTTPS cloning errors
  * `git --version`
  * `git remote -v`
  * 個人アクセストークン
  * When prompted for a username and password, make sure you use an account that
    has access to the repository.
  * SSH キー設定済みなら SSH 版 URL を使える。
* Error: Repository not found
  * `git@github.com:user/repo.git` のスペリングを確認
  * 権限を確認
  * SSH の場合は `ssh -T git@github.com`
* Error: Remote HEAD refers to nonexistent ref, unable to checkout
  * This error occurs if the default branch of a repository has been deleted on
    GitHub.com.
  * `git branch -a` して適切なものに `git checkout` する。

### Renaming a repository

リポジトリー `Settings --> Repository name` で変更後の名前を記入して `Rename` する。

* 変更後、ローカルクローンで `git remote set-url origin NEW_URL` すること。
* 古い名前をいつか再利用しようとしないこと。リダイレクトが壊れる。

### Transferring a repository

リポジトリーを所有者や組織をまたいで引っ越すこと。

* About repository transfers
  * 同時にリポジトリーの名前を変えられる。
  * 引っ越し不能なリポジトリーもある。
  * 組織絡みは割愛。
* Transferring a repository owned by your personal account
  * GitHub Pages の URL 関連の問題があることに注意。
  * リポジトリー `Settings --> Transfer --> New owner`
* Transferring a repository owned by your organization
  * 組織絡みは割愛。

### Deleting a repository

削除してから 90 日以内ならば復元できるリポジトリーもあるが、基本はやり直し不能と思ったほうがいい。

リポジトリー `Settings --> Delete this repository`

### Restoring a deleted repository

* About repository restoration
  * フォークが関係していることで復元不能となる場合がある。
* Restoring a deleted repository that was owned by a personal account
  * アカウント `Settings --> Repositories --> Deleted repositories` で対象項目を `Restore`
* Restoring a deleted repository that was owned by an organization
  * 組織絡みは割愛。

## Managing your repository’s settings and features

### Customizing your repository

#### About READMEs

> `README` files typically include information on:
>
> * What the project does
> * Why the project is useful
> * How users can get started with the project
> * Where users can get help with your project
> * Who maintains and contributes to the project

`README` を置くディレクトリーは次のいずれかになり、GitHub はこの順に優先する：

* `/.github/`
* `/`
* `/docs/`

> If you add a `README` file to the root of a public repository with the same
> name as your username, that `README` will automatically appear on your profile
> page.

これは後で実施する。

`README` の TOC がリポジトリートップページ内表示領域のハンバーガーマークからアクセス可能。

`README` 内容で相対リンクを示すことが可能。基準はこのファイルのディレクトリー。

> A `README` should contain only the necessary information for developers to get
> started using and contributing to your project. Longer documentation is best
> suited for wikis.

#### Licensing a repository

> For your repository to truly be open source, you'll need to license it so that
> others are free to use, change, and distribute the software.

ライセンスはまったくわからない。そういう人は
[Choose an open source license | Choose a License](https://choosealicense.com/) で手がかりを得る。

> However, without a license, the default copyright laws apply, meaning that you
> retain all rights to your source code and no one may reproduce, distribute, or
> create derivative works from your work.

普通の著作権のほうが無難ではないか。しかし、リポジトリーを公開している以上はオープンソースにするのが自然だろう。

> As a best practice, we encourage you to include the license file with your
> project.

ファイル `LICENSE{,.txt,.md,.rst}` のどれかをリポジトリーのルートに置くのが普通。

ライセンスで検索することが可能。

GitHub でリポジトリーを新規作成する時点で `Choose a license` で既存のライセンスから指定可能。

#### Displaying a sponsor button in your repository

スポンサーなどいないのでほんとうは割愛でいい。

> You can configure your sponsor button by editing a `FUNDING.yml` file in your
> repository's `.github` folder, on the default branch.

```yaml
github: [octocat, surftocat]
patreon: octocat
tidelift: npm/octo-package
custom: ["https://www.paypal.me/octocat", octocat.com]
```

リポジトリー `Settings --> Generel --> Sponsorships` をオン。
さらに `Set up sponsor button` を押すと、上記ファイルの追加編集画面が現れる。

#### Customizing your repository's social media preview

Twitter や Facebook からリポジトリー URL にリンクしてもらうと指定の絵が出る仕組みだ。

> Tip: Your image should be a PNG, JPG, or GIF file under 1 MB in size. For the
> best quality rendering, we recommend a size of at least 640 by 320 pixels
> (1280 by 640 pixels for best display).

リポジトリー `Settings --> Social Preview` に画像をアップロードするのだろう。

#### Classifying your repository with topics

リポジトリーの右の柱にあるキーワード集合。

> To browse the most used topics, go to https://github.com/topics/.

リポジトリー `About` 歯車クリック。

#### About code owners

> You can use a `CODEOWNERS` file to define individuals or teams that are
> responsible for code in a repository.

なぜ責任者を明示するのか。

> Code owners are automatically requested for review when someone opens a pull
> request that modifies code that they own.

リポジトリーのファイル画面で `Owned by` マークが表示される。

ファイル `CODEOWNERS` の場所は `README` と同じ仕様のようだ。

> `CODEOWNERS` files must be under 3 MB in size.

`CODEOWNERS` の構文は `.gitignore` のそれに似ている。

パスは case sensitive だ。

#### About repository languages

GitHub が自動判定する。

#### About CITATION files

これを書きこなせたら見栄えがいい。

### Enabling features for your repository

#### Disabling issues

他人からバグ報告をもらいたくない場合に Issues 機能を無効にする。
リポジトリー `Settings --> Features --> Issues` をオフにする。

#### Disabling classic projects in a repository

リポジトリー `Settings --> Features --> Projects` をオフにする。

#### Managing GitHub Actions settings for a repository

リポジトリー `Settings --> Actions --> Actions permissions` 以下を調整する。

#### Enabling or disabling GitHub Discussions for a repository

#### Managing security and analysis settings for your repository

### Managing repository settings

#### Setting repository visibility

#### Managing teams and people with access to your repository

#### Managing the forking policy for your repository

#### Managing pull request reviews in your repository

#### Managing the commit signoff policy for your repository

#### Managing the push policy for your repository

#### Managing Git LFS objects in archives of your repository

#### About email notifications for pushes to your repository

#### Configuring autolinks to reference external resources

#### Configuring tag protection rules

## Configuring branches and merges in your repository

### Managing branches in your repository • 4 articles

### Configuring pull request merges • 8 articles

### Managing protected branches • 2 articles

### Managing rulesets for a repository

## Working with files

### Managing files • 7 articles

### Using files • 5 articles

### Managing large files • 9 articles

## Releasing projects on GitHub

### About releases

### Managing releases in a repository

### Viewing your repository's releases and tags

### Searching a repository's releases

### Linking to releases

### Comparing releases

### Automatically generated release notes

### Automation for release forms with query parameters

## Viewing activity and data for your repository

### Viewing deployment activity for your repository

### About repository graphs

### Using Pulse to view a summary of repository activity

### Viewing traffic to a repository

### Viewing a project's contributors

### Analyzing changes to a repository's content

### Understanding connections between repositories

### Using the activity view to see changes to a repository

## Archiving a GitHub repository

### Archiving repositories

### About archiving content and data on GitHub

### Referencing and citing content

### Backing up a repository
