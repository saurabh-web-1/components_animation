import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");

  // Store timeout so it can be cancelled safely
  const searchTimeoutRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    // Don't start  while searching
    if (!query.trim() || status === "searching") {
      return;
    }

    // Start loading
    setStatus("searching");

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Demo search/API delay
    searchTimeoutRef.current = setTimeout(() => {
      setStatus("success");
      searchTimeoutRef.current = null;
    }, 1400);
  };

  const resetSearch = () => {
    // Clear  timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    setQuery("");
    setStatus("idle");
  };

  // Cleanup timeout when component unmounts
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-5">
      <div className="w-full max-w-xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className=" text-3xl font-bold tracking-tight text-white
            "
          >
            Animated Search
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 0.5,
            }}
            className="
              mt-2
              text-sm
              text-zinc-500
            "
          >
            Search with a little bit of magic ✨
          </motion.p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          {/* Search Box */}
          <motion.div
            animate={
              status === "searching"
                ? {
                    scale: [1, 1.015, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.5,
              repeat: status === "searching" ? Infinity : 0,
            }}
            className=" relative flex  h-16 items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl
            "
          >
            {/* Top Highlight */}
            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
              "
            />

            {/* Animated Search Icon */}
            <motion.div
              animate={
                status === "searching"
                  ? {
                      x: [0, 4, 0],
                      rotate: [0, 15, -15, 0],
                    }
                  : status === "success"
                    ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, 0],
                      }
                    : {
                        x: 0,
                        rotate: 0,
                        scale: 1,
                      }
              }
              transition={{
                duration: status === "searching" ? 0.7 : 0.45,
                repeat: status === "searching" ? Infinity : 0,
              }}
              className="
                ml-5
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
              "
            >
              <AnimatePresence mode="wait">
                {/* SUCCESS ICON */}
                {status === "success" ? (
                  <motion.svg
                    key="success"
                    initial={{
                      scale: 0,
                      rotate: -45,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 18,
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="
                      h-6
                      w-6
                      text-emerald-400
                    "
                  >
                    <motion.path
                      d="M5 12.5L9.5 17L19 7"
                      strokeWidth="2.5"
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
                        ease: "easeOut",
                      }}
                    />
                  </motion.svg>
                ) : (
                  /* Search ICON */
                  <motion.svg
                    key="search"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="
                      h-6
                      w-6
                      text-zinc-400
                    "
                  >
                    <circle cx="11" cy="11" r="6.5" strokeWidth="2" />

                    <path
                      d="M16 16L21 21"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Input */}
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);

                // starts typing again after success
                if (status === "success") {
                  setStatus("idle");
                }
              }}
              placeholder="Search anything..."
              disabled={status === "searching"}
              className="
                h-full
                min-w-0
                flex-1
                bg-transparent
                px-4
                text-base
                text-white
                outline-none
                placeholder:text-zinc-500
              "
            />

            {/* Search Button */}
            <motion.button
              type="submit"
              disabled={!query.trim() || status === "searching"}
              whileHover={
                status !== "searching"
                  ? {
                      scale: 1.04,
                    }
                  : {}
              }
              whileTap={
                status !== "searching"
                  ? {
                      scale: 0.94,
                    }
                  : {}
              }
              className="
                mr-2
                flex
                h-12
                min-w-[105px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-5
                text-sm
                font-semibold
                text-black
                transition
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {/* SEARCHING */}
              {status === "searching" ? (
                <>
                  <motion.span
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      h-4
                      w-4
                      rounded-full
                      border-2
                      border-black
                      border-t-transparent
                    "
                  />

                  <span>Searching</span>
                </>
              ) : status === "success" ? (
                /* SUCCESS */
                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                >
                  Done ✓
                </motion.span>
              ) : (
                "Search"
              )}
            </motion.button>

            <AnimatePresence>
              {status === "searching" && (
                <motion.div
                  key="scanning-line"
                  initial={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  animate={{
                    x: "200%",
                    opacity: 1,
                  }}
                  exit={{
                    x: "200%",
                    opacity: 0,
                  }}
                  transition={{
                    x: {
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: {
                      duration: 0.15,
                    },
                  }}
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-1/2
                    bg-white
                  "
                />
              )}
            </AnimatePresence>
          </motion.div>
        </form>

        {/* SUCCESS RESULT */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="
                mt-4
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-5
                backdrop-blur-xl
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Search completed
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-zinc-500
                  "
                >
                  Results found for "{query}"
                </p>
              </div>

              {/* Result Icon */}
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -30,
                }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: 0,
                }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 500,
                  damping: 18,
                }}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-500/10
                  text-emerald-400
                "
              >
                <motion.span
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                >
                  ✓
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEARCH AGAIN */}
        <AnimatePresence>
          {status === "success" && (
            <motion.button
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              onClick={resetSearch}
              className="
                mx-auto
                mt-4
                block
                text-xs
                text-zinc-500
                transition
                hover:text-white
              "
            >
              Search again
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
