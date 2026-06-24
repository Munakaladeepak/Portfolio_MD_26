# ⚡ React + Tailwind CSS + GSAP — Full Mastery Reference

> A complete comeback guide for building stunning, animated websites. Everything you need to reclaim your prowess — from core concepts to advanced techniques.

---

## Table of Contents

1. [React Fundamentals Refresher](#1-react-fundamentals-refresher)
2. [Tailwind CSS Core Concepts](#2-tailwind-css-core-concepts)
3. [Tailwind Layout & Responsive Design](#3-tailwind-layout--responsive-design)
4. [Tailwind Advanced Patterns](#4-tailwind-advanced-patterns)
5. [GSAP Core Animations](#5-gsap-core-animations)
6. [GSAP ScrollTrigger](#6-gsap-scrolltrigger)
7. [GSAP Timelines](#7-gsap-timelines)
8. [React + GSAP Integration](#8-react--gsap-integration)
9. [Stunning UI Patterns](#9-stunning-ui-patterns)
10. [Performance Best Practices](#10-performance-best-practices)
11. [Full Page Architecture Example](#11-full-page-architecture-example)

---

## 1. React Fundamentals Refresher

### Component Structure

```jsx
// Functional component — the standard
const Hero = ({ title, subtitle }) => {
  return (
    <section className="...">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
};

export default Hero;
```

### useState & useEffect

```jsx
import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Runs once on mount
  useEffect(() => {
    fetchData().then(setData);
  }, []);

  // Runs when count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
};
```

### useRef — The Key Hook for GSAP

```jsx
import { useRef } from "react";

const Box = () => {
  const boxRef = useRef(null);       // single element
  const itemsRef = useRef([]);       // array of elements

  // Assign to array
  const setRef = (el, i) => {
    itemsRef.current[i] = el;
  };

  return (
    <>
      <div ref={boxRef} />
      {["a", "b", "c"].map((item, i) => (
        <div key={item} ref={(el) => setRef(el, i)}>{item}</div>
      ))}
    </>
  );
};
```

### useContext — Global State

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

// Provider wraps your app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Consume anywhere
const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>{theme}</button>;
};
```

### Custom Hooks

```jsx
// useWindowSize — useful for responsive animations
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handle = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return size;
};
```

---

## 2. Tailwind CSS Core Concepts

### The Mental Model

Tailwind = utility-first. You compose design directly in JSX using small, single-purpose classes.

```jsx
// ❌ Old way — writing CSS separately
// .card { background: white; padding: 1.5rem; border-radius: 0.5rem; }

// ✅ Tailwind way — compose inline
<div className="bg-white p-6 rounded-lg shadow-md" />
```

### Typography

```jsx
<h1 className="text-5xl font-bold tracking-tight text-gray-900">Heading</h1>
<p  className="text-lg font-medium text-gray-600 leading-relaxed">Body text</p>
<span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Label</span>

{/* Font sizes: text-xs text-sm text-base text-lg text-xl text-2xl ... text-9xl */}
{/* Weights:    font-thin font-light font-normal font-medium font-semibold font-bold font-extrabold */}
{/* Tracking:  tracking-tighter tracking-tight tracking-normal tracking-wide tracking-wider tracking-widest */}
```

### Spacing (Padding & Margin)

```jsx
{/* p-4 = 1rem all sides | px-4 = horizontal | py-4 = vertical | pt-4 pr-4 pb-4 pl-4 */}
<div className="p-4 px-8 py-6 mt-12 mb-8 mx-auto" />

{/* Tailwind scale: 1 = 0.25rem, 4 = 1rem, 8 = 2rem, 16 = 4rem, 24 = 6rem */}
{/* Arbitrary values: p-[42px] m-[3.5rem] */}
```

### Colors

```jsx
{/* text-{color}-{shade} | bg-{color}-{shade} | border-{color}-{shade} */}
<div className="bg-slate-900 text-white border border-slate-700" />
<div className="bg-indigo-600 hover:bg-indigo-700 text-white" />

{/* Shades: 50 100 200 300 400 500 600 700 800 900 950 */}
{/* Colors: slate gray zinc neutral stone red orange amber yellow lime green
            emerald teal cyan sky blue indigo violet purple fuchsia pink rose */}

{/* Arbitrary: bg-[#FF6B35] text-[rgb(255,107,53)] */}
```

### Borders & Shadows

```jsx
<div className="border border-gray-200 rounded-xl" />
<div className="border-2 border-indigo-500 rounded-full" />
<div className="ring-2 ring-indigo-500 ring-offset-2" />   {/* focus rings */}

{/* Shadows: shadow-sm shadow shadow-md shadow-lg shadow-xl shadow-2xl shadow-inner */}
<div className="shadow-lg hover:shadow-xl transition-shadow duration-300" />

{/* Custom glow effect */}
<div className="shadow-[0_0_30px_rgba(99,102,241,0.4)]" />
```

---

## 3. Tailwind Layout & Responsive Design

### Flexbox

```jsx
{/* Row, centered */}
<div className="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

{/* Column, centered */}
<div className="flex flex-col items-center justify-center gap-6 min-h-screen">
  <h1>Centered Content</h1>
</div>

{/* Flex children */}
<div className="flex gap-4">
  <div className="flex-1">Takes equal space</div>
  <div className="flex-none w-64">Fixed width</div>
  <div className="flex-[2]">Takes double space</div>
</div>
```

### CSS Grid

```jsx
{/* Basic grid */}
<div className="grid grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

{/* Responsive grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {cards.map(c => <Card key={c.id} {...c} />)}
</div>

{/* Spanning columns */}
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">Main content</div>
  <div className="col-span-4">Sidebar</div>
</div>

{/* Auto-fit (responsive without breakpoints) */}
<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  {items.map(item => <Card key={item} />)}
</div>
```

### Responsive Breakpoints

```jsx
{/* Mobile-first approach */}
{/* Default = mobile | sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */}

<div className="
  text-base        md:text-lg       lg:text-xl
  p-4              md:p-8           lg:p-12
  flex-col         md:flex-row
  grid-cols-1      md:grid-cols-2   lg:grid-cols-4
">
```

### Positioning

```jsx
{/* Absolute overlay */}
<div className="relative">
  <img src="..." className="w-full" />
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
    <h2 className="text-white text-4xl">Overlay</h2>
  </div>
</div>

{/* Sticky navbar */}
<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100" />

{/* Fixed element */}
<button className="fixed bottom-8 right-8 z-50 ..." />
```

---

## 4. Tailwind Advanced Patterns

### Dark Mode

```jsx
{/* In tailwind.config.js: darkMode: 'class' */}
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-gray-800 dark:text-gray-100">Title</h1>
  <p  className="text-gray-600 dark:text-gray-400">Subtitle</p>
</div>

{/* Toggle dark mode */}
document.documentElement.classList.toggle('dark');
```

### Pseudo-classes & State Variants

```jsx
<button className="
  bg-indigo-600
  hover:bg-indigo-700
  active:scale-95
  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
">
  Button
</button>

{/* Group hover (parent triggers child style) */}
<div className="group relative">
  <img className="group-hover:scale-110 transition-transform duration-500" />
  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0">
    Overlay text
  </div>
</div>
```

### Gradient Backgrounds

```jsx
{/* Linear gradients */}
<div className="bg-gradient-to-r from-indigo-500 to-purple-600" />
<div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-black" />

{/* Text gradient */}
<h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
  Gradient Text
</h1>

{/* Radial gradient (arbitrary) */}
<div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black" />
```

### Backdrop Blur (Glassmorphism)

```jsx
<div className="
  bg-white/10
  backdrop-blur-md
  border border-white/20
  rounded-2xl
  p-8
  shadow-xl
">
  Glass card content
</div>
```

### Custom Configuration (tailwind.config.js)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f4ff",
          500: "#6366f1",
          900: "#1e1b4b",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Cal Sans", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};
```

---

## 5. GSAP Core Animations

### Setup

```bash
npm install gsap
```

```jsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin }    from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);
```

### gsap.to() — Animate TO a value

```jsx
// Animate a DOM element
gsap.to(".box", {
  x: 200,           // translateX (px)
  y: 100,           // translateY
  rotation: 45,     // degrees
  scale: 1.5,
  opacity: 0,
  duration: 1,      // seconds
  ease: "power2.out",
  delay: 0.5,
});

// Using ref
gsap.to(boxRef.current, { x: 200, duration: 1 });
```

### gsap.from() — Animate FROM a value

```jsx
// Elements start at these values and animate to their natural state
gsap.from(".hero-title", {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});
```

### gsap.fromTo() — Full Control

```jsx
gsap.fromTo(
  ".card",
  { x: -100, opacity: 0 },       // FROM
  { x: 0,   opacity: 1, duration: 0.8, ease: "back.out(1.7)" }  // TO
);
```

### Easing Cheat Sheet

```js
// Power eases (smooth)
"power1.out"  "power2.out"  "power3.out"  "power4.out"

// Special feels
"back.out(1.7)"    // overshoots then settles — great for popups
"elastic.out(1,0.3)" // springy bounce
"bounce.out"       // ball bounce
"circ.out"         // circular deceleration
"expo.out"         // fast start, very slow end
"sine.inOut"       // gentle S-curve

// In / Out / InOut variations available for all
"power2.in"    "power2.out"    "power2.inOut"

// No easing
"none"  or  "linear"
```

### Staggered Animations

```jsx
// Animate multiple elements one after another
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,       // 0.1s delay between each
  ease: "power2.out",
});

// Advanced stagger
gsap.from(".grid-item", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: {
    amount: 0.8,        // total time spread across all items
    from: "center",     // start from center outward
    grid: "auto",       // treat as grid
  },
});
```

### Animatable Properties

```js
// Transform
x, y, z          // translate (px)
xPercent, yPercent  // translate (%)
rotation          // rotate Z (deg)
rotationX, rotationY  // 3D rotation
scale, scaleX, scaleY
skewX, skewY

// Visual
opacity
backgroundColor   // "rgb(255,0,0)"  or  "#ff0000"
color
borderRadius      // "50%"
width, height

// Clip & mask
clipPath          // "circle(50% at center)"

// Filter (via CSS)
filter            // "blur(10px)"

// SVG
strokeDashoffset  // for path drawing animations
fill
stroke
```

---

## 6. GSAP ScrollTrigger

### Basic ScrollTrigger

```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FadeSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",    // when top of element hits 80% from top of viewport
        end: "top 20%",
        toggleActions: "play none none reverse",
        // toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
        // Values: "play" "pause" "resume" "reset" "restart" "complete" "reverse" "none"
      },
    });
  }, []);

  return <section ref={ref}>Content</section>;
};
```

### Scrub — Animation Tied to Scroll Position

```jsx
useEffect(() => {
  gsap.to(".parallax-img", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,      // ties to scroll, not time
      // scrub: 1,      // adds 1s lag for smoothness
    },
  });
}, []);
```

### Pin — Lock Element During Scroll

```jsx
useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pinned-section",
      start: "top top",
      end: "+=300%",      // scroll 3x the viewport height while pinned
      pin: true,          // pins the element
      scrub: 1,
    },
  });

  tl.to(".slide-1", { xPercent: -100, opacity: 0 })
    .from(".slide-2", { xPercent: 100, opacity: 0 })
    .to(".slide-2", { xPercent: -100, opacity: 0 })
    .from(".slide-3", { xPercent: 100, opacity: 0 });
}, []);
```

### Horizontal Scroll Section

```jsx
useEffect(() => {
  const panels = gsap.utils.toArray(".panel");

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth,
    },
  });
}, []);
```

### ScrollTrigger Markers (Debug)

```jsx
scrollTrigger: {
  trigger: ".element",
  start: "top center",
  end: "bottom center",
  markers: true,        // shows visual markers in dev — remove in production!
}
```

---

## 7. GSAP Timelines

### Basic Timeline

```jsx
useEffect(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

  tl.from(".nav",       { y: -80, opacity: 0 })
    .from(".hero-tag",  { y: 30, opacity: 0 },     "-=0.4")   // 0.4s before prev ends
    .from(".hero-title",{ y: 50, opacity: 0 },     "-=0.3")
    .from(".hero-sub",  { y: 30, opacity: 0 },     "-=0.2")
    .from(".hero-cta",  { y: 20, opacity: 0 },     "-=0.1")
    .from(".hero-img",  { scale: 0.8, opacity: 0 },"<0.2");   // starts 0.2s after prev starts
}, []);
```

### Timeline Position Parameter

```js
tl.to(".a", { x: 100 })          // after previous
  .to(".b", { x: 100 }, "+=0.5") // 0.5s after previous ends
  .to(".c", { x: 100 }, "-=0.3") // 0.3s before previous ends
  .to(".d", { x: 100 }, "<")     // same start as previous
  .to(".e", { x: 100 }, "<0.2")  // 0.2s after previous starts
  .to(".f", { x: 100 }, 2)       // at exactly 2s from start
  .to(".g", { x: 100 }, "step1") // at label "step1"
```

### Timeline with ScrollTrigger

```jsx
useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(".about-img",  { x: -80, opacity: 0, duration: 1 })
    .from(".about-title",{ x: 60,  opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".about-text", { y: 30,  opacity: 0, duration: 0.6 }, "-=0.4")
    .from(".about-stats .stat", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
    }, "-=0.2");
}, []);
```

---

## 8. React + GSAP Integration

### The Golden Pattern — useGSAP Hook

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";   // npm install @gsap/react

gsap.registerPlugin(useGSAP);

const AnimatedCard = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Scope — selectors are scoped to container
    gsap.from(".card-title",   { y: 30, opacity: 0, duration: 0.6 });
    gsap.from(".card-content", { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
  }, { scope: container });  // IMPORTANT: scopes querySelector to this element

  return (
    <div ref={container} className="card">
      <h2 className="card-title">Title</h2>
      <p className="card-content">Content</p>
    </div>
  );
};
```

### Manual Cleanup (without useGSAP)

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".item", { y: 50, opacity: 0, stagger: 0.1 });
  }, containerRef); // scope

  return () => ctx.revert(); // CRITICAL: cleanup on unmount
}, []);
```

### Animating on State Change

```jsx
const Modal = ({ isOpen }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0,  opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(modalRef.current, {
        y: 30, opacity: 0, scale: 0.95,
        duration: 0.3, ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div ref={modalRef} className={`modal ${isOpen ? "block" : "hidden"}`}>
      Modal Content
    </div>
  );
};
```

### Page Transition Pattern

```jsx
// In a layout component
const PageWrapper = ({ children }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    // Enter animation
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",  // clean up inline styles after animation
    });
  }, []);

  return <div ref={pageRef}>{children}</div>;
};
```

---

## 9. Stunning UI Patterns

### Animated Navbar

```jsx
const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2,
    });

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 w-full z-50 px-8 py-4
        transition-all duration-500
        ${scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight">Brand</span>
        <div className="flex items-center gap-8">
          {["Work", "About", "Contact"].map(link => (
            <a key={link} href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {link}
            </a>
          ))}
          <button className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};
```

### Hero Section with Text Animation

```jsx
const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5, defaults: { ease: "power3.out" } });

    tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
      .from(".hero-title span", {
        y: 100, opacity: 0, duration: 0.8, stagger: 0.1,
      }, "-=0.2")
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-buttons > *", { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full
          bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
          ✦ Available for projects
        </div>
        <h1 className="hero-title text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
          <span className="inline-block">We build</span>{" "}
          <span className="inline-block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            stunning
          </span>{" "}
          <span className="inline-block">websites</span>
        </h1>
        <p className="hero-subtitle text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafting digital experiences that captivate, convert, and leave a lasting impression.
        </p>
        <div className="hero-buttons flex items-center justify-center gap-4 flex-wrap">
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold
            rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            View Our Work
          </button>
          <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300
            font-semibold rounded-full transition-all duration-300 hover:bg-slate-800">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
```

### Cards with Hover Effects

```jsx
const Card = ({ title, description, icon }) => (
  <div className="group relative p-6 bg-slate-900 border border-slate-800
    hover:border-indigo-500/50 rounded-2xl transition-all duration-500
    hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] cursor-pointer">

    {/* Gradient shine on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0
      group-hover:from-indigo-500/5 group-hover:to-purple-500/10 transition-all duration-500" />

    <div className="relative">
      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4
        group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-indigo-400 text-sm font-medium
        translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
        Learn more →
      </div>
    </div>
  </div>
);
```

### Scroll-Animated Section

```jsx
const ScrollSection = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
};

// Usage: wrap any content, add "reveal-item" class to animate
<ScrollSection>
  <h2 className="reveal-item text-5xl font-bold">Our Services</h2>
  <p className="reveal-item text-gray-500">What we do best</p>
  <div className="reveal-item grid grid-cols-3 gap-6 mt-10">
    {services.map(s => <Card key={s.id} {...s} />)}
  </div>
</ScrollSection>
```

### Magnetic Button Effect

```jsx
const MagneticButton = ({ children }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-white text-black font-semibold rounded-full"
    >
      {children}
    </button>
  );
};
```

### Number Counter Animation

```jsx
const Counter = ({ end, label, suffix = "" }) => {
  const ref = useRef(null);
  const numRef = useRef({ val: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(numRef.current, {
        val: end,
        duration: 2,
        ease: "power2.out",
        snap: { val: 1 },
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        onUpdate: () => {
          ref.current.querySelector(".num").textContent =
            Math.round(numRef.current.val).toLocaleString() + suffix;
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [end, suffix]);

  return (
    <div ref={ref} className="text-center">
      <div className="num text-6xl font-bold text-white">0{suffix}</div>
      <div className="text-slate-400 mt-2">{label}</div>
    </div>
  );
};

// Usage
<Counter end={500} suffix="+" label="Projects Completed" />
<Counter end={98}  suffix="%" label="Client Satisfaction" />
```

---

## 10. Performance Best Practices

### Always Clean Up GSAP

```jsx
useEffect(() => {
  // Method 1: gsap.context (preferred)
  const ctx = gsap.context(() => {
    gsap.from(".item", { y: 50, opacity: 0 });
  }, ref);
  return () => ctx.revert();

  // Method 2: Kill specific animations
  const anim = gsap.to(".box", { x: 200 });
  return () => anim.kill();

  // Method 3: Kill all ScrollTriggers
  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);
```

### Tailwind Class Performance

```jsx
// ❌ Don't conditionally build class strings
const cls = `text-${condition ? "red" : "blue"}-500`; // BREAKS purging

// ✅ Use full class names in conditionals
const cls = condition ? "text-red-500" : "text-blue-500";

// ✅ Or use clsx / classnames library
import clsx from "clsx";
const cls = clsx("base-class", { "text-red-500": isError, "text-green-500": isSuccess });
```

### Lazy Loading Components

```jsx
import { lazy, Suspense } from "react";

const HeavySection = lazy(() => import("./HeavySection"));

const App = () => (
  <Suspense fallback={<div className="animate-pulse h-96 bg-slate-800 rounded-2xl" />}>
    <HeavySection />
  </Suspense>
);
```

### will-change for Animated Elements

```jsx
{/* Hint browser to prepare GPU layer for elements you know will animate */}
<div className="will-change-transform" />     {/* for x, y, scale, rotation */}
<div className="will-change-opacity" />       {/* for opacity */}
<div className="will-change-[transform,opacity]" />
```

### Prefers Reduced Motion

```jsx
// Respect user's OS accessibility setting
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

useEffect(() => {
  if (prefersReducedMotion) return;  // skip animations

  gsap.from(".element", { y: 80, opacity: 0, duration: 1 });
}, []);

// Tailwind motion utilities
<div className="transition-all motion-reduce:transition-none" />
<div className="animate-fade-up motion-reduce:animate-none" />
```

---

## 11. Full Page Architecture Example

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Work.jsx
│   │   └── Contact.jsx
│   └── ui/
│       ├── Card.jsx
│       ├── Button.jsx
│       ├── MagneticButton.jsx
│       └── Counter.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   └── useWindowSize.js
├── utils/
│   └── gsap.js          ← register all plugins here once
└── App.jsx
```

### Centralized GSAP Setup (utils/gsap.js)

```js
// utils/gsap.js — import this file once in App.jsx or index.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin }    from "gsap/TextPlugin";
import { Flip }          from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip);

// Global defaults
gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap, ScrollTrigger, TextPlugin, Flip };
```

### Reusable useScrollAnimation Hook

```js
// hooks/useScrollAnimation.js
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollAnimation = (animation = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        ...animation,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

// Usage in any section component:
const Services = () => {
  const ref = useScrollAnimation();
  return (
    <section ref={ref}>
      <h2 className="animate text-5xl font-bold">Services</h2>
      {services.map(s => (
        <div key={s.id} className="animate">
          <Card {...s} />
        </div>
      ))}
    </section>
  );
};
```

---

## Quick Reference Cheat Sheet

| Task | Code |
|------|------|
| Center everything | `flex items-center justify-center` |
| Full-screen section | `min-h-screen w-full` |
| Glassmorphism card | `bg-white/10 backdrop-blur-md border border-white/20` |
| Gradient text | `bg-gradient-to-r from-X to-Y bg-clip-text text-transparent` |
| Sticky nav | `sticky top-0 z-50` |
| Smooth hover transition | `transition-all duration-300` |
| GSAP entrance | `gsap.from(ref, { y: 60, opacity: 0, duration: 0.8 })` |
| GSAP on scroll | `scrollTrigger: { trigger, start: "top 80%" }` |
| GSAP stagger | `stagger: 0.1` |
| GSAP cleanup | `const ctx = gsap.context(() => {...}, ref); return () => ctx.revert();` |
| Parallax | `scrub: true, yPercent: -20` |
| Pin section | `pin: true, end: "+=300%"` |

---

> **You've got this.** The muscle memory is still there — it just needs a few reps to come back. Start with a simple Hero section using Tailwind, throw in a `gsap.from()` on mount, and the rest will flood back naturally. 🚀