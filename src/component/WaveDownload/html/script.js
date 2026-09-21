const downloadBtn =
  document.getElementById("downloadBtn");

const buttonBackground =
  document.getElementById("buttonBackground");

const downloadIcon =
  document.getElementById("downloadIcon");

const morphLine =
  document.getElementById("morphLine");

const waveLoader =
  document.getElementById("waveLoader");

const successIcon =
  document.getElementById("successIcon");

const failIcon =
  document.getElementById("failIcon");

const loadingText =
  document.getElementById("loadingText");

const successText =
  document.getElementById("successText");

const failText =
  document.getElementById("failText");


let status = "idle";

let morphTimer;
let resultTimer;
let resetTimer;




function hideAll() {

  downloadIcon.classList.remove(
    "active",
    "leaving"
  );

  morphLine.classList.remove(
    "active"
  );

  waveLoader.classList.remove(
    "active"
  );

  successIcon.classList.remove(
    "active"
  );

  failIcon.classList.remove(
    "active"
  );


  loadingText.classList.remove(
    "active"
  );

  successText.classList.remove(
    "active"
  );

  failText.classList.remove(
    "active"
  );


  buttonBackground.classList.remove(
    "fail"
  );

  downloadBtn.classList.remove(
    "fail-animation"
  );

}




function setIdle() {

  status = "idle";

  hideAll();


  downloadIcon.classList.add(
    "active"
  );

}

//  START DOWNLOAD

function startDownload() {

  if (status !== "idle") {
    return;
  }


  status = "morphing";


//  DOWNLOAD ICON EXIT

  downloadIcon.classList.add(
    "leaving"
  );


 

  morphTimer = setTimeout(() => {

    morphLine.classList.add(
      "active"
    );

  }, 0);




  setTimeout(() => {

    status = "loading";


    morphLine.classList.remove(
      "active"
    );


    waveLoader.classList.add(
      "active"
    );


    loadingText.classList.add(
      "active"
    );

  }, 700);




  resultTimer = setTimeout(() => {

    
    const success =
      Math.random() > 0.35;


    if (success) {

      showSuccess();

    } else {

      showFail();

    }

  }, 3200);

}

// SUCCESS

function showSuccess() {

  status = "success";


  /*
    Remove loading
  */

  waveLoader.classList.remove(
    "active"
  );

  loadingText.classList.remove(
    "active"
  );


  

  downloadIcon.classList.remove(
    "active",
    "leaving"
  );


  // Show check

  successIcon.classList.add(
    "active"
  );

  successText.classList.add(
    "active"
  );

}


// FAIL

function showFail() {

  status = "fail";


  // Remove loading

  waveLoader.classList.remove(
    "active"
  );

  loadingText.classList.remove(
    "active"
  );


  // Download icon stays hidden

  downloadIcon.classList.remove(
    "active",
    "leaving"
  );


  // Fail button animation

  downloadBtn.classList.remove(
    "fail-animation"
  );


 

  void downloadBtn.offsetWidth;


  downloadBtn.classList.add(
    "fail-animation"
  );


  buttonBackground.classList.add(
    "fail"
  );


  

  failIcon.classList.add(
    "active"
  );

  failText.classList.add(
    "active"
  );


 

  resetTimer = setTimeout(() => {

    setIdle();

  }, 1200);

}


// BUTTON CLICK

downloadBtn.addEventListener(
  "click",
  () => {

    

    if (status === "idle") {

      startDownload();

      return;
    }


  //  Success 

    if (status === "success") {

      setIdle();

      return;
    }

  }
);




setIdle();