---
title: Functional Analysis - Part 14 - Example Operator Norm
---

[Functional Analysis - Part 14 - Example Operator Norm - YouTube](https://www.youtube.com/watch?v=YMm-UZwmuF0&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=14)

例：
${X = (C([0, 1], \mathbb F), \lVert \cdot \rVert_\infty),}$
${Y = (\mathbb F, \lvert \cdot \rvert),}$
関数 $g \in X$ は $\forall t \in [0, 1]\;g(t)\ne 0$ を満たすとする。
$g$ を固定して考える。

関数 $T_g \colon X \longrightarrow Y$ を次で定義する：

$$
T_g(f) \coloneqq \int_0^1\!g(t)f(t)\mathrm{d}t.
$$

問題：
作用素ノルム $\lVert T_g\rVert$ は具体的に何か。

作用素ノルムの定義から次の不等式が成り立つ：

$$
\begin{aligned}
\lVert T_g\rVert
&= \sup\!\left\{\left. \frac{\lvert T_g(f)\rvert}{\lVert f \rVert_\infty}\,\right|\left.\, f \in X, f \ne 0 \right.\right\}\\
&= \sup\!\left\{\left. \lvert T_g(f) \rvert \,\right|\left.\, f \in X, \lVert f\rVert_\infty = 1\right.\right\}\\
&= \sup\!\left\{\left. 
    \left\lvert \int_0^1\!g(t)f(t)\mathrm{d}t\right\rvert
    \,\right|\left.\, f \in X, \lVert f\rVert_\infty = 1\right.\right\}\\
&\le \int_0^1\! \lvert g(t) \rvert \mathrm{d}t \lt \infty.
\end{aligned}
$$

他方、$h(t) \coloneqq \dfrac{\overline{g(t)}}{\lvert g(t) \rvert }$ とすると
${\lVert h \rVert_\infty = 1.}$

$$
\begin{aligned}
\lvert T_g \rvert
&\ge \lvert T_g(h) \rvert\\
&= \left\lvert \int_0^1\!g(t)h(t)\mathrm{d}t \right\rvert\\
&= \left\lvert \int_0^1\!g(t)\frac{\overline{g(t)}}{\lvert g(t) \rvert}\mathrm{d}t \right\rvert\\
&= \left\lvert \int_0^1\!\frac{\lvert g(t) \rvert^2}{\lvert g(t) \rvert}\mathrm{d}t \right\rvert\\
&= \int_0^1\! \lvert g(t) \rvert \mathrm{d}t.
\end{aligned}
$$

二つの不等式から：

$$
\lVert T_g\rVert = \int_0^1\! \lvert g(t) \rvert \mathrm{d}t.
$$

以上
