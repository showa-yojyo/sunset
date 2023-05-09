---
title: Multivariable Calculus - Part 12 - Second Order Partial Derivatives
---

[Multivariable Calculus - Part 12 - Second Order Partial Derivatives - YouTube](https://www.youtube.com/watch?v=L8UWrVtLofY&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=12)

## Local Extremum

一次元の場合の極値さがし

$f \colon \mathbb R \longrightarrow \mathbb R$

必要性：
$f \colon \mathbb R \longrightarrow \mathbb R$ が
$\tilde x \in \mathbb R$ で微分可能かつ
$f$ が $\tilde x \in \mathbb R$ で極値を取るならば
$f^\prime(\tilde x) = 0.$

十分性：
$f \colon \mathbb R \longrightarrow \mathbb R$ が二回微分可能かつ
$f^\prime(\tilde x) = 0.$ ならば

* $f^{\prime\prime}(\tilde x) \lt 0 \implies$ $f$ は $\tilde x$ で極大。
* $f^{\prime\prime}(\tilde x) \gt 0 \implies$ $f$ は $\tilde x$ で極小。

## Partial Derivatives

定義：
$f \colon \mathbb R^n \longrightarrow \mathbb R$ を偏微分可能とする。

$$
\dfrac{\partial f}{\partial x_i}\colon \mathbb R^n \longrightarrow \mathbb R,
\quad i \in \{1..n\}
$$

は新しい関数を定義する。$\tilde x \in \mathbb R^n$ に対して

$$
\begin{aligned}
\frac{\partial }{\partial x_1}\left(\frac{\partial f}{\partial x_2}\right)(\tilde x)
&= \lim_{h \to 0}\cfrac{
    \cfrac{\partial f}{\partial x_2}(\tilde x_1 + h, \tilde x_2, \dotsc, \tilde x_n)
  - \cfrac{\partial f}{\partial x_2}(\tilde x_1, \tilde x_2, \dotsc, \tilde x_n)
}{h}\\
&\eqqcolon \frac{\partial^2 f}{\partial x_1 \partial x_2}(\tilde x).
\end{aligned}
$$

変数が同じ場合は次の記法を使える：

$$
\begin{aligned}
\frac{\partial }{\partial x_1}\left(\frac{\partial f}{\partial x_1}\right)(\tilde x)
\eqqcolon \frac{\partial^2 }{\partial x_1^2}(\tilde x).
\end{aligned}
$$

これらを $\tilde x$ における $f$ の **二階偏微分** という。

例：
$f(x_1, x_2) = \sin x_1 x_2.$

$$
\begin{aligned}
\frac{\partial f}{\partial x_1}(x) &= x_2 \cos x_1 x_2.\\
\frac{\partial f}{\partial x_2}(x) &= x_1 \cos x_1 x_2.\\

\frac{\partial^2 f}{\partial x_1^2}(x) &= -x_2^2 \sin x_1 x_2.\\
\frac{\partial^2 f}{\partial x_2^2}(x) &= -x_1^2 \sin x_1 x_2.\\

\frac{\partial^2 f}{\partial x_2 x_1}(x)
&= \cos x_1 x_2 - x_1 x_2 \sin x_1 x_2.\\

\frac{\partial^2 f}{\partial x_1 x_2}(x)
&= \cos x_1 x_2 - x_1 x_2 \sin x_1 x_2.
\end{aligned}
$$

$\dfrac{\partial^2 f}{\partial x_2 x_1}(x) = \dfrac{\partial^2 f}{\partial x_1 x_2}(x)$
が成り立っていることを覚えておき次回へ。
