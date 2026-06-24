import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'
import img from '../images/Aboutsectio.png'

/**
 * About — fixes ALL bugs from the original:
 *  ✓ Nested <p> inside <p> → replaced with <div> wrappers
 *  ✓ class= → className= (was an HTML attribute not JSX)
 *  ✓ Proper semantic HTML
 *
 * GSAP ScrollTrigger animations:
 *  - Image slides in from left
 *  - Content staggered from right
 *  - Stat numbers count up
 */
const About = () => {
  const aboutRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      const commonTrigger = {
        start: 'top 78%',
        toggleActions: 'play none none none',
      }

      // Image slides in from left
      gsap.from('.about-img-wrapper', {
        x: -70,
        autoAlpha: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-img-wrapper', ...commonTrigger },
      })

      // Content elements stagger from right
      gsap.from('.about-content-item', {
        y: 35,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.13,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-content', ...commonTrigger },
      })

      // Stat cards pop in
      gsap.from('.about-stat', {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.about-stats', start: 'top 82%', toggleActions: 'play none none none' },
      })
    },
    { scope: aboutRef }
  )

  const stats = [
    { value: '7+',       label: 'Projects' },
    { value: 'MERN',     label: 'Stack' },
    { value: 'Clean',    label: 'Code' },
    { value: 'Open',     label: 'to Work' },
  ]

  return (
    <section
      ref={aboutRef}
      id="about"
      aria-label="About Deepak"
      className="flex flex-col md:flex-row gap-8 items-center justify-around py-16 px-6 md:px-12"
    >
      {/* ── Image ── */}
      <div className="about-img-wrapper flex items-center justify-center flex-shrink-0">
        <div id="About-img">
          <img
            src={img}
            alt="Deepak — professional photo"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="about-content flex flex-col gap-5 items-start justify-center w-full md:w-1/2"
        style={{ fontFamily: 'playfair' }}
      >
        <h2
          className="about-content-item text-4xl md:text-5xl font-bold text-left"
          style={{ color: 'var(--color-text)' }}
        >
          About Me
        </h2>

        <p
          className="about-content-item text-base md:text-lg text-left leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          I'm Deepak, a passionate Full Stack Web Developer who loves building
          clean, performant, and beautiful web applications. I enjoy turning
          complex problems into simple, elegant solutions.
        </p>

        <p
          className="about-content-item text-base md:text-lg text-left leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          With a strong foundation in the MERN stack and a keen eye for design,
          I focus on writing clean code and crafting seamless user experiences.
        </p>

        {/* Divider */}
        <div
          className="about-content-item w-full"
          style={{ height: '1px', backgroundColor: 'var(--color-border)' }}
          role="separator"
        />

        {/* Stats */}
        <div
          className="about-stats flex flex-row gap-0 items-center justify-evenly w-full flex-wrap"
          aria-label="Key highlights"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {/* Stat */}
              <div className="about-stat flex flex-col items-center px-4 py-2 text-center">
                <span
                  className="text-2xl md:text-4xl font-bold"
                  style={{ color: 'var(--color-accent)', fontFamily: 'playfair' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs md:text-sm font-medium mt-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {stat.label}
                </span>
              </div>

              {/* Divider between stats (not after last) */}
              {i < stats.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    width: '1px',
                    height: '40px',
                    backgroundColor: 'var(--color-border)',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About