import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



function DownloadIcon({ size = 52, bounce = false }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={bounce ? { y: 0 } : false}
      animate={
        bounce
          ? {
              y: [0, -6, 0],
            }
          : {}
      }
      transition={
        bounce
          ? {
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }
          : {}
      }
      style={{
        filter:
          "drop-shadow(0 0 5px rgba(32,240,224,.95)) drop-shadow(0 0 14px rgba(32,240,224,.5))",
      }}
    >
      {/* Main Arrow */}

      <path
        d="
          M20.5 5
          H31.5
          V27
          H39
          L26 41
          L13 27
          H20.5
          V5
          Z
        "
        fill="#20F0E0"
      />

      {/* Bottom line */}

      <path
        d="M8 44H44"
        stroke="#20F0E0"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Highlight */}

      <path
        d="M24 8V25"
        stroke="#C8FFFB"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </motion.svg>
  );
}



export default function ParachuteDownload() {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);

 

  const startDownload = () => {
    if (status !== "idle") return;

    setProgress(0);
    setStatus("bounce");

    // Arrow upar bounce
    setTimeout(() => {
      setStatus("loading");
    }, 750);
  };

//  DOWNLOAD PROGRESS

  useEffect(() => {
    if (status !== "loading") return;

    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 5) + 2;

      if (value >= 100) {
        value = 100;

        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
         

          const success = Math.random() > 0.3;

          if (success) {
            setStatus("success");
          } else {
            setStatus("fail");

            
            setTimeout(() => {
              setProgress(0);
              setStatus("idle");
            }, 1900);
          }
        }, 350);
      } else {
        setProgress(value);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [status]);

  //  SUCCESS RESET

  const resetSuccess = () => {
    setProgress(0);
    setStatus("idle");
  };

  return (
    <div className="min-h-screen w-full bg-[#02090f] flex items-center justify-center overflow-hidden">

      <div className="relative w-[420px] h-[420px]">

        {/* BACKGROUND GLOW */}

        <motion.div
          className="absolute left-1/2 top-[42%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full pointer-events-none"
          animate={{
            width:
              status === "loading" ||
              status === "success" ||
              status === "fail"
                ? 430
                : 180,

            height:
              status === "loading" ||
              status === "success" ||
              status === "fail"
                ? 190
                : 180,

            opacity: status === "fail" ? 0.18 : 0.22,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              status === "fail"
                ? "radial-gradient(circle, rgba(239,68,68,.5), transparent 70%)"
                : "radial-gradient(circle, rgba(0,230,220,.5), transparent 70%)",
          }}
        />

        {/*NORMAL DOWNLOAD BUTTON */}

        <AnimatePresence mode="wait">

          {status === "idle" && (
            <motion.button
              key="normal"
              onClick={startDownload}
              className="
                absolute
                left-1/2
                top-[42%]
                -translate-x-1/2
                -translate-y-1/2
                w-[88px]
                h-[88px]
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                outline-none
              "
              initial={{
                scale: 0.75,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              {/* OUTER CIRCLE */}

              <motion.div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border-[3px]
                  border-[#20F0E0]
                "
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(32,240,224,.25)",
                    "0 0 28px rgba(32,240,224,.55)",
                    "0 0 10px rgba(32,240,224,.25)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* INNER CIRCLE */}

              <div
                className="
                  absolute
                  inset-[8px]
                  rounded-full
                  border
                  border-[#20F0E0]/25
                "
              />

              {/* CUSTOM DOWNLOAD */}

              <DownloadIcon size={52} />

            </motion.button>
          )}

        </AnimatePresence>

        {/* BOUNCING DOWNLOAD ICON */}

        {status === "bounce" && (
          <motion.div
            className="
              absolute
              left-1/2
              top-[42%]
              -translate-x-1/2
              z-30
            "
            initial={{
              y: 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              y: -100,
              scale: [1, 1.15, 0.85],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DownloadIcon
              size={58}
              bounce
            />
          </motion.div>
        )}

        {/*  DOWNLOAD AREA*/}

        {(status === "loading" ||
          status === "success" ||
          status === "fail") && (

          <div
            className="
              absolute
              left-1/2
              top-[42%]
              -translate-x-1/2
              w-[330px]
              h-[190px]
            "
          >

            {/* PARACHUTE*/}

            {status === "loading" && (
              <motion.div
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  top-[-105px]
                  z-20
                "
                initial={{
                  y: -35,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 7px rgba(32,240,224,.9))",
                }}
              >

                <svg
                  width="82"
                  height="110"
                  viewBox="0 0 82 110"
                  fill="none"
                >

                  {/* PARACHUTE CANOPY */}

                  <path
                    d="
                      M8 34
                      C10 14 27 5 41 5
                      C55 5 72 14 74 34
                      C62 30 52 31 41 39
                      C30 31 20 30 8 34Z
                    "
                    fill="#20F0E0"
                    fillOpacity=".18"
                    stroke="#20F0E0"
                    strokeWidth="2.5"
                  />

                  {/* CANOPY CENTER */}

                  <path
                    d="M41 6V38"
                    stroke="#20F0E0"
                    strokeWidth="1.6"
                  />

                  {/* LEFT CANOPY */}

                  <path
                    d="M20 15L41 38"
                    stroke="#20F0E0"
                    strokeWidth="1.6"
                  />

                  {/* RIGHT CANOPY */}

                  <path
                    d="M62 15L41 38"
                    stroke="#20F0E0"
                    strokeWidth="1.6"
                  />

                  {/* STRINGS */}

                  <path
                    d="M20 30L31 57"
                    stroke="#20F0E0"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M62 30L51 57"
                    stroke="#20F0E0"
                    strokeWidth="1.8"
                  />

                  {/* ARROW SHAFT */}

                  <path
                    d="M41 48V91"
                    stroke="#20F0E0"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* ARROW HEAD */}

                  <path
                    d="
                      M29 80
                      L41 95
                      L53 80
                      H46
                      V69
                      H36
                      V80
                      Z
                    "
                    fill="#20F0E0"
                  />

                </svg>

              </motion.div>
            )}

            {/*PROGRESS BAR*/}

            <motion.div
              className="
                absolute
                left-1/2
                -translate-x-1/2
                top-[80px]
                w-[330px]
              "
              initial={{
                scaleX: 0,
                opacity: 0,
              }}
              animate={{
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* TRACK */}

              <div
                className="
                  relative
                  w-full
                  h-[4px]
                  rounded-full
                  bg-[#13272e]
                "
              >

                {/* PROGRESS */}

                <motion.div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    rounded-full
                    bg-[#20F0E0]
                  "
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.12,
                    ease: "linear",
                  }}
                  style={{
                    boxShadow:
                      "0 0 8px rgba(32,240,224,.95), 0 0 18px rgba(32,240,224,.45)",
                  }}
                />

              </div>

              {/* PERCENTAGE */}

              {status === "loading" && (
                <motion.div
                  className="
                    mt-8
                    text-center
                    text-[12px]
                    tracking-[2px]
                    text-white/40
                  "
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                >
                  {progress}%
                </motion.div>
              )}

              {status === "success" && (
                <div
                  className="
                    mt-8
                    text-center
                    text-[12px]
                    tracking-[2px]
                    text-white/40
                  "
                >
                  100%
                </div>
              )}

            </motion.div>

            {/* SUCCESS CHECK*/}

            {status === "success" && (
              <motion.div
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  top-[-48px]
                "
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 16,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 7px rgba(32,240,224,.9))",
                }}
              >

                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                >

                  <motion.path
                    d="M10 28L22 40L47 12"
                    stroke="#20F0E0"
                    strokeWidth="6"
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

                </svg>

              </motion.div>
            )}

            {/* FAILURE*/}

            {status === "fail" && (
              <motion.div
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  top-[-105px]
                  z-30
                "
                style={{
                  filter:
                    "drop-shadow(0 0 8px rgba(239,68,68,.85))",
                }}
              >

                <svg
                  width="90"
                  height="130"
                  viewBox="0 0 90 130"
                  fill="none"
                >

                  {/* LEFT BROKEN PARACHUTE */}

                  <motion.path
                    d="
                      M45 38
                      C35 31 22 30 8 35
                      C11 15 25 5 42 5
                    "
                    stroke="#EF4444"
                    strokeWidth="3"
                    fill="none"
                    animate={{
                      x: [-2, -22],
                      y: [0, -15],
                      rotate: [0, -20],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                  />

                  {/* RIGHT BROKEN PARACHUTE */}

                  <motion.path
                    d="
                      M45 38
                      C55 31 68 30 82 35
                      C79 15 65 5 48 5
                    "
                    stroke="#EF4444"
                    strokeWidth="3"
                    fill="none"
                    animate={{
                      x: [2, 22],
                      y: [0, -15],
                      rotate: [0, 20],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                  />

                  {/* FALLING ARROW */}

                  <motion.g
                    animate={{
                      y: [0, 20, 75, 130],
                      rotate: [0, -5, 10, 20],
                      opacity: [1, 1, 0.8, 0],
                    }}
                    transition={{
                      duration: 1.25,
                      ease: "easeIn",
                    }}
                  >

                    <path
                      d="M45 48V90"
                      stroke="#EF4444"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    <path
                      d="
                        M33 78
                        L45 94
                        L57 78
                        H50
                        V69
                        H40
                        V78
                        Z
                      "
                      fill="#EF4444"
                    />

                  </motion.g>

                </svg>

              </motion.div>
            )}

            {/* FAILURE RED LINE SHRINK */}

            {status === "fail" && (
              <motion.div
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  top-[80px]
                  h-[4px]
                  rounded-full
                  bg-red-500
                "
                initial={{
                  width: 330,
                  opacity: 1,
                }}
                animate={{
                  width: [330, 270, 150, 40],
                  opacity: [1, 1, 0.7, 0],
                }}
                transition={{
                  duration: 1.35,
                  ease: [0.65, 0, 0.35, 1],
                }}
                style={{
                  boxShadow:
                    "0 0 10px rgba(239,68,68,.9), 0 0 20px rgba(239,68,68,.4)",
                }}
              />
            )}

          </div>
        )}

        {/*  SUCCESS RESET*/}

        {status === "success" && (
          <motion.button
            onClick={resetSuccess}
            className="
              absolute
              left-1/2
              top-[68%]
              -translate-x-1/2
              text-[9px]
              tracking-[4px]
              uppercase
              text-white/30
              hover:text-white/70
              transition
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
            }}
          >
            Download Again
          </motion.button>
        )}

      </div>
    </div>
  );
}