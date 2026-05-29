import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Heart, Eye, Zap, Shield, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Excelencia',
    description: 'So entregamos o que esta acima do padrao. Cada detalhe importa.',
    icon: Star,
  },
  {
    title: 'Paixao',
    description: 'Amamos o que fazemos. Essa energia se reflete em cada projeto.',
    icon: Heart,
  },
  {
    title: 'Transparencia',
    description: 'Sem letras miudas, sem promessas vazias. Dados claros e honestos.',
    icon: Eye,
  },
  {
    title: 'Agilidade',
    description: 'Movemos rapido sem quebrar coisas. Iteramos, melhoramos, entregamos.',
    icon: Zap,
  },
  {
    title: 'Seguranca',
    description: 'Seus dados sao sagrados. Criptografia de ponta a ponta, sempre.',
    icon: Shield,
  },
  {
    title: 'Impacto Global',
    description: 'Pensamos grande. Nosso objetivo e transformar negocios em todo o mundo.',
    icon: Globe,
  },
];

export default function FinalValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.08,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ zIndex: 20, background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              07 / Nossos Valores
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <h2
            className="font-display font-medium text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            O que nos move
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group p-10 bg-[#050505] hover:bg-white/[0.03] transition-colors duration-500"
              >
                <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors">
                  <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-medium text-white text-lg mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="font-body text-white/40 text-lg mb-8">
            Pronto para transformar seu negocio?
          </p>
          <button className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-body text-sm uppercase tracking-wider hover:bg-white/90 transition-all duration-300">
            Comece sua jornada
            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
