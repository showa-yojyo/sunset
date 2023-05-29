---
title: Functional Analysis - Part 25 - Hahn–Banach theorem
---

[Functional Analysis - Part 25 - Hahn–Banach theorem - YouTube](https://www.youtube.com/watch?v=U9JZaM7aI0Q&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=25)

## Hahn-Banach 定理

（※そのうちの一つということらしい）

$(X, \lVert \cdot\rVert_X)$ ノルム空間に対して
$(X^\prime, \lVert \cdot\rVert_{X^\prime})$ で連続線形写像全体からなるノルム空間を表すとする。

部分空間 ${U \subset X}$ に対して
${u^\prime \in (U^\prime, \lVert \cdot\rVert_{X^\prime})}$
を一つ取る。このとき、写像 $u^\prime$ の $X$ の「拡張」がある：

$$
\exists x^\prime \in X^\prime\;
\forall u \in U\;
x^\prime(u) = u^\prime(u) \land \lVert x^\prime \rVert_{X^\prime} = \lVert u^\prime\rVert_{U^\prime}.
$$

## 定理の適用例

上と同じ記号を使う。

$\text{(a)}$ 命題：

$$
\forall x \in X\;
\left(x \ne 0 \implies
\exists x^\prime \in X^\prime
:
\lVert x^\prime\rVert_{X^\prime} = 1
\land
x^\prime(x) = \lVert x\rVert_{X}
\right).
$$

証明：
${U \subset X}$ を $x$ が張る部分空間とする。

写像 ${u^\prime \colon U \longrightarrow \mathbb F}$ を
${\lambda x \longmapsto \lambda \lVert x\rVert_X}$ で定義する。

Hahn-Banach 定理により、ある $x^\prime \colon X \longrightarrow \mathbb F$
が存在して次を満たす：

$$
\forall u \in U\;
x^\prime(u) = u^\prime(u)
\land
\lVert x^\prime\rVert_{X^\prime} = \lVert u^\prime\rVert_{U^\prime}.
$$

したがって ${u = 1x \in U}$ とみなして

$$
\begin{aligned}
x^\prime(x) = u^\prime(x) &= 1\lVert x\rVert_X = \lVert x\rVert_X\\
\therefore x^\prime(x) &= \lVert x\rVert_X\\
\end{aligned}
$$

かつ

$$
\begin{aligned}
\lVert x^\prime\rVert_{X^\prime}
&= \lVert u^\prime\rVert_{U^\prime}\\
&= \sup\!\left\{\left. \frac{\lambda \lVert u\rVert_{\mathbb F}}{\lVert \lambda u \rVert_{U}}\,\right|\left.\, u \in U, u \ne 0 \right.\right\}\\
&= 1.
\end{aligned}
$$

$\text{(b)}$ 命題：
$X^\prime$ は $X$ の点を分離する。すなわち、

$$
\forall x_1, x_2 \in X\;
\left(
x_1 \ne x_2 \implies
\exists x^\prime \in X^\prime:
x^\prime(x_1) \ne x^\prime(x_2)\right).
$$

証明：
${x \coloneqq x_2 - x_1}$ とおく。命題 $\text{(a)}$ よりある
${x^\prime \in X^\prime}$ が存在して：

$$
\begin{aligned}
x^\prime(x) &= \lVert x\rVert_X \ne 0.\\
\therefore x^\prime(x_1) &\ne x^\prime(x_2).
\end{aligned}
$$

$\text{(c)}$ 命題：
すべての ${x\in X}$ に対して次が成り立つ：

$$
\lVert x\rVert_X = \sup\!\left\{\left.\lvert x^\prime(x) \rvert\,\right|
\,\left. x^\prime \in X^\prime, \lVert x^\prime\rVert_{X^\prime} = 1\right.\right\}\!.
$$

証明：
作用素ノルムの性質から、本当は ${x \ne 0}$ とせねばならないが：

$$
\def\one{ \lVert x^\prime \rVert_{X^\prime} = 1}
\begin{aligned}
\lVert x^\prime\rVert_{X^\prime} &\ge \frac{\lvert x^\prime(x) \rvert }{\lVert x\rVert_X}\\
\therefore 1 = \sup_{\one}\lVert x^\prime\rVert_{X^\prime} &\ge \sup_{\one}\frac{\lvert x^\prime(x) \rvert }{\lVert x\rVert_X}\\
\therefore \lVert x\rVert_X &\ge \sup_{\one}\lvert x^\prime(x) \rvert .
\end{aligned}
$$

他方 $\text{(a)}$ を使って（※どのように？）

$$
\def\one{ \lVert x^\prime \rVert_{X^\prime} = 1}
\lVert x\rVert_X \le \sup_{\one}\lvert x^\prime(x) \rvert.
$$

両評価を合わせて主張の等式が成り立つことが示される。

$\text{(d)}$ 命題：
${U \subset X}$ を閉部分空間とする。
$x \in X\setminus U$ とする（自動的にゼロベクトルでないことになる）。
このとき

$$
\exists x^\prime \in X^\prime:
x^\prime\vert_U = 0
\land
x^\prime(x) \ne 0.
$$

証明：同値類を考える。

$$
X/U \coloneqq \!\left\{\left. [z]\,\right|\,\left. z \in X \right.\right\}\!,\quad
[z] \coloneqq \{z + u\,|\,u \in U\}.
$$

ノルムを入れる：

$$
\lVert [z]\rVert_{X/U} \coloneqq \inf_{u \in U} \lVert z + u \rVert_{X}
$$

これにより ${(X/U, \lVert [\cdot]\rVert_{X/U})}$ はノルム空間になる（宿題だろう）。
そこで $\text{(a)}$ を適用すると、
${y^\prime([x]) \ne 0}$ を満たす ${y^\prime \in (X/U)^\prime}$ が存在する。
そこで $x^\prime \in X^\prime$ を次で定義する：

$$
x^\prime(z) \coloneqq y^\prime([z]).
$$

$x^\prime$ は主張の性質を満たしている。

以上
