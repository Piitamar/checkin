import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Astral Archive summon intro.
 *
 * Usage:
 * <AstralSummonAnimation
 *   backgroundImage="/images/astral-archive-open-book.png"
 *   rarity="5star" // "4star" = pink, "5star" = gold
 *   onComplete={() => setShowSummon(false)}
 * />
 *
 * Install: npm install framer-motion
 */

export default function AstralSummonAnimation({
  backgroundImage = "/astral-archive-open-book.png",
  rarity = "5star",
  onComplete,
  onSkip,
}) {
  const [phase, setPhase] = useState("constellation");
  const [showFlash, setShowFlash] = useState(false);

  const isFourStar = rarity === "4star";
  const glow = isFourStar ? "#f18ab8" : "#f4cf79";
  const glowSoft = isFourStar ? "rgba(241,138,184,0.48)" : "rgba(244,207,121,0.5)";
  const glowFaint = isFourStar ? "rgba(241,138,184,0.16)" : "rgba(244,207,121,0.17)";

  // Fixed points in the upper half of the scene; the final star falls toward the book.
  const stars = useMemo(
    () => [
      { x: 18, y: 25 },
      { x: 34, y: 15 },
      { x: 49, y: 28 },
      { x: 66, y: 13 },
      { x: 82, y: 27 },
      { x: 73, y: 43 },
      { x: 43, y: 45 },
      { x: 25, y: 44 },
    ],
    []
  );

  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [2, 6], [6, 7], [7, 0],
  ];

  useEffect(() => {
    let cancelled = false;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function play() {
      await wait(2300);
      if (cancelled) return;
      setPhase("falling");
      await wait(1250);
      if (cancelled) return;
      setShowFlash(true);
      setPhase("flash");
      await wait(650);
      if (cancelled) return;
      setShowFlash(false);
      setPhase("done");
      onComplete?.();
    }

    play();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase("done");
    onSkip?.();
    onComplete?.();
  };

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden bg-[#080d13]">
      {/* Scene background: use the open-book illustration as a single, static layer. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.025, opacity: 0.72 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07101d]/25 via-transparent to-[#080b10]/25" />

      {/* Constellation lines and stars. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="astral-line-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.65" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {links.map(([from, to], index) => (
          <motion.line
            key={`${from}-${to}`}
            x1={stars[from].x}
            y1={stars[from].y}
            x2={stars[to].x}
            y2={stars[to].y}
            stroke={glow}
            strokeWidth="0.16"
            strokeLinecap="round"
            filter="url(#astral-line-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.9, 0.65] }}
            transition={{
              pathLength: { duration: 0.52, delay: 0.25 + index * 0.17, ease: "easeInOut" },
              opacity: { duration: 0.6, delay: 0.25 + index * 0.17 },
            }}
          />
        ))}
        {stars.map((star, index) => (
          <motion.circle
            key={`star-${index}`}
            cx={star.x}
            cy={star.y}
            r={index === 2 ? 0.72 : 0.42}
            fill="#fff8e8"
            style={{ filter: `drop-shadow(0 0 3px ${glow})` }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0.72], scale: [0.2, 1.25, 1] }}
            transition={{ duration: 0.55, delay: 0.18 + index * 0.2 }}
          />
        ))}
      </svg>

      {/* A single star descends toward the center of the open book. */}
      <AnimatePresence>
        {phase === "falling" && (
          <motion.div
            className="absolute left-1/2 top-[12%] z-20"
            initial={{ x: "-50%", y: 0, opacity: 0, scale: 0.35, rotate: -20 }}
            animate={{
              x: "-50%",
              y: "58vh",
              opacity: [0, 1, 1],
              scale: [0.35, 1.15, 0.9],
              rotate: 135,
            }}
            exit={{ opacity: 0, scale: 1.7 }}
            transition={{ duration: 1.2, ease: [0.2, 0.72, 0.25, 1] }}
            style={{ filter: `drop-shadow(0 0 10px ${glow}) drop-shadow(0 0 24px ${glowSoft})` }}
          >
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
              <path d="M27 1 L32 21 L53 27 L32 32 L27 53 L22 32 L1 27 L22 21 Z" fill="#fff9ec" />
              <circle cx="27" cy="27" r="5" fill={glow} />
            </svg>
            <motion.div
              className="absolute left-1/2 top-1/2 h-28 w-[2px] -translate-x-1/2 -translate-y-full rounded-full"
              style={{ background: `linear-gradient(to top, ${glow}, transparent)` }}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 0.9, scaleY: 1 }}
              transition={{ duration: 0.35 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rarity-colored flash at the moment the star reaches the page. */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.72, 0.22, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, times: [0, 0.2, 0.55, 1] }}
            style={{
              background: `radial-gradient(ellipse at 50% 72%, ${glowSoft} 0%, ${glowFaint} 28%, transparent 66%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-5 top-5 z-40 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs tracking-[0.18em] text-white/80 backdrop-blur-sm transition hover:bg-black/55 hover:text-white"
      >
        SKIP
      </button>
    </div>
  );
}
