import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialSection from "@/components/SocialSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-amber-400/30 selection:text-white overflow-x-hidden">
      {/* Minimal Ambient Background */}
      <StarBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Streamlined Sections */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <SocialSection />
      </div>

      {/* Floating Actions */}
      <FloatingActions />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
