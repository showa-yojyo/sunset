---
title: Multivariable Calculus - Part 3 - Examples of Continuous Functions - YouTube
---

[Multivariable Calculus - Part 3 - Examples of Continuous Functions - YouTube](https://www.youtube.com/watch?v=KkZFMklbiu0&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=3)

## Definition of Continuity

関数の定義域を空間全体ではなく $D \subset \mathbb{R}^n$ とするのが普通。

「関数 $f\colon D \longrightarrow \mathbb{R}^m$ が $x \in D$ において連続である」の定義を確認する。
$x$ に収束する任意の点列 $(x^{(k)})$ に対して、点列 $f(x^{(k)})$ の極限が $f(x)$ に等しいことが条件だ。

「関数 $\colon D \longrightarrow \mathbb{R}^m$ が連続である」の定義を確認する。
任意の $x \in D$ に対して、関数が連続であることをもって定義とする。

以上はほとんど前回の復習。

## Check for Continuity at the Origin

例 a: $f \colon \mathbb{R}^2 \longrightarrow \mathbb{R}$ を次で定義する：

$$
f\colon\begin{pmatrix}x_1 \\ x_2\end{pmatrix} \longmapsto x_1.
$$

連続関数であることを示す：点 $x \in \mathbb R^2$ に収束する点列 $(x^{(k)})$ をとる。
${k \to \infty}$ において ${f(x^{(k)}) = x^{(k)}_{\:1} \to x_1 = f(x).}$
$x$ は任意で良いから、関数 $f$ は $\mathbb R^2$ 上の連続関数だ。

例 b: $f \colon \mathbb{R}^2 \longrightarrow \mathbb{R}$ を次で定義する：

$$
f\colon\begin{pmatrix}x_1 \\ x_2\end{pmatrix} \longmapsto
\begin{dcases}
\begin{aligned}
\frac{x_1x_2}{x_1^2 + x_2^2}, &&\text{if} \begin{pmatrix}x_1 \\ x_2\end{pmatrix} \ne \begin{pmatrix}0 \\ 0\end{pmatrix},\\
0, &&\text{if} \begin{pmatrix}x_1 \\ x_2\end{pmatrix} = \begin{pmatrix}0 \\ 0\end{pmatrix}.
\end{aligned}
\end{dcases}
$$

原点以外で連続であることはこの分数がそこで連続であることからいい。
原点ではどうか。原点に収束する平面上の点列をいろいろと検討すると、連続でないことが示せる。

点列 $f(x^{(k)}) = \begin{pmatrix} 1/k \\ 0\end{pmatrix}$ ならば $k \to \infty$ のとき
$f(x^{(k)}) \to 0 = f\begin{pmatrix} 0 \\ 0\end{pmatrix}$ で連続。

点列 $f(x^{(k)}) = \begin{pmatrix} 0 \\ 1/k\end{pmatrix}$ ならば $k \to \infty$ のとき
$f(x^{(k)}) \to 0 = f\begin{pmatrix} 0 \\ 0\end{pmatrix}$ で連続。

ビデオでは直線 $y = -x$ に沿って原点に近づく点列をとっている。
カンニング方法として、この近づき方をプロットから見いだせる。

点列 $f(x^{(k)}) = \begin{pmatrix} 1/k \\ -1/k\end{pmatrix}$ ならば、

$$
\begin{aligned}
f\begin{pmatrix} 1/k \\ -1/k\end{pmatrix}
&= \dfrac{\dfrac{1}{k} \cdot -\dfrac{1}{k} }{\dfrac{1}{k^2} + \dfrac{1}{k^2}}\\
&= -\frac{1}{k^2}\cdot\frac{k^2}{2}\\
&= -\frac{1}{2}
\end{aligned}
$$

だから $k \to \infty$ のとき $f(x^{(k)}) \to -1/2 \ne 0 = f\begin{pmatrix} 0 \\ 0\end{pmatrix}.$
ゆえに $f$ は原点において連続ではない。

例 c: $f \colon \mathbb{R}^2 \longrightarrow \mathbb{R}$ を次で定義する：

$$
f\colon\begin{pmatrix}x_1 \\ x_2\end{pmatrix} \longmapsto
\begin{dcases}
\begin{aligned}
\frac{x_1^2x_2}{x_1^4 + x_2^2}, &&\text{if} \begin{pmatrix}x_1 \\ x_2\end{pmatrix} \ne \begin{pmatrix}0 \\ 0\end{pmatrix},\\
0, &&\text{if} \begin{pmatrix}x_1 \\ x_2\end{pmatrix} = \begin{pmatrix}0 \\ 0\end{pmatrix}.
\end{aligned}
\end{dcases}
$$

今度は放物線に沿って原点に収束する点列を考える。これもプロットから思いつく。
例 b と似たような計算で、$f\begin{pmatrix} 1/k \\ 1/k^2\end{pmatrix} \to 1/2 \ne 0 = f\begin{pmatrix} 0 \\ 0\end{pmatrix}.$
ゆえに $f$ は原点において連続ではない。

以上
