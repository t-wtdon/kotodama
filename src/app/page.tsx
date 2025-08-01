"use client";

import { useState } from "react";

const styles = ["映画風", "漫画風", "古典文学風", "占い風", "偉人風"];

export const Home = () => {
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState(["", "", ""]);
  const [style, setStyle] = useState(styles[0]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");

    // キーワードは空のものを除いて絞る
    const filteredKeywords = keywords.filter((k) => k.trim() !== "");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, keywords: filteredKeywords, style }),
      });

      const data = await res.json();
      setOutput(data.message);
    } catch {
      setOutput("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 32 }}>
      <h1>🧠 ことだま生成器</h1>

      <label>
        名前（必須）
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 12 }}
        />
      </label>

      <label>
        キーワード（任意、最大3つ）
        <br />
        {keywords.map((k, i) => (
          <input
            key={i}
            type="text"
            value={k}
            onChange={(e) => handleKeywordChange(i, e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
        ))}
      </label>

      <label>
        名言スタイル選択
        <br />
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          style={{ width: "100%", marginBottom: 16 }}
        >
          {styles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading || !name.trim()}
        style={{ marginBottom: 16 }}
      >
        {loading ? "生成中..." : "名言を作る"}
      </button>

      <div style={{ whiteSpace: "pre-wrap" }}>{output}</div>
    </main>
  );
};

export default Home;
