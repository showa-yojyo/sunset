---
title: Multivariable Calculus - Part 11 - Gradient is Fastest Increase
---

[Multivariable Calculus - Part 11 - Gradient is Fastest Increase - YouTube](https://www.youtube.com/watch?v=WCvjg5O8Bjk&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=11)

${f \colon \mathbb R^n \longrightarrow \mathbb R}$ を全微分可能とする。
${v \in \mathbb R^n}$ を単位ベクトルとする。

方向微分の復習：

$$
(\partial_v f)(\tilde x)
= \left\langle \operatorname{grad}f(\tilde x),\;v\right\rangle.
$$

特に ${v = e_i}$ （標準基底ベクトル）とすると、

$$
(\partial_{e_i} f)(\tilde x)
= \left\langle \operatorname{grad}f(\tilde x),\;e_i\right\rangle
= \frac{\partial f}{\partial x_i}(\tilde x).
$$

（ここに二次元の絵が来る）

質問：どの ${v \in \mathbb R^n}$ が方向微分 ${(\partial_v f)(\tilde x)}$ を最大にするか？

回答：$\alpha$ を勾配ベクトル $\operatorname{grad}f(\tilde x)$ とベクトル $v$ のなす角とすると、

$$
\begin{aligned}
(\partial_v f)(\tilde x)
&= \left\langle \operatorname{grad}f(\tilde x),\;v\right\rangle\\
&= \left\lVert f(\tilde x)\right\rVert \cdot \left\lVert v \right\rVert \cos \alpha\\
&= \left\lVert f(\tilde x)\right\rVert \cos \alpha.
\end{aligned}
$$

なので、勾配ベクトルの方向が向きまで一致しているように $v$ を与えれば方向微分は最大値をとる。

例：円 ${f(x_1, x_2) = x_1^2 + x_2^2.}$ 勾配を求める：

$$
\operatorname{grad}f(x) =
\begin{pmatrix}2x_1 \\ 2x_2\end{pmatrix}.
$$

原点と円周上の点を結ぶ直線を、円の外側に向かう方向に単位ベクトルを取ればそれがその点における方向微分の最大値を与える。
