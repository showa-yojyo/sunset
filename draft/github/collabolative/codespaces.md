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

## Customizing your codespace

## Setting up your project for GitHub Codespaces

## Prebuilding your codespaces

## Managing your codespaces

## Managing GitHub Codespaces for your organization

## Reference

## Troubleshooting GitHub Codespaces
