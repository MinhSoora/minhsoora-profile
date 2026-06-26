import React, { useState, useEffect } from "react";

const LANG_COLOR = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Python:     "#3572A5",
  Java:       "#b07219",
  PHP:        "#4F5D95",
  Shell:      "#89e051",
  Vue:        "#41b883",
};

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const blacklist = ["KitoMCVN"];

  useEffect(() => {
    fetch("https://api.github.com/users/KitoMCVN/repos?sort=updated&per_page=30")
      .then(r => r.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data.filter(r => !blacklist.includes(r.name)) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="glass-card glass-card-glow p-6" style={{ marginBottom: 12 }}>
        <p className="page-title">Projects</p>
        <h2 className="section-title">GitHub Repositories</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
          Một số dự án mình đã và đang làm
        </p>
        <a
          href="https://github.com/KitoMCVN"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            marginTop: 12, padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "var(--text-muted)", fontSize: 12, textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(125,211,252,0.08)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          KitoMCVN on GitHub
        </a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {loading ? (
          [1,2,3,4].map(i => (
            <div key={i} className="glass-card" style={{
              height: 88, borderRadius: 14,
              background: "rgba(255,255,255,0.03)",
              animation: "pulse 1.5s ease-in-out infinite"
            }} />
          ))
        ) : repos.length === 0 ? (
          <div className="glass-card p-5" style={{ textAlign: "center", color: "var(--text-muted)" }}>
            Không tải được repos.
          </div>
        ) : (
          repos.map(repo => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div
                className="glass-card project-card"
                style={{ borderRadius: 14 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ color: "var(--accent)", flexShrink: 0 }}>
                      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    </svg>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{repo.name}</span>
                    {repo.fork && (
                      <span className="tag" style={{ fontSize: 10, padding: "1px 6px" }}>fork</span>
                    )}
                  </div>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ color: "var(--text-dim)", flexShrink: 0 }}>
                    <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </div>

                {repo.description && (
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-3">
                  {repo.language && (
                    <div className="flex items-center gap-1" style={{ fontSize: 11, color: "var(--text-dim)" }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                        background: LANG_COLOR[repo.language] || "#8b949e"
                      }} />
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1" style={{ fontSize: 11, color: "var(--text-dim)" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1" style={{ fontSize: 11, color: "var(--text-dim)" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                      <path d="M17 1l-1.41 1.41L17.17 4H13c-2.76 0-5 2.24-5 5v4.17L5.41 10.59 4 12l4 4 4-4-1.41-1.41L9 13.17V9c0-1.65 1.35-3 3-3h4.17l-1.58 1.59L16 9l4-4-3-4z"/>
                    </svg>
                    {repo.forks_count}
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-dim)", marginLeft: "auto", fontFamily: "monospace" }}>
                    {new Date(repo.updated_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
