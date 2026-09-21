import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NovaDownload() {
  const [status, setStatus] = useState("idle");

  // Diamond movement + button shrinking complete
  useEffect(() => {
    if (status !== "morphing") return;

    const timer = setTimeout(() => {
      setStatus("loading");
    }, 850);

    return () => clearTimeout(timer);
  }, [status]);

  // Loading complete
  useEffect(() => {
    if (status !== "loading") return;

    const timer = setTimeout(() => {
      setStatus("complete");
    }, 2300);

    return () => clearTimeout(timer);
  }, [status]);

  const handleClick = () => {
    if (status === "idle") {
      setStatus("morphing");
    }

    if (status === "complete") {
      setStatus("idle");
    }
  };

  const isMorphing = status === "morphing";
  const isLoading = status === "loading";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#03070d]">

      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        animate={{
          width:
            status === "idle" || status === "complete"
              ? 148
              : 64,

          height:
            status === "idle" || status === "complete"
              ? 48
              : 64,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          flex
          items-center
          border
          border-white/30
          bg-white/[0.035]
          text-white
          backdrop-blur-xl
          shadow-[0_12px_40px_rgba(0,0,0,.4)]
          rounded-full
          overflow-hidden
          outline-none
          cursor-pointer
        "
      >

        {/* DOWNLOAD ICON */}

        <AnimatePresence>
          {status === "idle" && (
            <motion.div
              key="download"
              initial={{
                left: 15,
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                left: 15,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              className="
                absolute
                top-1/2
                -translate-y-1/2
                w-7
                h-7
                flex
                items-center
                justify-center
                z-30
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-lime-300"
                fill="none"
              >
                <path
                  d="M12 3V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M7 11L12 16L17 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M5 21H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>


      

        <AnimatePresence>
          {isMorphing && (
            <motion.div
              key="diamond"
              initial={{
                left: 15,
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                

                left: 18,

                opacity: 1,

                scale: [0.7, 1.15, 1],
              }}
              transition={{
                left: {
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                },

                scale: {
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="
                absolute
                top-1/2
                -translate-y-1/2
                w-7
                h-7
                flex
                items-center
                justify-center
                z-30
              "
            >

              <motion.svg
                viewBox="0 0 24 24"
                className="
                  w-6
                  h-6
                  text-amber-300
                "
                fill="none"
                initial={{
                  rotate: -45,
                }}
                animate={{
                  rotate: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
              >
                <path
                  d="
                    M12 3
                    L19 12
                    L12 21
                    L5 12
                    Z
                  "
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                <path
                  d="
                    M12 7
                    L16 12
                    L12 17
                    L8 12
                    Z
                  "
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              </motion.svg>

            </motion.div>
          )}
        </AnimatePresence>


        {/*LOADING DIAMOND */}

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loading-diamond"
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                z-30
              "
            >

              <svg
                viewBox="0 0 24 24"
                className="
                  w-6
                  h-6
                  text-amber-300
                "
                fill="none"
              >
                <path
                  d="
                    M12 3
                    L19 12
                    L12 21
                    L5 12
                    Z
                  "
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                <path
                  d="
                    M12 7
                    L16 12
                    L12 17
                    L8 12
                    Z
                  "
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.6"
                />

              </svg>

            </motion.div>
          )}
        </AnimatePresence>


        {/* LOADING RING */}

        {isLoading && (
          <svg
            viewBox="0 0 64 64"
            className="
              absolute
              inset-0
              w-full
              h-full
              -rotate-90
              z-10
            "
          >

            {/* Background */}

            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,.08)"
              strokeWidth="3"
            />

            {/* Progress */}

            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#21d5bc"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="1"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
              }}
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(33,213,188,.8))",
              }}
            />

          </svg>
        )}


        {/* SUCCESS CHECK */}

        <AnimatePresence>
          {status === "complete" && (
            <motion.div
              key="success"
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-7
                h-7
                flex
                items-center
                justify-center
              "
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
            >

              <svg
                viewBox="0 0 24 24"
                className="
                  w-6
                  h-6
                  text-emerald-300
                "
                fill="none"
              >
                <motion.path
                  d="M5 12.5L9.5 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                />
              </svg>

            </motion.div>
          )}
        </AnimatePresence>


        {/* DOWNLOAD TEXT */}

        <AnimatePresence mode="wait">

          {status === "idle" && (
            <motion.span
              key="download"
              initial={{
                opacity: 0,
                x: 5,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 10,
              }}
              className="
                absolute
                left-[50px]
                text-sm
                font-medium
                tracking-wide
                whitespace-nowrap
              "
            >
              Download
            </motion.span>
          )}

          {status === "complete" && (
            <motion.span
              key="open"
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="
                absolute
                left-[48px]
                text-sm
                font-medium
                tracking-wide
              "
            >
              Open
            </motion.span>
          )}

        </AnimatePresence>

      </motion.button>
    </div>
  );
}