import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DISCORD_ID = "1372096536204283926";

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

function StatusBadge({ status }) {
  const map = {
    online: { cls: "status-online", label: "Online" },
    idle:   { cls: "status-idle",   label: "Idle" },
    dnd:    { cls: "status-dnd",    label: "Do Not Disturb" },
    offline:{ cls: "status-offline",label: "Offline" },
  };
  const s = map[status] || map.offline;
  return (
    <div className="flex items-center gap-2">
      <div className={`status-dot ${s.cls}`} />
      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</span>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    axios.get(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then(r => setData(r.data.data))
      .catch(() => {});

    axios.get("https://api.openweathermap.org/data/2.5/weather?q=Can%20Tho,vn&appid=a601622a383aee1aea5573743d8e8875&units=metric")
      .then(r => setWeather(r.data))
      .catch(() => {});

    const id = setInterval(() => {
      axios.get(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        .then(r => setData(r.data.data))
        .catch(() => {});
    }, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const game = data?.activities?.find(a => a.type === 0);
    if (!game) return;
    const start = game.timestamps?.start;
    const id = setInterval(() => setElapsed(Date.now() - start), 1000);
    return () => clearInterval(id);
  }, [data]);

  const discord = data;
  const avatarUrl = discord
    ? `https://cdn.discordapp.com/avatars/${discord.discord_user.id}/${discord.discord_user.avatar}.png`
    : null;
  const customStatus = discord?.activities?.find(a => a.type === 4);
  const spotify = discord?.activities?.find(a => a.type === 2);
  const game = discord?.activities?.find(a => a.type === 0);

  return (
    <div className="page">
      <div className="glass-card glass-card-glow p-6">
        {/* Profile row */}
        <div className="flex items-center gap-5" style={{ flexWrap: "wrap" }}>
          <div className="avatar-ring" style={{ flexShrink: 0 }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="MinhSoora" width={84} height={84} />
            ) : (
              <div style={{
                width: 84, height: 84, borderRadius: "50%",
                background: "rgba(125,211,252,0.08)",
                border: "3px solid var(--bg)",
                animation: "pulse 2s ease-in-out infinite"
              }} />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 160 }}>
            <div className="flex items-center gap-2 mb-1">
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
                MinhSoora
              </h1>
              <span style={{
                fontSize: 11, padding: "2px 8px", borderRadius: 999,
                background: "rgba(125,211,252,0.10)",
                border: "1px solid rgba(125,211,252,0.20)",
                color: "var(--accent)", fontFamily: "monospace"
              }}>2010</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Một người ngẫu nhiên bạn gặp trên Internet · Cần Thơ, VN 🇻🇳
            </p>
            {customStatus && (
              <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>
                {customStatus.emoji?.name && <span style={{ marginRight: 4 }}>{customStatus.emoji.name}</span>}
                {customStatus.state}
              </p>
            )}
          </div>
        </div>

        <div className="divider" />

        {/* Status & activity */}
        <div className="flex items-center gap-4" style={{ flexWrap: "wrap" }}>
          <StatusBadge status={discord?.discord_status || "offline"} />

          {weather && (
            <div className="flex items-center gap-2" style={{ fontSize: 13, color: "var(--text-muted)" }}>
              <span>🌡️</span>
              <span>{Math.round(weather.main?.temp)}°C · {weather.weather?.[0]?.description}</span>
            </div>
          )}
        </div>

        {/* Activity cards */}
        {(spotify || game) && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {spotify && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10,
                background: "rgba(29,185,84,0.08)",
                border: "1px solid rgba(29,185,84,0.18)"
              }}>
                <span style={{ fontSize: 16 }}>🎵</span>
                <div>
                  <p style={{ fontSize: 12, color: "#1db954", fontWeight: 600 }}>Spotify</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {spotify.details} — {spotify.state?.replace(/;/g, ",").replace(/'/g, ",")}
                  </p>
                </div>
              </div>
            )}
            {game && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10,
                background: "rgba(125,211,252,0.06)",
                border: "1px solid rgba(125,211,252,0.14)"
              }}>
                <span style={{ fontSize: 16 }}>🎮</span>
                <div>
                  <p style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>Playing</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {game.name} · {fmt(elapsed)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick bio */}
      <div className="glass-card mt-3 p-5">
        <p className="page-title">whoami</p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>
          Chào! Mình là <span style={{ color: "var(--text)", fontWeight: 600 }}>MinhSoora</span>, một học sinh sinh năm 2010 đến từ Cần Thơ. Mình thích coding, chơi game, và nghe nhạc.
          Thỉnh thoảng viết vài dòng code để tự giải trí và học hỏi thêm 🌙
        </p>
      </div>

      {/* Quick links */}
      <div className="grid-2 mt-3">
        <Link to="/about" style={{ textDecoration: "none" }}>
          <div className="glass-card p-4" style={{
            cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 10
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(125,211,252,0.25)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"}>
            <span style={{ fontSize: 20 }}>👤</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>About me</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Skills & story</p>
            </div>
          </div>
        </Link>
        <Link to="/projects" style={{ textDecoration: "none" }}>
          <div className="glass-card p-4" style={{
            cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 10
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(125,211,252,0.25)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"}>
            <span style={{ fontSize: 20 }}>📁</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Projects</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>GitHub repos</p>
            </div>
          </div>
        </Link>
        <Link to="/games" style={{ textDecoration: "none" }}>
          <div className="glass-card p-4" style={{
            cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 10
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"}>
            <span style={{ fontSize: 20 }}>🎮</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Games</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Fav games</p>
            </div>
          </div>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <div className="glass-card p-4" style={{
            cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 10
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"}>
            <span style={{ fontSize: 20 }}>✉️</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Contact</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Find me</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
