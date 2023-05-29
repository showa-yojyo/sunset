---
title: Functional Analysis - Part 26 - Open Mapping Theorem
---

[Functional Analysis - Part 26 - Open Mapping Theorem - YouTube](https://www.youtube.com/watch?v=o0vAbQFZnIo&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=26)

## 開写像

${(X, d_x),}\;{(Y, d_Y)}$ を距離空間とする。
写像 ${f \colon X \longrightarrow Y}$ が開写像であるとは、
${A \subset X}$ が開集合であれば $f(A)$ が $Y$ の開集合であることを言う。

## 一般例

写像 ${f \colon X \longrightarrow Y}$ が全単射かつ
${f^{-1} \colon Y \longrightarrow X}$ が連続ならば、
$f$ は開写像である：

$f^{-1}$ の連続性から $A \subset X$ が開集合であれば

$$
\left(f^{-1}\right)^{-1}(A) = f(A) \subset Y
$$

は開集合であるから。

## 例

$\text{(a)}$ ${f \colon \mathbb R \longrightarrow \mathbb R, x \longmapsto x^3}$
は開写像。

$\text{(b)}$ ところが $f \colon \mathbb R \longrightarrow \mathbb R, x \longmapsto x^2$
は開写像でない。反例：
${A = (-2, 2)}$ の像は ${f(A) = [0, 4).}$

## 開写像定理

$X, Y$ を Banach 空間とし、$T \in \mathcal{B}(X, Y)$ とする。
$T$ が全射であることと $T$ が開写像であることは同値。

（※証明がない）

以上
