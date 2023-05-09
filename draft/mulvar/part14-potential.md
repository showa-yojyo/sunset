---
title: Multivariable Calculus - Part 14 - Vector Fields and Potential Functions
---

[Multivariable Calculus - Part 14 - Vector Fields and Potential Functions - YouTube](https://www.youtube.com/watch?v=IlkvOqOOgwM&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=14)

Schwarz の定理からベクトル場が成立する？

${v \colon \mathbb R^n \longrightarrow \mathbb R^n}$ は連続微分可能であるとする。
こういう写像を **ベクトル場** という。

スケッチは ${n = 2}$ の一例。

問題：
すべての ${x \in \mathbb R^n}$ に対して ${v(x) = \operatorname{grad}f}$ を満たすような関数
$f \colon \mathbb R^n \longrightarrow \mathbb R$ は存在するだろうか。

※この $f$ を $v$ に対する **potential function** という。

必要条件：Schwarz の定理に注意して、

$$
\begin{aligned}
\frac{\partial }{\partial x_j}v_i(x)
&= \frac{\partial }{\partial x_j}(\operatorname{grad}f(x))_i\\
&= \frac{\partial }{\partial x_j}\left(\frac{\partial }{\partial x_i}f(x)\right)\\
&= \frac{\partial }{\partial x_i}\left(\frac{\partial }{\partial x_j}f(x)\right)\\
&= \frac{\partial }{\partial x_i}(\operatorname{grad}f(x))_j\\
&= \frac{\partial }{\partial x_i}v_j(x).
\end{aligned}
$$

例：$v\colon\begin{pmatrix}x_1\\x_2\end{pmatrix} \longmapsto \begin{pmatrix} -x_2 \\ x_1 \end{pmatrix}.$
プロットによると渦巻きのようなベクトル場。
必要条件を確認すると、

$$
\begin{aligned}
\frac{\partial v_1}{\partial x_2} &= -1,\\
\frac{\partial v_2}{\partial x_1} &= 1.
\end{aligned}
$$

必要条件を満たしていないので potential function は存在しない。

以上
