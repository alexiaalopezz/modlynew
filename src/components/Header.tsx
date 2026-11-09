import React from 'react';
import { ShoppingBag, Heart, Moon, Ghost } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  spookyMode: boolean;
  onToggleSpooky: () => void;
  onNavigateToClassic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  spookyMode,
  onToggleSpooky,
  onNavigateToClassic,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0c0d11]/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark in display face */}
          <button
            onClick={onNavigateToClassic}
            className="text-2xl font-bold tracking-wider text-white font-heading whitespace-nowrap shrink-0 flex items-center gap-2 group cursor-pointer text-left"
          >
            <span>Modly</span>
            <span className="text-orange-500 text-xs font-sans uppercase tracking-widest font-semibold px-2 py-0.5 rounded border border-orange-500/30 bg-orange-500/10">
              Halloween
            </span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <button
              onClick={onNavigateToClassic}
              className="text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 cursor-pointer"
            >
              <span>← Modly Principal</span>
            </button>
            <a
              href="#ofertas"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Ofertas de Miedo</span>
            </a>
            <a
              href="#categorias"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Categorías
            </a>
            <a
              href="#truco-trato"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0 text-orange-400 font-semibold"
            >
              Truco o Trato
            </a>
            <a
              href="#marcas"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Marcas
            </a>
          </nav>

          {/* Zone 3: 1 primary action block */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Spooky atmosphere toggle */}
            <button
              onClick={onToggleSpooky}
              title={spookyMode ? 'Desactivar niebla de Halloween' : 'Activar niebla de Halloween'}
              aria-label="Alternar ambientación Halloween"
              className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                spookyMode
                  ? 'border-orange-500/50 bg-orange-500/20 text-orange-300'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
              }`}
            >
              <Ghost className="w-4 h-4" />
              <span className="hidden lg:inline">{spookyMode ? 'Niebla ON' : 'Niebla OFF'}</span>
            </button>

            {/* Wishlist trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="Ver favoritos"
              className="relative p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart primary trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir cesta de la compra"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 active:scale-[0.98] rounded-lg transition-all shadow-lg shadow-orange-950/40 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cesta</span>
              <span className="px-1.5 py-0.2 bg-black/30 rounded text-[11px] font-mono">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
