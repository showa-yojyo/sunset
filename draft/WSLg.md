---
title: WSLg 利用ノート
---

## 準備

環境の事前条件：

* Windows 10 ならば Build 19044 以降：この PC の OS はなんと
  10.0.19045.2908 でほぼギリギリ。
* GPU ドライバーに条件がある。この PC の Intel ドライバーなら十分。
* WSL 2 はインストール済みと仮定する。まだ WSLg を動作したことがない場合には：

  ```console
  wsl --update
  wsl --shutdown
  ```

* Ubuntu 端末を起動して `apt update` しておく。

以上で準備完了。あとは GUI パッケージを Ubuntu 端末から `apt` で得て実行する。
これで WSLg が有効になっていて欲しい。

## `wslg.exe`

Windows メニューの Ubuntu フォルダー以下にある項目を何か選択すると、そのウィンドウが起動する。
ショートカットの宛先をチェックすると：

| Application | Command |
|-------------|---------|
| Caffeine (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/caffeine` |
| ImageMagick (color depth=q16) (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/display-im6.q16 -nostdin ` |
| Tilix (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/tilix` |
| WSLView (Ubuntu) | `wslg.exe -d Ubuntu --cd "~" -- /usr/bin/wslview ` |

### その他

* Pillow の `show` など
* FFmpeg `ffplay`

## 設定ファイル `.wslconfig`

次で無効ならば `true` ならば有効か：

```ini
[wsl2]
guiApplications=false
```

## References

* [microsoft/wslg: Enabling the Windows Subsystem for Linux to include support for Wayland and X server related scenarios](https://github.com/microsoft/wslg)
* [Diagnosing "cannot open display" type issues with WSLg · microsoft/wslg Wiki](https://github.com/microsoft/wslg/wiki/Diagnosing-%22cannot-open-display%22-type-issues-with-WSLg)
  * `DISPLAY` の値を確認すること
