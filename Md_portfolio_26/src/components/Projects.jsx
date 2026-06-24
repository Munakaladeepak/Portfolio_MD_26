import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../hooks/useGSAP'

// Import project screenshots
import hostelMgmtImg from '../images/Project_images/Screenshot (253).png'
import webDevSpaceImg from '../images/Project_images/Screenshot (255).png'
import manageLandingImg from '../images/Project_images/Screenshot 2026-06-24 230341.png'

/**
 * Projects — three project cards updated with actual screenshot images.
 *
 * GSAP ScrollTrigger:
 *  - Section heading fades up
 *  - Cards stagger from below (play once on enter)
 */
const PROJECTS = [
  {
    id: 1,
    title: 'Hostel Management System',
    description:
      'A robust hostel management portal built using PHP for secure backend business logic, and Bootstrap, HTML, and CSS for a highly responsive, user-friendly frontend dashboard.',
    liveLink: 'https://hostelmanagement9652.liveblog365.com/Dashboard.html',
    githubLink: 'https://github.com/Munakaladeepak/Hostel_Mangement_php',
    image: hostelMgmtImg,
  },
  {
    id: 2,
    title: 'Manage Landing Page',
    description:
      'A premium, fully responsive front-end landing page created for the brand "Manage," featuring smooth hover effects, custom layouts, and clean CSS styling for cross-device compatibility.',
    liveLink: 'https://manage-landing-page-inky-omega.vercel.app/',
    githubLink: 'https://github.com/Munakaladeepak/Manage_landing_page',
    image: manageLandingImg,
  },
  {
    id: 3,
    title: 'Web Dev Space',
    description:
      'An interactive learning platform designed for students to master web development effectively, containing essential layout components, interactive code resources, and guide materials.',
    liveLink: 'https://web-dev-space.vercel.app/',
    githubLink: 'https://github.com/Munakaladeepak/Web_Dev_Space',
    image: webDevSpaceImg,
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
              overflow: 'hidden',
            }}
          >
            {/* Project Image */}
            <div
              className="project-card-image"
              style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#e8ddd0' }}
              aria-hidden="true"
            >
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
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