---
title: Get started with GitHub documentation ノート
---

## Quickstart

> Get started using GitHub to manage Git repositories and collaborate with
> others.

後者にはほとんど興味がなく、前者を極めたい。

### Hello World

すでにリポジトリーを何個も何個も持っている利用者は読み飛ばし可。

> This tutorial teaches you GitHub essentials like repositories, branches,
> commits, and pull requests. You'll create your own Hello World repository and
> learn GitHub's pull request workflow, a popular way to create and review code.

> To complete this tutorial, you need a GitHub account and Internet access.

* 画面右上の `New Repository`
* «By default, your repository has one branch named `main` that is considered to
  be the definitive branch.»
* `Repository` 画面の `Create branch`

こんな感じでブラウザーごしで Git 操作を続けていくチュートリアルだ。この後は
pull request を生じてマージする流れになる。

### Set up Git

この記事で注目すべきは Authenticating with GitHub from Git か。

HTTPS か SSH か。HTTPS を推奨している。

> If you clone with SSH, you must generate SSH keys on each computer you use to
> push or pull from GitHub.

### Create a repo

> In the command line, navigate to the directory where you would like to create
> a local clone of your new project.

> To create a repository for your project, use the `gh repo create` subcommand.
> When prompted, select Create a new repository on GitHub from scratch and enter
> the name of your new project. If you want your project to belong to an
> organization instead of to your personal account, specify the organization
> name and project name with `organization-name/project-name`.

実際には GitHub に新規リポジトリーをコンソールでいきなり作成することはない。
一度だけ試したらもうやらないだろう。

> Follow the interactive prompts. To clone the repository locally, confirm yes
> when asked if you would like to clone the remote project directory.

> Alternatively, to skip the prompts supply the repository name and a visibility
> flag (`--public`, `--private`, or `--internal`). For example, `gh repo create
> project-name --public`. To clone the repository locally, pass the `--clone`
> flag. For more information about possible arguments, see the GitHub CLI
> manual.

通常の Git 操作コマンドについては割愛。以下同様。

### Fork a repo

GitHub では fork と pull request はセットで行う。

```console
bash$ gh repo fork REPOSITORY
bash$ gh repo fork REPOSITORY --clone=true
```

> When you fork a project in order to propose changes to the upstream
> repository, you can configure Git to pull changes from the upstream repository
> into the local clone of your fork.

これをやらないとオリジナルに対して中身がどんどんかけ離れていく。

```console
bash$ gh repo fork REPOSITORY --remote=true
```

* Creating branches
* Opening pull requests

> You have now forked a repository, practiced cloning your fork, and configured
> an upstream repository.

### GitHub flow

> GitHub flow is a lightweight, branch-based workflow. The GitHub flow is useful
> for everyone, not just developers.

重要度がわからない。

> To follow GitHub flow, you will need a GitHub account and a repository.

> Ideally, each commit contains an isolated, complete change. This makes it easy
> to revert your changes if you decide to take a different approach.

> Make a separate branch for each set of unrelated changes

> Pull request review is so valuable that some repositories require an approving
> review before pull requests can be merged.

> If you link with a keyword, the issue will close automatically when the pull
> request merges.

> If your repository has checks configured to run on pull requests, you will see
> any checks that failed on your pull request.

> Branch protection settings may block merging if your pull request does not
> meet certain requirements.

### Contributing to projects

フォーク周りの話題。

> If you want to contribute to someone else's project but don't have write
> access to the repository, you can use a "fork and pull request" workflow.

これが contribution の基本。

フォークすなわち新しいリポジトリー。

フォークはクローンありとなしがある。クローンはローカルにリポジトリーを作る。

```console
bash$ gh repo fork REPOSITORY --clone=true
```

> Pull Requests are an area for discussion.

### Be social

人、リポジトリー、組織が対象となる。

> When you follow someone on GitHub, you will get notifications on your personal
> dashboard about their public activity.

フォローの意味を知る。

> To follow someone, click `Follow` on a person's profile page.

フォロー方法はこれしかないか？

リポジトリーの上部にある `Watch` を押すと、そのリポジトリーを次の意味で追うこと
ができる：

> When the owner updates the repository, you will see the changes in your
> personal dashboard.

> GitHub provides built-in collaborative communication tools, allowing you to
> interact closely with your community when building great software.

* Pull request
* Issues
* Discussion (?)

自分が所属している組織は `Your organizations` で確認する：

> From your dashboard, click the drop down menu of your username on the left
> side of your dashboard.

組織をフォローすると何が起こるか：

> When you follow organizations on GitHub, you'll see their public activity on
> your personal dashboard.

組織をフォローする方法：

> To follow an organization, in the header of the organization's page, click
> `Follow`.

> You can star interesting projects to make them easy to find again later.

星の意味とはブックマークだ。

### Communicating on GitHub

* GitHub Issues: often referred to as GitHub's bug-tracking system.
* Pull requests: allow you to propose specific changes.
* GitHub Discussions: often do not result in an actionable task.

Discussion だけが今のところ馴染みがない。

### GitHub glossary

用語集。

* access token
* authentication code
* CA certificate
* code frequency graph: ユーザー概要ページの下に出てくるカレンダーのことか？
* contributor: collaborator ではない
* deploy key
* enterprise account: こういう enterprise は企業の意。
* fenced code block: いつも書くコードブロック記法についている名前はこれだ。
* identicon
* key fingerprint
* Linguist: こんな便利なものが。
* OAuth app
* OAuth token
* punch graph
* recovery code
* single sign-on: SSO
* SSH key: いい説明なのだろうが、まだ理解しない。
* star: ブックマークの他にも、感謝の意という側面もある。
* watch: リポジトリーだけでなく issue も watch 可能。

### Git cheatsheet

これは自作した。

### Learning resources

これらの資料を見るのはこの文書をクリアしてからだ。

* [GitHub Skills](https://skills.github.com/)

## Onboarding

### Getting started with your GitHub account

この記事は重要。

> With a personal account on GitHub, you can import or create repositories,
> collaborate with others, and connect with the GitHub community.

* Part 1 Configuring your GitHub account
  * 個人アカウントを生成したら二段階認証の活性化まで突き進め。
  * パスワードを十分強くしろ。
  * GitHub Free でいい。
  * メールアドレスをまともにしろ。
  * 二段階認証でパスキーを指定したい。
  * プロフィール画面と貢献を確認しろ。
* Part 2 Using GitHub's tools and processes
  * Git をまともに利用できるようになり、ローカル設定をまともにしろ。
  * GitHub とやり取りする方法を決めろ。
    * ブラウザー
    * GitHub Desktop
    * IDE or text editor: VS Code など
    * GitHub CLI
    * GitHub API
    * 生の Git
  * Markdown: GitHub で書き物をするときはこの書法を使う。
  * 検索。検索範囲と検索語が急所。
  * ファイル閲覧。GitHub ではリポジトリー内のファイルを操作することが可能。
* Part 3 Collaborating on GitHub
  * リポジトリーは作成・複製・フォークするものだ。
  * GitHub の外部からプロジェクトを輸入することが可能。
  * リポジトリー所有者はそれを完全に制御することが可能。
  * リポジトリーを所有者が設定、管理する。
  * 協力者に向けて環境を整える。
  * GitHub Issues や pull requests でプロジェクト進行を管理する。
  * 通知をやりくりする。
  * GitHub Pages を利用して GitHub に置いたリポジトリーを基にウェブサイトを直接生成する。
    * GitHub Pages は重要。
  * GitHub Discussions を利用して共同体を形成しやすくする。
* Part 4 Customizing and automating your work on GitHub
  * ここが全然わかっていない。
  * GitHub Marketplace: 機能を追加してワークフローを改善する統合機能がある。
    無料・有料のツールを検索、閲覧、インストール可能：
    * GitHub Apps
    * OAuth ソフト
    * GitHub Actions
  * GitHub API
    * REST API or GraphQL API
    * 一般的な作業を自動化
    * データをバックアップ
    * GitHub を拡張する統合機能を作成
  * GitHub Actions
    * GitHub の開発ワークフローを GitHub上で自動化・カスタマイズする。
    * 独自のアクションを作成可能
    * 共同体で共有されているアクションを使用・カスタマイズ可能
  * GitHub Packages: GitHub Packages is a software package hosting service that
    allows you to host your software packages privately or publicly and use
    packages as dependencies in your projects.
* Part 5 Building securely on GitHub
  * 安全保障機能の選択肢はリポジトリーによって異なる。
  * リポジトリーを保護する
    * リポジトリー安全保障設定を行うことで保護することが可能。
      * アクセス管理
      * 安全保障政策の設定
      * 依存関係の管理
      * など
    * 公開リポジトリーではコードとスキャンを設定して脆弱性を自動的に特定し、トー
      クンと鍵が公開されないようにすることも可能。
  * プロジェクトの外部依存関係も安全保障範囲となる。
* Part 6 Participating in GitHub's community
  * オープンソースプロジェクトに貢献する。
  * GitHub Community Support とやり取りする。
  * GitHub Docs を読み込む。
  * GitHub Skills を履修する。これはやるつもり。
  * GitHub Sponsors を介してプロジェクトを金銭的に支援する。

### Getting started with GitHub Team

GitHub Team: 組織アカウントで複数人が同時に複数プロジェクトで共同作業を行う。

* Part 1: Configuring your account on GitHub.com
  * 組織を作って請求を設ける。組織については別途。
  * 請求設定の管理
  * 組織の請求設定にアクセスまたは変更できるのは、所有者または請求支配人の役割の
    組織構成員のみ。
* Part 2: Adding members and setting up teams
  * 組織を作ってから構成員を集める。権限、役割を付与する。離脱や復帰も可。
  * 組織構成員の集合を team と呼んでいる。入れ子可能。
  * 団体に対しても設定の考え方がある。
  * «You can give organization members, teams, and outside collaborators
    different levels of access to repositories owned by your organization with
    repository roles.» とは？
* Part 3: Managing security for your organization
  * 構成員に対する安全保障設定？
  * 組織の安全保障のためのさまざまな安全保障機能
    * «security policies, dependency graphs, secret scanning and Dependabot
      security and version updates»
  * 組織の監査ログ
* Part 4: Setting organization level policies
  * 組織内の行動、機能に対する権限、施策を定める。
  * 例：組織内リポジトリーの作成を禁止する。
  * リポジトリーに対する権限を定める。
  * リポジトリーの public/private を定める。
  * `CONTRIBUTING.md` file, `CODE_OF_CONDUCT.md` などを作成する。
* Part 5: Customizing and automating your work on GitHub
  * 作業を自動化したりカスタマイズしたりすることが可能。
  * GitHub Marketplace を使う。
  * GitHub API を使う。
  * GitHub Actions を使う。これがいちばん自動化、カスタマイズの実現に近いか。
  * GitHub Packages を使う。ソフトパッケージ配布場所サービス。
* Part 6: Participating in GitHub's community
  * オープンソースプロジェクトに貢献する。見つける方法はどこかに述べられていた。
  * GitHub Community Support とやり取りする。
  * GitHub Docs を読み込む。
  * GitHub Skills を履修する。これはやるつもり。
  * GitHub Sponsors を介してプロジェクトを金銭的に支援する。
  * GitHub Support とやり取りする。

### Getting started with GitHub Enterprise Cloud

GitHub Enterprise Cloud は企業アカウントのための枠組だ。割愛。

## Learning about GitHub

開発過程を改善し、他人とともに働こうではないか。

### GitHub’s plans

料金プランの概要。

* About GitHub's plans
  * 無料と有料がある。GitHub Pricing で一覧できる。
* GitHub Free for personal accounts
  * 個人アカウント向け
  * パブリックリポジトリーは全機能搭載かつ無制限
  * プライベートリポジトリーは機能制限付きかつ無制限
  * 共同作業者も無制限
  * 詳細は本文参照。
* GitHub Pro
  * GitHub Free の上位プラン
* GitHub Free for organizations
  * GitHub Free for personal accounts のやや上位プラン
* GitHub Team
  * GitHub Free for organizations のやや上位プラン
* GitHub Enterprise
  * 企業向けプラン

GitHub Actions の利用はおおむね無料。

### Docs versions

この文書群のページ上部のドロップダウンリストから `Free, Pro & Team` を選択する。

現在のプランはページ URL を確認したり、ページ見出しをを確認すればいい。

* URL が `https://github.com` から始まっていればフリー系。
* GitHub トレードマークのすぐ横にテキストがなければフリー系。

### GitHub language support

GitHub 機能でサポートされているプログラミング言語の概要。

GitHub が知っているどの言語でも、コードを検索したり構文強調を効かせたりすることが可能。

中核言語は C, C++, C#, Go, Java, JavaScript, PHP, Python, Ruby, Scala, TypeScript.

### Types of GitHub accounts

* Personal accounts
  * Your personal account can own resources such as repositories, packages, and
    projects. Any time you take any action on GitHub.com, such as creating an
    issue or reviewing a pull request, the action is attributed to your personal
    account.
* Organization accounts
  * 組織は無制限に多くの人が一度に多くのプロジェクトで一緒に働ける共有アカウントだ。
* Enterprise accounts

マシンユーザーなる概念があるようだ。

### Access permissions

> A permission is the ability to perform a specific action. For example, the
> ability to delete an issue is a permission. A role is a set of permissions you
> can assign to individuals or teams.

### GitHub Advanced Security

> Some features of GitHub Advanced Security are also available for public
> repositories on GitHub.com

GitHub Advanced Security を利用するにはライセンス料金が必要。ライセンスに対応す
る機能は次の三つ：

* Code scanning
* Secret scanning
* Dependency review

しかし、無料リポジトリーでも公開ならば利用可能。

### Changes to GitHub plans

> As of April 14, 2020, GitHub announced that all of the core GitHub features
> are now free for everyone.

プランをダウングレードすることも可能。関係ないが。

## Signing up for GitHub

### Sign up for a new GitHub account

新しい personal account を作成するならばサインアウトしてから。

価格設定ページにアクセスして、所望の項目の upgrade ボタンを押す。

### Verify your email address

主要メールアドレスの設定を堅実にしておく。メールアドレスがいい加減だと不可能なアクションが多い。

* Create or fork repositories
* Create issues or pull requests
* Comment on issues, pull requests, or commits
* Authorize OAuth app applications
* Generate personal access tokens
* Receive email notifications
* Star repositories
* Create or update project boards, including adding cards
* Create or update gists
* Create or use GitHub Actions
* Sponsor developers with GitHub Sponsors
* Accept organization invitations


> If you'd like to keep your email address private, you can use a
> GitHub-provided `noreply` email address.

`Settings --> Emails --> Resend verification email`

### Enterprise Cloud trial

割愛。

### Enterprise Server trial

割愛。

## Using GitHub

### Feature preview

画面右上から `Feature preview` を押すとメニューが現れる。

### Supported browsers

次のブラウザーの最新版は必ず使える：

* Apple Safari
* Google Chrome
* Microsoft Edge
* Mozilla Firefox

### GitHub CLI

> GitHub CLI is a command-line tool that brings pull requests, issues, GitHub
> Actions, and other GitHub features to your terminal, so you can do all your
> work in one place.

これを使いこなせるようになる。後で詳しく。

### GitHub Desktop

これは未知。導入するかしないか決めない。

### GitHub Mobile

> GitHub Mobile is available as an Android and iOS app.

これはやるか。認証の学習にもなる。

ちょっとした機能的制限があるようだ。

> If you configure the language on your device to a supported language, GitHub
> Mobile will default to the language. You can change the language for GitHub
> Mobile in GitHub Mobile's Settings menu.

日本語が支援されているので、英語に設定するには明示的に手動で。

### Keyboard shortcuts

> Typing `?` on GitHub brings up a dialog box that lists the keyboard shortcuts
> available for that page.

なるほど。これは便利だ。

### GitHub Command Palette

* About the GitHub Command Palette
  * コマンドパレットは候補が最適化されて出現する。
* Opening the GitHub Command Palette
  * まず `Feature preview` で `Enable` する。
  * Ctrl + K でパレットが出現。
* Navigating with the GitHub Command Palette
  * Tab, Ctrl, Del, BackSpace を活用する。
  * Enter で確定。Ctrl + Enter でブラウザーのタブを追加して開く。
* Searching with the GitHub Command Palette
  * `#` Search for issues, pull requests, discussions, and projects
  * `!` Search for projects
  * `@` Search for users, organizations, and repositories
  * `/` Search for files within a repository scope
* Running commands from the GitHub Command Palette
  * Ctrl + Shift + K で入力欄に `>` の付いたパレットが出現。
* Closing the command palette
  * `Esc` がよい。
* GitHub Command Palette reference
  * いいコマンドがあまりない。

### Allow network access

関係ない。

### Connectivity problems

これも関係ない。

## Writing on GitHub

### Start writing on GitHub
### Work with advanced formatting
### Work with saved replies
### Share content with gists

## Explore projects

### Contribute to open source
### Save repos with stars
### Following people
### Following organizations

## Getting started with Git

### Set your username
### Caching credentials
### Git passwords
### macOS Keychain credentials
### Git workflows
### About remote repositories
### Manage remote repositories
### Associate text editors
### Handle line endings
### Ignoring files

## Using Git

### About Git
### Push commits to a remote
### Get changes from a remote
### Non-fast-forward error
### Splitting a subfolder
### About Git subtree merges
### About Git rebase
### Git rebase
### Resolve conflicts after rebase
### Special characters in names

## Subversion

### Subversion & Git differences
### Support for Subversion clients
### Properties supported by GitHub

## Exploring integrations

### About using integrations
### About building integrations
### Featured integrations
### GitHub Developer Program

## Archive account and public repos

### Request account archive
### GitHub Archive program
