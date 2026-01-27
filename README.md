# Kraken - Video Production & Photography Website

A modern, responsive React website for a video production and photography company.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Sections**: Hero, Services, Portfolio, About, Contact, and Footer
- **Animations**: Smooth scroll animations and hover effects
- **Professional Color Palette**: Dark theme with blue accent colors

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Customization

### Colors

Update the CSS variables in `src/index.css`:

```css
:root {
  --primary-dark: #0A0A0A;
  --accent-blue: #0066FF;
  --accent-cyan: #00D4FF;
  /* ... */
}
```

### Logo

Replace the text logo in `src/components/Header.jsx` with your actual logo image.

### Content

Update the content in each component file to match your brand and services.

## Technologies Used

- React 18
- Vite
- CSS3 (with CSS Variables)

## License

All rights reserved.
