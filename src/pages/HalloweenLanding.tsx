import React from 'react';
import { HalloweenBanner } from '../components/HalloweenBanner';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { MysteryScratch } from '../components/MysteryScratch';
import { HalloweenOffers } from '../components/HalloweenOffers';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { BrandStrip } from '../components/BrandStrip';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
import { SpookyAtmosphere } from '../components/SpookyAtmosphere';
import { HALLOWEEN_PRODUCTS } from '../data/products';
import { Product } from '../types';

interface HalloweenLandingProps {
  cartCount: number;
  wishlistCount: number;
  wishlistIds: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onToggleFavorite: (product: Product) => void;
  onApplyCoupon: (code: string) => void;
  onNavigateToClassic: () => void;
  spookyMode: boolean;
  onToggleSpooky: () => void;
}

export const HalloweenLanding: React.FC<HalloweenLandingProps> = ({
  cartCount,
  wishlistCount,
  wishlistIds,
  onOpenCart,
  onOpenWishlist,
  onQuickView,
  onAddToCart,
  onToggleFavorite,
  onApplyCoupon,
  onNavigateToClassic,
  spookyMode,
  onToggleSpooky,
}) => {
  const scrollToOffers = () => {
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMystery = () => {
    document.getElementById('truco-trato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0d11] text-[#ede9e1] relative flex flex-col">
      {/* Ambient Bats & Smoke */}
      <SpookyAtmosphere enabled={spookyMode} />

      {/* Top Banner with Promo Code */}
      <HalloweenBanner />

      {/* Navigation Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        spookyMode={spookyMode}
        onToggleSpooky={onToggleSpooky}
        onNavigateToClassic={onNavigateToClassic}
      />

      {/* Breadcrumb or Back Link for clarity */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/80 px-4 py-2 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToClassic}
              className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>← Volver a Modly Principal (/)</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200">Subpágina Especial: /halloween</span>
          </div>
          <span className="hidden sm:inline text-orange-400/90 font-mono text-[11px]">
            Ofertas válidas hasta el 31 de octubre
          </span>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExploreOffers={scrollToOffers} onOpenMystery={scrollToMystery} />

        {/* Halloween Offers & Flash Drop */}
        <HalloweenOffers
          products={HALLOWEEN_PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleFavorite={onToggleFavorite}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />

        {/* Truco o Trato Mystery Box */}
        <MysteryScratch
          onApplyCoupon={(code) => {
            onApplyCoupon(code);
            onOpenCart();
          }}
        />

        {/* Categories */}
        <CategoryShowcase onSelectCategory={() => scrollToOffers()} />

        {/* Brands */}
        <BrandStrip />

        {/* Early Access Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
