# Wed Filmer - Premium Wedding Photography Website

A fully responsive, premium wedding photography website built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, and React Three Fiber.

## 🎯 Features

### ✅ Complete Sections
- ✨ **Hero Section** - Immersive 3D camera scene with React Three Fiber
- 📊 **Trust Section** - Animated statistics counters
- 📖 **About Section** - Brand story with timeline
- 🎨 **Services Section** - 6 service cards with hover effects
- 🖼️ **Portfolio Section** - Masonry gallery with category filters & lightbox
- 💎 **Why Choose Us** - 6 feature highlights
- 💬 **Testimonials** - Auto-playing carousel
- 💰 **Pricing Section** - 3 package tiers
- 🔄 **Process Section** - 5-step workflow timeline
- ❓ **FAQ Section** - Accordion with 8 questions
- 📧 **Contact Section** - Form + contact details + WhatsApp
- 🦶 **Footer** - Complete with links and social media

### 🎨 Design Features
- 🌙 Dark luxury theme with gold accents
- ✨ Glassmorphism effects throughout
- 🎬 Cinematic animations with Framer Motion
- 📱 Fully responsive (320px to 1920px+)
- ♿ Accessibility compliant
- 🎯 Conversion-focused design

### 🚀 Performance Optimizations
- ⚡ Dynamic imports for 3D components
- 🖼️ Lazy loading ready
- 📦 Code splitting
- 🎯 Optimized animations
- 📊 SEO optimized with metadata

### 🔍 SEO Features
- 📄 Complete metadata
- 🌐 Open Graph tags
- 🐦 Twitter Cards
- 🗺️ Sitemap (sitemap.xml)
- 🤖 Robots.txt
- 📋 JSON-LD Structured Data

### 🎭 Animations
- **Framer Motion**: Fade-ups, stagger animations, scroll reveals
- **GSAP**: Smooth scrolling, scroll triggers
- **React Three Fiber**: 3D camera model with floating particles

## 📁 Project Structure

```
wedfilmer/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   ├── globals.css         # Global styles & theme
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # Robots configuration
├── components/
│   ├── Navbar.tsx          # Navigation with mobile drawer
│   ├── Footer.tsx          # Footer with links
│   ├── StructuredData.tsx  # JSON-LD schema
│   ├── SmoothScroll.tsx    # GSAP smooth scrolling
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   ├── three/
│   │   └── CameraScene.tsx # 3D camera model
│   └── ui/
│       ├── SectionHeading.tsx
│       ├── ScrollReveal.tsx
│       ├── GlassCard.tsx
│       └── AnimatedCounter.tsx
├── hooks/
│   ├── useScrollPosition.ts
│   └── useMediaQuery.ts
└── lib/
    └── constants.ts        # All content & configuration

```

## 🎨 Design Tokens

```css
Colors:
- Primary: #0F172A (Dark Navy)
- Secondary: #111827 (Darker Gray)
- Accent: #D4AF37 (Luxury Gold)
- Text: #F8FAFC (Off White)
- Muted: #94A3B8 (Light Gray)

Fonts:
- Heading: 'Playfair Display' (Serif)
- Body: 'Inter' (Sans-serif)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile Small**: 320px+
- **Mobile**: 375px+
- **Tablet**: 768px+
- **Laptop**: 1024px+
- **Desktop**: 1440px+
- **Large Desktop**: 1920px+

## 🎯 Key Technologies

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS with @theme
- **Framer Motion** - React animations
- **GSAP** - Advanced animations & scroll effects
- **React Three Fiber** - 3D graphics
- **Drei** - Three.js helpers
- **Lucide React** - Icon library

## 📊 Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1

## 🎨 Customization

### Update Brand Content
Edit `lib/constants.ts` to change:
- Navigation links
- Services
- Statistics
- Portfolio items
- Testimonials
- Pricing packages
- FAQ items
- Contact information

### Update Colors
Edit `app/globals.css` in the `@theme` section:
```css
@theme inline {
  --color-accent: #D4AF37;  /* Change gold color */
  --color-primary: #0F172A; /* Change background */
  /* ... other colors */
}
```

### Update Fonts
Edit `app/layout.tsx` to change Google Fonts:
```typescript
import { YourFont, AnotherFont } from "next/font/google";
```

## 📧 Contact Information

Update contact details in `lib/constants.ts`:
```typescript
export const CONTACT_INFO = {
  email: "your-email@example.com",
  phone: "+91 xxxxx xxxxx",
  whatsapp: "https://wa.me/91xxxxxxxxxx",
  address: "Your Address",
  mapUrl: "Your Google Maps URL",
};
```

## 🔗 Social Media

Update social links in `lib/constants.ts`:
```typescript
export const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://instagram.com/yourhandle" },
  // ... other platforms
];
```

## 🐛 Known Issues

- The `@theme` directive shows a warning in CSS but works correctly in Tailwind CSS v4
- 3D scene is disabled on server-side (SSR) for performance

## 📝 License

This is a custom project built for Wed Filmer.

## 🙏 Credits

Built with modern web technologies and best practices for premium user experience.

---

**Need help?** Check the documentation or contact the development team.
