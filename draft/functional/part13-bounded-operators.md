---
title: Functional Analysis - Part 13 - Bounded Operators
---

[Functional Analysis - Part 13 - Bounded Operators - YouTube](https://www.youtube.com/watch?v=442PxdU35q4&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=13)

定義： ${(X,\lVert\cdot\rVert_X),}{(Y,\lVert\cdot\rVert_Y)}$ をノルム空間とする。
写像 ${T \colon X \longrightarrow Y}$ は線形かつ連続とする：
次を $T$ の**作用素ノルム**という。

$$
\begin{aligned}
\lVert T \rVert = \lVert T \rVert_{X \to Y}
\coloneqq \sup\!\left\{\left. \frac{\lVert Tx\rVert_Y}{\lVert x \rVert_X}\,\right|\left.\, x \in X, x \ne 0 \right.\right\}\!.
\end{aligned}
$$

また、$\lVert T \rVert \lt \infty$ のとき、それは有界であるという。

命題：次の主張は同値である：

$\text{(a)}$ $T$ は連続である。

$\text{(b)}$ $T$ は $x=0$ で連続である。

$\text{(c)}$ $T$ は有界である。

証明：
$\text{(a)} \implies \text{(b)}$: これは当然成り立つ。

$\text{(b)} \implies \text{(c)}$: ${0\in X}$ に収束するような任意の点列 ${(x_n) \in X}$ をとる。
$T$ が連続であることから

$$
\lim_{n \to \infty}Tx_n = 0.
$$

このとき、${\delta \gt 0}$ が存在して ${\lVert x \rVert_X \lt \delta}$
を満たす任意の ${x \in X}$ に対して ${\lVert Tx\rVert_Y \lt 1.}$

（※この証明はビデオでやっているが、ここに書くとゴチャゴチャするので省く）

$$
\def\A{ \dfrac{\delta}{2} \cdot \dfrac{1}{\lVert x \rVert_X} }
\begin{aligned}
\frac{\lVert Tx \rVert_Y}{\lVert x \rVert_X}
&= \frac{\lVert Tx \rVert_Y \cdot \A}
        {\lVert x \rVert_X \cdot \A }\\

&= \frac{\left\lVert T\left(\dfrac{\delta}{2} \dfrac{x}{\lVert x \rVert_X}\right) \right\rVert_Y}
        {\left\lVert \dfrac{\delta}{2} \dfrac{x}{\lVert x \rVert_X} \right\rVert_X }\\

&\le \frac{2}{\delta}.\\
\therefore \lVert T \rVert
&= \sup\!\left\{\left. \frac{\lVert Tx\rVert_Y}{\lVert x \rVert_X}\,\right|\left.\, x \in X, x \ne 0 \right.\right\}
\le \frac{2}{\delta} \lt \infty.
\end{aligned}
$$

（※不等号の分子部分 ${\lt 1}$ に注意）
ゆえに $\lVert T \rVert$ は有界である。

$\text{(c)} \implies \text{(a)}$:
点列 ${(x_n) \subset X}$ を点 ${\tilde x \in X}$ を極限に持つように取る。
このとき

$$
\begin{aligned}
\lVert Tx_n - T\tilde x\rVert_Y
&= \lVert T(x_n - \tilde x)\rVert_Y\\
&\le \lVert T\rVert\cdot\lVert x_n - \tilde x\rVert_X\\
&\to 0 \; (n \to \infty).
\end{aligned}
$$

したがって $T$ は連続である。

以上
