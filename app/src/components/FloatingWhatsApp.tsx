import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/55SEUNUMERO?text=Olá!%20Quero%20saber%20mais%20sobre%20os%20produtos%20Flowra."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-[9999] group"
    >
      <div className="relative">
        {/* Pulse animation ring — reduced motion aware */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping motion-reduce:animate-none" />
        
        {/* Main button */}
        <div className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 cursor-pointer">
          <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
        
        {/* Tooltip label */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-body whitespace-nowrap">
            Fale no WhatsApp
          </span>
        </div>
      </div>
    </a>
  );
}
