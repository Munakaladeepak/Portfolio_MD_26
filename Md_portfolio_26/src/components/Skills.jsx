import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

/**
 * Skills — three-column card layout: Frontend, Backend, Tools.
 * Botanical SVG illustration preserved from original design.
 *
 * GSAP ScrollTrigger:
 *  - Section heading fades up
 *  - Each skill card staggers in from below
 *  - Each skill item staggers in from left within its card
 *
 * Hover lift handled by CSS in App.css (.skill-card).
 */
const FRONTEND_SKILLS = [
  'HTML5 & CSS3',
  'JavaScript (ES2024)',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Responsive Design',
]

const BACKEND_SKILLS = [
  'Node.js',
  'Express.js',
  'MongoDB',
  'SQL / PostgreSQL',
  'REST APIs',
  'JWT Auth',
]

const TOOLS_SKILLS = [
  'Git & GitHub',
  'VS Code',
  'Figma',
  'Vite',
  'Postman',
  'Linux CLI',
]

const SKILL_CATEGORIES = [
  { label: 'Frontend',  skills: FRONTEND_SKILLS,  icon: '⚡' },
  { label: 'Backend',   skills: BACKEND_SKILLS,   icon: '⚙️' },
  { label: 'Tools',     skills: TOOLS_SKILLS,      icon: '🛠️' },
]

const Skills = () => {
  const skillsRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      const commonTrigger = {
        start: 'top 80%',
        toggleActions: 'play none none none',
      }

      // Section heading
      gsap.from('.skills-heading', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-heading', ...commonTrigger },
      })

      // Cards stagger
      gsap.from('.skill-card', {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-cards', start: 'top 80%', toggleActions: 'play none none none' },
      })

      // Skill items stagger within cards
      gsap.from('.skill-item', {
        x: -18,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.035,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-cards', start: 'top 72%', toggleActions: 'play none none none' },
      })
    },
    { scope: skillsRef }
  )

  return (
    <section
      ref={skillsRef}
      id="skills"
      aria-label="Skills and tools"
      style={{
        backgroundColor: '#f5f0e8',
        padding: '72px 48px',
        fontFamily: "'Georgia', serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <h2
        className="skills-heading"
        style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: '700',
          color: '#1a1208',
          marginBottom: '40px',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}
      >
        Skills &amp; Craft
      </h2>

      {/* Cards grid */}
      <div
        className="skills-cards"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="skill-card"
            style={{
              backgroundColor: '#faf7f2',
              border: '1px solid #e8ddd0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{ fontSize: '1.4rem' }}
                role="img"
                aria-hidden="true"
              >
                {cat.icon}
              </span>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: '700',
                  letterSpacing: '0.15em',
                  color: '#9c7a4a',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {cat.label}
              </p>
            </div>

            {/* Skill items */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cat.skills.map((skill) => (
                <li
                  key={skill}
                  className="skill-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    color: '#2b1f0e',
                    fontFamily: "'Arial', sans-serif",
                    fontWeight: '400',
                    padding: '5px 0',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#b85c38',
                      flexShrink: 0,
                    }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Botanical SVG illustration — preserved from original */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          top: 0,
          width: '220px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 200 220"
          style={{ width: '200px', height: '220px', opacity: 0.45 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          aria-hidden="true"
        >
          {/* Main stem */}
          <path d="M110 210 C108 180 105 150 100 120 C95 90 88 65 80 40" stroke="#b89a6a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Branch right upper */}
          <path d="M88 60 C100 48 118 42 135 38" stroke="#b89a6a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Leaf upper right */}
          <path d="M135 38 C148 30 165 28 170 35 C165 45 148 50 135 38Z" stroke="#c4a97a" strokeWidth="1" fill="none" />
          <path d="M135 38 L170 35" stroke="#c4a97a" strokeWidth="0.6" />
          <path d="M145 34 L148 42" stroke="#c4a97a" strokeWidth="0.5" />
          <path d="M155 32 L157 40" stroke="#c4a97a" strokeWidth="0.5" />
          {/* Branch left */}
          <path d="M95 80 C82 72 68 70 55 72" stroke="#b89a6a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Leaf left */}
          <path d="M55 72 C42 66 32 58 34 50 C44 48 58 56 55 72Z" stroke="#c4a97a" strokeWidth="1" fill="none" />
          <path d="M55 72 L34 50" stroke="#c4a97a" strokeWidth="0.6" />
          <path d="M46 66 L40 56" stroke="#c4a97a" strokeWidth="0.5" />
          {/* Branch right mid */}
          <path d="M98 100 C112 92 128 90 140 92" stroke="#b89a6a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Leaf right mid */}
          <path d="M140 92 C153 85 165 85 166 93 C160 102 148 102 140 92Z" stroke="#c4a97a" strokeWidth="1" fill="none" />
          <path d="M140 92 L166 93" stroke="#c4a97a" strokeWidth="0.6" />
          <path d="M149 89 L151 97" stroke="#c4a97a" strokeWidth="0.5" />
          <path d="M158 88 L159 96" stroke="#c4a97a" strokeWidth="0.5" />
          {/* Branch left lower */}
          <path d="M102 125 C88 118 74 118 62 122" stroke="#b89a6a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Leaf left lower */}
          <path d="M62 122 C48 116 38 108 40 100 C52 97 65 106 62 122Z" stroke="#c4a97a" strokeWidth="1" fill="none" />
          <path d="M62 122 L40 100" stroke="#c4a97a" strokeWidth="0.6" />
          {/* Top sprig */}
          <path d="M80 40 C76 28 72 18 70 10" stroke="#b89a6a" strokeWidth="1" strokeLinecap="round" />
          <path d="M70 10 C74 4 80 2 84 6 C82 12 76 14 70 10Z" stroke="#c4a97a" strokeWidth="0.8" fill="none" />
          {/* Berries */}
          <circle cx="84" cy="6" r="2" stroke="#c4a97a" strokeWidth="0.8" />
          <circle cx="136" cy="37" r="1.5" stroke="#c4a97a" strokeWidth="0.8" />
          <circle cx="166" cy="93" r="1.5" stroke="#c4a97a" strokeWidth="0.8" />
        </svg>
      </div>
    </section>
  )
}

export default Skills