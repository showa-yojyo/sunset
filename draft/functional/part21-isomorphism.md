---
title: Functional Analysis - Part 21 - Isomorphisms?
---

[Functional Analysis - Part 21 - Isomorphisms? - YouTube](https://www.youtube.com/watch?v=GLgww8x7poE&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=21)

## ノート

次は知っているという前提だ：

* 準同型写像 (homomorphism)：二つの集合間で構造（演算）を保つ写像。
* 準同型: 二つの集合の間に準同型写像が存在する、の意。

忘れかけてきたので復習：

* ノルムはいつでも内積から定義される。
* 距離関数はいつでもノルムから定義される。
* ノルム空間：距離空間ではあるが内積空間ではないかもしれないベクトル空間
* Banach 空間：完備ノルム空間

## 本編

準同型の例を二つ挙げる。

例：

$\text{(a)}$ $X, Y$ をベクトル空間、${f \colon X \longrightarrow Y}$ を準同型写像とする。
準同型写像であることから、スカラー倍や加算が保たれて：

$$
\begin{aligned}
f(\lambda x) &= \lambda f(x)\\
f(x + x^\prime) &= f(x) + f(x^\prime)
\end{aligned}
$$

これは線型写像の性質でもある。したがって、ベクトル空間では準同型写像と線形写像は同じ概念だ。

$\text{(b)}$ ${(X, d_X),}\;{(Y, d_Y)}$ をベクトル空間、$f \colon X \longrightarrow Y$ を写像とする。

$f$ は距離を保つ写像ということだが、等号ではなく不等号成立で十分で：

$$
d_Y(f(x), f(x^\prime)) \le d_X(x, x^\prime)
$$

## 同型写像

**同型写像** (**isomorphism**) とは次の要件をすべて満たす写像をいう：

1. 準同型写像
2. 全単射
3. 逆写像も準同型写像

（※先ほどの二つの例を思考実験するといい）

Banach 空間 $X, Y$ に対する同型写像の条件 $f$ を調べる。
写像 ${f \colon X \longrightarrow Y}$ が線形かつ全単射かつノルムを保つということだ：

$$
\lVert f(x) \rVert_Y = \lVert x \rVert_X
$$

例

$\text{(a)}$ 同型写像ではない例：

$$
\def\lp{ l^p(\mathbb N) }
\begin{aligned}
S_R \colon \lp &\longrightarrow \lp\\
(x_1, x_2, x_3, \dotsc) &\longmapsto (0, x_1, x_2, \dotsc)
\end{aligned}
$$

* 線形写像であることは間違いない。
* ノルムは簡単に求まって ${\lVert S_Rx\rVert_p = \lVert x \rVert_p.}$
* しかし全射ではない。初項がゼロでない ${l^p(\mathbb N)}$ の「点」の逆像がない。
  したがって全単射ではない。

それゆえ $S_R$ は同型写像ではない。

$\text{(b)}$ 仮定を少し変えた例：

$$
\def\lp{ l^p(\mathbb Z) }
\begin{aligned}
S \colon \lp &\longrightarrow \lp\\
(\dotsc, x_{-1}, x_0, x_1, x_2, \dotsc) &\longmapsto
(\dotsc, x_{-2}, x_{-1}, x_0, x_1, \dotsc)
\end{aligned}
$$

* 線形写像 OK
* ノルム $\lVert S_x\rVert_p = \lVert x \rVert_p.$ OK.
* 今度は単射かつ全射である。

したがって $S$ は同型写像だ。

以上
