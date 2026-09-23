import React from "react";
import { Link } from "react-router-dom";
import componentRegistry from "./componentRegistry";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-slate-950 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
            {componentRegistry.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="
              inline-flex
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              text-slate-400
              transition-all
              duration-300
              hover:bg-white/10
              hover:text-white
            "
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HOME CONTENT */}
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-sm uppercase tracking-[5px] text-cyan-400">
            Component Library
          </p>

          <h1 className="text-4xl font-bold">Animated Components</h1>

          <p className="mt-3 text-slate-400">
            {componentRegistry.length} components available
          </p>
        </div>
      </main>
    </div>
  );
}
