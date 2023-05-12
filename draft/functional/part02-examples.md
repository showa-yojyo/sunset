---
title: Functional Analysis - Part 2 - Examples for metrics
---

[Functional Analysis - Part 2 - Examples for metrics - YouTube](https://www.youtube.com/watch?v=5hhhLaDb09E&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=2)

## Examples

ビデオでは距離空間の例を四つ挙げている。以下では ${x, y, z \in X}$ とする。

$\text{(a)}\quad{X = \mathbb C},\;{d(x, y) = \lvert x - y \rvert.}$

$\text{(b)}\quad{X = \mathbb R^n,}\;{d(x, y) = \sqrt{(x_1 - y_1)^2 + \dotsb + (x_n - y_n)^2}.}$

これを Euclidean metric という。

$\text{(c)}\quad{X = \mathbb R^n,}\;{d(x, y) = \max\{{\lvert x_1 - y1 \rvert, \dotsc, \lvert x_n - y_n \rvert}\}.}$

ビデオでは ${n = 2}$ の場合の、$d(x, y) = d(x, z)$ が成り立つ例を描いている。

$\text{(d)}\quad X$ は空でない任意の集合、$d$ を次で定義する：

$$
d(x, y) =
\begin{cases}
0, & x = y,\\
1, & x \ne y.
\end{cases}
$$

$d$ が距離であることを確認する。特に三角不等式をチェックする：

* $x = y$ ならば $d(x, y) = 0 \le d(x, z) + d(z, y)$ は OK.
* $x \ne y$ ならば $d(x, y) = 1 = d(x, z) \text{ or } d(z, y).$
  どちらの場合でも $\le d(x, z) + d(z, y)$ は OK.

この距離を **離散距離** という。空間の点すべてが孤立しているような距離空間を定める。

以上
