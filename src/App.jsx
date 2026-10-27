import ProjectMorph from "./component/ProjectMorph/ProjectMorph";

const clientProjects = [
  {
    id: "modern-villa",
    title: "Villa",
    category: "LUXURY RESIDENCE",
    year: "2026",
    location: "New Delhi",
    description: "A modern home with clean architecture.",
    background: "#9aaea1",
    accent: "#ffffff",
    image: "/images/villa.jpg",
  },
  {
    id: "urban-house",
    title: "Urban",
    category: "CONTEMPORARY HOME",
    year: "2026",
    location: "Gurugram",
    description: "Contemporary design with natural textures.",
    background: "#a99a87",
    accent: "#fffaf0",
    image: "/images/urban.jpg",
  },
];

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <ProjectMorph />
    </div>
  );
}