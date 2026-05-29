import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Settings, Rocket, TrendingUp, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: 'Diagnostico',
    description:
      'Nossos especialistas analisam seus processos, identificam gargalos e mapeiam oportunidades de automacao. Entendemos seu negocio antes de propor qualquer solucao.',
    icon: MessageSquare,
    details: ['Mapeamento de processos', 'Analise de dados historicos', 'Identificacao de KPIs'],
  },
  {
    id: 2,
    title: 'Configuracao',
    description:
      'Customizamos cada agente para seu contexto especifico. Treinamos os modelos com seus dados, integrando com suas ferramentas existentes e garantindo uma transicao suave.',
    icon: Settings,
    details: ['Treinamento de modelos', 'Integracao de APIs', 'Customizacao de fluxos'],
  },
  {
    id: 3,
    title: 'Deploy',
    description:
      'Lancamos seus agentes em ambiente de producao com monitoramento completo. Acompanhamos cada interacao nos primeiros dias para garantir performance otimizada.',
    icon: Rocket,
    details: ['Deploy em nuvem', 'Monitoramento 24/7', 'Ajustes em tempo real'],
  },
  {
    id: 4,
    title: 'Evolucao',
    description:
      'Seus agentes aprendem continuamente. Mensalmente, nosso time revisa metricas, sugere melhorias e implementa novas capacidades para manter voce sempre a frente.',
    icon: TrendingUp,
    details: ['Relatorios mensais', 'Otimizacao continua', 'Novas features'],
  },
];

export default function ImplementationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="implementation"
      className="relative py-32 px-6"
      style={{ zIndex: 20, background: '#050505' }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            04 / Implementacao
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        <h2
          className="font-display font-medium text-white max-w-3xl"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
          }}
        >
          Como implementamos
          <br />
          <span className="text-white/50">seus Agentes</span>
        </h2>
      </div>

      {/* Steps grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 h-full">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <span className="font-mono text-4xl font-medium text-white/10 group-hover:text-white/20 transition-colors">
                    {String(step.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <h3
                  className="font-display font-medium text-white mb-3"
                  style={{ fontSize: '1.5rem', letterSpacing: '-0.01em' }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Details list */}
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-white/40 flex-shrink-0" />
                      <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
