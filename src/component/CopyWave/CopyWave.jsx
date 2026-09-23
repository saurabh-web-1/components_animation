import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyWave = ({
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
        overflow-visible
        rounded-xl
        border
        px-5
        py-3
        text-sm
        font-medium
        outline-none
        transition-all
        duration-300
        active:scale-95
        ${
          copied
            ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-400"
            : "border-white/10 bg-[#11151f] text-white hover:border-violet-400/40 hover:bg-[#171c29]"
        }
      `}
    >
      {/* WAVE 1 */}
      {copied && (
        <span
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-5
            w-5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border-2
            border-emerald-400/80
            animate-waveOne
          "
        />
      )}

      {/* WAVE 2 */}
      {copied && (
        <span
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-5
            w-5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border-2
            border-emerald-400/60
            animate-waveTwo
          "
        />
      )}

      {/* WAVE 3 */}
      {copied && (
        <span
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-5
            w-5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border-2
            border-emerald-400/40
            animate-waveThree
          "
        />
      )}

      {/* ICON */}
      <span className="relative z-10 flex h-5 w-5 items-center justify-center">
        {copied ? (
          <Check
            size={18}
            strokeWidth={2.7}
            className="animate-checkIn"
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
          transition-all
          duration-300
          ${
            copied
              ? "text-emerald-400"
              : "text-white"
          }
        `}
      >
        {copied ? "Copied!" : "Copy Code"}
      </span>

      <style>{`
        /* =========================
           WAVE 1
        ========================= */

        @keyframes waveOne {
          0% {
            opacity: 0.9;
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(8);
          }
        }

        .animate-waveOne {
          animation:
            waveOne
            0.9s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }


        /* =========================
           WAVE 2
        ========================= */

        @keyframes waveTwo {
          0% {
            opacity: 0.8;
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(8);
          }
        }

        .animate-waveTwo {
          animation:
            waveTwo
            0.9s
            0.15s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }


        /* =========================
           WAVE 3
        ========================= */

        @keyframes waveThree {
          0% {
            opacity: 0.7;
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(8);
          }
        }

        .animate-waveThree {
          animation:
            waveThree
            0.9s
            0.3s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }


        /* =========================
           CHECK
        ========================= */

        @keyframes checkIn {
          0% {
            opacity: 0;
            transform:
              scale(0.3)
              rotate(-30deg);
          }

          55% {
            opacity: 1;
            transform:
              scale(1.3)
              rotate(8deg);
          }

          75% {
            transform:
              scale(0.9)
              rotate(-3deg);
          }

          100% {
            opacity: 1;
            transform:
              scale(1)
              rotate(0deg);
          }
        }

        .animate-checkIn {
          animation:
            checkIn
            0.45s
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );
        }
      `}</style>
    </button>
  );
};

export default CopyWave;