import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './sections/HeroSection';
import HorizontalManifesto from './sections/HorizontalManifesto';
import KineticValues from './sections/KineticValues';
import HorizontalValues from './sections/HorizontalValues';
import ImplementationSection from './sections/ImplementationSection';
import AgentProducts from './sections/AgentProducts';
import NossaFilosofia from './sections/NossaFilosofia';
import CostReduction from './sections/CostReduction';
import FinalValues from './sections/FinalValues';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <div className="relative">
      {/* Background video layer - shared between hero and horizontal sections */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, opacity: 0.4 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <HorizontalManifesto />
        <KineticValues />
        <HorizontalValues />
        <ImplementationSection />
        <AgentProducts />
        <NossaFilosofia />
        <CostReduction />
        <FinalValues />
        <Footer />
      </div>
    </div>
  );
}

export default App;
