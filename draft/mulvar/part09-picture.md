---
title: Multivariable Calculus - Part 9 - Geometric Picture for the Gradient
---

[Multivariable Calculus - Part 9 - Geometric Picture for the Gradient - YouTube](https://www.youtube.com/watch?v=P0EyEdEcS3c&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=9)

今回は $n = 2$ つまり平面で考察する。前回の終盤の議論を一般化する？

関数 $f \colon \mathbb R^n \longrightarrow \mathbb R$ と定数 $c \in \mathbb R$ に対して
$f(t) = c$ のプロットを等高線 (contour line) と呼ぶ。

何か曲線 $\gamma \colon \mathbb R \longrightarrow \mathbb R^2$ があるとする。

任意の $t \in \mathbb R$ に対して $(f \circ \gamma)(t) = c$ とすると、微分を考えることで

$$
\frac{\mathrm{d}}{\mathrm{d}t}(f \circ \gamma)(t) = 0.
$$

Chain rule により

$$
\begin{aligned}
J_{f \circ \gamma}(t) &= J_f(\gamma(t)) J_\gamma(t)
= \left\langle \operatorname{grad}\!f(\gamma(t)), \;\gamma^{\prime}(t) \right\rangle
= 0.
\end{aligned}
$$

（ここでプロットを示す）

標語的に「勾配ベクトルは等高線に対して垂直である」。

以上
