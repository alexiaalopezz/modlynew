import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
              <h2 className="text-lg font-bold text-white font-heading">
                Tus Favoritos de Halloween
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                ({favorites.length})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar favoritos"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {favorites.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-3xl">
                  🖤
                </div>
                <p className="text-base font-semibold text-white">No tienes favoritos aún</p>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Guarda las prendas de Halloween que más te gusten pulsando el icono del corazón.
                </p>
              </div>
            ) : (
              favorites.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-zinc-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                          {product.brand}
                        </p>
                        <h4 className="text-xs font-semibold text-white truncate">
                          {product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveFavorite(product)}
                        aria-label="Eliminar favorito"
                        className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-mono text-sm font-bold text-white tabular-nums">
                        {product.salePrice.toFixed(2)} €
                      </span>
                      <span className="text-[11px] text-zinc-500 line-through tabular-nums">
                        {product.originalPrice.toFixed(2)} €
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.colors[0]?.name || '', product.sizes[0] || 'Única');
                        onRemoveFavorite(product);
                      }}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Mover a la Cesta</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
