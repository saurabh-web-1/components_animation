import React, { useEffect, useRef, useState } from "react";
import {AnimatePresence,motion,useMotionValue,useSpring,useReducedMotion,} from "framer-motion";

const DEFAULT_PROJECTS = [
  {
    id: "onyx",
    title: "Onyx",
    category: "RESIDENTIAL / 01",
    year: "2026",
    location: "Forest residence",
    description: "A quiet retreat shaped by natural light, texture, and landscape.",
    background: "#8fb3b1",
    accent: "#f6f8f1",
    mainImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "birch",
    title: "Birch",
    category: "PRIVATE HOUSE / 02",
    year: "2026",
    location: "Warm minimalism",
    description: "A modern home where warm materials meet clean architecture.",
    background: "#bcb58e",
    accent: "#fffaf0",
    mainImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "fjord",
    title: "Fjord",
    category: "INTERIOR / 03",
    year: "2026",
    location: "Calm living space",
    description: "Thoughtful proportions and natural finishes create a slower rhythm.",
    background: "#77645a",
    accent: "#fff7ed",
    mainImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "aether",
    title: "Aether",
    category: "CONTEMPORARY / 04",
    year: "2026",
    location: "Open-plan home",
    description: "A bright, open composition with an effortless indoor-outdoor feel.",
    background: "#c9c5b6",
    accent: "#ffffff",
    mainImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
];

const DEFAULT_ANIMATION = {
  background: 0.95,
  title: 0.52,
  letterStagger: 0.045,
  image: 0.9,
  detail: 0.55,
  controls: 0.25,
};

const EASE = [0.22, 1, 0.36, 1];

function clampIndex(index, length) {
  if (!length) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}

function getWrappedOffset(index, activeIndex, length) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

function resolveInitialProject(initialProject, projects) {
  if (typeof initialProject === "string") {
    const foundIndex = projects.findIndex((project) => project.id === initialProject);
    return foundIndex >= 0 ? foundIndex : 0;
  }
  return clampIndex(Number(initialProject) || 0, projects.length);
}

/**
 * ProjectMorph — reusable animated architecture / portfolio showcase.
 *
 * Project fields:
 * { id, title, category, year, location, description, background, accent,
 *   mainImage }
 * You may also pass images: [mainImage].
 */
export default function ProjectMorph({
  projects = DEFAULT_PROJECTS,
  initialProject = 0,
  autoPlay = true,
  interval = 4200,
  pauseOnHover = true,
  showControls = true,
  showDots = true,
  showProgress = true,
  showMeta = true,
  parallax = true,
  imageBlur = 3,
  imageScale = 1,
  imageScrollDistance = 34,
  animation = {},
  onProjectChange,
  className = "",
  minHeight = 620,
  label = "SELECTED WORKS",
}) {
  const safeProjects = projects?.length ? projects : DEFAULT_PROJECTS;
  const timings = { ...DEFAULT_ANIMATION, ...animation };
  const [activeIndex, setActiveIndex] = useState(() =>
    resolveInitialProject(initialProject, safeProjects)
  );
  const [isHovered, setIsHovered] = useState(false);
  const [travelDirection, setTravelDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const activeIndexRef = useRef(activeIndex);
  const projectsRef = useRef(safeProjects);
  const onChangeRef = useRef(onProjectChange);

  projectsRef.current = safeProjects;
  onChangeRef.current = onProjectChange;

  useEffect(() => {
    const corrected = clampIndex(activeIndex, safeProjects.length);
    if (corrected !== activeIndex) setActiveIndex(corrected);
    activeIndexRef.current = corrected;
  }, [activeIndex, safeProjects.length]);

  const activeProject = safeProjects[clampIndex(activeIndex, safeProjects.length)];
  const imageList = activeProject.images || [];
  const mainImage = activeProject.mainImage || imageList[0] || DEFAULT_PROJECTS[0].mainImage;
  const topImage = activeProject.topImage || imageList[1] || DEFAULT_PROJECTS[0].topImage;
  const bottomImage = activeProject.bottomImage || imageList[2] || DEFAULT_PROJECTS[0].bottomImage;
  const background = activeProject.background || "#8fb3b1";
  const accent = activeProject.accent || "#ffffff";

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.7 });

  const goTo = (nextIndex) => {
    const list = projectsRef.current;
    if (!list.length) return;
    const normalized = (nextIndex + list.length) % list.length;
    if (normalized === activeIndexRef.current) return;

    const previous = activeIndexRef.current;
    const rawDelta = normalized - previous;
    const direction =
      Math.abs(rawDelta) > list.length / 2
        ? -Math.sign(rawDelta)
        : Math.sign(rawDelta);

    setTravelDirection(direction || 1);
    activeIndexRef.current = normalized;
    setActiveIndex(normalized);
    onChangeRef.current?.(list[normalized]);
  };

  useEffect(() => {
    if (!autoPlay || safeProjects.length < 2 || (pauseOnHover && isHovered)) return undefined;

    const timer = window.setInterval(() => {
      const list = projectsRef.current;
      if (list.length > 1) goTo((activeIndexRef.current + 1) % list.length);
    }, Math.max(800, interval));

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, isHovered, pauseOnHover, safeProjects.length]);

  const handlePointerMove = (event) => {
    if (!parallax) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerX.set(x * 13);
    pointerY.set(y * 10);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") goTo(activeIndexRef.current + 1);
    if (event.key === "ArrowLeft") goTo(activeIndexRef.current - 1);
  };

  return (
    <section
      aria-label="Project showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetPointer();
      }}
      onMouseMove={handlePointerMove}
      className={`relative isolate h-[min(100svh,900px)] w-full overflow-hidden outline-none ${className}`}
      style={{ minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight }}
    >
      {/* Project color morph */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ backgroundColor: background }}
        transition={{ duration: timings.background, ease: EASE }}
      />

      {/* Soft background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 20%, rgba(255,255,255,.22) 0 1px, transparent 1.5px), radial-gradient(circle at 82% 68%, rgba(20,25,22,.12) 0 1px, transparent 1.5px), linear-gradient(120deg, rgba(255,255,255,.06), transparent 52%)",
          backgroundSize: "42px 42px, 55px 55px, 100% 100%",
        }}
      />

      {/* Small editorial marks */}
      <div className="absolute left-[clamp(22px,5vw,76px)] top-[clamp(22px,5vh,54px)] z-20 flex items-center gap-3 text-white/75">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/45 text-[10px] font-semibold">P</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.24em]">PROJECT / STUDIO</span>
      </div>

      <div className="absolute right-[clamp(22px,5vw,76px)] top-[clamp(25px,5vh,56px)] z-20 text-right text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70">
        <div>{label}</div>
        <div className="mt-2 text-white/45">0{activeIndex + 1} — 0{safeProjects.length}</div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-[43%] top-[49%] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 md:block"
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent }} />
      </motion.div>

      {/* Left title and project details */}
      <div className="absolute left-[clamp(24px,9vw,140px)] top-[40%] z-20 w-[min(45vw,560px)] -translate-y-1/2 max-md:top-[23%] max-md:w-[80%] max-md:translate-y-0">
        <div className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/75 md:mb-7">
          <span className="h-px w-7 bg-white/70" style={{ backgroundColor: accent }} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${activeProject.id}-category`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: timings.detail, ease: EASE }}
            >
              {activeProject.category || "SELECTED PROJECT"}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="overflow-hidden pb-[0.08em]">
          <AnimatePresence mode="wait" initial={false} custom={travelDirection}>
            <motion.h1
              key={activeProject.id}
              custom={travelDirection}
              variants={{
                initial: (direction) => ({
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : timings.letterStagger,
                    staggerDirection: direction,
                  },
                }),
                animate: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : timings.letterStagger,
                    delayChildren: prefersReducedMotion ? 0 : 0.025,
                  },
                },
                exit: (direction) => ({
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : timings.letterStagger * 0.55,
                    staggerDirection: -direction,
                  },
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              aria-label={activeProject.title}
              className="whitespace-nowrap text-[clamp(4.1rem,10vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white"
            >
              {Array.from(activeProject.title).map((character, index) => (
                <span
                  key={`${activeProject.id}-letter-${index}`}
                  className="inline-block overflow-hidden align-bottom"
                  aria-hidden="true"
                >
                  <motion.span
                    custom={travelDirection}
                    variants={{
                      initial: (direction) => ({
                        y: prefersReducedMotion ? 0 : direction > 0 ? "115%" : "-115%",
                        opacity: prefersReducedMotion ? 1 : 0,
                      }),
                      animate: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: prefersReducedMotion ? 0 : timings.title,
                          ease: EASE,
                        },
                      },
                      exit: (direction) => ({
                        y: prefersReducedMotion ? 0 : direction > 0 ? "-115%" : "115%",
                        opacity: prefersReducedMotion ? 1 : 0,
                        transition: {
                          duration: prefersReducedMotion ? 0 : timings.title * 0.72,
                          ease: EASE,
                        },
                      }),
                    }}
                    className="inline-block"
                  >
                    {character === " " ? "\u00A0" : character}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        {showMeta && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeProject.id}-meta`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: timings.detail, delay: 0.12, ease: EASE }}
              className="mt-8 max-w-[235px] text-[10px] leading-[1.7] text-white/75 md:mt-10 md:text-[11px]"
            >
              <div className="mb-2 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/55">
                <span>{activeProject.location || "Architecture"}</span>
                <span className="h-px w-5 bg-white/40" />
                <span>{activeProject.year || "2026"}</span>
              </div>
              <p>{activeProject.description || "A considered study in form, material, and light."}</p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Vertical image rail: each project moves through top, center, and bottom slots */}
      <motion.div
        className="absolute bottom-[7%] right-[5%] top-[8%] z-10 w-[min(49vw,680px)] max-md:bottom-[9%] max-md:right-[2%] max-md:top-[37%] max-md:w-[85vw]"
        style={{ x: parallax ? smoothX : 0, y: parallax ? smoothY : 0 }}
      >
        {safeProjects.map((project, index) => {
          const offset = getWrappedOffset(index, activeIndex, safeProjects.length);
          const distance = Math.abs(offset);
          const projectImages = project.images || [];
          const projectImage =
            project.mainImage || projectImages[0] || DEFAULT_PROJECTS[0].mainImage;
          const preload = distance <= 2;

          return (
            <motion.div
              key={project.id || index}
              initial={false}
              aria-hidden="true"
              className="absolute overflow-hidden bg-white/10 shadow-[0_28px_75px_rgba(0,0,0,0.22)]"
              style={{
                left: "50%",
                transformOrigin: "center center",
                zIndex: distance === 0 ? 3 : distance === 1 ? 2 : 1,
              }}
              animate={{
                x: "-50%",
                y: "-50%",
                top: `${50 + offset * imageScrollDistance}%`,
                left: offset === 0 ? "53%" : offset < 0 ? "61%" : "43%",
                width: offset === 0 ? "68%" : distance === 1 ? "48%" : "40%",
                height: offset === 0 ? "46%" : distance === 1 ? "24%" : "19%",
                opacity: offset === 0 ? 1 : distance === 1 ? 0.62 : 0,
                rotate: offset === 0 ? -1 : offset < 0 ? 4 : -3,
                scale: offset === 0 ? imageScale : distance === 1 ? 0.98 : 0.9,
                filter: `blur(${offset === 0 ? 0 : imageBlur}px)`,
              }}
              transition={{
                top: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
                left: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
                width: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
                height: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
                opacity: {
                  duration: prefersReducedMotion ? 0 : timings.image * 0.8,
                  ease: EASE,
                },
                rotate: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
                scale: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
                filter: {
                  duration: prefersReducedMotion ? 0 : timings.image,
                  ease: EASE,
                },
              }}
            >
              <img
                src={projectImage}
                alt=""
                draggable="false"
                loading={preload ? "eager" : "lazy"}
                className="h-full w-full select-none object-cover"
              />
              {offset === 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border border-white/30"
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom-left small signature */}
      <div className="absolute bottom-[clamp(22px,5vh,52px)] left-[clamp(22px,5vw,76px)] z-20 flex items-end gap-4 text-[8px] font-medium uppercase tracking-[0.18em] text-white/65">
        <span className="grid h-6 w-6 place-items-center rounded-full border border-white/35">↗</span>
        <span className="max-w-[140px] leading-[1.7]">Spaces made<br />to feel different</span>
      </div>

      {/* Navigation controls */}
      {(showControls || showDots) && (
        <div className="absolute bottom-[clamp(22px,5vh,52px)] right-[clamp(22px,5vw,76px)] z-30 flex items-center gap-5 text-white">
          {showProgress && (
            <div className="hidden items-center gap-1.5 sm:flex" aria-label="Project progress">
              {safeProjects.map((project, index) => (
                <button
                  key={project.id || index}
                  type="button"
                  aria-label={`Go to ${project.title || `project ${index + 1}`}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className="group h-5 px-0.5"
                >
                  <span className={`block h-[2px] transition-all ${index === activeIndex ? "w-8 bg-white" : "w-3 bg-white/40 group-hover:bg-white/75"}`} />
                </button>
              ))}
            </div>
          )}

          {showDots && (
            <div className="flex items-center gap-2 sm:hidden">
              {safeProjects.map((project, index) => (
                <button
                  key={project.id || index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${project.title || `project ${index + 1}`}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/45"}`}
                />
              ))}
            </div>
          )}

          {showControls && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous project"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-lg transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ transitionDuration: `${timings.controls}s` }}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next project"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-lg transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ transitionDuration: `${timings.controls}s` }}
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export { DEFAULT_PROJECTS };
