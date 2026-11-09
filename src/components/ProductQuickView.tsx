import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, ShieldCheck, Heart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string, quantity: number) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Única');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const savings = (product.originalPrice - product.salePrice).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar vista rápida"
          className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-zinc-400 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-zinc-950 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <span className="absolute left-4 top-4 font-mono text-xs font-bold text-white bg-orange-600 px-2.5 py-1 rounded shadow">
              -{product.discountPercent}% OFF
            </span>
          </div>

          {/* Right: Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Brand */}
              <div className="flex items-center justify-between text-xs text-orange-400 font-semibold uppercase tracking-wider">
                <span>{product.brand}</span>
                <span className="text-zinc-500 font-mono text-[11px]">En stock</span>
              </div>

              {/* Title */}
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white font-heading">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                <div className="flex items-center text-orange-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount} valoraciones de compradores)</span>
              </div>

              {/* Price row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {product.salePrice.toFixed(2)} €
                </span>
                <span className="text-sm text-zinc-500 line-through tabular-nums">
                  {product.originalPrice.toFixed(2)} €
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ahorras {savings} €
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Color: <span className="text-orange-400">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-orange-500 bg-orange-500/10 text-white'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-zinc-600"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4 space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Talla disponible:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-orange-500 bg-orange-600 text-white font-bold'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800 text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-2 text-zinc-300 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 font-mono font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-2 text-zinc-300 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/50'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Añadido a la Cesta!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Añadir a la Cesta</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleFavorite(product)}
                  aria-label="Guardar en favoritos"
                  className="p-3 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'fill-orange-500 text-orange-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Envíos 24-48h a domicilio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Autenticidad garantizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
