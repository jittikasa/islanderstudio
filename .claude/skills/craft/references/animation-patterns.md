# Animation Patterns Reference

Practical code patterns for implementing polished animations.

---

## CSS Custom Properties Setup

```css
:root {
  /* Timing */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;

  /* Easing - Productive (UI interactions) */
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-in: cubic-bezier(0.55, 0, 1, 0.45);

  /* Easing - Expressive (emphasis, delight) */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-back: cubic-bezier(0.68, -0.6, 0.32, 1.6);

  /* Spring-like (for CSS approximation) */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## Button Interactions

### Basic Press Effect
```css
.button {
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Loading State
```css
.button--loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.button--loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Success Flash
```css
@keyframes success-flash {
  0% { background-color: var(--color-primary); }
  50% { background-color: var(--color-success); }
  100% { background-color: var(--color-primary); }
}

.button--success {
  animation: success-flash 0.6s var(--ease-out);
}
```

---

## List & Grid Animations

### Staggered Entrance
```css
.list-item {
  opacity: 0;
  transform: translateY(20px);
}

.list-item.visible {
  animation: fade-in-up var(--duration-normal) var(--ease-out) forwards;
}

/* Generate delays for first 10 items */
.list-item:nth-child(1).visible { animation-delay: 0ms; }
.list-item:nth-child(2).visible { animation-delay: 40ms; }
.list-item:nth-child(3).visible { animation-delay: 80ms; }
.list-item:nth-child(4).visible { animation-delay: 120ms; }
.list-item:nth-child(5).visible { animation-delay: 160ms; }
.list-item:nth-child(6).visible { animation-delay: 200ms; }
.list-item:nth-child(7).visible { animation-delay: 240ms; }
.list-item:nth-child(8).visible { animation-delay: 280ms; }
.list-item:nth-child(9).visible { animation-delay: 320ms; }
.list-item:nth-child(10).visible { animation-delay: 360ms; }

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Grid Cascade (2D stagger)
```css
/* For a 3-column grid */
.grid-item {
  opacity: 0;
  transform: scale(0.9);
  animation: pop-in var(--duration-normal) var(--ease-out-back) forwards;
}

/* Row 1 */
.grid-item:nth-child(1) { animation-delay: 0ms; }
.grid-item:nth-child(2) { animation-delay: 50ms; }
.grid-item:nth-child(3) { animation-delay: 100ms; }
/* Row 2 */
.grid-item:nth-child(4) { animation-delay: 50ms; }
.grid-item:nth-child(5) { animation-delay: 100ms; }
.grid-item:nth-child(6) { animation-delay: 150ms; }
/* Row 3 */
.grid-item:nth-child(7) { animation-delay: 100ms; }
.grid-item:nth-child(8) { animation-delay: 150ms; }
.grid-item:nth-child(9) { animation-delay: 200ms; }

@keyframes pop-in {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## Modal & Overlay Animations

### Modal Entrance
```css
.modal-overlay {
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.modal-overlay.open {
  opacity: 1;
}

.modal-content {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
  transition: opacity var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out);
}

.modal-overlay.open .modal-content {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition-delay: 50ms; /* Content follows overlay */
}
```

### Drawer Slide
```css
.drawer {
  transform: translateX(100%);
  transition: transform var(--duration-slow) var(--ease-out);
}

.drawer.open {
  transform: translateX(0);
}

/* Left drawer variant */
.drawer--left {
  transform: translateX(-100%);
}

.drawer--left.open {
  transform: translateX(0);
}
```

---

## Framer Motion (React)

### Spring Configurations
```jsx
// Common spring presets
const springs = {
  // Snappy - buttons, toggles
  snappy: { type: "spring", stiffness: 400, damping: 30 },

  // Responsive - cards, modals
  responsive: { type: "spring", stiffness: 300, damping: 25 },

  // Soft - drag interactions, following cursor
  soft: { type: "spring", stiffness: 200, damping: 20 },

  // Bouncy - success states, playful elements
  bouncy: { type: "spring", stiffness: 400, damping: 15 },

  // Gentle - large page elements
  gentle: { type: "spring", stiffness: 120, damping: 20 },
};
```

### Animated Button
```jsx
import { motion } from "framer-motion";

function Button({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
```

### Staggered List
```jsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
};

function AnimatedList({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show">
      {items.map((item, i) => (
        <motion.li key={i} variants={item}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Page Transitions
```jsx
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1] // ease-out
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.55, 0, 1, 0.45] // ease-in
    }
  },
};

function PageWrapper({ children, key }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Layout Animations
```jsx
import { motion, LayoutGroup } from "framer-motion";

function ExpandableCards({ items }) {
  const [selected, setSelected] = useState(null);

  return (
    <LayoutGroup>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          layoutId={item.id}
          onClick={() => setSelected(selected === item.id ? null : item.id)}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            height: selected === item.id ? "auto" : 100,
            overflow: "hidden",
          }}
        >
          <motion.h3 layout="position">{item.title}</motion.h3>
          {selected === item.id && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {item.content}
            </motion.p>
          )}
        </motion.div>
      ))}
    </LayoutGroup>
  );
}
```

### Gesture Animations
```jsx
import { motion, useMotionValue, useTransform } from "framer-motion";

function DraggableCard() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      style={{ x, rotate, opacity }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          // Handle swipe action
        }
      }}
    >
      Drag me
    </motion.div>
  );
}
```

---

## Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```jsx
// React hook
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);

    const handler = (e) => setPrefersReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

// Usage
function AnimatedComponent() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring" }}
    />
  );
}
```

---

## Performance Tips

1. **Prefer `transform` and `opacity`** - These properties are GPU-accelerated
2. **Avoid animating `width`, `height`, `top`, `left`** - These trigger layout recalculation
3. **Use `will-change` sparingly** - Only for elements that will definitely animate
4. **Clean up animation listeners** - Especially for scroll-linked animations
5. **Debounce resize handlers** - Don't recalculate on every pixel change

```css
/* Hint to browser that element will animate */
.will-animate {
  will-change: transform, opacity;
}

/* Remove hint after animation */
.animation-complete {
  will-change: auto;
}
```
