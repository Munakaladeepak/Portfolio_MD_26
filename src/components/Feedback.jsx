import { useState, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

// ─── Inspirational quotes data ───────────────────────────────────────────────
const QUOTES = [
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
]

// ─── Design tokens (unchanged from original) ─────────────────────────────────
const colors = {
  bg:        '#F5F0E8',
  accent:    '#A0522D',
  accentDark:'#7B3F22',
  text:      '#2C2C2C',
  muted:     '#6B6B6B',
  border:    '#D6CFC4',
  cardBg:    '#FDFAF5',
  quoteIcon: '#C4956A',
  inputBg:   '#FFFFFF',
  errorText: '#B91C1C',
  errorBg:   '#FEF2F2',
  successBg: '#F0FDF4',
  successText:'#15803D',
}

// ─── Email validation helper ──────────────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

// ─── Sanitize: trim + basic strip ────────────────────────────────────────────
const sanitize = (str) => str.trim().replace(/[<>]/g, '')

// ─── Initial form state ───────────────────────────────────────────────────────
const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '', subject: '', message: '' }

/**
 * Feedback — Inspirational Quotes + Contact Form section.
 *
 * GSAP ScrollTrigger:
 *  - Section heading fades up
 *  - Quote cards stagger up
 *  - Form fields stagger up
 *  - Contact column slides from right
 *
 * FormSubmit (AJAX):
 *  - POST to https://formsubmit.co/ajax/munakaladeepak@gmail.com
 *  - No page redirect, no CAPTCHA
 *  - Honeypot spam protection
 *  - Client-side validation with inline error messages
 *  - Loading / success / error states with GSAP fade-in
 */
const Feedback = () => {
  // ── Quote carousel state ─────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0)
  const quoteCardRef              = useRef(null)

  // ── Form state ───────────────────────────────────────────────────────────
  const [form,     setForm]     = useState(INITIAL_FORM)
  const [errors,   setErrors]   = useState(INITIAL_ERRORS)
  const [status,   setStatus]   = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [submitting, setSubmitting] = useState(false)

  // ── Refs ─────────────────────────────────────────────────────────────────
  const feedbackRef  = useRef(null)
  const notifRef     = useRef(null)

  const quote = QUOTES[activeIdx]

  // ── Quote crossfade (unchanged) ──────────────────────────────────────────
  const goTo = (idx) => {
    const card = quoteCardRef.current
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

  // ── Animate notification banner (success / error) ─────────────────────────
  const animateNotif = useCallback(() => {
    if (!notifRef.current) return
    gsap.fromTo(
      notifRef.current,
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    )
  }, [])

  // ── Field change handler ──────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // ── Client-side validation ────────────────────────────────────────────────
  const validate = () => {
    const errs = { name: '', email: '', subject: '', message: '' }
    let valid = true

    if (!form.name.trim()) {
      errs.name = 'Full name is required.'
      valid = false
    }
    if (!form.email.trim()) {
      errs.email = 'Email address is required.'
      valid = false
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Please enter a valid email address.'
      valid = false
    }
    if (!form.subject.trim()) {
      errs.subject = 'Subject is required.'
      valid = false
    }
    if (!form.message.trim()) {
      errs.message = 'Message cannot be empty.'
      valid = false
    }

    setErrors(errs)
    return valid
  }

  // ── Form submission via AJAX fetch ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent duplicate rapid submissions
    if (submitting) return

    // Client-side validation
    if (!validate()) return

    setSubmitting(true)
    setStatus('loading')

    // Build sanitized payload
    const payload = {
      name:    sanitize(form.name),
      email:   sanitize(form.email),
      subject: sanitize(form.subject),
      message: sanitize(form.message),
      // FormSubmit hidden config fields
      _subject:  'New Portfolio Contact Form Submission',
      _captcha:  'false',
      // Honeypot — must remain empty to pass spam filter
      _honey:    '',
    }

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/munakaladeepak@gmail.com',
        {
          method:  'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept:         'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        setStatus('success')
        setForm(INITIAL_FORM)
        setErrors(INITIAL_ERRORS)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Animate the notification whenever status changes ──────────────────────
  // We use a layout-effect-like pattern via the GSAP hook dependency
  useGSAP(
    () => { if (status === 'success' || status === 'error') animateNotif() },
    { dependencies: [status] }
  )

  // ── ScrollTrigger animations (unchanged from original) ───────────────────
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

      gsap.from('.feedback-subtitle', {
        y: 20, autoAlpha: 0, duration: 0.6, ease: 'power2.out', delay: 0.15,
        scrollTrigger: { trigger: '.feedback-heading', ...trigger },
      })

      gsap.from('.quote-card', {
        y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.quotes-grid', start: 'top 82%', toggleActions: 'play none none none' },
      })

      gsap.from('.contact-col', {
        x: 40, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-col', ...trigger },
      })

      gsap.from('.form-field', {
        y: 22, autoAlpha: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-col', start: 'top 78%', toggleActions: 'play none none none' },
      })
    },
    { scope: feedbackRef }
  )

  // ── Shared input style (unchanged from original) ─────────────────────────
  const inputStyle = {
    backgroundColor: colors.inputBg,
    border:          `1px solid ${colors.border}`,
    borderRadius:    '8px',
    padding:         '14px 16px',
    fontSize:        '14px',
    color:           colors.text,
    fontFamily:      'inherit',
    width:           '100%',
    boxSizing:       'border-box',
  }

  // ── Derived button state ─────────────────────────────────────────────────
  const isLoading = status === 'loading' || submitting

  return (
    <section
      ref={feedbackRef}
      id="contact"
      aria-label="Inspirational Quotes and Contact"
      style={{
        backgroundColor: colors.bg,
        padding:         '72px 24px',
        fontFamily:      "'Georgia', serif",
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>

        {/* ── Section heading ── */}
        <h2
          className="feedback-heading"
          style={{
            fontSize:      'clamp(28px, 4vw, 42px)',
            fontWeight:    '700',
            color:         colors.text,
            marginBottom:  '12px',
            letterSpacing: '-0.5px',
            lineHeight:    1.15,
          }}
        >
          Inspirational Quotes
        </h2>
        <p
          className="feedback-subtitle"
          style={{
            color:        colors.muted,
            fontSize:     '1rem',
            lineHeight:   1.7,
            marginBottom: '48px',
            maxWidth:     '620px',
          }}
        >
          A few principles and ideas that inspire my approach to learning, building, and solving problems.
        </p>

        {/* ── Quotes carousel ── */}
        <div className="quotes-carousel" style={{ marginBottom: '72px' }}>

          {/* Single quote card */}
          <div
            ref={quoteCardRef}
            className="quote-card"
            style={{
              backgroundColor: colors.cardBg,
              border:          `1px solid ${colors.border}`,
              borderRadius:    '14px',
              padding:         '28px 26px 24px',
              boxShadow:       '0 2px 14px rgba(0,0,0,0.05)',
              marginBottom:    '20px',
            }}
          >
            {/* Opening quote mark */}
            <span
              aria-hidden="true"
              style={{
                fontSize:     '52px',
                lineHeight:   1,
                color:        colors.quoteIcon,
                display:      'block',
                marginBottom: '8px',
                opacity:      0.85,
              }}
            >
              ❝
            </span>

            {/* Quote text */}
            <p
              style={{
                color:        colors.muted,
                fontSize:     '15px',
                lineHeight:   1.75,
                marginBottom: '24px',
                fontStyle:    'italic',
              }}
            >
              {quote.text}
            </p>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Accent dot avatar */}
              <div
                aria-hidden="true"
                style={{
                  width:           '42px',
                  height:          '42px',
                  borderRadius:    '50%',
                  backgroundColor: colors.accent,
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  color:           '#fff',
                  fontWeight:      '700',
                  fontSize:        '16px',
                  flexShrink:      0,
                  fontFamily:      "'Arial', sans-serif",
                }}
              >
                {quote.author[0]}
              </div>
              <div>
                <p style={{ color: colors.accent, fontWeight: '700', fontSize: '15px', marginBottom: '2px' }}>
                  {quote.author}
                </p>
              </div>
            </div>
          </div>

          {/* Dot navigation */}
          <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
            role="tablist"
            aria-label="Quote navigation"
          >
            {QUOTES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Quote ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width:           i === activeIdx ? '28px' : '10px',
                  height:          '10px',
                  borderRadius:    '5px',
                  border:          'none',
                  cursor:          'pointer',
                  backgroundColor: i === activeIdx ? colors.accent : colors.border,
                  transition:      'width 0.25s ease, background-color 0.2s ease',
                  padding:         0,
                }}
              />
            ))}
          </div>

        </div>

        {/* ── Contact form ── */}
        <div className="contact-col">
          <h3
            style={{
              fontSize:     '1.35rem',
              fontWeight:   '700',
              color:        colors.text,
              marginBottom: '24px',
            }}
          >
            Let&rsquo;s Connect
          </h3>

          {/* ── Notification banner (success / error) ── */}
          {(status === 'success' || status === 'error') && (
            <div
              ref={notifRef}
              role="alert"
              aria-live="polite"
              style={{
                padding:         '14px 18px',
                borderRadius:    '8px',
                marginBottom:    '20px',
                fontSize:        '14px',
                fontWeight:      '600',
                backgroundColor: status === 'success' ? colors.successBg : colors.errorBg,
                color:           status === 'success' ? colors.successText : colors.errorText,
                border:          `1px solid ${status === 'success' ? '#BBF7D0' : '#FECACA'}`,
                display:         'flex',
                alignItems:      'center',
                gap:             '10px',
              }}
            >
              {/* Icon */}
              <span aria-hidden="true" style={{ fontSize: '18px', flexShrink: 0 }}>
                {status === 'success' ? '✓' : '✕'}
              </span>
              {status === 'success'
                ? 'Message sent successfully. Thank you for reaching out.'
                : 'Failed to send message. Please try again later.'}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">

            {/* ── Honeypot field — hidden from users, catches bots ── */}
            <input
              type="text"
              name="_honey"
              defaultValue=""
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />

            {/* ── Name + Email row ── */}
            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap:                 '14px',
                marginBottom:        '14px',
              }}
              className="form-field"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display:      'block',
                    marginBottom: '6px',
                    fontSize:     '13px',
                    fontWeight:   '600',
                    color:        colors.muted,
                  }}
                >
                  Full Name <span aria-hidden="true" style={{ color: colors.errorText }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{
                    ...inputStyle,
                    borderColor: errors.name ? colors.errorText : colors.border,
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  autoComplete="name"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p
                    id="error-name"
                    role="alert"
                    style={{ color: colors.errorText, fontSize: '12px', marginTop: '4px' }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display:      'block',
                    marginBottom: '6px',
                    fontSize:     '13px',
                    fontWeight:   '600',
                    color:        colors.muted,
                  }}
                >
                  Email Address <span aria-hidden="true" style={{ color: colors.errorText }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? colors.errorText : colors.border,
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  autoComplete="email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p
                    id="error-email"
                    role="alert"
                    style={{ color: colors.errorText, fontSize: '12px', marginTop: '4px' }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* ── Subject ── */}
            <div className="form-field" style={{ marginBottom: '14px' }}>
              <label
                htmlFor="contact-subject"
                style={{
                  display:      'block',
                  marginBottom: '6px',
                  fontSize:     '13px',
                  fontWeight:   '600',
                  color:        colors.muted,
                }}
              >
                Subject <span aria-hidden="true" style={{ color: colors.errorText }}>*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="What is this about?"
                value={form.subject}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  ...inputStyle,
                  borderColor: errors.subject ? colors.errorText : colors.border,
                }}
                aria-required="true"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'error-subject' : undefined}
                disabled={isLoading}
              />
              {errors.subject && (
                <p
                  id="error-subject"
                  role="alert"
                  style={{ color: colors.errorText, fontSize: '12px', marginTop: '4px' }}
                >
                  {errors.subject}
                </p>
              )}
            </div>

            {/* ── Message ── */}
            <div className="form-field" style={{ marginBottom: '14px' }}>
              <label
                htmlFor="contact-message"
                style={{
                  display:      'block',
                  marginBottom: '6px',
                  fontSize:     '13px',
                  fontWeight:   '600',
                  color:        colors.muted,
                }}
              >
                Message <span aria-hidden="true" style={{ color: colors.errorText }}>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="form-input"
                style={{
                  ...inputStyle,
                  resize:      'vertical',
                  display:     'block',
                  borderColor: errors.message ? colors.errorText : colors.border,
                }}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'error-message' : undefined}
                disabled={isLoading}
              />
              {errors.message && (
                <p
                  id="error-message"
                  role="alert"
                  style={{ color: colors.errorText, fontSize: '12px', marginTop: '4px' }}
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* ── Submit button ── */}
            <button
              type="submit"
              id="contact-submit"
              className="submit-btn form-field"
              disabled={isLoading}
              aria-disabled={isLoading}
              style={{
                backgroundColor: colors.accent,
                color:           '#FFFFFF',
                border:          'none',
                borderRadius:    '8px',
                padding:         '16px',
                width:           '100%',
                fontSize:        '15px',
                fontWeight:      '700',
                cursor:          isLoading ? 'not-allowed' : 'pointer',
                letterSpacing:   '0.3px',
                fontFamily:      'inherit',
                opacity:         isLoading ? 0.72 : 1,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             '10px',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = colors.accentDark
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent
              }}
            >
              {/* Loading spinner */}
              {isLoading && (
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    animation: 'spin 0.8s linear infinite',
                  }}
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              )}
              {isLoading ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* ── Divider ── */}
          <hr
            style={{
              border:    'none',
              borderTop: `1px solid ${colors.border}`,
              margin:    '28px 0',
            }}
          />

          {/* ── Contact info ── */}
          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '20px',
              flexWrap:   'wrap',
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
                href="mailto:munakaladeepak@gmail.com"
                style={{ color: colors.text, fontSize: '14px', textDecoration: 'none' }}
                className="card-link"
              >
                munakaladeepak@gmail.com
              </a>
            </div>

            <span aria-hidden="true" style={{ color: colors.border }}>|</span>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="https://github.com/Munakaladeepak" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub" style={{ color: colors.accent }}
                className="social-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/m-deepak-7970b931a/" target="_blank" rel="noopener noreferrer"
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
    </section>
  )
}

export default Feedback