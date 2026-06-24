import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '../hooks/useGSAP'
import { IoMdMenu, IoMdClose } from 'react-icons/io'

const NAV_LINKS = [
  { label: 'About',     href: '#about'     },
  { label: 'Skills',    href: '#skills'    },
  { label: 'Projects',  href: '#projects'  },
  { label: 'Education', href: '#education' },
  { label: 'Contact',   href: '#contact'   },
]

/**
 * Navbar — sticky header with:
 *  - GSAP entrance slide-down animation
 *  - Active-section highlighting via IntersectionObserver
 *  - Smooth scroll (offset for sticky nav height)
 *  - Shadow enhancement on scroll
 *  - Mobile hamburger menu with GSAP reveal
 *  - Accessibility: aria-expanded, aria-label, skip-link
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled]     = useState(false)

  const navRef       = useRef(null)
  const mobileMenuRef = useRef(null)

  /* ── Shadow on scroll ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section tracking ── */
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'education', 'contact']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.25, rootMargin: '-70px 0px -20% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  /* ── Mobile menu GSAP animation ── */
  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      menu.style.display = isMenuOpen ? 'flex' : 'none'
      return
    }

    if (isMenuOpen) {
      gsap.set(menu, { display: 'flex', height: 0, autoAlpha: 0 })
      gsap.to(menu, { height: 'auto', autoAlpha: 1, duration: 0.32, ease: 'power2.out' })
      gsap.from(menu.querySelectorAll('a'), {
        y: -12,
        autoAlpha: 0,
        stagger: 0.055,
        duration: 0.28,
        ease: 'power2.out',
        delay: 0.1,
      })
    } else {
      gsap.to(menu, {
        height: 0,
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' }),
      })
    }
  }, [isMenuOpen])

  /* ── Navbar entrance animation ── */
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(navRef.current, {
      y: -80,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, { scope: navRef })

  /* ── Smooth scroll handler ── */
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const navHeight = navRef.current?.offsetHeight ?? 72
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 8
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Skip-to-main accessibility link */}
      <a
        href="#hero"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '8px',
          zIndex: 10000,
          padding: '8px 16px',
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'top 0.2s',
        }}
        onFocus={(e) => (e.currentTarget.style.top = '8px')}
        onBlur={(e) => (e.currentTarget.style.top = '-100px')}
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        id="Nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          transition: 'box-shadow 0.3s ease',
          boxShadow: isScrolled
            ? 'rgba(17,17,26,0.08) 0px 2px 20px'
            : 'rgba(17,17,26,0.05) 0px 1px 0px',
        }}
      >
        {/* ── Main bar ── */}
        <div className="flex flex-row items-center justify-between p-4 md:px-10">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              fontFamily: 'playfair',
              fontSize: '2rem',
              fontWeight: '700',
              fontStyle: 'italic',
              color: 'var(--color-text)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
            aria-label="Deepak — Back to top"
          >
            Deepak
          </a>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex flex-row gap-8 font-semibold text-base"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text)' }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://github.com/Munakaladeepak"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold"
            id="Button"
            aria-label="Visit GitHub profile"
          >
            GitHub ↗
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg"
            id="Button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden flex-col gap-1 px-4 pb-4 overflow-hidden"
          style={{ display: 'none' }}
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeSection === id
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                  backgroundColor: isActive
                    ? 'rgba(181, 69, 27, 0.07)'
                    : 'transparent',
                  transition: 'background-color 0.2s, color 0.2s',
                }}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href="https://github.com/Munakaladeepak"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              marginTop: '8px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '1rem',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            GitHub ↗
          </a>
        </div>
      </header>
    </>
  )
}

export default Navbar
