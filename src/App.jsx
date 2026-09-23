import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./home";
import componentRegistry from "./componentRegistry";

function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-white/10
            border-t-cyan-400
          "
        />

        <p className="text-sm text-slate-400">
          Loading component...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* HOME */}
        <Route
          index
          element={<Home />}
        />

        {/* AUTOMATIC COMPONENT ROUTES */}
        {componentRegistry.map((item) => {
          const Component = item.Component;

          return (
            <Route
              key={item.path}
              path={item.path}
              element={
                <div className="min-h-screen bg-black w-full flex items-center justify-center">
                  <Component />
                </div>
              }
            />
          );
        })}

      </Routes>
    </Suspense>
  );
}

export default App;