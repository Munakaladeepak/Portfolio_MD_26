# Portfolio Website — Design Requirement Document
**Project:** Deepak — Full Stack Web Developer Portfolio  
**Version:** 1.0  
**Date:** June 15, 2026  
**Reference:** Design mockup (ChatGPT_Image_Jun_11_2026)

---

## 1. Project Overview

A dynamic, single-page portfolio website for a Full Stack Web Developer named "Deepak." The site must communicate technical expertise, aesthetic sensibility, and professional credibility. The design language is warm-minimalist: earthy terracotta tones, botanical accents, editorial typography, and structured whitespace that together create a premium but approachable feel.

---

## 2. Design Language & Visual Identity

### 2.1 Color Palette

| Token          | Hex       | Usage                                      |
|----------------|-----------|--------------------------------------------|
| `--cream`      | `#F5F0E8` | Primary background (hero, about, contact)  |
| `--warm-sand`  | `#EDE7D9` | Section alternating background             |
| `--terracotta` | `#B5461B` | Primary CTA buttons, active states, accents|
| `--rust-light` | `#D96B3A` | Secondary accent, links, icon hover        |
| `--brown-dark` | `#2C1F14` | Primary text, headings                     |
| `--taupe`      | `#8C7B6B` | Secondary/muted text, timestamps           |
| `--sage`       | `#7A8C6E` | Subtle botanical decorative elements       |
| `--white`      | `#FFFFFF` | Card backgrounds, form fields              |

### 2.2 Typography

| Role            | Font Family                         | Weight    | Size (Desktop) |
|-----------------|-------------------------------------|-----------|----------------|
| Display / H1    | `Playfair Display` (serif)          | 700–800   | 56–72px        |
| H2 Section Head | `Playfair Display`                  | 600       | 36–42px        |
| H3 Card Title   | `Inter` or `DM Sans` (sans-serif)   | 600       | 20px           |
| Body Text       | `Inter`                             | 400       | 16px / 1.7lh   |
| Labels / Caps   | `Inter`                             | 500       | 11px / 0.15em  |
| Nav Links       | `Inter`                             | 500       | 14px           |
| Code Snippets   | `JetBrains Mono`                    | 400       | 14px           |

### 2.3 Spacing System (8px base)

```
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px
```

### 2.4 Border Radius

- Cards / Buttons: `8px`
- Image containers: `12px`
- Pills / Badges: `999px`

### 2.5 Shadows

```css
--shadow-card:    0 2px 12px rgba(44, 31, 20, 0.08);
--shadow-hover:   0 8px 32px rgba(44, 31, 20, 0.14);
--shadow-button:  0 4px 16px rgba(181, 70, 27, 0.30);
```

---

## 3. Layout & Grid

- **Max content width:** `1200px`, centered
- **Column grid:** 12-column, 24px gutters
- **Breakpoints:**

| Label   | Width       |
|---------|-------------|
| Mobile  | `< 640px`   |
| Tablet  | `640–1024px`|
| Desktop | `> 1024px`  |

---

## 4. Section-by-Section Requirements

### 4.1 Navigation Bar

**Layout:** Fixed top, full-width, height `64px`  
**Left:** Logo — wordmark `Deepak.` in Playfair Display, `--brown-dark`  
**Center:** Links — About · Skills · Projects · Experience · Contact  
**Right:** CTA button — `Hire Me` in terracotta filled style  
**Behaviour:**
- On scroll > 50px: add `backdrop-filter: blur(12px)` + `background: rgba(245,240,232,0.92)`
- Active link gets terracotta underline
- Mobile: hamburger icon → full-screen slide-in menu

---

### 4.2 Hero Section

**Layout:** 2-column (60% text / 40% illustration), `min-height: 100vh`  
**Left column:**
- Headline: `"Crafting Digital Experiences."` — Playfair Display 72px, weight 800
- The period after "Experiences" uses `--terracotta` color (signature detail)
- Subtitle label: `FULL STACK WEB DEVELOPER` in spaced uppercase caps, `--terracotta`
- Body copy: 2 lines, Inter 16px, `--taupe`
- CTA row: `View Projects` (filled, terracotta) + `Download CV` (outlined, border `--brown-dark`)
- Social icons row: GitHub, LinkedIn, Email — 24px, hover changes fill to terracotta

**Right column:**
- Illustrated portrait in a geometric multi-tone abstract frame (sage, terracotta, sand)
- Portrait is an SVG/WebP illustration, NOT a photo
- Subtle decorative arch shape behind portrait

**Animation:**
- Headline fades in with a 40px upward translate, staggered by word
- CTA buttons slide in 200ms after headline

---

### 4.3 About Me Section

**Layout:** 2-column (40% image / 60% text), `background: --warm-sand`  
**Left:** Styled image card with a faint drop shadow — depicts a cozy workspace with books and botanical objects  
**Right:**
- Section title: `"About Me"` — Playfair Display 42px
- Two paragraphs of body copy
- Divider rule `1px solid rgba(44,31,20,0.12)`
- **Stat row (4 stats):**
  - `5+ Projects Delivered`
  - `Full Stack Expertise`
  - `Clean Code Advocate`
  - `Open to Opportunities`
  - Each stat: number/label in terracotta, descriptor below in taupe caps

---

### 4.4 Skills & Craft Section

**Layout:** 2-column grid (Frontend / Backend) + decorative botanical illustration (right-aligned)  
**Section title:** `"Skills & Craft"` — Playfair Display 36px  
**Column heads:** `FRONTEND` / `BACKEND` in spaced caps, `--taupe`

**Frontend skills list:**
- HTML, CSS, JavaScript, TypeScript, React, Tailwind

**Backend skills list:**
- Node.js, Express, MongoDB, SQL, REST APIs

**Presentation:** Plain bulleted list, Inter 16px, with a subtle hover — bullet colour changes to terracotta  
**Botanical decoration:** Faint sage-toned leaf SVG, right side, `opacity: 0.4`

---

### 4.5 Projects Section

**Layout:** 3-column card grid (responsive → 1 col mobile)  
**Section title:** `"Projects"` — Playfair Display 36px  

**Each project card contains:**
- Screenshot image (browser mockup style with rounded top)
- Project title — Inter Semi-Bold 18px
- Short description — Inter 14px, `--taupe`
- Two links: `Live →` and `GitHub →` in terracotta, 13px

**Projects included:**

| # | Name              | Description                                                         |
|---|-------------------|---------------------------------------------------------------------|
| 1 | Task Manager App  | Productivity application to manage tasks, deadlines, and team collaboration efficiently |
| 2 | Dev Portfolio     | Personal portfolio website showcasing work, skills, and experience  |
| 3 | E-Commerce Store  | Full-featured e-commerce platform with cart, checkout, admin dashboard |

**Card behaviour:**
- Default: `box-shadow: --shadow-card`
- Hover: `transform: translateY(-4px)`, shadow upgrades to `--shadow-hover`
- Transition: `250ms ease`

---

### 4.6 Experience Section (Timeline)

**Layout:** Left-aligned vertical timeline, `background: --cream`  
**Section title:** `"Experience"` — Playfair Display 36px  

**Timeline structure:**
- Left column: Date range — Inter 13px, `--taupe`
- Center: Vertical line `2px solid --warm-sand` + circular filled dot `12px` in `--terracotta`
- Right column: Role + company + description

**Entries:**

| Date              | Role                    | Company           | Notes                                                                      |
|-------------------|-------------------------|-------------------|----------------------------------------------------------------------------|
| Jan 2023 – Present| Full Stack Developer    | TechNova Solutions| Building scalable web apps using the MERN stack. Feature dev, API integration, performance optimization. |
| Jun 2021 – Dec 2022| Frontend Developer     | WebCraft Studio   | Responsive UIs, reusable components, collaborated with design + backend teams. |

---

### 4.7 Testimonials Section (`"What People Say"`)

**Layout:** 2-column — quote card left / contact form right  
**Quote card:**
- Large `"` decorative quote mark in terracotta, 80px
- Quote text in Inter 16px italic
- Reviewer name: `Anjali Verma` — terracotta, bold
- Title: `Product Manager, TechNova Solutions` — taupe
- Small botanical/vase illustration bottom-left corner

---

### 4.8 Contact Form

**Layout:** Right side of testimonials section (or standalone section on mobile)  
**Fields:**
- `Your Name` (text, 50% width)
- `Your Email` (email, 50% width)
- `Your Message` (textarea, full width, 5 rows)
- `Send Message` button — full-width, terracotta fill, `--shadow-button`

**Validation:** Real-time inline validation (required, email format)  
**Success state:** Replace form with a confirmation card: `"Message sent! I'll get back to you soon."`

---

### 4.9 Footer

**Layout:** 2-row footer  
**Row 1:** Email address left · social icons right (GitHub, LinkedIn, Dribbble)  
**Row 2:** `Deepak © 2025` centered, social icon row repeated  
**Background:** `--brown-dark`, text `--cream`

---

## 5. Dynamic / Interactive Requirements

| Feature                     | Behaviour                                                              |
|-----------------------------|------------------------------------------------------------------------|
| Smooth scroll               | `scroll-behavior: smooth` + offset for fixed nav                       |
| Scroll-triggered animations | Sections animate in on viewport entry (Intersection Observer or GSAP)  |
| Nav active state            | Highlight current section link as user scrolls                         |
| Dark / Light toggle         | Optional: persist preference to `localStorage`                         |
| Hire Me button              | Scrolls to Contact section or opens mailto                             |
| Download CV                 | Links to a PDF file (downloadable)                                     |
| Live / GitHub links         | Open in new tab                                                        |
| Form submission             | Via Formspree, EmailJS, or custom API endpoint                         |
| Skeleton loaders            | For project cards if data is fetched dynamically                       |

---

## 6. Decorative & Illustrative System

- **Portrait illustration:** Abstract geometric style, flat vector, NOT a real photo
- **Botanical elements:** Sparse leafy SVGs used as section separators and background accents
- **Vase / still-life:** Appears bottom-left of testimonial section
- **All decorative elements:** Low opacity (0.3–0.5), never interfere with readability
- **Project mockups:** Browser-chrome style frame around screenshots

---

## 7. Performance Requirements

| Metric                 | Target      |
|------------------------|-------------|
| Lighthouse Performance | ≥ 90        |
| First Contentful Paint | ≤ 1.5s      |
| Total Blocking Time    | ≤ 200ms     |
| Image format           | WebP + lazy load |
| Font loading           | `font-display: swap` |
| CSS                    | Purged / tree-shaken in production |

---

## 8. Accessibility Requirements

- All interactive elements must have visible focus rings
- Color contrast ≥ 4.5:1 for body text (WCAG AA)
- All images must have descriptive `alt` attributes
- Form fields must have associated `<label>` elements
- Respect `prefers-reduced-motion` — disable/reduce scroll animations
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

---

## 9. SEO Metadata

```html
<title>Deepak — Full Stack Web Developer</title>
<meta name="description" content="I build modern, responsive, and scalable web applications that bring ideas to life and deliver meaningful impact." />
<meta property="og:title" content="Deepak — Full Stack Web Developer" />
<meta property="og:image" content="/og-preview.png" />
<link rel="canonical" href="https://deepak.dev" />
```

---

## 10. File & Asset Checklist

- [ ] `portrait-illustration.svg` — abstract geometric hero illustration
- [ ] `about-image.webp` — cozy workspace still life
- [ ] `project-task-manager.webp` — Task Manager App screenshot
- [ ] `project-portfolio.webp` — Dev Portfolio screenshot
- [ ] `project-ecommerce.webp` — E-Commerce Store screenshot
- [ ] `botanical-leaf.svg` — reusable decorative leaf
- [ ] `vase-illustration.svg` — testimonial corner decoration
- [ ] `resume-deepak.pdf` — downloadable CV
- [ ] `favicon.ico` + `apple-touch-icon.png`
- [ ] `og-preview.png` (1200×630)

---

## 11. Suggested Folder Structure

```
deepak-portfolio/
├── public/
│   ├── assets/
│   │   ├── illustrations/
│   │   ├── projects/
│   │   └── resume.pdf
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   ├── data/
│   │   └── content.js   ← all text/data in one place for easy editing
│   └── App.jsx
├── index.html
└── vite.config.js
```

---

*End of Design Requirement Document — v1.0*
