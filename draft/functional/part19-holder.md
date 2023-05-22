---
title: Functional Analysis - Part 19 - Hölder's Inequality
---

[Functional Analysis - Part 19 - Hölder's Inequality - YouTube](https://www.youtube.com/watch?v=yIXahhfRbTc&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=19)

定理：Hölder の不等式

${p\in(1, \infty)}$ とし、$p^\prime$ を
${\dfrac{1}{p} + \dfrac{1}{p^\prime} = 1}$ を満たす数とする。

（※ $p^\prime$ を $p$ の Hölder 共役という）

いつものように、$\mathbb F^n$ に次の $q$ ノルムを入れる：

$$
\lVert x\rVert_q \coloneqq \left(\sum_{j=1}^{n}\lvert x_j \rvert^q\right),
\quad
q \in [1, \infty).
$$

$x,y\in\mathbb F^n$ に対して $xy$ を次で定義する：

$$
xy \coloneqq \begin{pmatrix}x_1 y_1 \\ x_2y_2 \\ \vdots \\ x_n y_n\end{pmatrix}.
$$

このとき次が成り立つ：

$$
\forall x,y \in \mathbb F^n:
\lVert xy \rVert_p \le \lVert x \rVert_p \lVert y \rVert_{p^\prime}.
$$

----

Young の不等式：

$$
a,b\gt 0 \implies ab \le \frac{a^p}{p} + \frac{b^{p\prime}}{p^\prime}.
$$

証明：
関数 $f \colon x \longmapsto \mathrm{e}^x$ を考える。これは下に凸である。したがって、

$$
\forall \lambda \in [0, 1],\;
\forall x,y \in \mathbb R
:
f(\lambda x + (1 - \lambda)y) \le \lambda f(x) + (1 - \lambda)f(y).
$$

${\lambda = \dfrac{1}{p},}\;{x = \log a^p,}\;{y = \log b^{p^\prime}}$ とおくと、不等式の左辺は：

$$
\begin{aligned}
f(\lambda x + (1 - \lambda)y)
&= f\!\left(\frac{1}{p}\log a^p + \frac{1}{p^\prime}\log b^{p^\prime} \right)\\
&= f(\log a + \log b)\\
&= ab.
\end{aligned}
$$

不等式の右辺は：

$$
\begin{aligned}
\lambda f(x) + (1 - \lambda)f(y)
&= \frac{1}{p}f\left(\log a^p\right) + \frac{1}{p^\prime}f\left(\log b^{p^\prime}\right)\\
&= \frac{1}{p}a^p + \frac{1}{p^\prime}b^{p^\prime}.
\end{aligned}
$$

----

Hölder の不等式の証明：

$\text(1)$ $x = 0$ or $y = 0$ の場合。ノルムの定義から等号成立で成り立つ。

$\text(2)$ $x \ne 0$ and $y \ne 0$ の場合：

$$
\def\pp { {p^\prime} }
\def\nxny{ \lVert x \rVert_p \lVert y \rVert_{\pp} }
\begin{aligned}
\frac{1}{\nxny} \lVert xy \rVert_p
&= \frac{1}{\nxny}\sum_{j=1}^{n}\lvert x_j y_j \rvert \\
&= \sum_{j=1}^{n}\frac{\lvert x_j \rvert }{\lVert x \rVert_p}
    \cdot \frac{\lvert y_j \rvert }{\lVert y \rVert_{\pp} }\\
&\le \sum_{j=1}^{n} \frac{1}{p}\cdot \frac{\lvert x_j \rvert^p }{\lVert x \rVert_p^p}
    + \sum_{j=1}^{n} \frac{1}{\pp}\cdot\frac{\lvert y_j \rvert^{\pp} }{\lVert y \rVert_{\pp}^{\pp} }\\
&= \frac{1}{p} + \frac{1}{\pp}\\
&= 1.
\end{aligned}
$$

（※不等号のところで Young の不等式を適用）

以上
