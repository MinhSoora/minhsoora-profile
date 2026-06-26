import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Games from "./pages/Games";
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import MediaPlayer from "./components/MediaPlayer";
import "./styles/global.css";

const tracks = [
  {
    title: "Bầu Trời Mới",
    artist: "DaLAB ft. Minh Tốc & Lam",
    src: "/[Lyrics] Bầu Trời Mới - DaLAB ft. Minh Tốc & Lam - 𝐿𝐸𝐴𝐶𝑒𝑓𝑢𝑙.mp3",
  },
  {
    title: "Yêu một người có lẽ",
    artist: "Lou Hoàng, Miu Lê | hqhuy cover",
    src: "/Yêu một người có lẽ - Lou Hoàng, Miu Lê _ hqhuy cover (ft. Hziaa).mp3",
  },
  {
    title: "Kahoot Music",
    artist: "TestAccount",
    src: "/4K Kahoot Music (10 Second Count Down) Visualized 2023 - TestAccount.mp3",
  },
];

function AppContent() {
  const location = useLocation();

  return (
    <div className="app-root">
      {/* Blurred background */}
      <div className="bg-overlay" />
      <div className="bg-image" />

      <Navigation />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/games" element={<Games />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <MediaPlayer tracks={tracks} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
