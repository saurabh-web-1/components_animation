const copyWave = document.getElementById("copyWave");

const copyIcon = document.getElementById("copyIcon");
const checkIcon = document.getElementById("checkIcon");

const copyText = document.getElementById("copyText");

const waveOne = document.getElementById("waveOne");
const waveTwo = document.getElementById("waveTwo");
const waveThree = document.getElementById("waveThree");


// TEXT TO COPY


const textToCopy = "const message = 'Hello World';";


// COPY FUNCTION


async function copyCode() {

  try {

    // =================================
    // MODERN CLIPBOARD API
    // =================================

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        textToCopy
      );

    } else {

      // =================================
      // FALLBACK COPY
      // =================================

      const textarea =
        document.createElement("textarea");

      textarea.value = textToCopy;

      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);
    }


    // =================================
    // SUCCESS STATE
    // =================================

    copyWave.classList.add("copied");

    copyIcon.classList.add("hidden");

    checkIcon.classList.remove("hidden");

    copyText.textContent = "Copied!";

    copyWave.setAttribute(
      "aria-label",
      "Copied"
    );


    // =================================
    // RESTART CHECK ANIMATION
    // =================================

    checkIcon.classList.remove(
      "animate-checkIn"
    );

    void checkIcon.offsetWidth;

    checkIcon.classList.add(
      "animate-checkIn"
    );


    // =================================
    // RESTART WAVE ANIMATIONS
    // =================================

    waveOne.style.animation = "none";
    waveTwo.style.animation = "none";
    waveThree.style.animation = "none";

    void waveOne.offsetWidth;

    waveOne.style.animation =
      "waveOne 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards";

    waveTwo.style.animation =
      "waveTwo 0.9s 0.15s cubic-bezier(0.22, 1, 0.36, 1) forwards";

    waveThree.style.animation =
      "waveThree 0.9s 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards";


    // =================================
    // RESET AFTER 1600ms
    // =================================

    setTimeout(() => {

      copyWave.classList.remove("copied");

      copyIcon.classList.remove("hidden");

      checkIcon.classList.add("hidden");

      copyText.textContent = "Copy Code";

      copyWave.setAttribute(
        "aria-label",
        "Copy code"
      );

      // Reset waves
      waveOne.style.animation = "none";
      waveTwo.style.animation = "none";
      waveThree.style.animation = "none";

    }, 1600);


  } catch (error) {

    console.error(
      "Copy failed:",
      error
    );

  }

}


// CLICK EVENT

copyWave.addEventListener(
  "click",
  copyCode
);