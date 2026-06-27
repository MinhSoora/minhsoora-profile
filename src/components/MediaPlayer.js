import React, { useState, useRef, useEffect } from "react";

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);
const IconPrev = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
  </svg>
);
const IconNext = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m6 18 8.5-6L6 6v12zm2.5-6 8.5 6V6z"/>
    <path d="M16 6h2v12h-2z"/>
  </svg>
);
const IconMusic = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);
const IconChevron = ({ down }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"
    style={{ transform: down ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

export default function MediaPlayer({ tracks }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const track = tracks[idx];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    if (playing) audio.play().catch(() => {});
  }, [idx, playing, track.src]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => nextTrack();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  };

  const nextTrack = () => {
    const next = (idx + 1) % tracks.length;
    setIdx(next);
    setProgress(0);
    if (playing) {
      setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
    }
  };

  const prevTrack = () => {
    const prev = (idx - 1 + tracks.length) % tracks.length;
    setIdx(prev);
    setProgress(0);
    if (playing) {
      setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
    }
  };

  const seekTo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = ratio * duration;
    setProgress(ratio * duration);
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className={`media-player${collapsed ? " collapsed" : ""}`}>
      <audio ref={audioRef} />
      <div className="media-player-inner">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {playing ? (
              <div className="music-bars">
                {[0,1,2,3].map(i => <div key={i} className="music-bar" />)}
              </div>
            ) : (
              <IconMusic />
            )}
            <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'JetBrains Mono',monospace" }}>
              {playing ? "Playing" : "Paused"}
            </span>
          </div>
          <button
            className="media-toggle-btn"
            onClick={() => setCollapsed(c => !c)}
            style={{ marginLeft: "auto" }}
          >
            <IconChevron down={collapsed} />
          </button>
        </div>

        {/* Expanded content */}
        {!collapsed && (
          <>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
                {track.title}
              </p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                {track.artist}
              </p>
            </div>

            <div className="media-progress" style={{ marginTop: 12 }}>
              <div className="media-progress-bar" onClick={seekTo}>
                <div className="media-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="media-time">
                <span>{fmt(progress)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            <div className="media-controls">
              <button className="media-btn" onClick={prevTrack}>
                <IconPrev />
              </button>
              <button className="media-btn play-btn" onClick={togglePlay}>
                {playing ? <IconPause /> : <IconPlay />}
              </button>
              <button className="media-btn" onClick={nextTrack}>
                <IconNext />
              </button>
              <div style={{ flex: 1, fontSize: 10, color: "var(--text-dim)", textAlign: "right", fontFamily: "monospace" }}>
                {idx + 1} / {tracks.length}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
