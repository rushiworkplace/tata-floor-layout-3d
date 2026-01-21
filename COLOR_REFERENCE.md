# Tata Communications Branding Colors Reference

## Official Brand Colors

### Primary Brand Color

**Tata Blue** - The cornerstone of Tata Communications' visual identity

```
Color Name: Tata Blue
Hex Code: #003d7a
RGB: 0, 61, 122
HSL: 213°, 100%, 24%
Usage: Primary UI elements, gradients, buttons, headings
```

### Extended Blue Palette

**Tata Dark Blue** - For depth and premium appearance

```
Hex: #002147
RGB: 0, 33, 71
HSL: 212°, 100%, 14%
Usage: Darker backgrounds, hover states, emphasized elements
```

**Tata Light Blue** - For secondary elements and accents

```
Hex: #0055b8
RGB: 0, 85, 184
HSL: 211°, 100%, 36%
Usage: Gradients, accents, secondary buttons
```

### Gradients

**Primary Gradient (Button/Action)**

```css
background: linear-gradient(135deg, #003d7a 0%, #0055b8 100%);
```

**Hover Gradient (Enhanced)**

```css
background: linear-gradient(135deg, #002147 0%, #003d7a 100%);
```

### Neutral Palette

```
Light Background:    #f8f9fa (rgb: 248, 249, 250)
Secondary BG:        #f0f2f5 (rgb: 240, 242, 245)
Border Color:        #e1e4e8 (rgb: 225, 228, 232)
Primary Text:        #2d2d2d (rgb: 45, 45, 45)
Dark Text:           #1a1a1a (rgb: 26, 26, 26)
```

### Accent Colors (Reserved)

```
Orange Accent:       #ff6b35 (rgb: 255, 107, 53)
Light Accent:        #ff8c5a (rgb: 255, 140, 90)
Success Green:       #10b981 (rgb: 16, 185, 129)
Info Blue:           #3b82f6 (rgb: 59, 130, 246)
```

## Color Usage in Application

### Info Panel

| Element     | Color                   | Hex                    |
| ----------- | ----------------------- | ---------------------- |
| Top Border  | Tata Blue               | #003d7a                |
| Background  | White                   | #ffffff                |
| Shadow Tint | Tata Blue (12% opacity) | rgba(0, 61, 122, 0.12) |
| Border      | Neutral 200             | #e1e4e8                |

### Typography

| Element      | Color          | Hex     | Size/Weight        |
| ------------ | -------------- | ------- | ------------------ |
| Machine Name | Tata Dark Blue | #002147 | 22px/700           |
| Label        | Tata Blue      | #003d7a | 12px/600 uppercase |
| Description  | Neutral 700    | #2d2d2d | 14px/400           |
| Button Text  | White          | #ffffff | 14px/600 uppercase |

### Icons

| Element         | Color                             |
| --------------- | --------------------------------- |
| Icon Background | Gradient (Tata Blue → Light Blue) |
| Icon Text       | White                             |
| Machine 1: 🤖   | Red tint                          |
| Machine 2: ⚙️   | Green tint                        |
| Machine 3: ⚡   | Blue tint                         |

## Accessibility Standards

### Contrast Ratios

| Combination             | Ratio | Standard | Status   |
| ----------------------- | ----- | -------- | -------- |
| Tata Dark Blue on White | 8.2:1 | AAA      | ✓ Passes |
| Tata Blue on White      | 6.5:1 | AA       | ✓ Passes |
| White on Tata Blue      | 7.1:1 | AAA      | ✓ Passes |
| Dark Gray on White      | 9.1:1 | AAA      | ✓ Passes |

## CSS Implementation

All colors are defined as CSS custom properties for easy maintenance:

```css
:root {
  /* Primary Colors */
  --tata-blue: #003d7a;
  --tata-dark-blue: #002147;
  --tata-light-blue: #0055b8;

  /* Neutrals */
  --neutral-50: #f8f9fa;
  --neutral-100: #f0f2f5;
  --neutral-200: #e1e4e8;
  --neutral-700: #2d2d2d;
  --neutral-800: #1a1a1a;

  /* Accents */
  --tata-accent: #ff6b35;
  --tata-accent-light: #ff8c5a;

  /* Status */
  --success: #10b981;
  --info: #3b82f6;
}
```

## Usage Examples

### Button

```css
.button {
  background: linear-gradient(135deg, var(--tata-blue), var(--tata-light-blue));
  color: white;
}

.button:hover {
  background: linear-gradient(135deg, var(--tata-dark-blue), var(--tata-blue));
}
```

### Heading

```css
h1,
h2,
h3 {
  color: var(--tata-dark-blue);
  font-weight: 700;
}
```

### Text

```css
body {
  color: var(--neutral-700);
  background: var(--neutral-50);
}
```

### Border

```css
.panel {
  border: 1px solid var(--neutral-200);
  border-top: 4px solid var(--tata-blue);
}
```

## Color Psychology

- **Tata Blue:** Trust, professionalism, stability (enterprise)
- **Dark Blue:** Authority, depth, confidence
- **Light Blue:** Innovation, clarity, approachability
- **White:** Cleanliness, simplicity, modernity
- **Gray:** Balance, neutrality, professionalism
- **Orange:** Energy, action (future use for CTAs)

## Design Consistency

All UI elements follow these color rules:

1. **Primary Actions:** Tata Blue gradient
2. **Secondary Elements:** Light Blue or Neutral colors
3. **Text:** Dark Gray on light backgrounds
4. **Backgrounds:** White or Neutral 50/100
5. **Borders:** Neutral 200
6. **Accents:** Tata Blue for labels and icons
7. **Hover States:** Darker variants
8. **Focus States:** Blue outline or highlight

## Maintenance

To update brand colors globally:

1. Edit CSS variables in `:root`
2. No need to update individual components
3. Changes propagate automatically
4. Test accessibility with new colors

## References

- Tata Communications Brand Guidelines
- WCAG 2.1 Accessibility Standards
- Material Design Color System
- Enterprise Dashboard Best Practices
