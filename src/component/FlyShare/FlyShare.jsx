import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedShareButton() {
  const [sending, setSending] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (sending) return;

    setSending(true);

    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}

    // Plane flight duration
    setTimeout(() => {
      setSending(false);
      setShared(true);
    }, 1200);

    // Reset
    setTimeout(() => {
      setShared(false);
    }, 2800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">

      <motion.button
        onClick={handleShare}
        disabled={sending}
        whileHover={!sending ? { y: -3 } : {}}
        whileTap={!sending ? { scale: 0.94 } : {}}
        className="group relative h-[58px] w-[180px] overflow-visible rounded-2xl border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.5)]"
      >

        {/* ================================
            BUTTON GLOW
        ================================= */}

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-white/10 blur-xl"
          animate={{
            opacity: sending ? 0.9 : shared ? 0.6 : 0,
            scale: sending ? 1.25 : 1,
          }}
          transition={{ duration: 0.3 }}
        />


        {/* ================================
            SUCCESS FLASH
        ================================= */}

        <AnimatePresence>
          {shared && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl border border-white/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.05, 1.2],
              }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>


        {/* ================================
            CONTENT
        ================================= */}

        <div className="relative z-10 flex h-full items-center justify-center gap-3">

          {/* ICON AREA */}

          <div className="relative h-7 w-8">

            {/* --------------------------------
                NORMAL SHARE ICON
            -------------------------------- */}

            <AnimatePresence>
              {!sending && !shared && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.4,
                    x: -8,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                  >
                    <circle
                      cx="18"
                      cy="5"
                      r="2.3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="6"
                      cy="12"
                      r="2.3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="18"
                      cy="19"
                      r="2.3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M8.2 10.8L15.8 6.3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M8.2 13.2L15.8 17.7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>


            {/* --------------------------------
                PAPER PLANE
            -------------------------------- */}

            <AnimatePresence>
              {sending && (
                <motion.div
                  className="absolute left-0 top-0 z-30"
                  initial={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 0.65,
                    opacity: 0,
                  }}
                  animate={{
                    x: [0, 3, 75, 135],
                    y: [0, 4, -25, -82],
                    rotate: [-8, -8, -3, 8],
                    scale: [0.65, 0.85, 1, 0.75],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.15,
                    times: [0, 0.12, 0.55, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >

                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="h-8 w-8 drop-shadow-[0_0_12px_rgba(255,255,255,.4)]"
                  >
                    <path
                      d="M4 20L35 4L25 35L18 23L4 20Z"
                      fill="white"
                    />

                    <path
                      d="M18 23L35 4"
                      stroke="#777"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M18 23L20 31"
                      stroke="#999"
                      strokeWidth="1.5"
                    />
                  </svg>

                </motion.div>
              )}
            </AnimatePresence>


            {/* --------------------------------
                TRAIL
            -------------------------------- */}

            <AnimatePresence>
              {sending && (
                <>
                  <motion.span
                    className="absolute left-1 top-3 h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-white/60 to-transparent"
                    initial={{
                      scaleX: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scaleX: [0, 1, 1],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15,
                    }}
                  />

                  <motion.span
                    className="absolute left-2 top-5 h-[1px] w-10 origin-left rounded-full bg-white/30"
                    initial={{
                      scaleX: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scaleX: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.25,
                    }}
                  />
                </>
              )}
            </AnimatePresence>


            {/* --------------------------------
                PARTICLES
            -------------------------------- */}

            <AnimatePresence>
              {sending &&
                [...Array(7)].map((_, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-2 top-3 h-1 w-1 rounded-full bg-white"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: -15 - index * 4,
                      y:
                        index % 2 === 0
                          ? 5 + index * 2
                          : -5 - index * 2,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 0.15 + index * 0.04,
                      ease: "easeOut",
                    }}
                  />
                ))}
            </AnimatePresence>


            {/* --------------------------------
                SUCCESS CHECK
            -------------------------------- */}

            <AnimatePresence>
              {shared && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                  >
                    <motion.path
                      d="M5 12.5L9.5 17L19 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

          </div>


          {/* ================================
              TEXT
          ================================= */}

          <div className="relative min-w-[65px] text-left">

            <AnimatePresence mode="wait">

              {!sending && !shared && (
                <motion.span
                  key="share"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="block text-sm font-medium"
                >
                  Share
                </motion.span>
              )}


              {sending && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="block text-sm font-medium text-neutral-300"
                >
                  Sending...
                </motion.span>
              )}


              {shared && (
                <motion.span
                  key="shared"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="block text-sm font-medium"
                >
                  Shared
                </motion.span>
              )}

            </AnimatePresence>

          </div>


          {/* Arrow */}

          {!sending && !shared && (
            <motion.span
              animate={{
                x: [0, 3, 0],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm text-neutral-500"
            >
              ↗
            </motion.span>
          )}

        </div>
      </motion.button>

    </div>
  );
}