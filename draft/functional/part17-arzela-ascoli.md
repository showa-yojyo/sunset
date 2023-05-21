---
title: Functional Analysis - Part 17 - Arzelà–Ascoli theorem
---

[Functional Analysis - Part 17 - Arzelà–Ascoli theorem - YouTube](https://www.youtube.com/watch?v=D9geJam3wOY&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=17)

※前回コンパクト集合を定義したので、今回はそれに相応しい定理をやるということだ。

例（何の？）：

$\text{(a)}$ $(X, \lVert \cdot\rVert)$ を有限次元ノルム空間とする（※これはいつでも Banach 空間）
次の事実が重要だ：

$A \subset X$ について $A$ がコンパクトであることと $A$ が閉集合かつ有界であることは同値。

$\text{(b)}$ Banach 空間 $(l^p(\mathbb N), \lVert \cdot\rVert_p)\;(p \in [1, \infty)).$

$A \coloneqq \!\left\{\left. x \in l^p(\mathbb N) \right| \left. \lVert x\rVert_p \le 1 \right.\right\}\!$ 
は閉集合かつ有界。しかしコンパクトではない：

$$
\begin{aligned}
e_1 &\coloneqq (1, 0, 0, \dotsc)\in A\\
e_2 &\coloneqq (0, 1, 0, \dotsc)\in A\\
\vdots &
\end{aligned}
$$

とおくと Cauchy 列列 $(e_n) \subset A.$
では、この点列に収束部分列は存在するだろうか。否：
$\forall n\;\forall m:n \ne m \implies \lVert e_n - e_m\rVert_p = \sqrt[p]{2}.$
ゆえに収束部分列は存在しない。

## 一様連続

${I = [0, 1]}$ とする。Banach 空間 $(C(I), \lVert \cdot\rVert_\infty)$ を考える。ただし

$$
\lVert f\rVert_\infty \coloneqq \sup
\!\left\{\left. \lvert f(t) \rvert \right| \left. t \in I \right.\right\}\!.
$$

※関数の値は $\mathbb F$ とする。

$f$ が $I$ 上**一様連続**であるとは（実解析コースで習ったものと同じで）
次が成り立つことを意味する：

$$
\forall \varepsilon \gt 0\;
\exists \delta \gt 0\;
\forall t_1, t_2 \in I
:
\lvert t_1 - t_2 \rvert \lt \delta \implies
\lvert f(t_1) - f(t_2) \rvert \lt \varepsilon.
$$

## 一様同等連続

（※この定義を関数に対するものから関数の集合に対するものに拡張したい）

$A \subset C(I)$ が**一様同等連続**であるとは、次が成り立つことを意味する：

$$
\forall \varepsilon \gt 0\;
\exists \delta \gt 0\;
\forall t_1, t_2 \in I\;
\forall f \in A
:
\lvert t_1 - t_2 \rvert \lt \delta \implies
\lvert f(t_1) - f(t_2) \rvert \lt \varepsilon.
$$

つまり、

$$
\sup_{f \in A}\lvert f(t_1) - f(t_2) \rvert \to 0
\;(\lvert t_1 - t_2 \rvert \to 0).
$$

## 例

$\text(a)$
${A \coloneqq \!\left\{\left. f \in C(I) \right| \left. \lVert f \rVert_{\infty} \le 1\right.\right\}\!.}$

$$
\begin{aligned}
\sup_{f \in A}\lvert f(t_1) - f(t_2) \rvert
&ge \sup_{n\in\mathbb N} \lvert f_n(t_1) - f_n(t_2) \rvert\\
\end{aligned}
$$

ここで関数 $f_n \in A$ をビデオのように定義する：

$$
f_n(t) \coloneqq \begin{cases}
1, & 0 \le t \lt \dfrac{1}{2} - \dfrac{1}{n},\\
\\
\dfrac{2 - n}{2n}t - \dfrac{2 - n}{4n}, & \dfrac{1}{2} - \dfrac{1}{n} \le t \lt \dfrac{1}{2},\\
\\
0, & \dfrac{1}{2} \le t \le 1.
\end{cases}
$$

$n$ が十分大きければ：

$$
\begin{aligned}
\sup_{f \in A}\lvert f(t_1) - f(t_2) \rvert
&\ge \sup_{n\in\mathbb N} \lvert f_n(t_1) - f_n(t_2) \rvert\\
&\ge \lvert f_n(t_1) - f_n(t_2)\rvert\\
&= 1.
\end{aligned}
$$

これは $A$ が同等連続でないことを示している。

$\text(b)$
${A \coloneqq \!\left\{\left. f\in C^1(I) \right| \left. \lVert f^\prime\rVert_\infty \le 2 \right.\right\}\!.}$

平均値の定理などから次が示される：

$$
\begin{aligned}
\lvert f(t_1) - f(t_2) \rvert
&\le \lvert f^\prime(\xi) \rvert \cdot \lvert t_1 - t_2 \rvert \quad (\exists \xi \in I)\\
&\le 2 \: \lvert t_1 - t_2 \rvert\\
&\to 0 \; (\lvert t_1 - t_2 \rvert \to 0).
\end{aligned}
$$

これは $A$ が一様同等連続であることを示している。

## Arzelà-Ascoli 定理

$(C(I),\lVert \cdot\rVert_\infty)$ は次を満たす：

$A \subset C(I)$ がコンパクトである $\iff$
$A$ は閉集合かつ有界かつ一様同等連続である。

※実は $I$ は任意のコンパクト距離空間でも成り立つ。

以上
