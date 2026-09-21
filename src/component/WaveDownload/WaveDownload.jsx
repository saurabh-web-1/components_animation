import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WaveDownload() {
  const [status, setStatus] = useState("idle");

  const startDownload = () => {
    if (status !== "idle") return;

    // Download  Line
    setStatus("morphing");

    // Line  Wave
    setTimeout(() => {
      setStatus("loading");
    }, 700);

    // Demo download result
    setTimeout(() => {
      // 65% success / 35% failed
      const success = Math.random() > 0.35;

      if (success) {
        setStatus("success");
      } else {
        setStatus("fail");

        setTimeout(() => {
          setStatus("idle");
        }, 1200);
      }
    }, 3200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050b12]">

      {/* BUTTON */}

      <motion.button
        onClick={startDownload}
        disabled={status !== "idle"}
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: 86,
          height: 86,
          borderRadius: 999,
        }}
        animate={
          status === "fail"
            ? {
                scaleX: [1, 0.12, 0.55, 1],
              }
            : {
                scaleX: 1,
              }
        }
        transition={{
          duration: 0.8,
          times: [0, 0.45, 0.7, 1],
          ease: "easeInOut",
        }}
      >

        {/* BACKGROUND*/}

        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor:
              status === "fail"
                ? ["#0891b2", "#ef4444", "#ef4444"]
                : status === "success"
                ? "#0891b2"
                : "#0891b2",

            boxShadow:
              status === "fail"
                ? [
                    "0 0 25px rgba(8,145,178,.35)",
                    "0 0 45px rgba(239,68,68,.75)",
                    "0 0 25px rgba(239,68,68,.45)",
                  ]
                : "0 0 30px rgba(8,145,178,.35)",
          }}
          transition={{
            duration: 0.8,
          }}
        />

        {/*INNER RING*/}

        <motion.div
          className="absolute inset-[9px] rounded-full border-2 border-white/25"
          animate={
            status === "fail"
              ? {
                  borderColor: "#ffffff55",
                }
              : {}
          }
        />

        <AnimatePresence mode="wait">

          {/*DOWNLOAD ICON*/}

          {status === "idle" && (
            <motion.svg
              key="download"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              className="relative z-10"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.4,
                rotate: 90,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              {/* Arrow */}
              <path
                d="M21 6V27"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Arrow Head */}
              <path
                d="M12 19L21 28L30 19"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Bottom Line */}
              <path
                d="M8 35H34"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </motion.svg>
          )}

          {/*HORIZONTAL LINE*/}

          {status === "morphing" && (
            <motion.div
              key="line"
              className="relative z-10 h-[3px] rounded-full bg-white"
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 34,
                opacity: 1,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}

          {/*WAVE LOADING*/}

          {status === "loading" && (
            <motion.div
              key="wave"
              className="relative z-10 w-[48px] h-[35px] flex items-center justify-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >

              <svg
                width="48"
                height="35"
                viewBox="0 0 48 35"
                fill="none"
              >

                {/* Main Wave */}

                <motion.path
                  d="
                    M2 18
                    C6 10, 10 26, 14 18
                    C18 10, 22 26, 26 18
                    C30 10, 34 26, 38 18
                    C42 10, 46 26, 50 18
                  "
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    d: [
                      `
                        M2 18
                        C6 10, 10 26, 14 18
                        C18 10, 22 26, 26 18
                        C30 10, 34 26, 38 18
                        C42 10, 46 26, 50 18
                      `,
                      `
                        M2 18
                        C6 25, 10 10, 14 18
                        C18 25, 22 10, 26 18
                        C30 25, 34 10, 38 18
                        C42 25, 46 10, 50 18
                      `,
                      `
                        M2 18
                        C6 10, 10 26, 14 18
                        C18 10, 22 26, 26 18
                        C30 10, 34 26, 38 18
                        C42 10, 46 26, 50 18
                      `,
                    ],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Wave Glow */}

                <motion.path
                  d="
                    M2 18
                    C6 10, 10 26, 14 18
                    C18 10, 22 26, 26 18
                    C30 10, 34 26, 38 18
                    C42 10, 46 26, 50 18
                  "
                  stroke="white"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.12"
                  animate={{
                    d: [
                      `
                        M2 18
                        C6 10, 10 26, 14 18
                        C18 10, 22 26, 26 18
                        C30 10, 34 26, 38 18
                        C42 10, 46 26, 50 18
                      `,
                      `
                        M2 18
                        C6 25, 10 10, 14 18
                        C18 25, 22 10, 26 18
                        C30 25, 34 10, 38 18
                        C42 25, 46 10, 50 18
                      `,
                    ],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

              </svg>

              {/* Loading Dots */}

              <motion.span
                className="absolute -bottom-1 text-[8px] text-white/80 font-medium"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                •••
              </motion.span>

            </motion.div>
          )}

          {/* SUCCESS*/}

          {status === "success" && (
            <motion.svg
              key="success"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="relative z-10"
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <motion.path
                d="M10 21L17 28L31 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                }}
              />
            </motion.svg>
          )}

          {/* FAILURE */}

          {status === "fail" && (
            <motion.svg
              key="fail"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              className="relative z-10"
              initial={{
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.35,
              }}
            >

              {/* 1 */}

              <motion.path
                d="M10 10L28 28"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 0.25,
                }}
              />

              {/* 2 */}

              <motion.path
                d="M28 10L10 28"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.25,
                }}
              />

            </motion.svg>
          )}

        </AnimatePresence>
      </motion.button>

      {/* STATUS TEXT */}

      <AnimatePresence mode="wait">

        {/* Loading */}

        {status === "loading" && (
          <motion.div
            key="loadingText"
            className="mt-5 text-[11px] tracking-[3px] text-white/50 uppercase"
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            Downloading
          </motion.div>
        )}

        {/* Success */}

        {status === "success" && (
          <motion.div
            key="successText"
            className="mt-5 text-[11px] tracking-[3px] text-cyan-300 uppercase"
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            Success
          </motion.div>
        )}

        {/* Failed */}

        {status === "fail" && (
          <motion.div
            key="failText"
            className="mt-5 text-[11px] tracking-[3px] text-red-400 uppercase"
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            Failed
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}