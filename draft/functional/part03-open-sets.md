---
title: Functional Analysis - Part 3 - Open and closed sets
---

[Functional Analysis - Part 3 - Open and closed sets - YouTube](https://www.youtube.com/watch?v=RYtE09eHeqI&list=PLBh2i93oe2qsGKDOsuVVw-OCAfprrnGfr&index=3)

## Notions

距離空間 $(X, d)$ の点 $x$ に関する **開球** を考える：

$$
B_{\varepsilon}(x) \coloneqq \{y \in X \;|\; d(x, y) \lt \varepsilon\}.
$$

$A \subset X$ とする。

$\text{(1)}$ **開集合**。
$A$ が開集合であるとは、次が成り立つことをいう：

$$
\forall x \in A \exists \varepsilon \gt 0: B_{\varepsilon}(x) \subset A.
$$

$(2)$ **境界点**。
$x \in X$ が $A$ に対する境界点であるとは、

$$
\exists \varepsilon \gt 0:\left(
B_{\varepsilon}(x) \cap A \ne \varnothing
\land
B_{\varepsilon}(x) \cap A^c \ne \varnothing
\right).
$$

集合 $A$ の **境界** を記号 $\partial A$ で表す：

$$
\partial A \coloneqq \{x \in X\,|\, \text{$x$ is boundary point for $A$}\}.
$$

注意：$A$ が開集合であることと $A \cap \partial A = \varnothing$ であることは同値。

$(3)$ **閉集合**。
開集合の補集合として表現される集合を閉集合という。

注意：$A$ が閉集合であることと $A \cup \partial A = A$ であることは同値。

$(4)$ **閉包**。集合とその境界との和集合で定義する。

$$
\overline{A} \coloneqq A \cup \partial A.
$$

閉包はつねに閉集合である。

## Examples

$X \subset \mathbb R$ を次で定義する：

$$
X \coloneqq (1, 3] \cup (4, \infty),\;d(x, y) \coloneqq \lvert x - y \rvert.
$$

$X$ の左部分を $A$ とおく。これは開集合だろうか。${x \in A}$ に対して、

$\text{(i)}$ ${x \ne 3}$ ならば

$$
\varepsilon \coloneqq \frac{1}{2}\min\{\lvert 1 - x \rvert, \lvert 3 - x \rvert \}
$$

とおくと、$B_{\varepsilon}(x) \subset A.$

$\text{(ii)}$ ${x = 3}$ ならば（これは注意すること）

$$
B_1(x) = (2, 3] \subset A.
$$

ゆえに $A$ は $X$ の開集合である。

では $A$ は閉集合だろうか。答えは Yes.

----

$C \coloneqq (1, 2]$ を考える。前例と同じ距離を入れる。$\partial C = \{2\}.$
ゆえに $\overline{C} = C.$ $C$ は $X$ の閉集合だ。

以上
