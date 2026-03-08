import { useState } from "react"
import Home from "./pages/Home"
import Report from "./pages/Report"
import "./index.css"

export default function App() {
  const [page, setPage] = useState("home")
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(query) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:8000/api/search?query=${query}`)
      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()
      setReportData(data)
      setPage("report")
    } catch (err) {
      setError("Could not analyze this target. Check if it's a valid IP or domain.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {page === "home" && (
        <Home
          onSearch={handleSearch}
          loading={loading}
          error={error}
        />
      )}
      {page === "report" && (
        <Report data={reportData} onBack={() => setPage("home")} />
      )}
    </>
  )
}