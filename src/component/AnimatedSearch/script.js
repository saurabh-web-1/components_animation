// ==============================
// ELEMENTS
// ==============================

const searchForm =
  document.getElementById("searchForm");

const searchBox =
  document.getElementById("searchBox");

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const buttonText =
  document.getElementById("buttonText");

const spinner =
  document.getElementById("spinner");

const scanningLine =
  document.getElementById("scanningLine");

const iconWrapper =
  document.getElementById("iconWrapper");

const searchIcon =
  document.getElementById("searchIcon");

const successIcon =
  document.getElementById("successIcon");

const resultCard =
  document.getElementById("resultCard");

const resultQuery =
  document.getElementById("resultQuery");

const searchAgain =
  document.getElementById("searchAgain");


// ==============================
// STATE
// ==============================

let status = "idle";

let searchTimeout = null;


// ==============================
// SEARCH
// ==============================

searchForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    const query =
      searchInput.value.trim();

    // Don't search empty input
    if (!query) {
      return;
    }

    // Prevent double search
    if (status === "searching") {
      return;
    }


    // ==========================
    // START SEARCH
    // ==========================

    status = "searching";


    // Search box animation
    searchBox.classList.add(
      "searching"
    );


    // Icon animation
    iconWrapper.classList.add(
      "icon-searching"
    );


    // Disable input
    searchInput.disabled = true;


    // Disable button
    searchButton.disabled = true;


    // Show spinner
    spinner.classList.remove(
      "hidden"
    );


    // Change button text
    buttonText.textContent =
      "Searching";


    // Show scanning line
    scanningLine.classList.remove(
      "hidden"
    );


    // Hide previous result
    resultCard.classList.add(
      "hidden"
    );

    searchAgain.classList.add(
      "hidden"
    );


    // ==========================
    // SIMULATE API
    // ==========================

    searchTimeout =
      setTimeout(
        function () {

          completeSearch(query);

        },
        1400
      );

  }
);


// ==============================
// SEARCH COMPLETE
// ==============================

function completeSearch(query) {

  status = "success";


  // Clear timeout reference
  searchTimeout = null;


  // ==========================
  // STOP ALL LOADING
  // ==========================

  searchBox.classList.remove(
    "searching"
  );

  iconWrapper.classList.remove(
    "icon-searching"
  );


  scanningLine.classList.add(
    "hidden"
  );


  spinner.classList.add(
    "hidden"
  );


  // ==========================
  // ICON CHANGE
  // ==========================

  searchIcon.classList.add(
    "hidden"
  );

  successIcon.classList.remove(
    "hidden"
  );


  // Remove previous animation
  successIcon.classList.remove(
    "success-pop"
  );


  // Force browser reflow
  void successIcon.offsetWidth;


  // Start success animation
  successIcon.classList.add(
    "success-pop"
  );


  // ==========================
  // BUTTON
  // ==========================

  searchButton.disabled = false;

  buttonText.textContent =
    "Done ✓";


  // ==========================
  // RESULT
  // ==========================

  resultQuery.textContent =
    query;

  resultCard.classList.remove(
    "hidden"
  );

  searchAgain.classList.remove(
    "hidden"
  );

}


// ==============================
// SEARCH AGAIN
// ==============================

searchAgain.addEventListener(
  "click",
  function () {

    // Clear timeout if somehow running
    if (searchTimeout) {

      clearTimeout(
        searchTimeout
      );

      searchTimeout = null;

    }


    // Reset state
    status = "idle";


    // Reset input
    searchInput.value = "";


    searchInput.disabled =
      false;


    // Reset button
    searchButton.disabled =
      false;

    buttonText.textContent =
      "Search";


    // Reset icons
    successIcon.classList.add(
      "hidden"
    );

    searchIcon.classList.remove(
      "hidden"
    );


    successIcon.classList.remove(
      "success-pop"
    );


    // Hide result
    resultCard.classList.add(
      "hidden"
    );

    searchAgain.classList.add(
      "hidden"
    );


    // Focus input
    searchInput.focus();

  }
);


// ==============================
// CLEANUP
// ==============================

window.addEventListener(
  "beforeunload",
  function () {

    if (searchTimeout) {

      clearTimeout(
        searchTimeout
      );

    }

  }
);