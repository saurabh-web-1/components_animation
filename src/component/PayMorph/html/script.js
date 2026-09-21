const card =
  document.getElementById("card");

const cardNumberInput =
  document.getElementById("cardNumber");

const holderInput =
  document.getElementById("holder");

const expiryInput =
  document.getElementById("expiry");

const cvvInput =
  document.getElementById("cvv");


const displayNumber =
  document.getElementById("displayNumber");

const displayHolder =
  document.getElementById("displayHolder");

const displayExpiry =
  document.getElementById("displayExpiry");

const displayCvv =
  document.getElementById("displayCvv");


const frontBrand =
  document.getElementById("frontBrand");

const backBrand =
  document.getElementById("backBrand");


const paymentForm =
  document.getElementById("paymentForm");

const payButton =
  document.getElementById("payButton");

const buttonContent =
  document.getElementById("buttonContent");

const particles =
  document.getElementById("particles");


/* ================= CARD NUMBER ================= */

function formatCardNumber(value) {

  const digits =
    value
      .replace(/\D/g, "")
      .slice(0, 16);

  return digits
    .replace(/(.{4})/g, "$1 ")
    .trim();
}


/* ================= EXPIRY ================= */

function formatExpiry(value) {

  const digits =
    value
      .replace(/\D/g, "")
      .slice(0, 4);

  if (digits.length > 2) {

    return (
      digits.slice(0, 2) +
      "/" +
      digits.slice(2)
    );

  }

  return digits;
}


/* ================= CARD BRAND ================= */

function getCardBrand(number) {

  const value =
    number.replace(/\s/g, "");


  if (/^4/.test(value)) {

    return "VISA";

  }


  if (
    /^(5[1-5]|2[2-7])/.test(value)
  ) {

    return "MASTERCARD";

  }


  if (/^3[47]/.test(value)) {

    return "AMEX";

  }


  return "CARD";
}


/* ================= BRAND UI ================= */

function setBrand(brand) {

  if (brand === "MASTERCARD") {

    frontBrand.className =
      "brand mastercard";

    frontBrand.innerHTML = `
      <div class="mastercard-icon">

        <span class="red"></span>

        <span class="yellow"></span>

      </div>
    `;

  } else {

    frontBrand.className =
      "brand";

    frontBrand.textContent =
      brand;

  }


  backBrand.textContent =
    brand;
}


/* ================= FLIP ================= */

function flipToBack() {

  card.classList.add(
    "show-back"
  );

}


function flipToFront() {

  card.classList.remove(
    "show-back"
  );

}


/* ================= CARD NUMBER INPUT ================= */

cardNumberInput.addEventListener(
  "input",
  function (event) {

    event.target.value =
      formatCardNumber(
        event.target.value
      );


    displayNumber.textContent =
      event.target.value ||
      "•••• •••• •••• ••••";


    const brand =
      getCardBrand(
        event.target.value
      );


    setBrand(brand);

  }
);


cardNumberInput.addEventListener(
  "focus",
  flipToFront
);


/* ================= HOLDER ================= */

holderInput.addEventListener(
  "input",
  function (event) {

    event.target.value =
      event.target.value.toUpperCase();


    displayHolder.textContent =
      event.target.value ||
      "YOUR NAME";

  }
);


holderInput.addEventListener(
  "focus",
  flipToFront
);


/* ================= EXPIRY ================= */

expiryInput.addEventListener(
  "input",
  function (event) {

    event.target.value =
      formatExpiry(
        event.target.value
      );


    displayExpiry.textContent =
      event.target.value ||
      "MM/YY";

  }
);


expiryInput.addEventListener(
  "focus",
  flipToFront
);


/* ================= CVV ================= */

cvvInput.addEventListener(
  "input",
  function (event) {

    event.target.value =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 4);


    displayCvv.textContent =
      event.target.value ||
      "•••";


    if (
      event.target.value.length > 0
    ) {

      flipToBack();

    }

  }
);


cvvInput.addEventListener(
  "focus",
  flipToBack
);


/* ================= PAYMENT ================= */

paymentForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    const number =
      cardNumberInput.value
        .replace(/\s/g, "");


    const holder =
      holderInput.value.trim();


    const expiry =
      expiryInput.value;


    const cvv =
      cvvInput.value;


    /* VALIDATION */

    if (
      number.length < 16 ||
      holder.length < 2 ||
      expiry.length < 5 ||
      cvv.length < 3
    ) {

      alert(
        "Please complete all payment details."
      );

      return;

    }


    /* PROCESSING */

    payButton.disabled =
      true;


    buttonContent.innerHTML = `
      <span class="spinner"></span>
      Processing...
    `;


    /* SUCCESS */

    setTimeout(
      function () {

        payButton.classList.add(
          "success"
        );


        buttonContent.innerHTML = `
          <span class="success-icon">
            ✓
          </span>

          Payment Successful
        `;


        createParticles();

      },
      2200
    );

  }
);


/* ================= PARTICLES ================= */

function createParticles() {

  particles.innerHTML = "";


  for (
    let i = 0;
    i < 14;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );


    particle.className =
      "particle";


    const angle = i;

    const distance =
      100 + i * 5;


    particle.style.setProperty(
      "--x",
      `${Math.cos(angle) * distance}px`
    );


    particle.style.setProperty(
      "--y",
      `${Math.sin(angle) * distance}px`
    );


    particle.style.animationDelay =
      `${i * 0.03}s`;


    particles.appendChild(
      particle
    );

  }


  setTimeout(
    function () {

      particles.innerHTML = "";

    },
    1500
  );

}


/* ================= INITIAL ================= */

setBrand("CARD");