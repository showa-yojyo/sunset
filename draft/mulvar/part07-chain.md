---
title: Multivariable Calculus - Part 7 - Chain, Sum and Factor rule
---

[Multivariable Calculus - Part 7 - Chain, Sum and Factor rule - YouTube](https://www.youtube.com/watch?v=7x_vw0Kw_zE&list=PLBh2i93oe2qv4G2AyarkbR3OKBml0hXEg&index=7)

## The Sum Rule

${f \colon \mathbb R^n \longrightarrow \mathbb R^m}$ および
${g \colon \mathbb R^n \longrightarrow \mathbb R^m}$ が
$\tilde x \in \mathbb R^n$ において全微分可能であるとする。このとき、

(a) $f + g$ もまた $\tilde x \in \mathbb R^m$ において全微分可能であり、

$$
\mathrm{d}(f + g)_{\tilde x} = \mathrm{d}(f)_{\tilde x} = \mathrm{d}(g)_{\tilde x}
\quad\text{ a.k.a. }\quad
J_{f + g}(\tilde x) = J_f(\tilde x) + J_g(\tilde x).
$$

(b) $\forall \lambda \in \mathbb R$ に対して $\lambda f$ も全微分可能であり、

$$
\mathrm{d}(\lambda f)_{\tilde x} = \lambda \mathrm{d}(f)_{\tilde x}
\quad\text{ a.k.a. }\quad
J_{\lambda f}(\tilde x) = \lambda J_f(\tilde x).
$$

全微分が線形写像だからこれらの性質は当然だ。

## Chain rule

まず一変数関数の chain rule を確認する。

${n = m = 1}$ ならば：

$$
(f \circ g)^{\prime}(\tilde x) = f^{\prime}(g(\tilde x)) \cdot g^{\prime}(\tilde x).
$$

----

一変数関数の合成関数の微分の理解があやふやだったことを痛感した。
具体的には、どこに「鎖」が現れるのかをわかっていなかった。

$$
g(\tilde x + h) = g(\tilde x) + g^{\prime}(\tilde x) \cdot h + \Delta_g(h),
\quad\text{where}\quad \lim_{h \to 0}\frac{\Delta_g(h)}{h} = 0.
$$

同時に $\Delta_g(h) \to 0 \: (h \to 0)$ にも注意しておく。

$$
\begin{aligned}
(f\circ g)(\tilde x + h)
&= f(g(\tilde x + h))\\
&= f(g(\tilde x) + g^{\prime}(\tilde x) \cdot h + \Delta_g(h)).
\end{aligned}
$$

$h_1 \coloneqq g^{\prime}(\tilde x) \cdot h + \Delta_g(h)$ とすると、
$h_1 \to \Delta_g(h) \to 0\: (h \to 0).$

$$
\begin{aligned}
(f\circ g)(\tilde x + h)
&= f(g(\tilde x) + h_1)\\
&= f(g(\tilde x)) + f^{\prime}(g(\tilde x)) \cdot h_1 + \Delta_{f}(h_1)\\
&= f(g(\tilde x)) + f^{\prime}(g(\tilde x)) \cdot (g^{\prime}(\tilde x) \cdot h + \Delta_g(h)) + \Delta_{f}(h_1)\\
&= f(g(\tilde x)) + f^{\prime}(g(\tilde x)) \cdot g^{\prime}(\tilde x) \cdot h
 + f^{\prime}(g(\tilde x)) \cdot \Delta_g(h) + \Delta_{f}(h_1).
\end{aligned}
$$

${\Delta_{f \circ g}(h) \coloneqq f^{\prime}(g(\tilde x)) \cdot \Delta_g(h) + \Delta_{f}(h_1)}$ とおく。
次の等式中の極限操作中に現れる「鎖」が本質的なのだと思う。

$$
\begin{aligned}
\lim_{h \to 0}\frac{\Delta_{f\circ g}(h)}{h}
&= \lim_{h \to 0}\frac{f^{\prime}(g(\tilde x)) \cdot \Delta_g(h) + \Delta_{f}(h_1)}{h}\\
&= \lim_{h \to 0}f^{\prime}(g(\tilde x)) \cdot \frac{\Delta_g(h)}{h}
 + \lim_{h \to 0}\frac{\Delta_{f}(h_1)}{h}\\
&= f^{\prime}(g(\tilde x)) \cdot 0
 + \lim_{h \to 0}\frac{\Delta_{f}(h_1)}{h_1}
 \cdot \frac{h_1}{h}\\
&= 0 \cdot \lim_{h \to 0}\left(g^\prime(x) + \frac{\Delta_g(h)}{h}\right)\\
&= 0 \cdot \lim_{h \to 0}\left(g^\prime(x) + 0\right)\\
&= 0.
\end{aligned}
$$

以上より、

$$
(f \circ g)(\tilde x + h) = f(g(\tilde x)) + f^{\prime}(g(\tilde x))g^{\prime}(\tilde x) \cdot h + \Delta_{f \circ g}(h)
$$

において $h \to 0$ のとき $\Delta_{f \circ g}(h) \to 0$ であり、右辺第二項の $h$ に対する係数が
$f \circ g$ の $\tilde x$ における微分係数に等しいことが示された：

$$
(f \circ g)^\prime(\tilde x) = f^{\prime}(g(\tilde x))g^{\prime}(\tilde x).
$$

----

次に
${g \colon \mathbb R^k \longrightarrow \mathbb R^n}$,
${f \colon \mathbb R^n \longrightarrow \mathbb R^m}$ とする。
$g$ と $f$ それぞれが点 $\tilde x$ と $g(\tilde x)$ でそれぞれ全微分可能ならば：

$$
\mathrm{d}(f\circ g)_{\tilde x} = \mathrm{d}f_{g(\tilde x)} \mathrm{d}g_{\tilde x}.
\quad\text{ a.k.a. }\quad
J_{f \circ g}(\tilde x) = J_f(g(\tilde x))J_g(\tilde x).
$$

行列の積に注意。

証明は一変数のときと同じ要領で示せる。ただしゼロへの極限評価時に全微分の線形性を活用することに注意。
まず $\forall h \in \mathbb R^k$ に対して

$$
g(\tilde x + h) = g(\tilde x) + \mathrm{d}g_{\tilde x}(h) + \phi_g(h).
$$

ここで $\phi_g\colon\mathbb{R}^k \longrightarrow \mathbb{R}^n$ は $\dfrac{\phi_g(h)}{\lVert h \rVert} \to 0 \; (h \to 0)$ を満たす。
同時に $\lVert \phi_g(h) \rVert \to 0 \: (h \to 0)$ についても注意する。

次に、

$$
\begin{aligned}
(f \circ g)(\tilde x + h)
&= f(g(\tilde x + h))\\
&= f(g(\tilde x) + \mathrm{d}g_{\tilde x}(h) + \phi_g(h)).
\end{aligned}
$$

${h_1 \coloneqq \mathrm{d}g_{\tilde x}(h) + \phi_g(h)}$ とおく。例によって $h \to 0$ のとき
$\lVert h_1 \rVert \to \lVert \phi_g(0) \rVert \to 0$ に注意する。

$$
\begin{aligned}
(f \circ g)(\tilde x + h)
&= f(g(\tilde x) + h_1).\\
f(g(\tilde x) + h_1)
&= f(g(\tilde x)) + \mathrm{d}f_{g(\tilde x)}(h_1) + \phi_f(h_1)\\
&= f(g(\tilde x)) + \mathrm{d}f_{g(\tilde x)}(\mathrm{d}g_{\tilde x}(h) + \phi_g(h)) + \phi_f(h_1)\\
&= f(g(\tilde x)) + \mathrm{d}f_{g(\tilde x)}(\mathrm{d}g_{\tilde x}(h))
 + \mathrm{d}f_{g(\tilde x)}(\phi_g(h)) + \phi_f(h_1).
\end{aligned}
$$

ただし、$\phi_f\colon\mathbb{R}^n \longrightarrow \mathbb{R}^m$ は $\dfrac{\phi_f(h_1)}{\lVert h_1 \rVert} \to 0 \; (h_1 \to 0).$ を満たす。

あとは

$$
\begin{aligned}
\phi_{f \circ g}(h) & \coloneqq \mathrm{d}f_{g(\tilde x)}(\phi_g(h)) + \phi_f(h_1)\\
&= \mathrm{d}f_{g(\tilde x)}(\phi_g(h)) + \phi_f(\mathrm{d}g_{\tilde x}(h) + \phi_g(h))
\end{aligned}
$$

が $\dfrac{\phi_{f \circ g}(h)}{\lVert h \rVert} \to 0 \; (h \to 0)$ を満たすことを示せばいい。
一変数版の式変形を真似しながら。

$$
\begin{aligned}
\lim_{h \to 0}\frac{\phi_{f \circ g}(h)}{\lVert h \rVert}
&= \lim_{h \to 0}\frac{\mathrm{d}f_{g(\tilde x)}(\phi_g(h)) + \phi_f(h_1)}{\lVert h \rVert}\\
&= \lim_{h \to 0} \mathrm{d}f_{g(\tilde x)} \frac{\phi_g(h)}{\lVert h \rVert}
 + \lim_{h \to 0} \frac{\phi_f(h_1)}{\lVert h \rVert}\\
&= 0 + \lim_{h \to 0} \frac{\phi_f(h_1)}{\lVert h_1 \rVert} \lim_{h \to 0} \frac{\lVert h_1 \rVert}{\lVert h \rVert}\\
&= 0 \cdot \lim_{h \to 0} \frac{\lVert \phi_g(h) \rVert}{\lVert h \rVert}\\
&= 0.
\end{aligned}
$$

以上より、

$$
(f \circ g)(\tilde x + h)
= f(g(\tilde x)) + \mathrm{d}f_{g(\tilde x)}(\mathrm{d}g_{\tilde x}(h))
 + \phi_{f \circ g}(h)
$$

において $h \to 0$ のとき $\dfrac{\phi_{f \circ g}(h)}{\lVert h \rVert} \to 0$ であり、右辺第二項の $h$ に対する
線形写像が $f \circ g$ の $\tilde x$ における全微分に等しいことが示された：

$$
\mathrm{d}(f \circ g)_{\tilde x} = \mathrm{d}f_{g(\tilde x)} \mathrm{d}g_{\tilde x}.
$$

以上
