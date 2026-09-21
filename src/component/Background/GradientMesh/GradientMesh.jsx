
import React, { useEffect, useRef } from "react";

const DEFAULT_POINTS = {
  luxury: [
    {
      x: 20,
      y: 30,
      color: "hsla(43, 74%, 49%, 0.4)",
      radius: 300,
    },
    {
      x: 80,
      y: 70,
      color: "hsla(43, 74%, 49%, 0.2)",
      radius: 400,
    },
    {
      x: 50,
      y: 50,
      color: "hsla(0, 0%, 50%, 0.1)",
      radius: 350,
    },
  ],

  cyberpunk: [
    {
      x: 25,
      y: 25,
      color: "hsla(174, 100%, 50%, 0.4)",
      radius: 300,
    },
    {
      x: 75,
      y: 75,
      color: "hsla(320, 80%, 55%, 0.4)",
      radius: 300,
    },
    {
      x: 50,
      y: 50,
      color: "hsla(260, 80%, 50%, 0.2)",
      radius: 400,
    },
  ],

  kinetic: [
    {
      x: 30,
      y: 30,
      color: "hsla(263, 70%, 50%, 0.4)",
      radius: 350,
    },
    {
      x: 70,
      y: 70,
      color: "hsla(172, 66%, 50%, 0.3)",
      radius: 300,
    },
    {
      x: 50,
      y: 20,
      color: "hsla(263, 70%, 50%, 0.2)",
      radius: 250,
    },
  ],

  freestyle: [
    {
      x: 20,
      y: 40,
      color: "hsla(16, 85%, 55%, 0.4)",
      radius: 350,
    },
    {
      x: 80,
      y: 60,
      color: "hsla(160, 50%, 40%, 0.3)",
      radius: 300,
    },
    {
      x: 50,
      y: 80,
      color: "hsla(16, 85%, 55%, 0.2)",
      radius: 400,
    },
  ],
};

const GradientMesh = ({
  points,
  speed = 0.5,
  blur = 80,
  className = "",
  interactive = false,
  preset = "freestyle",
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({
    x: 50,
    y: 50,
  });

  const meshPoints =
    points || DEFAULT_POINTS[preset] || DEFAULT_POINTS.freestyle;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let time = 0;

    // -----------------------------
    // Canvas Resize
    // -----------------------------
    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();

    window.addEventListener("resize", resize);

    // -----------------------------
    // Animation
    // -----------------------------
    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      time += 0.005 * speed;

      ctx.clearRect(0, 0, width, height);

      meshPoints.forEach((point, index) => {
        // Smooth movement
        const offsetX =
          Math.sin(time + index * 1.5) * 50;

        const offsetY =
          Math.cos(time + index * 2) * 50;

        let px =
          (point.x / 100) * width + offsetX;

        let py =
          (point.y / 100) * height + offsetY;

        // -----------------------------
        // Mouse Interaction
        // -----------------------------
        if (interactive) {
          const mouseX =
            (mouseRef.current.x / 100) * width;

          const mouseY =
            (mouseRef.current.y / 100) * height;

          const dx = mouseX - px;
          const dy = mouseY - py;

          const distance =
            Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            const strength =
              1 - distance / 250;

            px += dx * 0.15 * strength;
            py += dy * 0.15 * strength;
          }
        }

        // -----------------------------
        // Radial Gradient
        // -----------------------------
        const gradient =
          ctx.createRadialGradient(
            px,
            py,
            0,
            px,
            py,
            point.radius
          );

        gradient.addColorStop(
          0,
          point.color
        );

        gradient.addColorStop(
          0.45,
          point.color
        );

        gradient.addColorStop(
          1,
          "transparent"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
          0,
          0,
          width,
          height
        );
      });

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    // -----------------------------
    // Cleanup
    // -----------------------------
    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [meshPoints, speed, interactive]);

  // -----------------------------
  // Mouse Move
  // -----------------------------
  const handleMouseMove = (event) => {
    if (!interactive) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseRef.current = {
      x:
        ((event.clientX - rect.left) /
          rect.width) *
        100,

      y:
        ((event.clientY - rect.top) /
          rect.height) *
        100,
    };
  };

  return (
    <div
      className={`
        relative
        min-h-screen
        w-full
        overflow-hidden
        ${className}
      `}
      onMouseMove={handleMouseMove}
    >
      {/* Mesh */}
      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        style={{
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Children can be added here if needed */}
      </div>
    </div>
  );
};

export default GradientMesh;
