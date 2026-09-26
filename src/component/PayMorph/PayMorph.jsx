import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length > 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return digits;
};

const getCardBrand = (number) => {
  const value = number.replace(/\s/g, "");

  if (/^4/.test(value)) return "VISA";

  if (
    /^(5[1-5]|2[2-7])/.test(value)
  ) {
    return "MASTERCARD";
  }

  if (/^3[47]/.test(value)) return "AMEX";

  return "CARD";
};

export default function PayMorph() {
  const [cardNumber, setCardNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [showBack, setShowBack] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const brand = getCardBrand(cardNumber);

  useEffect(() => {
    if (cvv.length > 0) {
      setShowBack(true);
    }
  }, [cvv]);

  const handlePayment = () => {
    if (
      cardNumber.replace(/\s/g, "").length < 16 ||
      holder.trim().length < 2 ||
      expiry.length < 5 ||
      cvv.length < 3
    ) {
      alert("Please complete all payment details.");
      return;
    }

    setPaymentStatus("processing");

    setTimeout(() => {
      setPaymentStatus("success");
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-[430px]">

        {/* CARD */}

        <div
          className="relative w-full h-[245px]"
          style={{
            perspective: "1200px",
          }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotateY: showBack ? 180 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >

            {/*FRONT*/}

            <div
              className="absolute inset-0 rounded-[28px] overflow-hidden p-7
                         bg-gradient-to-br from-[#20252f] via-[#11151d] to-[#080a0f]
                         border border-white/10 shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
              }}
            >

              {/* Glow */}

              <div className="absolute -top-24 -right-20 w-60 h-60
                              bg-cyan-400/20 blur-[80px] rounded-full" />

              <div className="absolute -bottom-24 -left-20 w-60 h-60
                              bg-violet-500/15 blur-[80px] rounded-full" />

              <div className="relative z-10 h-full flex flex-col justify-between">

                {/* Top */}

                <div className="flex items-center justify-between">

                  {/* Chip */}

                  <div className="w-[48px] h-[36px] rounded-lg
                                  bg-gradient-to-br from-yellow-200
                                  via-yellow-400 to-yellow-600
                                  relative overflow-hidden">

                    <div className="absolute left-1/2 top-0
                                    w-[1px] h-full bg-yellow-700/50" />

                    <div className="absolute top-1/2 left-0
                                    w-full h-[1px] bg-yellow-700/50" />

                    <div className="absolute inset-[8px]
                                    border border-yellow-700/40 rounded-md" />

                  </div>

                  {/* Brand */}

                  <motion.div
                    key={brand}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold italic tracking-wider text-lg"
                  >
                    {brand === "MASTERCARD" ? (
                      <div className="flex items-center gap-1">
                        <span className="w-7 h-7 rounded-full bg-red-500/90" />
                        <span className="w-7 h-7 rounded-full bg-yellow-400/90 -ml-3" />
                      </div>
                    ) : (
                      brand
                    )}
                  </motion.div>

                </div>

                {/* Number */}

                <motion.div
                  key={cardNumber}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="text-[22px] tracking-[3px] font-mono
                             whitespace-nowrap"
                >
                  {cardNumber || "•••• •••• •••• ••••"}
                </motion.div>

                {/* Bottom */}

                <div className="flex justify-between items-end">

                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40">
                      Card Holder
                    </p>

                    <p className="mt-1 text-sm uppercase tracking-wider">
                      {holder || "YOUR NAME"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40">
                      Valid Thru
                    </p>

                    <p className="mt-1 text-sm font-mono">
                      {expiry || "MM/YY"}
                    </p>
                  </div>

                </div>

              </div>
            </div>


            {/*  BACK*/}

            <div
              className="absolute inset-0 rounded-[28px] overflow-hidden
                         bg-gradient-to-br from-[#1c2028] to-[#080a0e]
                         border border-white/10 shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >

              <div className="pt-8">

                <div className="w-full h-[45px] bg-black/80" />

                <div className="px-7 mt-7">

                  <div className="flex items-center gap-3">

                    <div className="flex-1 h-[40px] rounded-lg bg-white/10
                                    flex items-center justify-end px-4">

                      <span className="text-white/30 text-xs">
                        CVV
                      </span>

                    </div>

                    <div className="w-[60px] h-[40px] rounded-lg
                                    bg-white text-black flex items-center
                                    justify-center font-mono font-bold">
                      {cvv || "•••"}
                    </div>

                  </div>

                  <p className="text-[9px] text-white/30 mt-5 leading-relaxed">
                    This card is protected by secure payment technology.
                    Never share your CVV with anyone.
                  </p>

                </div>

              </div>

              {/* Back brand */}

              <div className="absolute bottom-7 right-7
                              font-bold italic text-white/40">
                {brand}
              </div>

            </div>

          </motion.div>
        </div>


        {/* FORM */}

        <div className="mt-8 space-y-4">

          {/* Card number */}

          <div>
            <label className="text-xs text-white/50">
              Card Number
            </label>

            <input
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(formatCardNumber(e.target.value))
              }
              onFocus={() => setShowBack(false)}
              placeholder="4242 4242 4242 4242"
              inputMode="numeric"
              className="mt-2 w-full h-12 rounded-xl px-4
                         bg-white/[0.05] border border-white/10
                         outline-none focus:border-cyan-400/50
                         transition placeholder:text-white/20"
            />
          </div>


          {/* Holder */}

          <div>
            <label className="text-xs text-white/50">
              Card Holder
            </label>

            <input
              value={holder}
              onChange={(e) =>
                setHolder(e.target.value.toUpperCase())
              }
              onFocus={() => setShowBack(false)}
              placeholder="SAURABH THAKUR"
              className="mt-2 w-full h-12 rounded-xl px-4
                         bg-white/[0.05] border border-white/10
                         outline-none focus:border-cyan-400/50
                         transition placeholder:text-white/20"
            />
          </div>


          {/* Expiry + CVV */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs text-white/50">
                Expiry
              </label>

              <input
                value={expiry}
                onChange={(e) =>
                  setExpiry(formatExpiry(e.target.value))
                }
                onFocus={() => setShowBack(false)}
                placeholder="MM/YY"
                inputMode="numeric"
                className="mt-2 w-full h-12 rounded-xl px-4
                           bg-white/[0.05] border border-white/10
                           outline-none focus:border-cyan-400/50
                           transition placeholder:text-white/20"
              />
            </div>


            <div>
              <label className="text-xs text-white/50">
                CVV
              </label>

              <input
                value={cvv}
                onChange={(e) =>
                  setCvv(
                    e.target.value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                onFocus={() => setShowBack(true)}
                placeholder="•••"
                type="password"
                inputMode="numeric"
                className="mt-2 w-full h-12 rounded-xl px-4
                           bg-white/[0.05] border border-white/10
                           outline-none focus:border-cyan-400/50
                           transition placeholder:text-white/20"
              />
            </div>

          </div>


          {/*  PAY BUTTON  */}

          <motion.button
            onClick={handlePayment}
            disabled={paymentStatus !== "idle"}
            whileTap={{ scale: 0.97 }}
            className={`relative w-full h-14 rounded-xl
                        font-semibold overflow-hidden
                        flex items-center justify-center
                        transition-all
                        ${
                          paymentStatus === "success"
                            ? "bg-emerald-400 text-black"
                            : "bg-cyan-300 text-black"
                        }`}
          >

            <AnimatePresence mode="wait">

              {paymentStatus === "idle" && (
                <motion.span
                  key="pay"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Pay ₹2,499
                </motion.span>
              )}

              {paymentStatus === "processing" && (
                <motion.div
                  key="processing"
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.span
                    className="w-5 h-5 rounded-full border-2
                               border-black/20 border-t-black"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  Processing...
                </motion.div>
              )}

              {paymentStatus === "success" && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                    }}
                    className="w-6 h-6 rounded-full
                               bg-black/10 flex items-center justify-center"
                  >
                    ✓
                  </motion.span>

                  Payment Successful
                </motion.div>
              )}

            </AnimatePresence>

          </motion.button>

        </div>


        {/* Success particles */}

        <AnimatePresence>
          {paymentStatus === "success" && (
            <>
              {[...Array(14)].map((_, index) => (
                <motion.span
                  key={index}
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: 215,
                    y: 200,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 1,
                    x:
                      215 +
                      Math.cos(index) * (100 + index * 5),
                    y:
                      200 +
                      Math.sin(index) * (100 + index * 5),
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.03,
                  }}
                  className="fixed w-2 h-2 rounded-full bg-cyan-300
                             pointer-events-none"
                />
              ))}
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}