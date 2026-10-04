const signupCard = document.getElementById("signupCard");
const compactButton = document.getElementById("compactButton");
const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const passwordToggle = document.getElementById("passwordToggle");
const confirmToggle = document.getElementById("confirmToggle");

const passwordEye = document.getElementById("passwordEye");
const confirmEye = document.getElementById("confirmEye");

const strengthBars = document.querySelectorAll(".strength-bars span");
const passwordError = document.getElementById("passwordError");

const termsButton = document.getElementById("termsButton");
const checkbox = document.getElementById("checkbox");

const createButton = document.getElementById("createButton");
const createText = document.getElementById("createText");

const googleButton = document.getElementById("googleButton");
const appleButton = document.getElementById("appleButton");
const signinButton = document.getElementById("signinButton");

let expanded = false;
let loading = false;
let termsAccepted = false;
let passwordVisible = false;
let confirmVisible = false;

function expandCard() {
  if (loading) return;

  expanded = true;
  signupCard.classList.add("expanded");
  document.querySelector(".flow-glow").style.opacity = "0.95";
  document.querySelector(".flow-glow").style.transform =
    "translate(-50%, -50%) scale(1.06)";
}

function collapseCard() {
  if (loading) return;

  expanded = false;
  signupCard.classList.remove("expanded");
  document.querySelector(".flow-glow").style.opacity = "0.7";
  document.querySelector(".flow-glow").style.transform =
    "translate(-50%, -50%) scale(1)";
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
  passwordVisible = !passwordVisible;

  passwordInput.type = passwordVisible
    ? "text"
    : "password";

  passwordEye.innerHTML = createEyeSVG(passwordVisible);
});

confirmToggle.addEventListener("click", () => {
  confirmVisible = !confirmVisible;

  confirmInput.type = confirmVisible
    ? "text"
    : "password";

  confirmEye.innerHTML = createEyeSVG(confirmVisible);
});

function getPasswordStrength(password) {
  if (password.length === 0) return 0;
  if (password.length < 6) return 1;
  if (password.length < 10) return 2;
  return 3;
}

function updatePasswordStrength() {
  const strength = getPasswordStrength(passwordInput.value);

  strengthBars.forEach((bar, index) => {
    bar.classList.toggle(
      "active",
      strength >= index + 1
    );
  });
}

function validatePasswords() {
  const confirmValue = confirmInput.value;

  if (
    confirmValue.length > 0 &&
    passwordInput.value !== confirmValue
  ) {
    passwordError.classList.add("show");
  } else {
    passwordError.classList.remove("show");
  }

  updateCreateButton();
}

function updateCreateButton() {
  const passwordMatch =
    passwordInput.value === confirmInput.value;

  const canSubmit =
    nameInput.value.trim() !== "" &&
    emailInput.value.trim() !== "" &&
    passwordInput.value.length > 0 &&
    confirmInput.value.length > 0 &&
    passwordMatch &&
    termsAccepted;

  createButton.disabled = !canSubmit || loading;
}

passwordInput.addEventListener("input", () => {
  updatePasswordStrength();
  validatePasswords();
});

confirmInput.addEventListener("input", validatePasswords);
nameInput.addEventListener("input", updateCreateButton);
emailInput.addEventListener("input", updateCreateButton);

termsButton.addEventListener("click", () => {
  if (loading) return;

  termsAccepted = !termsAccepted;
  checkbox.classList.toggle("checked", termsAccepted);

  updateCreateButton();
});

function setLoading(state) {
  loading = state;

  createButton.classList.toggle("loading", state);

  if (state) {
    createText.textContent = "Creating account...";
    createButton.disabled = true;

    document.querySelectorAll("input, button").forEach((element) => {
      if (element !== createButton) {
        element.disabled = true;
      }
    });
  } else {
    createText.textContent = "Create account";

    document.querySelectorAll("input, button").forEach((element) => {
      element.disabled = false;
    });

    updateCreateButton();
  }
}

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (loading) return;

  if (passwordInput.value !== confirmInput.value) {
    passwordError.classList.add("show");
    return;
  }

  if (!termsAccepted) {
    return;
  }

  const signupData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
    confirmPassword: confirmInput.value,
    terms: termsAccepted
  };

  console.log("Signup data:", signupData);

  setLoading(true);

  try {
    // Replace this timeout with your API request.
    await new Promise((resolve) => {
      setTimeout(resolve, 1400);
    });

    console.log("Signup successful");

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmInput.value = "";

    termsAccepted = false;
    checkbox.classList.remove("checked");

    updatePasswordStrength();
  } catch (error) {
    console.error("Signup failed:", error);
  } finally {
    setLoading(false);
  }
});

googleButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Google signup clicked");

  // Example:
  // window.location.href = "/auth/google";
});

appleButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Apple signup clicked");

  // Example:
  // window.location.href = "/auth/apple";
});

signinButton.addEventListener("click", () => {
  if (loading) return;

  console.log("Sign in clicked");

  // Example:
  // window.location.href = "/login";
});

window.addEventListener("resize", () => {
  // Layout is CSS based, so no recalculation is required.
});

updatePasswordStrength();
updateCreateButton();