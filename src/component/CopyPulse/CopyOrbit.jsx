import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyPulse = ({
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
      className={`
        relative
        flex
        items-center
        justify-center
        gap-2
        overflow-hidden
        rounded-xl
        border
        px-5
        py-3
        font-medium
        transition-all
        duration-300
        active:scale-95

        ${
          copied
            ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400"
            : "border-white/10 bg-[#11151f] text-white hover:border-violet-400/40 hover:bg-[#171c29]"
        }
      `}
    >
      {/* Icon */}
      <span className="relative z-10 flex h-5 w-5 items-center justify-center">
        {copied ? (
          <Check
            size={18}
            strokeWidth={2.5}
            className="animate-copyCheck"
          />
        ) : (
          <Copy
            size={18}
            className="transition-transform duration-300"
          />
        )}
      </span>

      {/* Text */}
      <span className="relative z-10">
        {copied ? "Copied!" : "Copy Code"}
      </span>

      <style>{`
        @keyframes copyCheck {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-20deg);
          }

          60% {
            opacity: 1;
            transform: scale(1.2) rotate(5deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        .animate-copyCheck {
          animation: copyCheck 0.35s ease-out;
        }
      `}</style>
    </button>
  );
};

export default CopyPulse;