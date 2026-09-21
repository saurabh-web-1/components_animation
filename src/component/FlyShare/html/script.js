const shareButton = document.getElementById("shareButton");

let isAnimating = false;

shareButton.addEventListener("click", async () => {

  if (isAnimating) return;

  isAnimating = true;


  /* ============================
     OPTIONAL URL COPY
  ============================ */

  try {
    await navigator.clipboard.writeText(
      window.location.href
    );
  } catch (error) {
    console.log("Clipboard unavailable");
  }


  /* ============================
     START ANIMATION
  ============================ */

  shareButton.classList.remove("shared");

  // Force browser reflow so animation can restart
  void shareButton.offsetWidth;

  shareButton.classList.add("sending");


  /* ============================
     PLANE FLIGHT COMPLETE
  ============================ */

  setTimeout(() => {

    shareButton.classList.remove("sending");

    shareButton.classList.add("shared");

  }, 1200);


  /* ============================
     RESET
  ============================ */

  setTimeout(() => {

    shareButton.classList.remove("shared");

    isAnimating = false;

  }, 3000);

});