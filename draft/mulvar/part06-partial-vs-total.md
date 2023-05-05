---
title: Multivariable Calculus - Part 6 - Partially vs. Totally Differentiable Functions
---

[Multivariable Calculus - Part 6 - Partially vs. Totally Differentiable Functions - YouTube](https://www.youtube.com/watch?v=ERYw8O1dzSw)

## Introduction

まずは全微分可能の定義を復習。

定義域を開集合 $U \subset \mathbb R^n$ に変えたい。開集合の定義に必要である開球の定義をする：

$$
B_{\epsilon}(x) \coloneqq \{a \in \mathbb R \,|\, d(a, x) \lt \varepsilon\}.
$$

ようやく開集合を定義する：
集合 $U \subset \mathbb R^n$ が開集合であるとは、$U$ の任意の点 $x$ において、ある
$\varepsilon \gt 0$ が存在して $B_{\varepsilon}(x) \subset U$ となることを言う。

## Properties and Summary

命題 $f \colon U \longrightarrow \mathbb R^m$, $U \subset \mathbb R^n$
は開集合であるとする。このとき

(a) $f$ が $\tilde x \in U$ において全微分可能であるならば、

* $f$ は $\tilde x \in U$ において連続である。
* $\dfrac{\partial f}{\partial x_i}(\tilde x)$ が $\forall i \in \{1..n\}$ で存在する。ここで

  $$
  \dfrac{\partial f}{\partial x_i}(\tilde x) =
  \begin{pmatrix}
  \dfrac{\partial f_1}{\partial x_i}(\tilde x)\\
  \vdots\\
  \dfrac{\partial f_m}{\partial x_i}(\tilde x)
  \end{pmatrix}.
  $$


* $J_f(\tilde x)$ は次に等しい：

  $$
  \begin{pmatrix}
  \dfrac{\partial f_1}{\partial x_1}(\tilde x) & \cdots & \dfrac{\partial f_1}{\partial x_n}(\tilde x)\\
  \vdots & \ddots & \vdots\\
  \dfrac{\partial f_m}{\partial x_1}(\tilde x) & \cdots & \dfrac{\partial f_m}{\partial x_n}(\tilde x)
  \end{pmatrix}.
  $$

(b) $\dfrac{\partial f}{\partial x_i}(\tilde x)$ が $\forall i \in \{1..n\}$
かつ $\forall \tilde x \in \mathbb{R}^n$ で存在し、かつ
$\dfrac{\partial f}{\partial x_i}(\tilde x)\colon U \longrightarrow \mathbb{R}^m$
が $\forall i \in \{1..n\}$ で連続であるならば、
$f$ は $\forall \tilde x \in U$ において全微分可能である。

## Example

次で定義されている写像 $f \colon \mathbb{R}^2 \longrightarrow \mathbb R^3$ を確かめる：

$$
f\colon\!\begin{pmatrix} x_1\\x_2 \end{pmatrix} \longmapsto
\begin{pmatrix} x_1^2 + x_2^2 \\ x_1^3 \\ x_2 \end{pmatrix}
$$

それぞれの変数に関する偏微分を確認する：

$$
\dfrac{\partial f}{\partial x_1}(x) =
\begin{pmatrix} 2x_1 \\ 3x_1^2 \\ 0 \end{pmatrix},
\quad
\dfrac{\partial f}{\partial x_2}(x) =
\begin{pmatrix} 2x_2 \\ 0 \\ 1 \end{pmatrix}.
$$

いずれも $\forall x \in \mathbb{R}^2$ で存在し、かつ連続である。
したがって、$f$ は $\mathbb R^2$ 上で全微分可能であり、その Jacobian 行列は：

$$
J_f(x) =
\begin{pmatrix}
2x_1 & 2x_2\\
3x_1^2 & 0\\
0 & 1
\end{pmatrix}.
$$

以上
