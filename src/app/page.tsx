"use client";

import { useState } from "react";
import css from "./page.module.css";
import Modal from "../components/Modal";

const styles = ["映画風", "漫画風", "古典文学風", "占い風", "偉人風"];

const Home = () => {
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState(["", "", ""]);
  const [style, setStyle] = useState(styles[0]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");

    const filteredKeywords = keywords.filter((k) => k.trim() !== "");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, keywords: filteredKeywords, style }),
      });

      const data = await res.json();
      setOutput(data.message);
      setModalOpen(true); // ←ここでモーダルを開く
    } catch {
      setOutput("エラーが発生しました");
      setModalOpen(true); // エラーもモーダルで見せたいならここでも開く
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.main}>
      <h1 className={css.title}>ことだま生成器</h1>

      <div className={css.inner}>
        <label className={css.label}>
          名前を入れてね
          <span className={css.ask}>*</span>
          <br />
          <input
            className={css.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label className={css.label}>
          キーワードを入れてね（任意、最大3つまで）
          <br />
          {keywords.map((k, i) => (
            <input
              className={css.input}
              key={i}
              type="text"
              value={k}
              onChange={(e) => handleKeywordChange(i, e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />
          ))}
        </label>

        <label className={css.label}>
          名言スタイル選択してね
          <br />
          <select
            className={css.select}
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
          className={css.button}
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          style={{ marginBottom: 16 }}
        >
          {loading ? "生成中..." : "名言を作るね"}
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setOutput("");
          }}
        >
          {output}
        </Modal>
      </div>
    </main>
  );
};

export default Home;
