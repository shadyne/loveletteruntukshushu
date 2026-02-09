/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, MouseEvent } from 'react';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [letterProgress, setLetterProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredHeart, setHoveredHeart] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (showLetter) {
      const interval = setInterval(() => {
        setLetterProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [showLetter]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        setShowLetter(true);
      }, 800);
    }, 600);
  };

  const createSparkle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  };

  return (
    <>
      <style
        jsx
        global
      >{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@400;600&display=swap');

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.8;
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sparkleAnim {
          0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(1.5) rotate(180deg);
          }
        }

        @keyframes floatSide {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(10px) translateY(-10px);
          }
          50% {
            transform: translateX(0) translateY(-20px);
          }
          75% {
            transform: translateX(-10px) translateY(-10px);
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .animate-rotate {
          animation: rotate 20s linear infinite;
        }
        .animate-float-side {
          animation: floatSide 8s ease-in-out infinite;
        }

        .sparkle {
          position: fixed;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #ff69b4, transparent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: sparkleAnim 1s ease-out forwards;
        }

        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
        }

        .text-shadow-strong {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hover-lift {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .letter-container {
          background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%);
          position: relative;
          isolation: isolate;
        }

        .letter-content {
          position: relative;
          z-index: 10;
        }

        .decorative-heart {
          position: absolute;
          pointer-events: none;
          z-index: 5;
          opacity: 0.15;
        }

        @media (max-width: 768px) {
          .responsive-text-4xl {
            font-size: 2rem;
          }
          .responsive-text-6xl {
            font-size: 3rem;
          }
          .responsive-padding {
            padding: 1.5rem;
          }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-800 to-amber-900 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
        {/* Parallax Cursor Effect */}
        <div
          className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: cursorPosition.x - 192,
            top: cursorPosition.y - 192,
          }}
        />

        {/* Floating Hearts Background - Only in envelope view */}
        {!showLetter && isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-pink-300/20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                  fontSize: `${15 + Math.random() * 25}px`,
                }}
              >
                ♥
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-4xl">
          {!showLetter ? (
            <div className="relative flex items-center justify-center">
              {/* Envelope Container */}
              <div
                className={`relative w-full max-w-md sm:max-w-lg transition-all duration-1000 ${
                  isOpened ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                {/* Envelope */}
                <div className="relative w-full aspect-[3/2] hover-lift">
                  {/* Envelope Back */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-2xl border-4 border-amber-200 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhaW4pIi8+PC9zdmc+')] opacity-30"></div>
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>

                  {/* Envelope Flap */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-200 to-amber-100 transform origin-top transition-all duration-700 shadow-lg ${
                      isOpened ? '-rotate-180 translate-y-1/2' : 'rotate-0'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  />

                  {/* Wax Seal with Lock */}
                  <div
                    className={`absolute top-1/3 left-1/2 -translate-x-1/2 transition-all duration-700 ${
                      isUnlocked ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                    }`}
                  >
                    <div className="relative">
                      {/* Rotating Ring */}
                      <div className="absolute inset-0 animate-rotate">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-red-400/30"></div>
                      </div>

                      {/* Wax Seal Circle */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-600 to-rose-800 shadow-2xl flex items-center justify-center border-4 border-red-700/50 relative">
                        {/* Ornate Pattern */}
                        <div className="absolute inset-2 rounded-full border-2 border-red-400/30"></div>
                        <div className="absolute inset-4 rounded-full border border-red-300/20"></div>

                        {/* Lock Icon */}
                        <button
                          onClick={(e) => {
                            handleUnlock();
                            createSparkle(e);
                          }}
                          onMouseEnter={() => setHoveredHeart(true)}
                          onMouseLeave={() => setHoveredHeart(false)}
                          className="text-amber-100 text-2xl sm:text-3xl hover:text-white transition-all duration-300 hover:scale-110 z-10 cursor-pointer active:scale-95"
                          title="Klik untuk membuka"
                        >
                          <i
                            className={`fas fa-${hoveredHeart ? 'heart' : 'lock'}`}
                            style={{ color: 'red' }}
                          ></i>
                        </button>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl animate-pulse"></div>
                    </div>

                    {/* Instruction Text */}
                    <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <p className="text-amber-100 text-xs sm:text-sm font-serif italic animate-bounce text-shadow-glow">
                        Klik gembok untuk membuka 💌
                      </p>
                    </div>
                  </div>

                  {/* Decorative Stamps */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 border-4 border-rose-400 rotate-12 opacity-60 hover:rotate-0 hover:opacity-100 transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center text-rose-400">
                      <i className="fas fa-heart text-xl sm:text-2xl animate-heartbeat"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Love Letter Content
            <div className="animate-fadeIn">
              <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto letter-container rounded-lg shadow-2xl border-4 sm:border-8 border-amber-200 relative overflow-hidden hover-lift">
                {/* Progress Bar */}
                <div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300 z-20"
                  style={{ width: `${letterProgress}%` }}
                ></div>

                {/* Paper Texture */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhaW4pIi8+PC9zdmc+')] opacity-40 z-0"></div>

                {/* Decorative Hearts - Outside content area */}
                <div
                  className="decorative-heart top-8 -left-8 sm:top-12 sm:-left-12 text-rose-300 text-5xl sm:text-7xl animate-float-side"
                  style={{ animationDelay: '0s' }}
                >
                  <i
                    className="fas fa-heart"
                    style={{ color: 'red' }}
                  ></i>
                </div>
                <div
                  className="decorative-heart top-1/3 -right-8 sm:-right-12 text-pink-300 text-4xl sm:text-6xl animate-float-side"
                  style={{ animationDelay: '1s' }}
                >
                  <i
                    className="fas fa-heart"
                    style={{ color: 'red' }}
                  ></i>
                </div>
                <div
                  className="decorative-heart bottom-1/4 -left-6 sm:-left-10 text-red-300 text-3xl sm:text-5xl animate-float-side"
                  style={{ animationDelay: '2s' }}
                >
                  <i
                    className="fas fa-heart"
                    style={{ color: 'red' }}
                  ></i>
                </div>
                <div
                  className="decorative-heart bottom-12 -right-8 sm:-right-12 text-rose-300 text-4xl sm:text-6xl animate-float-side"
                  style={{ animationDelay: '1.5s' }}
                >
                  <i
                    className="fas fa-heart"
                    style={{ color: 'red' }}
                  ></i>
                </div>

                {/* Content with proper padding */}
                <div className="letter-content p-6 sm:p-10 md:p-14 lg:p-16">
                  {/* Decorative Corner Flourishes - Inside padding */}
                  <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-rose-400 text-xl sm:text-2xl md:text-3xl hover:scale-125 transition-transform z-10">
                    ❦
                  </div>
                  <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-rose-400 text-xl sm:text-2xl md:text-3xl hover:scale-125 transition-transform z-10">
                    ❦
                  </div>
                  <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-rose-400 text-xl sm:text-2xl md:text-3xl hover:scale-125 transition-transform z-10">
                    ❦
                  </div>
                  <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-rose-400 text-xl sm:text-2xl md:text-3xl hover:scale-125 transition-transform z-10">
                    ❦
                  </div>

                  {/* Header with Hearts */}
                  <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-slideDown">
                    <div className="flex justify-center gap-2 sm:gap-3 mb-4 text-2xl sm:text-3xl md:text-4xl">
                      <i
                        className="fas fa-heart text-rose-500 animate-heartbeat cursor-pointer hover:scale-125 transition-transform"
                        style={{ color: 'red' }}
                      ></i>
                      <i
                        className="fas fa-heart text-pink-500 animate-heartbeat cursor-pointer hover:scale-125 transition-transform"
                        style={{ animationDelay: '0.1s', color: 'red' }}
                      ></i>
                      <i
                        className="fas fa-heart text-red-500 animate-heartbeat cursor-pointer hover:scale-125 transition-transform"
                        style={{ animationDelay: '0.2s', color: 'red' }}
                      ></i>
                    </div>

                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-3 text-shadow-glow"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Happy Mensive
                    </h1>

                    <div
                      className="text-xl sm:text-2xl md:text-3xl text-rose-600 font-semibold mb-4 text-shadow-strong"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      1 Tahun 10 Bulan
                    </div>

                    <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
                  </div>

                  {/* Letter Body */}
                  <div
                    className="space-y-4 sm:space-y-5 md:space-y-6 animate-slideUp max-w-2xl mx-auto"
                    style={{ animationDelay: '0.3s' }}
                  >
                    <p
                      className="text-base sm:text-lg md:text-xl leading-relaxed font-serif text-gray-800 text-shadow-strong"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                    >
                      Untuk{' '}
                      <span className="text-rose-600 font-bold text-lg sm:text-xl md:text-2xl hover:text-rose-700 transition-colors cursor-default text-shadow-glow">
                        Shushu Sayang
                      </span>{' '}
                      💕
                    </p>

                    <p
                      className="text-sm sm:text-base md:text-lg leading-relaxed font-serif indent-6 sm:indent-8 text-gray-800 hover:text-gray-900 transition-colors text-shadow-strong"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                    >
                      Waktu terasa begitu cepat berlalu Sudah 1 tahun 10 bulan
                      kita bersama, melewati suka dan duka, tawa dan air mata,
                      dan setiap momen bersama chuchu adalah kenangan yang tak
                      ternilai harganya, comel tau selama ini chu menghabiskan
                      banyak tenaga energi dan perjuangan chu untuk comel
                      sangatlah tak ada bandingannya.
                    </p>

                    <p
                      className="text-sm sm:text-base md:text-lg leading-relaxed font-serif indent-6 sm:indent-8 text-gray-800 hover:text-gray-900 transition-colors text-shadow-strong"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                    >
                      MAKACHIII CAYANGGGGG sudah menjadi alasan untuk tersenyum
                      setiap hari. MAKACHIII CAYANGGGGG untuk semua cinta,
                      kesabaran, dan pengertian Chuu... Chu.. Chu adalah satu
                      satunya untuk comel sekarang dan selamanya..
                    </p>

                    <p
                      className="text-sm sm:text-base md:text-lg leading-relaxed font-serif indent-6 sm:indent-8 text-gray-800 hover:text-gray-900 transition-colors text-shadow-strong"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                    >
                      Comel berharap lebih banyak kenangan indah, dan tumbuh
                      bersama menjadi versi terbaik dari diri kita
                      masing-masing.. tentunya menikah dan mencapai sakinah,
                      mawaddah, marahmah dan melakukan hal hal yang di ridhai
                      oleh Allah.
                    </p>

                    <div className="text-center pt-4 sm:pt-6 md:pt-8">
                      <p
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-600 mb-3 text-shadow-glow hover:scale-105 transition-transform cursor-default"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        I Love You Forever Chu Cayangggg
                      </p>
                      <p
                        className="text-base sm:text-lg md:text-xl text-gray-700 italic hover:text-gray-800 transition-colors text-shadow-strong"
                        style={{ fontFamily: "'Crimson Text', serif" }}
                      >
                        Selamanya hanya milik Shushu seorang...
                      </p>
                    </div>
                  </div>

                  {/* Read Progress Indicator */}
                  <br />
                  <div className="text-center mt-6 sm:mt-8 md:mt-10">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
                      <span className="font-medium">
                        &nbsp;Dibaca dengan penuh cinta&nbsp;
                      </span>
                      <i
                        className="fas fa-heart text-rose-500 animate-heartbeat"
                        style={{ color: 'red' }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Footer */}
              <div
                className="text-center mt-4 sm:mt-6 animate-fadeIn"
                style={{ animationDelay: '0.8s' }}
              >
                <p
                  className="text-amber-100 text-sm sm:text-base font-serif italic text-shadow-glow"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ~{' '}
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  ~
                </p>
              </div>

              {/* Reset Button */}
              <div className="text-center mt-4 sm:mt-5">
                <button
                  onClick={() => {
                    setShowLetter(false);
                    setIsOpened(false);
                    setIsUnlocked(false);
                    setLetterProgress(0);
                  }}
                  className="px-5 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <i className="fas fa-redo mr-2"></i>
                  &nbsp;Baca Ulang
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
