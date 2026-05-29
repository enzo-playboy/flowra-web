import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Target, Heart, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const valueCards = [
  {
    id: 1,
    title: 'Seriedade',
    subtitle: 'Compromisso sem meias palavras',
    description:
      'A Flowra Labs e uma empresa seria, construida por profissionais que entendem que tecnologia de ponta exige responsabilidade. Cada projeto e tratado com o rigor de uma operacao critica. Nossos SLAs sao sagrados, nossa infraestrutura e redundante e nossa equipe esta sempre pronta.',
    icon: Shield,
    stat: '99.9%',
    statLabel: 'Uptime garantido',
  },
  {
    id: 2,
    title: 'Precisao',
    subtitle: 'Resultados mensuraveis',
    description:
      'Nao acreditamos em achismos. Cada agente que deployamos vem com metricas claras, dashboards em tempo real e relatórios de ROI. Se voce nao consegue medir, nao consegue melhorar. Por isso, a precisao esta no DNA de tudo que construimos.',
    icon: Target,
    stat: '3x',
    statLabel: 'Retorno medio em 90 dias',
  },
  {
    id: 3,
    title: 'Parceria',
    subtitle: 'Seu sucesso e o nosso',
    description:
      'Nao somos fornecedores. Somos parceiros estrategicos. Quando voce contrata a Flowra, ganha um time de especialistas obcecados pelo crescimento do seu negocio. Nosso time de customer success acompanha voce em cada etapa, garantindo que os agentes evoluam com sua empresa.',
    icon: Heart,
    stat: '200+',
    statLabel: 'Clientes atendidos',
  },
  {
    id: 4,
    title: 'Inovacao',
    subtitle: 'Sempre a frente',
    description:
      'O mundo da IA se move rapido. Muito rapido. Por isso, investimos 30% do nosso faturamento em P&D. Nossos engenheiros estao sempre testando novos modelos, novas arquiteturas e novas formas de extrair mais valor da inteligencia artificial. Com a Flowra, voce esta sempre na vanguarda.',
    icon: Rocket,
    stat: '30%',
    statLabel: 'Investimento em P&D',
  },
];

export default function HorizontalValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const scrollWidth = container.scrollWidth - section.offsetWidth;

    const tween = gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: self.progress,
            });
          }
        },
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="horizontal-section" style={{ zIndex: 20 }}>
      {/* Section header */}
      <div className="absolute top-8 left-8 flex items-center gap-4" style={{ zIndex: 30 }}>
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          03 / Valores
        </span>
      </div>

      <div ref={containerRef} className="horizontal-container">
        {valueCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="glass-card">
              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                </div>
                <span className="font-mono text-xs text-white/30">
                  {String(index + 1).padStart(2, '0')} / {String(valueCards.length).padStart(2, '0')}
                </span>
              </div>

              {/* Card content */}
              <h2
                className="font-display font-medium text-white mb-2"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {card.title}
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
                {card.subtitle}
              </p>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-8">
                {card.description}
              </p>

              {/* Stat */}
              <div className="mt-auto">
                <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display font-medium text-white"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                  >
                    {card.stat}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                    {card.statLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-8 left-8 right-8 h-px bg-white/10"
        style={{ zIndex: 30 }}
      >
        <div
          ref={progressRef}
          className="h-full bg-white/60 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  );
}
