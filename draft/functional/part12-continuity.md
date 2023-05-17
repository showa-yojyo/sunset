---
title: Functional Analysis - Part 12 - Continuity - YouTube
---

[Functional Analysis - Part 12 - Continuity - YouTube](https://www.youtube.com/watch?v=0CgfjNdNNdo&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=12)

距離空間における連続性。
$(X, d_X)$ $(Y, d_Y)$ を距離空間とする。写像
$f \colon X \longrightarrow Y$ が**連続**であるとは、
$Y$ の任意の開集合 $B$ に対して $f$ の逆像 $f^{-1}(B)$ が $X$ の開集合であることを言う。

$f$ が**点列連続** であるとは、次が成り立つことを言う：
任意の $\tilde x \in X$ に対して

$$
\lim_{n \to \infty}x_n = \tilde x
$$

を満たす任意の点列 ${(x_n) \subset X}$ に対して

$$
\lim_{n \to \infty}f(x_n) = f(\tilde x).
$$

距離空間では、連続性と点列連続性は同値。

例：
$\text{(a)}$ $(X, d_X)$ を離散距離空間、$(Y, d_Y)$ を勝手な距離空間とする。
このとき、すべての写像 $f \colon X \longrightarrow Y$ が連続である。

$\text{(b)}$ $(X, d_X)$, $(Y, d_Y)$ を勝手な距離空間とする。
点 $y_0 \in Y$ を固定する。このとき写像
$f \colon X \longrightarrow Y$ は $f(x) = y_0$ であればいつでも連続である。

$\text{(c)}$ $(X, \lVert \cdot \rVert)$ をノルム空間、
$Y = \mathbb R$ を標準距離を入れた実数全体からなる距離空間とする。このとき

$$
\begin{aligned}
f \colon X & \longrightarrow & \mathbb R\\
         x & \longmapsto & \lVert x \rVert
\end{aligned}
$$

は連続である。

証明：$\tilde x \in X$ をとり、それに収束する点列 $(x_n) \subset X$ を一つとる。
このとき

$$
\begin{aligned}
f(x_n) &= \lVert x_n\rVert = \lVert x_n - \tilde x + \tilde x\rVert\\
&\le \lVert x_n - \tilde x\rVert + \lVert \tilde x\rVert\\
&= d(x_n, \tilde x) + f(\tilde x)\\
&\to f(\tilde x)\quad(n \to \infty).\\
\therefore \lim_{n \to \infty}f(x_n) &\le f(\tilde x).\\
f(\tilde x) &= \lVert \tilde x\rVert = \lVert \tilde x - x_n + x_n\rVert\\
&\le \lVert \tilde x - x_n\rVert + \lVert x_n\rVert\\
&= d(\tilde x, x_n) + f(x_n).\\
\therefore f(\tilde x) &\le \lim_{n \to \infty}f(x_n).
\end{aligned}
$$

$\text{(d)}$ $(X, \left\langle \cdot,\;\cdot \right\rangle)$ を内積空間、
$Y = \mathbb C$ を通常の距離をいれた複素数全体からなる距離空間とする。
$x_0 \in X$ を固定する。このとき、

$$
\begin{aligned}
f \colon X & \longrightarrow & \mathbb C\\
         x & \longmapsto & \left\langle x_0,\;x \right\rangle
\end{aligned}
$$

は連続である。

証明：さっきと同じように点 $\tilde x \in X$ とそれに収束する点列 $(x_n) \subset X$ を決めると、

$$
\begin{aligned}
\lvert f(x_n) - f(\tilde x)\rvert
&= \lvert \left\langle x_0,\;x_n \right\rangle - \left\langle x_0,\;\tilde x \right\rangle\rvert\\
&= \lvert x_0,\;x_n - \tilde x \rvert\\
&\le \lVert x_0\rVert \cdot \lVert x_n - \tilde x\rVert\\
&\to 0 \quad (n \to 0).
\end{aligned}
$$

不等号は Cauchy-Schwarz 不等式による。
類比的に、次の $g \colon X \longrightarrow \mathbb C$ も連続である：

$$
\begin{aligned}
g \colon X & \longrightarrow & \mathbb C\\
         x & \longmapsto & \left\langle x,\;x_0 \right\rangle
\end{aligned}
$$

ここで前回最後に予告した命題を証明する。

命題：
$(X, \left\langle \cdot,\;\cdot \right\rangle)$ を内積空間とする。
$U \subset X$ に対して $U^\perp$ は閉空間である。

証明：
補空間の収束列 $(x_n) \subset U^\perp$ を取る。極限を $\tilde x \in X$ とする。
これが $U^\perp$ の点であることを示す。

$$
\begin{aligned}
\forall u \in U\; \left\langle x_n,\;u \right\rangle = 0
&\implies \forall u \in U\; \lim_{n \to \infty}\left\langle x_n,\;u \right\rangle = 0\\
&\implies \forall u \in U\; \left\langle \tilde x, u \right\rangle = 0.\\
\therefore \tilde{x} \in U^\perp.&
\end{aligned}
$$

以上
