# LinkGuard Frontend - Scam & Phishing Detection UI

This is the **frontend interface** for LinkGuard – a web app that protects users from scam and phishing links using a trust score system.


## 🌍 Live Project

👉 Visit it here: [https://linkguard-frontend.vercel.app](https://linkguard-frontend.vercel.app)

![Frontend Preview](./screenshots/linkguard-frontend-preview.png)

##  Features

- Clean modern UI built with HTML + Tailwind CSS
- Enter any URL and scan for phishing or scam risk
- Displays trust score, red flags, and status badge
- Copy scan summary to clipboard
- Fully responsive (works on desktop and mobile)

## Tech Stack

- **HTML** (template)
- **Tailwind CSS** (for styling)
- **JavaScript** (core logic)
- **Lucide Icons** (UI icons)
- **Chart.js** (trust score donut chart)
- **Vercel** (live hosting)

## ⚙️ Run Locally

### 1. 📦 Install Vite
If not installed globally:
```bash
npm create vite@latest

🔨 Build and Preview
npm install
npm run build
npm run preview

Open browser at: http://localhost:4173

🌐 Backend API
Make sure the backend is running or deployed (e.g., Render):
https://linkguard-backend.onrender.com/analyze

 Example Scan:
 http://free-paypaI-login.com

 Returns:
 {
  "score": 22,
  "category": "Phishing",
  "redFlags": ["Typo in domain", "Unusual structure"],
  "status": "suspicious"
}

📸 Screenshots
![Frontend Preview](./screenshots/linkguard-frontend-preview.png)
![Frontend Preview](./screenshots/linkguard-frontend-preview1.png)


🧑‍💻 Author
Made by Charles Mosehla Charles Maponya 🇿🇦
For education, portfolio building, and cybersecurity learning.
