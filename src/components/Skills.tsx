import { memo } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiVite,
  SiGreensock,
  SiFramer,
  SiBlender,
  SiFigma,
  SiGit,
  SiNodedotjs,
  SiWebgl,
  SiVercel,
  SiSanity,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const groups = [
  {
    title: "Frontend",
    description: "The core stack I reach for daily — typed, fast, and battle-tested.",
    items: [
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "Vite", Icon: SiVite },
      { name: "React Native", Icon: TbBrandReactNative },
    ],
  },
  {
    title: "3D & Animation",
    description: "Where the web stops feeling like a document and starts feeling like a place.",
    items: [
      { name: "Three.js", Icon: SiThreedotjs },
      { name: "R3F & Drei", Icon: SiReact },
      { name: "WebGL / GLSL", Icon: SiWebgl },
      { name: "GSAP", Icon: SiGreensock },
      { name: "Framer Motion", Icon: SiFramer },
      { name: "Blender", Icon: SiBlender },
    ],
  },
  {
    title: "Tooling & Workflow",
    description: "The boring-but-critical layer that keeps shipping fast and safe.",
    items: [
      { name: "Figma", Icon: SiFigma },
      { name: "Git / GitHub", Icon: SiGit },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Sanity CMS", Icon: SiSanity },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
];

export const Skills = memo(function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
            [ 04 ] Skills
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
            A curated toolkit, <span className="text-gradient">used in anger</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            No buzzword salad — just the tools I've shipped real, paying client work
            with for years. Always learning, never collecting.
          </p>
        </motion.div>

        <div className="space-y-10">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4">
                <div className="text-xs font-mono text-muted-foreground/60 mb-2">
                  0{gi + 1}
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2 tracking-tight">
                  {group.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {group.description}
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.items.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.name}
                      className="group flex items-center gap-3 px-4 py-4 rounded-xl glass-panel hover:border-primary/40 transition-colors duration-300"
                    >
                      <Icon
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0"
                      />
                      <span className="text-sm font-medium text-foreground/90 truncate">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
