import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import limeImage from "./lime-image.png";
import originalImage from "./original-image.png";
const defaultVariants = [
  {
    id: "original",
    name: "Original Taste",
    shortName: "Cola",
    accent: "#ef233c",
    accentSoft: "rgba(239,35,60,0.30)",
    image: originalImage,
    price: 2.4,
    description: "Classic cola flavor with a crisp and refreshing finish.",
    meta: "330 ML · 35G SUGAR · 32 MG CAFFEINE",
  },
  {
    id: "lime",
    name: "Lime Twist",
    shortName: "Lime",
    accent: "#22c55e",
    accentSoft: "rgba(34,197,94,0.28)",
    image: limeImage,
    price: 2.6,
    description: "Fresh lime notes with a bright sparkling finish.",
    meta: "330 ML · 31G SUGAR · 30 MG CAFFEINE",
  },
];
const easing = [0.22, 1, 0.36, 1];
export default function ProductMorph({
  brand = "AXIS",
  title = "Cola",
  compactText = "TAP TO OPEN",
  buttonText = "Add to cart",
  variants = defaultVariants,
  initialVariant = 0,
  initialQuantity = 1,
  autoOpen = false,
  particles = true,
  showQuantity = true,
  openDuration = 1.05,
  closeDuration = 1.1,
  animation = {},
  autoOpenDelay = 1800,
  onAddToCart,
  onClose,
  onVariantChange,
}) {
  const safeVariants = variants?.length ? variants : defaultVariants;
  const timers = useRef([]);

  // Every animation duration can be customized through the `animation` prop.
  const motionTime = {
    open: animation.open ?? openDuration,
    close: animation.close ?? closeDuration,
    float: animation.float ?? 3,
    glow: animation.glow ?? 3.5,
    ambientOpacity: animation.ambientOpacity ?? 0.6,
    particle: animation.particle ?? 3,
    detail: animation.detail ?? 0.7,
    cartControls: animation.cartControls ?? 0.45,
    lightSweep: animation.lightSweep ?? 4,
    compactLine: animation.compactLine ?? 2,
    productShift: animation.productShift ?? 0.7,
    cartButton: animation.cartButton ?? 0.3,
    adding: animation.adding ?? 1,
    addedCloseDelay: animation.addedCloseDelay ?? 1300,
    cartFeedback: animation.cartFeedback ?? 1000,
  };
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    Math.min(Math.max(0, initialVariant), safeVariants.length - 1)
  );
  const [quantity, setQuantity] = useState(Math.max(1, initialQuantity));
  const [cartState, setCartState] = useState("idle");
  const [detailsVisible, setDetailsVisible] = useState(false);
  const variant = safeVariants[selectedVariant] || defaultVariants[0];
  const isExpanded = open || closing;
  const total = useMemo(
    () => (Number(variant.price) * quantity).toFixed(2),
    [variant.price, quantity]
  );
  const schedule = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
    return timer;
  };
  useEffect(() => {
    if (!autoOpen) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      setDetailsVisible(true);
    }, autoOpenDelay);
    return () => window.clearTimeout(timer);
  }, [autoOpen, autoOpenDelay]);
  useEffect(() => {
    return () => timers.current.forEach(window.clearTimeout);
  }, []);
  // Open the detail card.
  const openCard = () => {
    if (open || closing || cartState !== "idle") return;
    setOpen(true);
    setClosing(false);
    setDetailsVisible(false);
    schedule(() => setDetailsVisible(true), motionTime.open * 500);
  };
  // Smoothly close the card.
  const closeCard = () => {
    if (!open || closing || cartState !== "idle") return;
    setClosing(true);
    setDetailsVisible(false);
    schedule(() => {
      setOpen(false);
      setClosing(false);
      setDetailsVisible(false);
      onClose?.();
    }, motionTime.close * 1000);
  };
  // Clicking the product toggles open/close.
  const handleProductClick = () => {
    if (closing || cartState !== "idle") return;
    if (open) closeCard();
    else openCard();
  };
  const handleProductKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleProductClick();
    }
  };
  const changeVariant = (index) => {
    if (cartState !== "idle" || closing || index === selectedVariant) return;
    setSelectedVariant(index);
    onVariantChange?.(safeVariants[index]);
  };
  const addToCart = async () => {
    if (cartState !== "idle" || closing) return;
    setCartState("adding");
    try {
      if (onAddToCart) {
        await onAddToCart({
          brand,
          title,
          variant: variant.name,
          variantId: variant.id,
          quantity,
          unitPrice: Number(variant.price),
          total: Number(total),
        });
      }
      await new Promise((resolve) => window.setTimeout(resolve, motionTime.cartFeedback));
      setCartState("added");
      schedule(() => {
        setClosing(true);
        setDetailsVisible(false);
      }, motionTime.addedCloseDelay);
      schedule(() => {
        setOpen(false);
        setClosing(false);
        setDetailsVisible(false);
        setCartState("idle");
        onClose?.();
      }, motionTime.addedCloseDelay + motionTime.close * 1000);
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartState("idle");
    }
  };
  return (
    <div className="relative flex min-h-[540px] w-full items-center justify-center overflow-visible bg-black px-4 py-8">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute h-[330px] w-[330px] rounded-full blur-[115px]"
        animate={{
          scale: isExpanded ? 1.12 : 0.78,
          opacity: isExpanded ? 0.24 : 0.12,
          backgroundColor: variant.accent,
        }}
        transition={{
          scale: { duration: motionTime.open, ease: easing },
          opacity: { duration: motionTime.ambientOpacity, ease: easing },
          backgroundColor: { duration: 0 },
        }}
      />
      {/* Resizing outer card; no initial entrance animation */}
      <motion.div
        initial={false}
        className="relative shrink-0 max-w-[calc(100vw-32px)] overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0b0b0d]"
        animate={{
          width: isExpanded ? "min(780px, calc(100vw - 32px))" : 280,
          height: isExpanded ? 430 : 400,
        }}
        transition={{
          width: {
            duration: closing ? motionTime.close : motionTime.open,
            ease: easing,
          },
          height: {
            duration: closing ? motionTime.close : motionTime.open,
            ease: easing,
          },
        }}
        style={{
          boxShadow: `0 35px 110px rgba(0,0,0,.72), 0 0 65px ${variant.accentSoft}`,
        }}
      >
        {/* Background color updates instantly with the selected variant */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${isExpanded ? "77% 52%" : "50% 45%"}, ${variant.accentSoft}, transparent ${isExpanded ? "34%" : "42%"}), radial-gradient(circle at 17% 75%, rgba(255,255,255,.025), transparent 42%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Particles */}
        {particles && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 14 }, (_, i) => (
              <motion.span
                key={i}
                className="absolute h-[2px] w-[2px] rounded-full bg-white/25"
                style={{
                  left: `${7 + ((i * 19) % 86)}%`,
                  top: `${14 + ((i * 23) % 70)}%`,
                }}
                animate={{
                  opacity: isExpanded ? [0, 0.38, 0] : 0,
                  y: isExpanded ? [0, -16, 0] : 0,
                  x: isExpanded ? [0, i % 2 ? 8 : -8, 0] : 0,
                }}
                transition={{
                  duration: motionTime.particle + (i % 3) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
        {/* Compact CTA */}
        {!isExpanded && (
          <>
            <motion.button
              type="button"
              onClick={openCard}
              className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[5px] text-white/40 outline-none"
              whileHover={{ color: "rgba(255,255,255,0.8)" }}
            >
              {compactText}
            </motion.button>
            <motion.div
              className="pointer-events-none absolute bottom-[58px] left-1/2 z-20 h-px -translate-x-1/2"
              animate={{
                width: [38, 58, 38],
                opacity: [0.25, 0.65, 0.25],
                backgroundColor: variant.accent,
              }}
              transition={{
                duration: motionTime.compactLine,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
        {/* Persistent product image */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={
            open
              ? `Close ${variant.name} product details`
              : `Open ${variant.name} product details`
          }
          onClick={handleProductClick}
          onKeyDown={handleProductKeyDown}
          className="absolute top-1/2 z-30 flex cursor-pointer items-center justify-center outline-none"
          initial={false}
          animate={{
            left: isExpanded ? "72%" : "50%",
            width: isExpanded ? 220 : 180,
            height: isExpanded ? 335 : 275,
            x: "-50%",
            y: "-50%",
            scale: closing ? 0.96 : 1,
            rotateZ: closing ? -1.5 : 0,
          }}
          transition={{
            left: {
              duration: closing ? motionTime.close : motionTime.open,
              ease: easing,
            },
            width: {
              duration: closing ? motionTime.close : motionTime.open,
              ease: easing,
            },
            height: {
              duration: closing ? motionTime.close : motionTime.open,
              ease: easing,
            },
            x: { duration: 0 },
            y: { duration: 0 },
            scale: {
              duration: closing ? motionTime.close : motionTime.productShift,
              ease: easing,
            },
            rotateZ: {
              duration: closing ? motionTime.close : motionTime.productShift,
              ease: easing,
            },
          }}
          style={{
            filter: `drop-shadow(0 30px 28px rgba(0,0,0,.6)) drop-shadow(0 0 24px ${variant.accentSoft})`,
          }}
        >
          {/* Product glow */}
          <motion.div
            className="pointer-events-none absolute h-[72%] w-[75%] rounded-full blur-[45px]"
            animate={{
              opacity: isExpanded ? 0.24 : [0.1, 0.22, 0.1],
              scale: isExpanded ? 1 : [0.92, 1.04, 0.92],
              backgroundColor: variant.accent,
            }}
            transition={{
              opacity: { duration: motionTime.ambientOpacity },
              scale: { duration: motionTime.glow, repeat: isExpanded ? 0 : Infinity, ease: "easeInOut" },
              backgroundColor: { duration: 0 },
            }}
          />
          {/* Floating motion is separate from card positioning */}
          <motion.div
            className="relative z-10 h-full w-full"
            animate={isExpanded ? { y: 0 } : { y: [0, -7, 0] }}
            transition={
              isExpanded
                ? { duration: motionTime.productShift, ease: easing }
                : { duration: motionTime.float, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <img
              src={variant.image}
              alt={variant.name}
              draggable={false}
              className="absolute inset-0 z-10 h-full w-full select-none object-contain"
            />
          </motion.div>
          {/* Light sweep */}
          <motion.div
            className="pointer-events-none absolute left-[27%] top-[8%] z-20 h-[75%] w-[18%] rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[8px]"
            animate={{
              x: [0, 26, 0],
              opacity: [0.03, 0.16, 0.03],
            }}
            transition={{
              duration: motionTime.lightSweep,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        {/* Product details */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="details"
              className="absolute left-8 top-1/2 z-20 w-[43%] -translate-y-1/2"
              initial={{ opacity: 0, x: -70 }}
              animate={{
                opacity: closing || !detailsVisible ? 0 : 1,
                x: closing ? -65 : detailsVisible ? 0 : -30,
              }}
              exit={{ opacity: 0, x: -65 }}
              transition={{
                duration: closing ? motionTime.close * 0.8 : motionTime.detail,
                ease: easing,
              }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-[4px]"
                style={{ color: variant.accent }}
              >
                {brand} / {variant.shortName}
              </div>
              <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-black tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-3 max-w-[310px] text-[13px] leading-6 text-white/50">
                {variant.description}
              </p>
              <p className="mt-2 text-[9px] tracking-[1.5px] text-white/25">
                {variant.meta}
              </p>
              {/* Variants */}
              <div className="mt-5 flex flex-wrap gap-2">
                {safeVariants.map((item, index) => (
                  <button
                    key={item.id || index}
                    type="button"
                    disabled={cartState !== "idle" || closing}
                    onClick={() => changeVariant(index)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[9px] transition-all ${
                      index === selectedVariant
                        ? "border-white/20 bg-white/[0.07] text-white"
                        : "border-white/10 text-white/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: item.accent,
                        boxShadow:
                          index === selectedVariant
                            ? `0 0 14px ${item.accentSoft}`
                            : "none",
                      }}
                    />
                    {item.shortName}
                  </button>
                ))}
              </div>
              {/* Quantity and total */}
              {showQuantity && (
                <div className="mt-4 flex items-center gap-5">
                  <div className="flex h-10 items-center rounded-full border border-white/10 bg-white/[0.025] px-1">
                    <button
                      type="button"
                      disabled={cartState !== "idle" || closing}
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-xs font-semibold text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={cartState !== "idle" || closing}
                      onClick={() => setQuantity((value) => value + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div>
                    <div className="text-[8px] uppercase tracking-[2px] text-white/25">
                      Total
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      ${total}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Bottom label */}
        {open && (
          <motion.div
            className="pointer-events-none absolute bottom-9 left-8 text-[9px] uppercase tracking-[2px] text-white/25"
            animate={{
              opacity: closing || !detailsVisible ? 0 : 1,
              x: closing ? -25 : 0,
            }}
            transition={{ duration: motionTime.detail, ease: easing }}
          >
            Premium quality · Freshly made
          </motion.div>
        )}
        {/* Cart controls */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="cart-controls"
              className="absolute bottom-5 right-6 z-50"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: closing || !detailsVisible ? 0 : 1,
                y: closing ? 12 : detailsVisible ? 0 : 10,
              }}
              exit={{ opacity: 0, y: 12 }}
              transition={{
                duration: closing ? motionTime.close * 0.68 : motionTime.cartControls,
                ease: easing,
              }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closeCard}
                disabled={closing || cartState !== "idle"}
                aria-label="Close product"
                className="absolute -right-1 bottom-[360px] flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 backdrop-blur-md transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed"
              >
                <X size={15} />
              </button>
              {/* Add to cart */}
              <motion.button
                type="button"
                onClick={addToCart}
                disabled={cartState !== "idle" || closing}
                className="flex h-12 min-w-[190px] items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 text-xs font-bold disabled:cursor-not-allowed"
                animate={{
                  backgroundColor:
                    cartState === "added" ? "#22c55e" : "#ffffff",
                  color: cartState === "added" ? "#ffffff" : "#111111",
                }}
                transition={{ duration: motionTime.cartButton }}
                style={{
                  boxShadow:
                    cartState === "added"
                      ? "0 0 30px rgba(34,197,94,.22)"
                      : `0 0 25px ${variant.accentSoft}`,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {cartState === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={14} />
                      {buttonText}
                      <span className="text-black/40">${total}</span>
                    </motion.span>
                  )}
                  {cartState === "adding" && (
                    <motion.span
                      key="adding"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative flex w-full items-center justify-center"
                    >
                      <motion.span
                        className="absolute left-0"
                        initial={{ x: -15, opacity: 0 }}
                        animate={{ x: 18, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: motionTime.adding, ease: easing }}
                      >
                        <Truck size={17} />
                      </motion.span>
                      Adding...
                    </motion.span>
                  )}
                  {cartState === "added" && (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 18,
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.span>
                      Added to cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
