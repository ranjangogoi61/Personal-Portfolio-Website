import { memo } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Layers,
  Sparkles,
  Zap,
  MonitorSmartphone,
  Gauge,
} from "lucide-react";

const services = [
  {
    icon: Box,
    title: "3D Web Experiences",
    description:
      "Immersive WebGL scenes with React Three Fiber — product configurators, interactive scrollytelling, and brand worlds that feel like apps, not pages.",
    tags: ["Three.js", "R3F", "GLSL"],
  },
  {
    icon: Sparkles,
    title: "Interactive Animations",
    description:
      "Motion-rich UI built with GSAP and Framer Motion — page transitions, scroll-triggered reveals, and micro-interactions that elevate the entire product.",
    tags: ["GSAP", "Framer", "Lenis"],
  },
  {
    icon: Layers,
    title: "Premium Landing Pages",
    description:
      "High-converting marketing sites engineered for founders and agencies — pixel-perfect, lightning fast, and designed to win the first three seconds.",
    tags: ["Next.js", "Tailwind", "MDX"],
  },
  {
    icon: MonitorSmartphone,
    title: "Portfolio & Brand Sites",
    description:
      "Bespoke single-page experiences for designers, studios, and creative professionals — confident typography, considered motion, and a personality of their own.",
    tags: ["React", "Vite", "Sanity"],
  },
  {
    icon: Zap,
    title: "Webflow → React Rebuilds",
    description:
      "Migrate your Webflow site to a typed, version-controlled, infinitely extensible React codebase without losing a pixel of the original design.",
    tags: ["Migration", "TypeScript", "CMS"],
  },
  {
    icon: Gauge,
    title: "Performance Audits",
    description:
      "Deep performance and Core Web Vitals optimisation — bundle splitting, image strategy, render profiling, and shader-level GPU work.",
    tags: ["Lighthouse", "Vitals", "Profiler"],
  },
];

export const Services = memo(function Services() {
  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
            [ 02 ] Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
            Built end-to-end, <span className="text-gradient">delivered with care</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Six tightly-scoped offerings — each one a focused engagement with a
            clear deliverable, a clear timeline, and zero scope creep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative glass-panel rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-display font-semibold text-foreground mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md bg-muted/50 text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
