# Shellist Website Style Blueprint

## Typography System

### Banner Section (Hero)

#### Heading (H2)
**Base:** 36px | Line-height: 1.3 | Font: Lora (serif) | Weight: 400 | Margin-bottom: 20px

**Responsive Scale:**
- **Mobile (≤575px):** 32px
- **Small (≥576px):** 36px
- **Medium (≥768px):** 36px (unchanged)
- **Large (≥992px):** 44px
- **XL (≥1200px):** 52px
- **XXL (≥1440px):** 60px
- **XXXL (≥1920px):** 72px

#### Paragraph
**Base:** 16px | Line-height: 1.6 | Weight: 400 | Color: #555

**Responsive Scale:**
- **Mobile (≤575px):** 15px
- **Small (≥576px):** 16px
- **Medium (≥768px):** 16px (unchanged)
- **Large (≥992px):** 17px
- **XL (≥1200px):** 18px
- **XXL (≥1440px):** 19px
- **XXXL (≥1920px):** 20px

---

## Layout System

### Banner Layout (Desktop ≥1200px)

```
┌────────────────────────────────────────────────────────┐
│ ←80px→ ←50px→                             ←80px→      │
│ margin padding                             margin      │
│                                                         │
│           ┌─────────────┬─────────────────┐           │
│           │   35%       │      65%        │           │
│           │   TEXT      │     IMAGE       │           │
│           │             │                 │           │
│           └─────────────┴─────────────────┘           │
│                                                         │
└────────────────────────────────────────────────────────┘
```

**Margins:**
- Left: 80px
- Right: 80px
- Bottom: 75px

**Padding:**
- Left: 50px (additional inner spacing)
- Right: 0

**Columns:**
- Text Column: 35% width
- Image Column: 65% width

---

## Image Sizing Guidelines

### Banner Image (Screens-2)
**Current Dimensions:** 2000 × 1695 pixels
**Aspect Ratio:** 1.179:1 (slightly wider than tall)
**File Size:** 2.3MB
**Display:**
- Width: auto
- Height: auto
- Object-fit: contain
- Object-position: center center
- No forced height constraints

---

## Section Blueprint for Other Areas

### Section Heading System
Use this hierarchy for consistency across all sections:

#### Section Main Heading (H3)
```css
font-size: 50px;           /* Base desktop */
font-family: 'Lora', serif;
font-weight: 400;
line-height: 1.3;
margin-bottom: 25px;

/* Responsive */
@media (max-width: 991px) { font-size: 35px; }
@media (max-width: 767px) { font-size: 30px; }
@media (min-width: 1200px) { font-size: 70px; }
```

#### Section Subheading
```css
font-size: 20px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
margin-bottom: 15px;
color: #333;
```

#### Section Paragraph
```css
font-size: 16px;
line-height: 1.7;
font-weight: 400;
color: #666;
margin-bottom: 20px;

/* Responsive */
@media (min-width: 1200px) { font-size: 18px; }
```

---

## Color Palette

### Primary Colors
- **Background Gradient:** linear-gradient(180deg, #FAF9F2 0%, #F8F9FA 50%, #DAE5EB 100%)
- **Text Primary:** #333
- **Text Secondary:** #555
- **Text Muted:** #666

### Brand Colors
- **Dark:** #333333
- **Light Background:** #FAF9F2
- **Mid Background:** #F8F9FA
- **Accent Background:** #DAE5EB

---

## Spacing System

### Section Spacing
```css
/* Mobile */
padding: 35px 0;
margin-bottom: 35px;

/* Tablet (≥768px) */
padding: 50px 0;
margin-bottom: 50px;

/* Desktop (≥1200px) */
padding: 75px 0;
margin-bottom: 75px;
```

### Container Margins (Desktop ≥1200px)
```css
margin: 0 80px 75px 80px;  /* Top Right Bottom Left */
```

---

## Component Spacing

### Element Spacing
- **Heading margin-bottom:** 20-25px
- **Paragraph margin-bottom:** 20px
- **Button margin-top:** 20px
- **Button margin-right:** 15px (if multiple)

---

## Responsive Breakpoints

```css
/* Extra Small (Mobile) */
@media (max-width: 575px) { }

/* Small (Landscape Mobile/Tablet Portrait) */
@media (min-width: 576px) { }

/* Medium (Tablet) */
@media (min-width: 768px) { }

/* Large (Desktop) */
@media (min-width: 992px) { }

/* Extra Large (Large Desktop) */
@media (min-width: 1200px) { }

/* XXL (Very Large Desktop) */
@media (min-width: 1440px) { }

/* XXXL (Ultra Wide) */
@media (min-width: 1920px) { }
```

---

## Best Practices

### Typography
1. Use Lora (serif) for headings to convey elegance
2. Maintain consistent line-height (1.3 for headings, 1.6-1.7 for body)
3. Scale font sizes proportionally across breakpoints
4. Keep paragraph text readable (16px minimum)

### Layout
1. Always provide consistent margins (80px) on large screens
2. Use flexible column widths (percentages) for responsiveness
3. Remove forced height constraints - let content determine size
4. Center content vertically when appropriate

### Images
1. Optimize file sizes (aim for < 3MB)
2. Use appropriate dimensions (2000px max width for hero images)
3. Use object-fit: contain to preserve aspect ratio
4. Position images with object-position for control

### Spacing
1. Increase spacing progressively with screen size
2. Use consistent bottom margins for sections
3. Add breathing room with padding
4. Don't force minimum heights unless necessary

---

## Example: Applying Blueprint to New Section

```html
<div class="new-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h3 class="section-heading">Section Title</h3>
                <p class="section-subheading">Subheading Text</p>
                <p class="section-text">Body paragraph content goes here...</p>
            </div>
        </div>
    </div>
</div>
```

```css
/* Base Styles */
.new-section {
    padding: 50px 0;
    background: #F8F9FA;
}

.section-heading {
    font-family: 'Lora', serif;
    font-size: 50px;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 25px;
    color: #333;
}

.section-subheading {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
    color: #555;
}

.section-text {
    font-size: 16px;
    line-height: 1.7;
    color: #666;
    margin-bottom: 20px;
}

/* Responsive */
@media (min-width: 1200px) {
    .new-section {
        padding: 75px 0;
        margin: 0 80px;
    }

    .section-heading {
        font-size: 70px;
    }

    .section-text {
        font-size: 18px;
    }
}

@media (max-width: 767px) {
    .section-heading {
        font-size: 30px;
    }
}
```

---

## Version History
- **v1.0** (2025-11-12): Initial style blueprint created based on banner section improvements
