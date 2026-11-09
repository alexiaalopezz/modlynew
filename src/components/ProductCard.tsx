import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [addedAnim, setAddedAnim] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, product.sizes[0] || 'Única');
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const savings = (product.originalPrice - product.salePrice).toFixed(2);

  return (
    <article className="group relative flex flex-col rounded-2xl border border-zinc-800/90 bg-zinc-900/60 overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/20">
      {/* Image container (65-75% visual prominence) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        {/* Subtle tag */}
        {product.tag && (
          <span className="absolute left-3 top-3 z-10 text-[10px] font-semibold uppercase tracking-wider text-orange-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-orange-500/30">
            {product.tag}
          </span>
        )}

        {/* Discount Badge */}
        <span className="absolute left-3 bottom-3 z-10 font-mono text-xs font-bold text-white bg-orange-600 px-2 py-0.5 rounded shadow">
          -{product.discountPercent}%
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-orange-400 hover:bg-black/90 transition-all cursor-pointer border border-white/10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? 'fill-orange-500 text-orange-500' : ''
            }`}
          />
        </button>

        {/* Product Image with Fallback */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer border border-zinc-600"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Rápida</span>
          </button>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Brand & Category in muted text */}
        <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-orange-400 uppercase tracking-wider text-[11px]">
            {product.brand}
          </span>
          <span className="text-zinc-500 text-[11px] font-mono">24-48h</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="mt-1.5 text-sm sm:text-base font-semibold text-white hover:text-orange-300 cursor-pointer transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Pricing row with Tabular Figures */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-white tabular-nums">
            {product.salePrice.toFixed(2)} €
          </span>
          <span className="text-xs text-zinc-500 line-through tabular-nums">
            {product.originalPrice.toFixed(2)} €
          </span>
          <span className="text-[11px] font-semibold text-emerald-400">
            Ahorras {savings} €
          </span>
        </div>

        {/* Rating & Review counts */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
          <div className="flex items-center text-orange-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-zinc-200">{product.rating.toFixed(1)}</span>
          <span className="text-zinc-500">({product.reviewCount})</span>
        </div>

        {/* Color swatches & Quick Add Button */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
                style={{ backgroundColor: color.hex }}
                className={`h-4 w-4 rounded-full border transition-all cursor-pointer ${
                  selectedColor === color.name
                    ? 'border-orange-400 ring-2 ring-orange-500/40 scale-110'
                    : 'border-zinc-700 opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Quick Add CTA */}
          <button
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-800 hover:bg-orange-600 text-zinc-200 hover:text-white'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Añadido</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
