const copyPulse = document.getElementById("copyPulse");

const copyIcon = document.getElementById("copyIcon");
const checkIcon = document.getElementById("checkIcon");
const copyText = document.getElementById("copyText");


// Text to copy
const textToCopy = "const message = 'Hello World';";


// Copy Function

async function copyCode() {

  try {

    /*
      Modern Clipboard API
    */

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        textToCopy
      );

    } else {

      /*
        Fallback for HTTP / older browsers
      */

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


    // Success State

    copyPulse.classList.add("copied");

    copyIcon.classList.add("hidden");

    checkIcon.classList.remove("hidden");

    // Restart animation
    checkIcon.classList.remove(
      "animate-copyCheck"
    );

    void checkIcon.offsetWidth;

    checkIcon.classList.add(
      "animate-copyCheck"
    );

    copyText.textContent = "Copied!";


    // Reset after 1600ms

    setTimeout(() => {

      copyPulse.classList.remove("copied");

      checkIcon.classList.add("hidden");

      copyIcon.classList.remove("hidden");

      copyText.textContent = "Copy Code";

    }, 1600);


  } catch (error) {

    console.error(
      "Copy failed:",
      error
    );

  }

}


// Click Event

copyPulse.addEventListener(
  "click",
  copyCode
);