import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '../hooks/useGSAP'
import img from '../images/Herosec-img.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'

/**
 * Hero — full-viewport landing section.
 *
 * GSAP page-load timeline (after 0.4s delay to let Navbar settle):
 *   0.0 → heading slides up & fades in
 *   0.4 → subtitle follows
 *   0.6 → description paragraph
 *   0.8 → CTA buttons staggered
 *   0.9 → social icons pop in with spring
 *   0.5 → image slides in from the right (overlapping, feels simultaneous)
 *
 * Hover effects (buttons & icons) handled via CSS in App.css for performance.
 * Respects prefers-reduced-motion.
 */
const Hero = () => {
  const heroRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      const tl = gsap.timeline({ delay: 0.4 })

      tl.from('.hero-heading', {
          y: 60,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power3.out',
        })
        .from(
          '.hero-subtitle',
          { y: 35, autoAlpha: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.45'
        )
        .from(
          '.hero-desc',
          { y: 28, autoAlpha: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.35'
        )
        .from(
          '.hero-btn',
          { y: 22, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          '-=0.25'
        )
        .from(
          '.hero-icon',
          { scale: 0, autoAlpha: 0, duration: 0.45, stagger: 0.09, ease: 'back.out(1.7)' },
          '-=0.15'
        )
        .from(
          '.hero-image',
          { x: 70, autoAlpha: 0, duration: 0.95, ease: 'power3.out' },
          0.5 // starts 0.5s into the timeline — overlaps with text
        )
    },
    { scope: heroRef }
  )

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — Introduction"
      className="w-full flex flex-col-reverse md:flex-row gap-6 items-center justify-between md:px-12 py-16"
    >
      {/* ── Left: text content ── */}
      <div className="flex flex-col items-start px-8 md:px-0 justify-center w-full md:w-1/2 gap-5">
        <h1
          className="hero-heading text-5xl md:text-7xl font-bold text-left leading-tight"
          style={{ fontFamily: 'playfair', color: 'var(--color-text)', lineHeight: 1.08 }}
        >
          Crafting Digital
          <br />
          Experiences
        </h1>

        <p
          className="hero-subtitle text-lg md:text-2xl font-bold tracking-widest text-left uppercase"
          style={{ color: 'var(--color-accent)', letterSpacing: '0.12em' }}
        >
          Full Stack Developer
        </p>

        <p
          className="hero-desc text-base md:text-xl text-left leading-relaxed"
          style={{ color: 'var(--color-muted)', maxWidth: '480px' }}
        >
          I build modern, responsive, and scalable web applications that bring
          ideas to life and deliver meaningful impact.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-row gap-3 flex-wrap mt-1">
          <a
            href="#projects"
            className="hero-btn inline-block px-6 py-3 rounded-lg font-semibold text-base md:text-lg"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'background-color 0.22s, transform 0.18s, box-shadow 0.22s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-dark)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(181,69,27,0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="hero-btn inline-block px-6 py-3 rounded-lg font-semibold text-base md:text-lg"
            style={{
              border: '2px solid var(--color-accent)',
              color: 'var(--color-accent)',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transition: 'background-color 0.22s, color 0.22s, transform 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Contact Me
          </a>
        </div>

        {/* Social icons */}
        <div className="flex flex-row gap-5 mt-2" aria-label="Social links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon social-icon text-3xl md:text-4xl"
            style={{ color: 'var(--color-text)' }}
            aria-label="GitHub profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon social-icon text-3xl md:text-4xl"
            style={{ color: 'var(--color-text)' }}
            aria-label="LinkedIn profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:deepak.dev01@gmail.com"
            className="hero-icon social-icon text-3xl md:text-4xl"
            style={{ color: 'var(--color-text)' }}
            aria-label="Send email"
          >
            <IoIosMail />
          </a>
        </div>
      </div>

      {/* ── Right: profile image ── */}
      <div
        className="hero-image w-full md:w-1/2 flex items-center justify-center"
        style={{ maxHeight: '540px' }}
      >
        <img
          src={img}
          alt="Deepak — Full Stack Developer"
          className="w-full h-full object-contain"
          style={{ maxHeight: '520px' }}
          loading="eager"
        />
      </div>
    </section>
  )
}

export default Hero