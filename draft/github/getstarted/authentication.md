---
title: Authentication
---

## Account security

### About authentication to GitHub

認証する場所によって異なる認証情報を使う。

* Username and password with two-factor authentication, or a passkey
* Personal access token
* SSH key

«Two-factor authentication (2FA) (recommended)»

«The method of authenticating is determined based on whether you choose an HTTPS
or SSH remote URL when you clone the repository.»

`gh auth login`

### Creating a strong password

GitHub の言う強いパスワードとは何か。

### Updating your GitHub access credentials

> GitHub credentials include not only your password, but also the access tokens,
> SSH keys, and application API tokens you use to communicate with GitHub.
> Should you have the need, you can reset all of these access credentials
> yourself.

`Settings --> Password and authentication` でパスワード変更可能。

### Managing your personal access tokens

パスワードと同格の情報として扱え。

> Personal access tokens are an alternative to using passwords for
> authentication to GitHub when using the GitHub API or the command line.

トークンは fine-graned のほうをなるべく使う。

> As a security precaution, GitHub automatically removes personal access tokens
> that haven't been used in a year.

これは怖い。GitHub には頻繁にアクセスしよう。

`Settings --> Developer settings` で画面を移動して `Personal access tokens -->
Fine-grained tokens.`

トークンを抹消することも可能。

> Once you have a personal access token, you can enter it instead of your
> password when performing Git operations over HTTPS.

HTTPS 限定。

### Reviewing your SSH keys

各種キーは定期的に audit する。

`Settings --> SSH and GPG keys`

`eval "$(ssh-agent -s)"` の手順で `ssh-add -l -E sha256` が成功しない場合は単に
`ssh-add` してからもう一度。

### Reviewing your deploy keys

Repository の `Settings --> Deploy keys`

### Token expiration and revocation

> If a valid OAuth token, GitHub App token, or personal access token is pushed
> to a public repository or public gist, the token will be automatically
> revoked.

この運用ならば安心だ。

### Reviewing your security log

`Settings --> Security log`

### Security log events

`Settings --> Security log` のフィルター `action:` 一覧。

### Removing sensitive data from a repository

この節は実践的だ。後でしっかり読む。

```console
$ git filter-repo
...
$ git push --force
```

### About anonymized URLs

？

### About GitHub's IP addresses

> For applications to function, you must allow TCP ports 22, 80, and 443 via our
> IP ranges for github.com.

### GitHub's SSH key fingerprints

> You can add the following ssh key entries to your `~/.ssh/known_hosts` file to
> avoid manually verifying GitHub hosts:

これはやっておくと吉。

### Sudo mode

> To maintain the security of your account when you perform a potentially
> sensitive action on GitHub.com, you must authenticate even though you're
> already signed in.

確かにたまに出てくる。

> After you authenticate to perform a sensitive action, your session is
> temporarily in "sudo mode."

### Preventing unauthorized access

> GitHub requires a password to perform sensitive actions, such as adding new
> SSH keys, authorizing applications, or modifying team members.

### Viewing and managing your sessions

`Settings --> Sessions`

## Secure your account with 2FA

> GitHub will gradually begin to require all users who contribute code on
> GitHub.com to enable one or more forms of two-factor authentication (2FA).

### About two-factor authentication

> With 2FA, you have to log in with your username and password and provide
> another form of authentication that only you know or have access to.

> After you enable 2FA, GitHub generates an authentication code any time someone
> attempts to sign into your account on GitHub.com.

> We strongly urge you to enable 2FA for the safety of your account, not only on
> GitHub, but on other websites and apps that support 2FA. 

回復コードはどうしたか？

### Configuring two-factor authentication

TOTP はワンタイムパスワードの acronym らしい。

> After you configure 2FA, your account will enter a 28-day check up period. You
> can leave the check up period by successfully performing 2FA in those 28 days.

> Just search for TOTP app in your browser to find various options.

ワンタイムパスワード用のソフトを別途用意しておく。ブラウザーの拡張機能にあるはずだ。

`Settings --> Password and authentication --> Two-factor authentication`
で `Enable two-factor authentication` しておく。重要。

`Setup authenticator app` は二度と出来ない？

### Configuring two-factor authentication recovery methods

> In addition to securely storing your two-factor authentication (2FA) recovery
> codes, we strongly recommend configuring two or more authentication methods to
> avoid losing access to your account.

回復コードをダウンロードして保存しておく。

> If you generate new recovery codes or disable and re-enable 2FA, the recovery
> codes in your security settings automatically update. Reconfiguring your 2FA
> settings without disabling 2FA will not change your recovery codes.

`Settings --> Password and authentication --> Two-factor authentication`
で `Recovery codes` を View する。

> Once you use a recovery code to regain access to your account, it cannot be
> reused.

これはうっかりしそうだから忘れるな。

Authenticator ソフトにバックアップ機能があるから確認しておく。

### Accessing GitHub using two-factor authentication

> After you sign in to GitHub using your password, you'll need to provide an
> authentication code, tap a notification in GitHub Mobile, or use a security
> key to perform 2FA.

第一の方法しか行使したことがない。

> If you delete your authenticator application after configuring two-factor
> authentication, you'll need to provide your recovery code to get access to
> your account.

Authenticator ソフトをむやみに削除してはならない。

> If you have enabled 2FA, and you have added a passkey to your account, you can
> use the passkey to sign in. Since passkeys satisfy both password and 2FA
> requirements, you can complete your sign in with a single step. 

これは便利そうだ。

> Enabling 2FA doesn't change how you authenticate to GitHub on the command line
> using SSH URLs.

良かった。

### Recovering your account if you lose your 2FA credentials

なるべく世話になりたくない項目。

`github-recovery-codes.txt` を安全に保存しておく。

### Changing your preferred two-factor authentication method

`Preferred 2FA method`

### Countries where SMS authentication is supported

Japan がある。

### Disabling two-factor authentication for your personal account

無効にすることはない。

## Authenticate with a passkey

### About passkeys

> This means passkeys verify your identity using "something you know" or
> "something you are", such as a PIN or biometric check of your fingerprint or
> face.

`Feature Preview --> Passkeys` で `Enable` する。

### Manage your passkeys

やってみると「セキュリティーキーを USB に挿す」がわからず詰む。
USB 棒が文字通り鍵になる仕組みのようだ。

### Sign in with a passkey

https://github.com/login?passkey=true で実行。

## Connect with SSH

> You can connect to GitHub using the Secure Shell Protocol (SSH), which
> provides a secure channel over an unsecured network.

### About SSH

> When you connect via SSH, you authenticate using a private key file on your
> local machine.

SSH と鍵と計算機が関係することを覚えておく。

> You must also add the public SSH key to your account on GitHub before you use
> the key to authenticate or sign commits.

鍵は二種類あり、もう一方を GitHub に託す。

> You can further secure your SSH key by using a hardware security key,

電子の世界にない鍵を使うことが可能。

SSH 鍵目録を定期的に確認する。

> If you haven't used your SSH key for a year, then GitHub will automatically
> delete your inactive SSH key as a security precaution.

一年間出番のなかった SSH 鍵は GitHub が削除する。

### SSH agent forwarding

* `ssh-agent` の簡単な説明がある。

```console
bash$ ssh -T git@github.com
Hi showa-yojyo! You've successfully authenticated, but GitHub does not provide shell access.
```

```console
bash$ echo "$SSH_AUTH_SOCK"
```

```console
bash$ cat ~/.ssh/config
Host github.com
    IdentityFile ~/.ssh/id_rsa
    User git
```

これはいいのか？

```console
bash$ ssh-add -L
```

これで鍵が `ssh-agent` に見えることを確認。

### Managing deploy keys

> Learn different ways to manage SSH keys on your servers when you automate
> deployment scripts and which way is best for you.

> You can manage SSH keys on your servers when automating deployment scripts
> using SSH agent forwarding, HTTPS with OAuth tokens, deploy keys, or machine
> users.

> You can launch projects from a repository on GitHub.com to your server by
> using a deploy key, which is an SSH key that grants access to a single
> repository.

プロジェクトページの `Settings --> Deploy keys` にて鍵を加える。

残りも全くわからない。

### Check for existing SSH key

このページは Linux タブを見ればいい。

> DSA keys (ssh-dss) are no longer supported. You cannot add new DSA keys to
> your personal account on GitHub.com.

```console
bash$ ls -al ~/.ssh
```

### Generate new SSH key

> When you generate an SSH key, you can add a passphrase to further secure the
> key. Whenever you use the key, you must enter the passphrase.

```console
bash$ ssh-keygen -t ed25519 -C yojyo@hotmail.com
```

これを実行する前に passphrase を決めておく。

```console
bash$ eval "$(ssh-agent -s)"
bash$ ssh-add ~/.ssh/id_ed25519
```

ハードウェア版手順あり。

### Add a new SSH key

`Settings --> SSH and GPG keys --> SSH keys` 確認。
`ssh-add -l -E sha256` と同じ文字列だ。

### Test your SSH connection

再び：

```console
bash$ ssh -T git@github.com
```

### SSH key passphrases

> With SSH keys, if someone gains access to your computer, the attacker can gain
> access to every system that uses that key. To add an extra layer of security,
> you can add a passphrase to your SSH key.

PC が盗まれたときに備えた仕掛けだ。

```console
$ ssh-keygen -p -f ~/.ssh/id_ed25519
```

`ssh-agent` は走らせておくものらしい。

## Troubleshooting SSH

> When using SSH to connect and authenticate to GitHub, you may need to
> troubleshoot unexpected issues that may arise.

実際に問題が起こってから読んでも間に合う。

### Using SSH over the HTTPS port

```console
bash$ ssh -T -p 443 git@ssh.github.com
```

### Recovering your SSH key passphrase

Mac 以外は回復不能。

### Deleted or missing SSH keys

先述のように、GitHub は一年間利用がないキーを削除する。

> You can check if you haven't used an SSH key in a year by reviewing your
> account's security log.

### Error: Host key verification failed

> You may see this error if the server has changed its keys unexpectedly

### Error: Permission denied (publickey)

トラブルになったわけではないが読んだ。

### Error: Bad file number

> This error usually means you were unable to connect to the server. Often this
> is caused by firewalls and proxy servers.

### Error: Key already in use
### Error: Permission to user/repo denied to other-user

> To fix this, the owner of the repository (user) needs to add your account
> (other-user) as a collaborator on the repository or to a team that has write
> access to the repository.

### Error: Permission to user/repo denied to user/other-repo

このエラーはたぶん出ない。

### Error: Agent admitted failure to sign

まれに出るかもしれないエラー。

> You should be able to fix this error by loading your keys into your SSH agent
> with ssh-add

### Error: ssh-add: illegal option -- K

Mac 問題。

### Error: SSL certificate problem, verify that the CA cert is OK

> If your CA root certificate needs to be updated, you won't be able to push or
> pull from GitHub repositories.

CA を更新する必要があるのだが、それは OS を更新することを意味する？

### Error: Unknown key type

OpenSSH を更新する。

### Error: We're doing an SSH key audit

> To fix this, you need to review your SSH keys and either reject or approve the
> unverified key.

## Verify commit signatures

### Commit signature verification
### Displaying verification for all commits
### Existing GPG keys
### Generating a new GPG key
### Add a GPG key
### Tell Git about your signing key
### Associate email with GPG key
### Signing commits
### Signing tags

## Troubleshoot verification

### Check verification status
### Use verified email in GPG key
