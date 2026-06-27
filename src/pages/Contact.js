import React from "react";

const links = [
  {
    label: "Discord",
    value: "minhsoora",
    href: "https://discord.com/users/1372096536204283926",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
    color: "#5865f2",
  },
  {
    label: "GitHub",
    value: "MinhSoora",
    href: "https://github.com/MinhSoora",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    color: "#fff",
  },
  {
    label: "Facebook",
    value: "Cao Nguyễn Gia Lập",
    href: "https://www.facebook.com/share/1D7qydKtkr/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: "#1877f2",
  },
];

export default function Contact() {
  return (
    <div className="page">
      <div className="glass-card glass-card-glow p-6" style={{ marginBottom: 12 }}>
        <p className="page-title">Contact</p>
        <h2 className="section-title">Liên hệ với mình</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
          Bạn có thể tìm thấy mình ở các nơi sau 👇
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map((link) => {
          const inner = (
            <div
              className="contact-link"
              style={link.disabled ? { opacity: 0.45, cursor: "not-allowed" } : {}}
              onMouseEnter={e => {
                if (!link.disabled) {
                  e.currentTarget.style.borderColor = `${link.color}40`;
                  e.currentTarget.style.background = `${link.color}10`;
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${link.color}15`,
                border: `1px solid ${link.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: link.color, flexShrink: 0
              }}>
                {link.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{link.label}</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{link.value}</p>
              </div>
              {!link.disabled && (
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ color: "var(--text-dim)", flexShrink: 0 }}>
                  <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
              )}
            </div>
          );

          return link.href && !link.disabled ? (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              {inner}
            </a>
          ) : (
            <div key={link.label}>{inner}</div>
          );
        })}
      </div>

      <div className="glass-card mt-3 p-5">
        <p className="page-title mb-2">Note</p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
          Mình phản hồi nhanh nhất qua <span style={{ color: "var(--accent)" }}>Discord</span>. 
          GitHub thì thỉnh thoảng mình check commits. Facebook mình không còn dùng nữa rồi 😅
        </p>
      </div>
    </div>
  );
}
