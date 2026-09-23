const copyButton =
  document.getElementById("copyButton");

const buttonText =
  document.getElementById("buttonText");

const sourceText =
  document.getElementById("sourceText");


let copied = false;

let resetTimer;


/* =========================================
   COPY
========================================= */

async function copyText() {

  const text =
    sourceText.value;


  try {

    /* =====================================
       MODERN CLIPBOARD
    ===================================== */

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        text
      );

    }

    /* =====================================
       FALLBACK
    ===================================== */

    else {

      const textarea =
        document.createElement(
          "textarea"
        );


      textarea.value =
        text;


      textarea.style.position =
        "fixed";

      textarea.style.left =
        "-9999px";

      textarea.style.top =
        "-9999px";

      textarea.style.opacity =
        "0";


      document.body.appendChild(
        textarea
      );


      textarea.focus();

      textarea.select();


      document.execCommand(
        "copy"
      );


      document.body.removeChild(
        textarea
      );

    }


    showCopied();


  } catch (error) {

    console.error(
      "Copy failed:",
      error
    );

  }

}


/* =========================================
   SHOW COPIED
========================================= */

function showCopied() {

  copied = true;


  clearTimeout(
    resetTimer
  );


  /* ===============================
     STATE
  =============================== */

  copyButton.classList.add(
    "copied"
  );


  /* ===============================
     TEXT
  =============================== */

  buttonText.textContent =
    "Copied!";


  /* ===============================
     TEXT ANIMATION
  =============================== */

  copyButton.classList.remove(
    "text-morph"
  );


  void copyButton.offsetWidth;


  copyButton.classList.add(
    "text-morph"
  );


  /* ===============================
     RESET
  =============================== */

  resetTimer =
    setTimeout(
      resetButton,
      1600
    );

}


/* =========================================
   RESET
========================================= */

function resetButton() {

  copied = false;


  copyButton.classList.remove(
    "copied"
  );

  copyButton.classList.remove(
    "text-morph"
  );


  buttonText.textContent =
    "Copy Code";

}


/* =========================================
   BUTTON CLICK
========================================= */

copyButton.addEventListener(
  "click",
  copyText
);