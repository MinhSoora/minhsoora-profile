import React, { useState } from "react";

const games = [
  {
    name: "Minecraft",
    img: "https://img.redbull.com/images/q_auto,f_auto/redbullcom/2020/1/9/e5ywjefjyqdg5zzygsyn/minecraft-screenshot-pc",
    desc: "Game sandbox kinh điển, nơi mình dành hàng giờ xây dựng thế giới riêng",
    tags: ["Sandbox", "Survival", "Creative"],
    status: "All-time fav 💙",
  },
];

export default function Games() {
  const [active, setActive] = useState(null);

  return (
    <div className="page">
      <div className="glass-card glass-card-glow p-6" style={{ marginBottom: 12 }}>
        <p className="page-title">Games</p>
        <h2 className="section-title">Favorite Games 🎮</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
          Những game mình đã chơi và yêu thích
        </p>
      </div>

      <div className="grid-2" style={{ gap: 10 }}>
        {games.map((game, i) => (
          <div
            key={game.name}
            className="glass-card game-card"
            style={{ cursor: "pointer", overflow: "hidden" }}
            onClick={() => setActive(active === i ? null : i)}
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={game.img}
                alt={game.name}
                style={{
                  width: "100%", aspectRatio: "16/9", objectFit: "cover",
                  display: "block", transition: "transform 0.35s",
                  transform: active === i ? "scale(1.06)" : "scale(1)",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                display: "flex", alignItems: "flex-end", padding: "10px 12px"
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{game.name}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{game.status}</p>
                </div>
              </div>
            </div>

            {active === i && (
              <div style={{ padding: "10px 14px 14px" }}>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {game.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {game.tags.map(t => (
                    <span key={t} className="tag" style={{ fontSize: 10, padding: "2px 8px" }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card mt-3 p-5">
        <p style={{ fontSize: 12, color: "var(--text-dim)", textAlign: "center" }}>
          Nhấn vào game để xem thêm thông tin 👆
        </p>
      </div>
    </div>
  );
}
