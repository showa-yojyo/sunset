---
title: Multivariable Calculus - Part 8 - Gradient
---

[Multivariable Calculus - Part 8 - Gradient - YouTube](https://www.youtube.com/watch?v=rTTG2s_g_Ks&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=8)

## The Definition of the Gradient

$f \colon \mathbb R^n \longrightarrow \mathbb R$ を $\tilde x \in \mathbb R^n$ で全微分可能とする。
すなわち、次の Jacobian 行列が存在する：

$$
\def\pd#1{ {\dfrac{\partial f}{\partial #1}(\tilde x)} }
\begin{aligned}
J_f(\tilde x) =
\begin{pmatrix}
\pd{x_1} & \cdots & \pd{x_n}
\end{pmatrix}
\in \mathbb R^{1 \times x}.
\end{aligned}
$$

この行ベクトルを転置した列ベクトルで $f$ の **勾配 (gradient)** を定義する：

$$
\def\pd#1{ {\dfrac{\partial f}{\partial #1}(\tilde x)} }
\begin{aligned}
\nabla f(\tilde x) \coloneqq
\operatorname{grad} f(\tilde x)\coloneqq
\begin{pmatrix}
\pd{x_1} \\
\cdots \\
\pd{x_n} \\
\end{pmatrix}
\in \mathbb{R}^n.
\end{aligned}
$$

Example: $f \colon R^2 \longrightarrow R$,
$f(x_1, x_2) = x_1^2 + x_2^2.$

Python プロットで放物面であることを確認。真上から見ると同心円が確認できる。

$$
\operatorname{grad} f(x_1, x_2) =
\begin{pmatrix}
2 x_1\\
2 x_2
\end{pmatrix}
$$

このベクトルを平面にプロットする。ウニのような絵が見える。

## Apply the Chain Rule

曲線 $\gamma \colon \mathbb R \longrightarrow \mathbb R^2$ を

$\gamma(t) =
\begin{pmatrix}
\cos t\\
\sin t
\end{pmatrix}
$

で定義される円とする。これと関数 $f \colon \mathbb R^2 \longrightarrow \mathbb R$
との合成を考える。合成関数の Jacobian 行列を計算する：

$$
\begin{aligned}
J_{f \circ \gamma}(t) &= J_f(\gamma(t))\cdot J_\gamma(t)\\
&=
\begin{pmatrix}
2\cos t & \sin t
\end{pmatrix}

\begin{pmatrix}
-\sin t \\
\cos t
\end{pmatrix}\\
&= 0 \in \mathbb{R}^{1 \times 1}.
\end{aligned}
$$

上記を勾配と内積を使って書き換えられる：

$$
\begin{aligned}
J_f(\gamma(t)) \cdot J_\gamma(t)
&= \left\langle \operatorname{grad} f(\gamma(t)), \;\gamma^{\prime}(t) \right\rangle\\
&= 0 \in \mathbb{R}.
\end{aligned}
$$

内積がゼロであることは直交性を示しているという。
この場合は幾何学的に勾配ベクトルと接線ベクトルが直交している。

以上
