"use client";

import { useState, useMemo } from "react";
import confetti from "canvas-confetti";

type Heart = {
  left: string;
  delay: string;
  duration: string;
  size: string;
};

export default function ValentinePage() {
  const [opened, setOpened] = useState(false);
  const [yes, setYes] = useState(false);
  const [noStyle, setNoStyle] = useState({
    top: "60%",
    left: "50%",
    transform: "translateX(-50%)",
  });

  // Hearts generated ONCE
  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${6 + Math.random() * 6}s`,
      size: `${16 + Math.random() * 20}px`,
    }));
  }, []);

  const moveNo = () => {
    setNoStyle({
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`,
    });
  };

  const handleYes = () => {
    setYes(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  return (
    <main className="relative w-screen h-screen bg-pink-400 overflow-hidden flex items-center justify-center px-4">
      {/* ✉️ ENVELOPE */}
      {!opened && (
        <button
          onClick={() => setOpened(true)}
          className="relative w-64 h-40 bg-red-500 rounded-lg shadow-xl cursor-pointer transition hover:scale-105"
        >
          {/* flap */}
          <div className="absolute top-0 left-0 w-full h-full bg-red-600 clip-envelope-flap" />

          {/* heart seal */}
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            💖
          </div>

          <p className="absolute bottom-2 w-full text-center text-white text-sm">
            Click to open
          </p>
        </button>
      )}

      {/* 💌 CARD */}
      {opened && (
        <>
          {/* Flying Hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart, i) => (
              <span
                key={i}
                className="absolute bottom-[-10%] animate-heart-float"
                style={{
                  left: heart.left,
                  animationDelay: heart.delay,
                  animationDuration: heart.duration,
                  fontSize: heart.size,
                }}
              >
                ❤️
              </span>
            ))}
          </div>

          {/* Card */}
          <div className="relative z-10 bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-10 text-center max-w-lg w-full animate-card-pop">
            {!yes ? (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
                  Paulina, will you be my Valentine? 💘
                </h1>

                <div className="relative h-32 flex justify-center items-start">
                  <button
                    onClick={handleYes}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:scale-110 transition"
                  >
                    Yes 💖
                  </button>

                  <button
                    onMouseEnter={moveNo}
                    onClick={moveNo}
                    className="absolute bg-gray-200 text-gray-700 px-6 py-3 rounded-xl text-lg transition-all"
                    style={noStyle}
                  >
                    No 💔
                  </button>
                </div>
              </>
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
                Happy Valentine's!!! 🥰💞
                <br />
                It will be the best one ever 💘
              </h2>
            )}
          </div>
        </>
      )}
    </main>
  );
}
