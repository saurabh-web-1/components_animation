import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeartBurst = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(124);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#080808]">
    <motion.button
      onClick={handleLike}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      className="
        relative
        w-[175px]
        h-[58px]
        flex
        items-center
        justify-center
        gap-2.5
        rounded-[17px]
        border
        border-white/15
        bg-white/[0.06]
        text-[#aaa]
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,.45)]
        hover:bg-white/[0.09]
        hover:border-white/25
        hover:shadow-[0_25px_70px_rgba(0,0,0,.5)]
        overflow-visible
      "
    >
      {/* ================= RIPPLE ================= */}

      <AnimatePresence>
        {liked && (
          <motion.span
            key="ripple"
            initial={{
              scale: 0.3,
              opacity: 0.8,
            }}
            animate={{
              scale: 2.3,
              opacity: 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="
              absolute
              left-[48px]
              top-1/2
              w-7
              h-7
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-pink-500/80
              pointer-events-none
            "
          />
        )}
      </AnimatePresence>


      {/* ================= PARTICLES ================= */}

      <AnimatePresence>
        {liked &&
          [
            [-30, -28],
            [2, -40],
            [32, -25],
            [43, 4],
            [30, 31],
            [0, 39],
            [-34, 25],
            [-43, -2],
          ].map(([x, y], index) => (
            <motion.span
              key={`particle-${index}`}
              initial={{
                x: 48,
                y: "50%",
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: 48 + x,
                y: `calc(50% + ${y}px)`,
                scale: 0.2,
                opacity: 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.2, 0.8, 0.3, 1],
                delay: index * 0.02,
              }}
              className="
                absolute
                w-[5px]
                h-[5px]
                rounded-full
                bg-pink-500
                pointer-events-none
              "
            />
          ))}
      </AnimatePresence>


      {/* ================= FLOATING HEARTS ================= */}

      <AnimatePresence>
        {liked &&
          [
            [-25, -45],
            [30, -52],
            [45, -18],
          ].map(([x, y], index) => (
            <motion.span
              key={`mini-heart-${index}`}
              initial={{
                x: 45,
                y: "50%",
                scale: 0.3,
                opacity: 0,
              }}
              animate={{
                x: 45 + x,
                y: `calc(50% + ${y}px)`,
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="
                absolute
                text-[11px]
                text-pink-500
                pointer-events-none
              "
            >
              ♥
            </motion.span>
          ))}
      </AnimatePresence>


      {/* ================= HEART GLOW ================= */}

      <AnimatePresence>
        {liked && (
          <motion.span
            initial={{
              scale: 0.4,
              opacity: 0,
            }}
            animate={{
              scale: 1.8,
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              absolute
              left-[34px]
              top-1/2
              w-[30px]
              h-[30px]
              -translate-y-1/2
              rounded-full
              bg-pink-500/25
              blur-[15px]
              pointer-events-none
            "
          />
        )}
      </AnimatePresence>


      {/* ================= HEART ================= */}

      <motion.span
        animate={
          liked
            ? {
                scale: [0.35, 1.35, 0.9, 1.12, 1],
                rotate: [-7, -7, 5, -2, 0],
              }
            : {
                scale: 1,
                rotate: 0,
              }
        }
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative
          z-10
          w-[27px]
          h-[27px]
          flex
          items-center
          justify-center
        "
      >
        <svg
          viewBox="0 0 24 24"
          className={`
            w-[25px]
            h-[25px]
            overflow-visible
            transition-all
            duration-300
            ${
              liked
                ? "text-pink-500 drop-shadow-[0_0_8px_rgba(255,59,107,.55)]"
                : "text-[#aaa]"
            }
          `}
          fill="none"
        >
          <path
            d="
              M20.84 4.61
              C19.32 3.09 16.85 3.09 15.33 4.61
              L12 7.94
              L8.67 4.61
              C7.15 3.09 4.68 3.09 3.16 4.61
              C1.61 6.16 1.61 8.68 3.16 10.23
              L12 19
              L20.84 10.23
              C22.39 8.68 22.39 6.16 20.84 4.61Z
            "
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={liked ? "currentColor" : "none"}
          />
        </svg>
      </motion.span>


      {/* ================= TEXT ================= */}

      <span className="relative w-[75px] h-5 overflow-hidden text-left">

        <AnimatePresence mode="wait">

          {!liked ? (
            <motion.span
              key="like"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                absolute
                left-0
                top-0
                text-sm
                font-medium
                leading-5
              "
            >
              Like
            </motion.span>
          ) : (
            <motion.span
              key="liked"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                absolute
                left-0
                top-0
                text-sm
                font-medium
                leading-5
                text-pink-400
              "
            >
              Liked
            </motion.span>
          )}

        </AnimatePresence>


        {/* Count */}

        <motion.span
          key={count}
          initial={{
            y: liked ? 8 : -8,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`
            absolute
            left-[39px]
            top-0
            text-[11px]
            leading-5
            ${
              liked
                ? "text-pink-400"
                : "text-[#777]"
            }
          `}
        >
          {count}
        </motion.span>

      </span>
    </motion.button>
    </div>
  );
};

export default HeartBurst;