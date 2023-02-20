---
title: 逆転
status: RC
---

映像と音声を同時に逆転させることも、一方だけを逆転させることも可能だ。

```console
ffmpeg -i input.mp4 -vf reverse output.mp4
ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4
```

この処理は入力全体をメモリーに格納することに注意を要する。巨大なビデオに対して
は、何分割かしてからそれぞれを個別に逆転させて結合することを検討する。
結合については `concat` のノートを参照。

## 参照

* [How to Reverse a Video using FFmpeg - OTTVerse](https://ottverse.com/reverse-a-video-using-ffmpeg/)
* [How to use FFmpeg Command for Reverse Video? - Video Production Stack Exchange](https://video.stackexchange.com/questions/17738/how-to-use-ffmpeg-command-for-reverse-video)
