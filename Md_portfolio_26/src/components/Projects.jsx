import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

/**
 * Projects — three project cards.
 * Education section removed (now lives in Education.jsx).
 *
 * GSAP ScrollTrigger:
 *  - Section heading fades up
 *  - Cards stagger from below (play once on enter)
 *
 * CSS (App.css):
 *  - .project-card      → translateY(-10px) + shadow on hover
 *  - .project-card-image → svg/img scale 1.06 on parent hover
 *  - .card-link         → underline swipe-in on hover
 */
const PROJECTS = [
  {
    id: 1,
    title: 'Task Manager App',
    description:
      'A productivity application to manage tasks, deadlines, and team collaboration efficiently.',
    liveLink: '#',
    githubLink: '#',
    illustration: (
      <svg
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Task Manager App preview"
      >
        <rect width="280" height="160" fill="#d4c4a8" />
        <rect x="0" y="0" width="280" height="160" fill="#c8b896" opacity="0.4" />
        <ellipse cx="220" cy="130" rx="80" ry="60" fill="#7a6040" opacity="0.5" />
        <ellipse cx="30" cy="80" rx="40" ry="60" fill="#5a4a2a" opacity="0.3" />
        <rect x="20" y="20" width="180" height="110" rx="6" fill="#f5f0e8" />
        <rect x="20" y="20" width="180" height="22" rx="6" fill="#2b1f0e" />
        <rect x="20" y="30" width="180" height="12" fill="#2b1f0e" />
        <circle cx="32" cy="31" r="3" fill="#b85c38" />
        <circle cx="44" cy="31" r="3" fill="#c4a97a" />
        <circle cx="56" cy="31" r="3" fill="#7a9a5a" />
        <rect x="20" y="42" width="45" height="88" fill="#e8e0d0" />
        <rect x="25" y="50" width="30" height="4" rx="2" fill="#c4a97a" />
        <rect x="25" y="60" width="25" height="3" rx="1.5" fill="#b89a6a" opacity="0.6" />
        <rect x="25" y="68" width="28" height="3" rx="1.5" fill="#b89a6a" opacity="0.6" />
        <rect x="25" y="76" width="22" height="3" rx="1.5" fill="#b89a6a" opacity="0.6" />
        <rect x="25" y="84" width="26" height="3" rx="1.5" fill="#b89a6a" opacity="0.6" />
        <rect x="72" y="48" width="55" height="28" rx="3" fill="#b85c38" opacity="0.8" />
        <rect x="72" y="82" width="120" height="6" rx="3" fill="#d4c4a8" />
        <rect x="72" y="94" width="100" height="6" rx="3" fill="#d4c4a8" />
        <rect x="72" y="106" width="110" height="6" rx="3" fill="#d4c4a8" />
        <rect x="210" y="110" width="28" height="22" rx="4" fill="#3a2a10" />
        <path d="M238 118 Q248 118 248 124 Q248 130 238 130" stroke="#3a2a10" strokeWidth="2.5" fill="none" />
        <rect x="213" y="107" width="22" height="5" rx="2" fill="#5a4030" />
        <rect x="240" y="90" width="6" height="30" rx="3" fill="#5a7a3a" />
        <ellipse cx="243" cy="80" rx="14" ry="20" fill="#6a8a4a" opacity="0.8" />
        <ellipse cx="235" cy="88" rx="10" ry="14" fill="#5a7a3a" opacity="0.7" />
        <ellipse cx="252" cy="86" rx="10" ry="14" fill="#7a9a5a" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Dev Portfolio',
    description:
      'A personal portfolio website showcasing my work, skills, and experience with clean design.',
    liveLink: '#',
    githubLink: '#',
    illustration: (
      <svg
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Dev Portfolio preview"
      >
        <rect width="280" height="160" fill="#e8dcc8" />
        <ellipse cx="240" cy="140" rx="70" ry="50" fill="#8a5a3a" opacity="0.4" />
        <ellipse cx="10" cy="100" rx="40" ry="80" fill="#c4a060" opacity="0.3" />
        <rect x="15" y="15" width="190" height="120" rx="6" fill="#faf7f2" />
        <rect x="15" y="15" width="190" height="20" rx="6" fill="#e8e0d4" />
        <rect x="15" y="25" width="190" height="10" fill="#e8e0d4" />
        <circle cx="26" cy="25" r="3" fill="#b85c38" />
        <circle cx="37" cy="25" r="3" fill="#c4a97a" />
        <circle cx="48" cy="25" r="3" fill="#7a9a5a" />
        <rect x="130" y="19" width="30" height="5" rx="2" fill="#b85c38" opacity="0.7" />
        <rect x="165" y="19" width="20" height="5" rx="2" fill="#9a8a7a" opacity="0.5" />
        <text x="30" y="60" fontFamily="Georgia, serif" fontSize="11" fill="#2b1f0e" fontWeight="bold">Hello, I'm Deepak</text>
        <rect x="30" y="65" width="60" height="2.5" rx="1" fill="#b85c38" />
        <rect x="30" y="73" width="80" height="3" rx="1.5" fill="#c4b49a" />
        <rect x="30" y="81" width="70" height="3" rx="1.5" fill="#c4b49a" />
        <rect x="30" y="96" width="32" height="12" rx="3" fill="#b85c38" />
        <rect x="68" y="96" width="32" height="12" rx="3" fill="none" stroke="#b85c38" strokeWidth="1.2" />
        <circle cx="155" cy="72" r="14" fill="#c4845a" />
        <rect x="143" y="86" width="24" height="30" rx="4" fill="#b85c38" />
        <rect x="185" y="95" width="5" height="30" rx="2" fill="#5a7a3a" />
        <ellipse cx="188" cy="82" rx="12" ry="18" fill="#6a8a4a" opacity="0.8" />
        <ellipse cx="178" cy="90" rx="9" ry="13" fill="#5a7a3a" opacity="0.7" />
        <ellipse cx="198" cy="88" rx="9" ry="12" fill="#7a9a5a" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'E-Commerce Store',
    description:
      'A full-featured e-commerce platform with cart, checkout, and admin dashboard capabilities.',
    liveLink: '#',
    githubLink: '#',
    illustration: (
      <svg
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="E-Commerce Store preview"
      >
        <rect width="280" height="160" fill="#d4b896" />
        <ellipse cx="250" cy="150" rx="80" ry="55" fill="#7a5030" opacity="0.5" />
        <ellipse cx="0" cy="60" rx="50" ry="70" fill="#c4905a" opacity="0.3" />
        <rect x="15" y="15" width="195" height="120" rx="6" fill="#2a1e10" />
        <rect x="15" y="15" width="195" height="20" rx="6" fill="#1a1208" />
        <rect x="15" y="25" width="195" height="10" fill="#1a1208" />
        <circle cx="26" cy="25" r="3" fill="#b85c38" />
        <circle cx="37" cy="25" r="3" fill="#c4a97a" />
        <circle cx="48" cy="25" r="3" fill="#7a9a5a" />
        <rect x="15" y="35" width="45" height="100" fill="#1e1610" />
        <rect x="20" y="44" width="30" height="3" rx="1.5" fill="#c4a97a" opacity="0.7" />
        <rect x="20" y="52" width="25" height="2.5" rx="1" fill="#8a7a5a" opacity="0.5" />
        <rect x="20" y="59" width="28" height="2.5" rx="1" fill="#8a7a5a" opacity="0.5" />
        <rect x="20" y="66" width="22" height="2.5" rx="1" fill="#8a7a5a" opacity="0.5" />
        <rect x="62" y="38" width="30" height="8" rx="2" fill="#b85c38" opacity="0.8" />
        <rect x="96" y="38" width="30" height="8" rx="2" fill="#3a2a18" />
        <rect x="130" y="38" width="30" height="8" rx="2" fill="#3a2a18" />
        <rect x="62" y="52" width="45" height="55" rx="4" fill="#3a2a18" />
        <ellipse cx="84" cy="68" rx="12" ry="16" fill="#8a6040" />
        <path d="M78 58 Q84 52 90 58" stroke="#c4a97a" strokeWidth="2" fill="none" />
        <rect x="68" y="100" width="33" height="4" rx="2" fill="#b85c38" opacity="0.7" />
        <rect x="113" y="52" width="45" height="55" rx="4" fill="#3a2a18" />
        <ellipse cx="135" cy="90" rx="12" ry="18" fill="#c4785a" />
        <ellipse cx="135" cy="72" rx="6" ry="5" fill="#b86a4a" />
        <rect x="119" y="100" width="33" height="4" rx="2" fill="#c4a97a" opacity="0.5" />
        <rect x="164" y="52" width="42" height="55" rx="4" fill="#3a2a18" />
        <ellipse cx="185" cy="93" rx="13" ry="14" fill="#a06840" />
        <ellipse cx="185" cy="79" rx="7" ry="5" fill="#8a5830" />
        <rect x="170" y="100" width="30" height="4" rx="2" fill="#c4a97a" opacity="0.5" />
      </svg>
    ),
  },
]

const Projects = () => {
  const projectsRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      // Section heading
      gsap.from('.projects-heading', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      // Cards stagger up
      gsap.from('.project-card', {
        y: 55,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: projectsRef }
  )

  return (
    <section
      ref={projectsRef}
      id="projects"
      aria-label="Portfolio projects"
      style={{
        backgroundColor: '#f5f0e8',
        padding: '72px 48px 56px',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h2
        className="projects-heading"
        style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: '700',
          color: '#1a1208',
          fontFamily: "'Georgia', serif",
          marginBottom: '32px',
          letterSpacing: '-0.01em',
        }}
      >
        Projects
      </h2>

      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '22px',
        }}
      >
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="project-card"
            aria-label={`Project: ${project.title}`}
            style={{
              backgroundColor: '#faf7f2',
              borderRadius: '12px',
              border: '1px solid #e8ddd0',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Illustration */}
            <div
              className="project-card-image"
              style={{ width: '100%', aspectRatio: '16/9' }}
              aria-hidden="true"
            >
              {project.illustration}
            </div>

            {/* Body */}
            <div
              style={{
                padding: '18px 20px 22px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: '#1a1208',
                  fontFamily: "'Georgia', serif",
                  marginBottom: '8px',
                }}
              >
                {project.title}
              </h3>

              <div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#e0d4c0',
                  marginBottom: '12px',
                }}
              />

              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#5a4a3a',
                  lineHeight: 1.6,
                  marginBottom: '18px',
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Links */}
              <div style={{ display: 'flex', gap: '28px' }}>
                <a
                  href={project.liveLink}
                  className="card-link"
                  style={{ fontSize: '0.85rem', fontWeight: '600', color: '#b85c38' }}
                  aria-label={`${project.title} live demo`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live&nbsp;→
                </a>
                <a
                  href={project.githubLink}
                  className="card-link"
                  style={{ fontSize: '0.85rem', fontWeight: '600', color: '#b85c38' }}
                  aria-label={`${project.title} GitHub repository`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub&nbsp;→
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects