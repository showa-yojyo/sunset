---
title: Multivariable Calculus - Part 4 - Partial Derivatives
---

[Multivariable Calculus - Part 4 - Partial Derivatives - YouTube](https://www.youtube.com/watch?v=kq5OCTDAXxw&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=4)

列ベクトルの形で書くのは辛いので、以降は $\begin{pmatrix} x_1 \\ x_2\end{pmatrix}$ などを
$(x_1, x_2)$ などのように記す。

例えば関数 $f\colon\mathbb{R}^2 \longrightarrow \mathbb{R}$ において第二変数
$x_2$ を値 $\tilde x_2$ で固定すると、一変数関数

$$
x_1 \longmapsto f(x_1, \tilde x_2)
$$

が得られる。こうなると変数 $x_1$ に関する常微分が議論できる。これが多変数関数における偏微分の基本的な考え方だ。

## Partial Derivatives

関数 $f \colon \mathbb{R}^n \longrightarrow \mathbb{R}$ に対して偏微分を定義する。

関数 $f$ が点 $\tilde x = (\tilde x_1, \dotsc, \tilde x_n) \in \mathbb{R}^n$ において、変数 $x_1$ に関して偏微分可能であるとは、
次の極限が存在することとする：

$$
\lim_{h \to 0}\frac{f(\tilde x_1 + h, \dotsc, \tilde x_n) - f(\tilde x_1, \dotsc, \tilde x_n)}{h}.
$$

この極限を表す普通の記号を次に列挙する。都合によりいずれかを採用する：

$$
\frac{\partial f}{\partial x_1}(\tilde x)
=
({\partial f}_{x_1})(\tilde x)
=
(D_{x_1}f)(\tilde x)
=
f_{x_1}(\tilde x).
$$

変数 $x_2, \dotsc, x_n$ に関する偏微分についても同様に定義される。

## Examples

$f \colon \mathbb{R}^3 \longrightarrow \mathbb{R}$ を次で定義する：

$$
f(x_1, x_2, x_3) = x_1^2 x_2 \sin x_3.
$$

各変数に対して偏微分を計算する。すべての $\tilde x \in \mathbb{R}^3$ に対して $x_1, x_2, x_3$ に関して偏微分可能であって、

$$
\begin{aligned}
\frac{\partial f}{\partial x_1}(\tilde x_1, \tilde x_2, \tilde x_3) &= 2\tilde x_1 \tilde x_2 \sin \tilde x_3,\\
\frac{\partial f}{\partial x_2}(\tilde x_1, \tilde x_2, \tilde x_3) &= \tilde x_1^2 \sin \tilde x_3,\\
\frac{\partial f}{\partial x_3}(\tilde x_1, \tilde x_2, \tilde x_3) &= \tilde x_1^2 \tilde x_2 \cos \tilde x_3.
\end{aligned}
$$
