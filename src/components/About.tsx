import { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Smartphone, Zap, ShieldCheck, Download } from "lucide-react";

const trust = [
  {
    Icon: Sparkles,
    label: "Modern Projects",
    desc: "Built with React, Tailwind CSS, and subtle Three.js where it adds real value.",
  },
  {
    Icon: Smartphone,
    label: "Responsive Design",
    desc: "Looks sharp on phone, tablet, and desktop — tested on real devices.",
  },
  {
    Icon: Zap,
    label: "Fast Delivery",
    desc: "Clear scope, daily updates, and predictable turnaround on every order.",
  },
  {
    Icon: ShieldCheck,
    label: "Quality Focus",
    desc: "Accessible, performant, and easy for you to update after handoff.",
  },
];

export const About = memo(function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              [ 01 ] About
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-8">
              A developer obsessed with the <span className="text-gradient">edges of the web</span>.
            </h2>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm Ranjan Gogoi — a frontend web developer creating modern, responsive
                2D and 3D websites for startups, creators, businesses, and personal
                brands. I work with React, Tailwind CSS, and Three.js to deliver
                premium UI/UX, smooth animations, and clean, professional builds.
              </p>
              <p>
                I focus on websites that look sharp on every screen, load fast, and
                feel great to use. Whether it's a landing page, a portfolio, or a
                small product site, I bring the same level of care to every project.
              </p>
              <p className="text-foreground/80">
                Around 6 months of focused frontend development experience and counting —
                fully invested in every order, every revision, every detail.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/ranjan-gogoi-resume.pdf"
                download
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md glass-panel px-6 text-sm font-medium text-foreground transition-all hover:bg-muted/50 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-medium text-primary hover:underline cursor-pointer"
              >
                Or send a quick message →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {trust.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="glass-panel rounded-2xl p-6 md:p-7 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <div className="text-lg md:text-xl font-display font-semibold text-foreground mb-1.5 tracking-tight">
                      {item.label}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
