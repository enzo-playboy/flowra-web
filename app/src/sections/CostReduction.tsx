import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, Clock, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    label: 'Reducao de custos operacionais',
    value: '68%',
    description: 'Menos gastos com atendimento e processos manuais',
    icon: TrendingDown,
  },
  {
    label: 'Tempo de resposta',
    value: '< 2s',
    description: 'Resposta instantanea em qualquer canal',
    icon: Clock,
  },
  {
    label: 'Produtividade da equipe',
    value: '+40%',
    description: 'Sua equipe foca no que realmente importa',
    icon: Users,
  },
  {
    label: 'Eficiencia de atendimento',
    value: '24/7',
    description: 'Atendimento ininterrupto, sem ferias ou fins de semana',
    icon: Zap,
  },
];

const slides = [
  {
    title: 'Custo Operacional',
    subtitle: 'Antes vs Depois',
    stat: '-68%',
    description: 'Reduza drasticamente seus gastos com equipe de atendimento',
    image: '/images/cost-reduction-render.jpg',
  },
  {
    title: 'Agentes de Vendas',
    subtitle: 'Conversao automatizada',
    stat: '+3x',
    description: 'Aumente sua taxa de conversao com agentes inteligentes',
    image: '/images/agent-site-render.jpg',
  },
  {
    title: 'Pipelines Neurais',
    subtitle: 'Automacao inteligente',
    stat: '< 2s',
    description: 'Respostas instantaneas com processamento neural avancado',
    image: '/images/neural-pipe-render.jpg',
  },
  {
    title: 'Escala Infinita',
    subtitle: 'Cresca sem limites',
    stat: '24/7',
    description: 'Atenda milhares de clientes simultaneamente',
    image: '/images/scaling-render.jpg',
  },
];

export default function CostReduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const ctx = gsap.context(() => {
      // Text entrance
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Gallery slides 3D animation
      slideRefs.current.forEach((slide, index) => {
        if (!slide || index === 0) return;

        gsap.fromTo(
          slide,
          { z: -3500 * index, filter: 'brightness(0.2)' },
          {
            z: 0,
            filter: 'brightness(1)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: slide,
              start: 'top center',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
              onEnter: () => animateSlideIn(slide),
              onLeave: () => animateSlideOut(slide),
              onEnterBack: () => animateSlideIn(slide),
              onLeaveBack: () => animateSlideOut(slide),
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  function animateSlideIn(slide: HTMLDivElement) {
    const img = slide.querySelector('.gallery-img') as HTMLElement;
    const ui = slide.querySelector('.gallery-ui') as HTMLElement;
    if (!img || !ui) return;

    gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.inOut' } })
      .fromTo(img, { scale: 1.4 }, { scale: 1 }, 0)
      .fromTo(
        ui,
        { rotationY: 45, rotationX: 10, filter: 'brightness(2)' },
        { rotationY: 0, rotationX: 0, filter: 'brightness(1)' },
        0
      );
  }

  function animateSlideOut(slide: HTMLDivElement) {
    const img = slide.querySelector('.gallery-img') as HTMLElement;
    const ui = slide.querySelector('.gallery-ui') as HTMLElement;
    if (!img || !ui) return;

    gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.inOut' } })
      .to(img, { scale: 0.8, filter: 'brightness(0.3)' }, 0)
      .to(ui, { rotationY: -45, rotationX: 10, filter: 'brightness(2)' }, 0);
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32"
      style={{ zIndex: 20, background: '#050505' }}
    >
      {/* Section header */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            06 / Reducao de Custos
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div ref={textRef}>
            <h2
              className="font-display font-medium text-white mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.0,
              }}
            >
              Reduza seus gastos
              <br />
              <span className="text-white/50">em ate 68%</span>
            </h2>
            <p className="font-body text-white/50 text-lg leading-relaxed max-w-lg">
              Nossos agentes substituem processos manuais caros e propensos a erros.
              Automatize seu atendimento, vendas e operacoes com inteligencia artificial
              de ponta e veja sua equipe focar no que realmente importa.
            </p>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
                >
                  <Icon className="w-5 h-5 text-white/40 mb-4" />
                  <div
                    className="font-display font-medium text-white mb-1"
                    style={{ fontSize: '2rem' }}
                  >
                    {metric.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">
                    {metric.label}
                  </div>
                  <p className="font-body text-white/30 text-xs">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Perspective Gallery */}
      <div ref={galleryRef} className="gallery-wrapper px-6">
        <div className="relative w-full h-[70vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(el) => { slideRefs.current[index] = el; }}
              className="gallery-slide"
              style={{ zIndex: slides.length - index }}
            >
              {/* Background image */}
              <div
                className="gallery-img absolute inset-0 rounded-2xl overflow-hidden"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* UI overlay */}
              <div className="gallery-ui rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                    {slide.subtitle}
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <div
                    className="font-display font-medium text-white mb-2"
                    style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.03em' }}
                  >
                    {slide.stat}
                  </div>
                  <h3
                    className="font-display font-medium text-white/90 mb-2"
                    style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
                  >
                    {slide.title}
                  </h3>
                  <p className="font-body text-white/50 text-sm max-w-md">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
