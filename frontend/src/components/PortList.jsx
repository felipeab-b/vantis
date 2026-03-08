const PORT_INFO = {
  21: { name: "FTP", risk: "high" },
  22: { name: "SSH", risk: "medium" },
  23: { name: "Telnet", risk: "high" },
  25: { name: "SMTP", risk: "medium" },
  53: { name: "DNS", risk: "low" },
  80: { name: "HTTP", risk: "low" },
  443: { name: "HTTPS", risk: "low" },
  3306: { name: "MySQL", risk: "high" },
  3389: { name: "RDP", risk: "high" },
  5432: { name: "PostgreSQL", risk: "high" },
  6379: { name: "Redis", risk: "high" },
  8080: { name: "HTTP Alt", risk: "medium" },
  8443: { name: "HTTPS Alt", risk: "low" },
  27017: { name: "MongoDB", risk: "high" },
}

const RISK_COLORS = {
  low: "var(--success)",
  medium: "var(--warning)",
  high: "var(--danger)",
}

export default function PortsList({ ports = [] }) {
  if (!ports.length) {
    return (
      <p style={styles.empty}>No open ports detected</p>
    )
  }

  return (
    <div style={styles.grid}>
      {ports.map((port) => {
        const info = PORT_INFO[port] || { name: "Unknown", risk: "medium" }
        return (
          <div key={port} style={styles.portCard}>
            <span style={{
              ...styles.dot,
              background: RISK_COLORS[info.risk]
            }} />
            <div>
              <div style={styles.portNumber}>{port}</div>
              <div style={styles.portName}>{info.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  portCard: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    padding: "8px 12px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  portNumber: {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--text-primary)",
  },
  portName: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--text-muted)",
    marginTop: "2px",
  },
  empty: {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--text-muted)",
  },
}