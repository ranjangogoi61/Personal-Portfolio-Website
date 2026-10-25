import { useState, memo, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  Phone,
  Check,
  AlertCircle,
} from "lucide-react";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

const WHATSAPP_NUMBER = "916000175974";
const RAW_FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as
  | string
  | undefined;

function buildFormspreeEndpoint(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/\/+$/, "");
  if (!cleaned) return null;
  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned;
  }
  const slashIdx = cleaned.lastIndexOf("/");
  const id = slashIdx >= 0 ? cleaned.slice(slashIdx + 1) : cleaned;
  if (!id) return null;
  return `https://formspree.io/f/${id}`;
}

const FORMSPREE_ENDPOINT = buildFormspreeEndpoint(RAW_FORMSPREE_ID);

const socials = [
  {
    name: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    Icon: MessageCircle,
  },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { name: "GitHub", href: "https://github.com/ranjangogoi61", Icon: Github },
];

function buildWhatsAppLink(name: string, email: string, message: string) {
  const lines = [
    "Hi Ranjan, I'd like to discuss a project.",
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    message && `\n${message}`,
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const Contact = memo(function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email doesn't look quite right.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Tell me a bit more — at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    if (!FORMSPREE_ENDPOINT) {
      setSubmitError(
        "Email delivery isn't configured yet. Please use WhatsApp or email me directly — your message hasn't been sent.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New project inquiry from ${form.name}`,
          _replyto: form.email,
        }),
      });

      if (res.ok) {
        setSubmitting(false);
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        return;
      }

      let detail = "";
      try {
        const data = (await res.json()) as {
          errors?: { message?: string }[];
          error?: string;
        };
        if (data?.errors?.length) {
          detail = data.errors.map((e) => e.message).filter(Boolean).join(" ");
        } else if (data?.error) {
          detail = data.error;
        }
      } catch {
        /* ignore */
      }
      setSubmitting(false);
      setSubmitError(
        detail ||
          "Something went wrong sending your message. Please try WhatsApp or email instead.",
      );
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        "Couldn't reach the email service. Please try WhatsApp or email me directly.",
      );
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
              [ 05 ] Contact
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              Let's build <span className="text-gradient">something rare</span>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
              Available for freelance work on Fiverr. Drop a quick note about
              your project — or message me on WhatsApp for the fastest reply.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:gogoi78ranjan@gmail.com"
                className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Email
                  </div>
                  <div className="text-base font-medium break-all">
                    gogoi78ranjan@gmail.com
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    WhatsApp
                  </div>
                  <div className="text-base font-medium">+91 60001 75974</div>
                </div>
              </a>

              <a
                href="tel:+919101780140"
                className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Call
                  </div>
                  <div className="text-base font-medium">+91 91017 80140</div>
                </div>
              </a>

              <div className="flex items-center gap-3 pt-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="text-sm text-foreground/80">
                  Currently accepting new projects
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {socials.map((s) => {
                  const Icon = s.Icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative glass-panel rounded-3xl p-8 md:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
                    >
                      <Check
                        className="w-8 h-8 text-primary"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                      Message delivered.
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                      Your message just landed in my inbox. I'll be in touch
                      within one business day.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-sm text-primary hover:underline"
                      >
                        Send another message
                      </button>
                      <span className="text-muted-foreground/40">·</span>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
                        Continue on WhatsApp
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                      >
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-background/60 border border-border focus:border-primary/60 focus:bg-background/80 outline-none text-foreground placeholder:text-muted-foreground/50 transition-all"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-2">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-lg bg-background/60 border border-border focus:border-primary/60 focus:bg-background/80 outline-none text-foreground placeholder:text-muted-foreground/50 transition-all"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                      >
                        Project brief
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-primary/60 focus:bg-background/80 outline-none text-foreground placeholder:text-muted-foreground/50 transition-all resize-none"
                        placeholder="Tell me about your project, timeline, and budget."
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive mt-2">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      >
                        <AlertCircle
                          className="w-4 h-4 mt-0.5 shrink-0"
                          strokeWidth={2}
                        />
                        <span className="leading-relaxed">{submitError}</span>
                      </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex items-center justify-center gap-2 h-12 flex-1 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Sending..." : "Send message"}
                        <Send
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={2}
                        />
                      </button>
                      <a
                        href={buildWhatsAppLink(
                          form.name,
                          form.email,
                          form.message,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 h-12 sm:flex-none rounded-lg glass-panel px-6 text-sm font-medium text-foreground hover:bg-muted/50 hover:border-primary/40 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" strokeWidth={2} />
                        WhatsApp instead
                      </a>
                    </div>

                    <p className="text-xs text-muted-foreground/70 pt-1">
                      Form delivered straight to gogoi78ranjan@gmail.com.
                      WhatsApp is the fastest backup channel.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
