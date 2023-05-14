---
title: Functional Analysis - Part 8 - Inner Products and Hilbert Spaces
---

[Functional Analysis - Part 8 - Inner Products and Hilbert Spaces - YouTube](https://www.youtube.com/watch?v=UzSEvb9AJYw&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=8)

## Introduction

* 距離関数は距離を測る。
* ノルムは距離、長さを測る。
* 内積は距離、長さ、角度を測る。

## Inner Products

$$
\langle x, y\rangle \coloneqq \lVert x \rVert \lVert y \rVert \cos \alpha.
$$

定義：
$X$ を $\mathbb F$ 上のベクトル空間とする。写像
$\langle ., .\rangle \colon X \times X \longrightarrow \mathbb F$
が $X$ 上の **内積** であるとは、次が成り立つときをいう：

$$
\begin{aligned}
&\text{(1)} &&\langle x, x\rangle \ge 0
\quad\forall x \in X.\\
&\text{(2)} &&\langle x, y\rangle = \begin{cases}
\langle y, x\rangle, & \text{if $\mathbb F = \mathbb R$},\\
\\
\overline{\langle y, x\rangle} & \text{if $\mathbb F = \mathbb C$}.\\
\end{cases}
\quad\forall x,y \in X.
\\
&\text{(3)} && \langle x, y_1 + y_2\rangle = \langle x, y_1\rangle + \langle x, y_2\rangle
\quad\forall x, y_1, y_2 \in X.\\
& && \langle x, \lambda y\rangle = \lambda \langle x, y\rangle
\quad\forall x, y \in X,\;\forall \lambda \in \mathbb F.\\
\end{aligned}
$$

## Hilbert Spaces

内積からノルムを定義することが可能：

$$
\lVert x\rVert_{\langle\cdot,\cdot\rangle} \coloneqq \sqrt{\langle x, x\rangle}.
$$

定義：
${(X, \langle\cdot,\cdot\rangle)}$ が **Hilbert 空間** であるとは、
${(X, \lVert\cdot\rVert_{\langle\cdot,\cdot\rangle})}$ が Banach 空間であるものをいう。

以上
