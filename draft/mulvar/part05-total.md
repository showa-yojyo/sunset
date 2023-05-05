---
title: Multivariable Calculus - Part 5 - Total Derivative
---

[Multivariable Calculus - Part 5 - Total Derivative - YouTube](https://www.youtube.com/watch?v=T3_NCsXAZYQ)

一次元の線形近似の復習から。

$f \colon \mathbb{R} \longrightarrow\mathbb{R}$ が $\tilde x \in \mathbb{R}$ で微分可能であるとは、
任意の ${h \in \mathbb{R}}$ に対して

1. 数 ${b \in \mathbb{R}}$ と
2. 関数 $r \colon \mathbb{R} \longrightarrow \mathbb{R}$

が存在して、次が成り立つことをいう：

$$
\begin{aligned}
f(\tilde x + h) &= f(\tilde x) + bh + r(h) \cdot h
\quad\text{ with }\quad
\lim_{h \to 0}r(h) = 0.
\end{aligned}
$$

この $b$ を $f^{\prime}(\tilde x)$ などと書く。

## Definition of Total Differentiable

定義：全微分可能

$f \colon \mathbb{R}^n \longrightarrow \mathbb{R}^m$ が点 $\tilde x$ で全微分可能であるとは、
任意の $h \in \mathbb{R}^n$ に対して

1. 線形写像 $l \colon \mathbb{R}^n \longrightarrow \mathbb{R}^m$ と
2. 写像 $\phi \colon \mathbb{R}^n \longrightarrow \mathbb{R}^m$

が存在して、次が成り立つことを言う：

$$
f(\tilde x + h) = f(\tilde x) + l(h) + \phi(h)
\quad\text{ with }\quad
\lim_{h \to 0}\frac{\phi(h)}{\lVert h \rVert} = 0 \in \mathbb R^m.
$$

であることを言う（このノルムは Euclid ノルムでいい）。

このとき、線形写像 $l(h)$ を次の記号で表し、$f$ の $\tilde x$ における（全）微分という：

$$
\mathrm{d}f_{\tilde x}(h) = Df_{\tilde x}(h) = J_{f}(\tilde x)h.
$$

$J_{f}(\tilde x)$ を $f$ の $\tilde x$ における Jacobian 行列という。

$n = 1, m = 1$ の場合は特に：

$$
\begin{aligned}
    J_f(\tilde x) &= (f^{\prime}(\tilde x)).\\
    \mathrm{d}f_{\tilde x}(h) &= f^{\prime}(\tilde x)\cdot h.
\end{aligned}
$$

例 $f \colon \mathbb{R}^2 \longrightarrow \mathbb{R}^2$ を次で定めると、これは原点で全微分可能だろうか：

$$
f(x_1, x_2) = \begin{pmatrix}x_2\\ x_1\end{pmatrix}.
$$

任意の $h = \begin{pmatrix}h_1\\ h_2\end{pmatrix}$ に対して、
$f(h_1, h_2)$ を次のように書き換えられる：

$$
\begin{aligned}
f(0 + h_1, 0 + h_2) &= \begin{pmatrix}0 + h_2\\ 0 + h_1\end{pmatrix}\\
&= \begin{pmatrix}0\\ 0\end{pmatrix} + \begin{pmatrix}
0 & 1\\
1 & 0
\end{pmatrix}\!\!
\begin{pmatrix}h_1\\ h_2\end{pmatrix}
+ \phi(h)\\
&= f(0, 0)
+ J_f(0, 0) \cdot h + \phi(h).
\end{aligned}\\
$$

このとき $\phi(h) \equiv 0$ であるので、全微分可能の条件を満たしている。

以上
