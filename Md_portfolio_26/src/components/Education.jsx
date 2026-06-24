import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

/**
 * Education — dedicated component extracted from Projects.jsx.
 *
 * GSAP ScrollTrigger timeline animations:
 *  - Heading fades up
 *  - Timeline items slide in from right, staggered
 *  - Timeline dot scales in with spring ease
 *
 * CSS hover: timeline-dot scales on row hover (App.css .timeline-dot).
 */
const EDUCATION = [
  {
    period: '2020',
    title: '10th Grade',
    company: 'The Nandyal Public School',
    points: [
      'Completed 10th grade in the CBSE board with a strong academic record.',
      'Developed foundational skills in mathematics, science, and language arts.',
    ],
  },
  {
    period: '2021 – 2024',
    title: 'Diploma in Computer Science (Polytechnic)',
    company: 'SVR Engineering College',
    points: [
      'Enriched computer science knowledge through a comprehensive diploma programme.',
      'Participated in hands-on projects, building practical programming and software-development skills.',
      'Started the web-development journey, focusing on the MERN stack.',
    ],
  },
  {
    period: '2024 – Present',
    title: 'Bachelor of Technology — Computer Science',
    company: 'Santhiram Engineering College',
    points: [
      'Studying advanced algorithms, data structures, and software engineering.',
      'Competed in multiple coding contests and hackathons.',
      'Gained real-world full-stack experience through collaborative projects.',
    ],
  },
]

const Education = () => {
  const eduRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      // Heading
      gsap.from('.edu-heading', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.edu-heading',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      // Timeline items
      gsap.from('.timeline-item', {
        x: 40,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.edu-timeline',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Timeline dots spring pop
      gsap.from('.timeline-dot', {
        scale: 0,
        duration: 0.45,
        stagger: 0.18,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.edu-timeline',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: eduRef }
  )

  return (
    <section
      ref={eduRef}
      id="education"
      aria-label="Education timeline"
      style={{
        backgroundColor: '#f5f0e8',
        padding: '72px 48px',
        fontFamily: "'Georgia', serif",
        borderTop: '1px solid #e0d4c0',
      }}
    >
      <h2
        className="edu-heading"
        style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: '700',
          color: '#1a1208',
          marginBottom: '40px',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}
      >
        Education
      </h2>

      <div
        className="edu-timeline"
        style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
      >
        {EDUCATION.map((item, idx) => (
          <div
            key={idx}
            className="timeline-item"
            style={{
              display: 'grid',
              gridTemplateColumns: '110px 28px 1fr',
              gap: '0 16px',
              position: 'relative',
            }}
          >
            {/* Period */}
            <div
              style={{
                fontSize: '0.78rem',
                color: '#7a6a5a',
                lineHeight: 1.5,
                paddingTop: '4px',
                textAlign: 'right',
                fontFamily: "'Arial', sans-serif",
              }}
              aria-label={`Period: ${item.period}`}
            >
              {item.period}
            </div>

            {/* Dot + vertical line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                className="timeline-dot"
                aria-hidden="true"
                style={{
                  width: '13px',
                  height: '13px',
                  borderRadius: '50%',
                  backgroundColor: '#b85c38',
                  flexShrink: 0,
                  marginTop: '4px',
                  zIndex: 1,
                }}
              />
              {idx < EDUCATION.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    width: '2px',
                    flex: 1,
                    backgroundColor: '#c4a97a',
                    opacity: 0.45,
                    minHeight: '40px',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: '40px' }}>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#1a1208',
                  fontFamily: "'Georgia', serif",
                  marginBottom: '4px',
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: '#b85c38',
                  fontWeight: '600',
                  fontFamily: "'Arial', sans-serif",
                  marginBottom: '10px',
                }}
              >
                {item.company}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {item.points.map((pt, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.82rem',
                      color: '#5a4a3a',
                      lineHeight: 1.65,
                      fontFamily: "'Arial', sans-serif",
                      marginBottom: '4px',
                      paddingLeft: '12px',
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '7px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#c4a97a',
                      }}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education