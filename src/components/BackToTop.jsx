import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * BackToTop — floating circular button that appears after 400px of scroll.
 * GSAP animates its entry/exit with a spring ease.
 * CSS hover handled in App.css (.back-to-top).
 * Respects prefers-reduced-motion.
 */
const BackToTop = () => {
  const btnRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Show/hide on scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animate in/out
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    if (prefersReducedMotion) {
      btn.style.opacity = visible ? '1' : '0'
      btn.style.pointerEvents = visible ? 'auto' : 'none'
      return
    }

    if (visible) {
      gsap.to(btn, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(1.7)',
      })
    } else {
      gsap.to(btn, {
        autoAlpha: 0,
        scale: 0.7,
        duration: 0.25,
        ease: 'power2.in',
      })
    }
  }, [visible, prefersReducedMotion])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="back-to-top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent)',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(181, 69, 27, 0.38)',
        opacity: 0,
        visibility: 'hidden',
        transform: 'scale(0.7)',
      }}
    >
      {/* Up chevron */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

export default BackToTop
