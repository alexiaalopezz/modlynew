import React, { useState } from 'react';
import { Gift, Sparkles, Check, Flame, ArrowRight } from 'lucide-react';

interface MysteryScratchProps {
  onApplyCoupon: (code: string) => void;
}

export const MysteryScratch: React.FC<MysteryScratchProps> = ({ onApplyCoupon }) => {
  const [revealed, setRevealed] = useState(false);
  const [code] = useState('TRUCO25');
  const [applied, setApplied] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleApply = () => {
    onApplyCoupon(code);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <section id="truco-trato" className="py-12 bg-gradient-to-b from-[#0c0d11] via-zinc-950 to-[#0c0d11] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-zinc-900 to-orange-950/40 p-6 sm:p-10 text-center">
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              <span>Dinámica Especial de Halloween</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              ¿Truco o Trato? Desbloquea tu descuento secreto
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Toca el caldero misterioso para descubrir un cupón de descuento adicional válido para toda la colección de Halloween.
            </p>

            {/* Interactive Scratch / Reveal Box */}
            <div className="pt-4 flex flex-col items-center justify-center">
              {!revealed ? (
                <button
                  onClick={handleReveal}
                  className="group relative px-8 py-5 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border-2 border-dashed border-orange-500/50 hover:border-orange-500 transition-all cursor-pointer shadow-lg shadow-orange-950/50 active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">🎃</span>
                    <div className="text-left">
                      <p className="text-xs uppercase font-mono tracking-widest text-orange-400">Toca para abrir</p>
                      <p className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                        Revelar Cupón Sorpresa
                      </p>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-zinc-900/90 border border-orange-500/40 shadow-xl shadow-orange-950/40 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-3 px-4 py-2 bg-black/60 rounded-xl border border-zinc-700">
                    <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                    <div className="text-left">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono">Cupón secreto</span>
                      <p className="text-xl font-bold font-mono text-orange-400 tracking-wider">
                        {code}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      -25% EXTRA
                    </span>
                  </div>

                  <button
                    onClick={handleApply}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                      applied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/40'
                    }`}
                  >
                    {applied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Cupón Aplicado a tu Cesta!</span>
                      </>
                    ) : (
                      <>
                        <span>Aplicar al Carrito</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-zinc-500">
              * Válido en compras superiores a 30€. Canjeable hasta el 31 de octubre a las 23:59h.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
