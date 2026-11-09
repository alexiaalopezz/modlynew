import React from 'react';
import { ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08090b] text-zinc-400 text-xs border-t border-zinc-800/80">
      {/* Upper Footer Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-zinc-800/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">Envíos Exprés 24-48h</p>
              <p className="text-[11px] text-zinc-500">A domicilio en península y baleares.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">Marcas Auténticas</p>
              <p className="text-[11px] text-zinc-500">Garantía oficial y embalaje original.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">30 Días de Devolución</p>
              <p className="text-[11px] text-zinc-500">Devoluciones fáciles y sin preguntas.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HeartHandshake className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">Atención al Cliente</p>
              <p className="text-[11px] text-zinc-500">Soporte rápido en soporte@modly.es</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <a href="/" className="text-xl font-bold font-heading text-white tracking-wider flex items-center gap-2">
              <span>Modly</span>
              <span className="text-orange-500 text-xs font-sans font-semibold">Halloween</span>
            </a>
            <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
              La plataforma de moda donde encuentras las mejores marcas y colecciones cápsula para cada momento del año. Tu estilo, a un solo clic.
            </p>
            <div className="pt-2 flex items-center gap-2 text-zinc-300 font-mono text-[11px]">
              <span>ESPAÑA</span>
              <span>·</span>
              <span>EUR (€)</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-xs uppercase tracking-wider">Colección</h4>
            <ul className="space-y-2">
              <li><a href="#ofertas" className="hover:text-orange-400 transition-colors">Ofertas de Miedo</a></li>
              <li><a href="#categorias" className="hover:text-orange-400 transition-colors">Ropa y Abrigos</a></li>
              <li><a href="#categorias" className="hover:text-orange-400 transition-colors">Zapatillas Dark Edition</a></li>
              <li><a href="#categorias" className="hover:text-orange-400 transition-colors">Bolsos y Accesorios</a></li>
              <li><a href="#categorias" className="hover:text-orange-400 transition-colors">Cosmética Nocturna</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-xs uppercase tracking-wider">Marcas</h4>
            <ul className="space-y-2">
              <li><a href="#marcas" className="hover:text-orange-400 transition-colors">Nike</a></li>
              <li><a href="#marcas" className="hover:text-orange-400 transition-colors">Zara Noir</a></li>
              <li><a href="#marcas" className="hover:text-orange-400 transition-colors">Ralph Lauren</a></li>
              <li><a href="#marcas" className="hover:text-orange-400 transition-colors">Curly Care</a></li>
              <li><a href="#marcas" className="hover:text-orange-400 transition-colors">New Balance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-200 mb-3 text-xs uppercase tracking-wider">Ayuda & Términos</h4>
            <ul className="space-y-2">
              <li><a href="#garantias" className="hover:text-orange-400 transition-colors">Estado de Envíos</a></li>
              <li><a href="#garantias" className="hover:text-orange-400 transition-colors">Guía de Tallas</a></li>
              <li><a href="#garantias" className="hover:text-orange-400 transition-colors">Política de Devolución</a></li>
              <li><a href="#garantias" className="hover:text-orange-400 transition-colors">Aviso Legal</a></li>
              <li><a href="#garantias" className="hover:text-orange-400 transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>© 2026 Modly. Tu estilo, a un solo clic. Edición Especial Halloween.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Apple Pay</span>
            <span>·</span>
            <span>Klarna</span>
            <span>·</span>
            <span>Bizum</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
