
import React from "react";
import { motion } from "framer-motion";

const GradientBackground = ({
  children,
  className = "",
  preset = "aurora",
}) => {
  
  const presets = {
    aurora: [
      {
        colors: ["#4F46E5", "#7C3AED"],
        position: "top-[-15%] left-[-10%]",
        size: "w-[550px] h-[550px]",
      },
      {
        colors: ["#EC4899", "#8B5CF6"],
        position: "top-[25%] right-[-15%]",
        size: "w-[600px] h-[600px]",
      },
      {
        colors: ["#06B6D4", "#3B82F6"],
        position: "bottom-[-20%] left-[25%]",
        size: "w-[600px] h-[600px]",
      },
    ],

    sunset: [
      {
        colors: ["#F59E0B", "#EF4444"],
        position: "top-[-15%] right-[-10%]",
        size: "w-[600px] h-[600px]",
      },
      {
        colors: ["#EC4899", "#F97316"],
        position: "bottom-[-20%] left-[-15%]",
        size: "w-[600px] h-[600px]",
      },
      {
        colors: ["#8B5CF6", "#F43F5E"],
        position: "top-[35%] left-[35%]",
        size: "w-[500px] h-[500px]",
      },
    ],

    ocean: [
      {
        colors: ["#0EA5E9", "#06B6D4"],
        position: "top-[-15%] left-[-10%]",
        size: "w-[600px] h-[600px]",
      },
      {
        colors: ["#3B82F6", "#8B5CF6"],
        position: "bottom-[-20%] right-[-10%]",
        size: "w-[650px] h-[650px]",
      },
      {
        colors: ["#14B8A6", "#0EA5E9"],
        position: "top-[35%] right-[15%]",
        size: "w-[450px] h-[450px]",
      },
    ],

    forest: [
      {
        colors: ["#059669", "#10B981"],
        position: "top-[-15%] right-[10%]",
        size: "w-[600px] h-[600px]",
      },
      {
        colors: ["#14B8A6", "#22C55E"],
        position: "bottom-[-20%] left-[-10%]",
        size: "w-[650px] h-[650px]",
      },
      {
        colors: ["#84CC16", "#10B981"],
        position: "top-[30%] left-[35%]",
        size: "w-[450px] h-[450px]",
      },
    ],

    neon: [
      {
        colors: ["#F0ABFC", "#C084FC"],
        position: "top-[-15%] left-[-10%]",
        size: "w-[600px] h-[600px]",
      },
      {
        colors: ["#22D3EE", "#A78BFA"],
        position: "bottom-[-20%] right-[-10%]",
        size: "w-[650px] h-[650px]",
      },
      {
        colors: ["#FB7185", "#C084FC"],
        position: "top-[35%] left-[35%]",
        size: "w-[500px] h-[500px]",
      },
    ],
  };

  const blobs = presets[preset] || presets.aurora;

  return (
    <div
      className={`
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#020617]
        ${className}
      `}
    >
      {/* =========================
          BACKGROUND
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* --------------------------------
            Animated Gradient Blobs
        --------------------------------- */}
        {blobs.map((blob, index) => (
          <motion.div
            key={index}
            className={`
              absolute
              rounded-full
              ${blob.size}
              ${blob.position}
            `}
            style={{
              background: `linear-gradient(
                135deg,
                ${blob.colors[0]},
                ${blob.colors[1]}
              )`,
              filter: "blur(100px)",
              opacity: 0.4,
            }}
            animate={{
              scale: [1, 1.15, 0.9, 1],
              rotate: [0, 90, 180, 270, 360],
              x: [0, 60, -40, 0],
              y: [0, -50, 60, 0],
              borderRadius: [
                "40%",
                "50%",
                "40%",
                "50%",
                "40%",
              ],
            }}
            transition={{
              duration: 18 + index * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* --------------------------------
            Center Glow
        --------------------------------- */}
        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-[350px]
            w-[350px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* --------------------------------
            Aurora Light
        --------------------------------- */}
        <motion.div
          className="
            absolute
            left-[-20%]
            top-[25%]
            h-[30%]
            w-[140%]
            rotate-[-8deg]
            rounded-[50%]
            bg-gradient-to-r
            from-transparent
            via-cyan-400/20
            via-blue-500/25
            to-transparent
            blur-[80px]
          "
          animate={{
            x: ["-5%", "10%", "-5%"],
            rotate: [-8, -3, -10],
            scaleY: [1, 1.3, 0.9],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* --------------------------------
            Second Aurora Light
        --------------------------------- */}
        <motion.div
          className="
            absolute
            left-[-15%]
            top-[50%]
            h-[25%]
            w-[130%]
            rotate-[8deg]
            rounded-[50%]
            bg-gradient-to-r
            from-transparent
            via-violet-500/15
            via-fuchsia-500/20
            to-transparent
            blur-[90px]
          "
          animate={{
            x: ["10%", "-10%", "10%"],
            rotate: [8, 3, 10],
            scaleY: [1, 0.8, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* --------------------------------
            Stars
        --------------------------------- */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, index) => (
            <motion.span
              key={index}
              className="
                absolute
                h-[2px]
                w-[2px]
                rounded-full
                bg-white
              "
              style={{
                left: `${(index * 47) % 100}%`,
                top: `${(index * 71) % 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.7, 0.1],
                scale: [0.7, 1.5, 0.7],
              }}
              transition={{
                duration: 2 + (index % 4),
                repeat: Infinity,
                delay: (index % 6) * 0.5,
              }}
            />
          ))}
        </div>

        {/* --------------------------------
            Grid
        --------------------------------- */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />

        {/* --------------------------------
            Vignette
        --------------------------------- */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]
          "
        />
      </div>

      {/* =========================
          CONTENT
      ========================== */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;


