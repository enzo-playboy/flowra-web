import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

    // Scroll-driven fade out with parallax
    gsap.to(content, {
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(5,5,5,0.7) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      <div
        ref={contentRef}
        className="relative text-center px-6 max-w-5xl mx-auto"
        style={{ zIndex: 2 }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/80">
            Inteligencia Artificial para seu Negocio
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display font-medium text-white leading-none tracking-tight mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
          }}
        >
          Volte a ter tempo
          <br />
          <span className="text-white/60">com os Agentes</span>
          <br />
          <span className="text-white/30">da Flowra</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Ative uma frota de Agentes de IA integrados ao seu sistema para
          resolver chamados e fechar vendas de forma automatica
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => document.getElementById('implementation')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Comece agora - ver implementação"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 bg-transparent text-white font-body text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
          >
            Comece Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          <button 
            onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Ver nossa história e manifesto"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white/80 font-body text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-500 cursor-pointer"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            Ver Historia
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 2 }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          Role para baixo
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
