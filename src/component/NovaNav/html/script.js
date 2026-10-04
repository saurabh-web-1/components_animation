/* NOVA NAV */

const navItems =
  document.querySelectorAll(".nav-item");


/* ACTIVE NAVIGATION */

navItems.forEach((item) => {

  item.addEventListener("click", () => {

    /* Remove active from all */
    navItems.forEach((navItem) => {
      navItem.classList.remove("active");
    });


    /* Add active to clicked item */
    item.classList.add("active");


    /* NAV WAVE */

    const nav =
      document.querySelector(".nova-nav");

    const wave =
      document.createElement("span");

    wave.className = "nav-wave";


    /* Position wave above clicked item */

    const itemRect =
      item.getBoundingClientRect();

    const navRect =
      nav.getBoundingClientRect();


    const centerX =
      itemRect.left -
      navRect.left +
      itemRect.width / 2;


    wave.style.left =
      `${centerX}px`;


    nav.appendChild(wave);


    /* Remove after animation */

    setTimeout(() => {

      wave.remove();

    }, 550);

  });

});