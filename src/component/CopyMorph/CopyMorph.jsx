import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyMorph = ({
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
      {/* ICON AREA */}
      <span className="relative flex h-5 w-5 items-center justify-center">

        {/* ORBIT PARTICLES */}
        {copied && (
          <>
            <span className="orbit-particle particle-one" />
            <span className="orbit-particle particle-two" />
            <span className="orbit-particle particle-three" />
          </>
        )}

        {/* COPY */}
        {!copied && (
          <Copy
            size={18}
            strokeWidth={2}
            className="
              relative
              z-10
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
          />
        )}

        {/* CHECK */}
        {copied && (
          <span className="relative z-10 animate-orbitCheck">
            <Check
              size={18}
              strokeWidth={2.8}
            />
          </span>
        )}
      </span>

      {/* TEXT */}
      <span
        className={`
          transition-all
          duration-300
          ${copied ? "text-cyan-400" : "text-white"}
        `}
      >
        {copied ? "Copied!" : "Copy Code"}
      </span>

      <style>{`
        /* ORBIT PARTICLES */

        .orbit-particle {
          position: absolute;
          left: 50%;
          top: 50%;

          width: 4px;
          height: 4px;

          border-radius: 9999px;

          background: rgb(34 211 238);

          transform:
            translate(-50%, -50%);

          animation:
            orbitParticle
            0.75s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            )
            forwards;
        }

        .particle-one {
          animation-delay: 0s;
        }

        .particle-two {
          animation-delay: 0.06s;
        }

        .particle-three {
          animation-delay: 0.12s;
        }

        @keyframes orbitParticle {

          0% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              translateX(0)
              scale(0.2);
          }

          20% {
            opacity: 1;
            transform:
              translate(-50%, -50%)
              rotate(90deg)
              translateX(10px)
              scale(1);
          }

          55% {
            opacity: 1;
            transform:
              translate(-50%, -50%)
              rotate(220deg)
              translateX(13px)
              scale(1);
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              translateX(18px)
              scale(0);
          }

        }


        /* CHECK POP */

        @keyframes orbitCheck {

          0% {
            opacity: 0;
            transform:
              scale(0)
              rotate(-90deg);
          }

          45% {
            opacity: 1;
            transform:
              scale(1.35)
              rotate(15deg);
          }

          70% {
            transform:
              scale(0.9)
              rotate(-5deg);
          }

          100% {
            opacity: 1;
            transform:
              scale(1)
              rotate(0deg);
          }

        }

        .animate-orbitCheck {
          display: flex;
          animation:
            orbitCheck
            0.5s
            0.2s
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            )
            both;
        }
      `}</style>
    </button>
  );
};

export default CopyMorph;