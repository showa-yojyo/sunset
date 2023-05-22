---
title: Functional Analysis - Part 20 - Minkowski inequality
---

[Functional Analysis - Part 20 - Minkowski inequality - YouTube](https://www.youtube.com/watch?v=spF2D_zmfdk&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=20)

${l^p(\mathbb N)}$ のノルム $\lVert \cdot\rVert_p$ に対する三角不等式を
Minkowski 不等式という：

$$
\forall x,y \in l^p(\mathbb N),\;
\forall p \in [1, \infty)
:\quad
\lVert x + y\rVert_p \le \lVert x \rVert_p + \lVert y \rVert_p.
$$

証明：
${p = 1}$ のときは次のとおり成り立つ：

$$
\begin{aligned}
\lVert x + y\rVert_1
&= \sum_{j=1}^{\infty}\lvert x_j + y_j \rvert\\
&\le \sum_{j=1}^{\infty}(\lvert x_j \rvert + \lvert y_j \rvert)\\
&\le \lVert x \rVert_1 + \lVert y \rVert_1.
\end{aligned}
$$

${p \in (1,\infty)}$ のときを示す。$p^\prime$ を $p$ の Hölder 共役とする：

$$
\frac{p}{p - 1} = p^\prime.
$$

主張したい不等式の左辺の $p$ 乗を評価数する：

$$
\begin{aligned}
\lVert x + y \rVert_p^p
&= \sum_{j=1}^{\infty}\lvert x_j + y_j \rvert^p\\
&= \lim_{n \to \infty} \sum_{j=1}^{n}\lvert x_j + y_j \rvert^p\\
&\le \lim_{n \to \infty} \sum_{j=1}^{n}(\lvert x_j\rvert + \lvert y_j \rvert)^p
\quad \text{(*)}
\end{aligned}
$$

$\text{(*)}$ のシグマの中身を見ていく：

$$
\def\xjyj{ \lvert x_j\rvert + \lvert y_j \rvert }
\begin{aligned}
(\xjyj)^p
&= (\xjyj)(\xjyj)^{p-1}\\
&= \lvert x_j \rvert (\xjyj)^{p-1}
    + \lvert y_j \rvert (\xjyj)^{p-1}.
\quad \text{(**)}
\end{aligned}
$$

${a_j \coloneqq \lvert x_j \rvert,}\;{b_j \coloneqq (\lvert x_j\rvert + \lvert y_j \rvert)^{p-1}}$
とおく。そしてベクトル ${a \coloneqq (a_j),}\;{b \coloneqq (b_j) \in \mathbb F^n}$ とおく。すると

$$
\def\pp{ p^{\prime} }
\def\bj{ (\lvert x_j\rvert + \lvert y_j \rvert)^{p-1} }
\begin{aligned}
\lVert a \rVert_p \lVert b \rVert_{\pp}
&= \lVert a \rVert_p \left(\sum_{j=1}^{n}\left\lvert \bj \right\rvert^{\pp} \right)^{\frac{1}{\pp}}\\
&= \lVert a \rVert_p \left(\sum_{j=1}^{n} (\lvert x_j\rvert + \lvert y_j \rvert)^p \right)^{\frac{1}{\pp}}.
\end{aligned}
$$

${c_j \coloneqq \lvert y_j \rvert,}\;{c \coloneqq (c_j)\in\mathbb F^n}$ とおく。同様にして

$$
\def\pp{ p^{\prime} }
\lVert c \rVert_p \lVert b \rVert_{p\prime}
= \lVert c \rVert_p \left(\sum_{j=1}^{n} (\lvert x_j\rvert + \lvert y_j \rvert)^p \right)^{\frac{1}{\pp}}.
$$

ゆえに $\text{(**)}$ の有限和をとり、Hölder の不等式を右辺で二度用いると：

$$
\def\pp{ p^{\prime} }
\begin{aligned}
\sum_{j=1}^{n}(\lvert x_j\rvert + \lvert y_j \rvert)^p
&\le \lVert a \rVert_p \lVert b \rVert_{p\prime} + \lVert c \rVert_p \lVert b \rVert_{p\prime}\\
&= \left(\lVert a \rVert_p + \lVert c \rVert_p \right)
    \left(\sum_{j=1}^{n} (\lvert x_j\rvert + \lvert y_j \rvert)^p \right)^{\frac{1}{\pp}}.
\end{aligned}
$$

両辺を $\displaystyle\sum_{j=1}^{n}(\lvert x_j\rvert + \lvert y_j \rvert)^{1/p^\prime}$ で割って：

$$
\begin{aligned}
\left(\sum_{j=1}^{n}(\lvert x_j\rvert + \lvert y_j \rvert)^p\right)^{1 - \frac{1}{p^\prime}}
&\le \left(\lVert a \rVert_p + \lVert c \rVert_p \right).\\
\therefore
\left(\sum_{j=1}^{n}(\lvert x_j\rvert + \lvert y_j \rvert)^p\right)^{\frac{1}{p}}
&\le \left(\sum_{j=1}^{n}\lvert x_j \rvert^p\right)^{\frac{1}{p}}
   \left(\sum_{j=1}^{n}\lvert y_j \rvert^p\right)^{\frac{1}{p}}.
\end{aligned}
$$

これと $\text{(*)}$ で $n \to \infty$ として主張の不等式が ${p \gt 1}$ で成り立つことが示された。

以上
