---
title: Multivariable Calculus - Part 16 - Taylor's Theorem
---

[Multivariable Calculus - Part 16 - Taylor's Theorem - YouTube](https://www.youtube.com/watch?v=Nhj8Gz_lo5g&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=16)

一変数関数の Taylor の定理を復習しておく。

以下 $f \colon \mathbb R^n \longrightarrow \mathbb R$ とする。
$f$ は適当な回数だけ偏微分可能なのだろう。

$f$ の線形近似はこう：

$$
f(\tilde x + h) = f(\tilde x) + J_f(\tilde x)h + \phi(h),
\text{ with }
\frac{\phi(h)}{\left\lVert h\right\rVert} \to 0.
$$

$f$ の二次近似も考えられる：

$$
f(\tilde x + h) = f(\tilde x) + J_f(\tilde x)h 
  + \frac{1}{2}h^T H_f(\tilde x)h + \psi(h),
\text{ with }
\frac{\psi(h)}{\left\lVert h\right\rVert^2} \to 0.
$$

ここで $H_f$ は Hessian 行列とする。次回成分を見る。

## Taylor's Theorem

$f \colon \mathbb R^n \longrightarrow \mathbb R$ が
$k + 1$ 階偏微分がすべて存在して、それらが連続関数であるとする：
${f \in C^{\alpha + 1}(\mathbb R^n).}$
このとき、すべての ${\tilde x \in \mathbb R^n,}\;{h \in \mathbb R^n}$ に対して：

$$
\begin{aligned}
f(\tilde x + h)
&= T_k(h) + R_k(h)\\
&= \sum_{\lvert \alpha \rvert \le k} \frac{D^{\alpha} f(\tilde x)}{\alpha!} h^{\alpha}
 + \sum_{\lvert \alpha \rvert = k + 1} \frac{D^{\alpha} f(\xi)}{\alpha!} h^{\alpha}.
\end{aligned}
$$

$T_k(h)$ は $k$ 階 Taylor 多項式という。$R_k(h)$ は残項。

ここで $\xi$ は $\tilde x$ と $\tilde x + h$ の間にある点を指すベクトル。

* 添字 $\alpha$ の記法は前回のビデオを参照。
* $h^{\alpha}$ の意味が怪しい？

以上
