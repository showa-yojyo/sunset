---
title: Functional Analysis - Part 5 - Cauchy sequences and complete metric spaces
---

[Functional Analysis - Part 5 - Cauchy sequences and complete metric spaces - YouTube](https://www.youtube.com/watch?v=kdKYV0B145k&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=5)

${X = (0, 3)}$ は 距離 ${d(x, y) = \lvert x - y \rvert}$ に関して閉集合か？

次の事実から閉集合だと言える：

* ${X^c = \varnothing}$ は開集合か。Yes.
* 収束列 $(x_n) \subset X$ を勝手に取ると、極限を $\tilde x$ として
  $\tilde x \in X$ であるか：

  点列 $(1/n)$ を考える。

  * これは $X$ に含まれる
  * ${d(x_n, x_m) \to 0.}$
  * しかし ${\tilde x = 0 \notin X.}$
  
  収束しない。

## Cauchy sequences

定義：
$(X, d)$ を距離空間とする。点列 ${(x_n)\subset X}$ が Cauchy 列であるとは、次を満たすときをいう：

$$
\forall \varepsilon \gt 0\;
\exists N \in \mathbb N\;
\forall n \ge N \forall m \ge N:
d(x_n, x_m) \lt \varepsilon.
$$

定義：
$(X, d)$ が **完備** であるとは、この空間のどんな Cauchy 列でも収束する（極限が存在して $X$ の点である）ことだ。

例
$\text{(a)}$ ${X = [0, 3]}$ は距離 ${d(x, y) = \lvert x - y \rvert}$ に関して完備。

例
$\text{(b)}$ ${X = (0, 3)}$ は離散距離：

$$
d = \begin{cases}
    1, & x \ne y,\\
    0, & x = y
\end{cases}
$$

に関して完備：

$(X, d)$ の Cauchy 列を一つ取り、それを $(x_n)$ とする。
Cauchy 列であるので：

$$
\exists N \in \mathbb N\;
\forall n \ge N \forall m \ge N:
d(x_n, x_m) \lt \frac{1}{2}.
$$

${d(x_n, x_m) \lt \dfrac{1}{2} }$ かつ ${d(x_n, x_m) \in \{0, 1\}}$ が必要であることから
${d(x_n, x_m) = 0.}$ したがって ${x_n = x_m.}$ 
${d(x_n, x_N) = 0 \iff x_n = x_N \in X}$ より $(x_n)$ は収束する。ゆえに ${(X, d)}$ は完備。

以上
