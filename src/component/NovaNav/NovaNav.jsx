import { useState } from "react";
import {
  Home,
  Search,
  Plus,
  MessageCircle,
  UserRound,
} from "lucide-react";

const NovaNav = () => {
  const [active, setActive] = useState("Home");

  const items = [
    {
      name: "Home",
      icon: Home,
    },
    {
      name: "Search",
      icon: Search,
    },
    {
      name: "Create",
      icon: Plus,
    },
    {
      name: "Inbox",
      icon: MessageCircle,
      notification: true,
    },
    {
      name: "Saved",
      icon: UserRound,
    },
  ];

  return (
    <nav
      className="
        relative
        w-[390px]
        max-w-[calc(100vw-32px)]
        rounded-full
        bg-[#17151a]
        px-3
        py-2
        shadow-[0_15px_40px_rgba(0,0,0,0.35)]
      "
    >
     

      <div className="flex items-center justify-between">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(item.name)}
              className="
                group
                relative
                flex
                min-w-[58px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                py-1
                outline-none
              "
            >
              {/* ACTIVE PILL */}
              <span
                className={`
                  absolute
                  left-1/2
                  top-0
                  h-14
                  w-18
                  -translate-x-1/2
                  rounded-full
                  transition-all
                  duration-500
                  ease-out
                  ${
                    isActive
                      ? "scale-100 bg-red-600 opacity-100 shadow-[0_6px_18px_rgba(220,38,38,0.35)]"
                      : "scale-75 bg-transparent opacity-0"
                  }
                `}
              />

              {/* ICON */}
              <span
                className={`
                  relative
                  z-10
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "scale-105 text-white"
                      : "text-neutral-400 group-hover:-translate-y-0.5 group-hover:text-white"
                  }
                `}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />

                {/* NOTIFICATION */}
                {item.notification && (
                  <span
                    className="
                      absolute
                      right-[-2px]
                      top-[-1px]
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-red-500
                      ring-2
                      ring-[#17151a]
                    "
                  />
                )}
              </span>

              {/* LABEL */}
              <span
                className={`
                  relative
                  z-10
                  text-[10px]
                  font-medium
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "translate-y-0 text-white"
                      : "text-neutral-500 group-hover:text-neutral-300"
                  }
                `}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes navWave {
          0% {
            opacity: 0;
            transform:
              translateX(-50%)
              scaleX(0.2);
          }

          45% {
            opacity: 1;
            transform:
              translateX(-50%)
              scaleX(1.5);
          }

          100% {
            opacity: 0.9;
            transform:
              translateX(-50%)
              scaleX(1);
          }
        }

        .animate-navWave {
          animation:
            navWave
            0.55s
            cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </nav>
  );
};

export default NovaNav;