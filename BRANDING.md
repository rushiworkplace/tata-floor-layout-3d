# Tata Communications Branding Guide

## Color Palette

The application uses Tata Communications' official brand colors for a professional, enterprise dashboard appearance.

### Primary Colors

| Color          | Hex Value | Usage                                 | CSS Variable        |
| -------------- | --------- | ------------------------------------- | ------------------- |
| **Tata Blue**  | `#003d7a` | Primary brand color, main UI elements | `--tata-blue`       |
| **Dark Blue**  | `#002147` | Darker backgrounds, hover states      | `--tata-dark-blue`  |
| **Light Blue** | `#0055b8` | Accents, secondary elements           | `--tata-light-blue` |

### Accent & Neutral Colors

| Color             | Hex Value | Usage                      | CSS Variable          |
| ----------------- | --------- | -------------------------- | --------------------- |
| **Accent Orange** | `#ff6b35` | Call-to-action, highlights | `--tata-accent`       |
| **Light Accent**  | `#ff8c5a` | Hover states for accents   | `--tata-accent-light` |
| **Light Gray**    | `#f8f9fa` | Background, surfaces       | `--neutral-50`        |
| **Pale Gray**     | `#f0f2f5` | Secondary backgrounds      | `--neutral-100`       |
| **Border Gray**   | `#e1e4e8` | Borders, dividers          | `--neutral-200`       |
| **Dark Text**     | `#2d2d2d` | Primary text               | `--neutral-700`       |
| **Very Dark**     | `#1a1a1a` | Headings, high contrast    | `--neutral-800`       |

### Status Colors

| Color             | Hex Value | Usage                            | CSS Variable |
| ----------------- | --------- | -------------------------------- | ------------ |
| **Success Green** | `#10b981` | Success states, positive actions | `--success`  |
| **Info Blue**     | `#3b82f6` | Information, secondary actions   | `--info`     |

## Design System

### Typography

- **Font Family:** System fonts (Segoe UI, Roboto, San Francisco)
- **Headings:** Bold (700), Tata Dark Blue
- **Body:** Regular (400), Dark Gray
- **Labels:** Semi-bold (600), Tata Blue, uppercase with letter-spacing

### Components

#### Info Panel

- **Background:** Pure White with subtle shadow
- **Border Top:** 4px Tata Blue accent
- **Title:** 22px, Tata Dark Blue, bold
- **Description:** 14px, Dark Gray, line-height 1.7
- **Animation:** Smooth slide-up with cubic-bezier easing

#### Back Button

- **Background:** Gradient (Tata Blue → Light Blue)
- **Text:** White, uppercase, letter-spaced
- **Hover:** Darker gradient, elevated shadow
- **Transition:** 0.3s cubic-bezier animation

### Shadows & Depth

- **Panel Shadow:**
  - Primary: `0 20px 40px rgba(0, 61, 122, 0.12)`
  - Secondary: `0 8px 16px rgba(0, 0, 0, 0.08)`
- **Button Shadow:** `0 4px 12px rgba(0, 61, 122, 0.2)`

### Border Radius

- **Panels:** 12px
- **Buttons:** 8px
- **Icons:** 8px

### Spacing

- **Panel Padding:** 28px
- **Button Padding:** 12px 20px
- **Content Gap:** 20px
- **Margins:** 30px (desktop), 20px (tablet), 16px (mobile)

## Usage in Code

All colors are available as CSS custom properties in `src/styles.css`:

```css
:root {
  --tata-blue: #003d7a;
  --tata-dark-blue: #002147;
  --tata-light-blue: #0055b8;
  /* ... more colors ... */
}
```

Use in stylesheets:

```css
background: linear-gradient(
  135deg,
  var(--tata-blue) 0%,
  var(--tata-light-blue) 100%
);
color: var(--tata-dark-blue);
```

## Responsive Behavior

- **Desktop:** Full 380px panel width
- **Tablet:** Full width with 20px margins
- **Mobile:** Full width with 16px margins, larger touch targets

## Animation & Transitions

### Slide-in Animation

- **Duration:** 0.5s
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce effect)
- **Direction:** Up from bottom

### Button Interactions

- **Hover:** 3px elevation, darker color
- **Active:** 1px elevation
- **Transition:** 0.3s cubic-bezier

## Accessibility

- ✓ High contrast ratios (WCAG AA compliant)
- ✓ Clear focus states
- ✓ Readable font sizes (min 14px body)
- ✓ Proper semantic HTML
- ✓ Disabled state styling

## Best Practices

1. **Use CSS Variables:** Always reference colors via `var(--tata-blue)` for consistency
2. **Maintain Hierarchy:** Use Tata Blue for primary actions, Light Blue for secondary
3. **Respect Spacing:** Maintain consistent padding and gaps
4. **Support Dark Mode:** Consider future dark theme implementation
5. **Mobile First:** Design mobile experiences first, enhance for desktop

## Future Enhancements

- Dark mode theme with complementary colors
- Additional accent colors for status indicators
- Extended typography scale
- Custom icon system with Tata branding
