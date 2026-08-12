import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const GOLD = "#CBA045";
const CREAM = "#F4ECDF";

const DISH_LETTERS = ["D", "I", "S", "H"];
const CO_LETTERS = ["C", "O", "."];

const EASE = [0.22, 1, 0.36, 1];
const EASE_DRAW = [0.65, 0, 0.35, 1];

export default function InitialLoader({ onDone } = {}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState("intro"); // "intro" | "home"

  const d = (v) => (reduce ? 0 : v);
  const dur = (v) => (reduce ? 0.25 : v);

  useEffect(() => {
    const totalMs = reduce ? 900 : 4150;
    const t = setTimeout(() => {
      setPhase("home");
      onDone?.();
    }, totalMs);
    return () => clearTimeout(t);
  }, [reduce, onDone]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#1B1310] bg-[radial-gradient(ellipse_120%_100%_at_50%_0%,#241812_0%,#1B1310_60%)] font-['Space_Mono']">
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,transparent_40%,#1B1310_100%)]" />

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="loader"
            className="relative z-10 flex flex-col items-center gap-4 px-6"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: dur(0.65), ease: EASE }}
          >
            {/* ---- logomark: plate ring + crossed cutlery ---- */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-[86px] md:h-[86px] drop-shadow-[0_0_18px_rgba(203,160,69,0.15)]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="1.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: dur(1), delay: d(0.15), ease: EASE_DRAW }}
                />

                <motion.g
                  style={{ transformOrigin: "50px 50px" }}
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={
                    reduce
                      ? {}
                      : { delay: 1.15, duration: 50, repeat: Infinity, ease: "linear" }
                  }
                >
                  {/* fork */}
                  <g transform="rotate(-20 50 50)">
                    <motion.path
                      d="M42,30 L42,42 Q42,48 50,48 L50,72"
                      fill="none"
                      stroke={CREAM}
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: dur(0.7), delay: d(0.5), ease: EASE_DRAW }}
                    />
                    <motion.path
                      d="M46,30 L46,40 M50,30 L50,40 M54,30 L54,40"
                      fill="none"
                      stroke={CREAM}
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: dur(0.5), delay: d(0.85), ease: "easeOut" }}
                    />
                  </g>
                  {/* knife */}
                  <g transform="rotate(20 50 50)">
                    <motion.path
                      d="M44,30 Q60,32 58,44 Q57,50 50,50 L50,72"
                      fill="none"
                      stroke={CREAM}
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: dur(0.75), delay: d(0.6), ease: EASE_DRAW }}
                    />
                  </g>
                </motion.g>
              </svg>
            </div>

            {/* ---- wordmark ---- */}
            <div className="flex flex-wrap items-baseline justify-center gap-y-1 gap-x-[0.35em]">
              <span className="inline-flex">
                {DISH_LETTERS.map((l, i) => (
                  <motion.span
                    key={l + i}
                    className="font-poppins font-semibold text-[clamp(1.9rem,9vw,3.6rem)] leading-none text-[#F4ECDF] tracking-[0.02em]"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur(0.5), delay: d(0.75 + i * 0.07), ease: EASE }}
                  >
                    {l}
                  </motion.span>
                ))}
              </span>

              <motion.span
                className="font-cinzel font-semibold text-[clamp(1.9rem,9vw,3.4rem)] leading-none text-[#CBA045] px-[0.05em]"
                style={{ transform: "rotate(-6deg)" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur(0.6), delay: d(1.25), ease: "easeOut" }}
                aria-hidden="true"
              >
                &amp;
              </motion.span>

              <span className="inline-flex">
                {CO_LETTERS.map((l, i) => (
                  <motion.span
                    key={l + i}
                    className={`font-poppins font-semibold text-[clamp(1.9rem,9vw,3.6rem)] leading-none tracking-[0.02em] ${
                      l === "." ? "text-[#CBA045]" : "text-[#F4ECDF]"
                    }`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur(0.5), delay: d(1.5 + i * 0.07), ease: EASE }}
                  >
                    {l}
                  </motion.span>
                ))}
              </span>
            </div>

            {/* ---- gold rule ---- */}
            <div className="relative h-px w-[min(70%,220px)] overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-0 bg-[#CBA045]"
                style={{ transformOrigin: "left center" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: dur(0.7), delay: d(1.95), ease: EASE_DRAW }}
              />
            </div>

            {/* ---- status label ---- */}
            <motion.p
              className="-mt-1 font-cinzel text-[1.35rem] text-[#9C8D7C]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.6), delay: d(2.25), ease: EASE }}
            >
              Setting the table&hellip;
            </motion.p>

            {/* ---- loading dots ---- */}
            <div className="mt-1.5 flex h-2 gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#CBA045]"
                  initial={{ opacity: 0 }}
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: [0.35, 1, 0.35], scale: [0.6, 1, 0.6] }
                  }
                  transition={
                    reduce
                      ? { delay: 0.3 }
                      : {
                          duration: 1.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.45 + i * 0.16,
                        }
                  }
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === "home" && (
          <motion.div
            key="home"
            className="relative z-10 flex flex-col items-center gap-3.5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur(0.7), ease: "easeOut" }}
          >
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 100 100" width="34" height="34">
                <circle cx="50" cy="50" r="38" fill="none" stroke={GOLD} strokeWidth="2.4" />
                <g transform="rotate(-20 50 50)">
                  <path
                    d="M42,30 L42,42 Q42,48 50,48 L50,72 M46,30 L46,40 M50,30 L50,40 M54,30 L54,40"
                    fill="none"
                    stroke={CREAM}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <g transform="rotate(20 50 50)">
                  <path
                    d="M44,30 Q60,32 58,44 Q57,50 50,50 L50,72"
                    fill="none"
                    stroke={CREAM}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span className="font-['Fraunces'] font-semibold text-2xl text-[#F4ECDF] tracking-[0.01em]">
                Dish &amp; Co
              </span>
            </div>
            <p className="font-['Caveat'] text-lg text-[#9C8D7C]">Your table is ready.</p>
            <button
              className="mt-2 rounded-full border border-[#CBA045]/40 px-5 py-2.5 font-['Space_Mono'] text-xs uppercase tracking-[0.08em] text-[#CBA045] transition-colors hover:bg-[#CBA045]/10"
              onClick={() => setPhase("intro")}
            >
              Replay intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}