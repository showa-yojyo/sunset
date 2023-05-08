---
title: Multivariable Calculus - Part 10 - Directional Derivative
---

[Multivariable Calculus - Part 10 - Directional Derivative - YouTube](https://www.youtube.com/watch?v=OxVYmBZqeBU&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=10)

$f \colon \mathbb R^n \longrightarrow \mathbb R$ には次の異なる微分が考えられる：

* 偏微分
* 方向微分（これらの間に書く）
* 全微分

$$
\frac{\partial f}{\partial x_2}(\tilde x)
= \lim_{h \to 0}\frac{f(\tilde x_1, \tilde x_2 + h) - f(\tilde x_1, \tilde x_2)}{h}.
$$

定義：

$f \colon \mathbb R^n \longrightarrow \mathbb R$ と
${\tilde x \in \mathbb R^n}$,
単位ベクトル ${v \in \mathbb R^n}$ に対して極限

$$
\lim_{h \to 0}\frac{f(\tilde x + hv) - f(\tilde x)}{h}.
$$

が存在すれば、それを点 ${\tilde x}$ におけるベクトル $v$ に沿った $f$ の **方向微分** という。

方向微分の記号：

$$
(\partial_v f)(\tilde x),\quad
(D_v f)(\tilde x),\quad
(\nabla_v f)(\tilde x),\quad
(v \cdot \nabla f)(\tilde x).
$$

命題：
$f$ が ${\tilde x}$ において全微分可能ならば方向微分が存在する。

先ほどまでの議論と同じ記号を用いる：

$$
\begin{aligned}
\lim_{h \to 0}\frac{f(\tilde x + hv) - f(\tilde x)}{h}
&= \left.\frac{\mathrm{d}}{\mathrm{d}t} f(\tilde x + t v)\right\rvert_{t = 0}\\
&= \left.\frac{\mathrm{d}}{\mathrm{d}t}(f \circ \gamma)(t)\right\rvert_{t = 0}\\
&= \left. J_f(\gamma(t)) J_\gamma(t)\right\rvert_{t = 0}\\
&= J_f(\gamma(0)) J_\gamma(0)\\
&= J_f(\tilde x) v
= \left\langle \operatorname{grad}f(\tilde x),\;v\right\rangle.
\end{aligned}
$$

方向微分が存在して、全微分と方向との内積に等しいことが示された。

最初の等号は関数 ${t \longmapsto f(\tilde x + tv)}$ における ${t = 0}$ での微分と考えることによる。
二番目の等号で、関数 $\gamma\colon \mathbb R \longrightarrow \mathbb R^n$ を
${\gamma(t) = \tilde x + tv}$ とおいている。
三番目の等号は chain rule による。
最後の等号は前回参照。
