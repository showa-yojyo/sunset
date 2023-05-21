---
title: Functional Analysis - Part 16 - Compact Sets
---

[Functional Analysis - Part 16 - Compact Sets - YouTube](https://www.youtube.com/watch?v=qdhwG724-Xw&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=16)

$\mathbb R^n \supset A$

* $A$ は閉集合である
* $A$ は有界である

この二つの性質をまとめた性質を扱いたい。

## （点列）コンパクト

定義：
$(X, d)$ を距離空間とする。$A \subset X$ が**（点列）コンパクト**であるとは、
その各点列 $(x_n) \subset A$ において、次の性質がある収束部分列 $(x_{n_k})$ が存在することを言う：

$$
\tilde{x} \coloneqq \lim_{k \to \infty}x_{n_k} \in A.
$$

（※距離空間の場合は点列コンパクトと位相空間で言うコンパクトは同じ）

例。以下、$d_e, d_d$ をそれぞれ Euclid 距離と離散距離とする。

$\text{(a)}$ ${(\mathbb R, d_e),} の部分集合 {A = [0, 1].}$ はコンパクトである。
これは Bolzano-Weierstrass 定理より成り立つ。

$\text{(b)}$ ${(\mathbb R, d_d),} の部分集合 {A = [0, 1].}$ はコンパクトではない：

点列 $\left(\dfrac{1}{n}\right)$ を取る。これは $n \ne m$ である限り
$d_d(x_n, x_m) = 1$ であり、収束部分列を含まないことを示す。

命題：
$(X, d)$ を距離空間とし、部分集合 $A \subset X$ はコンパクトであるとする。
このとき $A$ は閉集合かつ有界である。

証明：
$\text{i. Closed:}$ $(x_n) \subset A$ を $\tilde x \in X$ に収束する点列とする。
コンパクト性から部分収束列 $(x_{n_k})$ を含む。
この部分収束列の極限を $\tilde{\tilde{x}} \in A$ とすると、
極限の一意性から

$$
\tilde{x} = \tilde{\tilde{x}} \in A.
$$

ゆえに $A$ は閉集合である。

$\text{ii. Bounded:}$ 対偶を示す。もし $A$ が有界でないとすると、
与えられた点 $a \in A$ に対して $d(a, x_n) \gt n$ を満たす $x_n \in A$ が存在する。

すると、このどんな部分列 $(x_{n_k})$ およびどんな点 $b \in A$ に対しても

$$
\begin{aligned}
n_k &\lt d(a, x_{n_k}) \le d(a, b) + d(b, x_{n_k}).\\
n_k - d(a, b) &\le d(b, x_{n_k}).\\
\therefore d(b, x_{n_k}) &\cancel{\to} 0 \;(n \to \infty).
\end{aligned}
$$

したがって $A$ はコンパクトでない。

以上
