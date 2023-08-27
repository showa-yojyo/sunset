---
title: Account and profile
---

## Setting up and managing your personal account on GitHub

アカウント設定管理に関する項目。以下、`Settings` とあるのはアカウントかプロジェクトのどちらか。

### Managing user account settings

* 個人用ダッシュボード

  画面左上のネコアイコン押しでしか出ない画面。

* テーマ設定（明るい暗い） `Settings --> Appearance --> Theme preferences`
* タブのスペース数 `Settings --> Appearance --> Tab size preference`
* GitHub 利用者名を変更する `Settings --> Account --> Change user name`
  これを乱用してはいけない。
* Permission levels なんたら (2)
  細かい。`Settings --> Collaborators`
* アクセス可能性 `Settings --> Accessibility --> Keyboard shortcuts`, etc.
* 既定ブランチ名管理 `Settings --> Repositories --> Repository default branch`
* コード安全保障＆分析 `Settings --> Code security and analysis`
  クッキーのリセット方法。

### Managing your personal account

* 複数アカウント管理
  * 認証は PC 単位でなされるらしいことを覚えておく。
  * HTTPS or SSH
  * (HTTPS) 複数アカウントの全てで HTTPS プロトコルを使いたい場合は、リポジトリごとに異
    なる認証情報を保存するように Git を設定することで、アカウントごとに異なる個
    人アクセストークンを使うこともある。
  * (HTTPS) The first time that you use Git to clone a repository or access data
    in a repository that you've already cloned, Git will request credentials.
  * (SSH) アカウントごとに SSH キーを用意する。
  * (SSH) `GIT_SSH_COMMAND` を次のように設定する：

    ```bash
    GIT_SSH_COMMAND='ssh -i PATH/TO/KEY/FILE -o IdentitiesOnly=yes' git clone git@github.com:OWNER/REPOSITORY
    ```

* 複数アカウント統合
  * GitHub の複数の操作を手動で行うことによる？
* 利用者を組織に変換
  * これも。Transfer account 操作が急所か。
* 会社を辞める際のベストプラクティス
  * 勤め人ではないので必要ない。
* Unlinking your email address from a locked account
  * ログイン画面の操作かサポートに連絡で。
* 個人アカウントの削除 `Settings --> Account --> Delete your account`
  * これは実施するつもりはない。

### Managing email preferences

* Adding an email address to your GitHub account
  * GitHub allows you to add as many email addresses to your account as you
    like.
  * `Settings --> Emails --> Add email address`
* Changing your primary email address
  * `Settings --> Emails --> Primary email address` のドロップダウンリスト
* Setting a backup email address
  * `Settings --> Emails --> Backup email address`
* Setting your commit email address
  * `git config --global user.email "YOUR_EMAIL"`
  * `Settings --> Emails --> Keep my email addresses private` Noreply アドレスが
    わからない場合、このチェックボックスを二度いじると説明文に現れる。
* Blocking command line pushes that expose your personal email address
  * 上記項目参照。`Settings --> Emails --> Block command line pushes that expose my email`
* Remembering your GitHub username or email
  * `git config user.name`
  * `git remote -v`
* Types of emails GitHub sends: 不要
* Managing marketing emails from GitHub
  * `Settings --> Emails --> Email preferences` で `Only receive account related
    emails, and those I subscribe to.` を選択。

### Managing access to your personal repositories

GitHub Free 利用者ゆえ後回し。

### Managing your membership in organizations

* About organization membership
* Accessing an organization
  * `Settings --> Organizations --> Organizations`
* Viewing people's roles in an organization
  * Organization 画面上部の `People`
  * フィルターあり
* Requesting organization approval for OAuth apps
  * `Settings --> Applications --> Authorized OAuth Apps`
  * 今のところ Azure 系、CI 系、VS Code 拡張系で構成。
* Publicizing or hiding organization membership
  * Organization 画面上部の `People`
  * 利用者行の Private を Public に切り替える。
* Managing your scheduled reminders
  * `Settings --> Scheduled remainders`
* Removing yourself from an organization
  * `Settings --> Organizations --> Organizations` で `Leave` 押す。

## Setting up and managing your GitHub profile

### Customizing your profile

* About your profile
  * «If you add a README file to the root of a public repository with the same
    name as your username, that README will automatically appear on your profile
    page» これをやっていない。
* About your organization's profile
  * «You can customize your organization's public profile by adding a README.md
    file»
* Personalizing your profile
  * `Settings --> Public profile` の `Profile pitcure` で証明写真画像などをアップロード可能。
  * `Settings --> Public profile` の `Name` で名前を示す。
  * `Settings --> Public profile` の `Bio` に経歴を書く。
  * 等々、この辺りは見れば分かる。
  * 右上ドロップダウンで Busy に設定する。
  * 特定のリポジトリーにコミットすると、勲章をゲット。
* Managing your profile README
  * GitHub username と合致する公開リポジトリーに中身のある README.md があれば、それが適用される。
  * README を削除することが可能。
* Pinning items to your profile
  * プロフィール画面の `Customize your pins` の UI で実施。
* Setting your profile to private
  * 不要
  * `Settings --> Contributions & Activity` の `Make profile private and hide activity` をオン。

### Managing contribution settings on your profile

* Viewing contributions on your profile
* Showing an overview of your activity on your profile
  * プロフィール画面のカレンダー右上 `Contribution settings`
* Showing your private contributions and achievements on your profile
  * `Contribution settings --> Private contributions` を見せる方向に設定する。
  * プロフィール画面の実績をクリックすると……。
* Sending enterprise contributions to your GitHub.com profile
  * 割愛
* Why are my contributions not showing up on my profile?
  * 貢献の定義とみなせる。
* Troubleshooting commits on your timeline
  * «If the author and commit date are different, you can manually change the
    commit date in the URL to see the commit details»

## Managing subscriptions and notifications on GitHub

### Setting up notifications

* About notifications
  * 画面右上の受信箱
  * Notifications 画面の記述
  * マークしていない通知項目はおのずと消える。
* Configuring notifications
  * ここは放っておこう。

### Viewing and triaging notifications

* Managing notifications from your inbox
* Triaging a single notification
* Customizing a workflow for triaging your notifications

### Managing subscriptions for activity on GitHub

* Viewing your subscriptions
* Managing your subscriptions
  * `Notifications` 画面の `Manage notifications`
  * `Settings --> Notifications`
