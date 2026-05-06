import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ImagePlus, Shuffle, Type, SlidersHorizontal, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fontOptions = [
  "Noto Sans TC", "Noto Serif TC", "Source Han Sans TC", "Source Han Serif TC", "LXGW WenKai", "ZCOOL XiaoWei",
  "ZCOOL QingKe HuangYou", "Ma Shan Zheng", "Long Cang", "Zhi Mang Xing", "Shippori Mincho", "Yu Mincho",
  "Hiragino Mincho ProN", "Hiragino Sans", "Yu Gothic", "Zen Old Mincho", "Zen Kaku Gothic New", "Kaisei Decol",
  "Kaisei Opti", "BIZ UDPMincho", "BIZ UDGothic", "Kosugi Maru", "Sawarabi Mincho", "Sawarabi Gothic",
  "Inter", "Helvetica", "Arial", "Arial Narrow", "Arial Black", "Futura", "Avenir", "Gill Sans", "Optima",
  "Didot", "Bodoni 72", "Baskerville", "Times New Roman", "Georgia", "Garamond", "Palatino", "Courier New",
  "IBM Plex Sans", "IBM Plex Serif", "IBM Plex Mono", "Space Grotesk", "Space Mono", "Archivo", "Archivo Black",
  "Roboto", "Roboto Condensed", "Roboto Slab", "Oswald", "Montserrat", "Poppins", "Raleway", "Lora", "Playfair Display",
  "Cormorant Garamond", "Libre Baskerville", "Libre Franklin", "DM Sans", "DM Serif Display", "Manrope", "Work Sans",
  "Public Sans", "Barlow", "Barlow Condensed", "Bebas Neue", "Anton", "Teko", "Saira Condensed", "Josefin Sans",
  "Merriweather", "Crimson Text", "Spectral", "EB Garamond", "Cinzel", "Prata", "Fraunces", "Unbounded",
  "Syne", "Anybody", "Chivo", "Chivo Mono", "Inconsolata", "JetBrains Mono", "Fira Sans", "Fira Mono",
  "PT Sans", "PT Serif", "PT Mono", "Ubuntu", "Karla", "Rubik", "Nunito", "Quicksand", "Cabin", "Kanit",
  "Prompt", "Noto Sans", "Noto Serif", "Noto Sans JP", "Noto Serif JP", "M PLUS 1p", "M PLUS Rounded 1c",
  "Rounded Mplus 1c", "Tsukushi A Round Gothic", "Hannotate TC", "Klee One", "Yomogi", "Hachi Maru Pop"
];

const templates = [
  {
    name: "城市森林地圖",
    bg: "#f2ded2",
    accent: "#7a1d18",
    second: "#d9e7e2",
    title: "plant b\n城市森林計劃",
    subtitle: "秋季場\n2026",
    body: "自然 / 戶外 / 環保 / 農耕 / 運動 / 親子",
    layout: "map"
  },
  {
    name: "鉛筆音樂會",
    bg: "#e9e6cf",
    accent: "#111111",
    second: "#d8d3bd",
    title: "休假日\n的結尾\nMusic 時分",
    subtitle: "聽 for 一場演奏會",
    body: "Performer / Address / Time\n19:30–21:00",
    layout: "music"
  },
  {
    name: "巨大字雕塑展",
    bg: "#ececec",
    accent: "#0876b7",
    second: "#c9c9c9",
    title: "OLIVER\nLARIC\nSCULPTURE\nVIRTUAL\nRENDERINGS",
    subtitle: "15 NOV — 30 NOV",
    body: "themes of pop culture, mass media, historical image hierarchies",
    layout: "type"
  },
  {
    name: "紅色透明切片",
    bg: "#eeeeea",
    accent: "#ee2d1f",
    second: "#111111",
    title: "BLESSED\nARE THE\nPURE IN HEART",
    subtitle: "HUNGER AND THIRST FOR RIGHTEOUSNESS",
    body: "BLESSED ARE THE MERCIFUL / THE PEACEMAKERS / THE MEEK",
    layout: "blocks"
  },
  {
    name: "半調地景拼貼",
    bg: "#f7f7f3",
    accent: "#111111",
    second: "#9b6a35",
    title: "NEW TAIPEI\nCITY",
    subtitle: "LINK START !!!",
    body: "BOOKSTORE NO.29\n2026 04.21 → 25",
    layout: "collage"
  },
  {
    name: "節氣粗粒子",
    bg: "#f4dfcf",
    accent: "#f04424",
    second: "#123f24",
    title: "霜降",
    subtitle: "24 Solar Terms / First Frost",
    body: "拾月 / 貳叁 / 10.23",
    layout: "season"
  }
];

function Range({ label, value, setValue, min, max, step = 1 }) {
  return (
    <label className="grid gap-1 text-xs text-zinc-600">
      <span className="flex justify-between"><b>{label}</b><span>{value}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </label>
  );
}

function Dots({ color, opacity }) {
  const items = Array.from({ length: 280 });
  return <div className="absolute inset-0 pointer-events-none overflow-hidden">{items.map((_, i) => (
    <span key={i} className="absolute text-[9px]" style={{ left: `${8 + (i * 7) % 86}%`, top: `${8 + Math.floor(i / 7) * 2.2}%`, color, opacity: opacity / 100 }}>{i % 3 === 0 ? "▲" : i % 3 === 1 ? "○" : "×"}</span>
  ))}</div>;
}

function Poster({ state, image }) {
  const { t, title, subtitle, body, titleFont, bodyFont, fontSize, bodySize, lineHeight, letterSpacing, opacity, photoOpacity, photoScale, photoFilter, rotate } = state;
  const titleLines = title.split("\n");
  return (
    <div id="poster" className="relative w-[540px] h-[760px] overflow-hidden shadow-2xl" style={{ background: t.bg, color: t.accent }}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(currentColor .7px, transparent .7px)", backgroundSize: "8px 8px" }} />
      {t.layout === "map" && <><div className="absolute left-[21%] top-[13%] w-[62%] h-[72%] rounded-[45%]" style={{ background: t.second }} /><div className="absolute bottom-16 left-28 w-72 h-24 rounded-[50%] rotate-[-8deg]" style={{ background: "#88e51c" }} /><Dots color={t.accent} opacity={80} /></>}
      {t.layout === "music" && <><div className="absolute inset-8 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 18px, currentColor 19px 20px)" }} /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(25deg, transparent 30%, currentColor 31%, transparent 33%)" }} /></>}
      {t.layout === "type" && <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg, transparent 49%, currentColor 50%, transparent 51%)", backgroundSize: "70px 100%" }} />}
      {t.layout === "blocks" && <div className="absolute inset-0">{Array.from({ length: 13 }).map((_, i) => <div key={i} className="absolute mix-blend-multiply" style={{ width: `${120 + i * 9}px`, height: `${40 + (i % 4) * 50}px`, left: `${8 + (i * 19) % 72}%`, top: `${5 + (i * 13) % 80}%`, background: t.accent, opacity: .72, transform: `rotate(${[-9, 4, -3, 8][i % 4]}deg)` }} />)}</div>}
      {t.layout === "collage" && <><div className="absolute inset-12 border border-dashed border-current" /><div className="absolute left-12 top-28 w-96 h-80 opacity-70" style={{ background: "radial-gradient(circle, #111 1px, transparent 1px)", backgroundSize: "5px 5px", clipPath: "polygon(0 12%, 44% 0, 100% 22%, 79% 74%, 18% 100%)" }} />{Array.from({ length: 7 }).map((_, i) => <div key={i} className="absolute rounded-sm" style={{ width: 54 + i * 4, height: 42 + i * 5, left: 70 + (i * 58) % 360, top: 130 + (i * 83) % 430, background: t.second, transform: `rotate(${i * 17}deg)` }} />)}</>}
      {t.layout === "season" && <><div className="absolute -left-14 top-20 w-[520px] h-[250px] rotate-[-10deg]" style={{ background: t.accent, clipPath: "polygon(8% 20%, 83% 0, 100% 70%, 30% 100%)" }} /><div className="absolute right-8 top-16 w-36 h-20 rotate-[10deg]" style={{ background: t.second }} /><div className="absolute left-10 bottom-40 w-[500px] h-[220px] rotate-[6deg]" style={{ background: t.accent, clipPath: "polygon(5% 10%, 90% 5%, 100% 65%, 22% 100%)" }} /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#111 1px, transparent 1px)", backgroundSize: "4px 4px" }} /></>}
      {image && <img src={image} className="absolute left-1/2 top-1/2 max-w-none object-cover" style={{ width: `${photoScale}%`, opacity: photoOpacity / 100, filter: photoFilter, transform: `translate(-50%, -50%) rotate(${rotate}deg)`, mixBlendMode: t.layout === "type" ? "multiply" : "normal" }} />}
      <main className="absolute inset-0 p-8" style={{ opacity: opacity / 100 }}>
        <h1 className="font-bold leading-none whitespace-pre-line" style={{ fontFamily: titleFont, fontSize, lineHeight, letterSpacing }}>{titleLines.map((line, i) => <span key={i} className="block">{line}</span>)}</h1>
        <p className="absolute right-8 top-8 max-w-[170px] text-right font-semibold whitespace-pre-line" style={{ fontFamily: bodyFont, fontSize: bodySize, lineHeight: 1.1 }}>{subtitle}</p>
        <p className="absolute left-8 bottom-8 max-w-[330px] whitespace-pre-line" style={{ fontFamily: bodyFont, fontSize: bodySize, lineHeight: 1.25, letterSpacing: Math.max(0, letterSpacing / 2) }}>{body}</p>
      </main>
    </div>
  );
}

export default function PosterDesignStudio() {
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    t: templates[0],
    title: templates[0].title,
    subtitle: templates[0].subtitle,
    body: templates[0].body,
    titleFont: fontOptions[0],
    bodyFont: fontOptions[1],
    fontSize: 62,
    bodySize: 17,
    lineHeight: 0.92,
    letterSpacing: -1,
    opacity: 100,
    photoOpacity: 82,
    photoScale: 78,
    photoFilter: "grayscale(100%) contrast(115%)",
    rotate: 0
  });
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const applyTemplate = (t) => update({ t, title: t.title, subtitle: t.subtitle, body: t.body });
  const randomize = () => {
    const t = templates[Math.floor(Math.random() * templates.length)];
    update({ t, title: t.title, subtitle: t.subtitle, body: t.body, titleFont: fontOptions[Math.floor(Math.random() * fontOptions.length)], bodyFont: fontOptions[Math.floor(Math.random() * fontOptions.length)], fontSize: 46 + Math.floor(Math.random() * 36), letterSpacing: -2 + Math.floor(Math.random() * 6), rotate: -8 + Math.floor(Math.random() * 17) });
  };
  const downloadSVG = () => {
    const node = document.getElementById("poster");
    const html = new XMLSerializer().serializeToString(node);
    const blob = new Blob([`<svg xmlns="http://www.w3.org/2000/svg" width="540" height="760"><foreignObject width="100%" height="100%">${html}</foreignObject></svg>`], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "poster-design.svg";
    a.click();
  };
  return (
    <div className="min-h-screen bg-zinc-100 p-6 text-zinc-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="rounded-2xl shadow-sm"><CardContent className="grid gap-4 p-5">
          <div><h2 className="text-xl font-bold">可套版海報設計介面</h2><p className="text-sm text-zinc-500">地圖、樂譜、巨大字體、透明色塊、拼貼、節氣粗粒子風格。</p></div>
          <div className="grid grid-cols-2 gap-2">{templates.map((t) => <Button key={t.name} variant={state.t.name === t.name ? "default" : "outline"} className="h-auto rounded-xl p-3 text-xs" onClick={() => applyTemplate(t)}>{t.name}</Button>)}</div>
          <Button onClick={randomize} className="rounded-xl"><Shuffle className="mr-2 h-4 w-4" />隨機組合風格</Button>
          <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-zinc-300 p-4 text-sm hover:bg-white"><ImagePlus className="mr-2 h-4 w-4" />置入照片<input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setImage(URL.createObjectURL(f)); }} /></label>
          <div className="grid gap-2"><div className="flex items-center gap-2 font-bold"><Type className="h-4 w-4" />文字內容</div><textarea className="min-h-24 rounded-xl border p-3 text-sm" value={state.title} onChange={(e) => update({ title: e.target.value })} /><textarea className="min-h-16 rounded-xl border p-3 text-sm" value={state.subtitle} onChange={(e) => update({ subtitle: e.target.value })} /><textarea className="min-h-20 rounded-xl border p-3 text-sm" value={state.body} onChange={(e) => update({ body: e.target.value })} /></div>
          <div className="grid gap-2"><div className="flex items-center gap-2 font-bold"><Layers className="h-4 w-4" />字體選擇，共 {fontOptions.length} 種</div><select className="rounded-xl border p-2 text-sm" value={state.titleFont} onChange={(e) => update({ titleFont: e.target.value })}>{fontOptions.map(f => <option key={f}>{f}</option>)}</select><select className="rounded-xl border p-2 text-sm" value={state.bodyFont} onChange={(e) => update({ bodyFont: e.target.value })}>{fontOptions.map(f => <option key={f}>{f}</option>)}</select></div>
          <div className="grid gap-3"><div className="flex items-center gap-2 font-bold"><SlidersHorizontal className="h-4 w-4" />排版調整</div><Range label="標題大小" value={state.fontSize} setValue={(v)=>update({fontSize:v})} min={24} max={110}/><Range label="內文字級" value={state.bodySize} setValue={(v)=>update({bodySize:v})} min={8} max={32}/><Range label="行距" value={state.lineHeight} setValue={(v)=>update({lineHeight:v})} min={0.7} max={1.8} step={0.01}/><Range label="字距" value={state.letterSpacing} setValue={(v)=>update({letterSpacing:v})} min={-6} max={14}/><Range label="文字透明度" value={state.opacity} setValue={(v)=>update({opacity:v})} min={5} max={100}/></div>
          <div className="grid gap-3"><div className="flex items-center gap-2 font-bold"><Sparkles className="h-4 w-4" />照片調色</div><select className="rounded-xl border p-2 text-sm" value={state.photoFilter} onChange={(e)=>update({photoFilter:e.target.value})}><option value="none">原色</option><option value="grayscale(100%) contrast(115%)">黑白高反差</option><option value="sepia(45%) contrast(105%) saturate(75%)">復古褐色</option><option value="contrast(140%) saturate(50%)">低彩半調感</option><option value="hue-rotate(180deg) saturate(130%)">變色實驗</option></select><Range label="照片大小" value={state.photoScale} setValue={(v)=>update({photoScale:v})} min={20} max={180}/><Range label="照片透明度" value={state.photoOpacity} setValue={(v)=>update({photoOpacity:v})} min={0} max={100}/><Range label="照片旋轉" value={state.rotate} setValue={(v)=>update({rotate:v})} min={-30} max={30}/></div>
          <Button variant="outline" onClick={downloadSVG} className="rounded-xl"><Download className="mr-2 h-4 w-4" />下載 SVG</Button>
        </CardContent></Card>
        <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow-inner"><motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .4 }}><Poster state={state} image={image} /></motion.div></div>
      </div>
    </div>
  );
}
