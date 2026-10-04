import { useState } from "react";
import {
  Sparkles,
  Home,
  Layers3,
  CreditCard,
  BookOpen,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const MagnetNav = () => {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    { name: "Home", icon: Home },
    { name: "Components", icon: Layers3 },
    { name: "Pricing", icon: CreditCard },
    { name: "Docs", icon: BookOpen },
  ];

  return (
    <nav className="relative w-[900px] max-w-[calc(100vw-32px)] rounded-2xl border border-white/[0.08] bg-[#0d0d0f]/95 p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between">
        
        {/* Logo */}
        <button
          type="button"
          className="group flex shrink-0 items-center gap-2.5 px-2 text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition-transform duration-500 group-hover:rotate-12">
            <Sparkles size={17} strokeWidth={2.5} />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            MagnetUI
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(item.name)}
                className="group relative flex items-center gap-2 rounded-xl px-5 py-3 text-sm outline-none"
              >
                <span
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "scale-100 bg-white/[0.08] opacity-100"
                      : "scale-75 opacity-0 group-hover:scale-100 group-hover:bg-white/[0.05] group-hover:opacity-100"
                  }`}
                />

                <span
                  className={`relative z-10 transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-neutral-200"
                  }`}
                >
                  <Icon size={15} strokeWidth={isActive ? 2.3 : 1.8} />
                </span>

                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-neutral-200"
                  }`}
                >
                  {item.name}
                </span>

                {isActive && (
                  <span className="relative z-10 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_9px_rgba(34,211,238,0.9)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            className="rounded-xl px-4 py-3 text-sm text-neutral-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            Sign in
          </button>

          <button
            type="button"
            className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
          >
            Get Started
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition hover:bg-white/[0.06] hover:text-white sm:hidden"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mt-2 border-t border-white/[0.07] pt-2 sm:hidden">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setActive(item.name);
                  setMobileOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-neutral-500 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </button>
            );
          })}

          <button
            type="button"
            className="mt-1 flex w-full items-center justify-center rounded-xl bg-white py-3 text-sm font-medium text-black"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default MagnetNav;