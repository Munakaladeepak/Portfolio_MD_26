

const Skills = () => {
  const frontendSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Tailwind",
  ];

  const backendSkills = ["Node.js", "Express", "MongoDB", "SQL", "REST APIs"];

  const styles = {
    section: {
      backgroundColor: "#f5f0e8",
      padding: "48px 48px",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
      minHeight: "220px",
    },
    heading: {
      fontSize: "clamp(2rem, 5vw, 2.8rem)",
      fontWeight: "700",
      color: "#1a1208",
      marginBottom: "32px",
      letterSpacing: "-0.01em",
      lineHeight: "1.1",
    },
    columnsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0",
    },
    column: {
      flex: "1 1 180px",
      paddingRight: "40px",
    },
    columnWithDivider: {
      flex: "1 1 180px",
      paddingLeft: "40px",
      borderLeft: "1px solid #c9b99a",
    },
    columnLabel: {
      fontSize: "0.7rem",
      fontFamily: "'Arial', sans-serif",
      fontWeight: "600",
      letterSpacing: "0.15em",
      color: "#9c7a4a",
      textTransform: "uppercase",
      marginBottom: "14px",
    },
    list: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "0.95rem",
      color: "#2b1f0e",
      fontFamily: "'Arial', sans-serif",
      fontWeight: "400",
      padding: "4px 0",
    },
    bullet: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      backgroundColor: "#b85c38",
      flexShrink: "0",
    },
    botanicalWrapper: {
      position: "absolute",
      right: "0",
      bottom: "0",
      top: "0",
      width: "220px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      pointerEvents: "none",
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Skills &amp; Craft</h2>

      <div style={styles.columnsWrapper}>
        {/* Frontend Column */}
        <div style={styles.column}>
          <p style={styles.columnLabel}>Frontend</p>
          <ul style={styles.list}>
            {frontendSkills.map((skill) => (
              <li key={skill} style={styles.listItem}>
                <span style={styles.bullet} />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Backend Column */}
        <div style={styles.columnWithDivider}>
          <p style={styles.columnLabel}>Backend</p>
          <ul style={styles.list}>
            {backendSkills.map((skill) => (
              <li key={skill} style={styles.listItem}>
                <span style={styles.bullet} />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botanical SVG Illustration */}
      <div style={styles.botanicalWrapper}>
        <svg
          viewBox="0 0 200 220"
          style={{ width: "200px", height: "220px", opacity: 0.55 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          {/* Main stem */}
          <path
            d="M110 210 C108 180 105 150 100 120 C95 90 88 65 80 40"
            stroke="#b89a6a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Branch right upper */}
          <path
            d="M88 60 C100 48 118 42 135 38"
            stroke="#b89a6a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Leaf upper right large */}
          <path
            d="M135 38 C148 30 165 28 170 35 C165 45 148 50 135 38Z"
            stroke="#c4a97a"
            strokeWidth="1"
            fill="none"
          />
          <path d="M135 38 L170 35" stroke="#c4a97a" strokeWidth="0.6" />
          <path d="M145 34 L148 42" stroke="#c4a97a" strokeWidth="0.5" />
          <path d="M155 32 L157 40" stroke="#c4a97a" strokeWidth="0.5" />

          {/* Branch left */}
          <path
            d="M95 80 C82 72 68 70 55 72"
            stroke="#b89a6a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Leaf left */}
          <path
            d="M55 72 C42 66 32 58 34 50 C44 48 58 56 55 72Z"
            stroke="#c4a97a"
            strokeWidth="1"
            fill="none"
          />
          <path d="M55 72 L34 50" stroke="#c4a97a" strokeWidth="0.6" />
          <path d="M46 66 L40 56" stroke="#c4a97a" strokeWidth="0.5" />

          {/* Branch right mid */}
          <path
            d="M98 100 C112 92 128 90 140 92"
            stroke="#b89a6a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Leaf right mid */}
          <path
            d="M140 92 C153 85 165 85 166 93 C160 102 148 102 140 92Z"
            stroke="#c4a97a"
            strokeWidth="1"
            fill="none"
          />
          <path d="M140 92 L166 93" stroke="#c4a97a" strokeWidth="0.6" />
          <path d="M149 89 L151 97" stroke="#c4a97a" strokeWidth="0.5" />
          <path d="M158 88 L159 96" stroke="#c4a97a" strokeWidth="0.5" />

          {/* Branch left lower */}
          <path
            d="M102 125 C88 118 74 118 62 122"
            stroke="#b89a6a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Leaf left lower */}
          <path
            d="M62 122 C48 116 38 108 40 100 C52 97 65 106 62 122Z"
            stroke="#c4a97a"
            strokeWidth="1"
            fill="none"
          />
          <path d="M62 122 L40 100" stroke="#c4a97a" strokeWidth="0.6" />

          {/* Small top sprig */}
          <path
            d="M80 40 C76 28 72 18 70 10"
            stroke="#b89a6a"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M70 10 C74 4 80 2 84 6 C82 12 76 14 70 10Z"
            stroke="#c4a97a"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Tiny berries / buds */}
          <circle cx="84" cy="6" r="2" stroke="#c4a97a" strokeWidth="0.8" />
          <circle cx="136" cy="37" r="1.5" stroke="#c4a97a" strokeWidth="0.8" />
          <circle cx="166" cy="93" r="1.5" stroke="#c4a97a" strokeWidth="0.8" />
        </svg>
      </div>
    </section>
  );
};

export default Skills;