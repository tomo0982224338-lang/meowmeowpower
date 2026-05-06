"use client";

import { useState } from "react";

const templates = [
  { name: "城市森林", bg: "#f2ded2", color: "#7a1d18", title: "plant b\n城市森林計劃", sub: "自然 / 戶外 / 環保 / 農耕" },
  { name: "音樂會", bg: "#e9e6cf", color: "#111111", title: "休假日\n的結尾\nMusic 時分", sub: "Performer / Address / Time" },
  { name: "雕塑展", bg: "#eeeeee", color: "#0876b7", title: "OLIVER\nLARIC\nSCULPTURE", sub: "15 NOV — 30 NOV" },
  { name: "節氣", bg: "#f4dfcf", color: "#111111", title: "霜降", sub: "24 Solar Terms / First Frost" },
];

export default function Page() {
  const [template, setTemplate] = useState(templates[0]);
  const [title, setTitle] = useState(template.title);
  const [sub, setSub] = useState(template.sub);
  const [fontSize, setFontSize] = useState(64);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [image, setImage] = useState<string | null>(null);

  function applyTemplate(t: any) {
    setTemplate(t);
    setTitle(t.title);
    setSub(t.sub);
  }

  return (
    <main style={{ display: "flex", gap: 24, padding: 24, fontFamily: "Arial, sans-serif", background: "#f3f3f3", minHeight: "100vh" }}>
      <section style={{ width: 320, background: "white", padding: 20, borderRadius: 16 }}>
        <h2>海報設計工具</h2>

        {templates.map((t) => (
          <button
            key={t.name}
            onClick={() => applyTemplate(t)}
            style={{ display: "block", width: "100%", marginBottom: 8, padding: 10 }}
          >
            {t.name}
          </button>
        ))}

        <p>標題文字</p>
        <textarea value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", height: 100 }} />

        <p>副標文字</p>
        <textarea value={sub} onChange={(e) => setSub(e.target.value)} style={{ width: "100%", height: 70 }} />

        <p>字體大小：{fontSize}</p>
        <input type="range" min="24" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />

        <p>字距：{letterSpacing}</p>
        <input type="range" min="-5" max="20" value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))} />

        <p>透明度：{opacity}</p>
        <input type="range" min="10" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />

        <p>置入照片</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(URL.createObjectURL(file));
          }}
        />
      </section>

      <section
        style={{
          width: 540,
          height: 760,
          background: template.bg,
          color: template.color,
          position: "relative",
          overflow: "hidden",
          padding: 32,
          boxShadow: "0 20px 50px rgba(0,0,0,.2)",
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "8px 8px"
        }} />

        {image && (
          <img
            src={image}
            style={{
              position: "absolute",
              width: "70%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              filter: "grayscale(100%) contrast(120%)",
              opacity: 0.7,
            }}
          />
        )}

        <h1
          style={{
            position: "relative",
            whiteSpace: "pre-line",
            fontSize,
            lineHeight: 0.9,
            letterSpacing,
            opacity: opacity / 100,
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            position: "absolute",
            right: 32,
            bottom: 32,
            width: 260,
            fontSize: 20,
            lineHeight: 1.3,
            whiteSpace: "pre-line",
          }}
        >
          {sub}
        </p>
      </section>
    </main>
  );
}
