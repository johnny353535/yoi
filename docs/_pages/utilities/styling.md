---
layout: base
group: utilities
title: Styling
permalink: utilities/styling
---

# Styling

<p class="hint hint--error">Documentation incomplete.</p>

## Borders

| `.b-0`   | … |
| `.b-t-0` | … |
| `.b-r-0` | … |
| `.b-b-0` | … |
| `.b-l-0` | … |
| `.b-all` | … |
| `.b-t`   | … |
| `.b-r`   | … |
| `.b-b`   | … |
| `.b-l`   | … |

```html
<!-- example:tabs -->
<div class="box w-10 h-10 bc-blue-18 p-2 m-4">x</div>
<div class="box w-10 h-10 bc-blue-18 b-0 p-2 m-4">.b-0</div>
<div class="box w-10 h-10 bc-blue-18 b-t-0 p-2 m-4">.b-t-0</div>
<div class="box w-10 h-10 bc-blue-18 b-r-0 p-2 m-4">.b-r-0</div>
<div class="box w-10 h-10 bc-blue-18 b-b-0 p-2 m-4">.b-b-0</div>
<div class="box w-10 h-10 bc-blue-18 b-l-0 p-2 m-4">.b-l-0</div>
<div class="b-t w-10 h-10 bc-blue-18 p-2 m-4">.b-t</div>
<div class="b-r w-10 h-10 bc-blue-18 p-2 m-4">.b-r</div>
<div class="b-b w-10 h-10 bc-blue-18 p-2 m-4">.b-b</div>
<div class="b-l w-10 h-10 bc-blue-18 p-2 m-4">.b-l</div>
```

## Border Style

| `.b-dashed` | … |
| `.b-dotted` | … |
| `.b-solid`  | … |

```html
<!-- example:tabs -->
<div class="b-all w-10 h-10 bc-blue-18 p-2 m-4 b-dashed">.b-dashed</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 m-4 b-dotted">.b-dotted</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 m-4 b-solid">.b-solid</div>
```

## Border Width

| `.bw-1` | … |
| `.bw-2` | … |
| `.bw-3` | … |

```html
<!-- example:tabs -->
<div class="b-all w-10 h-10 bc-blue-18 p-2 m-4 bw-1">.bw-1</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 m-4 bw-2">.bw-2</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 m-4 bw-3">.bw-3</div>
```

## Border Radius

| `.br`        | … |
| `.br-circle` | … |
| `.br-tl`     | … |
| `.br-tr`     | … |
| `.br-br`     | … |
| `.br-bl`     | … |
| `.br-0 `     | … |
| `.br-tl-0`   | … |
| `.br-tr-0`   | … |
| `.br-br-0`   | … |
| `.br-bl-0`   | … |

```html
<!-- example:tabs -->
<div class="b-all w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br">.br</div>
<div class="b-all w-10 h-10 bc-blue-18 p-4 d-inlblk m-2 br-circle">.br-circle</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-tl">.br-tl</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-tr">.br-tr</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-br">.br-br</div>
<div class="b-all w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-bl">.br-bl</div>

<div class="box w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-0">.br-0</div>
<div class="box w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-tl-0">.br-tl-0</div>
<div class="box w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-tr-0">.br-tr-0</div>
<div class="box w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-br-0">.br-br-0</div>
<div class="box w-10 h-10 bc-blue-18 p-2 d-inlblk m-2 br-bl-0">.br-bl-0</div>
```

## Box Shadow

| `.sh-1` | … |
| `.sh-2` | … |
| `.sh-3` | … |
| `.sh-4` | … |

```html
<!-- example:tabs -->
<div class="w-10 h-10 m-2 p-2 d-inlblk sh-0">.sh-0</div>
<div class="w-10 h-10 m-2 p-2 d-inlblk sh-1">.sh-1</div>
<div class="w-10 h-10 m-2 p-2 d-inlblk sh-2">.sh-2</div>
<div class="w-10 h-10 m-2 p-2 d-inlblk sh-3">.sh-3</div>
<div class="w-10 h-10 m-2 p-2 d-inlblk sh-3">.sh-3</div>
```

## Text Shadow

| `.tsh-none` | … |
| `.tsh`      | … |

```html
<!-- example:tabs -->
<span class="m-4 tsh-0">.sh-0</span>
<span class="m-4 tsh-1">.sh-1</span>
<span class="m-4 tsh-2">.sh-2</span>
<span class="m-4 tsh-3">.sh-3</span>
<span class="m-4 tsh-4">.sh-4</span>
```

## Gradient

| `.gradient-t` | … |
| `.gradient-r` | … |
| `.gradient-b` | … |
| `.gradient-l` | … |

```html
<!-- example:tabs -->
<div class="pos-rel d-inlblk w-10 h-10 m-4 p-2 gradient-t">.gradient-t</div>
<div class="pos-rel d-inlblk w-10 h-10 m-4 p-2 gradient-r">.gradient-r</div>
<div class="pos-rel d-inlblk w-10 h-10 m-4 p-2 gradient-b">.gradient-b</div>
<div class="pos-rel d-inlblk w-10 h-10 m-4 p-2 gradient-l">.gradient-l</div>
```