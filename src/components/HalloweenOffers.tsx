import React, { useState, useMemo } from 'react';
import { Flame, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface HalloweenOffersProps {
  products: Product[];
  wishlistIds: string[];
  onToggleFavorite: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const HalloweenOffers: React.FC<HalloweenOffersProps> = ({
  products,
  wishlistIds,
  onToggleFavorite,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'discount' | 'price-asc' | 'price-desc' | 'rating'>('discount');

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory;
    });

    return result.sort((a, b) => {
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'price-asc') return a.salePrice - b.salePrice;
      if (sortBy === 'price-desc') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="ofertas" className="py-16 sm:py-20 bg-[#0c0d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Descuentos de Temporada</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Ofertas de Miedo
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
              Precios rebajados hasta un 40% en artículos de colección, zapatillas exclusivas y cosmética de autor. Unidades estrictamente limitadas.
            </p>
          </div>

          {/* Controls: Segmented Filter and Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Todas ({products.length})
              </button>
              <button
                onClick={() => setSelectedCategory('clothing')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'clothing'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Ropa
              </button>
              <button
                onClick={() => setSelectedCategory('sneakers')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'sneakers'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Calzado
              </button>
              <button
                onClick={() => setSelectedCategory('bags')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'bags'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Bolsos
              </button>
              <button
                onClick={() => setSelectedCategory('beauty')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'beauty'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Belleza
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-zinc-200 outline-none cursor-pointer pr-1"
              >
                <option value="discount" className="bg-zinc-900 text-white">Mayor descuento</option>
                <option value="price-asc" className="bg-zinc-900 text-white">Precio: menor a mayor</option>
                <option value="price-desc" className="bg-zinc-900 text-white">Precio: mayor a menor</option>
                <option value="rating" className="bg-zinc-900 text-white">Mejor valorados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={wishlistIds.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Free Shipping callout banner below offers */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-orange-950/30 via-zinc-900 to-orange-950/30 border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-2xl">📦</span>
            <div>
              <p className="text-sm font-semibold text-white">Envío gratuito garantizado</p>
              <p className="text-xs text-zinc-400">En todos los pedidos superiores a 50€ durante el especial de Halloween.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-orange-400 bg-orange-950/70 border border-orange-500/30 px-3 py-1.5 rounded-lg shrink-0">
            ENTREGA EN 24-48H
          </span>
        </div>
      </div>
    </section>
  );
};
