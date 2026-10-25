import { memo } from "react";
import { Github, Linkedin, MessageCircle, Mail } from "lucide-react";

const socials = [
  { name: "Email", href: "mailto:gogoi78ranjan@gmail.com", Icon: Mail },
  { name: "WhatsApp", href: "https://wa.me/916000175974", Icon: MessageCircle },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { name: "GitHub", href: "https://github.com/ranjangogoi61", Icon: Github },
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Footer = memo(function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-10 px-6 border-t border-border/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="inline-block font-display font-bold text-2xl tracking-tight text-foreground hover:text-primary transition-colors mb-4"
            >
              Ranjan <span className="text-primary">Gogoi</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Freelance frontend web developer building modern, responsive 2D and
              3D websites for startups, creators, and small businesses.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Sitemap
            </div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Get in touch
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {socials.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
            <a
              href="mailto:gogoi78ranjan@gmail.com"
              className="block text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              gogoi78ranjan@gmail.com
            </a>
            <a
              href="https://wa.me/916000175974"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              WhatsApp: +91 60001 75974
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/70 font-mono">
            © {new Date().getFullYear()} Ranjan Gogoi — Crafted with intent.
          </p>
          <p className="text-xs text-muted-foreground/70 font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
});
