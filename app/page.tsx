"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("Hello Poster");

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 60 }}>{text}</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginTop: 20, fontSize: 20 }}
      />
    </main>
  );
}
"use client";

// force redeploy

import { useState } from "react";
