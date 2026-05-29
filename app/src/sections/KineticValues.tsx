import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoText = `Na Flowra Labs, acreditamos que a tecnologia deve ser um rio que flui invisivelmente, irrigando cada aspecto do seu negocio sem que voce precise pensar nela. Nossos agentes de IA nao sao apenas chatbots ou automacoes simples. Sao sistemas inteligentes, capazes de aprender, adaptar e executar com precisao cirurgica. Cada linha de codigo que escrevemos e um passo em direcao a um futuro onde as empresas operam com eficiencia maxima, reduzindo custos e escalando sem limites. Nossos valores fundamentais sao a transparencia, a excelencia tecnica e o compromisso inabalavel com resultados mensuraveis. Nao vendemos promessas. Entregamos transformacao. A IA nao e o futuro. A IA e o presente, e estamos aqui para garantir que sua empresa esteja a frente da curva. Flowra Labs. Fluid Intelligence.`;

export default function KineticValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const wordsElements = container.querySelectorAll('.kinetic-word');
    if (wordsElements.length === 0) return;

    // Create a GSAP timeline with pinning for the entire section
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=185%', // Pins for a comfortable scroll length
        pin: true,
        scrub: 1, // Smoother scrub for "velvety" feel
        invalidateOnRefresh: true,
      },
    });

    // Stagger the word highlight with transition of opacity, color, and blur
    timeline.to(wordsElements, {
      opacity: 1,
      color: '#ffffff',
      filter: 'blur(0px)',
      stagger: 0.05,
      ease: 'none',
    });

    // Refresh ScrollTrigger to ensure correct placement of subsequent components
    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const words = manifestoText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="kinetic-wrapper relative flex flex-col justify-center items-start h-screen w-full select-none pl-[8%] pr-8"
      style={{ zIndex: 20, overflow: 'hidden' }}
    >
      {/* Soft ambient background glow */}
      <div className="absolute left-[10vw] w-[50vw] h-[50vw] rounded-full bg-white/[0.01] blur-[150px] pointer-events-none z-0" />

      {/* Section label */}
      <div className="absolute top-12 left-12 md:left-24 lg:left-36" style={{ zIndex: 30 }}>
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          02 / Principios
        </span>
      </div>

      {/* Kinetic text container */}
      <div
        ref={containerRef}
        className="kinetic-text w-full max-w-5xl text-left font-display font-medium text-2xl md:text-3xl lg:text-[2vw] leading-[1.6] tracking-tight relative z-10"
        style={{ '--width': '100%' } as React.CSSProperties}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="kinetic-word inline-block mr-[0.25em] transition-all duration-300"
            style={{ 
              opacity: 0.1, 
              color: '#3a3a3a', 
              filter: 'blur(4px)',
              willChange: 'opacity, filter, color'
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Modern gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-50 z-20" />
    </section>
  );
}
