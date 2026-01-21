# Visual Hierarchy & Design Guidelines

## Information Architecture

The UI follows a clear visual hierarchy that guides user attention:

```
┌─────────────────────────────────────┐
│  LEVEL 1: PRIMARY (Icon + Machine)  │  ← User attention starts here
│  🤖  Assembly Robot                 │
├─────────────────────────────────────┤
│  LEVEL 2: SECONDARY (Label)         │
│  MACHINE DETAILS                    │
│  ───────────────────────────────────│
│  LEVEL 3: CONTENT (Description)     │  ← Main information
│  Advanced robotic assembly system   │
│  for precision manufacturing...     │
├─────────────────────────────────────┤
│  LEVEL 4: ACTION (Button)           │  ← Call-to-action
│  ← BACK TO FLOOR VIEW               │
└─────────────────────────────────────┘
```

## Visual Weight & Emphasis

### Size Hierarchy

```
Machine Name:        22px  (Primary)    ■■■■■
Label:               12px  (Tertiary)   ■
Description:         14px  (Secondary)  ■■
Button Text:         14px  (Secondary)  ■■
```

### Color Hierarchy

```
Tata Dark Blue:      #002147  (Darkest - Headings)
Tata Blue:           #003d7a  (Dark - Labels, Icons)
Dark Gray:           #2d2d2d  (Medium - Body text)
White:               #ffffff  (Lightest - Backgrounds)
```

### Weight Hierarchy

```
Machine Name:  700  (Bold - Maximum emphasis)
Label:         600  (Semibold - Important)
Button:        600  (Semibold - Action)
Body:          400  (Regular - Content)
```

## Spacing Principles

### Consistent Spacing Scale

```
Base Unit: 4px

Spacing Values:
- xs: 4px   (small gaps)
- sm: 8px   (button margins)
- md: 16px  (internal padding)
- lg: 20px  (section padding)
- xl: 24px  (content padding)
- 2xl: 28px (panel padding)
- 3xl: 32px (large gaps)
- 4xl: 40px (screen edges)
```

### Panel Layout

```
Panel Container
├─ Padding: 28px (all sides)
├─ Header Section
│  ├─ Gap: 12px (icon to heading)
│  └─ Padding-bottom: 16px
│     (separator line)
├─ Content Section
│  ├─ Gap: 20px (between elements)
│  └─ Line-height: 1.7 (body text)
└─ Action Section
   └─ Margin-top: 8px (button)
```

## Font Scale

```
Size    | Weight | Use Case          | Line Height
--------|--------|-------------------|------------------
12px    | 600    | Labels, meta      | 1.4 (16.8px)
14px    | 400    | Body text         | 1.7 (23.8px)
14px    | 600    | Buttons           | 1.4 (19.6px)
22px    | 700    | Main heading      | 1.3 (28.6px)
```

## Color Contrast Matrix

```
           White   Tata     Dark     Light
           #fff    Blue     Gray     Gray

Dark Text  ∞       8.2:1    9.1:1    1.2:1
Tata Blue  7.1:1   ∞        1.6:1    6.5:1
Dark Gray  12.6:1  1.6:1    ∞        1.3:1
```

All main combinations meet or exceed AA accessibility standards (4.5:1 ratio).

## Component Measurements

### Info Panel

```
Desktop Width:    380px (max)
Mobile Width:     100% - 40px margins
Tablet Width:     100% - 40px margins
Height:           Auto (content-based)
Border-radius:    12px
Shadow Depth:     20px horizontal blur
```

### Button

```
Height:           44px (touch-friendly)
Padding:          12px 20px
Border-radius:    8px
Width:            Auto (content-based)
Min-width:        120px
Max-width:        100% (mobile)
```

### Icons

```
Width:            40px
Height:           40px
Border-radius:    8px
Font-size:        18px
Alignment:        center
```

## Interactive States

### Hover State

- **Transform:** translateY(-3px)
- **Shadow:** Enhanced by 4px depth
- **Color:** Darker gradient
- **Duration:** 0.3s cubic-bezier
- **Cursor:** pointer

### Active State

- **Transform:** translateY(-1px)
- **Shadow:** Medium depth
- **Color:** Same as hover
- **Duration:** Immediate
- **Feedback:** Tactile response

### Focus State (Keyboard)

- **Outline:** 2px solid Tata Blue
- **Outline-offset:** 2px
- **Color:** Same as hover
- **Visible:** Always visible for accessibility

## Animation Specifications

### Entrance Animation (Panel)

```
Property:        Transform, Opacity
Duration:        500ms
Start:           translateY(30px), opacity 0
End:             translateY(0), opacity 1
Easing:          cubic-bezier(0.34, 1.56, 0.64, 1)
Effect:          Smooth bounce-up
```

### Button Interaction

```
Property:        Transform, Box-shadow
Duration:        300ms
Easing:          cubic-bezier(0.34, 1.56, 0.64, 1)
Hover:           translateY(-3px), enhanced shadow
Active:          translateY(-1px), medium shadow
```

## Responsive Breakpoints

### Mobile (< 480px)

- **Panel Padding:** 20px (vs 28px)
- **Heading Size:** 18px (vs 22px)
- **Body Size:** 13px (vs 14px)
- **Button Width:** 100%
- **Border-radius:** 8px (vs 12px)
- **Margins:** 16px (vs 30px)

### Tablet (480px - 768px)

- **Panel Width:** 100% - 40px margins
- **Heading Size:** 20px
- **Body Size:** 14px
- **Button Width:** Auto
- **Margins:** 20px

### Desktop (> 768px)

- **Panel Width:** 380px max
- **Heading Size:** 22px
- **Body Size:** 14px
- **Button Width:** Auto
- **Margins:** 30px

## Depth & Shadows

### Shadow Layers

**Level 1 - Minimal (Borders)**

```css
border: 1px solid #e1e4e8;
```

**Level 2 - Subtle (Hover)**

```css
box-shadow: 0 4px 12px rgba(0, 61, 122, 0.2);
```

**Level 3 - Medium (Panels)**

```css
box-shadow:
  0 20px 40px rgba(0, 61, 122, 0.12),
  0 8px 16px rgba(0, 0, 0, 0.08);
```

**Level 4 - Strong (Modals)**

```css
box-shadow:
  0 25px 50px rgba(0, 61, 122, 0.15),
  0 12px 24px rgba(0, 0, 0, 0.1);
```

All shadows use Tata Blue tint for brand cohesion.

## Typography Rules

1. **Headings:** Always Tata Dark Blue, bold/semibold
2. **Labels:** Uppercase, letter-spaced, Tata Blue
3. **Body:** Dark Gray, 1.7 line-height, max 75ch width
4. **Buttons:** Uppercase, letter-spaced, white text
5. **Emphasis:** Use weight, not color alone

## Accessibility Considerations

✓ **Color Not Only Cue:** Icons and structure provide meaning
✓ **Font Minimum:** 14px (12px only for labels)
✓ **Line Height:** 1.7 for body (readability)
✓ **Contrast:** All text meets AA standards
✓ **Focus Visible:** Clear keyboard navigation
✓ **Reduced Motion:** Can be added (prefers-reduced-motion)

## Best Practices Applied

1. **Progressive Disclosure:** Icon → Title → Details
2. **F-Pattern:** Left to right, top to bottom
3. **Chunking:** Information grouped logically
4. **White Space:** Generous margins improve readability
5. **Consistent Patterns:** Recurring style across elements
6. **Gestalt Principles:** Similar elements grouped together

## Design System Extensibility

To add new components, follow these patterns:

```css
/* New Component */
.new-component {
  /* Spacing */
  padding: [xs|sm|md|lg|xl|2xl] /* Base 4px scale */

  /* Colors */
  background: var(--neutral-50|100);
  color: var(--neutral-700|800);
  border: 1px solid var(--neutral-200);

  /* Typography */
  font-size: 14px|16px|18px|22px;
  font-weight: 400|600|700;
  letter-spacing: 0|0.5px;

  /* Shape */
  border-radius: 6px|8px|12px;

  /* Elevation */
  box-shadow: /* Use shadow levels */;

  /* Animation */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

This ensures consistency with the design system while allowing growth.
