---
name: craft
description: >
  Create interfaces with exceptional attention to detail, refined animations, and polished interactions.
  Use this skill when building UI that needs to feel premium, implementing micro-interactions,
  animating elements, working with SVG, or when the user wants to elevate an interface from
  functional to exceptional. Invoked with /craft.
---

# Interface Craft

A skill for creating interfaces with unreasonable attention to detail. This synthesizes principles from interaction design, animation craft, SVG mastery, and the relentless pursuit of polish that separates forgettable interfaces from memorable ones.

## Philosophy: Unreasonable Consideration

The difference between good and great interfaces isn't features—it's the accumulation of countless small decisions made with care. Every transition, every hover state, every pixel of spacing is an opportunity to demonstrate craft.

**Before implementing, ask:**
- What does this interaction *feel* like? (Snappy? Smooth? Playful? Precise?)
- What feedback does the user need? (Visual? Haptic? Auditory?)
- What's the emotional response we want? (Delight? Confidence? Calm?)
- Where can we add personality without sacrificing clarity?

**Core principles:**
1. **Motion has meaning** - Animation isn't decoration; it communicates relationships, state, and hierarchy
2. **Physics builds trust** - Interfaces that obey natural laws feel more intuitive
3. **Details compound** - Individual refinements are subtle; together they're transformative
4. **Restraint is strength** - Knowing when *not* to animate is as important as knowing how

---

## Animation Craft

### The Easing vs Spring Decision

**Use easing curves when:**
- Animation has fixed duration requirements
- Movement is decorative/ambient
- Simpler mental model is preferred
- CSS-only implementation needed

**Use springs when:**
- Animation can be interrupted (user-driven)
- Physical realism matters
- Elements need to "settle" naturally
- Gesture-driven interactions

### Easing Fundamentals

Never use `linear` for UI motion. It feels robotic and unnatural.

**Common curves:**
```css
/* Ease out - most common for entrances, feels responsive */
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);

/* Ease in-out - for moving between two states */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Ease out back - slight overshoot, playful */
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Ease out expo - fast start, very smooth end */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

**Duration guidelines:**
- Micro-interactions (hover, focus): 150-200ms
- Small movements (tooltips, dropdowns): 200-300ms
- Medium transitions (modals, panels): 300-400ms
- Large/complex animations: 400-600ms
- Page transitions: 500-800ms

**Rule of thumb:** If you can notice the animation, it's probably too slow.

### Spring Physics

Springs create motion that feels alive. Key parameters:

- **Stiffness** - How quickly it moves toward target (higher = snappier)
- **Damping** - How quickly oscillation settles (higher = less bounce)
- **Mass** - Inertia of the element (higher = more momentum)

**Common spring presets:**
```javascript
// Snappy, minimal overshoot - buttons, toggles
{ stiffness: 400, damping: 30 }

// Responsive with slight bounce - cards, modals
{ stiffness: 300, damping: 25 }

// Soft and fluid - drag interactions
{ stiffness: 200, damping: 20 }

// Bouncy and playful - success states, celebrations
{ stiffness: 400, damping: 15 }
```

### Motion Choreography

Multiple elements animating together need orchestration:

1. **Stagger delays** - Elements enter sequentially, not simultaneously
   ```css
   .item:nth-child(1) { animation-delay: 0ms; }
   .item:nth-child(2) { animation-delay: 50ms; }
   .item:nth-child(3) { animation-delay: 100ms; }
   ```

2. **Lead and follow** - Primary element moves first, secondary elements react
3. **Overlapping motion** - Next animation starts before previous ends (overlap 10-30%)
4. **Spatial consistency** - Elements should enter/exit from logical directions

### Interruptible Animations

User-triggered animations must handle interruption gracefully:
- Don't restart from beginning if interrupted
- Animate from current position to new target
- Springs handle this naturally; for CSS, use `animation-fill-mode: both`

---

## Interaction Design

### Feedback Loops

Every user action deserves acknowledgment:

| Action | Immediate Feedback | Completion Feedback |
|--------|-------------------|---------------------|
| Click/tap | Scale down (95%), opacity change | Return to normal, state change |
| Hover | Subtle lift, color shift | - |
| Drag | Element follows with slight lag | Settle into position |
| Submit | Button loading state | Success/error indication |

### Physics Simulation

Make interactions feel tangible:

**Momentum and friction:**
```javascript
// After drag release, continue with decreasing velocity
velocity *= friction; // friction: 0.92-0.98
position += velocity;
```

**Rubber banding:**
```javascript
// When dragging past bounds, resistance increases
const overscroll = position - bounds;
const dampened = overscroll * 0.5; // or use logarithmic damping
```

**Magnetic snapping:**
```javascript
// Snap to nearest target when within threshold
if (Math.abs(position - snapPoint) < threshold) {
  animateTo(snapPoint);
}
```

### Ergonomic Interactions

Design for how humans actually move:

- **Touch targets**: Minimum 44x44px, ideally 48x48px
- **Gesture directions**: Vertical scrolling is easiest; diagonal gestures are hardest
- **Thumb zones**: Primary actions in easy-reach areas on mobile
- **Hover vs touch**: Never rely solely on hover for critical functionality

### State Transitions

States should flow, not jump:

```
idle → hover → active → loading → success/error → idle
```

Each transition needs its own timing and easing. Success states can be more celebratory; error states should be clear but not jarring.

---

## SVG Mastery

### When to Use SVG

**Use SVG for:**
- Icons and logos (scalability)
- Illustrations with few colors
- Animated graphics
- Charts and data visualization
- Complex shapes CSS can't create

**Use CSS/HTML for:**
- Simple shapes (circles, rectangles)
- UI elements (buttons, cards)
- When you need text selection

### Path Animation Fundamentals

The `stroke-dasharray` and `stroke-dashoffset` technique:

```css
.path {
  stroke-dasharray: 1000; /* Total path length */
  stroke-dashoffset: 1000; /* Start hidden */
  animation: draw 2s ease-out forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

**Get exact path length:**
```javascript
const path = document.querySelector('path');
const length = path.getTotalLength();
```

### SVG Transforms

SVG transforms work differently from CSS:
- Transform origin defaults to `0 0` (top-left), not center
- Use `transform-origin` or `transform-box: fill-box` to fix

```css
.svg-element {
  transform-box: fill-box;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}
```

### Morphing Shapes

For path morphing, both paths need the same number of points. Tools like Flubber or GSAP MorphSVG handle this automatically.

Simple approach with CSS (same point count):
```css
.morph {
  d: path("M10 10 L90 10 L90 90 L10 90 Z");
  transition: d 0.5s ease-out;
}

.morph:hover {
  d: path("M50 10 L90 50 L50 90 L10 50 Z");
}
```

### Gradients, Masks, and Filters

**Gradient definitions:**
```svg
<defs>
  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#ff6b6b" />
    <stop offset="100%" stop-color="#4ecdc4" />
  </linearGradient>
</defs>
<circle fill="url(#grad)" />
```

**Masks for reveal effects:**
```svg
<defs>
  <mask id="reveal">
    <rect width="100%" height="100%" fill="white" />
    <circle cx="50" cy="50" r="0" fill="black">
      <animate attributeName="r" to="100" dur="1s" fill="freeze" />
    </circle>
  </mask>
</defs>
<image mask="url(#reveal)" />
```

### SMIL vs CSS vs JavaScript

- **CSS**: Simple transforms, opacity, color changes
- **SMIL**: Attribute animations CSS can't handle (d, points, viewBox)
- **JavaScript**: Complex sequencing, interactivity, dynamic values

---

## Attention to Detail Checklist

### Visual Polish
- [ ] Consistent spacing using a scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- [ ] Proper optical alignment (not just mathematical)
- [ ] Shadows have realistic blur and spread ratios
- [ ] Colors have sufficient contrast (4.5:1 for text)
- [ ] Focus states are visible and consistent
- [ ] Loading states for all async operations

### Motion Polish
- [ ] No motion on `prefers-reduced-motion: reduce`
- [ ] Animations don't block interaction
- [ ] Exit animations are faster than entrances
- [ ] Elements don't "pop" in (always have entrance animation)
- [ ] Hover states have transitions (not instant)
- [ ] Scroll-linked animations are smooth (use `will-change` sparingly)

### Interaction Polish
- [ ] Buttons have active/pressed states
- [ ] Touch targets are large enough
- [ ] Drag operations have momentum
- [ ] Form fields have clear validation states
- [ ] Error messages are helpful, not just red
- [ ] Success feedback is satisfying

### Code Quality
- [ ] CSS custom properties for repeated values
- [ ] Animation values aren't magic numbers (document them)
- [ ] Reusable animation classes/utilities
- [ ] Performance: prefer `transform` and `opacity`
- [ ] No layout thrashing in animation loops

---

## Implementation Patterns

### CSS-Only Micro-Interactions

**Button press:**
```css
.button {
  transition: transform 0.15s var(--ease-out);
}
.button:active {
  transform: scale(0.97);
}
```

**Card hover lift:**
```css
.card {
  transition: transform 0.25s var(--ease-out),
              box-shadow 0.25s var(--ease-out);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}
```

**Staggered list entrance:**
```css
.list-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.4s var(--ease-out) forwards;
}
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
/* ... */

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### React + Framer Motion Patterns

See `references/animation-patterns.md` for comprehensive React examples with Framer Motion.

### SVG Animation Patterns

See `references/svg-techniques.md` for path animations, morphing, and effects.

### Interaction Patterns

See `references/interaction-patterns.md` for drag, gesture, and feedback patterns.

---

## Remember

**Craft is not about complexity—it's about intention.**

The goal isn't to add more animations or effects. It's to make every interaction feel considered, every transition purposeful, every detail deliberate.

Ask: "Would removing this make the experience worse?" If no, remove it. If yes, perfect it.

Great interfaces don't announce their craft. They just feel *right*.
