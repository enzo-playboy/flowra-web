import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Check,
  Tag,
  X,
  MessageCircle,
  Monitor,
  TrendingUp,
  Phone,
  Users,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  status: 'ativo' | 'sob-consulta' | 'alpha';
  icon: React.ElementType;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Agente WhatsApp',
    tagline: 'Venda no maior app do Brasil',
    setup: 'Sob consulta',
    monthly: 'Sob consulta',
    description:
      'Agente de IA no WhatsApp que atende, qualifica e vende sozinho. Seu cliente manda uma mensagem e ja recebe resposta em segundos, 24 horas por dia. Como cada negocio e unico, fazemos uma reuniao para entender suas necessidades.',
    features: [
      'Respostas inteligentes 24/7',
      'Qualificacao de leads automatica',
      'Escalonamento para humanos',
      'Dashboard de conversas',
      'Portal do Cliente',
    ],
    cta: 'Quero no WhatsApp',
    highlighted: false,
    status: 'sob-consulta',
    icon: MessageCircle,
  },
  {
    id: 2,
    name: 'Agente Instagram',
    tagline: 'Converta seu Direct em vendas',
    setup: 'Sob consulta',
    monthly: 'Sob consulta',
    description:
      'Agente de IA no Instagram Direct. Nunca mais deixe um story, comentario ou mensagem sem resposta. Venda enquanto dorme. Como cada negocio e unico, fazemos uma reuniao para entender suas necessidades.',
    features: [
      'Respostas no Direct 24/7',
      'Qualificacao de leads automatica',
      'Escalonamento para humanos',
      'Dashboard de conversas',
      'Portal do Cliente',
    ],
    cta: 'Quero no Instagram',
    highlighted: false,
    status: 'sob-consulta',
    icon: MessageCircle,
  },
  {
    id: 3,
    name: 'Sites Flowra',
    tagline: 'Sua vitrine 24 horas',
    setup: 'Sob consulta',
    monthly: 'Sob consulta',
    description:
      'Site rapido e bonito. Desde cardapios digitais ate landing pages. Na Flowra Labs, cada projeto e unico. Nao cobramos valores no comeco — entendemos o que voce precisa na reuniao e estimamos um valor justo para voce em 1 a 2 dias.',
    features: [
      'Site sob medida (1-3 paginas)',
      'Otimizado para SEO e velocidade',
      'Design responsivo',
      'Hospedagem + manutencao inclusa',
      'Portal do Cliente',
      'Suporte tecnico',
    ],
    cta: 'Quero meu Site',
    highlighted: false,
    status: 'sob-consulta',
    icon: Monitor,
  },
  {
    id: 4,
    name: 'Flowra Traffic Agent',
    tagline: 'Gestor de trafego autonomo',
    setup: 'Alpha Fechado',
    monthly: 'Em breve',
    description:
      'Gestor de trafego autonomo e inteligente para campanhas de Facebook Ads. Cria audiencias, redige copies, otimiza orcamentos e analisa resultados com Claude.',
    features: [
      'Criacao e testes A/B automaticos',
      'Otimizacao diaria de orcamentos',
      'Relatorios inteligentes via Claude',
      'Acesso prioritario na fila',
    ],
    cta: 'Entrar na Fila',
    highlighted: false,
    status: 'alpha',
    icon: TrendingUp,
  },
  {
    id: 5,
    name: 'Flowra Agent Voice',
    tagline: 'Assistente de voz IA',
    setup: 'Alpha Fechado',
    monthly: 'Em breve',
    description:
      'Assistente de voz autonomo baseado em IA generativa. Realiza e recebe chamadas telefonicas reais, responde duvidas com tom natural e agenda compromissos 24/7.',
    features: [
      'Conversacao por voz <1s latencia',
      'Sync Google Calendar',
      'Treinamento por texto/PDF',
      'Acesso prioritario na fila',
    ],
    cta: 'Entrar na Fila',
    highlighted: false,
    status: 'alpha',
    icon: Phone,
  },
  {
    id: 6,
    name: 'Flowra Agent Squad',
    tagline: 'Time multi-agentes',
    setup: 'Alpha Fechado',
    monthly: 'Em breve',
    description:
      'Um time completo de agentes autonomos hiper especializados operando em sincronia. Do marketing ao suporte tecnico 24h, escala sem limites.',
    features: [
      'Coordenacao fluida multi-agentes',
      'Execucao autonoma de fluxos',
      'Escala 24/7 operacional',
      'Acesso prioritario na fila',
    ],
    cta: 'Entrar na Fila',
    highlighted: false,
    status: 'alpha',
    icon: Users,
  },
];

interface LeadForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  productType: string;
}

export default function CostReduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    productType: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (product: Product) => {
    if (product.status === 'ativo') {
      setSelectedProduct(product);
      setLeadForm(prev => ({ ...prev, productType: product.name }));
      setSubmitted(false);
    } else if (product.status === 'alpha') {
      setSelectedProduct(product);
      setLeadForm(prev => ({ ...prev, productType: product.name }));
      setSubmitted(false);
    } else {
      // sob-consulta -> WhatsApp
      window.open(
        'https://wa.me/55SEUNUMERO?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20' +
          encodeURIComponent(product.name),
        '_blank'
      );
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isAlpha = selectedProduct?.status === 'alpha';
  const Icon = selectedProduct ? selectedProduct.icon : null;

  return (
    <section
      ref={sectionRef}
      id="custos"
      className="relative py-32 px-6"
      style={{ zIndex: 20, background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              06 / Investimento
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <h2
            className="font-display font-medium text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            Nossos produtos
            <br />
            <span className="text-white/50">e seus investimentos</span>
          </h2>
          <p className="font-body text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada produto foi pensado para resolver um problema real. Como cada negocio e unico,{' '}
            <span className="text-white/80">todos os valores sao sob consulta</span>. Marcamos uma reuniao,
            entendemos suas necessidades e enviamos uma proposta em ate 48 horas.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {products.map((product, index) => {
            const ProductIcon = product.icon;
            return (
              <div
                key={product.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onClick={() => handleCardClick(product)}
                className={`group relative p-6 rounded-2xl border flex flex-col h-full transition-all duration-500 cursor-pointer ${
                  product.highlighted
                    ? 'border-white/30 bg-white/[0.05] hover:bg-white/[0.07]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  {product.status === 'alpha' ? (
                    <span className="px-2 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-[9px] uppercase tracking-wider text-amber-400">
                      Alpha Fechado
                    </span>
                  ) : product.status === 'sob-consulta' ? (
                    <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-wider text-white/40">
                      Sob Consulta
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                      Disponivel
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-4 group-hover:border-white/30 transition-colors">
                  <ProductIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </div>

                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-display font-medium text-white text-lg mb-1 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-white/40">
                    {product.tagline}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-1">
                      Setup
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-medium text-white text-xl">
                        {product.setup}
                      </span>
                      {product.status === 'ativo' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                          <Tag className="w-3 h-3" />
                          -15% a vista
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-1">
                      Mensalidade
                    </span>
                    <span className="font-display font-medium text-lg text-emerald-400">
                      {product.monthly}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-white/50 text-sm leading-relaxed mb-4 flex-grow">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${product.highlighted ? 'text-emerald-400' : 'text-white/40'}`} />
                      <span className="font-body text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full group flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border font-body text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    product.highlighted
                      ? 'border-white/30 bg-white text-black hover:bg-white/90'
                      : product.status === 'alpha'
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                      : 'border-white/10 bg-transparent text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="text-center">
          <p className="font-body text-white/30 text-sm mb-4">
            Nao tem certeza de qual produto escolher?
          </p>
          <button
            onClick={() => window.open('https://wa.me/55SEUNUMERO?text=Olá!%20Quero%20uma%20consultoria%20gratuita.', '_blank')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white/80 font-body text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-500 cursor-pointer"
          >
            Consultoria Gratuita
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-4 ${
                    isAlpha ? 'border-amber-500/20 bg-amber-500/10' : 'border-emerald-500/20 bg-emerald-500/10'
                  }`}>
                    {isAlpha ? (
                      <Sparkles className="w-7 h-7 text-amber-400" />
                    ) : (
                      Icon && <Icon className="w-7 h-7 text-emerald-400" />
                    )}
                  </div>
                  <h3 className="font-display font-medium text-white text-2xl mb-2 tracking-tight">
                    {isAlpha ? 'Fila de Espera' : selectedProduct.name}
                  </h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed">
                    {isAlpha
                      ? `O ${selectedProduct.name} esta em desenvolvimento ativo. Cadastre-se para ser um dos primeiros a ter acesso.`
                      : 'Preencha seus dados e nosso time entra em contato em ate 24 horas para ativar seu produto.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-body focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-body focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-body focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.company}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-body focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                      Como podemos ajudar? (opcional)
                    </label>
                    <textarea
                      value={leadForm.message}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-body focus:border-white/30 focus:outline-none transition-colors resize-none"
                      placeholder="Conte um pouco sobre o seu negocio..."
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl border font-body text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isAlpha
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    {isAlpha ? 'Entrar na Fila' : 'Quero meu Produto'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-6 ${
                  isAlpha ? 'border-amber-500/20 bg-amber-500/10' : 'border-emerald-500/20 bg-emerald-500/10'
                }`}>
                  <Check className={`w-8 h-8 ${isAlpha ? 'text-amber-400' : 'text-emerald-400'}`} />
                </div>
                <h3 className="font-display font-medium text-white text-2xl mb-3 tracking-tight">
                  {isAlpha ? 'Voce esta na fila!' : 'Solicitacao enviada!'}
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {isAlpha
                    ? `Assim que o ${selectedProduct.name} estiver disponivel, voce sera um dos primeiros a saber.`
                    : `Nosso time vai entrar em contato em ate 24 horas para ativar seu ${selectedProduct.name}.`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
