import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import auroraImg from "@/assets/projects/project-aurora.webp";
import helixImg from "@/assets/projects/project-helix.webp";
import prismImg from "@/assets/projects/project-prism.webp";
import nebulaImg from "@/assets/projects/project-nebula.webp";
import vertexImg from "@/assets/projects/project-vertex.webp";
import orbitImg from "@/assets/projects/project-orbit.webp";

type Project = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  size?: "lg" | "md";
};

const projects: Project[] = [
  {
    name: "SaaS Dashboard Demo",
    category: "Web App UI",
    description:
      "A modern responsive dashboard layout with charts, sidebar navigation, dark theme, and a clean component system built in React and Tailwind.",
    tags: ["React", "TypeScript", "Tailwind", "Charts"],
    image: auroraImg,
    year: "2026",
    size: "lg",
  },
  {
    name: "3D Product Showcase",
    category: "3D Web",
    description:
      "Interactive 3D product viewer built with React Three Fiber — smooth camera controls, soft lighting, and a graceful fallback for non-WebGL devices.",
    tags: ["R3F", "Three.js", "Drei"],
    image: helixImg,
    year: "2026",
    size: "md",
  },
  {
    name: "Fashion Store Demo",
    category: "E-Commerce UI",
    description:
      "An e-commerce style storefront with an elegant product grid, hover transitions, and a fully responsive mobile-first layout.",
    tags: ["React", "Tailwind", "Framer"],
    image: prismImg,
    year: "2026",
    size: "md",
  },
  {
    name: "Portfolio Website",
    category: "Personal Site",
    description:
      "A premium dark-theme portfolio site with a subtle 3D hero, smooth scroll-triggered animations, and a working contact form.",
    tags: ["React", "Tailwind", "Three.js"],
    image: nebulaImg,
    year: "2026",
    size: "md",
  },
  {
    name: "Business Landing Page",
    category: "Marketing Site",
    description:
      "A conversion-focused single-page landing site — hero, features, testimonials, and contact — designed for small businesses and service brands.",
    tags: ["React", "Tailwind", "Vite"],
    image: vertexImg,
    year: "2026",
    size: "lg",
  },
  {
    name: "Startup Website Demo",
    category: "Startup Site",
    description:
      "A multi-section startup site template with bold typography, smooth motion, and reusable sections that are easy to customize and rebrand.",
    tags: ["React", "Tailwind", "Framer"],
    image: orbitImg,
    year: "2026",
    size: "md",
  },
];

export const Projects = memo(function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              [ 03 ] Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              Demo projects, <span className="text-gradient">real craft</span>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-sm"
          >
            A selection of personal demo projects showing the kind of websites
            I can build for you. Custom builds available on request.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(280px,auto)]">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative glass-panel rounded-2xl overflow-hidden cursor-pointer ${
                project.size === "lg"
                  ? "md:col-span-4"
                  : "md:col-span-2"
              } min-h-[360px] md:min-h-[420px]`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="absolute top-5 right-5 z-10">
                <div className="w-10 h-10 rounded-full glass-panel border border-border/60 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:rotate-45">
                  <ArrowUpRight
                    className="w-4 h-4 text-foreground group-hover:text-primary-foreground transition-colors"
                    strokeWidth={1.75}
                  />
                </div>
              </div>

              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-1 rounded glass-panel">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60">
                  · {project.year}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-3 tracking-tight">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-md">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-foreground/5 text-muted-foreground border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
});
