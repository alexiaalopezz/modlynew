import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="categorias" className="py-16 bg-zinc-950/80 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              Navega la Colección
            </span>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white font-heading">
              Explora por Categoría
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm">
            Encuentra prendas y accesorios seleccionados para destacar tanto de día como de noche.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/30"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Tag */}
              <span className="absolute top-4 left-4 text-[10px] font-mono font-bold text-orange-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-orange-500/30">
                {cat.badge}
              </span>

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-orange-600 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Text info */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white font-heading group-hover:text-orange-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
