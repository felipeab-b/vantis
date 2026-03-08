export default function RiskBadge({ level }) {
  const config = {
    LOW: {
      label: "LOW RISK",
      color: "var(--success)",
      bg: "rgba(63, 185, 80, 0.1)",
      border: "rgba(63, 185, 80, 0.3)",
    },
    MEDIUM: {
      label: "MEDIUM RISK",
      color: "var(--warning)",
      bg: "rgba(210, 153, 34, 0.1)",
      border: "rgba(210, 153, 34, 0.3)",
    },
    HIGH: {
      label: "HIGH RISK",
      color: "var(--danger)",
      bg: "rgba(248, 81, 73, 0.1)",
      border: "rgba(248, 81, 73, 0.3)",
    },
  }

  const c = config[level?.toUpperCase()] || config.LOW

  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.12em",
      color: c.color,
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "4px",
      padding: "4px 10px",
    }}>
      {c.label}
    </span>
  )
}