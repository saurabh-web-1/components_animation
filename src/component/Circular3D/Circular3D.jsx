import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DEFAULT_CARDS = [
  {
    category: "LANGUAGE • PYTHON",
    title: "First Line of Code",
    description: 'The terminal glowed, displaying my first "Hello, World." in Python.',
    detail: "I remember the thrill of typing my first Hello World. It was simple, but it opened a door into countless possibilities.",
    meta: "code / 01",
    accent: "#a855f7",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "DEBUGGING",
    title: "Debugging the Matrix",
    description: "The error messages multiplied, haunting my console.",
    detail: "Every unexpected output became another clue. Debugging was less about fixing a bug and more about understanding the system.",
    meta: "debug / 02",
    accent: "#ec4899",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "LIBRARY",
    title: "The Algorithm Library",
    description: "Endless layers of sorting, searching, and optimization.",
    detail: "Algorithms became building blocks for solving increasingly complex problems and turning ideas into efficient systems.",
    meta: "algorithms / 03",
    accent: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "VERSION CONTROL",
    title: "The Version Control Mirror",
    description: "Every commit became a snapshot of another possibility.",
    detail: "Branches, commits and merges created a history of decisions. Version control transformed mistakes into recoverable moments.",
    meta: "git / 04",
    accent: "#6366f1",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "DEPLOYMENT",
    title: "The Deployment Dream",
    description: "From localhost to production, the idea finally became real.",
    detail: "Deployment is the point where a project leaves the developer's machine and becomes something people can actually experience.",
    meta: "deploy / 05",
    accent: "#06b6d4",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "ABSTRACT",
    title: "The Abstract Void",
    description: "Sometimes the empty space becomes part of the experience.",
    detail: "Good interfaces know when not to speak. Negative space gives important elements room to breathe and creates visual focus.",
    meta: "concept / 06",
    accent: "#7c3aed",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Circular3D = ({
  cards = DEFAULT_CARDS,
  autoPlay = true,
  moveDuration = 1.45,
  holdDuration = 2200,
  cardWidth = 300,
  cardHeight = 410,
  radius = 390,
  perspective = 1400,
  dragSensitivity = 0.42,
  redirectOnBackClick = true,
}) => {
  const navigate = useNavigate();
  const items = cards.filter(Boolean);

  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flipped, setFlipped] = useState(null);

  const timerRef = useRef(null);

  const interactionRef = useRef({
    active: false,
    startX: 0,
    startRotation: 0,
    moved: false,
    cardIndex: null,
  });

  const step = items.length ? 360 / items.length : 0;

  useEffect(() => {
    if (!autoPlay || dragging || flipped !== null || items.length < 2) return;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;

      timerRef.current = window.setTimeout(() => {
        if (cancelled) return;

        setRotation((current) => current - step);

        timerRef.current = window.setTimeout(() => {
          if (!cancelled) run();
        }, moveDuration * 1000);
      }, holdDuration);
    };

    run();

    return () => {
      cancelled = true;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, dragging, flipped, items.length, holdDuration, moveDuration, step]);

  const getFrontIndex = () => {
    let closest = 0;
    let closestDistance = Infinity;

    items.forEach((_, index) => {
      const angle = index * step + rotation;
      const normalized = ((angle + 180) % 360) - 180;
      const distance = Math.abs(normalized);

      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    return closest;
  };

  const frontIndex = getFrontIndex();

  const snapToNearest = () => {
    if (!step) return;
    const nearest = Math.round(rotation / step);
    setRotation(nearest * step);
  };

  const next = () => {
    if (!step) return;

    setFlipped(null);

    setRotation((current) => {
      const nearest = Math.round(current / step);
      return (nearest - 1) * step;
    });
  };

  const previous = () => {
    if (!step) return;

    setFlipped(null);

    setRotation((current) => {
      const nearest = Math.round(current / step);
      return (nearest + 1) * step;
    });
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    const cardElement = event.target.closest("[data-card-index]");
    const cardIndex = cardElement
      ? Number(cardElement.dataset.cardIndex)
      : null;

    interactionRef.current = {
      active: true,
      startX: event.clientX,
      startRotation: rotation,
      moved: false,
      cardIndex,
    };

    setDragging(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const interaction = interactionRef.current;

    if (!interaction.active) return;

    const deltaX = event.clientX - interaction.startX;

    if (Math.abs(deltaX) > 8) {
      interaction.moved = true;
      setDragging(true);

      if (flipped !== null) {
        setFlipped(null);
      }
    }

    if (interaction.moved) {
      setRotation(
        interaction.startRotation +
          deltaX * dragSensitivity
      );
    }
  };

  const handlePointerUp = (event) => {
    const interaction = interactionRef.current;

    if (!interaction.active) return;

    const wasMoved = interaction.moved;
    const clickedCard = interaction.cardIndex;

    interaction.active = false;

    setDragging(false);

    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";

    if (wasMoved) {
      snapToNearest();
    } else if (
      clickedCard !== null &&
      clickedCard === frontIndex
    ) {
      /*
        Normal click:
        front -> back
      */
      setFlipped((current) =>
        current === clickedCard ? null : clickedCard
      );
    }

    interactionRef.current = {
      active: false,
      startX: 0,
      startRotation: 0,
      moved: false,
      cardIndex: null,
    };

    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handlePointerCancel = (event) => {
    interactionRef.current = {
      active: false,
      startX: 0,
      startRotation: 0,
      moved: false,
      cardIndex: null,
    };

    setDragging(false);

    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";

    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const openCard = (card) => {
    if (!redirectOnBackClick) return;

    navigate(card.link || "/card");
  };

  const closeFlip = (event) => {
    event.stopPropagation();
    setFlipped(null);
  };

  if (!items.length) return null;

  return (
    <div className="relative flex min-h-screen w-full select-none items-center justify-center overflow-hidden bg-[#05040a] px-4">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(94,48,140,0.12),transparent_40%)]" />

      <motion.div
        animate={{
          opacity: flipped !== null ? 0.62 : 1,
          scale: dragging ? 1.035 : 1,
        }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[530px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.045] blur-[130px]"
      />

      <div className="relative flex w-full max-w-[1250px] flex-col items-center">
        <div
          className={`relative flex h-[650px] w-full items-center justify-center overflow-visible ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            perspective: `${perspective}px`,
            perspectiveOrigin: "50% 50%",
            touchAction: "pan-y",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.045] blur-[75px]" />

          {items.map((card, index) => {
            const angle = index * step + rotation;
            const radians = (angle * Math.PI) / 180;

            const x = Math.sin(radians) * radius;
            const z = Math.cos(radians) * radius;

            const normalized = ((angle + 180) % 360) - 180;
            const absAngle = Math.abs(normalized);

            const isFront = index === frontIndex;
            const isFlipped = flipped === index;

            const depth = (z + radius) / (radius * 2);

            const scale = clamp(
              0.63 + depth * 0.37,
              0.63,
              1
            );

            const opacity = clamp(
              0.16 + depth * 0.84,
              0.12,
              1
            );

            const blur = isFront
              ? 0
              : clamp((1 - depth) * 1.4, 0, 1.2);

            const visibility =
              absAngle > 145 && absAngle < 215
                ? 0.035
                : opacity;

            const zIndex = Math.round(
              (z + radius) * 100
            );

            return (
              <motion.div
                key={`${card.title}-${index}`}
                data-card-index={index}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                  zIndex,
                  transformStyle: "preserve-3d",
                  pointerEvents:
                    visibility < 0.08
                      ? "none"
                      : "auto",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
                animate={{
                  x,
                  y: 0,
                  z,
                  rotateY: angle,
                  scale,
                  opacity: visibility,
                  filter: `blur(${blur}px)`,
                }}
                transition={
                  dragging
                    ? { duration: 0 }
                    : {
                        duration: moveDuration,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    scale: isFront ? 1 : 0.985,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* FLIP WRAPPER */}
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.72,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-full w-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                    }}
                  >
                    {/* FRONT */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/[0.11] bg-[#120d1c] shadow-[0_30px_80px_rgba(0,0,0,0.58)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 72% 18%, ${card.accent}28, transparent 38%), linear-gradient(145deg,#231535 0%,#120c1b 52%,#09070d 100%)`,
                        }}
                      />

                      {/* Image */}
                      {card.image && (
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[180px] overflow-hidden">
                          <img
                            src={card.image}
                            alt=""
                            draggable="false"
                            className="h-full w-full object-cover opacity-60"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120d1c]/30 to-[#120d1c]" />
                        </div>
                      )}

                      {/* Light sweep */}
                      {isFront && (
                        <motion.div
                          initial={{
                            x: "-150%",
                            opacity: 0,
                          }}
                          animate={{
                            x: "160%",
                            opacity: [0, 0.32, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2.2,
                            ease: "easeInOut",
                          }}
                          className="pointer-events-none absolute -inset-y-12 z-20 w-[42%] rotate-[24deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                        />
                      )}

                      <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/[0.025]" />

                      <div className="relative z-30 flex h-full flex-col p-7">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-[0.21em]"
                            style={{
                              color: card.accent,
                            }}
                          >
                            {card.category}
                          </span>

                          <span className="text-[10px] font-medium text-white/20">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="mt-auto">
                          <h2 className="max-w-[250px] text-[30px] font-semibold leading-[1.04] tracking-[-0.045em] text-white">
                            {card.title}
                          </h2>

                          <p className="mt-5 max-w-[260px] text-[13px] font-medium leading-6 text-white/44">
                            {card.description}
                          </p>

                          <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4">
                            <span className="text-[10px] text-white/25">
                              {card.meta}
                            </span>

                            {isFront && (
                              <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/30">
                                Click to explore
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className="pointer-events-none absolute bottom-[-100px] left-1/2 h-[190px] w-[270px] -translate-x-1/2 rounded-full blur-[65px]"
                        style={{
                          background: `${card.accent}15`,
                        }}
                      />
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/[0.13] bg-[#100a18] shadow-[0_30px_80px_rgba(0,0,0,0.58)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 25% 20%, ${card.accent}20, transparent 37%), linear-gradient(145deg,#1c1128,#0b0711)`,
                        }}
                      />

                      {card.image && (
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-[40%] overflow-hidden opacity-15">
                          <img
                            src={card.image}
                            alt=""
                            draggable="false"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/[0.025]" />

                      <div
                        className="relative z-20 flex h-full flex-col p-7"
                        onClick={() =>
                          redirectOnBackClick &&
                          openCard(card)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-[0.21em]"
                            style={{
                              color: card.accent,
                            }}
                          >
                            {card.category}
                          </span>

                          <button
                            type="button"
                            onClick={closeFlip}
                            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-white/35 transition hover:bg-white/[0.07] hover:text-white"
                            aria-label="Return to front"
                          >
                            <RotateCcw size={14} />
                          </button>
                        </div>

                        <div className="mt-9">
                          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
                            About this card
                          </span>

                          <h3 className="mt-3 text-[25px] font-semibold leading-tight tracking-[-0.04em] text-white">
                            {card.title}
                          </h3>

                          <div
                            className="mt-5 h-px w-12"
                            style={{
                              background: card.accent,
                            }}
                          />

                          <p className="mt-6 max-w-[250px] text-[13px] font-medium leading-7 text-white/55">
                            {card.detail}
                          </p>
                        </div>

                        <div className="pointer-events-none mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
                          <span className="text-[10px] text-white/25">
                            {card.meta}
                          </span>

                          <span className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] uppercase tracking-[0.13em] text-white/40">
                            Open
                            <ExternalLink size={10} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div
          className="absolute bottom-[38px] left-1/2 z-[300] flex -translate-x-1/2 items-center gap-4"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={previous}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft size={15} />
          </button>

          <div className="flex items-center gap-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setFlipped(null);
                  setRotation(-index * step);
                }}
                className="p-1"
                aria-label={`Card ${index + 1}`}
              >
                <motion.span
                  animate={{
                    width:
                      frontIndex === index ? 22 : 5,
                    opacity:
                      frontIndex === index ? 1 : 0.25,
                  }}
                  transition={{ duration: 0.25 }}
                  className="block h-[5px] rounded-full bg-white"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="pointer-events-none absolute bottom-[8px] left-1/2 z-[300] -translate-x-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.24em] text-white/[0.17]">
          Drag to rotate · Click front card · Back to open
        </div>
      </div>
    </div>
  );
};

export default Circular3D;