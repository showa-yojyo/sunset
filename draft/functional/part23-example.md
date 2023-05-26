---
title: Functional Analysis - Part 23 - Dual space - Example
---

[Functional Analysis - Part 23 - Dual space - Example - YouTube](https://www.youtube.com/watch?v=0PSmFT-z7IY&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=23)

## 復習

$p \ge 1$ のとき

$$
\begin{aligned}
l^p(\mathbb N, \mathbb F) &\coloneqq
\!\left\{\left.
    (x_n)_{n \in \mathbb N} \subset \mathbb F
    \,\right|\left.\,
    \sum_{n = 1}^\infty \lvert x_n \rvert^p \lt \infty
\right.\right\}\!,
\\
\lVert (x_n) \rVert &\coloneqq \left(\sum_{n=1}^\infty \lvert x_n \rvert^p \right)^{\frac{1}{p}}.
\end{aligned}
$$

双対空間：
ノルム空間 $X$ に対応して

$$
X^\prime \coloneqq \!\left\{\left.
    l \colon X \longrightarrow \mathbb F
    \,\right|\left.\,
    \text{l is linear and bound}
\right.\right\}\!.
$$

## 本編

例：
${X = l^p(\mathbb N),}\;{p \gt 1.}$
${X^\prime \cong l^{p\prime}(\mathbb N).}$

* ここで $p^\prime$ は Hölder 共役とする：
  ${\dfrac{1}{p} + \dfrac{1}{p^\prime} = 1.}$
* 記号 $\cong$ は距離同型写像（等長写像）の存在を表す。

同型写像を定義したい：

$$
\begin{aligned}
T \colon l^{p^\prime}(\mathbb N) \longrightarrow \left(l^p(\mathbb N)\right)^\prime.
\end{aligned}
$$

スカラー列 ${x \in l^{p^\prime}(\mathbb N)}$ と ${y \in l^p(\mathbb N)}$ に対して：

$$
(Tx)(y) \coloneqq \sum_{k=1}^{\infty}x_k \cdot y_k,\quad\text{($\spades$1)}
$$

つまり

$$
x \longmapsto \left\langle \overline{x},\cdot \right\rangle_{l^2(\mathbb N)}.
$$

とする。この $T$ が同型写像であることを主張するには以下を示す必要がある：

$\text{(1)}$ $T$ が well-defined である（写像として成立している）

$\text{(2)}$ $T$ が線形写像である

$\text{(3)}$ $T$ が有界作用素である

$\text{(4)}$ $T$ が全射である（単射であることを示すのは次の性質から来るので分離した）

$\text{(5)}$ $T$ の等長性：
${\forall x\left(\lVert Tx \rVert = \lVert X \rVert\right)}$
（※ (5) に単射性が含まれる）

証明：
$\text{(1)}$ Hölder の不等式から従う：

$$
\begin{aligned}
\lvert (Tx)(y) \rvert
&\le \lim_{n \to \infty}\sum_{k=1}^{n}\lvert y_k x_k \rvert\\
&\le \lVert y\rVert_p \lVert x\rVert_{p^\prime} & \text{(by Hölder)}\\
&\lt \infty.
\end{aligned}
$$

したがって ${\forall x \in l^{p^\prime}(\mathbb N)}$ に対して
$Tx$ は線形かつ有界作用素であることが示された。

$\text{(2)}$ 内積の性質から線形性があることが言える。

$\text{(3)}$ 作用素ノルムを定義に従って評価すると：

$$
\def\pp{p^{\prime} }
\def\lpn{l^p(\mathbb N) \to \mathbb F}
\begin{aligned}
\lVert Tx \rVert_{\lpn}
&= \sup\!\left\{\left. \lvert (Tx)(y) \rvert \,\right|\,\left. \lVert y\rVert_p = 1 \right.\right\}\\
&\le \lVert x\rVert_{\pp}. & \text{($\spades$2)}
\end{aligned}
$$

ここで不等式は $\text{(1)}$ で得た
${\lvert(Tx)(y)\rvert \le \lVert y\rVert_p \lVert x\rVert_{p^\prime} }$
から成り立つ。
ゆえに ${\lVert T \rVert \le 1.}$ 有界作用素であることが示された。

$\text{(4)}$ ここが難しい。
${y^\prime \in\left(l^p(\mathbb N)^\prime\right)}$ を一つ取る。
逆像が空集合でないことを示したい。
単位ベクトル $e_k$ を、$k$ 番目の項だけが 1 で他は全部 0 である点列とする：

$$
e_k \coloneqq (0, 0, \dotsc, 0, 1, 0, \dotsc).
$$

さらに次を定義する：

$$
\mathbb F \ni x_k \coloneqq y^\prime(e_k),
\quad
x \coloneqq (x_k)_{k \in \mathbb N}.
$$

※ $x$ が $T$ による $y^\prime$ の逆像候補であることを念頭に置く。

本当に ${x\in l^{p^\prime}(\mathbb F)}$ であり ${Tx = y^\prime}$ であるか？

次の数 $t_k$ を導入する：

$$
t_k \coloneqq
\begin{cases}
\dfrac{\lvert x_k \rvert^{p^\prime} }{x_k}, & x_k \ne 0,\\
0, & x_k = 0.
\end{cases}
$$

部分和を見てみる：

$$
\def\lpn{l^p(\mathbb N) \to \mathbb F}
\begin{aligned}
\sum_{k=1}^{n}\lvert x_k \rvert^{p^\prime}
&= \sum_{k=1}^{n} x_k t_k\\
&= \sum_{k=1}^{n}t_k y^\prime(e_k)\\
&= y^\prime\!\left(\sum_{k=1}^{n}t_k e_k\right)\\
&\le \lVert y^\prime\rVert_{\lpn} \left\lVert \sum_{k=1}^{n}t_k e_k\right\rVert_p.
\end{aligned}
$$

（※最後の不等式は $\text{(1)}$ から来るのか Hölder 不等式からなのか？）

ここで

$$
\def\pp{p^{\prime} }
\begin{aligned}
\left\lVert \sum_{k=1}^{n}t_k e_k\right\rVert_p
&= \left(\sum_{k=1}^{n}\lvert t_k \rvert^p \right)^{\frac{1}{p}},\\
\lvert t_k \rvert^p
&= \left(\frac{\lvert x_k \rvert^{\pp} }{\lvert x_k \rvert }\right)^p\\
&= \lvert x_k \rvert^{(\pp - 1)p}\\
&= \lvert x_k \rvert^{\pp}.
\end{aligned}
$$

したがって

$$
\def\pp{p^{\prime} }
\def\lpn{l^p(\mathbb N) \to \mathbb F}
\begin{aligned}
\sum_{k=1}^{n}\lvert x_k \rvert^{p^\prime}
\le \lVert y^\prime\rVert_{\lpn} \left(\sum_{k=1}^{n} \lvert x_k \rvert^{\pp} \right)^{\frac{1}{p} }
\end{aligned}
$$

不等式の両辺から共通因子を除いて極限を取ると

$$
\def\lpn#1{l^{#1}(\mathbb N)}
\begin{aligned}
\lVert x\rVert_{p^\prime} &\le \lVert y^\prime\rVert_{\lpn{p}\to\mathbb F}. & \text{($\spades$3)}
\\
\therefore x &\in \lpn{p^\prime}.
\end{aligned}
$$

次に ${Tx = y^\prime}$ であることを示す。
${\forall y \in l^p(\mathbb N)}$ に対して

$$
\begin{aligned}
(Tx - y^\prime)(y)
&= (Tx - y^\prime)\left(\lim_{n \to \infty}\sum_{k=1}^{n}y_k e_k\right)\\
&= \lim_{n \to \infty}(Tx - y^\prime)\left(\sum_{k=1}^{n}y_k e_k\right)
    & \because \text{continuity}\\
&= \lim_{n \to \infty}\sum_{k=1}^{n}y_k(Tx - y^\prime)(e_k)
    & \because \text{linearity}\\
&= 0. & \because \text{($\spades$1)}\\
\therefore Tx &= y^\prime & \text{($\spades$4)}
\end{aligned}
$$

$\text{(5)}$ 等長性を示す（同時に単射性も示される）。

$$
\def\lpn{l^p(\mathbb N)\to\mathbb F}
\begin{aligned}
\lVert Tx\rVert_{\lpn}
& \le \lVert x \rVert_{p^\prime} & \because \text{($\spades$2)}\\
& \le \lVert y^\prime\rVert_{\lpn} & \because \text{($\spades$3)}\\
&= \lVert Tx\rVert_{\lpn} & \because \text{($\spades$4)}\\
\therefore \lVert Tx\rVert_{\lpn} &= \lVert x \rVert_{p^\prime}.
\end{aligned}
$$

以上
