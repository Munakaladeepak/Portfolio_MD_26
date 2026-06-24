import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * ScrollProgress — thin accent-colored bar fixed at the very top of the viewport.
 * Uses GSAP ScrollTrigger scrub so it perfectly mirrors scroll position.
 * Respects prefers-reduced-motion.
 */
const ScrollProgress = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const bar = barRef.current
    if (!bar) return

    // scaleX from 0 → 1 driven by scroll
    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #B5451B 0%, #c4a97a 100%)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  )
}

export default ScrollProgress
