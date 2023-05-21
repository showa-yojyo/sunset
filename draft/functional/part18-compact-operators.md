---
title: Functional Analysis - Part 18 - Compact Operators
---

[Functional Analysis - Part 18 - Compact Operators - YouTube](https://www.youtube.com/watch?v=tiR9-u6K5EE&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=18)

## 前回までの重要事項

* 作用素ノルム・有界作用素
* 距離空間・有限次元ノルム空間の集合がコンパクトである条件（閉かつ有界）
* 連続写像はコンパクト性を保つ
* 一様連続関数（値がスカラーであることが必要）
* 一様同等連続関数（これも値がスカラー）
* Arzelà-Ascoli 定理：コンパクト集合上で定義された関数の部分集合がコンパクトである条件（閉かつ有界かつ一様同等連続）

## 本編

有限次元ベクトル空間の線形写像
$T \colon \mathbb F^n \longrightarrow \mathbb F^m$ を考える。どちらの空間にも標準ノルムを入れる。

$T$ は連続かつ有界である。
ゆえに $T(B_1(0)) \subset \mathbb F^m$ は有界である。
ゆえに閉包 $\overline{T(B_1(0))} \subset \mathbb F^m$ はコンパクトである。

今度は次の恒等写像を考える：

$$
\begin{aligned}
I \colon l^p(\mathbb N) & \longrightarrow l^p(\mathbb N)\\
x & \longmapsto x
\end{aligned}
$$

（※空間を無限次元ノルム空間に置き換えた）

このとき $\overline{I(B_1(0))} = \overline{B_1(0)}$
は $l^p(\mathbb N)$ の閉球である。しかし有界でない以上はコンパクトでない。

## コンパクト作用素

定義：
${(X,\lVert \cdot\rVert_X),}{(Y,\lVert \cdot\rVert_Y)}$ をノルム空間とする。
有界線形写像
$T \colon X \longrightarrow Y$ が**コンパクト**であるとは、
$\overline{T(B_1(0))} \subset Y$ がコンパクトであるものを言う。

例：${I = [0, 1]}$ とする。以下に登場するどの $C(I)$ にも
$\sup$ ノルムを入れる。

$k \in C(I\times I)$ を一つ固定し、次で定義される積分作用素
$T_k \colon C(I) \longrightarrow C(I)$ を考える：

$$
(T_kf)(s) \coloneqq \int_0^1\!k(s, t)f(t)\;\mathrm{d}t.
$$

$k$ は一様連続であるので：

$$
\forall \varepsilon \gt 0\;
\exists \delta \gt 0\;
\forall s_1, t_1, s_2, t_2 \in I\;
:
\lVert (s_1, t_1) - (s_2, t_2) \rVert \lt \delta
\implies \lvert k(s_1, t_1) - k(s_2, t_2) \rvert \lt \varepsilon.
$$

したがって、

$$
\begin{aligned}
\left\lvert (T_kf)(s_1) - (T_kf)(s_2) \right\rvert
&= \left\lvert \int_0^1\! \left(k(s_1, t)f(t) - k(s_2, t)f(t)\right)\mathrm{d}t \right\rvert \\
&\le \int_0^1\!\lvert k(s_1, t) - k(s_2, t) \rvert \lvert f(t) \rvert\mathrm{d}t\\
&\lt \varepsilon \lVert f\rVert_\infty.
\end{aligned}
$$

さらに $A \coloneqq T_k(B_1(0))$ とおくと、上の結果から $A$ が一様同等連続であることが示される：

$$
\forall \varepsilon \gt 0\;
\exists \delta \gt 0\;
\forall s_1, s_2 \in I\;
\forall g \in A\;
:
\lVert s_1 - s_2 \rVert \lt \delta
\implies \lvert g(s_1) - g(s_2) \rvert \lt \varepsilon.
$$

$A$ は一様同等連続である。

あとは有界性を示したい。作用素ノルムを計算すると、

$$
\begin{aligned}
\lVert T_k\rVert
&= \sup \!\left\{\left. \lVert T_kf\rVert_\infty \,\right|\,\left. \lVert f\rVert_\infty = 1 \right.\right\}\\
&= \sup \!\left\{\left. \sup_{s\in I} \left\lvert\int_0^1\!k(s, t)f(t)dt\right\rvert \,\right|\,\left. \lVert f\rVert_\infty = 1 \right.\right\}\\
&\le \sup \!\left\{\left. \sup_{s\in I} \int_0^1\!\left\lvert k(s, t)\right\rvert \lvert f(t)\rvert dt \,\right|\,\left. \lVert f\rVert_\infty = 1 \right.\right\}\\
&\le \sup_{s\in I} \int_0^1\!\lvert k(s, t) \rvert\mathrm{d}t\\
&\le \lVert k\rVert_\infty.
\end{aligned}
$$

$k$ はコンパクト集合で定義された関数であるからこの値は有限。よって有界。

$\overline{A} = \overline{B_1(0)}$ に関しては、Arzelà–Ascoli 定理により、一様同等連続かつ有界かつ閉集合であるからコンパクトである。

したがって、その定義により $T_k$ はコンパクト作用素である。

以上
