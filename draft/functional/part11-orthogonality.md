---
title: Functional Analysis - Part 11 - Orthogonality
---

[Functional Analysis - Part 11 - Orthogonality - YouTube](https://www.youtube.com/watch?v=9s9jov5cvy0&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=11)

## 直交性

$(X, \left\langle \cdot,\;\cdot \right\rangle)$ を内積空間とする。

$\text{(a)}$ ${x, y \in X}$ が**直交する**とは、${\left\langle x,\;y \right\rangle = 0}$ であることを言う。
これを ${x \perp y}$ と書く。

$\text{(b)}$ ${U, V \subset X}$ が直交するとは、次を満たすことを言う：

$$
\forall x \in U\;\forall y \in V\; x \perp y.
$$

これも ${U \perp V}$ と書く。

$\text{(c)}$
${U \subset X}$ に対し、その補空間 $U^\perp$ を次で定義する：

$$
U^\perp \coloneqq \{x \in X\,|\, \forall u \in U\;\left\langle x,\;u \right\rangle = 0\}.
$$

補空間はつねに $X$ の部分空間である。

注意：

$\text{(1)}$ $\{0\}^\perp = X,\;X^\perp = \{0\}.$

$\text{(2)}$ $U \subset V \implies U^\perp \supset V^\perp.$

証明：

$$
\begin{aligned}
x \in V^\perp
&\implies \forall v \in V\;\left\langle x,\;v \right\rangle = 0\\
&\implies \forall u \in U\;\left\langle x,\;u \right\rangle = 0 \because U \subset V.\\
&\implies x \in U^\perp.\\
\therefore V^\perp \subset U^\perp&.
\end{aligned}
$$

$\text{(3)}$ (**Pythagoras**) 内積からノルムを定めると：

$$
x \perp y \implies \lVert x + y\rVert^2 = \lVert x\rVert^2 + \lVert y \rVert^2.
$$

以上
