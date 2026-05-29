import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Zap, Cpu, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: 'O Relogio',
    subtitle: 'O tempo e seu maior ativo',
    description:
      'Cada segundo que sua equipe gasta com tarefas repetitivas e um segundo roubado da inovacao. A Flowra nasceu da obsesso por devolver esse tempo as empresas. Nossos agentes nao apenas automatizam, eles liberam o potencial humano para o que realmente importa.',
    icon: Clock,
    year: '2020',
  },
  {
    id: 2,
    title: 'A Mudanca',
    subtitle: 'O ponto de inflexao',
    description:
      'Quando a IA deixou de ser promessa e se tornou ferramenta, vimos uma oportunidade unica. Fundada por engenheiros obcecados por eficiencia, a Flowra Labs construiu a primeira plataforma de agentes autonomos para negocios no Brasil.',
    icon: Zap,
    year: '2021',
  },
  {
    id: 3,
    title: 'O Motor',
    subtitle: 'Tecnologia que transforma',
    description:
      'Nosso motor e uma arquitetura neural proprietaria que combina processamento de linguagem natural, aprendizado de maquina e automacao inteligente. Cada agente e treinado para entender o contexto do seu negocio e tomar decisoes em tempo real.',
    icon: Cpu,
    year: '2023',
  },
  {
    id: 4,
    title: 'O Horizonte',
    subtitle: 'Para onde vamos',
    description:
      'A meta e clara: tornar a inteligencia artificial acessivel a cada empresa brasileira. Queremos ser a infraestrutura invisivel que potencializa milhoes de negocios. O futuro nao e sobre IA substituir humanos, e sobre IA elevar humanos.',
    icon: Compass,
    year: '2026',
  },
];

export default function HorizontalManifesto() {
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
    <section ref={sectionRef} id="manifesto" className="horizontal-section" style={{ zIndex: 20 }}>
      {/* Section header */}
      <div className="absolute top-8 left-8 flex items-center gap-4" style={{ zIndex: 30 }}>
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          01 / Manifesto
        </span>
      </div>

      <div ref={containerRef} className="horizontal-container">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="glass-card">
              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                    {card.year}
                  </span>
                </div>
                <span className="font-mono text-xs text-white/30">
                  {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
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
              <p className="font-body text-white/60 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Card footer line */}
              <div className="mt-auto pt-8">
                <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
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
