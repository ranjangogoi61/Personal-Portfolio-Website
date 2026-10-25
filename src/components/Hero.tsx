import {
  Suspense,
  Component,
  useEffect,
  useRef,
  useState,
  memo,
  lazy,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useLowPowerDevice } from "@/hooks/use-low-power-device";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const Hero3D = lazy(() => import("./Hero3DScene"));

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    /* swallow */
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function GradientFallback() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[60vw] max-w-[700px] aspect-square rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-transparent blur-[80px]" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary/30 blur-[100px]" />
    </div>
  );
}

function Hero3DScene() {
  const lowPower = useLowPowerDevice();
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lowPower || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(detectWebGL());
  }, [lowPower, reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(node);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled]);

  if (!enabled) return <GradientFallback />;

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <WebGLBoundary fallback={<GradientFallback />}>
        <Suspense fallback={<GradientFallback />}>
          {visible ? <Hero3D /> : <GradientFallback />}
        </Suspense>
      </WebGLBoundary>
    </div>
  );
}

export const Hero = memo(function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60 pointer-events-none">
        <Hero3DScene />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              Available for freelance work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight text-foreground mb-6"
          >
            Crafting immersive <br />
            <span className="text-gradient">2D & 3D web</span> <br />
            experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl"
          >
            I build premium, high-performance web applications that blur the
            line between software and art. Let's build something unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-7 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View Work
            </a>
            <a
              href="/ranjan-gogoi-resume.pdf"
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md glass-panel px-7 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted/50 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Download className="w-4 h-4" strokeWidth={2} />
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-12 items-center justify-center rounded-md px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Let's Talk →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
