---
title: Functional Analysis - Part 27 - Bounded Inverse Theorem and Example
---

[Functional Analysis - Part 27 - Bounded Inverse Theorem and Example - YouTube](https://www.youtube.com/watch?v=cXwEXs-N9eQ&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=27)

## 有界逆写像定理

$X, Y$ を Banach 空間とし、${T \in \mathcal{B}(X, Y)}$ とする。
このとき $T$ が全単射ならば ${T^{-1} \in \mathcal(Y, X).}$

（※連続であることが重要）

証明：
開写像定理より、$T$ が全単射であることから $T$ は開写像である。
したがって $T^{-1}$ は連続。

これは単なるノルム空間では成立しない。Banach が必要。それを次に示す。

## 反例

${X = (C([0, 1]), \lVert \cdot\rVert_{\infty}),}\;{Y = (C^1([0, 1]), \lVert \cdot\rVert_{\infty}).}$
（※ $Y$ は完備でない）

$$
(Tf)(t) = \int_0^t\!f(s)\,\mathrm{d}s.
$$

これは線形かつ有界作用素なのであった（いつかやった）。

$$
\lVert Tf\rVert_{\infty}
= \sup_{t \in I} \left\lvert \int_0^t\!f(s)\,\mathrm{d}s\right\rvert
\le \lVert f\rVert_{\infty}\quad
\therefore \lVert T\rVert_{X\to Y} \le 1.
$$

かつ全単射でもある。

${f_k(t) = \sin kt}$ とする。定積分を計算して：

$$
(Tf_k)(t) = \frac{1}{k}(1 - \cos kt).
$$

右辺を $g_k(t)$ とおく。${\lVert f_k\rVert_{\infty} = 1}$
と $\lVert g_k\rVert_{\infty} \le \dfrac{2}{k}$ を使って：

$$
\begin{aligned}
T^{-1}g_k &= f_k.\\
\therefore \lVert T^{-1}\rVert_{Y \to X}
&\ge \frac{\lVert T^{-1}g_k\rVert_{\infty}}{\lVert g_k \rVert_{\infty}}\\
&= \frac{\lVert f_k\rVert_{\infty}}{\lVert g_k\rVert_{\infty}}\\
&\ge \frac{k}{2}
\to \infty \quad(k \to \infty).
\end{aligned}
$$

ゆえに $T^{-1}$ は連続でない。

以上
