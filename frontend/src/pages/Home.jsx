import { useState } from "react"

const EXAMPLES = ["8.8.8.8", "1.1.1.1", "github.com", "cloudflare.com"]

const SOURCES = [
    { name: "Shodan", desc: "Infrastructure & ports" },
    { name: "VirusTotal", desc: "Threat reputation" },
    { name: "IPInfo", desc: "Geolocation & ASN" },
    { name: "HIBP", desc: "Breach detection" },
]

export default function Home({ onSearch, loading, error }) {
    const [query, setQuery] = useState("")

    function handleSubmit() {
        if (query.trim()) onSearch(query.trim())
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSubmit()
    }

  return (
    <div style={styles.container}>
      <div style={styles.grid} />

      <div style={styles.content}>
        <div style={styles.badge}>OSINT INTELLIGENCE PLATFORM</div>

        <h1 style={styles.title}>
          VANTIS
        </h1>

        <p style={styles.subtitle}>
          Search any IP or domain. Get a complete<br />
          exposure report powered by multiple intelligence sources.
        </p>

        <div style={styles.searchWrapper}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter IP address or domain..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              style={{
                ...styles.button,
                ...(loading ? styles.buttonLoading : {})
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "SCANNING..." : "ANALYZE"}
            </button>
          </div>

          <div style={styles.examples}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                style={styles.exampleBtn}
                onClick={() => {
                  setQuery(ex)
                  onSearch(ex)
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.sources}>
          {SOURCES.map((s) => (
            <div key={s.name} style={styles.sourceCard}>
              <div style={styles.sourceDot} />
              <div>
                <div style={styles.sourceName}>{s.name}</div>
                <div style={styles.sourceDesc}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error && (
        <div style={styles.error}>
          ⚠ {error}
        </div>
      )}
    </div>
  )
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-primary)",
    },
    grid: {
        position: "absolute",
        inset: 0,
        backgroundImage: `
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        opacity: 0.3,
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
    },
    content: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "40px 20px",
        maxWidth: "680px",
        width: "100%",
    },
    badge: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.15em",
        color: "var(--accent)",
        border: "1px solid var(--accent-glow)",
        background: "var(--accent-glow)",
        padding: "6px 14px",
        borderRadius: "4px",
    },
    title: {
        fontFamily: "var(--font-display)",
        fontSize: "clamp(64px, 12vw, 112px)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        color: "var(--text-primary)",
        lineHeight: 1,
        textAlign: "center",
    },
    subtitle: {
        fontFamily: "var(--font-mono)",
        fontSize: "14px",
        color: "var(--text-secondary)",
        textAlign: "center",
        lineHeight: 1.7,
        letterSpacing: "0.01em",
    },
    searchWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "8px",
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        background: "var(--bg-card)",
        border: "1px solid var(--border-bright)",
        borderRadius: "8px",
        padding: "6px 6px 6px 16px",
        gap: "12px",
        transition: "border-color 0.2s",
    },
    searchIcon: {
        color: "var(--text-muted)",
        fontSize: "20px",
        fontFamily: "var(--font-mono)",
    },
    input: {
        flex: 1,
        background: "none",
        border: "none",
        outline: "none",
        color: "var(--text-primary)",
        fontFamily: "var(--font-mono)",
        fontSize: "15px",
        letterSpacing: "0.02em",
    },
    button: {
        background: "var(--accent)",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "10px 20px",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "12px",
        letterSpacing: "0.1em",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "opacity 0.2s",
    },
    buttonLoading: {
        opacity: 0.6,
        cursor: "not-allowed",
    },
      examples: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
    },
    exampleBtn: {
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--text-secondary)",
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "5px 12px",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    sources: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        width: "100%",
        marginTop: "16px",
    },
    sourceCard: {
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "14px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
    },
    sourceDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "var(--success)",
        marginTop: "4px",
        flexShrink: 0,
    },
    sourceName: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "13px",
        color: "var(--text-primary)",
    },
    sourceDesc: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-muted)",
        marginTop: "2px",
    },
    error: {
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--danger)",
      background: "rgba(248, 81, 73, 0.08)",
      border: "1px solid rgba(248, 81, 73, 0.2)",
      borderRadius: "6px",
      padding: "12px 16px",
      width: "100%",
      textAlign: "center",
    },
}