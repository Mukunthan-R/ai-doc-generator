"use client";

import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateDocs() {
    if (!code) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      setResult(data.result);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          DevDocs AI
        </h1>

        <p className="text-zinc-400 mb-8">
          Paste your code below and generate documentation instantly using AI.
        </p>

        <div className="bg-zinc-900 p-4 rounded-xl mb-6">
          <p className="text-sm text-zinc-400">
            Example: Paste React, Python, Node.js, or JavaScript code.
          </p>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-80 bg-zinc-900 border border-zinc-700 rounded-2xl p-5 outline-none"
        />

        <div className="flex gap-4 mt-6">

          <button
            onClick={generateDocs}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {loading ? "AI is analyzing..." : "Generate Documentation"}
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="bg-zinc-800 px-4 py-3 rounded-xl"
          >
            Copy Documentation
          </button>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 prose prose-invert max-w-none">
          {result ? (
            <ReactMarkdown>{result}</ReactMarkdown>
          ) : (
            "Your AI generated documentation will appear here..."
          )}
        </div>

      </div>
    </main>
  );
}