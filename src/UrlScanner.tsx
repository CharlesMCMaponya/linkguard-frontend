import { useState } from "react";
import { ShieldCheck, ShieldAlert, Loader2, Search } from "lucide-react";

interface ScanResult {
  score: number;
  category: string;
  description: string;
  redFlags: string[];
  status: string;
}

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const response = await fetch("https://linkguard-backend.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data: ScanResult = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Scan failed:", err);
      setErrorMsg("⚠️ Failed to analyze the URL. Please try again.");
    } finally {
      setLoading(false);
      setUrl("");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 py-6 bg-white shadow-xl border rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">🔍 LinkGuard URL Scanner</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          placeholder="Enter suspicious URL"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-[1px] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Scanning…
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600 mt-3">{errorMsg}</p>
      )}

      {result && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            {result.score >= 80 ? (
              <ShieldCheck className="text-emerald-500 w-5 h-5" />
            ) : (
              <ShieldAlert className="text-rose-500 w-5 h-5" />
            )}
            Scan Report
          </h2>

          <p className="text-sm text-gray-700 mb-2">
            <strong>Status:</strong> {result.status}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Category:</strong> {result.category}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Trust Score:</strong> {result.score} / 100
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Description:</strong> {result.description}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Red Flags:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-red-600">
            {result.redFlags.length > 0 ? (
              result.redFlags.map((flag, i) => <li key={i}>{flag}</li>)
            ) : (
              <li>No red flags found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
