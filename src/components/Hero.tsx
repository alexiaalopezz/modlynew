import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, ShieldCheck, Truck, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreOffers: () => void;
  onOpenMystery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreOffers, onOpenMystery }) => {
  // Live countdown timer to Halloween Night (October 31st midnight)
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 14,
    minutes: 32,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20 border-b border-zinc-800/60 halloween-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, subtext, countdown, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
              <span>Modly Nocturne</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Edición Especial Halloween</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Hasta 31 de Octubre</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Tu estilo más <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">oscuro y audaz</span>, a un solo clic.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              El evento de Halloween de Modly ya está aquí: prendas góticas de alta costura, zapatillas de edición limitada, bolsos de noche y elixires con <strong>descuentos de hasta el 40%</strong>. Envíos exprés a domicilio en 24-48h.
            </p>

            {/* Live Countdown to Halloween */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/90 max-w-xl backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 mb-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-orange-400">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Cierre de Ofertas de Halloween</span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">31 Octubre · 23:59h</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-zinc-950/70 rounded-lg py-2 border border-zinc-800/50">
                  <span className="block text-2xl font-bold font-mono text-white tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Días</span>
                </div>
                <div className="bg-zinc-950/70 rounded-lg py-2 border border-zinc-800/50">
                  <span className="block text-2xl font-bold font-mono text-white tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Horas</span>
                </div>
                <div className="bg-zinc-950/70 rounded-lg py-2 border border-zinc-800/50">
                  <span className="block text-2xl font-bold font-mono text-white tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Min</span>
                </div>
                <div className="bg-zinc-950/70 rounded-lg py-2 border border-orange-500/30 bg-orange-950/20">
                  <span className="block text-2xl font-bold font-mono text-orange-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-orange-300/80 uppercase tracking-wider">Seg</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreOffers}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-orange-900/30 whitespace-nowrap cursor-pointer"
              >
                <span>Explorar Ofertas de Miedo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenMystery}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 hover:text-white rounded-xl border border-zinc-700/80 transition-all whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Truco o Trato: Cupón Sorpresa</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
              <img
                src={HERO_IMAGE}
                alt="Colección Modly Halloween Nocturne en las calles iluminadas por calabazas"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* In-image label */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Look de Campaña «Midnight Trench»</p>
                  <p className="text-zinc-400 text-[11px]">Zara Noir & Calzado Track · Ya disponible</p>
                </div>
                <span className="font-mono text-orange-400 font-bold text-sm bg-orange-950/60 px-2 py-1 rounded border border-orange-500/30">
                  -34% OFF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency 4-Item Proof / Value Strip below hero */}
        <div id="garantias" className="mt-12 pt-8 border-t border-zinc-800/70 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-orange-600/10 text-orange-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Envíos en 24-48h</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Recibe tu look antes de la noche del 31.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-orange-600/10 text-orange-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Descuentos de Miedo</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Hasta -40% en selección especial de marcas.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-orange-600/10 text-orange-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Marcas 100% Oficiales</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Nike, Ralph Lauren, Zara, Curly originales.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-orange-600/10 text-orange-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Devolución en 30 días</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Prueba en casa sin compromiso alguno.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
