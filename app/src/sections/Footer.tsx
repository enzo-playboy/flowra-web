import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative py-20 px-6 border-t border-white/10"
      style={{ zIndex: 20, background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-display font-medium text-white text-2xl mb-4 tracking-tight">
              Flowra Labs
            </h3>
            <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-6">
              Fluid Intelligence
            </p>
            <p className="font-body text-white/30 text-sm leading-relaxed max-w-xs">
              Transformando negocios com agentes de IA autonomos.
              Seu tempo e precioso. Devolva-o a sua empresa.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:oi@flowra.ai"
                  className="font-body text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  oi@flowra.ai
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="font-body text-white/40 text-sm">
                  Sao Paulo, Brasil
                </span>
              </li>
              <li>
                <span className="font-mono text-xs text-white/30">
                  CNPJ: 00.000.000/0001-00
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">
              Links
            </h4>
            <ul className="space-y-3">
              {['Agentes', 'Implementacao', 'Custos', 'Valores', 'Contato'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="font-body text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/20">
            &copy; {new Date().getFullYear()} Flowra Labs. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-wider text-white/20 hover:text-white/40 transition-colors"
            >
              Termos
            </a>
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-wider text-white/20 hover:text-white/40 transition-colors"
            >
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
