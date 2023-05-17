---
title: Functional Analysis - Part 10 - Cauchy-Schwarz Inequality
---

[Functional Analysis - Part 10 - Cauchy-Schwarz Inequality - YouTube](https://www.youtube.com/watch?v=4HOvKSPl6yM&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=10)

Cauchy-Schwarz 不等式はとても重要。

$(X, \left\langle \cdot,\cdot \right\rangle)$ を内積空間とし、ノルムを
$\left\lVert x\right\rVert \coloneqq \sqrt{\left\langle x, x \right\rangle}$ とする。
このとき ${x, y \in X}$ に対して次の不等式が成り立つ：

$$
\lvert \left\langle x, y \right\rangle \rvert \le \left\lVert x \right\rVert \left\lVert y \right\rVert.
$$

かつ、等号が成り立つのは $x, y$ が線形独立であるときに限る。

証明：
${x = 0}$ に対しては次のように成り立つ：

$$
\lvert \left\langle x, x \right\rangle \rvert
= 0 = \left\lVert 0\right\rVert \cdot \left\lVert 0 \right\rVert.
$$

${x \ne 0}$ とする。$x$ の単位ベクトルを $\hat x$ とし、二つのベクトルを定義する：

$$
\begin{aligned}
y_{\parallel} \coloneqq \left\langle \hat{x}, y \right\rangle \hat{x},\quad
y_{\perp} \coloneqq y - y_{\parallel}.
\end{aligned}
$$

※なぜこのベクトルが出てくるかはビデオのように絵を描かないと理解できない。

$$
\def\xy{ \left\langle \hat{x},\;y \right\rangle }
\def\xyx{ \xy \hat{x} }
\def\ymxyx{ y - \xy \hat{x} }
\begin{aligned}
0 \le \left\lVert y_{\perp}\right\rVert^2
&= \left\lVert y - y_{\parallel}\right\rVert^2\\
&= \left\lVert y - \xyx \right\rVert^2\\
&= \left\langle \ymxyx,\;\ymxyx \right\rangle^2\\
&= \left\langle \ymxyx,\;y \right\rangle - \left\langle \ymxyx, \xyx\right\rangle\\
&= \left\langle y,y \right\rangle
 - \left\langle \xyx,\;y \right\rangle
 - \left\langle y\xyx \right\rangle
 + \left\langle \xyx,\;\xyx \right\rangle\\
&= \left\lVert y\right\rVert^2
 - \left(\left\langle \xyx, y \right\rangle + \overline{\left\langle \xyx, y \right\rangle}\right)
 + \left\lVert \xyx\right\rVert^2\\
&= \left\lVert y\right\rVert^2
 - \left(2 \Re \left\langle \xyx, y \right\rangle \right)
 + \lvert \xy \rvert^2 \cdot \left\lVert \hat{x}\right\rVert^2\\
&= \left\lVert y\right\rVert^2
 - 2 \lvert \xy \rvert ^2 + \lvert \xy \rvert^2\\
&= \left\lVert y\right\rVert^2 - \lvert \xy \rvert^2.
\\
\therefore \left\lVert y \right\rVert^2
\ge \lvert \left\langle \hat{x},\;y \right\rangle \rvert^2
&= \left\lvert \left\langle \frac{x}{\lVert x\rVert},\;y \right\rangle \right\rvert^2\\
&= \frac{1}{\lVert x\rVert^2} \lvert \left\langle x,\;y \right\rangle \rvert.\\
\therefore \lVert x \rVert \lVert y \rVert
&\ge \lvert \left\langle x,\;y \right\rangle \rvert.
\end{aligned}
$$

これを利用してノルムに関する三角不等式が示せる：

$$
\begin{aligned}
\lVert x + y\rVert^2
&= \left\langle x + y,\;x + y \right\rangle
= \lVert x\rVert^2 + 2\Re\left\langle x,\;y \right\rangle + \lVert y\rVert^2\\
&\le \lVert x \rVert^2 + 2\lvert \left\langle x,\;y \right\rangle \rvert + \lVert y\rVert^2\\
&\le \lVert x \rVert^2 + 2 \lVert x \rVert \lVert y \rVert + \lVert y\rVert^2\\
&= \left(\lVert x \rVert + \lVert y \rVert\right)^2.
\end{aligned}
$$

※最初の不等式は普通の三角不等式による。最後の不等式は Cauchy-Schawarz 不等式を適用した。

以上
