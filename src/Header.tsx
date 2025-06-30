// src/Header.tsx
import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center gap-3 border-b">
      <ShieldCheck className="text-green-600 w-8 h-8" />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">LinkGuard</h1>
        <p className="text-sm text-gray-500">Protecting you from scams & phishing</p>
      </div>
    </header>
  );
}

