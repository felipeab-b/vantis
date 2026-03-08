import AiAnalysis from "../components/AiAnalysis"
import InfoCard from "../components/InfoCard"
import PortsList from "../components/PortList"
import RiskBadge from "../components/RiskBadge"


function extractRiskLevel(aiText) {
  if (!aiText) return "LOW"
  const upper = aiText.toUpperCase()
  if (upper.includes("ALTO") || upper.includes("HIGH")) return "HIGH"
  if (upper.includes("MÉDIO") || upper.includes("MEDIO") || upper.includes("MEDIUM")) return "MEDIUM"
  return "LOW"
}

function Row({ label, value }) {
  if (!value) return null
  return (
    <div style={styles.row}>
      <span style={styles.rowLabel}>{label}</span>
      <span style={styles.rowValue}>{value}</span>
    </div>
  )
}

export default function Report({ data, onBack }) {
  if (!data) return null

  const ip = data.ip_info || {}
  const shodan = data.shodan || {}
  const vt = data.virustotal?.data?.attributes || {}
  const breaches = data.breaches || []
  const riskLevel = extractRiskLevel(data.ai_analysis)

  return (
    <div style={styles.container}>
      <div style={styles.inner}>

        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>
            ← Back
          </button>
          <div style={styles.headerInfo}>
            <h1 style={styles.query}>{data.query}</h1>
            <div style={styles.meta}>
              <RiskBadge level={riskLevel} />
              {ip.org && (
                <span style={styles.org}>{ip.org}</span>
              )}
            </div>
          </div>
        </div>

        <div style={styles.grid}>

          <div style={styles.colLeft}>
            <InfoCard title="AI Analysis" icon="◈">
              <AiAnalysis text={data.ai_analysis} />
            </InfoCard>

            <InfoCard title="Open Ports" icon="⬡">
              <PortsList ports={shodan.ports || []} />
            </InfoCard>

            {breaches.length > 0 && (
              <InfoCard title="Data Breaches" icon="⚠">
                <p style={styles.breachCount}>
                  {breaches.length} breach{breaches.length > 1 ? "es" : ""} found
                </p>
              </InfoCard>
            )}
          </div>

          <div style={styles.colRight}>
            <InfoCard title="Location & Network" icon="◎">
              <Row label="IP" value={ip.ip} />
              <Row label="Hostname" value={ip.hostname} />
              <Row label="City" value={ip.city} />
              <Row label="Region" value={ip.region} />
              <Row label="Country" value={ip.country} />
              <Row label="Organization" value={ip.org} />
              <Row label="Timezone" value={ip.timezone} />
            </InfoCard>

            <InfoCard title="Threat Intelligence" icon="◉">
              <Row
                label="Malicious"
                value={vt.last_analysis_stats?.malicious ?? "—"}
              />
              <Row
                label="Suspicious"
                value={vt.last_analysis_stats?.suspicious ?? "—"}
              />
              <Row
                label="Harmless"
                value={vt.last_analysis_stats?.harmless ?? "—"}
              />
              <Row
                label="Reputation"
                value={vt.reputation ?? "—"}
              />
              <Row
                label="ASN"
                value={shodan.asn}
              />
              <Row
                label="ISP"
                value={shodan.isp}
              />
            </InfoCard>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    padding: "32px 20px",
  },
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  backBtn: {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--text-secondary)",
    background: "none",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    marginTop: "4px",
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  query: {
    fontFamily: "var(--font-mono)",
    fontSize: "clamp(22px, 4vw, 36px)",
    fontWeight: 500,
    color: "var(--text-primary)",
    letterSpacing: "0.02em",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  org: {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--text-muted)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "16px",
    alignItems: "start",
  },
  colLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  colRight: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid var(--border)",
    gap: "16px",
  },
  rowLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    flexShrink: 0,
  },
  rowValue: {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--text-primary)",
    textAlign: "right",
    wordBreak: "break-all",
  },
  breachCount: {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--danger)",
  },
}