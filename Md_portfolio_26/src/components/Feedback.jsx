import { useState } from "react";

const testimonials = [
  {
    quote:
      "Deepak is a highly skilled developer who delivers clean, efficient code. He is proactive, detail-oriented, and a great team player.",
    name: "Anjali Verma",
    role: "Product Manager, TechNova Solutions",
  },
  {
    quote:
      "Working with Deepak was a pleasure. His attention to detail and problem-solving skills are truly impressive.",
    name: "Rahul Mehta",
    role: "CTO, StartupBridge",
  },
];

export default function SkillsAndFeedback() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [activeTestimonial] = useState(0);

  const testimonial = testimonials[activeTestimonial];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  // Color tokens
  const colors = {
    bg: "#F5F0E8",
    accent: "#A0522D",
    accentHover: "#8B4513",
    text: "#2C2C2C",
    muted: "#6B6B6B",
    border: "#D6CFC4",
    cardBg: "#FDFAF5",
    quoteIcon: "#C4956A",
    inputBg: "#FFFFFF",
  };

  return (
    <section
      style={{
        backgroundColor: colors.bg,
        padding: "60px 24px",
        fontFamily: "'Georgia', serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}
        className="feedback-grid"
      >
        {/* LEFT — Testimonial */}
        <div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "28px",
              letterSpacing: "-0.5px",
              lineHeight: "1.15",
            }}
          >
            What People Say
          </h2>

          {/* Card */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "28px 28px 24px",
              position: "relative",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              marginBottom: "24px",
            }}
          >
            {/* Quote mark */}
            <span
              style={{
                fontSize: "52px",
                lineHeight: "1",
                color: colors.quoteIcon,
                fontFamily: "Georgia, serif",
                display: "block",
                marginBottom: "8px",
                opacity: 0.85,
              }}
            >
              ❝
            </span>

            <p
              style={{
                color: colors.muted,
                fontSize: "15px",
                lineHeight: "1.7",
                marginBottom: "20px",
                fontStyle: "italic",
              }}
            >
              {testimonial.quote}
            </p>

            {/* Author row */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
              {/* Decorative plant illustration */}
              <div style={{ flexShrink: 0, fontSize: "36px", lineHeight: "1" }}>🪴</div>
              <div>
                <p
                  style={{
                    color: colors.accent,
                    fontWeight: "600",
                    fontSize: "15px",
                    marginBottom: "2px",
                  }}
                >
                  {testimonial.name}
                </p>
                <p style={{ color: colors.muted, fontSize: "13px" }}>{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Contact Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Name + Email row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                marginBottom: "14px",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  padding: "14px 16px",
                  fontSize: "14px",
                  color: colors.text,
                  outline: "none",
                  fontFamily: "inherit",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  padding: "14px 16px",
                  fontSize: "14px",
                  color: colors.text,
                  outline: "none",
                  fontFamily: "inherit",
                  width: "100%",
                  boxSizing: "border-box",
                }}
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
              style={{
                backgroundColor: colors.inputBg,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                padding: "14px 16px",
                fontSize: "14px",
                color: colors.text,
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                width: "100%",
                boxSizing: "border-box",
                marginBottom: "14px",
                display: "block",
              }}
            />

            {/* Submit */}
            <button
              type="submit"
              style={{
                backgroundColor: colors.accent,
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                width: "100%",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.3px",
                fontFamily: "inherit",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = colors.accentHover)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = colors.accent)}
            >
              Send Message
            </button>
          </form>

          {/* Divider */}
          <hr
            style={{
              border: "none",
              borderTop: `1px solid ${colors.border}`,
              margin: "28px 0",
            }}
          />

          {/* Contact info row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Email */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
              <a
                href="mailto:deepak.dev01@gmail.com"
                style={{
                  color: colors.text,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                deepak.dev01@gmail.com
              </a>
            </div>

            {/* Divider dot */}
            <span style={{ color: colors.border, fontSize: "18px" }}>|</span>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {/* GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                style={{ color: colors.accent }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                style={{ color: colors.accent }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Dribbble */}
              <a
                href="#"
                aria-label="Dribbble"
                style={{ color: colors.accent }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.006-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.176zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.386z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .feedback-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .feedback-grid > div:last-child input,
          .feedback-grid > div:last-child > form > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}