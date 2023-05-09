---
title: Multivariable Calculus - Part 15 - Multi-Index Notation
---

[Multivariable Calculus - Part 15 - Multi-Index Notation - YouTube](https://www.youtube.com/watch?v=Hiwth6HsUq0&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=15)

階数が上がると偏微分記号中の指数、添字を書くのがたいへんなので略記法を定義する。

## $n$ 次元指数と $n$ 次元添字

$\alpha \in \mathbb N^n$ とする。
$\alpha = (\alpha_1, \dotsc, \alpha_n).$ 単なるベクトル。

次の記号を導入する：

$$
\begin{aligned}
\lvert \alpha \rvert &\coloneqq \alpha_1 + \dotsb + \alpha_n.\\
\alpha! &\coloneqq \alpha_1! \dotsc \alpha_n!.\\
\begin{pmatrix}\alpha\\ \beta\end{pmatrix}
&\coloneqq \frac{\alpha!}{\beta!(\alpha - \beta)!}.
\end{aligned}
$$

さらに $x \in \mathbb R^n$ に対して次の記号を導入する：

$$
x^{\alpha} \coloneqq x_1^{\alpha_1} \dotsm x_n^{\alpha_n}.
$$

偏微分：

$$
D^\alpha f \coloneqq
\frac{\partial^{\lvert \alpha \rvert} f}{\partial x_1^{\alpha_1} \dotsc \partial x_n^{\alpha_n}}.
$$

## 例

(a)
${\alpha = (1, 0, 0),}\;{\lvert \alpha \rvert = 1,}\;{\alpha! = 1! 0! 0! = 1,}\;{x^\alpha = x_1^1 x_2^0 x_3^0 = x_1.}$

$$
D^{\alpha} f = \dfrac{\partial f}{\partial x_1}.
$$

(b)
${\alpha = (1, 2, 1),}\;{\lvert \alpha \rvert = 4,}\;{\alpha! = 1! 2! 1! = 2,}\;{x^\alpha = x_1^1 x_2^2 x_3^1,}$

$$
D^{\alpha} f = \dfrac{\partial^4 f}{\partial x_1 \partial^2 x_2 \partial x_3}.
$$

以上
