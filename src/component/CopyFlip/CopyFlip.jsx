import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyFlip = ({
  text = "const message = 'Hello World';",
}) => {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={copyText}
      aria-label={copied ? "Copied" : "Copy code"}
      className={`
        group
        relative
        flex
        items-center
        justify-center
        gap-2.5
        rounded-xl
        border
        px-5
        py-3
        text-sm
        font-medium
        perspective-[500px]
        transition-all
        duration-300
        active:scale-95

        ${
          copied
            ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
            : "border-white/10 bg-[#11151f] text-white hover:border-cyan-400/40 hover:bg-[#171c29]"
        }
      `}
    >
      {/* ICON */}
      <span className="relative z-10 flex h-5 w-5 items-center justify-center">
        {copied ? (
          <Check
            size={18}
            strokeWidth={2.7}
            className="animate-flipCheck"
          />
        ) : (
          <Copy
            size={18}
            strokeWidth={2}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
          />
        )}
      </span>

      {/* TEXT */}
      <span
        className={`
          relative
          z-10
          ${
            copied
              ? "animate-flipText"
              : ""
          }
        `}
      >
        {copied ? "Copied!" : "Copy Code"}
      </span>

      {/* SUCCESS FLASH */}
      {copied && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <span className="copy-flash" />
        </span>
      )}

      <style>{`
        /* =========================
           CHECK FLIP
        ========================= */

        @keyframes flipCheck {
          0% {
            opacity: 0;
            transform:
              perspective(300px)
              rotateX(-90deg)
              scale(0.5);
          }

          45% {
            opacity: 1;
            transform:
              perspective(300px)
              rotateX(20deg)
              scale(1.2);
          }

          70% {
            transform:
              perspective(300px)
              rotateX(-8deg)
              scale(0.95);
          }

          100% {
            opacity: 1;
            transform:
              perspective(300px)
              rotateX(0deg)
              scale(1);
          }
        }

        .animate-flipCheck {
          animation:
            flipCheck
            0.5s
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );
        }


        /* =========================
           TEXT
        ========================= */

        @keyframes flipText {
          0% {
            opacity: 0;
            transform:
              perspective(300px)
              rotateX(-70deg)
              translateY(-4px);
          }

          100% {
            opacity: 1;
            transform:
              perspective(300px)
              rotateX(0deg)
              translateY(0);
          }
        }

        .animate-flipText {
          animation:
            flipText
            0.4s
            ease-out;
        }


        /* =========================
           LIGHT FLASH
        ========================= */

        @keyframes copyFlash {
          0% {
            opacity: 0;
            transform: translateX(-120%);
          }

          30% {
            opacity: 0.5;
          }

          100% {
            opacity: 0;
            transform: translateX(120%);
          }
        }

        .copy-flash {
          position: absolute;
          inset: 0;

          width: 35%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.35),
            transparent
          );

          transform: translateX(-120%) skewX(-20deg);

          animation:
            copyFlash
            0.65s
            ease-out;
        }
      `}</style>
    </button>
  );
};

export default CopyFlip;