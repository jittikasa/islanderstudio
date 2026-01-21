# SVG Techniques Reference

Practical patterns for SVG animation and effects.

---

## SVG Fundamentals

### Viewport and ViewBox
```svg
<svg width="200" height="200" viewBox="0 0 100 100">
  <!-- Content drawn in 100x100 coordinate space -->
  <!-- Displayed at 200x200 pixels (2x scale) -->
</svg>
```

- `width`/`height`: Display size in pixels
- `viewBox`: Internal coordinate system (min-x, min-y, width, height)

### Common Elements
```svg
<!-- Rectangle -->
<rect x="10" y="10" width="80" height="40" rx="8" />

<!-- Circle -->
<circle cx="50" cy="50" r="40" />

<!-- Ellipse -->
<ellipse cx="50" cy="50" rx="40" ry="20" />

<!-- Line -->
<line x1="10" y1="10" x2="90" y2="90" stroke="black" />

<!-- Polyline (open) -->
<polyline points="10,10 50,50 90,10" fill="none" stroke="black" />

<!-- Polygon (closed) -->
<polygon points="50,10 90,90 10,90" />

<!-- Path (most flexible) -->
<path d="M10 10 L90 10 L90 90 L10 90 Z" />
```

### Path Commands
```
M x y     - Move to (start new subpath)
L x y     - Line to
H x       - Horizontal line to
V y       - Vertical line to
C x1 y1 x2 y2 x y - Cubic bezier curve
S x2 y2 x y - Smooth cubic bezier
Q x1 y1 x y - Quadratic bezier
T x y     - Smooth quadratic bezier
A rx ry rotation large-arc sweep x y - Arc
Z         - Close path

Lowercase = relative coordinates
Uppercase = absolute coordinates
```

---

## Path Animations

### Line Drawing Effect

The classic "drawing" effect using stroke-dasharray:

```svg
<svg viewBox="0 0 100 100">
  <path
    class="draw-path"
    d="M10 50 Q50 10 90 50 Q50 90 10 50"
    fill="none"
    stroke="#333"
    stroke-width="2"
  />
</svg>

<style>
  .draw-path {
    stroke-dasharray: 200; /* >= path length */
    stroke-dashoffset: 200;
    animation: draw 1.5s ease-out forwards;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
```

### Getting Exact Path Length

```javascript
// In browser console or script
const path = document.querySelector('.draw-path');
console.log(path.getTotalLength()); // e.g., 186.32

// Then use this value for dasharray
```

### Multiple Paths with Stagger

```svg
<svg viewBox="0 0 100 100">
  <path class="line line-1" d="M10 30 L90 30" />
  <path class="line line-2" d="M10 50 L90 50" />
  <path class="line line-3" d="M10 70 L90 70" />
</svg>

<style>
  .line {
    fill: none;
    stroke: #333;
    stroke-width: 2;
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
    animation: draw 0.5s ease-out forwards;
  }

  .line-1 { animation-delay: 0s; }
  .line-2 { animation-delay: 0.15s; }
  .line-3 { animation-delay: 0.3s; }

  @keyframes draw {
    to { stroke-dashoffset: 0; }
  }
</style>
```

### Reverse Drawing (Erase)

```css
.erase-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 0;
  animation: erase 1s ease-in forwards;
}

@keyframes erase {
  to {
    stroke-dashoffset: 200;
  }
}
```

---

## Transform Animations

### Fix Transform Origin

SVG transforms default to top-left origin. Fix with:

```css
.svg-element {
  transform-box: fill-box; /* Use element's bounding box */
  transform-origin: center center;
}
```

### Rotation

```css
.rotate {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Scale Pulse

```css
.pulse {
  transform-box: fill-box;
  transform-origin: center;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

### Bounce

```css
.bounce {
  transform-box: fill-box;
  transform-origin: center bottom;
  animation: bounce 0.6s ease-out;
}

@keyframes bounce {
  0% { transform: scaleY(0.5) scaleX(1.2); }
  40% { transform: scaleY(1.2) scaleX(0.9); }
  60% { transform: scaleY(0.95) scaleX(1.02); }
  80% { transform: scaleY(1.02) scaleX(0.99); }
  100% { transform: scaleY(1) scaleX(1); }
}
```

---

## SMIL Animations

Use SMIL for attributes CSS can't animate (like `d`, `points`, `viewBox`).

### Animate Attribute

```svg
<circle cx="50" cy="50" r="10">
  <animate
    attributeName="r"
    values="10; 40; 10"
    dur="2s"
    repeatCount="indefinite"
  />
</circle>
```

### Animate Motion Along Path

```svg
<svg viewBox="0 0 200 100">
  <path id="motion-path" d="M20 50 Q100 0 180 50 Q100 100 20 50" fill="none" stroke="#ddd" />

  <circle r="5" fill="#333">
    <animateMotion dur="3s" repeatCount="indefinite">
      <mpath href="#motion-path" />
    </animateMotion>
  </circle>
</svg>
```

### Path Morphing with SMIL

Both paths must have the same number and type of commands:

```svg
<path fill="#333">
  <animate
    attributeName="d"
    dur="1s"
    repeatCount="indefinite"
    values="
      M20 50 L50 20 L80 50 L50 80 Z;
      M20 20 L80 20 L80 80 L20 80 Z;
      M20 50 L50 20 L80 50 L50 80 Z
    "
  />
</path>
```

### Animate on Hover (begin on event)

```svg
<rect x="10" y="10" width="80" height="80" fill="#333">
  <animate
    attributeName="rx"
    from="0"
    to="40"
    dur="0.3s"
    begin="mouseover"
    fill="freeze"
  />
  <animate
    attributeName="rx"
    from="40"
    to="0"
    dur="0.3s"
    begin="mouseout"
    fill="freeze"
  />
</rect>
```

---

## Gradients

### Linear Gradient

```svg
<defs>
  <linearGradient id="linear-grad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#ff6b6b" />
    <stop offset="50%" stop-color="#feca57" />
    <stop offset="100%" stop-color="#48dbfb" />
  </linearGradient>
</defs>

<rect fill="url(#linear-grad)" width="100" height="100" />
```

### Radial Gradient

```svg
<defs>
  <radialGradient id="radial-grad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff" />
    <stop offset="100%" stop-color="#333" />
  </radialGradient>
</defs>

<circle fill="url(#radial-grad)" cx="50" cy="50" r="40" />
```

### Animated Gradient

```svg
<defs>
  <linearGradient id="animated-grad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#ff6b6b">
      <animate attributeName="stop-color" values="#ff6b6b; #48dbfb; #ff6b6b" dur="3s" repeatCount="indefinite" />
    </stop>
    <stop offset="100%" stop-color="#48dbfb">
      <animate attributeName="stop-color" values="#48dbfb; #ff6b6b; #48dbfb" dur="3s" repeatCount="indefinite" />
    </stop>
  </linearGradient>
</defs>
```

---

## Masks and Clipping

### Clip Path (hard edge)

```svg
<defs>
  <clipPath id="circle-clip">
    <circle cx="50" cy="50" r="40" />
  </clipPath>
</defs>

<image
  href="photo.jpg"
  width="100"
  height="100"
  clip-path="url(#circle-clip)"
/>
```

### Mask (soft edge with gradients)

```svg
<defs>
  <mask id="fade-mask">
    <linearGradient id="fade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="white" />
      <stop offset="100%" stop-color="black" />
    </linearGradient>
    <rect width="100" height="100" fill="url(#fade-grad)" />
  </mask>
</defs>

<image
  href="photo.jpg"
  width="100"
  height="100"
  mask="url(#fade-mask)"
/>
```

### Animated Reveal with Mask

```svg
<defs>
  <mask id="reveal-mask">
    <circle cx="50" cy="50" r="0" fill="white">
      <animate attributeName="r" from="0" to="70" dur="1s" fill="freeze" />
    </circle>
  </mask>
</defs>

<g mask="url(#reveal-mask)">
  <!-- Content to reveal -->
  <rect width="100" height="100" fill="#333" />
</g>
```

---

## Filters

### Drop Shadow

```svg
<defs>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3" />
  </filter>
</defs>

<rect filter="url(#shadow)" x="20" y="20" width="60" height="60" />
```

### Blur

```svg
<defs>
  <filter id="blur">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
  </filter>
</defs>

<circle filter="url(#blur)" cx="50" cy="50" r="30" />
```

### Glow Effect

```svg
<defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>

<circle filter="url(#glow)" cx="50" cy="50" r="20" fill="#48dbfb" />
```

### Noise/Grain Texture

```svg
<defs>
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
    <feComposite in="SourceGraphic" in2="noise" operator="in" />
  </filter>
</defs>
```

---

## Practical Patterns

### Animated Checkmark

```svg
<svg viewBox="0 0 52 52" class="checkmark">
  <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="#4caf50" stroke-width="2"/>
  <path class="checkmark-check" fill="none" stroke="#4caf50" stroke-width="3" d="M14 27l7 7 16-16"/>
</svg>

<style>
  .checkmark-circle {
    stroke-dasharray: 157;
    stroke-dashoffset: 157;
    animation: circle 0.6s ease-out forwards;
  }

  .checkmark-check {
    stroke-dasharray: 36;
    stroke-dashoffset: 36;
    animation: check 0.3s ease-out 0.4s forwards;
  }

  @keyframes circle {
    to { stroke-dashoffset: 0; }
  }

  @keyframes check {
    to { stroke-dashoffset: 0; }
  }
</style>
```

### Loading Spinner

```svg
<svg viewBox="0 0 50 50" class="spinner">
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="#333"
    stroke-width="4"
    stroke-linecap="round"
    stroke-dasharray="90 150"
    stroke-dashoffset="0"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="1s"
      repeatCount="indefinite"
    />
  </circle>
</svg>
```

### Animated Logo Reveal

```svg
<svg viewBox="0 0 200 50">
  <!-- Background rectangle that shrinks to reveal text -->
  <rect class="reveal-cover" x="0" y="0" width="200" height="50" fill="#fff" />

  <!-- Text underneath -->
  <text x="100" y="35" text-anchor="middle" font-size="24" font-weight="bold">
    BRAND
  </text>
</svg>

<style>
  .reveal-cover {
    animation: reveal 1s ease-out forwards;
    transform-origin: right center;
  }

  @keyframes reveal {
    to { transform: scaleX(0); }
  }
</style>
```

---

## JavaScript Integration

### Dynamic Path Length

```javascript
function animatePath(selector, duration = 1000) {
  const path = document.querySelector(selector);
  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  path.animate(
    [
      { strokeDashoffset: length },
      { strokeDashoffset: 0 }
    ],
    {
      duration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  );
}
```

### Scroll-Triggered Drawing

```javascript
function setupScrollDraw(pathSelector, triggerElement) {
  const path = document.querySelector(pathSelector);
  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        path.style.transition = 'stroke-dashoffset 1s ease-out';
        path.style.strokeDashoffset = '0';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(triggerElement));
}
```

### Mouse-Following Element

```javascript
const svg = document.querySelector('svg');
const element = document.querySelector('.follower');

svg.addEventListener('mousemove', (e) => {
  const rect = svg.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  element.setAttribute('cx', x);
  element.setAttribute('cy', y);
});
```
