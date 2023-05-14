---
title: Functional Analysis - Part 7 - Examples of Banach spaces
---

[Functional Analysis - Part 7 - Examples of Banach spaces - YouTube](https://www.youtube.com/watch?v=GAkVaD1ihi4&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=7)

前回の Banach 空間のイラストを思い出す。

## Examples

$\text{(1)}$ ${(\mathbb R, \lvert \cdot \rvert)}$ は 一次元 Banach 空間。

$\text{(2)}$ ${(\{0\}, 0)}$ は 0 次元 Banach 空間（ノルムは零写像）。

$\text{(3)}$ これは重要な例だと言っている。${p \in [1, \infty)}$ とする。

${l^p(\mathbb N, \mathbb F)}$ を $\mathbb F$ における次の性質を満たす数列
$(x_n)$ すべてからなる集合とする：

$$
\sum_{n = 1}^\infty \lvert x_n \rvert^p \lt \infty.
$$

このときノルム ${\lVert\cdot\rVert\colon l^p \longrightarrow [0, \infty)}$ を次で定義する：

$$
{\lVert x \rVert}_p \coloneqq
\left(\sum_{n=1}^\infty \lvert x_n \rvert^p \right)^{\frac{1}{p}}.
$$

$\left(l^p, {\lVert x \rVert}_p\right)$ は Banach 空間である。

証明：次の三点を示す：

1. $l^p$ が $\mathbb F$ 上のベクトル空間である。
2. ${\lVert x \rVert}_p$ が $l^p$ 上のノルムである。
3. $\left(l^p, {\lVert x \rVert}_p\right)$ が完備空間である。

今回は 3. のみを示す。

まず $\left(x^{(k)}\right)_{k \in \mathbb N}$ を $l^p$ の Cauchy 列とする。
数列の Cauchy 列ということになる：

$$
\def\seq#1{ \left(x^{(#1)}_1, x^{(#1)}_2, x^{(#1)}_3, x^{(#1)}_4, x^{(#1)}_5,  x^{(#1)}_6, \dotsc\right) }
\begin{aligned}
x^{(1)} &= \seq{1},\\
x^{(2)} &= \seq{2},\\
x^{(3)} &= \seq{3},\\
&\vdots\\
x^{(k)} &= \seq{k},\\
&\vdots
\end{aligned}
$$

例えば第 $4$ 項に注目する（※項を個別に縦に並べた数列が Cauchy であることを示したい）。

$$
\begin{aligned}
\left\lvert x^{(k)}_4 - x^{(l)}_4 \right\rvert^p
&\le \sum_{n=1}^\infty \left\lvert x^{(k)}_n - x^{(l)}_n \right\rvert ^p\\
&= \left\lVert x^{(k)} - x^{(l)} \right\rVert_p^p.
\end{aligned}
$$

Cauchy 列の性質から
$\forall \varepsilon \gt 0\;\exists K \in \mathbb N\;\forall k, l \ge K:$

$$
\begin{aligned}
\left\lVert x^{(k)}_4 - x^{(l)}_4 \right\rVert_p \lt \varepsilon.\\
\therefore \left\lvert x^{(k)}_4 - x^{(l)}_4 \right\rvert \lt \varepsilon.
\end{aligned}
$$

したがって点列 $\left(x^{(k)}_4\right)_{k \in \mathbb N}$ は $\mathbb F$ の
Cauchy 列であることが示された。
この点列の極限を $\tilde x_4 \in \mathbb F$ とおける。

以上の議論は第 $4$ 項だけでなく一般の第 $m$ 項にも適用可能なので、同様に値 $\tilde x_m \in \mathbb F$ を定義する。
そして点列 ${\tilde x \coloneqq \left(\tilde x_m\right)}$ を考える。

再び $\varepsilon \gt 0$ とする。
$\exists K \in \mathbb N\;\forall k, l \ge K: \left\lVert x^{(k)} - \tilde x\right\rVert_p \lt \dfrac{\varepsilon}{2}.$

←この値は下の式変形の途中で思いつく。

$$
\begin{aligned}
\left\lVert x^{(k)} - \tilde x\right\rVert_p^p
&= \sum_{n = 1}^\infty \left\lvert x^{(k)}_n - \tilde x_n \right\rvert^p\\
&= \lim_{N \to \infty} \sum_{n = 1}^N \left\lvert x^{(k)}_n - \tilde x_n \right\rvert^p\\
&= \lim_{N \to \infty} \sum_{n = 1}^N \left\lvert x^{(k)}_n - x^{(l)}_n \right\rvert^p.
\end{aligned}
$$

このとき $\forall k \ge K$ に対して

$$
\left\lVert x^{(k)} - \tilde x\right\rVert_p \le \frac{\varepsilon}{2} \lt \varepsilon.
$$

かつ（$l^p$ がベクトル空間であることを使えば）

$$
\tilde x = \left(\tilde x - x^{(k)}\right)
+ \left(x^{(k)}\right).
\quad \therefore \tilde x \in l^p.
$$

以上により、$l^p$ の任意の Cauchy 列 $\left(x^{(k)}\right)_{k \in \mathbb N}$ は極限
${\tilde x \in \mathbb F}$ に持つことが示された。したがって、空間
$\left(l^p, \left\lVert \cdot \right\rVert_p\right)$ は完備である。

以上
