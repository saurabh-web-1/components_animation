import { motion } from "framer-motion";

const AuroraBackground = ({
  children,
  className = "",
  showRadialGradient = true,
}) => {
  const blobs = [
    {
      className:
        "left-[-15%] top-[-20%] h-[550px] w-[550px] bg-cyan-400/25",
      animate: {
        x: [0, 180, -80, 0],
        y: [0, 100, 220, 0],
        scale: [1, 1.2, 0.9, 1],
      },
      duration: 16,
    },
    {
      className:
        "right-[-15%] top-[5%] h-[600px] w-[600px] bg-violet-500/25",
      animate: {
        x: [0, -180, 80, 0],
        y: [0, 180, -80, 0],
        scale: [1, 0.85, 1.2, 1],
      },
      duration: 18,
    },
    {
      className:
        "left-[20%] bottom-[-25%] h-[600px] w-[600px] bg-blue-500/20",
      animate: {
        x: [0, -150, 150, 0],
        y: [0, -180, 50, 0],
        scale: [1, 1.15, 0.85, 1],
      },
      duration: 20,
    },
    {
      className:
        "right-[20%] bottom-[-20%] h-[450px] w-[450px] bg-fuchsia-500/15",
      animate: {
        x: [0, 120, -150, 0],
        y: [0, -100, -220, 0],
        scale: [1, 0.8, 1.15, 1],
      },
      duration: 17,
    },
  ];

  return (
    <div
      className={`
        relative min-h-screen overflow-hidden
        bg-[#030712]
        text-white
        ${className}
      `}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Deep radial glow */}
        {showRadialGradient && (
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.18),transparent_45%)]
            "
          />
        )}

        {/* Animated blobs */}
        {blobs.map((blob, index) => (
          <motion.div
            key={index}
            className={`
              absolute rounded-full
              blur-[100px]
              ${blob.className}
            `}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Aurora wave */}
        <motion.div
          className="
            absolute
            left-[-20%]
            top-[25%]
            h-[35%]
            w-[140%]
            rotate-[-8deg]
            opacity-30
            blur-[80px]

            bg-gradient-to-r
            from-cyan-400/0
            via-cyan-400/30
            via-blue-500/30
            via-violet-500/30
            to-fuchsia-500/0
          "
          animate={{
            x: ["-10%", "10%", "-10%"],
            rotate: [-8, -4, -10],
            scaleY: [1, 1.3, 0.9],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Second Aurora wave */}
        <motion.div
          className="
            absolute
            left-[-15%]
            top-[40%]
            h-[25%]
            w-[130%]
            rotate-[6deg]
            opacity-20
            blur-[70px]

            bg-gradient-to-r
            from-blue-500/0
            via-blue-400/40
            via-purple-500/40
            to-pink-500/0
          "
          animate={{
            x: ["10%", "-10%", "10%"],
            rotate: [6, 10, 3],
            scaleY: [1, 0.8, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glow orbs */}
        <motion.div
          className="
            absolute left-[45%] top-[20%]
            h-32 w-32
            rounded-full
            bg-blue-400/20
            blur-3xl
          "
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 45 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-white/40"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
              }}
              animate={{
                opacity: [0.15, 0.7, 0.15],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 2 + (i % 4),
                repeat: Infinity,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>

        {/* Grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.55)_100%)]
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;

