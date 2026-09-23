import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Link,
  Check,
  X,
} from "lucide-react";

export default function OrbitShare() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;

// COPY

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);

    } catch (error) {
      console.error("Copy failed:", error);
    }
  };


  // WHATSAPP

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check this out: ${currentUrl}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  };


//  FACEBOOK

  const shareFacebook = () => {
    const url = encodeURIComponent(currentUrl);

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "width=600,height=500"
    );
  };


// INSTAGRAM

  const shareInstagram = async () => {

   

    await handleCopy();

    window.open(
      "https://www.instagram.com/",
      "_blank"
    );
  };


  

  const shareItems = [
    {
      id: "instagram",
      label: "Instagram",
      position: {
        x: -78,
        y: -25,
      },
      icon: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="17.5"
            cy="6.5"
            r="1"
            fill="currentColor"
          />
        </svg>
      ),
      action: shareInstagram,
    },

    {
      id: "facebook",
      label: "Facebook",
      position: {
        x: 0,
        y: -95,
      },
      icon: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="
              M13.5 21V13.1H16.2L16.6 10H13.5V8
              C13.5 7.1 13.8 6.5 15 6.5H16.7V3.7
              C16.4 3.65 15.5 3.5 14.4 3.5
              C11.9 3.5 10.2 5 10.2 7.7V10H7.5V13.1H10.2V21H13.5Z
            "
          />
        </svg>
      ),
      action: shareFacebook,
    },

    {
      id: "whatsapp",
      label: "WhatsApp",
      position: {
        x: 78,
        y: -25,
      },
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="
              M20.5 3.5
              C15.8 -1.2 8.2 -1.1 3.6 3.6
              C-.4 7.6-.9 13.8 2.1 18.5
              L1 23
              L5.7 21.9
              C10.3 24.5 16.2 23.9 20.1 20
              C24.8 15.3 24.8 8.2 20.5 3.5Z
            "
            fill="currentColor"
            opacity="0.15"
          />

          <path
            d="
              M20.5 3.5
              C15.8 -1.2 8.2 -1.1 3.6 3.6
              C-.4 7.6-.9 13.8 2.1 18.5
              L1 23
              L5.7 21.9
              C10.3 24.5 16.2 23.9 20.1 20
              C24.8 15.3 24.8 8.2 20.5 3.5Z
            "
            stroke="currentColor"
            strokeWidth="1.7"
          />

          <path
            d="
              M8 7.5
              C8.3 7.2 8.7 7.2 9 7.6
              L10.2 9.2
              C10.5 9.6 10.5 9.9 10.2 10.3
              L9.6 11
              C10.4 12.5 11.6 13.6 13.1 14.4
              L13.8 13.8
              C14.1 13.5 14.5 13.5 14.9 13.8
              L16.5 15
              C16.9 15.3 16.9 15.7 16.6 16
              L16 16.7
              C15.6 17.2 15 17.4 14.4 17.2
              C10.3 15.8 8.2 13.7 6.8 9.6
              C6.6 9 6.8 8.4 7.3 8L8 7.5Z
            "
            fill="currentColor"
          />
        </svg>
      ),
      action: shareWhatsApp,
    },

    {
      id: "copy",
      label: copied ? "Copied" : "Copy",
      position: {
        x: 0,
        y: 78,
      },
      icon: copied ? (
        <Check
          size={20}
          strokeWidth={2.5}
        />
      ) : (
        <Link
          size={20}
          strokeWidth={2.2}
        />
      ),
      action: handleCopy,
    },
  ];


  return (
    <div className="min-h-screen w-full bg-[#050b12] flex items-center justify-center">

      <div className="relative flex items-center justify-center">


        {/*SHARE OPTIONS*/}

        <AnimatePresence>

          {open &&
            shareItems.map((item, index) => (

              <motion.button
                key={item.id}
                type="button"
                onClick={item.action}
                aria-label={item.label}
                className="
                  absolute
                  z-10
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-[#101a24]
                  text-white
                  shadow-[0_8px_25px_rgba(0,0,0,0.45)]
                "

                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}

                animate={{
                  x: item.position.x,
                  y: item.position.y,
                  scale: 1,
                  opacity: 1,
                }}

                exit={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}

                transition={{
                  type: "spring",
                  stiffness: 430,
                  damping: 22,
                  delay: index * 0.07,
                }}

                whileHover={{
                  scale: 1.15,
                }}

                whileTap={{
                  scale: 0.88,
                }}
              >

                {/* Glow */}

                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-cyan-400/10
                    blur-lg
                  "
                />

                <span className="relative z-10">
                  {item.icon}
                </span>

              </motion.button>

            ))}

        </AnimatePresence>


        {/*MAIN SHARE BUTTON */}

        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close share menu" : "Share"}

          className="
            relative
            z-30
            flex
            h-[74px]
            w-[74px]
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-cyan-600
            text-white
            shadow-[0_0_30px_rgba(8,145,178,0.35)]
          "

          animate={{
            scale: open ? 1.04 : 1,
          }}

          whileHover={{
            scale: open ? 1.08 : 1.06,
          }}

          whileTap={{
            scale: 0.92,
          }}

          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >

          {/* Inner ring */}

          <span
            className="
              absolute
              inset-[7px]
              rounded-full
              border
              border-white/20
              pointer-events-none
            "
          />


          {/*ICON SWITCH*/}

          <AnimatePresence mode="wait">

            {!open ? (

              <motion.div
                key="share"
                className="relative z-10 flex items-center justify-center"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotate: -25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  rotate: 25,
                }}
                transition={{
                  duration: 0.22,
                }}
              >

                <Share2
                  size={29}
                  strokeWidth={2.1}
                />

              </motion.div>

            ) : (

              <motion.div
                key="close"
                className="
                  relative
                  z-10
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                "

                initial={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: -45,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: 45,
                }}

                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                }}
              >

                <X
                  size={30}
                  strokeWidth={2.5}
                />

              </motion.div>

            )}

          </AnimatePresence>

        </motion.button>

      </div>

    </div>
  );
}