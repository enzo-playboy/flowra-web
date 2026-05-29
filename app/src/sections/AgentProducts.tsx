import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle,
  ShoppingCart,
  Calendar,
  BarChart3,
  Headphones,
  Users,
  X,
  Send,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const agents = [
  {
    id: 1,
    name: 'Agente de Atendimento',
    description:
      'Responde perguntas frequentes, qualifica leads e encaminha conversas complexas para humanos. Disponivel 24/7, em qualquer canal.',
    icon: MessageCircle,
    features: ['WhatsApp, Instagram, Site', 'NLP avançado', 'Escalonamento inteligente'],
  },
  {
    id: 2,
    name: 'Agente de Vendas',
    description:
      'Conduz o cliente por toda a jornada de compra, desde o interesse ate o fechamento. Recomenda produtos e cruza dados em tempo real.',
    icon: ShoppingCart,
    features: ['Recomendação personalizada', 'Carrinho abandonado', 'Upsell automático'],
  },
  {
    id: 3,
    name: 'Agente de Agendamento',
    description:
      'Gerencia sua agenda, confirma presencas, reagenda automaticamente e envia lembretes. Integrado com Google Calendar e outros.',
    icon: Calendar,
    features: ['Confirmação automática', 'Reagendamento inteligente', 'Lembretes via SMS'],
  },
  {
    id: 4,
    name: 'Agente de Analytics',
    description:
      'Coleta, processa e visualiza dados do seu negocio. Gera relatorios automaticos e alerta sobre anomalies e oportunidades.',
    icon: BarChart3,
    features: ['Dashboards em tempo real', 'Alertas inteligentes', 'Previsões de demanda'],
  },
  {
    id: 5,
    name: 'Agente de Suporte',
    description:
      'Resolve problemas tecnicos, guia o usuario passo a passo e abre chamados quando necessario. Aprende com cada interacao.',
    icon: Headphones,
    features: ['Resolução automática', 'Base de conhecimento', 'Feedback contínuo'],
  },
  {
    id: 6,
    name: 'Agente de RH',
    description:
      'Automatiza triagem de curriculos, agrega entrevistas iniciais e responde duvidas de colaboradores sobre politicas internas.',
    icon: Users,
    features: ['Triagem de CVs', 'Entrevistas iniciais', 'Onboarding automático'],
  },
];

interface AgentDetailConfig {
  initialMessage: string;
  options: { question: string; answer: string }[];
}

const agentDetailsData: Record<number, AgentDetailConfig> = {
  1: {
    initialMessage: 'Olá! Sou o Agente de Atendimento da Flowra. Posso tirar dúvidas sobre a nossa solução de IA 24/7. O que gostaria de saber?',
    options: [
      { question: 'Em quais canais você atende?', answer: 'Atendo de forma nativa no WhatsApp, Instagram Direct, Facebook Messenger e chat do site, unificados em uma única plataforma.' },
      { question: 'Vocês transferem para humanos?', answer: 'Sim! Caso eu encontre uma dúvida complexa ou o cliente peça para falar com um atendente, transfiro o chamado imediatamente para o time humano com o histórico completo da conversa.' },
      { question: 'Como é feito o treinamento?', answer: 'Eu sou alimentado e treinado com a base de conhecimento do seu negócio, manuais de produto, histórico de atendimento anterior e FAQs.' }
    ]
  },
  2: {
    initialMessage: 'Olá! Identifiquei seu interesse na plataforma Flowra. Como posso impulsionar suas vendas e recuperar clientes hoje?',
    options: [
      { question: 'Como o agente faz recomendações?', answer: 'Eu analiso o comportamento de navegação, carrinho de compras e histórico do cliente para sugerir o produto ideal com descontos personalizados em tempo real.' },
      { question: 'Como funciona a recuperação de carrinho?', answer: 'Identifico quando um cliente abandona a compra e envio uma mensagem personalizada no WhatsApp oferecendo ajuda ou um cupom exclusivo para fechar o pedido.' },
      { question: 'O agente se integra com e-commerces?', answer: 'Sim! Integramos nativamente com Shopify, WooCommerce, Nuvemshop, VTEX e outros ERPs e gateways de pagamento.' }
    ]
  },
  3: {
    initialMessage: 'Olá! Sou o Agente de Agendamento. Posso gerenciar horários, reuniões e lembretes para sua equipe. O que você gostaria de simular?',
    options: [
      { question: 'Como funciona o reagendamento?', answer: 'Se um cliente precisar alterar a data, ele simplesmente me responde por texto e eu apresento as novas vagas disponíveis, atualizando a agenda na hora.' },
      { question: 'Vocês têm integração com quais calendários?', answer: 'Nos integramos nativamente com Google Calendar, Outlook Calendar, Calendly e diversos CRMs de mercado.' },
      { question: 'Vocês enviam lembretes de consulta/reunião?', answer: 'Sim! Enviamos lembretes automatizados de presença por WhatsApp e SMS, o que reduz o no-show (faltas) em até 80%.' }
    ]
  },
  4: {
    initialMessage: 'Alerta do Agente de Analytics: Detectei uma anomalia positiva de +25% nas vendas do checkout nas últimas 2 horas. Como posso ajudar com relatórios hoje?',
    options: [
      { question: 'Quais métricas você consegue monitorar?', answer: 'Monitoro funis de vendas, performance de conversão por canal, tempo médio de resposta de atendentes e anomalias operacionais.' },
      { question: 'Como são enviados os relatórios?', answer: 'Posso gerar e enviar PDFs ou dashboards interativos automaticamente direto no seu WhatsApp, Slack ou por E-mail.' },
      { question: 'Ele prevê demandas futuras?', answer: 'Sim! Analiso dados históricos de vendas e sazonalidade para gerar previsões de estoque e picos de atendimento.' }
    ]
  },
  5: {
    initialMessage: 'Olá! Sou o Assistente de Suporte Técnico. Qual problema ou chamado você gostaria de abrir hoje?',
    options: [
      { question: 'Como você resolve problemas técnicos?', answer: 'Analiso a documentação técnica, manuais de produto e histórico de chamados resolvidos para passar o passo a passo exato de solução ao cliente.' },
      { question: 'E se o problema for muito complexo?', answer: 'Abro automaticamente um ticket em plataformas como Jira, Zendesk ou Trello, coloco a prioridade adequada e encaminho para a engenharia.' },
      { question: 'O suporte aprende com novos chamados?', answer: 'Sim! Minha base é atualizada de forma contínua sempre que um novo bug ou problema é documentado pelo time técnico.' }
    ]
  },
  6: {
    initialMessage: 'Portal de RH Flowra: Olá! Posso ajudar com triagem de vagas, esclarecer dúvidas sobre benefícios ou guiar novos colaboradores.',
    options: [
      { question: 'Como funciona a triagem de currículos?', answer: 'O candidato envia o CV em PDF, eu extraio as informações de experiência e habilidades, comparo com a descrição da vaga e crio um ranking de compatibilidade em segundos.' },
      { question: 'Como você ajuda com o onboarding?', answer: 'Guio o novo funcionário passo a passo no envio de documentos, explico as ferramentas de trabalho e respondo dúvidas frequentes sobre férias e benefícios.' },
      { question: 'O colaborador pode tirar dúvidas trabalhistas?', answer: 'Sim! Consulto as políticas internas e a CLT cadastrada para responder dúvidas sobre férias, reembolso, feriados e benefícios corporativos.' }
    ]
  }
};

export default function AgentProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: 'agent' | 'user'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards staggered animation
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
            delay: (index % 3) * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-scroll chat window
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const openAgentModal = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    const config = agentDetailsData[agent.id];
    setChatMessages([
      { sender: 'agent', text: config?.initialMessage || 'Olá! Como posso ajudar você?' }
    ]);
    setIsTyping(false);
  };

  const closeAgentModal = () => {
    setSelectedAgent(null);
  };

  const handleQuestionClick = (question: string, answer: string) => {
    if (isTyping) return;
    
    // Add user question
    setChatMessages(prev => [...prev, { sender: 'user', text: question }]);
    setIsTyping(true);

    // Simulate natural typing delay
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { sender: 'agent', text: answer }]);
    }, 1200);
  };

  const ActiveIcon = selectedAgent ? selectedAgent.icon : null;
  const activeDetails = selectedAgent ? agentDetailsData[selectedAgent.id] : null;

  return (
    <section
      ref={sectionRef}
      id="agents"
      className="relative py-32 px-6"
      style={{ zIndex: 20, background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              05 / Nossos Agentes
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
            Uma frota de Agentes
            <br />
            <span className="text-white/50">para cada necessidade</span>
          </h2>
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onClick={() => openAgentModal(agent)}
                className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors">
                  <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-display font-medium text-white text-xl mb-3 tracking-tight">
                  {agent.name}
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                  {agent.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {agent.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/40"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Simulated detail interaction tag */}
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-white/45 group-hover:text-white transition-colors">
                  <span>Simular Agente</span>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal Overlay */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
          <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl max-w-4xl w-full h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={closeAgentModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer z-55"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Details */}
            <div className="w-full md:w-[40%] p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-gradient-to-b from-white/[0.01] to-transparent">
              <div>
                {/* Icon wrapper */}
                <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-6">
                  {ActiveIcon && <ActiveIcon className="w-6 h-6 text-white" />}
                </div>
                {/* Title */}
                <h3 className="font-display font-medium text-white text-2xl mb-4 tracking-tight">
                  {selectedAgent.name}
                </h3>
                {/* Description */}
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
                  {selectedAgent.description}
                </p>
              </div>

              {/* Capabilities */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-3">
                  Tecnologias & Recursos
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-wider text-white/60"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Chat Simulator */}
            <div className="w-full md:w-[60%] flex flex-col justify-between bg-black/40 h-full">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.01]">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-white/70 uppercase tracking-wider">
                  Flowra Agent Simulator (Online)
                </span>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : ''
                    } animate-in slide-in-from-bottom-2 duration-300`}
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

                {/* Typing Indicator */}
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

              {/* Bottom Interaction Area */}
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
