import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Shoe 1",
    category: "SHOES",
    price: 3.99,
    rating: 4.5,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85",
  },
  {
    id: 2,
    name: "Shoe 2",
    category: "SHOES",
    price: 12.99,
    rating: 4.5,
    reviews: 59,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=85",
  },
  {
    id: 3,
    name: "Shoe 3",
    category: "SHOES",
    price: 29.99,
    rating: 4.3,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=85",
  },
  {
    id: 4,
    name: "Shoe 4",
    category: "SHOES",
    price: 49.99,
    rating: 4.6,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&q=85",
  },
];

const formatPrice = (price) => `$${price.toFixed(2)}`;

export default function CartGlide() {
  const productRefs = useRef({});
  const cartRef = useRef(null);

  const [cart, setCart] = useState([]);
  const [flying, setFlying] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [placement, setPlacement] = useState("home");
  const [note, setNote] = useState("");

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );

  /* ==========================================
     ADD PRODUCT
  ========================================== */

  const addToCart = (product) => {
    if (flying) return;

    const productElement = productRefs.current[product.id];
    const cartElement = cartRef.current;

    if (!productElement || !cartElement) return;

    const productRect =
      productElement.getBoundingClientRect();

    const cartRect =
      cartElement.getBoundingClientRect();

    const startX =
      productRect.left +
      productRect.width / 2 -
      32;

    const startY =
      productRect.top +
      productRect.height / 2 -
      32;

    const endX =
      cartRect.left + 22;

    const endY =
      cartRect.top + 4;

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

    setFlying({
      product,
      startX,
      startY,
      endX,
      endY,

      point1X: startX,
      point1Y: startY - 100,

      point2X: startX + 130,
      point2Y: startY - 145,

      point3X: endX + 35,
      point3Y: endY - 65,
    });

    setTimeout(() => {
      setCart((previous) => {
        const exists = previous.find(
          (item) => item.id === product.id
        );

        if (exists) {
          return previous.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...previous,
          {
            ...product,
            quantity: 1,
          },
        ];
      });

      setFlying(null);

      setCartPulse(true);

      setTimeout(() => {
        setCartPulse(false);
      }, 500);
    }, 1150);
  };

  /* ==========================================
     QUANTITY
  ========================================== */

  const changeQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: Math.max(
              0,
              item.quantity + amount
            ),
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  /* ==========================================
     REMOVE
  ========================================== */

  const removeItem = (id) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white px-5 pb-32 pt-8 text-neutral-900">

      <div className="mx-auto max-w-5xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-7">

          <h1 className="text-2xl font-bold tracking-tight">
            Popular Products
          </h1>

          <p className="mt-1 text-sm text-neutral-400">
            Discover our most loved products
          </p>

        </div>


        {/* =====================================
            PRODUCT GRID
        ===================================== */}

        <div className="grid max-w-[650px] grid-cols-2 gap-4 sm:gap-5">

          {PRODUCTS.map((product) => {

            const inCart = cart.find(
              (item) => item.id === product.id
            );

            return (
              <motion.div
                key={product.id}
                ref={(element) => {
                  productRefs.current[product.id] =
                    element;
                }}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="group rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >

                {/* PRODUCT IMAGE */}

                <div className="relative flex h-[175px] items-center justify-center overflow-hidden rounded-xl bg-neutral-50">

                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-4"
                    whileHover={{
                      scale: 1.06,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  {/* CART QUANTITY */}

                  <AnimatePresence>
                    {inCart && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="absolute right-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[9px] font-bold text-white shadow-lg"
                      >
                        {inCart.quantity}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>


                {/* CATEGORY */}

                <div className="mt-3 text-[9px] font-bold tracking-widest text-neutral-400">
                  {product.category}
                </div>


                {/* NAME */}

                <h3 className="mt-1 text-sm font-semibold">
                  {product.name}
                </h3>


                {/* RATING */}

                <div className="mt-1 flex items-center gap-1">

                  <span className="text-[11px] tracking-tight text-yellow-400">
                    ★★★★★
                  </span>

                  <span className="text-[10px] text-neutral-400">
                    {product.rating} ({product.reviews})
                  </span>

                </div>


                {/* PRICE + ADD */}

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-base font-bold">
                    {formatPrice(product.price)}
                  </span>


                  <motion.button
                    disabled={!!flying}
                    onClick={() => addToCart(product)}
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    className={`relative flex h-9 min-w-[68px] items-center justify-center overflow-hidden rounded-xl px-3 text-[11px] font-semibold transition ${
                      inCart
                        ? "bg-emerald-500 text-white"
                        : "border border-emerald-200 bg-emerald-50 text-emerald-600"
                    }`}
                  >

                    <AnimatePresence mode="wait">

                      {inCart ? (
                        <motion.span
                          key="added"
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                        >
                          ✓ Added
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                        >
                          + Add
                        </motion.span>
                      )}

                    </AnimatePresence>

                  </motion.button>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>


      {/* =========================================
          FLYING PRODUCT
      ========================================= */}

      <AnimatePresence>

        {flying && (

          <motion.div
            className="pointer-events-none fixed z-[200] h-16 w-16"
            initial={{
              left: flying.startX,
              top: flying.startY,
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              left: [
                flying.startX,
                flying.point1X,
                flying.point2X,
                flying.point3X,
                flying.endX,
              ],

              top: [
                flying.startY,
                flying.point1Y,
                flying.point2Y,
                flying.point3Y,
                flying.endY,
              ],

              scale: [
                1,
                1.08,
                0.95,
                0.65,
                0.2,
              ],

              rotate: [
                0,
                -5,
                7,
                12,
                18,
              ],

              opacity: [
                1,
                1,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration: 1.15,

              times: [
                0,
                0.2,
                0.45,
                0.72,
                1,
              ],

              ease: [
                "easeOut",
                "easeInOut",
                "easeInOut",
                "easeIn",
              ],
            }}
          >

            <img
              src={flying.product.image}
              alt=""
              className="h-full w-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.25)]"
            />

          </motion.div>

        )}

      </AnimatePresence>


      {/* =========================================
          CART BAR
      ========================================= */}

      <motion.div
        ref={cartRef}
        animate={
          cartPulse
            ? {
                scale: [1, 1.08, 0.97, 1],
              }
            : {
                scale: 1,
              }
        }
        transition={{
          duration: 0.45,
        }}
        className="fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[390px] -translate-x-1/2 items-center rounded-full bg-emerald-500 p-2 pl-2 shadow-[0_15px_40px_rgba(16,185,129,0.28)]"
      >

        {/* PRODUCT THUMBNAILS */}

        <div className="flex shrink-0 items-center">

          {cart.slice(0, 3).map((item, index) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.3,
                x: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: index * -5,
              }}
              className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-500 bg-white ${
                index > 0 ? "-ml-1" : ""
              }`}
            >

              <img
                src={item.image}
                alt=""
                className="h-full w-full object-contain"
              />

            </motion.div>

          ))}


          {/* EMPTY CART ICON */}

          {cart.length === 0 && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-white"
              >
                <path
                  d="M3 4H5L7.5 16H19L21 8H6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
          )}


          {/* EXTRA COUNT */}

          {cart.length > 3 && (
            <div className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-100 text-[10px] font-bold text-emerald-700">
              +{cart.length - 3}
            </div>
          )}

        </div>


        {/* VIEW CART */}

        <button
          onClick={() => setCartOpen(true)}
          className="ml-2 flex flex-1 items-center justify-between px-2 text-left"
        >

          <div>

            <div className="text-[12px] font-bold text-white">
              View cart
            </div>

            <AnimatePresence mode="wait">

              <motion.div
                key={totalItems}
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-0.5 text-[9px] text-white/70"
              >
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
                {totalItems > 0 && (
                  <>
                    {" "}
                    · {formatPrice(subtotal)}
                  </>
                )}
              </motion.div>

            </AnimatePresence>

          </div>


          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-lg text-white">
            ›
          </span>

        </button>

      </motion.div>


      {/* =========================================
          CART OVERLAY
      ========================================= */}

      <AnimatePresence>

        {cartOpen && (

          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/35 backdrop-blur-[3px] sm:items-center"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setCartOpen(false)}
          >

            {/* ===================================
                CART DRAWER
            =================================== */}

            <motion.div
              onClick={(event) =>
                event.stopPropagation()
              }
              initial={{
                y: 80,
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                y: 80,
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              className="max-h-[92vh] w-full max-w-[480px] overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-2xl sm:rounded-[28px]"
            >

              {/* TOP HANDLE */}

              <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-neutral-200 sm:hidden" />


              {/* HEADER */}

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="M3 4H5L7.5 16H19L21 8H6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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


                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="text-lg font-bold">
                        Your Cart
                      </h2>

                      <motion.span
                        key={totalItems}
                        initial={{
                          scale: 0.5,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[10px] font-bold text-white"
                      >
                        {totalItems}
                      </motion.span>

                    </div>

                    <p className="mt-0.5 text-xs text-neutral-400">
                      Review your items and proceed
                    </p>

                  </div>

                </div>


                <button
                  onClick={() => setCartOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-lg text-neutral-500 transition hover:bg-neutral-200"
                >
                  ×
                </button>

              </div>


              {/* =================================
                  CART ITEMS
              ================================= */}

              <div className="mt-6 space-y-3">

                <AnimatePresence mode="popLayout">

                  {cart.map((item) => (

                    <motion.div
                      layout
                      key={item.id}
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -40,
                        height: 0,
                        marginBottom: 0,
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-3"
                    >

                      {/* IMAGE */}

                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-1"
                        />

                      </div>


                      {/* INFO */}

                      <div className="min-w-0 flex-1">

                        <div className="text-[9px] font-bold tracking-widest text-neutral-400">
                          {item.category}
                        </div>

                        <h3 className="mt-0.5 truncate text-sm font-semibold">
                          {item.name}
                        </h3>

                        <div className="mt-1 text-sm font-bold">
                          {formatPrice(item.price)}
                        </div>

                      </div>


                      {/* CONTROLS */}

                      <div className="flex flex-col items-end gap-2">

                        <button
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="text-xs text-neutral-400 transition hover:text-red-500"
                        >
                          Remove
                        </button>


                        <div className="flex h-8 items-center rounded-lg border border-neutral-200 bg-white">

                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                -1
                              )
                            }
                            className="flex h-full w-7 items-center justify-center text-neutral-500 hover:text-black"
                          >
                            −
                          </button>

                          <span className="w-6 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                1
                              )
                            }
                            className="flex h-full w-7 items-center justify-center text-neutral-500 hover:text-black"
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </motion.div>

                  ))}

                </AnimatePresence>


                {/* EMPTY */}

                {cart.length === 0 && (

                  <div className="rounded-2xl border border-dashed border-neutral-200 py-10 text-center">

                    <div className="text-3xl">
                      🛒
                    </div>

                    <p className="mt-2 text-sm font-semibold">
                      Your cart is empty
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      Add a product to continue
                    </p>

                  </div>

                )}

              </div>


              {/* =================================
                  ADD MORE
              ================================= */}

              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 w-full rounded-xl border border-emerald-200 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
              >
                + Add more items
              </button>


              {/* =================================
                  PLACEMENT OPTIONS
              ================================= */}

              <div className="mt-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    📍
                  </div>

                  <div>

                    <h3 className="text-sm font-bold">
                      Placement / Delivery Options
                    </h3>

                    <p className="mt-0.5 text-[10px] text-neutral-400">
                      Choose how you want to receive your order
                    </p>

                  </div>

                </div>


                {/* OPTIONS */}

                <div className="mt-4 grid grid-cols-3 gap-2">

                  {/* HOME */}

                  <PlacementOption
                    active={placement === "home"}
                    onClick={() =>
                      setPlacement("home")
                    }
                    icon="⌂"
                    title="Home"
                    subtitle="3–5 days"
                  />


                  {/* STORE */}

                  <PlacementOption
                    active={placement === "store"}
                    onClick={() =>
                      setPlacement("store")
                    }
                    icon="▣"
                    title="Store"
                    subtitle="Tomorrow"
                  />


                  {/* SCHEDULE */}

                  <PlacementOption
                    active={placement === "schedule"}
                    onClick={() =>
                      setPlacement("schedule")
                    }
                    icon="◷"
                    title="Schedule"
                    subtitle="Pick a slot"
                  />

                </div>

              </div>


              {/* =================================
                  NOTE
              ================================= */}

              <div className="mt-5">

                <label className="text-xs font-semibold text-neutral-700">
                  Add a note{" "}
                  <span className="font-normal text-neutral-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  value={note}
                  onChange={(e) =>
                    setNote(e.target.value)
                  }
                  placeholder="E.g. Gate no, landmark, special instructions..."
                  rows={2}
                  className="mt-2 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs outline-none transition focus:border-emerald-400 focus:bg-white"
                />

              </div>


              {/* =================================
                  SUMMARY
              ================================= */}

              <div className="mt-6 border-t border-neutral-100 pt-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-neutral-500">
                    Subtotal ({totalItems} items)
                  </span>

                  <motion.span
                    key={subtotal}
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="text-lg font-bold"
                  >
                    {formatPrice(subtotal)}
                  </motion.span>

                </div>


                {/* CHECKOUT */}

                <button
                  disabled={cart.length === 0}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white shadow-[0_10px_25px_rgba(16,185,129,0.2)] transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Proceed to Checkout
                  <span className="ml-2 text-lg">
                    ›
                  </span>
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}


/* ============================================
   PLACEMENT OPTION
============================================ */

function PlacementOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}) {
  return (
    <motion.button
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className={`relative rounded-xl border p-3 text-center transition ${
        active
          ? "border-emerald-500 bg-emerald-50"
          : "border-neutral-200 bg-white hover:border-emerald-200"
      }`}
    >

      <div
        className={`text-lg ${
          active
            ? "text-emerald-500"
            : "text-neutral-500"
        }`}
      >
        {icon}
      </div>

      <div className="mt-1 text-[11px] font-bold">
        {title}
      </div>

      <div className="mt-1 text-[9px] text-neutral-400">
        {subtitle}
      </div>


      {active && (
        <motion.div
          layoutId="placement-check"
          className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white"
        >
          ✓
        </motion.div>
      )}

    </motion.button>
  );
}