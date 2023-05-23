---
title: Functional Analysis - Part 22 - Dual spaces
---

[Functional Analysis - Part 22 - Dual spaces - YouTube](https://www.youtube.com/watch?v=VZ72TbNrkxE&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=22)

## 本編

双対空間 (dual spaces)

$X$ をノルム空間とし、$X^\prime$ を次のノルム空間とする：

* 「線形かつ有界作用素であるような写像 $l \colon X \longrightarrow \mathbb F$ の全体」

Riesz representation 定理を思い出すと、$X$ が Hilbert 空間ならば
$X^\prime$ と $X$ は距離に関して（？）同型である。

命題：
${(X^\prime, \lVert \cdot\rVert_{X \to \mathbb F})}$ は Banach 空間である。

証明：
Cauchy 列 $(l_k) \subset X^\prime$ をとる。

$$
\forall \varepsilon \gt 0\;
\exists N \in \mathbb N\;
\forall n,m \ge N
:
\lVert l_n - l_m\rVert_{X \to \mathbb F} \lt \varepsilon.
$$

$\forall x \in X$ に対して次が成り立つ：

$$
x \ne 0 \implies
\frac{1}{\lVert x\rVert_X}\lvert l_n(x) - l_m(x)\rvert
\le \lVert l_n - l_m\rVert_{X \to \mathbb F} \lt \varepsilon.
$$

ゆえに ${(l_k(x)) \subset F}$ は $x = 0$ の場合も含めて $\forall x \in X$ に対して
Cauchy 列である。したがって極限が存在する。これを $l(k) \in \mathbb F$ とおく：

$$
l(x) \coloneqq \lim_{k \to \infty}l_k(x).
$$

写像 ${l\colon X \longrightarrow \mathbb F}$ が次を満たすことを示す：

$\text{(1)}$ $l$ は線形写像である

$\text{(2)}$ $l$ は有界作用素である

$\text{(3)}$ $\lVert l_k - l\rVert_{X \to \mathbb F} \to 0\quad(k \to \infty)$

$\text{(1)}$ は OK.

$\text{(2)}$ ${\forall n \ge N}$ に対して：

$$
\begin{aligned}
\lVert l_n\rVert_{X \to \mathbb F}
&\le \lVert l_n - l_N\rVert_{X \to \mathbb F} + \lVert l_N\rVert_{X \to \mathbb F}\\
&\le C + \varepsilon.
\end{aligned}
$$

ゆえに

$$
\begin{aligned}
\lvert l(x) \rvert
&= \left\lvert \lim_{k \to \infty} l_k(x) \right\rvert\\
&= \lim_{k \to \infty} \lvert l_k(x) \rvert\\
&\le \lim_{k \to \infty} \lVert l_k(x) \rVert_{x \to \mathbb F} \lVert x\rVert_X\\
\therefore \lVert l \rVert_{x\to\mathbb F}
&\le \tilde C \lt \infty.
\end{aligned}
$$

有界作用素であることが示された。

$\text{(3)}$ 完備性を調べる。$\varepsilon \gt 0$ を一つ取ると：

$$
\exists N \in \mathbb N\;
\forall n,m \ge N
:
\frac{1}{\lVert x\rVert_X} \lvert l_n(x) - l_m(x) \rvert \lt \varepsilon.
$$

このとき、

$$
\begin{aligned}
\varepsilon
&\ge \lim_{m \to \infty}\frac{1}{\lVert x\rVert_X} \lvert l_n(x) - l_m(x) \rvert\\
&= \frac{1}{\lVert x\rVert_X} \lvert l_n(x) - \lim_{m \to \infty}l_m(x)\rvert\\
&= \frac{1}{\lVert x\rVert_X} \lvert l_n(x) - l(x) \rvert.\\
\therefore
\varepsilon &\ge \sup_{x \in X x \ne 0} \frac{1}{\lVert x\rVert_X} \lvert l_n(x) - l(x) \rvert\\
&= \lVert l_n - l\rVert_{X \to \mathbb F}.\\
\end{aligned}
$$

この三点から ${l \in (X^\prime, \lVert \cdot\rVert_{X \to \mathbb F})}$ が示された。

以上
