"use client";

import { useEffect, useState } from "react";

export default function GlassAppleClock() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    let frameId: number;
    const update = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds() + ms / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      setTime({
        h: h * 30,
        m: m * 6,
        s: s * 6,
      });

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#050505] font-sans selection:bg-orange-500 overflow-hidden px-4">
      {/* 🔹 Background Ambient Light */}
      <div className="absolute w-72 h-72 md:w-150 md:h-150 bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px]" />
      <div className="absolute w-48 h-48 md:w-100 md:h-100 bg-orange-500/5 rounded-full blur-[60px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      {/* 🔹 Main Watch Container - Responsive Sizes Added */}
      <div className="relative w-full max-w-[280px] aspect-square sm:max-w-[350px] md:max-w-[480px] flex items-center justify-center p-2 md:p-4">
        {/* 🔹 Bezel & Case */}
        <div className="absolute inset-0 rounded-full border border-white/10 bg-linear-to-br from-white/10 via-transparent to-white/5 shadow-2xl" />

        {/* 🔹 Glass Face */}
        <div className="relative w-full h-full rounded-full bg-white/2 backdrop-blur-xl border border-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] md:shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
          {/* แสงสะท้อนบนหน้าปัด */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* 🔹 Tick Markers */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 flex justify-center py-2 sm:py-4 md:py-6"
              style={{ transform: `rotate(${i * 6}deg)` }}
            >
              <div
                className={`rounded-full transition-all ${
                  i % 5 === 0
                    ? "w-0.5 h-3 sm:h-4 md:h-7 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    : "w-px h-1 sm:h-1.5 md:h-2 bg-white/20"
                }`}
              />
            </div>
          ))}

          {/* 🔹 Complication: Date (Top) */}
          <div className="absolute top-[28%] flex flex-col items-center">
            <span className="text-[9px] sm:text-[11px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] text-orange-500 drop-shadow-md whitespace-nowrap">
              {new Date()
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase()}{" "}
              {new Date().getDate()}
            </span>
          </div>

          {/* 🔹 Clock Hands Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Hour Hand */}
            <div
              className="absolute w-full h-full flex justify-center items-center"
              style={{ transform: `rotate(${time.h}deg)` }}
            >
              <div className="w-1.5 md:w-3 h-[24%] bg-white rounded-full mb-[24%] shadow-lg" />
            </div>

            {/* Minute Hand */}
            <div
              className="absolute w-full h-full flex justify-center items-center"
              style={{ transform: `rotate(${time.m}deg)` }}
            >
              <div className="w-1 md:w-2 h-[36%] bg-linear-to-b from-white to-white/60 rounded-full mb-[36%] shadow-md" />
            </div>

            {/* Second Hand (The Sweep) */}
            <div
              className="absolute w-full h-full flex justify-center items-center z-20"
              style={{ transform: `rotate(${time.s}deg)` }}
            >
              <div className="w-[1px] md:w-0.5 h-[48%] bg-orange-500 mb-[35%] shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            </div>

            {/* 🔹 Center Cap */}
            <div className="z-30 w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#0a0a0a] border-2 border-white shadow-xl flex items-center justify-center">
              <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-orange-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
