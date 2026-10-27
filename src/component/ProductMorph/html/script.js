
const DEFAULT_VARIANTS = [
  {
    id: "original",
    name: "Original Taste",
    shortName: "Cola",
    accent: "#ef233c",
    accentSoft: "rgba(239,35,60,0.30)",
    image: "original-image.png",
    price: 2.4,
    description:
      "Classic cola flavor with a crisp and refreshing finish.",
    meta: "330 ML · 35G SUGAR · 32 MG CAFFEINE",
  },
  {
    id: "lime",
    name: "Lime Twist",
    shortName: "Lime",
    accent: "#22c55e",
    accentSoft: "rgba(34,197,94,0.28)",
    image: "lime-image.png",
    price: 2.6,
    description:
      "Fresh lime notes with a bright sparkling finish.",
    meta: "330 ML · 31G SUGAR · 30 MG CAFFEINE",
  },
];

const CONFIG = {
  brand: "AXIS",
  title: "Cola",
  compactText: "TAP TO OPEN",
  buttonText: "Add to cart",

  initialVariant: 0,
  initialQuantity: 1,

  autoOpen: false,
  autoOpenDelay: 1800,

  particles: true,
  showQuantity: true,

  openDuration: 1.05,
  closeDuration: 1.1,

  animation: {
    float: 3,
    glow: 3.5,
    ambientOpacity: 0.6,
    particle: 3,
    detail: 0.7,
    cartControls: 0.45,
    lightSweep: 4,
    compactLine: 2,
    productShift: 0.7,
    cartButton: 0.3,
    adding: 1,
    addedCloseDelay: 1300,
    cartFeedback: 1000,
  },

  // Replace with your actual cart/API function if needed.
  onAddToCart: async (item) => {
    console.log("Product added to cart:", item);
  },

  onVariantChange: (variant) => {
    console.log("Selected variant:", variant);
  },

  onClose: () => {
    console.log("Product card closed");
  },
};

const $ = (id) => document.getElementById(id);

const page = document.querySelector(".product-page");
const card = $("productCard");
const ambientGlow = $("ambientGlow");
const cardBackground = $("cardBackground");

const openBtn = $("openBtn");
const compactText = $("compactText");
const compactLine = $("compactLine");

const productVisual = $("productVisual");
const productImage = $("productImage");
const productFloat = $("productFloat");
const productGlow = $("productGlow");

const productDetails = $("productDetails");
const brandLabel = $("brandLabel");
const productTitle = $("productTitle");
const productDescription = $("productDescription");
const productMeta = $("productMeta");
const variantsContainer = $("variants");

const quantityControl = $("quantityControl");
const quantityValue = $("quantityValue");
const decreaseBtn = $("decreaseBtn");
const increaseBtn = $("increaseBtn");

const totalPrice = $("totalPrice");
const bottomLabel = $("bottomLabel");

const cartControls = $("cartControls");
const closeBtn = $("closeBtn");
const cartBtn = $("cartBtn");
const cartContent = $("cartContent");
const buttonText = $("buttonText");
const buttonTotal = $("buttonTotal");

const particlesContainer = $("particles");

let variants = DEFAULT_VARIANTS;
let selectedVariant = Math.min(
  Math.max(0, CONFIG.initialVariant),
  variants.length - 1
);

let quantity = Math.max(
  1,
  Math.floor(CONFIG.initialQuantity)
);

let open = false;
let closing = false;
let detailsVisible = false;
let cartState = "idle";

let activeTimers = [];
let transitionToken = 0;

const animation = {
  open: CONFIG.animation.open ?? CONFIG.openDuration,
  close: CONFIG.animation.close ?? CONFIG.closeDuration,
  float: CONFIG.animation.float ?? 3,
  glow: CONFIG.animation.glow ?? 3.5,
  ambientOpacity: CONFIG.animation.ambientOpacity ?? 0.6,
  particle: CONFIG.animation.particle ?? 3,
  detail: CONFIG.animation.detail ?? 0.7,
  cartControls: CONFIG.animation.cartControls ?? 0.45,
  lightSweep: CONFIG.animation.lightSweep ?? 4,
  compactLine: CONFIG.animation.compactLine ?? 2,
  productShift: CONFIG.animation.productShift ?? 0.7,
  cartButton: CONFIG.animation.cartButton ?? 0.3,
  adding: CONFIG.animation.adding ?? 1,
  addedCloseDelay: CONFIG.animation.addedCloseDelay ?? 1300,
  cartFeedback: CONFIG.animation.cartFeedback ?? 1000,
};

function getVariant() {
  return variants[selectedVariant];
}

function getTotal() {
  return (
    Number(getVariant().price) * quantity
  ).toFixed(2);
}

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

function schedule(callback, delay) {
  const timer = window.setTimeout(() => {
    activeTimers = activeTimers.filter(
      (item) => item !== timer
    );
    callback();
  }, Math.max(0, delay));

  activeTimers.push(timer);
  return timer;
}

function clearScheduledTimers() {
  activeTimers.forEach(window.clearTimeout);
  activeTimers = [];
}

function setAccent() {
  const variant = getVariant();

  document.documentElement.style.setProperty(
    "--accent",
    variant.accent
  );

  document.documentElement.style.setProperty(
    "--accent-soft",
    variant.accentSoft
  );

  ambientGlow.style.background = variant.accent;
  productGlow.style.background = variant.accent;

  card.style.boxShadow = `
    0 35px 110px rgba(0,0,0,.72),
    0 0 65px ${variant.accentSoft}
  `;

  cardBackground.style.background = `
    radial-gradient(
      circle at ${open ? "77% 52%" : "50% 45%"},
      ${variant.accentSoft},
      transparent ${open ? "34%" : "42%"}
    ),
    radial-gradient(
      circle at 17% 75%,
      rgba(255,255,255,.025),
      transparent 42%
    )
  `;
}

function renderVariants() {
  variantsContainer.innerHTML = "";

  variants.forEach((variant, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "variant-btn";
    button.classList.toggle(
      "active",
      index === selectedVariant
    );

    button.disabled =
      cartState !== "idle" || closing;

    button.innerHTML = `
      <span
        class="variant-dot"
        style="
          background:${variant.accent};
          box-shadow:${
            index === selectedVariant
              ? `0 0 14px ${variant.accentSoft}`
              : "none"
          };
        "
      ></span>
      <span>${variant.shortName}</span>
    `;

    button.addEventListener("click", () => {
      changeVariant(index);
    });

    variantsContainer.appendChild(button);
  });
}

function updateProduct() {
  const variant = getVariant();

  setAccent();

  brandLabel.textContent =
    `${CONFIG.brand} / ${variant.shortName}`;

  productTitle.textContent = CONFIG.title;

  productDescription.textContent =
    variant.description;

  productMeta.textContent = variant.meta;

  productImage.src = variant.image;
  productImage.alt = variant.name;

  quantityValue.textContent = quantity;

  totalPrice.textContent =
    formatPrice(getTotal());

  buttonTotal.textContent =
    formatPrice(getTotal());

  compactText.textContent =
    CONFIG.compactText;

  buttonText.textContent =
    CONFIG.buttonText;

  quantityControl.hidden =
    !CONFIG.showQuantity;

  decreaseBtn.disabled =
    cartState !== "idle" || closing;

  increaseBtn.disabled =
    cartState !== "idle" || closing;

  renderVariants();
  updateCartButton();
}

function changeVariant(index) {
  if (
    cartState !== "idle" ||
    closing ||
    index === selectedVariant ||
    !variants[index]
  ) {
    return;
  }

  selectedVariant = index;

  // Update image and accent immediately.
  // No image-slide or bottle-swap animation.
  updateProduct();

  if (typeof CONFIG.onVariantChange === "function") {
    CONFIG.onVariantChange(getVariant());
  }
}

function setDetailsVisible(visible) {
  detailsVisible = visible;

  productDetails.setAttribute(
    "aria-hidden",
    String(!visible)
  );

  productDetails.inert = !visible;

  if (visible) {
    productDetails.style.pointerEvents = "auto";
  } else {
    productDetails.style.pointerEvents = "none";
  }
}

function openCard() {
  if (
    open ||
    closing ||
    cartState !== "idle"
  ) {
    return;
  }

  clearScheduledTimers();

  transitionToken += 1;
  const token = transitionToken;

  open = true;
  closing = false;

  card.classList.remove("is-closing");
  card.classList.add("is-open");

  page.classList.add("is-open");

  productVisual.setAttribute(
    "aria-label",
    `Close ${getVariant().name} product details`
  );

  setDetailsVisible(false);
  updateProduct();

  schedule(() => {
    if (token !== transitionToken || !open) return;
    setDetailsVisible(true);
  }, animation.open * 500);
}

function closeCard() {
  if (
    !open ||
    closing ||
    cartState !== "idle"
  ) {
    return;
  }

  clearScheduledTimers();

  transitionToken += 1;
  const token = transitionToken;

  closing = true;

  card.classList.add("is-closing");
  setDetailsVisible(false);

  schedule(() => {
    if (token !== transitionToken) return;

    open = false;
    closing = false;

    card.classList.remove("is-open", "is-closing");
    page.classList.remove("is-open");

    productVisual.setAttribute(
      "aria-label",
      `Open ${getVariant().name} product details`
    );

    setAccent();

    if (typeof CONFIG.onClose === "function") {
      CONFIG.onClose();
    }
  }, animation.close * 1000);
}

function toggleCard() {
  if (closing || cartState !== "idle") return;

  if (open) {
    closeCard();
  } else {
    openCard();
  }
}

function updateCartButton() {
  const busy = cartState !== "idle" || closing;

  cartBtn.disabled = busy;

  cartBtn.classList.toggle(
    "added",
    cartState === "added"
  );

  cartBtn.classList.toggle(
    "adding",
    cartState === "adding"
  );

  cartBtn.innerHTML = "";

  const content = document.createElement("span");
  content.className = "cart-content";

  if (cartState === "idle") {
    content.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12l1 14H5L6 7Z"></path>
        <path d="M9 7a3 3 0 0 1 6 0"></path>
      </svg>
      <span>${CONFIG.buttonText}</span>
      <span class="button-total">${formatPrice(getTotal())}</span>
    `;
  }

  if (cartState === "adding") {
    content.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 8h12v10H3z"></path>
        <path d="M15 11h4l3 3v4h-7z"></path>
        <circle cx="7" cy="20" r="1.5"></circle>
        <circle cx="18" cy="20" r="1.5"></circle>
      </svg>
      <span>Adding...</span>
    `;
  }

  if (cartState === "added") {
    content.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12 4 4L19 6"></path>
      </svg>
      <span>Added to cart</span>
    `;
  }

  cartBtn.appendChild(content);
}

function setCartState(state) {
  cartState = state;
  updateProduct();

  closeBtn.disabled =
    state !== "idle" || closing;
}

async function addToCart() {
  if (
    cartState !== "idle" ||
    closing
  ) {
    return;
  }

  const variant = getVariant();

  const item = {
    brand: CONFIG.brand,
    title: CONFIG.title,
    variant: variant.name,
    variantId: variant.id,
    quantity,
    unitPrice: Number(variant.price),
    total: Number(getTotal()),
  };

  setCartState("adding");

  try {
    if (typeof CONFIG.onAddToCart === "function") {
      await CONFIG.onAddToCart(item);
    }

    await new Promise((resolve) => {
      window.setTimeout(
        resolve,
        animation.cartFeedback
      );
    });

    setCartState("added");

    schedule(() => {
      if (cartState !== "added") return;

      closing = true;
      card.classList.add("is-closing");
      setDetailsVisible(false);
    }, animation.addedCloseDelay);

    schedule(() => {
      open = false;
      closing = false;

      card.classList.remove("is-open", "is-closing");
      page.classList.remove("is-open");

      setCartState("idle");

      productVisual.setAttribute(
        "aria-label",
        `Open ${getVariant().name} product details`
      );

      if (typeof CONFIG.onClose === "function") {
        CONFIG.onClose();
      }
    }, animation.addedCloseDelay + animation.close * 1000);

  } catch (error) {
    console.error("Add to cart failed:", error);

    setCartState("idle");

    // Add your own error message UI here if needed.
  }
}

function changeQuantity(amount) {
  if (
    cartState !== "idle" ||
    closing
  ) {
    return;
  }

  quantity = Math.max(1, quantity + amount);
  updateProduct();
}

function createParticles() {
  particlesContainer.innerHTML = "";

  if (!CONFIG.particles) return;

  for (let i = 0; i < 14; i += 1) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
      `${7 + ((i * 19) % 86)}%`;

    particle.style.top =
      `${14 + ((i * 23) % 70)}%`;

    particle.style.setProperty(
      "--particle-duration",
      `${animation.particle + (i % 3) * 0.5}s`
    );

    particle.style.setProperty(
      "--particle-delay",
      `${i * 0.1}s`
    );

    particle.style.setProperty(
      "--particle-x",
      i % 2 ? "8px" : "-8px"
    );

    particlesContainer.appendChild(particle);
  }
}

openBtn.addEventListener("click", openCard);

closeBtn.addEventListener("click", closeCard);

productVisual.addEventListener("click", toggleCard);

productVisual.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" ||
    event.key === " "
  ) {
    event.preventDefault();
    toggleCard();
  }
});

decreaseBtn.addEventListener("click", () => {
  changeQuantity(-1);
});

increaseBtn.addEventListener("click", () => {
  changeQuantity(1);
});

cartBtn.addEventListener("click", addToCart);

document.documentElement.style.setProperty(
  "--open-duration",
  `${animation.open}s`
);

document.documentElement.style.setProperty(
  "--close-duration",
  `${animation.close}s`
);

createParticles();
updateProduct();
setDetailsVisible(false);

if (CONFIG.autoOpen) {
  schedule(() => {
    openCard();
  }, CONFIG.autoOpenDelay);
}
