type ScanResult = {
  score: number;
  status: "Safe" | "Suspicious" | "Dangerous";
  redFlags: string[];
  category: string;
  description: string;
};

export function analyzeUrl(url: string): ScanResult {
  const redFlags: string[] = [];

  const suspiciousKeywords = [
    "login", "verify", "free", "earn", "account", "password", "click", "urgent",
    "grant", "sassa", "nsfas", "tender", "loadshedding", "giftcard", "survey", "win"
  ];

  const riskyTlds = [".top", ".xyz", ".tk", ".click", ".gq", ".ml"];
  const fakeBrands = ["paypaI", "sassaonline", "faceb00k", "micros0ft", "googIe", "govza", "capitecbonus"];

  const urlLower = url.toLowerCase();

  // Keyword detection
  suspiciousKeywords.forEach((word) => {
    if (urlLower.includes(word)) redFlags.push(`Uses suspicious word: "${word}"`);
  });

  // HTTPS check
  if (!urlLower.startsWith("https://")) {
    redFlags.push("Does not use HTTPS");
  }

  // Risky domain endings
  riskyTlds.forEach((tld) => {
    if (urlLower.endsWith(tld)) redFlags.push(`Unusual domain ending: "${tld}"`);
  });

  // Fake brands
  fakeBrands.forEach((brand) => {
    if (urlLower.includes(brand)) redFlags.push(`Pretends to be brand: "${brand}"`);
  });

  // Scoring
  let score = 100 - redFlags.length * 15;
  if (score < 0) score = 0;

  // Status
  const status = score >= 80 ? "Safe" : score >= 50 ? "Suspicious" : "Dangerous";

  // Category logic
  let category = "Unknown";
  if (urlLower.includes("sassa") || urlLower.includes("grant")) {
    category = "SASSA Scam";
  } else if (urlLower.includes("nsfas")) {
    category = "NSFAS Scam";
  } else if (urlLower.includes("tender") || urlLower.includes("govza")) {
    category = "Tender Scam";
  } else if (urlLower.includes("loadshedding")) {
    category = "Eskom/Utility Scam";
  } else if (urlLower.includes("win") || urlLower.includes("giftcard")) {
    category = "Prize Scam";
  } else if (urlLower.includes("capitecbonus")) {
    category = "Banking Scam";
  } else if (urlLower.includes("login") || urlLower.includes("account")) {
    category = "Phishing";
  }

  const description =
    "This link was scanned for local and global scam patterns including fake government grants, phishing words, risky domain endings, and brand impersonation.";

  return {
    score,
    status,
    redFlags,
    category,
    description,
  };
}
