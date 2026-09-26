const copyButton =
  document.getElementById("copyButton");

const buttonText =
  document.getElementById("buttonText");

const sourceText =
  document.getElementById("sourceText");


let copied = false;

let resetTimer;


// COPY FUNCTION

async function copyText() {

  const text = sourceText.value;


  try {

    // MODERN CLIPBOARD

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(text);

    }

    // FALLBACK

    else {

      const textarea =
        document.createElement("textarea");


      textarea.value = text;


      textarea.style.position = "fixed";

      textarea.style.left = "-9999px";

      textarea.style.top = "-9999px";

      textarea.style.opacity = "0";


      document.body.appendChild(
        textarea
      );


      textarea.focus();

      textarea.select();


      document.execCommand("copy");


      document.body.removeChild(
        textarea
      );

    }


    // SUCCESS

    showCopied();


  } catch (error) {

    console.error(
      "Copy failed:",
      error
    );

  }

}


// SHOW COPIED

function showCopied() {

  copied = true;


  clearTimeout(resetTimer);


  /*
    Change text
  */

  buttonText.textContent =
    "Copied!";


  /*
    Add success state
  */

  copyButton.classList.add(
    "copied"
  );


  /*
    Text animation
  */

  copyButton.classList.remove(
    "text-flip"
  );


  /*
    Force reflow
  */

  void copyButton.offsetWidth;


  copyButton.classList.add(
    "text-flip"
  );


  /*
    Flash animation
  */

  copyButton.classList.remove(
    "flash"
  );


  void copyButton.offsetWidth;


  copyButton.classList.add(
    "flash"
  );


  /*
    Reset after 1.6 sec
  */

  resetTimer = setTimeout(
    resetButton,
    1600
  );

}


// RESET

function resetButton() {

  copied = false;


  /*
    Remove states
  */

  copyButton.classList.remove(
    "copied"
  );

  copyButton.classList.remove(
    "text-flip"
  );

  copyButton.classList.remove(
    "flash"
  );


  /*
    Restore text
  */

  buttonText.textContent =
    "Copy Code";

}


/*CLICK */

copyButton.addEventListener(
  "click",
  copyText
);