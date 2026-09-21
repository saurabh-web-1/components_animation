import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const naveList = [
    { name: "ScanPulse", path: "/scanpulse" },
    { name: "FlyShare", path: "/flyshare" },
    { name: "CartGlide", path: "/cartglide" },
    { name: "heartburst", path: "/heartburst" },
    { name: "paymorph", path: "/paymorph" },
    { name: "NovaDownload", path: "/novadownload" },
    { name: "WaveDownload", path: "/wavedownload" },

  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <nav className="border-b border-white/10 bg-slate-950 px-6 py-4">
  <ul className="flex items-center gap-2">
    {naveList.map((item) => (
      <li key={item.path}>
        <Link
          to={item.path}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-white/10 hover:text-white"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</nav>
    </div>
  );
}