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

リポジトリー `Settings --> Actions --> General --> Fork pull request workflows from outside collaborators`
以下を調整する。

`GITHUB_TOKEN` 権限を構成する：
リポジトリー `Settings --> Actions --> General --> Workflow permissions` 以下を調整。

> By default, when you create a new repository in your personal account,
> workflows are not allowed to create or approve pull requests.

チェックボックスのほう。

> You can configure the retention period for GitHub Actions artifacts and logs
> in your repository.

実は private のほうが長期間保存可能。

リポジトリー `Settings --> Actions --> General -->Artifact and log retention` 以
下を調整。

#### Enabling or disabling GitHub Discussions for a repository

リポジトリー `Settings --> General --> Features --> Discussion` をオンかオフ。

#### Managing security and analysis settings for your repository

リポジトリー `Settings --> Code security and analysis` 各機能の `Enable` ボタンを押す。

### Managing repository settings

リポジトリーの機能を選択する。

#### Setting repository visibility

* リポジトリーを public/private にする違いを理解する。
* リポジトリーを public/private に変更する方法を理解する。

#### Managing teams and people with access to your repository

割愛。

#### Managing the forking policy for your repository

> You can allow or prevent the forking of a specific private repository owned by
> an organization.

割愛。

#### Managing pull request reviews in your repository

> You can limit which users can approve or request changes to a pull requests in
> a public repository.

リクエスト者を制限するわけではないことに注意。

> When you enable code review limits, anyone can comment on pull requests in
> your public repository, but only people with read access or higher can approve
> pull requests or request changes.

査読者を制限するオプションであると読める？

リポジトリー `Settings --> Moderation options --> Code review limits` 以下をいじる。

#### Managing the commit signoff policy for your repository

> You can require users to automatically sign off on the commits they make to
> your repository using GitHub's web interface.

サインオフはコミットの内容を保証するための仕組みらしい。

> Compulsory commit signoffs only apply to commits made via the web interface.

ローカルでコミットする場合は本項の範囲外ということか。

> You can determine whether a repository you are contributing to has compulsory
> commit signoffs enabled by checking the header of the commit form at the
> bottom of the file you are editing. After compulsory commit signoff has been
> enabled, the header will read "Sign off and commit changes."

ブラウザー経由でファイルを変更するときに確認したい。

リポジトリー `Settings --> General --> Require contributors to sign off on web-based commits`
をオンにする。

#### Managing the push policy for your repository

> You can limit how many branches and tags can be updated in a single push.

ちなみに `git push --mirror` も禁止できる。

リポジトリー `Settings --> General --> Limit how many branches and tags can be updated in a single push`
をオンにして `Up to` 値を設定する。推奨値は 5 だ。なぜなら Git では一度の push
でブランチの名前を変更するには、ブランチの削除とブランチの作成という二つが必要だ
からだ。

#### Managing Git LFS objects in archives of your repository

コードアーカイブに LFS を含めるか否か。

リポジトリー `Settings --> General --> Include Git LFS objects in archives` をオンオフ。

#### About email notifications for pushes to your repository

> You can choose to automatically send email notifications to a specific email
> address when anyone pushes to the repository.

リポジトリー `Settings --> Email notifications` を選択。番号を入れて次へ。

#### Configuring autolinks to reference external resources

割愛。

#### Configuring tag protection rules

リポジトリー `Settings --> Tags --> New rule` を押す。
このパターンにマッチするタグを作成することが不可能になる？

## Configuring branches and merges in your repository

### Managing branches in your repository

> Whenever you propose a change in Git, you create a new branch.

ということになっている。

#### Viewing branches in your repository

リポジトリー画面左上のブランチボタンに `View all branches` リンクがある。
リンク先の画面ではブランチ一覧から検索したりフィルターしたりすることが可能。

`Stale branshes` に現れるものが削除候補だ。

#### Renaming a branch

`master` を `main` に変更するなど、状況は思いつく。

> When you rename a branch on GitHub.com, any URLs that contain the old branch
> name are automatically redirected to the equivalent URL for the renamed
> branch.

ローカルリポジトリーの対応ブランチも rename する必要が生じる。その案内も対応。
さらに GitHub Actions も自動更新されたりはしない。

`View all branches` リンク先の項目鉛筆ボタンから rename 可能。

ローカルで必要となる作業は：

```console
bash$ git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME
bash$ git fetch origin
bash$ git branch -u origin/NEW-BRANCH-NAME NEW-BRANCH-NAME
bash$ git remote set-head origin -a
```

おまけで

```console
bash$ git remote prune origin
```

#### Changing the default branch

> The default branch is the base branch for pull requests and code commits.

リポジトリー `Settings --> General --> Default branch` で設定。

#### Deleting and restoring branches in a pull request

> You can delete a branch that is associated with a pull request if the pull
> request has been merged or closed and there are no other open pull requests
> referencing the branch.

処理済みの Pull request ページ下部に `Delete branch` があるからそれを押す。
復元したい場合も同様の手順。

### Configuring pull request merges

#### About merge methods on GitHub

> The default merge method creates a merge commit.

これは Git 単体の話？

> The rebase and merge behavior on GitHub deviates slightly from `git rebase`.

このことを承知しておく。

以前述べたように GitHub 上でのマージでは sign off が効かなくなる。

#### Configuring commit merging for pull requests

リポジトリー `Settings --> General --> Pull Requests` で
`Allow merge commits` をオンにする。

> If you select more than one merge method, collaborators can choose which type
> of merge commit to use when they merge a pull request.

#### Configuring commit squashing for pull requests

リポジトリー `Settings --> General --> Pull Requests` で
`Allow squash merging` をオンにする。

#### Configuring commit rebasing for pull requests

リポジトリー `Settings --> General --> Pull Requests` で
`Allow rebase merging` をオンにする。

#### Managing a merge queue

> Using a merge queue is particularly useful on branches that have a relatively
> high number of pull requests merging each day from many different users.

したがって割愛。

#### Managing suggestions to update pull request branches

Pull request にはベースブランチの最新状態に追いついていて欲しい。

リポジトリー `Settings --> General --> Pull Requests` で
`Always suggest updating pull request branches` をオンにする。

#### Managing auto-merge for pull requests in your repository

> If you allow auto-merge for pull requests in your repository, people with
> write permissions can configure individual pull requests in the repository to
> merge automatically when all merge requirements are met.

リポジトリー `Settings --> General --> Pull Requests` で
`Allow auto-merge` をオンにする。

#### Managing the automatic deletion of branches

リポジトリー `Settings --> General --> Pull Requests` で
`Automatically delete head branches` をオンにする。

### Managing protected branches

> For example, you can block pull requests that don't pass status checks or
> require that pull requests have a specific number of approving reviews before
> they can be merged.

#### About protected branches

ブランチに対する push, merge, delete から保護したいというのが主旨だ。

> By default, the restrictions of a branch protection rule don't apply to people
> with admin permissions to the repository or custom roles with the "bypass
> branch protections" permission.

特権を有する人には効かない。

> Required status checks ensure that all required CI tests are passing before
> collaborators can make changes to a protected branch.

？

> When you enable required commit signing on a branch, contributors and bots can
> only push commits that have been signed and verified to the branch.

だんだんごちゃごちゃしてきた。

> A strictly linear commit history can help teams reverse changes more easily.

これは良さそうだ。

> You can require that changes are successfully deployed to specific
> environments before a branch can be merged.

> Locking a branch ensures that no commits can be made to the branch.

#### Managing a branch protection rule

リポジトリー `Settings --> Branches --> Add branch protection rules` を押す。
パターンを記入、オプションを追加する。

上級者向け機能。割愛。

### Managing rulesets for a repository

#### About rulesets

> A ruleset is a named list of rules that applies to a repository. You can
> create rulesets to control how people can interact with selected branches and
> tags in a repository.

既視感のある機能だが？

Rulesets のほうが branch protection よりも望ましい。

#### Creating rulesets for a repository

リポジトリー `Settings --> Rules --> Rulesets` で緑ボタンを押す。

#### Managing rulesets for a repository

ブランチ一覧画面で Rulesets を有するブランチの盾アイコンを押す。

#### Available rules for rulesets

* Restrict creations
* Restrict updates
* Restrict deletions
* Require linear history
* Require deployments to succeed before merging
* Require signed commits
* Require a pull request before merging
* Require status checks to pass before merging
* Block force pushes

#### Troubleshooting rules

> Depending on which rules are active, you may need to edit your commit history
> locally before you can push your commits to the remote branch.

や

> If a branch or tag is targeted by rules restricting the metadata of commits,
> your commits may be rejected if part of the commit's metadata does not match a
> certain pattern.

を覚えておく。

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
