---
title: Functional Analysis - Part 4 - Sequences, limits and closed sets
---

[Functional Analysis - Part 4 - Sequences, limits and closed sets - YouTube](https://www.youtube.com/watch?v=2BpD3RX5EIE&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=4)

距離空間 $(X, d)$ の **点列** を次の記号のどれかで表す：

$$
(x_1, x_2, x_3, \dotsc),\quad
(x_n)_{n \in \mathbb N},\quad
x \colon \mathbb N \longrightarrow X,\quad
n \longmapsto x_n.
$$

## 収束

$(X, d)$ の点列 $(x_n)$ が収束するとは、次を満たすことをいう：

$$
\exists \tilde x \in X\;
\forall \varepsilon \gt 0\;
\exists N \in \mathbb N\;
\forall n \ge N:
d(x_n, \tilde x) \lt \varepsilon.
$$

これを

$$
x_n \to \tilde x\;(n \to \infty)
$$

や

$$
\lim_{n \to \infty}x_n = \tilde x
$$

のように表す。

命題：
$A \subset X$ が閉集合であることと、次は同値：
$A$ のどの収束列 $(a_n)$ に対しても、極限が $A$ の点である。

証明：

$\impliedby:$ 対偶を示す。$A$ が閉集合でないと仮定すると、$A^c = X \setminus A$ は開集合でない。

したがって

$$
\exists \tilde x \in A^c \;
\forall \varepsilon \gt 0:
B_{\varepsilon}(\tilde x) \cap A \ne \varnothing.
$$

（※この式は開集合の定義を否定した形になっていることに注意）
このとき次を満たすように点列 $(a_n)$ を取れる：

$$
a_n \in B_{1/n}(\tilde x) \cap A.
$$

すなわち

$$
\lim_{n\to\infty}a_n = \tilde x \notin A.
$$

これにより、$A$ に属さない点に収束する点列 $(a_n)$ が存在することが示された。

$\implies:$ こちらも対偶を示す。
極限 $\tilde x \in X$ が $A$ に存在しないような収束列 $(a_n) \subset A$ が存在すると仮定する：
$\tilde x \in A^c = X \setminus A.$

このとき、極限の定義から（※開球内に $(a_n) \subset A$ の無限個の番号の点を含むことにより）：

$$
\forall \varepsilon \gt 0\;
B_{\varepsilon}(\tilde x) \cap A \ne \varnothing.
$$

（※必要条件の証明時と同じ注意により）$A^c$ は開集合でない。
閉集合の定義により $A$ は閉集合ではない。

以上
