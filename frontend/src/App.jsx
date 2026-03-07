import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/search?query=${query}`);
      const data = await response.json();
      setReportData(data);
      setPage("report");
    } catch (error) {
      console.log("Search failed:", error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {page === "home" &&(
        <Home onSearch={handleSearch} loadin={loading} />
      )}
      {page === "report" &&(
        <Report data={reportData} onBack={() => setPage("home")} />
      )}
    </>
  )
}