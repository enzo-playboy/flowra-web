import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor,
  MessageCircle,
  ArrowRight,
  Check,
  Zap,
  Sliders,
  X,
  Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Flowra Chat',
    badge: 'Combo Atendimento & Vendas',
    description:
      'O combo definitivo para seus canais sociais. Um único agente inteligente e integrado que atende, qualifica leads e vende no WhatsApp e no Instagram de forma unificada 24 horas por dia.',
    icon: MessageCircle,
    features: ['Integração WhatsApp & Instagram', 'Treinamento com Dados da Marca', 'Transição inteligente para humanos'],
    ctaText: 'Simular Flowra Chat',
  },
  {
    id: 2,
    name: 'Flowra Sites',
    badge: 'Presença Digital & Conversão',
    description:
      'Sua máquina de vendas na web. Criamos desde landing pages e cardápios digitais focados em conversão imediata até portais institucionais e sistemas internos com CRM sob medida.',
    icon: Monitor,
    features: ['Performance Ultrarrápida & SEO', 'Design Exclusivo e Responsivo', 'Integração com CRMs e APIs'],
    ctaText: 'Simular Sites',
  },
  {
    id: 3,
    name: 'Flowra Core',
    badge: 'Ecossistema Completo',
    description:
      'A solução máxima de automação e tecnologia. Une a infraestrutura robusta do Flowra Sites com o atendimento inteligente do Flowra Chat, operando em sincronia total com IA personalizada.',
    icon: Zap,
    features: ['Site Flowra + Combo Flowra Chat', 'IA Core Avançada Treinada', 'Painel Financeiro & Suporte VIP'],
    ctaText: 'Simular Flowra Core',
    popular: true,
  },
];

interface ProductDetailConfig {
  initialMessage: string;
  options: { question: string; answer: string }[];
}

const productDetailsData: Record<number, ProductDetailConfig> = {
  1: {
    initialMessage: 'Olá! Sou o Flowra Chat. Gerencio seu atendimento no WhatsApp e Instagram de forma unificada. Como posso te ajudar hoje?',
    options: [
      { question: 'Ele funciona nos dois canais ao mesmo tempo?', answer: 'Sim! As conversas do WhatsApp e Instagram são gerenciadas pela mesma inteligência artificial de forma centralizada e sincronizada.' },
      { question: 'E se o cliente quiser falar com um humano?', answer: 'O Flowra Chat faz a triagem inicial e qualificação. Caso o cliente solicite ou a conversa exija atenção humana, ele encaminha o atendimento com o histórico completo para a sua equipe.' },
      { question: 'Qual é o prazo de implementação?', answer: 'A configuração inicial e o treinamento da inteligência artificial com os dados da sua empresa levam em média de 3 a 5 dias úteis.' }
    ]
  },
  2: {
    initialMessage: 'Olá! Represento o Flowra Sites. Desenvolvemos páginas e sistemas focados em atrair clientes e converter visitas em faturamento. Quer saber mais?',
    options: [
      { question: 'Vocês fazem sistemas sob medida?', answer: 'Sim, criamos desde landing pages e cardápios digitais até CRMs e painéis administrativos completos conforme a necessidade da sua operação.' },
      { question: 'Os sites já vêm com inteligência artificial?', answer: 'Os sites são a base digital. A integração com os agentes de IA (como o Flowra Chat) é opcional e recomendada para automatizar o atendimento diretamente na sua nova página.' },
      { question: 'Como funciona a manutenção e SEO?', answer: 'Nossos sites são otimizados para máxima velocidade e indexação no Google. Oferecemos suporte contínuo para manter sua página segura e atualizada.' }
    ]
  },
  3: {
    initialMessage: 'Bem-vindo ao Flowra Core! Este é o ecossistema completo que unifica seus Sites com o Flowra Chat sob uma única inteligência integrada. O que gostaria de explorar?',
    options: [
      { question: 'Quais são as vantagens do ecossistema Core?', answer: 'Você ganha sinergia total: seu site atua como captador de leads e o assistente de chat qualifica e fecha vendas instantaneamente, tudo conectado a um banco de dados inteligente.' },
      { question: 'Eu tenho suporte prioritário no plano Core?', answer: 'Com certeza! Clientes Core possuem suporte prioritário dedicado e canal direto de comunicação para ajustes rápidos na inteligência artificial.' },
      { question: 'Como é feito o treinamento da IA Core?', answer: 'Treinamos a IA com toda a sua base de dados comerciais, catálogos, FAQs e histórico operacional para que ela entenda perfeitamente o funcionamento completo do seu negócio.' }
    ]
  }
};

export default function AgentProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const customSectionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: 'agent' | 'user'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });

      if (customSectionRef.current) {
        gsap.fromTo(
          customSectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: customSectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    const config = productDetailsData[product.id];
    if (config) {
      setChatMessages([{ sender: 'agent', text: config.initialMessage }]);
    } else {
      setChatMessages([]);
    }
    setIsTyping(false);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleQuestionClick = (question: string, answer: string) => {
    if (isTyping) return;
    setChatMessages(prev => [...prev, { sender: 'user', text: question }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { sender: 'agent', text: answer }]);
    }, 1200);
  };

  const ActiveIcon = selectedProduct ? selectedProduct.icon : null;
  const activeDetails = selectedProduct ? productDetailsData[selectedProduct.id] : null;

  return (
    <section
      ref={sectionRef}
      id="ecosistema"
      className="relative py-32 px-6"
      style={{ zIndex: 20, background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              05 / Nossos Produtos
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2
            className="font-display font-medium text-white max-w-4xl"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            Nossas soluções
            <br />
            <span className="text-white/50">e pacotes de tecnologia</span>
          </h2>
        </div>

        {/* 3 Main Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onClick={() => openProductModal(product)}
                className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col h-full ${
                  product.popular
                    ? 'border-white/20 bg-white/[0.04] shadow-[0_0_50px_rgba(255,255,255,0.02)]'
                    : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                {/* Popular Tag */}
                {product.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 font-mono text-[9px] uppercase tracking-wider text-white">
                      Mais Escolhido
                    </span>
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-white/30 transition-colors">
                  <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </div>

                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                  {product.badge}
                </span>

                <h3 className="font-display font-medium text-white text-2xl mb-4 tracking-tight">
                  {product.name}
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                  {product.description}
                </p>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-white/80" />
                      </div>
                      <span className="font-body text-xs text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/45 group-hover:text-white transition-colors">
                  <span>{product.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Projects Section */}
        <div
          ref={customSectionRef}
          className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                  <Sliders className="w-4 h-4 text-white/70" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Projetos Customizados
                </span>
              </div>
              <h3 className="font-display font-medium text-white text-2xl md:text-3xl mb-4 tracking-tight">
                Precisa de um plano sob medida?
              </h3>
              <p className="font-body text-white/50 text-sm md:text-base leading-relaxed">
                Se você precisa de apenas um agente específico (como o nosso gestor de tráfego inteligente ou assistente de voz autónomo) ou quer conectar seu site a apenas um canal, nós desenvolvemos um projeto totalmente personalizado para a sua operação.
              </p>
            </div>
            
            <a
              href="https://wa.me/5511999999999" // Link para o WhatsApp da empresa
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border border-white/20 bg-white text-black font-body text-xs uppercase tracking-wider hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              Falar com Consultor
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl max-w-4xl w-full h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={closeProductModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column */}
            <div className="w-full md:w-[40%] p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-gradient-to-b from-white/[0.01] to-transparent">
              <div>
                <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-6">
                  {ActiveIcon && <ActiveIcon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="font-display font-medium text-white text-2xl mb-4 tracking-tight">
                  {selectedProduct.name}
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-3">
                  Principais Recursos
                </span>
                <div className="flex flex-col gap-2">
                  {selectedProduct.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      <span className="font-body text-xs text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-[60%] flex flex-col justify-between bg-black/40 h-full">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.01]">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-white/70 uppercase tracking-wider">
                  Flowra Agent Simulator (Online)
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''} animate-in slide-in-from-bottom-2 duration-300`}
                  >
                    {msg.sender === 'agent' && (
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                        {ActiveIcon && <ActiveIcon className="w-4 h-4 text-white/60" />}
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-white text-black rounded-tr-none'
                          : 'border border-white/10 bg-white/5 text-white/80 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-3 animate-in fade-in duration-200">
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                      {ActiveIcon && <ActiveIcon className="w-4 h-4 text-white/60" />}
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-none border border-white/10 bg-white/5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="p-6 border-t border-white/10 bg-white/[0.01]">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 block mb-3">
                  Selecione uma pergunta para simular a resposta do agente:
                </span>
                <div className="flex flex-col gap-2">
                  {activeDetails?.options.map((opt, i) => {
                    const isAsked = chatMessages.some(m => m.text === opt.question);
                    return (
                      <button
                        key={i}
                        disabled={isTyping || isAsked}
                        onClick={() => handleQuestionClick(opt.question, opt.answer)}
                        className={`text-left px-4 py-3 rounded-xl border font-body text-xs transition-all flex items-center justify-between group cursor-pointer ${
                          isAsked
                            ? 'border-white/5 text-white/20 bg-transparent'
                            : 'border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04] text-white/70 hover:text-white'
                        }`}
                      >
                        <span>{opt.question}</span>
                        {!isAsked && (
                          <Send className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
