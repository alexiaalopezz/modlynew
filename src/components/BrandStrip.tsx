import React from 'react';
import { BRANDS } from '../data/products';

export const BrandStrip: React.FC = () => {
  return (
    <section id="marcas" className="py-12 bg-[#0c0d11] border-b border-zinc-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase font-semibold text-orange-400 tracking-widest">
            Marcas Oficiales Colaboradoras
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white font-heading">
            Las Marcas que Amas con Ofertas de Halloween
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-850 transition-all text-center group"
            >
              <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="mt-1 text-[10px] font-mono font-medium text-orange-400/90">
                {brand.discount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
