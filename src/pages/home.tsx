import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <div className="noise-bg" />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
