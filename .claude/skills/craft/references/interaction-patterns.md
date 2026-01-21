# Interaction Patterns Reference

Practical patterns for micro-interactions, feedback, gestures, and physics-based UI.

---

## Feedback Patterns

### Visual Feedback Hierarchy

| User Action | Immediate (0-100ms) | Completion (100-500ms) |
|-------------|---------------------|------------------------|
| Tap/Click | Scale 0.97, slight darken | Return to normal |
| Hover | Lift, shadow, highlight | - |
| Focus | Ring/outline | - |
| Drag start | Scale 1.02, lift shadow | - |
| Drag end | Settle animation | Snap or return |
| Submit | Loading spinner | Success/Error state |
| Toggle | Thumb moves | Track color change |

### Button States

```css
.button {
  --button-bg: #333;
  --button-bg-hover: #444;
  --button-bg-active: #222;

  background: var(--button-bg);
  transition: all 0.15s ease-out;
}

/* Hover - slight lift */
.button:hover {
  background: var(--button-bg-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Active/Pressed - compress */
.button:active {
  background: var(--button-bg-active);
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Focus - visible ring */
.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* Disabled - muted */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

### Input Field States

```css
.input {
  border: 2px solid #e2e8f0;
  transition: border-color 0.15s ease-out,
              box-shadow 0.15s ease-out;
}

.input:hover {
  border-color: #cbd5e0;
}

.input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
}

.input--error {
  border-color: #fc8181;
  background: #fff5f5;
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(252, 129, 129, 0.15);
}

.input--success {
  border-color: #68d391;
  background: #f0fff4;
}
```

### Toggle Switch

```css
.toggle {
  width: 48px;
  height: 28px;
  background: #e2e8f0;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease-out;
}

.toggle::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toggle[aria-checked="true"] {
  background: #48bb78;
}

.toggle[aria-checked="true"]::after {
  transform: translateX(20px);
}

/* Active state - squish */
.toggle:active::after {
  width: 28px;
}
```

---

## Micro-Interactions

### Checkbox Animation

```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  position: relative;
  transition: all 0.15s ease-out;
}

.checkbox[aria-checked="true"] {
  background: #4299e1;
  border-color: #4299e1;
}

.checkbox::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 10px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  top: 2px;
  left: 5px;
  transform: rotate(45deg) scale(0);
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.checkbox[aria-checked="true"]::after {
  transform: rotate(45deg) scale(1);
}
```

### Like/Heart Animation

```css
.heart {
  cursor: pointer;
  transition: transform 0.1s ease-out;
}

.heart:active {
  transform: scale(0.9);
}

.heart.liked {
  animation: heart-pop 0.4s ease-out;
}

@keyframes heart-pop {
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* Optional: particle burst on like */
.heart.liked::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, #ff6b6b 20%, transparent 20%);
  background-size: 10px 10px;
  animation: particles 0.4s ease-out forwards;
  pointer-events: none;
}

@keyframes particles {
  to {
    transform: scale(2);
    opacity: 0;
  }
}
```

### Copy Button Feedback

```jsx
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      <span className={`icon ${copied ? 'fade-out' : ''}`}>
        <ClipboardIcon />
      </span>
      <span className={`icon check ${copied ? 'fade-in' : ''}`}>
        <CheckIcon />
      </span>
    </button>
  );
}
```

```css
.copy-button {
  position: relative;
  overflow: hidden;
}

.copy-button .icon {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.copy-button .icon.fade-out {
  opacity: 0;
  transform: scale(0.8);
}

.copy-button .check {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
}

.copy-button .check.fade-in {
  opacity: 1;
  transform: scale(1);
}
```

---

## Gesture Interactions

### Swipe to Delete

```jsx
function SwipeToDelete({ children, onDelete }) {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0],
    ['#ff6b6b', 'transparent']
  );

  return (
    <motion.div style={{ background, position: 'relative' }}>
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        style={{ x }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) {
            onDelete();
          }
        }}
      >
        {children}
      </motion.div>
      <div className="delete-indicator">
        <TrashIcon />
      </div>
    </motion.div>
  );
}
```

### Pull to Refresh

```jsx
function PullToRefresh({ onRefresh, children }) {
  const y = useMotionValue(0);
  const [refreshing, setRefreshing] = useState(false);

  const spinnerOpacity = useTransform(y, [0, 60], [0, 1]);
  const spinnerScale = useTransform(y, [0, 60], [0.5, 1]);

  const handleDragEnd = async (_, info) => {
    if (info.offset.y > 60 && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  return (
    <div className="ptr-container">
      <motion.div
        className="ptr-spinner"
        style={{
          opacity: spinnerOpacity,
          scale: spinnerScale,
        }}
      >
        <Spinner animate={refreshing} />
      </motion.div>

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.5, bottom: 0 }}
        style={{ y }}
        onDragEnd={handleDragEnd}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

### Pinch to Zoom

```jsx
function PinchZoom({ children }) {
  const scale = useMotionValue(1);
  const [isPinching, setIsPinching] = useState(false);

  return (
    <motion.div
      style={{ scale }}
      onPointerDown={() => setIsPinching(true)}
      onPointerUp={() => {
        setIsPinching(false);
        // Animate back if scale is < 1
        if (scale.get() < 1) {
          animate(scale, 1, { type: 'spring', stiffness: 300 });
        }
      }}
      whileTap={{ scale: isPinching ? undefined : 0.98 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Physics Patterns

### Momentum Scrolling

```javascript
class MomentumScroll {
  constructor(element) {
    this.el = element;
    this.velocity = 0;
    this.position = 0;
    this.friction = 0.95;
    this.lastY = 0;
    this.isDragging = false;

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    this.el.addEventListener('pointerdown', this.onStart.bind(this));
    window.addEventListener('pointermove', this.onMove.bind(this));
    window.addEventListener('pointerup', this.onEnd.bind(this));
  }

  onStart(e) {
    this.isDragging = true;
    this.lastY = e.clientY;
    this.velocity = 0;
  }

  onMove(e) {
    if (!this.isDragging) return;

    const deltaY = e.clientY - this.lastY;
    this.velocity = deltaY;
    this.position += deltaY;
    this.lastY = e.clientY;

    this.el.style.transform = `translateY(${this.position}px)`;
  }

  onEnd() {
    this.isDragging = false;
  }

  animate() {
    if (!this.isDragging && Math.abs(this.velocity) > 0.1) {
      this.velocity *= this.friction;
      this.position += this.velocity;

      // Bounds checking with rubber band
      const maxScroll = this.el.scrollHeight - this.el.clientHeight;
      if (this.position > 0) {
        this.position *= 0.5; // Rubber band resistance
        this.velocity = 0;
      } else if (this.position < -maxScroll) {
        this.position = -maxScroll + (this.position + maxScroll) * 0.5;
        this.velocity = 0;
      }

      this.el.style.transform = `translateY(${this.position}px)`;
    }

    requestAnimationFrame(() => this.animate());
  }
}
```

### Magnetic Snap Points

```javascript
function magneticSnap(position, snapPoints, threshold = 50) {
  for (const point of snapPoints) {
    if (Math.abs(position - point) < threshold) {
      return point;
    }
  }
  return position;
}

// Usage in drag end
onDragEnd={(_, info) => {
  const snapPoints = [0, 100, 200, 300];
  const targetPosition = magneticSnap(
    currentPosition + info.velocity.x * 0.2,
    snapPoints
  );
  animateTo(targetPosition);
}}
```

### Spring-Back Bounds

```javascript
function clampWithRubberBand(value, min, max, elasticity = 0.5) {
  if (value < min) {
    const overscroll = min - value;
    return min - overscroll * elasticity;
  }
  if (value > max) {
    const overscroll = value - max;
    return max + overscroll * elasticity;
  }
  return value;
}
```

---

## Scroll-Linked Interactions

### Progress Indicator

```jsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="progress-bar"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
      }}
    />
  );
}
```

### Parallax Elements

```jsx
function ParallaxSection({ children, offset = 50 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```

### Fade-In on Scroll

```jsx
function FadeInOnScroll({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Loading States

### Skeleton Screens

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-text:last-child {
  width: 60%;
}
```

### Optimistic Updates

```jsx
function LikeButton({ postId, initialLiked }) {
  const [liked, setLiked] = useState(initialLiked);
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    // Optimistic update
    setLiked(!liked);
    setPending(true);

    try {
      await api.toggleLike(postId);
    } catch (error) {
      // Revert on failure
      setLiked(liked);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={liked ? 'liked' : ''}
    >
      <HeartIcon filled={liked} />
    </button>
  );
}
```

### Progressive Loading

```jsx
function ProgressiveImage({ src, placeholder }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="progressive-image">
      <img
        src={placeholder}
        className={`placeholder ${loaded ? 'fade-out' : ''}`}
        alt=""
      />
      <img
        src={src}
        className={`full ${loaded ? 'fade-in' : ''}`}
        onLoad={() => setLoaded(true)}
        alt=""
      />
    </div>
  );
}
```

```css
.progressive-image {
  position: relative;
}

.progressive-image .placeholder {
  filter: blur(10px);
  transform: scale(1.05);
  transition: opacity 0.3s ease-out;
}

.progressive-image .placeholder.fade-out {
  opacity: 0;
}

.progressive-image .full {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.progressive-image .full.fade-in {
  opacity: 1;
}
```

---

## Sound Feedback (Optional Enhancement)

```javascript
// Preload sounds
const sounds = {
  click: new Audio('/sounds/click.mp3'),
  success: new Audio('/sounds/success.mp3'),
  error: new Audio('/sounds/error.mp3'),
};

// Set volume low - sound should be subtle
Object.values(sounds).forEach(s => s.volume = 0.3);

function playSound(name) {
  // Respect user preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sound = sounds[name];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {}); // Ignore autoplay errors
  }
}

// Usage
<button onClick={() => {
  playSound('click');
  handleAction();
}}>
  Click me
</button>
```

---

## Accessibility Considerations

### Respect Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Focus Management

```jsx
function Modal({ isOpen, onClose, children }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button ref={closeButtonRef} onClick={onClose}>
            Close
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Touch Target Sizes

```css
/* Minimum 44x44px touch targets */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* If icon is smaller, expand clickable area */
.icon-button {
  padding: 12px;
  margin: -12px;
}
```
