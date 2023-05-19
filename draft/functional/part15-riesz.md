---
title: Functional Analysis - Part 15 - Riesz Representation Theorem
---

[Functional Analysis - Part 15 - Riesz Representation Theorem - YouTube](https://www.youtube.com/watch?v=rKiy6wEiQIk&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=15)

定理 (Riesz):
Hilbert 空間 $(X, \left\langle \cdot,\;\cdot \right\rangle)$ とする。
写像 $l \colon X \longrightarrow \mathbb F$ が連続線形であるならば、ベクトル
$x_l \in X$ がただ一つ存在し、次を満たす：

$$
\forall x \in X\; l(x) = \left\langle x_l,\;x \right\rangle
$$

かつ

$$
\lVert l \rVert_{x \to \mathbb F} = \lVert x_l \rVert_X.
$$

証明：前半を $\text{(1)}$ 存在性と $\text{(2)}$ 一意性の二段階に分けて示す。

$\text{(1)}$ 線形写像 $l$ の核を考える。

${\ker(l) = X}$ ならば ${x_l = 0}$ でよい。

${\ker(l)\ne X}$ のとき、$x_l \in \ker(l)^\perp.$ 右辺は $0$ 以外のベクトルを含む。
なぜなら、$\ker l$ は閉空間であり（核は閉空間 $\{0\}$ の連続写像による逆像であることに注意）。

$\lVert \hat{x}\rVert_X = 1$ なる $0 \ne \hat{x}\in\ker(l)^\perp$ を取れるので一つ取る。

ここで　${x_l \coloneqq \overline{l(\hat{x})} \cdot \hat{x} }$ とおく。

$$
\def\L{ \frac{l(x)}{l(\hat{x})} }
\def\H{ \L \hat{x} }
\begin{aligned}
l(x)
&= l\!\left(x - \H + \H\right)\\
&= l\!\left(x - \H\right) + l\!\left(\H\right)\\
&= l(x) - \L\cdot l(\hat x) + l\!\left(\lambda \hat{x}\right)\\
&= \lambda l(\hat{x})\\
&= \lambda l(\hat{x})\left\langle \hat{x},\;\hat{x} \right\rangle\\
&= \lambda \left\langle \overline{l(\hat{x})} \hat{x},\;\hat{x} \right\rangle\\
&= \left\langle x_l,\;\lambda\hat{x} \right\rangle\\
&= \left\langle x_l,\;\lambda\hat{x}-x+x \right\rangle\\
&= \left\langle x_l,\;x \right\rangle. \quad \because \lambda\hat{x}-x \in \ker(l)
\end{aligned}
$$

$\text{(2)}$ $x_l, \tilde x_l \in X$ が $\forall x \in X$ に対して次を満たすとする：

$$
\begin{aligned}
l(x) = \left\langle x_l,\;x \right\rangle = \left\langle \tilde x_l,\;x \right\rangle.
\end{aligned}
$$

左辺を右辺に移項して

$$
\left\langle x_l - \tilde x_l,\;x \right\rangle = 0.
$$

$x \in X$ は任意なので ${x \coloneqq x_l - \tilde x_l}$ を代入すると：

$$
\def\temp{x_l - \tilde x_l}
\begin{aligned}
\left\langle \temp,\;\temp \right\rangle = 0
&\iff \temp = 0\\
&\iff x_l = \tilde x_l.
\end{aligned}
$$

$\text{(3)}$ 作用素ノルムを求める。

$$
\begin{aligned}
\lVert l \rVert_{X \to \mathbb F}
&= \sup\{ \lvert l(x) \rvert \,|\, \lVert x\rVert_X = 1\}\\
&= \sup\!\left\{\left.
    \lvert\left\langle x_l,\;x \right\rangle\rvert
    \,\right|\,\left. \lVert x\rVert_X = 1 \right.\right\}\\
&\le \lVert x_l\rVert_X. \quad \because \lvert\left\langle x_l,\;x \right\rangle\rvert \le \lVert x_l \rVert_X \cdot \lVert x \rVert_X
\end{aligned}
$$

一方で、$x = \dfrac{x_l}{\lVert x_l\rVert_X}$ におけるノルムを考えることで、

$$
\begin{aligned}
\lVert l \rVert_{X \to \mathbb F}
&\ge \left\lvert l\left(\frac{x_l}{\lVert x_l\rVert}_X\right)\right\rvert\\
&= \left\lvert \left\langle x_l,\;\frac{x_l}{\lVert x_l\rVert_X} \right\rangle\right\rvert\\
&= \lVert x_l\rVert_X.
\end{aligned}
$$

この二つの不等式から所望の等式を得る。

以上
