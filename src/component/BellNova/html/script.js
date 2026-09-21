const bellButton = document.getElementById("bellButton");
const notificationPanel = document.getElementById("notificationPanel");
const closeButton = document.getElementById("closeButton");
const markRead = document.getElementById("markRead");

const countElement = document.getElementById("notificationCount");
const statusElement = document.getElementById("notificationStatus");

const notificationItems = document.querySelectorAll(
  ".notification-item"
);

let unreadCount = 3;
let isOpen = false;


//    BELL CLICK


bellButton.addEventListener("click", (event) => {

  event.stopPropagation();

  /* Ring animation */

  bellButton.classList.remove("ringing");

  void bellButton.offsetWidth;

  bellButton.classList.add("ringing");


   //Open / close panel 

  isOpen = !isOpen;

  if (isOpen) {
    notificationPanel.classList.add("open");
  } else {
    notificationPanel.classList.remove("open");
  }

});


//  CLOSE BUTTON

closeButton.addEventListener("click", () => {

  notificationPanel.classList.remove("open");

  isOpen = false;

});


//   CLICK NOTIFICATION


notificationItems.forEach((item) => {

  item.addEventListener("click", () => {

    if (!item.classList.contains("unread")) {
      return;
    }

    item.classList.remove("unread");
    item.classList.add("read");

    unreadCount--;

    updateCounter();

  });

});


// MARK ALL AS READ

markRead.addEventListener("click", () => {

  notificationItems.forEach((item) => {

    item.classList.remove("unread");
    item.classList.add("read");

  });

  unreadCount = 0;

  updateCounter();

});


// UPDATE COUNTER

function updateCounter() {

  countElement.textContent = unreadCount;

  if (unreadCount === 0) {

    countElement.style.transform = "scale(0)";

    countElement.style.opacity = "0";

    statusElement.textContent =
      "You're all caught up";

  } else {

    countElement.style.transform = "scale(1)";

    countElement.style.opacity = "1";

    statusElement.textContent =
      `${unreadCount} unread notification${
        unreadCount > 1 ? "s" : ""
      }`;

  }

}


// OUTSIDE CLICK

document.addEventListener("click", (event) => {

  if (
    isOpen &&
    !notificationPanel.contains(event.target) &&
    !bellButton.contains(event.target)
  ) {

    notificationPanel.classList.remove("open");

    isOpen = false;

  }

});


// REMOVE RING CLASS

bellButton.addEventListener("animationend", () => {

  bellButton.classList.remove("ringing");

});