# Branding Guidelines Notes

## Fonts Detected in PDF

Based on the PDF structure, the following fonts were identified:
- **Integral CF** (FONTSPRINGDEMO-IntegralCFRegular) - Display font
- **DIN Next LT W23 Bold** - Sans-serif font
- **Hanson Bold** - Bold display font

## Current Implementation

The website currently uses **Inter** as a web-safe alternative. To implement the exact brand fonts:

1. **Integral CF**: Purchase/license from Fontspring or use a similar geometric sans-serif
2. **DIN Next LT W23**: Available from Linotype/Monotype, or use a similar DIN-style font
3. **Hanson Bold**: Available from various font foundries, or use a similar bold display font

### Font Implementation Steps

1. Add font files to `public/fonts/` directory
2. Update `index.html` to include font-face declarations
3. Update CSS variables in `src/index.css`:
   ```css
   --font-display: 'Integral CF', sans-serif;
   --font-body: 'DIN Next LT W23', sans-serif;
   --font-bold: 'Hanson Bold', sans-serif;
   ```

## Colors

**Brand Color Palette (from PDF):**

**PRIMARY COLORS:**
- **Cinnabar**: #ED301C (vibrant orange-red) - Used as primary accent
- **Dark cyan**: #00969C (deep teal/blue-green) - Used as secondary accent
- **Cornsilk**: #F9F0D1 (light creamy yellow) - Available for highlights
- **White**: #FFFFFF - Primary text color

**SECONDARY COLORS:**
- **Black**: #000000 - Primary background

All colors are now implemented in `src/index.css` using CSS variables.

## Logo

Currently using a text-based logo. To add your actual logo:

1. Place logo files in `public/logo/` directory
2. Update `src/components/Header.jsx`:
   ```jsx
   <img src="/logo/kraken-logo.svg" alt="Kraken Logo" className="logo-image" />
   ```

## Next Steps

1. Extract exact color palette from PDF
2. Obtain/implement brand fonts
3. Add actual logo files
4. Update content to match brand voice
5. Add actual portfolio images
