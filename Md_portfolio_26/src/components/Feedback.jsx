import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

const TESTIMONIALS = [
  {
    quote:
      'Deepak is a highly skilled developer who delivers clean, efficient code. He is proactive, detail-oriented, and a great team player.',
    name: 'Anjali Verma',
    role: 'Product Manager, TechNova Solutions',
    initial: 'A',
  },
  {
    quote:
      'Working with Deepak was a pleasure. His attention to detail and problem-solving skills are truly impressive.',
    name: 'Rahul Mehta',
    role: 'CTO, StartupBridge',
    initial: 'R',
  },
]

const colors = {
  bg: '#F5F0E8',
  accent: '#A0522D',
  accentDark: '#7B3F22',
  text: '#2C2C2C',
  muted: '#6B6B6B',
  border: '#D6CFC4',
  cardBg: '#FDFAF5',
  quoteIcon: '#C4956A',
  inputBg: '#FFFFFF',
}

/**
 * Feedback — testimonials + contact form section.
 *
 * GSAP ScrollTrigger:
 *  - Section heading fades up
 *  - Testimonial cards stagger up
 *  - Form fields stagger up
 *
 * Testimonial carousel: previous/next buttons to cycle slides.
 * CSS micro-interactions: .testimonial-card hover lift, .form-input focus ring, .submit-btn hover.
 */
const Feedback = () => {
  const [form, setForm]                 = useState({ name: '', email: '', message: '' })
  const [activeIdx, setActiveIdx]       = useState(0)
  const feedbackRef                     = useRef(null)
  const testimonialCardRef              = useRef(null)

  const testimonial = TESTIMONIALS[activeIdx]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent! I'll get back to you soon.")
    setForm({ name: '', email: '', message: '' })
  }

  /* Cycle testimonials with a quick crossfade */
  const goTo = (idx) => {
    const card = testimonialCardRef.current
    if (!card) { setActiveIdx(idx); return }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) { setActiveIdx(idx); return }

    gsap.to(card, {
      autoAlpha: 0,
      y: -12,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIdx(idx)
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' }
        )
      },
    })
  }

  /* ScrollTrigger animations */
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      const trigger = { start: 'top 80%', toggleActions: 'play none none none' }

      gsap.from('.feedback-heading', {
        y: 30, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.feedback-heading', ...trigger },
      })

      gsap.from('.testimonial-col', {
        x: -40, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.feedback-grid', ...trigger },
      })

      gsap.from('.contact-col', {
        x: 40, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.feedback-grid', ...trigger },
      })

      gsap.from('.form-field', {
        y: 22, autoAlpha: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-col', start: 'top 78%', toggleActions: 'play none none none' },
      })
    },
    { scope: feedbackRef }
  )

  return (
    <section
      ref={feedbackRef}
      id="contact"
      aria-label="Testimonials and contact"
      style={{
        backgroundColor: colors.bg,
        padding: '72px 24px',
        fontFamily: "'Georgia', serif",
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
        }}
      >
        <h2
          className="feedback-heading"
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '700',
            color: colors.text,
            marginBottom: '48px',
            letterSpacing: '-0.5px',
            lineHeight: 1.15,
          }}
        >
          Let's Connect
        </h2>

        <div
          className="feedback-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* ── LEFT: Testimonials ── */}
          <div className="testimonial-col">
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: '700',
                color: colors.text,
                marginBottom: '24px',
              }}
            >
              What People Say
            </h3>

            {/* Testimonial card */}
            <div
              ref={testimonialCardRef}
              className="testimonial-card"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '14px',
                padding: '28px',
                boxShadow: '0 2px 14px rgba(0,0,0,0.05)',
                marginBottom: '20px',
                position: 'relative',
              }}
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                style={{
                  fontSize: '52px',
                  lineHeight: 1,
                  color: colors.quoteIcon,
                  display: 'block',
                  marginBottom: '8px',
                  opacity: 0.85,
                }}
              >
                ❝
              </span>

              <p
                style={{
                  color: colors.muted,
                  fontSize: '15px',
                  lineHeight: 1.75,
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                {testimonial.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Avatar circle */}
                <div
                  aria-hidden="true"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '16px',
                    flexShrink: 0,
                    fontFamily: "'Arial', sans-serif",
                  }}
                >
                  {testimonial.initial}
                </div>
                <div>
                  <p
                    style={{
                      color: colors.accent,
                      fontWeight: '700',
                      fontSize: '15px',
                      marginBottom: '2px',
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p style={{ color: colors.muted, fontSize: '13px', margin: 0 }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div
              style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === activeIdx ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: i === activeIdx ? colors.accent : colors.border,
                    transition: 'width 0.25s ease, background-color 0.2s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div className="contact-col">
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: '700',
                color: colors.text,
                marginBottom: '24px',
              }}
            >
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px',
                  marginBottom: '14px',
                }}
                className="form-field"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{
                    backgroundColor: colors.inputBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    padding: '14px 16px',
                    fontSize: '14px',
                    color: colors.text,
                    fontFamily: 'inherit',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  aria-label="Your name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{
                    backgroundColor: colors.inputBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    padding: '14px 16px',
                    fontSize: '14px',
                    color: colors.text,
                    fontFamily: 'inherit',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  aria-label="Your email"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="form-input form-field"
                style={{
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '14px 16px',
                  fontSize: '14px',
                  color: colors.text,
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '14px',
                  display: 'block',
                }}
                aria-label="Your message"
              />

              {/* Submit */}
              <button
                type="submit"
                className="submit-btn form-field"
                style={{
                  backgroundColor: colors.accent,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  width: '100%',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  letterSpacing: '0.3px',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.accentDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accent)}
              >
                Send Message
              </button>
            </form>

            {/* Divider */}
            <hr
              style={{
                border: 'none',
                borderTop: `1px solid ${colors.border}`,
                margin: '28px 0',
              }}
            />

            {/* Contact info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke={colors.accent}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
                <a
                  href="mailto:deepak.dev01@gmail.com"
                  style={{ color: colors.text, fontSize: '14px', textDecoration: 'none' }}
                  className="card-link"
                >
                  deepak.dev01@gmail.com
                </a>
              </div>

              <span aria-hidden="true" style={{ color: colors.border }}>|</span>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub" style={{ color: colors.accent }}
                  className="social-icon"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn" style={{ color: colors.accent }}
                  className="social-icon"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feedback