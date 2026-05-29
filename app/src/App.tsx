import { useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './sections/HeroSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Lazy load below-the-fold sections for faster initial paint
const HorizontalManifesto = lazy(() => import('./sections/HorizontalManifesto'));
const KineticValues = lazy(() => import('./sections/KineticValues'));
const HorizontalValues = lazy(() => import('./sections/HorizontalValues'));
const ImplementationSection = lazy(() => import('./sections/ImplementationSection'));
const AgentProducts = lazy(() => import('./sections/AgentProducts'));
const NossaFilosofia = lazy(() => import('./sections/NossaFilosofia'));
const CostReduction = lazy(() => import('./sections/CostReduction'));
const FinalValues = lazy(() => import('./sections/FinalValues'));
const Footer = lazy(() => import('./sections/Footer'));

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
        preload="auto"
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, opacity: 0.4 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <Suspense fallback={null}>
          <HorizontalManifesto />
          <KineticValues />
          <HorizontalValues />
          <ImplementationSection />
          <AgentProducts />
          <NossaFilosofia />
          <CostReduction />
          <FinalValues />
          <Footer />
        </Suspense>
      </div>
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
