const button =
  document.getElementById(
    "downloadButton"
  );


let status = "idle";

let morphTimer = null;

let loadingTimer = null;



function setStatus(newStatus) {

  status = newStatus;


  // Remove previous states

  button.classList.remove(
    "morphing",
    "loading",
    "complete"
  );


  // Add new state

  if (
    newStatus === "morphing"
  ) {

    button.classList.add(
      "morphing"
    );

  }


  if (
    newStatus === "loading"
  ) {

    button.classList.add(
      "loading"
    );

  }


  if (
    newStatus === "complete"
  ) {

    button.classList.add(
      "complete"
    );

  }

}


// BUTTON CLICK

button.addEventListener(
  "click",
  function () {


   

    if (
      status === "idle"
    ) {

      setStatus(
        "morphing"
      );


      /*
        850ms

        Diamond movement
        + button shrinking
      */

      morphTimer =
        setTimeout(
          function () {

            setStatus(
              "loading"
            );


            /*
              Loading duration
              2300ms
            */

            loadingTimer =
              setTimeout(
                function () {

                  setStatus(
                    "complete"
                  );

                },
                2300
              );

          },
          850
        );

    }


    // COMPLETE → IDLE

    else if (
      status === "complete"
    ) {

      clearTimeout(
        morphTimer
      );


      clearTimeout(
        loadingTimer
      );


      setStatus(
        "idle"
      );

    }

  }
);