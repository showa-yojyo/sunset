---
title: Functional Analysis - Part 24 - Uniform Boundedness Principle / Banach–Steinhaus Theorem
---

[Functional Analysis - Part 24 - Uniform Boundedness Principle / Banach–Steinhaus Theorem - YouTube](https://www.youtube.com/watch?v=Uyo_fe6FU3s&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=24)

$X, Y$: ノルム空間、特に $X$ は Banach 空間とする。

$$
\mathcal{B}(X, Y) \coloneqq \!\left\{\left. T \colon X \longrightarrow Y \,\right|\left.\,
T \text{is linear and bounded} \right.\right\}\!.
$$

定理 (Banach-Steinhaus)：
すべての部分集合 ${\mathcal{M} \subset \mathcal{B}(X, Y)}$ は次を満たす：

$\mathcal{M}$ が $X$ 上各点有界 $\iff$ $\mathcal{M}$ は一様有界

$$
\forall x \in X\;
\exists C_x \ge 0\;
\forall T \in \mathcal{M}
:
\lVert Tx \rVert_Y \le C_x
\iff
\exists C \ge 0\;
\forall T \in \mathcal{M}
:
\lVert T\rVert_{X \to Y} \le C.
$$

証明する前に、この定理の応用例を紹介している：

命題：上と同じ記号を使う。
${T_n \in \mathcal{B}(X, Y)}$ はすべての ${n \in \mathbb N}$ に対して
どんな ${x \in X}$ に対しても $\lim_{n \to \infty}T_nx$ が存在する写像とする。

証明：$\mathcal{M}\coloneqq\{T_n\,|\,n \in \mathbb N\}$ とおく。
これは仮定より $X$ 上各点有界である。ゆえに Banach-Steinhaus 定理により

$$
\exists C \ge 0\;
\forall n \in \mathbb N:
\lVert T_n\rVert \le C.
$$

したがって

$$
\begin{aligned}
\lVert T\rVert_{X\to Y}
&= \sup\!\left\{\left. \lVert Tx\rVert_Y \right| \left. \lVert x \rVert_X = 1\right.\right\}\\
&= \sup\!\left\{\left. \lVert \lim_{n \to \infty}T_nx\rVert_Y \right| \left. \lVert x \rVert_X = 1\right.\right\}\\
&= \sup\!\left\{\left. \lim_{n \to \infty} \lVert T_nx\rVert_Y \right| \left. \lVert x \rVert_X = 1\right.\right\}\\
&\le C.
\end{aligned}
$$

以上
