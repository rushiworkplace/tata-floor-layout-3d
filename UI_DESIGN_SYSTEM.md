# UI/UX Design System

## Overview

The Tata Communications Floor Layout application features a clean, enterprise-grade dashboard design with professional branding and intuitive interactions.

## Component Breakdown

### Info Panel

**Features:**

- White background with premium shadow depth
- Blue top border accent (4px)
- Animated slide-up entrance
- Responsive design (mobile, tablet, desktop)

**Structure:**

```
┌─ Panel Header (Blue Accent Top) ─────────────┐
│ ┌─ Icon ──────────────────────────────────┐  │
│ │  🤖  Assembly Robot                    │  │
│ └────────────────────────────────────────┘  │
├───────────────────────────────────────────────┤
│ MACHINE DETAILS (Label)                       │
│                                               │
│ Advanced robotic assembly system for          │
│ precision manufacturing. Equipped with        │
│ multi-axis arm and vision system.             │
│                                               │
├───────────────────────────────────────────────┤
│  ← BACK TO FLOOR VIEW  (Button)               │
└───────────────────────────────────────────────┘
```

### Machine Icons

Each machine type has a distinct emoji icon:

- **Machine 1:** 🤖 (Robot) - Assembly Robot
- **Machine 2:** ⚙️ (Gear) - CNC Lathe
- **Machine 3:** ⚡ (Lightning) - Hydraulic Press

Icons appear in a blue gradient badge in the panel header.

### Color Usage

**Gradients:**

- **Primary Gradient:** Blue (#003d7a) → Light Blue (#0055b8)
  - Used for buttons, backgrounds
  - Creates depth and visual interest

**Contrast:**

- **Headings:** Dark Blue (#002147)
- **Body Text:** Dark Gray (#2d2d2d)
- **Labels:** Tata Blue (#003d7a), uppercase
- **Background:** Light Gray (#f8f9fa)

## Interactive States

### Button States

**Normal:**

- Tata Blue gradient background
- White text, uppercase
- Shadow: 4px vertical blur
- Smooth transition effect

**Hover:**

- Darker gradient (Dark Blue → Tata Blue)
- Elevated by 3px (transform)
- Enhanced shadow (8px blur)
- Color shift and lift animation

**Active:**

- Same as hover but only 1px elevation
- Immediate visual feedback

**Disabled:**

- 60% opacity
- Cursor change to "not-allowed"

### Panel Animation

**Entrance:**

- Duration: 0.5 seconds
- Easing: Cubic-bezier bounce effect
- Direction: Slide up from bottom
- Fade in opacity simultaneously

**Exit:**

- Instant removal (no animation)
- Can be enhanced with reverse animation if needed

## Spacing & Layout

### Panel Dimensions

- **Desktop:** 380px max-width
- **Tablet:** 100% width - 40px margins
- **Mobile:** 100% width - 40px margins

### Internal Spacing

- **Outer Padding:** 28px
- **Section Gap:** 20px
- **Header Bottom Border:** 16px padding
- **Button Top Margin:** 8px

### Typography Spacing

- **Heading:** 22px font-size, 700 weight
- **Body:** 14px font-size, line-height 1.7
- **Label:** 12px uppercase, 0.5px letter-spacing
- **Button:** 14px uppercase, 0.5px letter-spacing

## Accessibility Features

✓ **Color Contrast:**

- Text on white: 8.2:1 ratio (AAA standard)
- Button text: 6.5:1 ratio (AA standard)

✓ **Font Sizing:**

- Minimum 14px for readability
- Clear hierarchy with weight changes

✓ **Interactive Elements:**

- Clear hover states
- Visible focus indicators
- Proper button semantics

✓ **Responsive:**

- Touch-friendly button sizes (min 48px)
- Readable text on mobile
- Proper viewport meta tags

## Visual Hierarchy

**Primary:** Heading + Icon → Machine Name
**Secondary:** Machine Details Description
**Tertiary:** Back Button (Low priority but high contrast)

**Size Hierarchy:**

- H2: 22px (Primary)
- Label: 12px (Secondary)
- Body: 14px (Content)
- Button: 14px (Action)

## Performance Optimizations

- **CSS Variables:** Centralized color management
- **GPU Acceleration:** Hardware-accelerated transforms
- **Efficient Animations:** Using transform and opacity
- **Minimal Shadows:** Optimized shadow calculations
- **Backdrop Filter:** Subtle blur for depth

## Responsive Breakpoints

```
Mobile:        < 480px
Tablet:        480px - 768px
Desktop:       > 768px
```

**Mobile Adjustments:**

- Border-radius: 8px (vs 12px)
- Padding: 20px (vs 28px)
- Font-size: 13px body, 18px heading
- Button: Full width

## Future Enhancements

- [ ] Dark mode theme
- [ ] Light/dark mode toggle
- [ ] Custom machine icons (SVG)
- [ ] Additional status colors
- [ ] Animation preferences (prefers-reduced-motion)
- [ ] Toast notifications for actions
- [ ] Keyboard shortcuts for navigation
- [ ] Accessibility announcements
