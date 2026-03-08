export default function InfoCard({ title, icon, children }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.icon}>{icon}</span>
        <span style={styles.title}>{title}</span>
      </div>
      <div style={styles.body}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 18px",
    borderBottom: "1px solid var(--border)",
    background: "rgba(255,255,255,0.02)",
  },
  icon: {
    fontSize: "14px",
  },
  title: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
  },
  body: {
    padding: "18px",
  },
}