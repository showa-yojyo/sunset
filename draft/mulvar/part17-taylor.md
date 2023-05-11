---
title: Multivariable Calculus - Part 17 - Taylor's Theorem - Examples
---

[Multivariable Calculus - Part 17 - Taylor's Theorem - Examples - YouTube](https://www.youtube.com/watch?v=rDHrX87iwHM&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=17)

以下 ${f \in C^{\infty}(\mathbb R^n),}\;{\tilde x \in \mathbb R^n}$ とする。復習から。

$k$ 階 Taylor 多項式の定義：

$$
T_k(h) = \sum_{\lvert \alpha \rvert \le k} \frac{D^{\alpha} f(\tilde x)}{\alpha!} h^{\alpha}.
$$

残項の定義：

$$
R_k(h) = \sum_{\lvert \alpha \rvert = k + 1} \frac{D^{\alpha} f(\xi)}{\alpha!} h^{\alpha}.
$$

二階 Taylor 多項式を見ていく。

$$
\def\taylor#1{ \sum_{#1}\frac{D^{\alpha} f(\tilde x)}{\alpha!} h^{\alpha} }
\begin{aligned}
T_2(h) &= \taylor{ \lvert \alpha \rvert \le 2}\\
&= f(\tilde x) + \taylor{ \lvert \alpha \rvert = 1} + \taylor{ \lvert \alpha \rvert = 2}\\
\end{aligned}
$$

ここで、最初のシグマでは ${\alpha = (0, \dotsc, 0, 1, 0, \dotsc, 0)}$ の形だから

$$
\def\abs#1{\lvert#1\rvert}
\begin{aligned}
\sum_{\abs{\alpha} = 1}\frac{D^{\alpha} f(\tilde x)}{\alpha!} h^{\alpha}
&= \sum_{j = 1}^n \frac{\partial f(\tilde x)}{\partial x_j}h_j\\
&= J_f(\tilde x)h.
\end{aligned}
$$

最後のシグマにおける $\alpha$ は次の二とおりある：

$$
\alpha = \begin{cases}
(0, \dotsc, 0, 2, 0, \dotsc, 0),\\
(0, \dotsc, 0, 1, 0, \dotsc, 0, \dotsc, 0, 1, 0, \dotsc, 0).
\end{cases}
$$

よって

$$
\def\abs#1{\lvert#1\rvert}
\begin{aligned}
\sum_{\abs{\alpha} = 2}\frac{D^{\alpha} f(\tilde x)}{\alpha!} h^{\alpha}
&= \frac{1}{2}\sum_{j=1}^n \frac{\partial^2f(\tilde x)}{\partial x_j^2}h_j^2
+ \frac{1}{2}\sum_{j\ne i}\frac{\partial^2f(\tilde x)}{\partial x_j \partial x_i}h_j h_i\\
&= \frac{1}{2}\sum_{i, j}h_j\frac{\partial^2f(\tilde x)}{\partial x_j \partial x_i}h_i.
\end{aligned}
$$

以上より

$$
\begin{aligned}
T_2(h) &=
f(\tilde x) + J_f(\tilde x)h = \frac{1}{2}h^T H_f(\tilde x) h,
\end{aligned}
$$

ここで $H_f(\tilde x)$ は次の二次行列 (Hessian matrix) である：

$$
\begin{pmatrix}H_f(\tilde x)\end{pmatrix}_{ji}
= \frac{\partial^2 f(\tilde x)}{\partial x_j \partial x_i}.
$$

## 例

${f \colon \mathbb R^2 \longrightarrow \mathbb R,}\;{f(x_1, x_2) = \cos x_1x_2.}$

$$
J_f(\tilde x) = \begin{pmatrix}
-\tilde x_2\sin\tilde x_1\tilde x_2 & -\tilde x_1\sin\tilde x_1\tilde x_2
\end{pmatrix}
$$

$$
H_f(\tilde x) = \begin{pmatrix}
-\tilde x_2\cos \tilde x_1 \tilde x_2 & -\sin \tilde x_1 \tilde x_2 - \tilde x_2 \tilde x_1\cos \tilde x_1 \tilde x_2\\
-\sin \tilde x_1 \tilde x_2 - \tilde x_2 \tilde x_1\cos \tilde x_1 \tilde x_2 & - \tilde x_1^2\cos \tilde x_1 \tilde x_2
\end{pmatrix}
$$

点 ${\tilde x = (0, 0)}$ における Taylor 多項式では：

$$
\begin{aligned}
J_f(\tilde x) &= \begin{pmatrix}
0 & 0
\end{pmatrix},
\\
H_f(\tilde x) &= \begin{pmatrix}
0 & 0\\
0 & 0
\end{pmatrix}.
\end{aligned}
$$

よって、最初からわかっていることだが

$$
T_2(h) = 1.
$$

最後の $\cos$ の $k = 4m$ における $T_k$ が何を議論しているのかわからない。

以上
