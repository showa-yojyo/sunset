---
title: Modern C++ Tutorial C++ 11/14/17/20 On the Fly - Chapter 01 - Towards Modern C++ 超速読ノート
---

著者が用いているコンパイラー `clang++` のオプション `-std=c++2a` は C++20 相当だ
と思っていいだろう。

## 1.1 Deprecated Features

非推奨機能とは、C++11 以降にそうなったと解釈する。私が承知するべき項目だけ挙げる：

* `auto_ptr` は非推奨。代えて `unique_ptr` を用いる。
* クラスがデストラクターを持つ場合、そのクラスがコピーコンストラクターやコピー代
  入演算子を生成するプロパティーは非推奨。

## 1.2 Compatibilities with C

C++ と C を混ぜて使うときの注意点が記されている。必要ない。

## Further Readings

Bjarne Stroustrup 先生の著述には目を通さぬ手はないだろう。
