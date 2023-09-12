---
title: GitHub Docs Pull requests documentation ノート
---

## Committing changes to your project

> You can manage code changes in a repository by grouping work into commits.

コミットは作業の単位であるとされる。

### Creating and editing commits • 4 articles

#### About commits

> Git assigns each commit a unique ID, called a SHA or hash

ファイルの SHA とは別のものとなる。

この後見ていくもの：

* サインオフ
* 共同作業者
* 組織
* コミット順序の変更

> You can see which branch a commit is on by looking at the labels beneath the
> commit on the commit page.

リポジトリーページの `XXXX commits` を押し、コミット項目のログメッセージを押す。
このページでブランチ名などを確認可能。

> If the commit is part of an unmerged pull request, you can click the link to
> go to the pull request.

コミットが複数ファイルを含むとき、ページ左側にツリーが表示される。

#### Creating a commit with multiple authors

> You can attribute a commit to more than one author by adding one or more
> `Co-authored-by` trailers to the commit's message.

これは知らなんだ。

共同コミット者の GitHub で通用するメールアドレスを知っている必要がある。例の
`no-reply` アドレスを利用している場合はそれで通す。

Git では共同コミット者を指定するには、コミットログを次のように記入する。空行二つに注意。

```console
bash$ git commit -m "Refactor usability tests.
>
>
> Co-authored-by: NAME <NAME@EXAMPLE.COM>
> Co-authored-by: ANOTHER-NAME <ANOTHER-NAME@EXAMPLE.COM>"
```

GitHub での方法はコミットログ欄で同様の書式を採用するようだ。

#### Creating a commit on behalf of an organization

割愛。

#### Changing a commit message

> In Git, the text of the commit message is part of the commit. Changing the
> commit message will change the commit ID

GitHub にプッシュする前かつコミット直後なら `git commit --amend -m MESSAGE` で事足りる。
そうでない場合、ローカルで `git rebase -i` などでログメッセージを修正し、プッシュし直す：

```console
bash$ git push --force-with-lease origin BRANCH
```

> As before, amending the commit message will result in a new commit with a new
> ID. However, in this case, every commit that follows the amended commit will
> also get a new ID because each commit also contains the id of its parent.

### Viewing and comparing commits

#### Comparing commits

> To compare different versions of your repository, append `/compare` to your
> repository's path.

例えば `https://github.com/octocat/linguist/compare/master...octocat:master` のようにする。

比較は `base` と `compare` の対象二つを取る。

> The most common use of `Compare` is to compare branches, such as when you're
> starting a new pull request.

> To compare branches, you can select a branch name from the `compare` drop down
> menu at the top of the page.

タグ同士の比較も普通だ。リリースの差分を確認したい場合がある：

> To compare tags, you can select a tag name from the `compare` drop-down menu
> at the top of the page.

任意のコミットを比較する場合、URL を直接入力するほうが早い：

> For example, this URL uses the shortened seven-character SHA codes to compare
> commits `f75c570` and `3391dcc`:
> `https://github.com/github-linguist/linguist/compare/f75c570..3391dcc`.

リポジトリーをまたぐ比較もあり得る：

> To compare branches on different repositories, preface the branch names with
> user names.

#### Differences between commit views

GitHub には次の二つのコミット情報表示方式があり、場合によっては表示が異なる：

> * Navigating directly to the commits page of a repository
> * Clicking on a file, then clicking `History`, to get to the commit history
>   for a specific file

### Troubleshooting commits

#### Commit exists on GitHub but not in my local clone

誰かが `git push --force` した可能性などがある。

まず、念のため `git fetch REMOTE` する。

> You can use `git fetch upstream` to get information from a repository you've
> forked, or `git fetch origin` to get information from a repository you've only
> cloned.

誰かが対象コミットを含むブランチを削除した場合、一時的に当該ブランチを GitHub にプッシュしてもらう：

```console
bash$ git branch recover-B B
bash$ git push upstream B:recover-B
```

その後、他の人が `git fetch upstream recover-B` する。

> Avoid force pushing to a repository unless absolutely necessary. This is
> especially true if more than one person can push to the repository.

#### Why are my commits linked to the wrong user?

メールアドレスが関係している。

> If your commits are linked to another user, that means the email address in
> your local Git configuration settings is connected to that user's account on
> GitHub. In this case, you can change the email in your local Git configuration
> settings and add the new email address to your account on GitHub.com account
> to link future commits to your account.

アカウント `Settings --> Emails` を確認すること。

GitHub Commits ページ各項目に自分のコミットに自分の名前が出ない場合は次のどれかになるようだ：

* `Unrecognized author`: メールありの場合となしの場合で対処が異なる。
* `Invalid email`: これはローカルの、つまり Git の `user.email` 設定がなされていない。

## Collaborating with pull requests

### Getting started

#### About collaborative development models

> The way you use pull requests depends on the type of development model you use
> in your project. You can use the fork and pull model or the shared repository
> model.

二つ述べられている：

* Fork and pull model
* Shared repository model

ブランチをどのリポジトリーに設けるかが大きな差異であると見立てたが？

### Working with forks

#### About forks

> A fork is a new repository that shares code and visibility settings with the
> original “upstream” repository.

特徴は次の二点に集約されるか：

> After you fork a repository, you can fetch updates from the upstream
> repository to keep your fork up to date, and you can propose changes from your
> fork to the upstream repository with pull requests.

GitHub 上では、フォークはその川上リポジトリーが名前の下に示される。

> After a fork is deleted, you cannot restore the fork.

特に、

> If you delete a private repository, all forks of the repository are deleted.

Pull request をしないつもりなら、用意されていればテンプレートから作成する手もある。

#### About permissions and visibility of forks

> If you fork a private repository that belongs to a personal account, external
> collaborators also get access to the fork.

これは不思議な感じがある。

> You cannot change the visibility of a fork.

こういう概念がある：

> All repositories belong to a repository network.

フォークを扱う場合、自分のリポジトリーからのフォークを許可する場合、安全保障上考慮する点がいくつもある。
特に、川上リポジトリーの所有者はフォークに対して介入できないと考える方がいい。

> The permissions and visibility of forks depend on whether the upstream
> repository is public or private, and whether it is owned by an organization.

さっきから次の条件が何かひっかかる：

> If you fork a private repository that belongs to a personal account, external
> collaborators also get access to the fork.

次の公開リポジトリーに対するフォークの公開性は明瞭：

> All forks of public repositories are public. You cannot change the visibility
> of a fork.

私設フォークの権限は川上リポジトリーのそれを継承する。ある意味では、川上の権限者はフォークに口出しできるのか？

> Private forks inherit the permissions structure of the upstream repository.

#### Configuring a remote repository for a fork

> You must configure a remote that points to the upstream repository in Git to
> sync changes you make in a fork with the original repository.

これは Git の基本なので必ず習得するべし。

```console
bash$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

#### Syncing a fork

フォークリポジトリー画面の `Sync fork` を押す。

ローカルからコマンドで実行する方法がある：

```console
bash$ gh repo sync owner/cli-fork -b BRANCH_NAME
```

Git では（この方法はフォークの意義をよく表していると思う）：

```console
bash$ git fetch upstream
bash$ git checkout main
bash$ git merge upstream/main
```

#### Allowing changes to a pull request branch created from a fork

> If the pull request author wants greater collaboration, they can grant
> maintainers of the upstream repository (that is, anyone with push access to
> the upstream repository) permission to commit to the pull request's compare
> branch.

フォーク側が川上に許可をすると読めるが？

GitHub の操作として、Pull request したい人が川上リポジトリーの `Pull requests`
画面に行き、対象リクエストの `Allow edits from maintainers` を押すらしい？

#### What happens to forks when a repository is deleted or changes visibility?

> When you delete a private repository, all of its private forks are also deleted.

ただしクローンならば維持される。

> When you delete a public repository, one of the existing public forks is
> chosen to be the new upstream repository.

この法則はリポジトリーネットワークと関係しているはず。

> If a public repository is made private, its public forks are split off into a
> new network.

この場合が複雑で、フォーク側の pull request 先が少なくとも本来の川上リポジトリーではなくなる。

### Collaborating on repositories with code quality features

ワークフロー品質管理とは？

#### About status checks

> Status checks are based on external processes, such as continuous integration
> builds, which run for each push you make to a repository. You can see the
> pending, passing, or failing state of status checks next to individual commits
> in your pull request.

Pull request 欄に表示されるもので、通常のコミットには現れない？

> Checks are different from statuses in that they provide line annotations, more
> detailed messaging, and are only available for use with GitHub Apps.

> When a specific line in a commit causes a check to fail, you will see details
> about the failure, warning, or notice next to the relevant code in the `Files`
> tab of the pull request.

Pull request 画面の `Checks` で確認。

コミットの checks を省略させたり、要求させたりすることをコミットログで指示可能。
例によって二行の空行の後に指示をする：

```console
bash$ git commit -m "Refactor usability tests
>
>
request-checks: true"
```

#### Troubleshooting required status checks

> After you enable required status checks, your branch may need to be up-to-date
> with the base branch before merging.

> You won't be able to push local changes to a protected branch until all
> required status checks pass.

手堅い。

> Sometimes, the results of the status checks for the test merge commit and head
> commit will conflict.

これはプロジェクト進行が怪しいのではないか。

この辺りは後ほど。

### Proposing changes to your work with pull requests

これが本題なのでは。

#### About branches

> You can merge a branch into another branch using a pull request.

> You can also use a branch to publish a GitHub Pages site.

これは別途やる。

次は既定ブランチの定義であり、GitHub 固有の概念と考える方がいい：

> The default branch is the branch that GitHub displays when anyone visits your
> repository. The default branch is also the initial branch that Git checks out
> locally when someone clones the repository.

Pull request を始める：

> Once you're satisfied with your work, you can open a pull request to merge the
> changes in the current branch (the head branch) into another branch (the base
> branch).

Pull request が完了したら、用済みブランチを削除する。

保護ブランチ：

> If you're working on a branch that's protected, you won't be able to delete or
> force push to the branch.

保護ブランチの性質はたくさんある。もっと簡単にまとめる。

#### Creating and deleting branches within your repository

ブランチを GitHub で作成、削除する方法。割愛。

> If the branch you want to delete is associated with an open pull request, you
> must merge or close the pull request before deleting the branch.

ブランチに関連する未済 pull requests を道連れに削除する。

#### About pull requests

Draft pull requests という機能がある。下書きなのでこれはマージされない。
通常の pull requests から下書きに変換することは可能。

> The compare and pull request pages use different methods to calculate the diff
> for changed files:

後でまとめる。

#### About comparing branches in pull requests

* `Files changed` を押すと差分が表示される画面になる。
* 差分表示モードがいくつかある。
* 大規模 pull request の概要をつかむために、各種フィルターを利用する。

> There are two comparison methods for the git diff command; two-dot (`git diff
> A..B`) and three-dot (`git diff A...B`). By default, pull requests on GitHub
> show a three-dot diff.

> The three-dot comparison shows the difference between the latest common commit
> of both branches (merge base) and the most recent version of the topic branch.

この記述だとまだわかりづらい。

> Since the three-dot comparison compares with the merge base, it is focusing on
> "what a pull request introduces".

> In contrast, by comparing the branches using the three-dot comparison, changes
> in the topic branch are always in the diff if the base branch is updated,
> because the diff shows all of the changes since the branches diverged.

これでようやく理解できる。そしてマージはしょっちゅう行うほうが良い：

> To avoid getting confused, merge the base branch (for example, main) into your
> topic branch frequently. By merging the base branch, the diffs shown by
> two-dot and three-dot comparisons are the same.

#### Creating a pull request

普通は対象リポジトリーをフォークするところから始める。

> Pull requests can only be opened between two branches that are different.

用語を二つ確認する：

> When thinking about branches, remember that the base branch is where changes
> should be applied, the head branch contains what you would like to be applied.

`Compare & pull request` ボタンを押す。それから `Create Pull Request` を押す。

GitHub CLI でも作成可能だ。

```console
bash$ gh pr create --base my-base-branch --head my-changed-branch
```

#### Creating a pull request from a fork

`Open a pull request` 画面に小さく書いてある `compare across forks` を押す。

* `base`: 川上
* `head`: compare ブランチ

`Allow edits from maintainers` を押す。`Create Pull Request` を押せるように進む。

#### Using query parameters to create a pull request

> Use query parameters to create custom URLs to open pull requests with
> pre-populated fields.

HTTP リクエストで pull request を開く。これを使うぐらいなら GitHub CLI でいいだろう。

#### Changing the stage of a pull request

> You can mark a draft pull request as ready for review or convert a pull
> request to a draft.

* 下書きの `Ready for review` を押す。
* Pull request の `Convert to draft` を押す。

#### Requesting a pull request review

> After you create a pull request, you can ask a specific person to review the
> changes you've proposed.

> Owners and collaborators on a repository owned by a personal account can
> assign pull request reviews.

> Suggested reviewers are based on `git blame` data.

`Reviewers` 欄を見ればわかる？

#### Keeping your pull request in sync with the base branch

> Updating your pull request with the latest changes from the base branch can
> help catch problems prior to merging.

これはさっき述べられた。

`Pull requests` 画面のリクエスト項目にある `Update branch` などを押す。
ドロップダウンリストにマージオプションがある。

#### Changing the base branch of a pull request

> After a pull request is opened, you can change the base branch to compare the
> changes in the pull request against a different branch.

この機能は要るのか？

#### Committing changes to a pull request branch created from a fork

> You can commit changes on a pull request branch that was created from a fork
> of your repository with permission from the pull request creator.

Git 操作で当該ブランチをローカルにクローンして、普通にコミットする。

### Addressing merge conflicts

#### About merge conflicts

#### Resolving a merge conflict on GitHub

#### Resolving a merge conflict using the command line

### Reviewing changes in pull requests

#### About pull request reviews

#### Reviewing proposed changes in a pull request

#### Filtering files in a pull request

#### Finding changed methods and functions in a pull request

#### Commenting on a pull request

#### Viewing a pull request review

#### Reviewing dependency changes in a pull request

#### Incorporating feedback in your pull request

#### Approving a pull request with required reviews

#### Dismissing a pull request review

#### Checking out pull requests locally

### Incorporating changes from a pull request

#### About pull request merges

#### Merging a pull request

#### Automatically merging a pull request

#### Merging a pull request with a merge queue

#### Closing a pull request

#### Reverting a pull request
