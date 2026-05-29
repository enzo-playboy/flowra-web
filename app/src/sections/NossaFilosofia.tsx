import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const filosofiaText = `Nossa Filosofia. Nao acreditamos em pacotes prontos. Acreditamos em negocios unicos. Cada empresa que atendemos carrega uma historia, uma dor e uma ambicao diferentes. Nosso trabalho e sentar com voce, ouvir com atencao e desenhar uma solucao que so o seu negocio precisa. Nao entregamos tecnologia. Entregamos clareza, tempo de volta e a certeza de que voce nao esta perdendo mais vendas. A proposta chega em ate 48 horas. Feita sob medida. Como tudo que fazemos.`;

export default function NossaFilosofia() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const wordsElements = container.querySelectorAll('.kinetic-word');
    if (wordsElements.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(wordsElements, {
      opacity: 1,
      color: '#ffffff',
      filter: 'blur(0px)',
      stagger: 0.05,
      ease: 'none',
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const words = filosofiaText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="kinetic-wrapper relative flex flex-col justify-center items-start h-screen w-full select-none pl-[8%] pr-8"
      style={{ zIndex: 20, overflow: 'hidden' }}
    >
      {/* Soft ambient background glow */}
      <div className="absolute left-[10vw] w-[50vw] h-[50vw] rounded-full bg-white/[0.01] blur-[150px] pointer-events-none z-0" />

      {/* Section label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2" style={{ zIndex: 30 }}>
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          06 / Nossa Filosofia
        </span>
      </div>

      {/* Kinetic text container */}
      <div
        ref={containerRef}
        className="kinetic-text w-full max-w-4xl text-left font-display font-medium text-2xl md:text-3xl lg:text-[2vw] leading-[1.6] tracking-tight relative z-10"
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

      {/* CTA */}
      <div className="absolute bottom-24 left-12 md:left-24 lg:left-36 z-30">
        <button
          onClick={() =>
            window.open(
              'https://wa.me/55SEUNUMERO?text=Olá!%20Vi%20a%20seção%20Nossa%20Filosofia%20e%20quero%20uma%20proposta%20exclusiva%20para%20o%20meu%20negócio.',
              '_blank'
            )
          }
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white/80 font-body text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-500 cursor-pointer"
          aria-label="Solicitar proposta exclusiva via WhatsApp"
        >
          Quero uma proposta exclusiva
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>

      {/* Modern gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-50 z-20" />
    </section>
  );
}
