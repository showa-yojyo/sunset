---
title: Functional Analysis - Part 6 - Norms and Banach spaces
---

[Functional Analysis - Part 6 - Norms and Banach spaces - YouTube](https://www.youtube.com/watch?v=imYQJOgUx7Y&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=6)

$\mathbb F$ を $\mathbb R$ または $\mathbb C$ であるとする。
$X$ を $\mathbb F$ 上のベクトル空間とする。写像

$$
\left\lVert \cdot \right\rVert \colon X \longrightarrow [0, \infty
$$

が **ノルム** であるとは、次をすべて満たすものを言う：

$$
\begin{aligned}
&\text{(a)} && \lVert x \rVert = 0 \iff x = 0.\\
&\text{(b)} && \forall \lambda \in \mathbb F\:\forall x \in X
\quad\lVert \lambda \cdot x \rVert = \lvert \lambda \rvert \lVert x \rVert.\\
&\text{(c)} && \forall x \in X\:\forall y \in X
\quad\lVert x + y\rVert \le \lVert x \rVert + \lVert y \rVert.
\end{aligned}
$$

また空間とノルムをまとめた $(X, \lVert \cdot \rVert)$ を **ノルム空間** という。

重要：ノルム空間から距離空間を定義することが可能：

$$
d_{\lVert\cdot\rVert}(x, y) \coloneqq \lVert x - y \rVert
$$

このようにして得られる距離空間 ${(X, d_{\lVert\cdot\rVert})}$ が完備であるとき、元のノルム空間は
**Banach 空間** であるという。

以上
