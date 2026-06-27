import React from "react";

const skills = [
  { name: "HTML", icon: "/icons/html.svg" },
  { name: "CSS", icon: "/icons/css.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Tailwind", icon: "/icons/tailwind.svg" },
  { name: "Node.js", icon: "/icons/nodejs-dark.svg" },
  { name: "Python", icon: "/icons/python.svg" },
];

const tools = [
  { name: "VS Code", icon: "/icons/vscode.svg" },
  { name: "Notepad++", icon: "/icons/notepadplusplus.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
];

const timeline = [
  { year: "2023", label: "Làm việc tại MinhSoora SMP" },
  { year: "2024", label: "Làm việc tại MinhSoora SMP - Ra mắt bot Discord Misachi" },
  { year: "2026", label: "Làm việc tại Soki Network" },
];

export default function About() {
  return (
    <div className="page">
      <div className="glass-card glass-card-glow p-6">
        <p className="page-title">About</p>
        <h2 className="section-title">Về bản thân</h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 10 }}>
          Mình là <strong style={{ color: "var(--text)" }}>MinhSoora</strong> (tên thật là <strong style={{ color: "var(--accent)" }}>Gia Lập</strong>), sinh năm 2010, hiện đang học phổ thông tại Cần Thơ.
          Mình đam mê lập trình web và thích tạo ra những thứ đẹp đẹp trên internet. 
          Ngoài code, mình cũng chơi game và nghe nhạc để thư giãn 🎵
        </p>
      </div>

      {/* Timeline */}
      <div className="glass-card mt-3 p-5">
        <p className="page-title mb-3">Timeline</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timeline.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* Line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 52 }}>
                <div style={{
                  fontFamily: "monospace", fontSize: 12,
                  color: "var(--accent)", fontWeight: 600,
                  background: "rgba(125,211,252,0.08)",
                  border: "1px solid rgba(125,211,252,0.18)",
                  borderRadius: 6, padding: "2px 6px", flexShrink: 0
                }}>{item.year}</div>
                {i < timeline.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 20, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
                )}
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", paddingTop: 3, paddingBottom: i < timeline.length - 1 ? 8 : 0 }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card mt-3 p-5">
        <p className="page-title mb-3">Tech Stack</p>
        <div className="grid-skills">
          {skills.map((s) => (
            <div key={s.name} className="skill-icon">
              <img src={s.icon} alt={s.name} />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="glass-card mt-3 p-5">
        <p className="page-title mb-3">Tools I Use</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {tools.map((t) => (
            <div key={t.name} className="flex items-center gap-2 tag" style={{ padding: "6px 12px" }}>
              <img src={t.icon} alt={t.name} style={{ width: 16, height: 16 }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
