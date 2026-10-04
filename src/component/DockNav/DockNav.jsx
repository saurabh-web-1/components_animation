import { useState } from "react";
import { Home, Terminal, Scan, GitBranch, Sparkles } from "lucide-react";

const AuraDock = () => {
  const [active, setActive] = useState("Aceternity UI");

  const items = [
    { name: "Home", icon: Home },
    { name: "Terminal", icon: Terminal },
    { name: "Components", icon: Scan },
    { name: "Aceternity UI", icon: Sparkles },
    { name: "Git Flow", icon: GitBranch },
    { name: "X", icon: null },
    { name: "GitHub", icon: GitBranch },
  ];

  return (
    <nav className="relative flex items-center gap-3 rounded-[24px] border border-white/[0.05] bg-[#171717] px-6 py-5 shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.name;

        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setActive(item.name)}
            className="group relative flex h-[94px] w-[94px] shrink-0 items-center justify-center outline-none"
          >
            <span className="pointer-events-none absolute -top-14 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#202020] px-3 py-1.5 text-sm text-white opacity-0 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
              {item.name}
            </span>

            <span
              className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                isActive
                  ? "h-[138px] w-[138px] bg-[#252525] shadow-[0_0_45px_rgba(255,255,255,0.05)]"
                  : "h-[94px] w-[94px] bg-[#252525] group-hover:-translate-y-[65%] group-hover:scale-110 group-hover:bg-[#303030]"
              }`}
            >
              {item.name === "X" ? (
                <span
                  className={`${
                    isActive ? "text-5xl" : "text-3xl"
                  } text-white`}
                >
                  𝕏
                </span>
              ) : (
                <Icon
                  size={isActive ? 38 : 30}
                  strokeWidth={isActive ? 2 : 1.8}
                  className="text-white transition-all duration-500"
                />
              )}

              {/* ONLY ACETERNITY UI GETS THE WHITE A BOX */}
              {isActive && item.name === "Aceternity UI" && (
                <span className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  <span className="text-2xl font-medium">A</span>
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default AuraDock;