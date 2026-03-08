export default function AiAnalysis({ text }) {
  if (!text) return null

  return (
    <div style={styles.container}>
      <div style={styles.indicator}>
        <span style={styles.dot} />
        <span style={styles.label}>AI Analysis</span>
      </div>
      <div style={styles.text}>
        {text}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  indicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  dot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--accent)",
  },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    color: "var(--accent)",
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    lineHeight: 1.8,
    color: "var(--text-secondary)",
    whiteSpace: "pre-wrap",
  },
}