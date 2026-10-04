const DEFAULT_CARDS = [
  {
    category: "LANGUAGE • PYTHON",
    title: "First Line of Code",
    description:
      'The terminal glowed, displaying my first "Hello, World." in Python.',
    detail:
      "I remember the thrill of typing my first Hello World. It was simple, but it opened a door into countless possibilities.",
    meta: "code / 01",
    accent: "#a855f7",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "DEBUGGING",
    title: "Debugging the Matrix",
    description:
      "The error messages multiplied, haunting my console.",
    detail:
      "Every unexpected output became another clue. Debugging was less about fixing a bug and more about understanding the system.",
    meta: "debug / 02",
    accent: "#ec4899",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "LIBRARY",
    title: "The Algorithm Library",
    description:
      "Endless layers of sorting, searching, and optimization.",
    detail:
      "Algorithms became building blocks for solving increasingly complex problems and turning ideas into efficient systems.",
    meta: "algorithms / 03",
    accent: "#8b5cf6",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "VERSION CONTROL",
    title: "The Version Control Mirror",
    description:
      "Every commit became a snapshot of another possibility.",
    detail:
      "Branches, commits and merges created a history of decisions. Version control transformed mistakes into recoverable moments.",
    meta: "git / 04",
    accent: "#6366f1",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "DEPLOYMENT",
    title: "The Deployment Dream",
    description:
      "From localhost to production, the idea finally became real.",
    detail:
      "Deployment is the point where a project leaves the developer's machine and becomes something people can actually experience.",
    meta: "deploy / 05",
    accent: "#06b6d4",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
  {
    category: "ABSTRACT",
    title: "The Abstract Void",
    description:
      "Sometimes the empty space becomes part of the experience.",
    detail:
      "Good interfaces know when not to speak. Negative space gives important elements room to breathe and creates visual focus.",
    meta: "concept / 06",
    accent: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    link: "/card",
  },
];

const CONFIG = {
  autoPlay: true,
  moveDuration: 1.45,
  holdDuration: 2200,
  cardWidth: 300,
  cardHeight: 410,
  radius: 390,
  dragSensitivity: 0.42,
  redirectOnBackClick: true,
};

const cards = DEFAULT_CARDS.filter(Boolean);

let rotation = 0;
let dragging = false;
let flipped = null;

let timer = null;
let animationFrame = null;

const step = cards.length ? 360 / cards.length : 0;

const stage = document.getElementById("cardStage");
const container = document.getElementById("cardsContainer");
const controls = document.getElementById("controls");
const dotsContainer = document.getElementById("dots");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const interaction = {
  active: false,
  startX: 0,
  startRotation: 0,
  moved: false,
  cardIndex: null,
};

function normalizeAngle(angle) {
  return ((angle + 180) % 360) - 180;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getFrontIndex() {
  let closest = 0;
  let closestDistance = Infinity;

  cards.forEach((_, index) => {
    const angle = index * step + rotation;
    const normalized = normalizeAngle(angle);
    const distance = Math.abs(normalized);

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = index;
    }
  });

  return closest;
}

function createCard(card, index) {
  const element = document.createElement("div");

  element.className = "card-3d";
  element.dataset.cardIndex = index;

  element.style.width = `${CONFIG.cardWidth}px`;
  element.style.height = `${CONFIG.cardHeight}px`;

  element.innerHTML = `
    <div class="card-inner">

      <div class="card-flipper">

        <div class="card-face card-front">

          <div
            class="card-background"
            style="
              background:
                radial-gradient(
                  circle at 72% 18%,
                  ${card.accent}28,
                  transparent 38%
                ),
                linear-gradient(
                  145deg,
                  #231535 0%,
                  #120c1b 52%,
                  #09070d 100%
                );
            "
          ></div>

          ${
            card.image
              ? `
                <div class="card-image">
                  <img
                    src="${card.image}"
                    alt=""
                    draggable="false"
                  />
                </div>
              `
              : ""
          }

          <div class="card-inner-border"></div>

          <div class="card-content">

            <div class="card-top">
              <span
                class="card-category"
                style="color:${card.accent}"
              >
                ${card.category}
              </span>

              <span class="card-number">
                ${String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div class="card-main">

              <h2 class="card-title">
                ${card.title}
              </h2>

              <p class="card-description">
                ${card.description}
              </p>

              <div class="card-footer">
                <span class="card-meta">
                  ${card.meta}
                </span>

                <span class="explore-pill">
                  Click to explore
                </span>
              </div>

            </div>
          </div>

          <div
            class="card-shadow-glow"
            style="background:${card.accent}15"
          ></div>

        </div>

        <div class="card-face card-back">

          <div
            class="card-background"
            style="
              background:
                radial-gradient(
                  circle at 25% 20%,
                  ${card.accent}20,
                  transparent 37%
                ),
                linear-gradient(
                  145deg,
                  #1c1128,
                  #0b0711
                );
            "
          ></div>

          ${
            card.image
              ? `
                <div class="back-image">
                  <img
                    src="${card.image}"
                    alt=""
                    draggable="false"
                  />
                </div>
              `
              : ""
          }

          <div class="card-inner-border"></div>

          <div class="back-content">

            <div class="back-header">

              <span
                class="back-category"
                style="color:${card.accent}"
              >
                ${card.category}
              </span>

              <button
                type="button"
                class="return-btn"
                data-return="${index}"
              >
                ↶
              </button>

            </div>

            <div class="back-main">

              <span class="about-label">
                About this card
              </span>

              <h3 class="back-title">
                ${card.title}
              </h3>

              <div
                class="accent-line"
                style="background:${card.accent}"
              ></div>

              <p class="back-description">
                ${card.detail}
              </p>

            </div>

            <div class="back-footer">

              <span class="card-meta">
                ${card.meta}
              </span>

              <span class="open-pill">
                Open ↗
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  `;

  const flipper = element.querySelector(".card-flipper");
  const returnBtn = element.querySelector(".return-btn");

  returnBtn.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });

  returnBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    flipped = null;
    updateCards();
    restartAutoPlay();
  });

  flipper.addEventListener("click", (event) => {
    if (flipped !== index) return;

    if (event.target.closest(".return-btn")) {
      return;
    }

    if (!CONFIG.redirectOnBackClick) return;

    window.location.href = card.link || "/card";
  });

  return element;
}

function renderCards() {
  container.innerHTML = "";

  cards.forEach((card, index) => {
    container.appendChild(
      createCard(card, index)
    );
  });

  renderDots();
  updateCards();
}

function renderDots() {
  dotsContainer.innerHTML = "";

  cards.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dot-btn";

    const dot = document.createElement("span");
    dot.className = "dot";

    button.appendChild(dot);

    button.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      flipped = null;
      rotation = -index * step;

      updateCards();
      restartAutoPlay();
    });

    dotsContainer.appendChild(button);
  });
}

function updateDots(frontIndex) {
  const buttons =
    dotsContainer.querySelectorAll(".dot-btn");

  buttons.forEach((button, index) => {
    const dot = button.querySelector(".dot");

    dot.classList.toggle(
      "active",
      index === frontIndex
    );
  });
}

function updateCards() {
  const frontIndex = getFrontIndex();

  const elements =
    container.querySelectorAll(".card-3d");

  elements.forEach((element, index) => {
    const card = cards[index];

    const angle =
      index * step + rotation;

    const radians =
      (angle * Math.PI) / 180;

    const x =
      Math.sin(radians) * CONFIG.radius;

    const z =
      Math.cos(radians) * CONFIG.radius;

    const normalized =
      normalizeAngle(angle);

    const absAngle =
      Math.abs(normalized);

    const isFront =
      index === frontIndex;

    const isFlipped =
      flipped === index;

    const depth =
      (z + CONFIG.radius) /
      (CONFIG.radius * 2);

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
      : clamp(
          (1 - depth) * 1.4,
          0,
          1.2
        );

    const visibility =
      absAngle > 145 &&
      absAngle < 215
        ? 0.035
        : opacity;

    element.style.zIndex =
      Math.round(
        (z + CONFIG.radius) * 100
      );

    element.style.pointerEvents =
      visibility < 0.08
        ? "none"
        : "auto";

    element.style.opacity =
      visibility;

    element.style.filter =
      `blur(${blur}px)`;

    element.style.transform = `
      translate3d(
        calc(-50% + ${x}px),
        -50%,
        ${z}px
      )
      rotateY(${angle}deg)
      scale(${scale})
    `;

    const flipper =
      element.querySelector(".card-flipper");

    flipper.classList.toggle(
      "flipped",
      isFlipped
    );

    const oldSweep =
      element.querySelector(".light-sweep");

    if (oldSweep) {
      oldSweep.remove();
    }

    if (isFront && !isFlipped) {
      const front =
        element.querySelector(".card-front");

      const sweep =
        document.createElement("div");

      sweep.className =
        "light-sweep";

      front.appendChild(sweep);
    }
  });

  updateDots(frontIndex);
}

function animateRotation(target) {
  cancelAnimationFrame(animationFrame);

  const start = rotation;
  const difference = target - start;
  const duration =
    CONFIG.moveDuration * 1000;

  const startTime =
    performance.now();

  function animate(now) {
    const progress =
      Math.min(
        (now - startTime) / duration,
        1
      );

    const eased =
      1 - Math.pow(1 - progress, 3);

    rotation =
      start + difference * eased;

    updateCards();

    if (progress < 1) {
      animationFrame =
        requestAnimationFrame(animate);
    }
  }

  animationFrame =
    requestAnimationFrame(animate);
}

function snapToNearest() {
  if (!step) return;

  const nearest =
    Math.round(rotation / step);

  animateRotation(
    nearest * step
  );
}

function next() {
  if (!step) return;

  clearTimeout(timer);

  flipped = null;

  const nearest =
    Math.round(rotation / step);

  animateRotation(
    (nearest - 1) * step
  );

  setTimeout(
    startAutoPlay,
    CONFIG.moveDuration * 1000
  );
}

function previous() {
  if (!step) return;

  clearTimeout(timer);

  flipped = null;

  const nearest =
    Math.round(rotation / step);

  animateRotation(
    (nearest + 1) * step
  );

  setTimeout(
    startAutoPlay,
    CONFIG.moveDuration * 1000
  );
}

/* Bottom controls */

controls.addEventListener(
  "pointerdown",
  (event) => {
    event.stopPropagation();
  }
);

controls.addEventListener(
  "pointermove",
  (event) => {
    event.stopPropagation();
  }
);

controls.addEventListener(
  "pointerup",
  (event) => {
    event.stopPropagation();
  }
);

controls.addEventListener(
  "pointercancel",
  (event) => {
    event.stopPropagation();
  }
);

controls.addEventListener(
  "click",
  (event) => {
    event.stopPropagation();
  }
);

previousBtn.addEventListener(
  "pointerdown",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
  }
);

nextBtn.addEventListener(
  "pointerdown",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
  }
);

previousBtn.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    event.stopPropagation();

    previous();
  }
);

nextBtn.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    event.stopPropagation();

    next();
  }
);

/* Drag */

function handlePointerDown(event) {
  if (
    event.button !== undefined &&
    event.button !== 0
  ) {
    return;
  }

  if (
    event.target.closest("#controls")
  ) {
    return;
  }

  const cardElement =
    event.target.closest(
      "[data-card-index]"
    );

  const cardIndex =
    cardElement
      ? Number(
          cardElement.dataset.cardIndex
        )
      : null;

  interaction.active = true;
  interaction.startX =
    event.clientX;

  interaction.startRotation =
    rotation;

  interaction.moved = false;
  interaction.cardIndex =
    cardIndex;

  dragging = false;

  clearTimeout(timer);
  timer = null;

  stage.classList.remove(
    "dragging"
  );

  document.body.style.userSelect =
    "none";

  document.body.style.webkitUserSelect =
    "none";

  stage.setPointerCapture?.(
    event.pointerId
  );
}

function handlePointerMove(event) {
  if (!interaction.active) return;

  const deltaX =
    event.clientX -
    interaction.startX;

  if (Math.abs(deltaX) > 8) {
    interaction.moved = true;
    dragging = true;

    stage.classList.add(
      "dragging"
    );

    if (flipped !== null) {
      flipped = null;
      updateCards();
    }
  }

  if (interaction.moved) {
    rotation =
      interaction.startRotation +
      deltaX *
        CONFIG.dragSensitivity;

    updateCards();
  }
}

function handlePointerUp(event) {
  if (!interaction.active) return;

  const wasMoved =
    interaction.moved;

  const clickedCard =
    interaction.cardIndex;

  interaction.active = false;
  dragging = false;

  stage.classList.remove(
    "dragging"
  );

  document.body.style.userSelect =
    "";

  document.body.style.webkitUserSelect =
    "";

  if (wasMoved) {
    snapToNearest();
  } else if (
    clickedCard !== null &&
    clickedCard === getFrontIndex()
  ) {
    flipped =
      flipped === clickedCard
        ? null
        : clickedCard;

    updateCards();
  }

  interaction.startX = 0;
  interaction.startRotation = 0;
  interaction.moved = false;
  interaction.cardIndex = null;

  stage.releasePointerCapture?.(
    event.pointerId
  );

  restartAutoPlay();
}

function handlePointerCancel(event) {
  interaction.active = false;
  dragging = false;

  stage.classList.remove(
    "dragging"
  );

  document.body.style.userSelect =
    "";

  document.body.style.webkitUserSelect =
    "";

  interaction.startX = 0;
  interaction.startRotation = 0;
  interaction.moved = false;
  interaction.cardIndex = null;

  stage.releasePointerCapture?.(
    event.pointerId
  );

  restartAutoPlay();
}

stage.addEventListener(
  "pointerdown",
  handlePointerDown
);

stage.addEventListener(
  "pointermove",
  handlePointerMove
);

stage.addEventListener(
  "pointerup",
  handlePointerUp
);

stage.addEventListener(
  "pointercancel",
  handlePointerCancel
);

stage.addEventListener(
  "dragstart",
  (event) => {
    event.preventDefault();
  }
);

/* Auto play */

function startAutoPlay() {
  if (
    !CONFIG.autoPlay ||
    dragging ||
    flipped !== null ||
    cards.length < 2
  ) {
    return;
  }

  clearTimeout(timer);

  timer = setTimeout(() => {
    if (
      dragging ||
      flipped !== null
    ) {
      startAutoPlay();
      return;
    }

    const nearest =
      Math.round(rotation / step);

    animateRotation(
      (nearest - 1) * step
    );

    timer = setTimeout(
      startAutoPlay,
      CONFIG.moveDuration * 1000
    );
  }, CONFIG.holdDuration);
}

function restartAutoPlay() {
  clearTimeout(timer);
  timer = null;

  if (
    !dragging &&
    flipped === null
  ) {
    startAutoPlay();
  }
}

renderCards();
startAutoPlay();