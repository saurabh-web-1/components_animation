const likeButton =
  document.getElementById("likeButton");

const likeCount =
  document.getElementById("likeCount");


let liked = false;

let count = 124;


/* =========================================
   CLICK
========================================= */

likeButton.addEventListener(
  "click",
  () => {

    liked = !liked;


    if (liked) {

      count++;

      likeButton.classList.remove(
        "unliked"
      );

      /*
       * Force animation restart
       */

      likeButton.classList.remove(
        "liked"
      );

      void likeButton.offsetWidth;

      likeButton.classList.add(
        "liked"
      );


      animateCount(
        count - 1,
        count
      );

    } else {

      count--;

      likeButton.classList.remove(
        "liked"
      );

      likeButton.classList.add(
        "unliked"
      );


      animateCount(
        count + 1,
        count
      );

    }

  }
);


/* =========================================
   COUNT ANIMATION
========================================= */

function animateCount(
  from,
  to
) {

  const duration = 350;

  const start =
    performance.now();


  function update(
    currentTime
  ) {

    const progress =
      Math.min(
        (currentTime - start) /
          duration,
        1
      );


    /*
     * Smooth easing
     */

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      Math.round(
        from +
        (to - from) *
        eased
      );


    likeCount.textContent =
      value;


    /*
     * Continue animation
     */

    if (progress < 1) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}