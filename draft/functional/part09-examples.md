---
title: Functional Analysis - Part 9 - Examples of Inner Products and Hilbert Spaces
---

[Functional Analysis - Part 9 - Examples of Inner Products and Hilbert Spaces - YouTube](https://www.youtube.com/watch?v=eiD6OueArHE&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=9)

次の空間を考える：

$\text{(a)}$ $\mathbb F.$

$\text{(b)}$ ${l^2(\mathbb N, \mathbb F).}$

$\text{(c)}$ ${C([0, 1], \mathbb F).}$

上のうち $\text{(a)}$ と $\text{(b)}$ は次の内積を入れることで Hilbert 空間である：

$$
\left\langle x, y \right\rangle = \sum_{i = 1}^{\infty}\overline{x_i}y_i.
$$

$\text{(c)}$ では内積を次で定める（これは Hilbert 空間でない）：

$$
\left\langle f, g \right\rangle = \int_0^1 \overline{f(t)}g(t)\!\mathrm{d}t.
$$

----

今回は ${(l^2(\mathbb N, \mathbb F), \left\langle \cdot,\cdot \right\rangle)}$
の内積としたものが、内積の要件を満たしているか検証する：

(1) positive definitive: ${x \in l^2(\mathbb N, \mathbb F)}$ に対して：

$$
\begin{aligned}
\left\langle x, x \right\rangle
&= \sum_{i = 1}^{\infty}\overline{x_i}x_i\\
&= \sum_{i = 1}^{\infty} \lvert x_i \rvert^2 \ge 0.\\
\end{aligned}
$$

また、

$$
\begin{aligned}
\left\langle x, x \right\rangle = 0
&\implies \forall i\;\lvert x_i \rvert^2 = 0\\
&\implies \forall i\;x_i = 0 .
\end{aligned}
$$

(2) conjugate symmetric: ${x, y \in l^2(\mathbb N, \mathbb F)}$ に対して：

$$
\begin{aligned}
\overline{\left\langle y, x \right\rangle}
&= \sum_{i=1}^{\infty}\overline{\overline{y_i}x_i}\\
&= \sum_{i=1}^{\infty}y_i\overline{x_i}\\
&= \left\langle x, y \right\rangle.
\end{aligned}
$$

(3) linear in the 2nd argument: ${x, y, z \in l^2(\mathbb N, \mathbb F),}$
${\lambda \in \mathbb F}$ に対して：

$$
\begin{aligned}
\left\langle x, y + z \right\rangle
&= \sum_{i = 1}^{\infty}\overline{x_i}(y_i + z_i)\\
& \sum_{i = 1}^{\infty}\overline{x_i}y_i + \sum_{i = 1}^{\infty}\overline{x_i}z_i\\
&= \left\langle x, y \right\rangle + \left\langle x, z \right\rangle.\\
\\
\left\langle x, \lambda y \right\rangle
&= \sum_{i = 1}^{\infty}\overline{x_i}(\lambda y_i)\\
&= \lambda \sum_{i = 1}^{\infty}\overline{x_i}y_i\\
&= \lambda \left\langle x, y \right\rangle.
\end{aligned}
$$

以上
