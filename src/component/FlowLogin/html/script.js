const loginCard = document.getElementById("loginCard");
const compactButton = document.getElementById("compactButton");
const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const passwordToggle = document.getElementById("passwordToggle");
const passwordEye = document.getElementById("passwordEye");

const rememberButton = document.getElementById("rememberButton");
const rememberCheckbox = document.getElementById("rememberCheckbox");

const signinButton = document.getElementById("signinButton");
const signinText = document.getElementById("signinText");

const forgotButton = document.getElementById("forgotButton");
const googleButton = document.getElementById("googleButton");
const appleButton = document.getElementById("appleButton");
const createAccountButton =
  document.getElementById("createAccountButton");

const flowGlow = document.querySelector(".flow-glow");
const flowOrb = document.querySelector(".flow-orb");

let expanded = false;
let passwordVisible = false;
let remember = false;
let loading = false;

function expandCard() {
  if (loading) return;

  expanded = true;

  loginCard.classList.add("expanded");

  flowGlow.style.opacity = "0.95";
  flowGlow.style.transform =
    "translate(-50%, -50%) scale(1.06)";

  flowOrb.style.transform =
    "translateY(-18px) scale(1.03)";
}

function collapseCard() {
  if (loading) return;

  expanded = false;

  loginCard.classList.remove("expanded");

  flowGlow.style.opacity = "0.7";
  flowGlow.style.transform =
    "translate(-50%, -50%) scale(1)";

  flowOrb.style.transform =
    "translateY(0) scale(1)";
}

compactButton.addEventListener("click", () => {
  if (!expanded) {
    expandCard();
  }
});

function createEyeSVG(visible) {
  if (visible) {
    return `
      <path d="M3 3l18 18"></path>
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"></path>
      <path d="M9.9 5.2A9.9 9.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.1"></path>
      <path d="M6.1 6.1C3.5 7.8 2 12 2 12s3.5 7 10 7c1.6 0 3-.4 4.2-1"></path>
    `;
  }

  return `
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  `;
}

passwordToggle.addEventListener("click", () => {
  if (loading) return;

  passwordVisible = !passwordVisible;

  passwordInput.type =
    passwordVisible ? "text" : "password";

  passwordEye.innerHTML =
    createEyeSVG(passwordVisible);

  passwordToggle.setAttribute(
    "aria-label",
    passwordVisible
      ? "Hide password"
      : "Show password"
  );
});

rememberButton.addEventListener("click", () => {
  if (loading) return;

  remember = !remember;

  rememberCheckbox.classList.toggle(
    "checked",
    remember
  );
});

function setLoading(state) {
  loading = state;

  signinButton.classList.toggle(
    "loading",
    state
  );

  signinButton.disabled = state;

  if (state) {
    signinText.textContent = "Signing in...";
  } else {
    signinText.textContent = "Sign in";
  }

  document
    .querySelectorAll(
      "input, .compact-button, .eye-button, .remember-button, .forgot-button, .social-button, .signup-text button"
    )
    .forEach((element) => {
      element.disabled = state;
    });
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (loading) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    if (!email) {
      emailInput.focus();
    } else {
      passwordInput.focus();
    }

    return;
  }

  const loginData = {
    email,
    password,
    remember
  };

  console.log("Login data:", loginData);

  setLoading(true);

  try {

    // Replace this demo timeout with your API request.
    await new Promise((resolve) => {
      setTimeout(resolve, 1400);
    });

    console.log("Login successful");

    // Example:
    // window.location.href = "/dashboard";

  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    setLoading(false);
  }
});

forgotButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Forgot password clicked");

  // Example:
  // window.location.href = "/forgot-password";
});

googleButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Google login clicked");

  // Example:
  // window.location.href = "/auth/google";
});

appleButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Apple login clicked");

  // Example:
  // window.location.href = "/auth/apple";
});

createAccountButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Create account clicked");

  // Example:
  // window.location.href = "/signup";
});