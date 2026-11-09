/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClassicLanding } from './pages/ClassicLanding';
import { HalloweenLanding } from './pages/HalloweenLanding';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HALLOWEEN_PRODUCTS, CLASSIC_PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

type Route = 'classic' | 'halloween';

export default function App() {
  // Check URL pathname or hash for initial route
  const getInitialRoute = (): Route => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('halloween') || hash.includes('halloween')) {
      return 'halloween';
    }
    return 'classic';
  };

  const [currentRoute, setCurrentRoute] = useState<Route>(getInitialRoute);

  // Synchronize route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title & history on navigation
  const navigateTo = (route: Route) => {
    setCurrentRoute(route);
    const targetPath = route === 'halloween' ? '/halloween' : '/';
    try {
      window.history.pushState({ route }, '', targetPath);
    } catch {
      // Fallback for sandboxed iframes
      window.location.hash = targetPath;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (route === 'halloween') {
      document.title = 'Modly — Halloween Edition & Ofertas de Miedo';
    } else {
      document.title = 'Modly — Tu estilo, a un solo clic | Tienda Oficial';
    }
  };

  // Pre-seed with 1 item so users can immediately test the cart & promo codes
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: HALLOWEEN_PRODUCTS[0],
      selectedColor: HALLOWEEN_PRODUCTS[0].colors[0].name,
      selectedSize: '41',
      quantity: 1,
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>([HALLOWEEN_PRODUCTS[1].id]);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('SPOOKY20');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [spookyMode, setSpookyMode] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, selectedColor, selectedSize, quantity }];
      }
    });

    showToast(`"${product.name}" añadido a la cesta`);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist operations
  const handleToggleFavorite = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast('Eliminado de tus favoritos');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('Añadido a tus favoritos ❤️');
        return [...prev, product.id];
      }
    });
  };

  const allKnownProducts = [...HALLOWEEN_PRODUCTS, ...CLASSIC_PRODUCTS];
  const favoriteProducts = allKnownProducts.filter((p) => wishlistIds.includes(p.id));

  // Coupon apply
  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    showToast(`¡Cupón ${code} aplicado a la cesta!`);
  };

  // Financial calculation for Checkout
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0
  );
  let discountRate = 0;
  if (appliedCoupon === 'TRUCO25') discountRate = 0.25;
  else if (appliedCoupon === 'SPOOKY20') discountRate = 0.2;
  else if (appliedCoupon === 'NOCTURNE15') discountRate = 0.15;
  else if (appliedCoupon === 'BIENVENIDA10') discountRate = 0.1;

  const couponDiscount = rawSubtotal * discountRate;
  const shippingCost = rawSubtotal > 0 && rawSubtotal - couponDiscount >= 50 ? 0 : 4.95;
  const finalTotal = Math.max(0, rawSubtotal - couponDiscount + (rawSubtotal > 0 ? shippingCost : 0));

  return (
    <div className="relative">
      {/* Route-level view */}
      {currentRoute === 'classic' ? (
        <ClassicLanding
          onNavigateToHalloween={() => navigateTo('halloween')}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, color, size) => handleAddToCart(p, color, size, 1)}
          onToggleFavorite={handleToggleFavorite}
          wishlistIds={wishlistIds}
        />
      ) : (
        <HalloweenLanding
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlistIds.length}
          wishlistIds={wishlistIds}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, color, size) => handleAddToCart(p, color, size, 1)}
          onToggleFavorite={handleToggleFavorite}
          onApplyCoupon={handleApplyCoupon}
          onNavigateToClassic={() => navigateTo('classic')}
          spookyMode={spookyMode}
          onToggleSpooky={() => setSpookyMode(!spookyMode)}
        />
      )}

      {/* Floating Route Switcher for quick preview/testing */}
      <aside aria-label="Navegación de rutas" className="fixed bottom-5 left-5 z-40 flex items-center p-1 bg-zinc-950/90 text-xs rounded-full border border-zinc-700/80 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => navigateTo('classic')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
            currentRoute === 'classic'
              ? 'bg-[#f7f5ee] text-[#1c1917] font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Página Principal (/)
        </button>
        <button
          onClick={() => navigateTo('halloween')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
            currentRoute === 'halloween'
              ? 'bg-orange-600 text-white font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-orange-400'
          }`}
        >
          <span>🎃 /halloween</span>
        </button>
      </aside>

      {/* Shared Modals & Drawers */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isFavorite={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={(p, color, size, qty) => handleAddToCart(p, color, size, qty)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon('')}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favoriteProducts}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={(p, color, size) => handleAddToCart(p, color, size, 1)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        total={finalTotal}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-orange-500/40 text-white text-xs shadow-2xl shadow-orange-950/60 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-orange-400 font-bold">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
