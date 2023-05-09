---
title: Multivariable Calculus - Part 13 - Schwarz's Theorem
---

[Multivariable Calculus - Part 13 - Schwarz's Theorem - YouTube](https://www.youtube.com/watch?v=HYNtT_mLIjQ&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=13)

Schwarz の定理（二階微分の対称性）

$U \subset \mathbb R^n$ を開集合とする。
$f \colon U \longrightarrow \mathbb R.$

もしすべての $\tilde x \in U$ においてすべての二階偏微分が存在し、
かつそれらが $U \longrightarrow \mathbb R$ 連続関数であるならば：

$$
\frac{\partial^2 }{\partial x_i \partial x_j}(\tilde x) = \frac{\partial^2 }{\partial x_j \partial x_i}(\tilde x).
$$

証明：
$n = 2, i = 1, j = 2,$ 簡単のために $\tilde x = 0$ とする。

$$
F(h_1, h_2) \coloneqq f(h_1, h_2) - f(h_1, 0) - f(0, h_2) + f(0, 0)
$$

を考える。また、

$$
u(h_1, h_2) \coloneqq f(h_1, h_2) - f(h_1, 0)
$$

とおく。つまり：

$$
F(h_1, h_2) = u(h_1, h_2) - u(0, h_2).
$$

一変数関数の平均値の定理より ${\xi_1 \in (0, h_1)}$ が存在して：

$$
\begin{aligned}
F(h_1, h_2) &= h_1 \frac{\partial u}{\partial x_1}(\xi_1, h_2)\\
&= h_1\left(
    \frac{\partial f}{\partial x_1}(\xi_1, h_2) - \frac{\partial f}{\partial x_1}(\xi_1, 0)
\right).
\end{aligned}
$$

再び平均値の定理より、${\xi_2 \in (0, h_2)}$ が存在して：

$$
\begin{aligned}
F(h_1, h_2) &= h_1 h_2 \frac{\partial^2 f}{\partial x_2 \partial x_1}
(\xi_1, \xi_2).
\end{aligned}
$$

今度は項を入れ替えて評価する。

$$
v(h_1, h_2) \coloneqq f(h_1, h_2) - f(0, h_2)
$$

とおくと、同様にして $\eta_1, \eta_2$ が存在して：

$$
\begin{aligned}
F(h_1, h_2) &= 
f(h_1, h_2) - f(h_1, 0) - f(0, h_2) + f(0, 0)\\\
&= f(h_1, h_2) - f(0, h_2) - f(h_1, 0) + f(0, 0)\\
&= v(h_1, h_2) - v(h_1, 0)\\
&= h_2 \frac{\partial v}{\partial x_2}(h_1, \eta_2) \\
&= h_2\left(
    \frac{\partial f}{\partial x_2}(h_1, \eta_2) - \frac{\partial f}{\partial x_2}(0, \eta_2)\right)\\
&= h_2h_1 \frac{\partial^2 f}{\partial x_1 \partial x_2}
(\eta_1, \eta_2).
\end{aligned}
$$

したがって

$$
\begin{aligned}
h_1 h_2 \frac{\partial^2 f}{\partial x_2 \partial x_1}(\xi_1, \xi_2)
&= h_2h_1 \frac{\partial^2 f}{\partial x_1 \partial x_2}(\eta_1, \eta_2).\\
\therefore
\frac{\partial^2 f}{\partial x_2 \partial x_1}(\xi_1, \xi_2)
&= \frac{\partial^2 f}{\partial x_1 \partial x_2}(\eta_1, \eta_2).\\
\end{aligned}
$$

ここで極限 $h_1, h_2 \to 0$ を取る。
$\xi_i, \eta_i \to 0$ であるから：

$$
\frac{\partial^2 f}{\partial x_2 \partial x_1}(0, 0)
= \frac{\partial^2 f}{\partial x_1 \partial x_1}(0, 0).
$$

一般の $\tilde x$ の場合も成り立つ（区間の取り方をずらすだけ）。
一般の $i, j$ の場合は帰納法で証明するようだ。
