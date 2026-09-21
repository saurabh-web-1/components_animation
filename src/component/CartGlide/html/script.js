/* =========================================
   PRODUCT DATA
========================================= */

const products = {
  1: {
    id: 1,
    name: "Shoe 1",
    category: "SHOES",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85"
  },

  2: {
    id: 2,
    name: "Shoe 2",
    category: "SHOES",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=85"
  },

  3: {
    id: 3,
    name: "Shoe 3",
    category: "SHOES",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=85"
  },

  4: {
    id: 4,
    name: "Shoe 4",
    category: "SHOES",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&q=85"
  }
};


/* =========================================
   CART STATE
========================================= */

let cart = {};

let isFlying = false;


/* =========================================
   ELEMENTS
========================================= */

const flyingProduct =
  document.getElementById("flyingProduct");

const flyingImage =
  document.getElementById("flyingImage");

const cartBar =
  document.getElementById("cartBar");

const cartThumbnails =
  document.getElementById("cartThumbnails");

const emptyCartIcon =
  document.getElementById("emptyCartIcon");

const cartSummary =
  document.getElementById("cartSummary");

const viewCartButton =
  document.getElementById("viewCartButton");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const cartItems =
  document.getElementById("cartItems");

const drawerCount =
  document.getElementById("drawerCount");

const subtotal =
  document.getElementById("subtotal");

const subtotalLabel =
  document.getElementById("subtotalLabel");

const addMore =
  document.getElementById("addMore");


/* =========================================
   ADD BUTTONS
========================================= */

document
  .querySelectorAll(".add-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const id =
          button.dataset.product;

        addProduct(
          products[id],
          button
        );

      }
    );

  });


/* =========================================
   ADD PRODUCT
========================================= */

function addProduct(product, button) {

  if (isFlying) return;

  isFlying = true;


  /* ======================================
     GET PRODUCT IMAGE POSITION
  ====================================== */

  const card =
    document.querySelector(
      `.product-card[data-id="${product.id}"]`
    );

  const image =
    card.querySelector(
      ".product-image img"
    );


  const imageRect =
    image.getBoundingClientRect();


  /* ======================================
     GET CART POSITION
  ====================================== */

  const cartRect =
    cartBar.getBoundingClientRect();


  /* ======================================
     START POSITION
  ====================================== */

  const startX =
    imageRect.left +
    imageRect.width / 2 -
    32;

  const startY =
    imageRect.top +
    imageRect.height / 2 -
    32;


  /* ======================================
     END POSITION
  ====================================== */

  const endX =
    cartRect.left +
    24;

  const endY =
    cartRect.top +
    5;


  /* ======================================
     SHOW FLYING IMAGE
  ====================================== */

  flyingImage.src =
    product.image;

  flyingProduct.style.display =
    "block";

  flyingProduct.style.left =
    `${startX}px`;

  flyingProduct.style.top =
    `${startY}px`;

  flyingProduct.style.transform =
    "translate(0,0) scale(1) rotate(0deg)";

  flyingProduct.style.opacity =
    "1";


  /*
     Route:

     START
       ↓
      UP
       ↓
     RIGHT + UP
       ↓
      RIGHT
       ↓
      DOWN
       ↓
      CART
  */

  const point1X =
    startX;

  const point1Y =
    startY - 105;


  const point2X =
    startX + 135;

  const point2Y =
    startY - 150;


  const point3X =
    endX + 45;

  const point3Y =
    endY - 65;


  /* ======================================
     ANIMATION
  ====================================== */

  const animation =
    flyingProduct.animate(

      [
        {
          left: `${startX}px`,
          top: `${startY}px`,

          transform:
            "scale(1) rotate(0deg)",

          opacity: 1
        },

        {
          left: `${point1X}px`,
          top: `${point1Y}px`,

          transform:
            "scale(1.05) rotate(-5deg)",

          opacity: 1
        },

        {
          left: `${point2X}px`,
          top: `${point2Y}px`,

          transform:
            "scale(.92) rotate(7deg)",

          opacity: 1
        },

        {
          left: `${point3X}px`,
          top: `${point3Y}px`,

          transform:
            "scale(.62) rotate(13deg)",

          opacity: 1
        },

        {
          left: `${endX}px`,
          top: `${endY}px`,

          transform:
            "scale(.2) rotate(20deg)",

          opacity: 0
        }
      ],

      {
        duration: 1150,

        easing:
          "cubic-bezier(.22,1,.36,1)",

        fill: "forwards"
      }

    );


  /* ======================================
     AFTER FLIGHT
  ====================================== */

  animation.onfinish = () => {

    flyingProduct.style.display =
      "none";


    /* Add to cart */

    if (cart[product.id]) {

      cart[product.id].quantity++;

    } else {

      cart[product.id] = {
        ...product,
        quantity: 1
      };

    }


    /* Button state */

    button.classList.add("added");

    button.innerHTML =
      "✓ Added";


    /* Card count */

    card.classList.add("has-items");

    card.querySelector(
      ".product-count"
    ).textContent =
      cart[product.id].quantity;


    /* Update cart */

    renderCartBar();

    renderCartItems();


    /* Pulse */

    cartBar.classList.remove("pulse");

    void cartBar.offsetWidth;

    cartBar.classList.add("pulse");


    isFlying = false;

  };

}


/* =========================================
   CART BAR
========================================= */

function renderCartBar() {

  const items =
    Object.values(cart);

  const totalItems =
    items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,

      0
    );


  /* Empty */

  if (items.length === 0) {

    cartThumbnails.innerHTML =
      `
        <div
          class="empty-cart-icon"
          id="emptyCartIcon"
        >

          <svg viewBox="0 0 24 24" fill="none">

            <path
              d="M3 4H5L7.5 16H19L21 8H6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <circle
              cx="9"
              cy="20"
              r="1.3"
              fill="currentColor"
            />

            <circle
              cx="17"
              cy="20"
              r="1.3"
              fill="currentColor"
            />

          </svg>

        </div>
      `;

  } else {

    /*
      Maximum 3 thumbnails
    */

    const visible =
      items.slice(0, 3);


    cartThumbnails.innerHTML =
      visible
        .map(item => {

          return `
            <div class="cart-thumb">

              <img
                src="${item.image}"
                alt="${item.name}"
              />

            </div>
          `;

        })
        .join("");


    /* Extra */

    if (items.length > 3) {

      cartThumbnails.innerHTML +=
        `
          <div class="extra-count">
            +${items.length - 3}
          </div>
        `;

    }

  }


  /* Summary */

  cartSummary.textContent =
    `${totalItems} ${
      totalItems === 1
        ? "item"
        : "items"
    } · $${total.toFixed(2)}`;


  drawerCount.textContent =
    totalItems;

}


/* =========================================
   RENDER CART ITEMS
========================================= */

function renderCartItems() {

  const items =
    Object.values(cart);


  if (items.length === 0) {

    cartItems.innerHTML =
      `
        <div class="empty-message">

          🛒

          <br><br>

          Your cart is empty

          <br>

          Add a product to continue.

        </div>
      `;

    updateSummary();

    return;

  }


  cartItems.innerHTML =
    items
      .map(item => {

        return `
          <div
            class="cart-item"
            data-id="${item.id}"
          >

            <div class="item-image">

              <img
                src="${item.image}"
                alt="${item.name}"
              />

            </div>


            <div class="item-info">

              <div class="item-category">
                ${item.category}
              </div>

              <h3>
                ${item.name}
              </h3>

              <div class="item-price">
                $${item.price.toFixed(2)}
              </div>

            </div>


            <div class="item-controls">

              <button
                class="remove-item"
                onclick="removeItem(${item.id})"
              >
                Remove
              </button>


              <div class="quantity">

                <button
                  onclick="changeQuantity(
                    ${item.id},
                    -1
                  )"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  onclick="changeQuantity(
                    ${item.id},
                    1
                  )"
                >
                  +
                </button>

              </div>

            </div>

          </div>
        `;

      })
      .join("");


  updateSummary();

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {

  if (!cart[id]) return;


  cart[id].quantity +=
    amount;


  if (cart[id].quantity <= 0) {

    delete cart[id];

    updateProductCard(id);

  }


  updateProductCard(id);

  renderCartBar();

  renderCartItems();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(id) {

  delete cart[id];


  updateProductCard(id);

  renderCartBar();

  renderCartItems();

}


/* =========================================
   UPDATE PRODUCT CARD
========================================= */

function updateProductCard(id) {

  const card =
    document.querySelector(
      `.product-card[data-id="${id}"]`
    );

  if (!card) return;


  const item =
    cart[id];


  const count =
    card.querySelector(
      ".product-count"
    );


  const button =
    card.querySelector(
      ".add-button"
    );


  if (item) {

    card.classList.add(
      "has-items"
    );

    count.textContent =
      item.quantity;

    button.classList.add(
      "added"
    );

    button.innerHTML =
      "✓ Added";

  } else {

    card.classList.remove(
      "has-items"
    );

    count.textContent =
      "";

    button.classList.remove(
      "added"
    );

    button.innerHTML =
      "+ Add";

  }

}


/* =========================================
   SUMMARY
========================================= */

function updateSummary() {

  const items =
    Object.values(cart);


  const totalItems =
    items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,

      0
    );


  subtotal.textContent =
    `$${total.toFixed(2)}`;


  subtotalLabel.textContent =
    `Subtotal (${totalItems} ${
      totalItems === 1
        ? "item"
        : "items"
    })`;

}


/* =========================================
   OPEN CART
========================================= */

viewCartButton.addEventListener(
  "click",
  () => {

    renderCartItems();

    cartOverlay.classList.add(
      "open"
    );

    document.body.style.overflow =
      "hidden";

  }
);


/* =========================================
   CLOSE CART
========================================= */

closeCart.addEventListener(
  "click",
  closeCartDrawer
);


cartOverlay.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      cartOverlay
    ) {
      closeCartDrawer();
    }

  }
);


function closeCartDrawer() {

  cartOverlay.classList.remove(
    "open"
  );

  document.body.style.overflow =
    "";

}


/* =========================================
   ADD MORE
========================================= */

addMore.addEventListener(
  "click",
  () => {

    closeCartDrawer();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================
   PLACEMENT OPTIONS
========================================= */

document
  .querySelectorAll(
    ".placement-option"
  )
  .forEach(option => {

    option.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".placement-option"
          )
          .forEach(item => {

            item.classList.remove(
              "active"
            );

          });


        option.classList.add(
          "active"
        );

      }
    );

  });


/* =========================================
   CHECKOUT
========================================= */

document
  .getElementById("checkoutButton")
  .addEventListener(
    "click",
    () => {

      if (
        Object.keys(cart).length === 0
      ) {

        alert(
          "Please add a product first."
        );

        return;

      }


      alert(
        "Checkout started!"
      );

    }
  );


/* =========================================
   INITIAL RENDER
========================================= */

renderCartBar();

renderCartItems();