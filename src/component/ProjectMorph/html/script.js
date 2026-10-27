/* ProjectMorph - Vanilla JavaScript
   Customize DEFAULT_PROJECTS and CONFIG.
*/

const DEFAULT_PROJECTS = [
  {
    id: "onyx",
    title: "Onyx",
    category: "RESIDENTIAL / 01",
    year: "2026",
    location: "Forest residence",
    description:
      "A quiet retreat shaped by natural light, texture, and landscape.",
    background: "#8fb3b1",
    accent: "#f6f8f1",
    mainImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: "birch",
    title: "Birch",
    category: "PRIVATE HOUSE / 02",
    year: "2026",
    location: "Warm minimalism",
    description:
      "A modern home where warm materials meet clean architecture.",
    background: "#bcb58e",
    accent: "#fffaf0",
    mainImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: "fjord",
    title: "Fjord",
    category: "INTERIOR / 03",
    year: "2026",
    location: "Calm living space",
    description:
      "Thoughtful proportions and natural finishes create a slower rhythm.",
    background: "#77645a",
    accent: "#fff7ed",
    mainImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: "aether",
    title: "Aether",
    category: "CONTEMPORARY / 04",
    year: "2026",
    location: "Open-plan home",
    description:
      "A bright, open composition with an effortless indoor-outdoor feel.",
    background: "#c9c5b6",
    accent: "#ffffff",
    mainImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
    topImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
    bottomImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
  }
];


/*COMPONENT CONFIGURATION */

const CONFIG = {
  initialProject: 0, // Index or ID, e.g. "birch"

  autoPlay: true,
  interval: 4200,

  pauseOnHover: true,

  showControls: true,
  showDots: true,
  showProgress: true,
  showMeta: true,

  parallax: true,

  imageBlur: 3,
  imageScale: 1,
  imageScrollDistance: 34,

  minHeight: 620,

  label: "SELECTED WORKS",

  animation: {
    background: 950,
    title: 520,
    letterStagger: 45,
    image: 900,
    detail: 550,
    controls: 250
  },

  onProjectChange: (project) => {
    console.log("Project changed:", project);
  }
};


/* COMPONENT LOGIC */

(() => {
  const root = document.querySelector("#projectMorph");

  if (!root || !DEFAULT_PROJECTS.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const projects = DEFAULT_PROJECTS;

  const $ = (selector) => root.querySelector(selector);

  const backgroundEl = $(".pm-background");
  const editionLabel = $(".pm-label");
  const counter = $(".pm-counter");

  const categoryEl = $(".pm-category");
  const titleEl = $(".pm-title");
  const metaEl = $(".pm-meta");

  const locationEl = $(".pm-location");
  const yearEl = $(".pm-year");
  const descriptionEl = $(".pm-description");

  const railEl = $(".pm-image-rail");

  const progressEl = $(".pm-progress");
  const dotsEl = $(".pm-dots");

  const prevButton = $(".pm-prev");
  const nextButton = $(".pm-next");

  let activeIndex = resolveInitialProject(CONFIG.initialProject);

  let hovered = false;
  let autoplayTimer = null;
  let categoryTimer = null;

  const timing = {
    background: CONFIG.animation?.background ?? 950,
    title: CONFIG.animation?.title ?? 520,
    letterStagger: CONFIG.animation?.letterStagger ?? 45,
    image: CONFIG.animation?.image ?? 900,
    detail: CONFIG.animation?.detail ?? 550,
    controls: CONFIG.animation?.controls ?? 250
  };


  /* APPLY CONFIGURATION */

  root.style.setProperty(
    "--pm-bg-duration",
    `${reducedMotion ? 0 : timing.background}ms`
  );

  root.style.setProperty(
    "--pm-image-duration",
    `${reducedMotion ? 0 : timing.image}ms`
  );

  root.style.setProperty(
    "--pm-controls-duration",
    `${reducedMotion ? 0 : timing.controls}ms`
  );

  root.style.setProperty(
    "--pm-title-duration",
    `${reducedMotion ? 0 : timing.title / 1000}s`
  );

  root.style.setProperty(
    "--pm-letter-stagger",
    `${reducedMotion ? 0 : timing.letterStagger / 1000}s`
  );

  if (typeof CONFIG.minHeight === "number") {
    root.style.minHeight = `${CONFIG.minHeight}px`;
  } else if (CONFIG.minHeight) {
    root.style.minHeight = CONFIG.minHeight;
  }

  editionLabel.textContent = CONFIG.label || "SELECTED WORKS";

  metaEl.hidden = !CONFIG.showMeta;


  /* INITIAL PROJECT */

  function resolveInitialProject(value) {
    if (typeof value === "string") {
      const index = projects.findIndex(
        (project) => project.id === value
      );

      return index >= 0 ? index : 0;
    }

    return Math.min(
      Math.max(Number(value) || 0, 0),
      projects.length - 1
    );
  }


  /* CALCULATE IMAGE POSITION */

  function wrappedOffset(index) {
    let offset = index - activeIndex;

    if (offset > projects.length / 2) {
      offset -= projects.length;
    }

    if (offset < -projects.length / 2) {
      offset += projects.length;
    }

    return offset;
  }


  /* PROJECT IMAGE */

  function mainImage(project) {
    return (
      project.mainImage ||
      (Array.isArray(project.images) && project.images[0]) ||
      projects[0].mainImage ||
      ""
    );
  }


  /* CREATE NAVIGATION */

  function createNavigation() {
    progressEl.innerHTML = "";
    dotsEl.innerHTML = "";

    projects.forEach((project, index) => {
      const label = `Go to ${
        project.title || `project ${index + 1}`
      }`;

      // Progress button
      const progress = document.createElement("button");

      progress.type = "button";
      progress.setAttribute("aria-label", label);
      progress.innerHTML = "<span></span>";

      progress.addEventListener("click", () => {
        goTo(index);
      });

      progressEl.appendChild(progress);


      // Dot button
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute("aria-label", label);

      dot.addEventListener("click", () => {
        goTo(index);
      });

      dotsEl.appendChild(dot);
    });

    progressEl.hidden = !CONFIG.showProgress;
    dotsEl.hidden = !CONFIG.showDots;

    $(".pm-arrows").hidden = !CONFIG.showControls;

    $(".pm-navigation").hidden =
      !CONFIG.showControls &&
      !CONFIG.showDots &&
      !CONFIG.showProgress;
  }


  /* LETTER-BY-LETTER TITLE ANIMATION */

  function renderTitle(title, direction = 1, animate = true) {
    titleEl.innerHTML = "";

    titleEl.setAttribute("aria-label", title);

    titleEl.classList.remove(
      "is-entering",
      "is-leaving"
    );

    const chars = Array.from(title);

    chars.forEach((char, index) => {
      const outer = document.createElement("span");

      outer.className = "pm-title-letter";

      outer.setAttribute("aria-hidden", "true");

      outer.style.setProperty(
        "--letter-index",
        index
      );

      outer.style.setProperty(
        "--letter-count",
        chars.length
      );

      const inner = document.createElement("span");

      inner.textContent =
        char === " " ? "\u00a0" : char;

      inner.style.setProperty(
        "--pm-enter-y",
        direction > 0 ? "115%" : "-115%"
      );

      inner.style.setProperty(
        "--pm-exit-y",
        direction > 0 ? "-115%" : "115%"
      );

      outer.appendChild(inner);

      titleEl.appendChild(outer);
    });

    if (animate && !reducedMotion) {
      void titleEl.offsetWidth;

      titleEl.classList.add("is-entering");
    } else {
      titleEl
        .querySelectorAll(".pm-title-letter > span")
        .forEach((letter) => {
          letter.style.opacity = "1";
          letter.style.transform = "translateY(0)";
        });
    }
  }


  /* CREATE VERTICAL IMAGE RAIL */

  function renderRail() {
    railEl.innerHTML = "";

    projects.forEach((project, index) => {
      const card = document.createElement("div");

      card.className = "pm-image-card";

      card.dataset.projectIndex = index;

      card.setAttribute("aria-hidden", "true");

      const img = document.createElement("img");

      img.alt = "";
      img.draggable = false;
      img.src = mainImage(project);

      img.loading =
        Math.abs(wrappedOffset(index)) <= 2
          ? "eager"
          : "lazy";

      card.appendChild(img);

      railEl.appendChild(card);
    });

    updateRail(true);
  }


  /* UPDATE IMAGE POSITIONS */

  function updateRail(skipTransition = false) {
    const cards = railEl.querySelectorAll(
      ".pm-image-card"
    );

    cards.forEach((card, index) => {
      const offset = wrappedOffset(index);

      const distance = Math.abs(offset);

      const active = offset === 0;

      card.style.left = active
        ? "53%"
        : offset < 0
          ? "61%"
          : "43%";

      card.style.top = `${
        50 +
        offset *
          (Number(CONFIG.imageScrollDistance) || 34)
      }%`;

      card.style.width = active
        ? "68%"
        : distance === 1
          ? "48%"
          : "40%";

      card.style.height = active
        ? "46%"
        : distance === 1
          ? "24%"
          : "19%";

      card.style.opacity = active
        ? "1"
        : distance === 1
          ? ".62"
          : "0";

      card.style.zIndex = active
        ? "3"
        : distance === 1
          ? "2"
          : "1";

      const blur = active
        ? 0
        : Math.max(0, Number(CONFIG.imageBlur) || 0);

      card.style.filter = `blur(${blur}px)`;

      const scale = active
        ? Number(CONFIG.imageScale) || 1
        : distance === 1
          ? 0.98
          : 0.9;

      const rotation = active
        ? -1
        : offset < 0
          ? 4
          : -3;

      card.style.transform =
        `translate(-50%, -50%) ` +
        `rotate(${rotation}deg) scale(${scale})`;

      card.classList.toggle(
        "is-active",
        active
      );

      if (skipTransition) {
        card.style.transition = "none";
      } else {
        card.style.removeProperty("transition");
      }

      card.querySelector("img").loading =
        distance <= 2 ? "eager" : "lazy";
    });

    if (skipTransition) {
      requestAnimationFrame(() => {
        cards.forEach((card) => {
          card.style.removeProperty("transition");
        });
      });
    }
  }


  /* UPDATE COUNTER AND NAVIGATION */

  function updateNavigation() {
    counter.textContent =
      `${String(activeIndex + 1).padStart(2, "0")} — ` +
      `${String(projects.length).padStart(2, "0")}`;

    [progressEl, dotsEl].forEach((container) => {
      [...container.children].forEach((button, index) => {
        if (index === activeIndex) {
          button.setAttribute("aria-current", "true");
        } else {
          button.removeAttribute("aria-current");
        }
      });
    });
  }


  /* APPLY SELECTED PROJECT */

  function applyProject(
    project,
    direction = 1,
    animate = true
  ) {
    const background =
      project.background || "#8fb3b1";

    root.style.setProperty(
      "--pm-background",
      background
    );

    root.style.setProperty(
      "--pm-accent",
      project.accent || "#ffffff"
    );

    backgroundEl.style.backgroundColor = background;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", background);

    categoryEl.classList.add("is-leaving");
    metaEl.classList.add("is-leaving");

    window.clearTimeout(categoryTimer);

    categoryTimer = window.setTimeout(() => {
      categoryEl.textContent =
        project.category || "SELECTED PROJECT";

      locationEl.textContent =
        project.location || "Architecture";

      yearEl.textContent =
        project.year || "2026";

      descriptionEl.textContent =
        project.description ||
        "A considered study in form, material, and light.";

      categoryEl.classList.remove("is-leaving");
      metaEl.classList.remove("is-leaving");
    }, animate && !reducedMotion
      ? Math.min(220, timing.detail / 2)
      : 0);

    metaEl.hidden = !CONFIG.showMeta;

    renderTitle(
      project.title || "Untitled",
      direction,
      animate
    );

    updateRail(false);

    updateNavigation();
  }


  /* CHANGE PROJECT */

  function goTo(nextIndex) {
    const next =
      (nextIndex + projects.length) % projects.length;

    if (next === activeIndex) return;

    const delta = next - activeIndex;

    const direction =
      Math.abs(delta) > projects.length / 2
        ? -Math.sign(delta)
        : Math.sign(delta);

    activeIndex = next;

    applyProject(
      projects[activeIndex],
      direction || 1,
      true
    );

    if (typeof CONFIG.onProjectChange === "function") {
      CONFIG.onProjectChange(projects[activeIndex]);
    }
  }


  /*  AUTOPLAY */

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }

    autoplayTimer = null;
  }

  function startAutoplay() {
    stopAutoplay();

    if (
      reducedMotion ||
      !CONFIG.autoPlay ||
      projects.length < 2
    ) {
      return;
    }

    autoplayTimer = setInterval(() => {
      if (!(CONFIG.pauseOnHover && hovered)) {
        goTo(activeIndex + 1);
      }
    }, Math.max(800, Number(CONFIG.interval) || 4200));
  }


  /* =========================================
     MOUSE PARALLAX
  ========================================= */

  function handlePointerMove(event) {
    if (!CONFIG.parallax || reducedMotion) return;

    const rect = root.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    railEl.style.transform =
      `translate3d(${x * 13}px, ${y * 10}px, 0)`;
  }

  function resetPointer() {
    railEl.style.transform =
      "translate3d(0, 0, 0)";
  }


  /* KEYBOARD NAVIGATION */

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  });


  /* EVENT LISTENERS */

  root.addEventListener(
    "pointermove",
    handlePointerMove
  );

  root.addEventListener(
    "pointerleave",
    resetPointer
  );

  root.addEventListener("mouseenter", () => {
    hovered = true;
  });

  root.addEventListener("mouseleave", () => {
    hovered = false;
  });

  prevButton.addEventListener("click", () => {
    goTo(activeIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    goTo(activeIndex + 1);
  });


  /* INITIALIZE COMPONENT */

  createNavigation();

  renderRail();

  applyProject(
    projects[activeIndex],
    1,
    false
  );

  updateNavigation();

  startAutoplay();


  /* CLEANUP */

  window.addEventListener("beforeunload", () => {
    stopAutoplay();

    window.clearTimeout(categoryTimer);
  });

})();