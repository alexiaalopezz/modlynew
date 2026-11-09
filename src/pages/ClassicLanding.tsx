import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ArrowRight, Truck, Globe, Sparkles, Check, Star, ShieldCheck, Mail } from 'lucide-react';
import { CLASSIC_PRODUCTS, CLASSIC_HERO_IMAGE, CLASSIC_BRANDS } from '../data/products';
import { Product } from '../types';

interface ClassicLandingProps {
  onNavigateToHalloween: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onToggleFavorite: (product: Product) => void;
  wishlistIds: string[];
}

export const ClassicLanding: React.FC<ClassicLandingProps> = ({
  onNavigateToHalloween,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onQuickView,
  onAddToCart,
  onToggleFavorite,
  wishlistIds,
}) => {
  // Countdown timer for Modly
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 8,
    minutes: 19,
    seconds: 42,
  });

  const [emailNotify, setEmailNotify] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailNotify) return;
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ee] text-[#1c1917] selection:bg-[#1c1917] selection:text-[#f7f5ee]">
      {/* Top Halloween Teaser Banner */}
      <div className="bg-[#18181b] text-white text-xs px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🎃</span>
            <span className="font-semibold text-orange-400">NUEVA COLECCIÓN HALLOWEEN:</span>
            <span className="text-zinc-300">Descubre ofertas de hasta el 40% en prendas oscuras y exclusivas.</span>
          </div>
          <button
            onClick={onNavigateToHalloween}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span>Ir a /halloween</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Header (Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-[#f7f5ee]/90 backdrop-blur-md border-b border-[#e5dfd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Wordmark */}
            <a href="/" className="text-2xl font-bold tracking-tight text-[#1c1917] font-heading whitespace-nowrap shrink-0">
              Modly
            </a>

            {/* Zone 2: Nav links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#44403c]">
              <a href="#adelanto" className="hover:text-black transition-colors whitespace-nowrap shrink-0">
                Novedades
              </a>
              <a href="#categorias" className="hover:text-black transition-colors whitespace-nowrap shrink-0">
                Categorías
              </a>
              <a href="#marcas" className="hover:text-black transition-colors whitespace-nowrap shrink-0">
                Marcas
              </a>
              <a href="#ayuda" className="hover:text-black transition-colors whitespace-nowrap shrink-0">
                Ayuda
              </a>
              {/* Route link to /halloween */}
              <button
                onClick={onNavigateToHalloween}
                className="hover:text-orange-600 font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-orange-600 cursor-pointer"
              >
                <span>🎃 Edición Halloween</span>
              </button>
            </nav>

            {/* Zone 3: Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenWishlist}
                aria-label="Ver favoritos"
                className="relative p-2.5 rounded-full border border-[#d6cfbe] bg-white/70 text-[#44403c] hover:text-black transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1c1917] text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenCart}
                aria-label="Abrir cesta"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1c1917] hover:bg-black rounded-full transition-all cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cesta</span>
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[11px] font-mono">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-20 border-b border-[#e5dfd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#78716c] uppercase tracking-wider">
                <span>Lanzamiento</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#1c1917] font-bold">15 de octubre</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1917] font-heading leading-[1.08]">
                Tu estilo, a un solo clic
              </h1>

              <p className="text-base sm:text-lg text-[#57534e] max-w-xl leading-relaxed">
                Modly es la nueva tienda online de moda: envíos rápidos en 24-48h a domicilio y una gran variedad de ropa, calzado y marcas. Las mejores firmas, en un mismo lugar.
              </p>

              {/* Countdown Module */}
              <div className="p-4 rounded-2xl bg-white border border-[#d6cfbe] max-w-lg shadow-sm">
                <p className="text-xs font-semibold text-[#78716c] uppercase tracking-wider mb-2">
                  Cuenta atrás de apertura
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-[#f7f5ee] rounded-xl py-2">
                    <span className="block text-2xl font-bold font-mono text-[#1c1917] tabular-nums">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#78716c] uppercase">Días</span>
                  </div>
                  <div className="bg-[#f7f5ee] rounded-xl py-2">
                    <span className="block text-2xl font-bold font-mono text-[#1c1917] tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#78716c] uppercase">Horas</span>
                  </div>
                  <div className="bg-[#f7f5ee] rounded-xl py-2">
                    <span className="block text-2xl font-bold font-mono text-[#1c1917] tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#78716c] uppercase">Min</span>
                  </div>
                  <div className="bg-[#f7f5ee] rounded-xl py-2">
                    <span className="block text-2xl font-bold font-mono text-[#1c1917] tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#78716c] uppercase">Seg</span>
                  </div>
                </div>
              </div>

              {/* Email Notification Form */}
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                  <input
                    required
                    type="email"
                    placeholder="Introduce tu email"
                    value={emailNotify}
                    onChange={(e) => setEmailNotify(e.target.value)}
                    className="flex-1 bg-white border border-[#d6cfbe] rounded-xl px-4 py-3 text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#1c1917]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1c1917] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    Avísame del lanzamiento
                  </button>
                </form>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 max-w-lg">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>¡Te avisaremos en cuanto abramos las puertas! Gracias por registrarte.</span>
                </div>
              )}
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#d6cfbe] shadow-xl bg-white">
                <img
                  src={CLASSIC_HERO_IMAGE}
                  alt="Modly - Tu estilo a un solo clic"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="mt-14 pt-10 border-t border-[#e5dfd3] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f7f5ee] flex items-center justify-center text-[#1c1917]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1917]">Envíos en 24-48h</h3>
              <p className="text-xs text-[#78716c] leading-relaxed">
                Recibe tus pedidos a domicilio en tiempo récord, estés donde estés.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f7f5ee] flex items-center justify-center text-[#1c1917]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1917]">Todo online</h3>
              <p className="text-xs text-[#78716c] leading-relaxed">
                Compra cómodamente desde casa, sin colas ni esperas. Tu estilo a un clic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f7f5ee] flex items-center justify-center text-[#1c1917]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1917]">Gran variedad</h3>
              <p className="text-xs text-[#78716c] leading-relaxed">
                Ropa, calzado, bolsos y belleza de las mejores marcas, en un mismo lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-14 border-b border-[#e5dfd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-[#78716c] uppercase tracking-wider">
                Muy pronto
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-heading text-[#1c1917]">
                Explora por categoría
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] hover:border-[#1c1917] transition-all cursor-pointer">
              <span className="text-2xl">🧥</span>
              <h3 className="mt-3 text-base font-semibold text-[#1c1917]">Ropa</h3>
              <p className="text-xs text-[#78716c] mt-1">Colección hombre y mujer</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] hover:border-[#1c1917] transition-all cursor-pointer">
              <span className="text-2xl">👟</span>
              <h3 className="mt-3 text-base font-semibold text-[#1c1917]">Zapatillas</h3>
              <p className="text-xs text-[#78716c] mt-1">Sneakers y calzado diario</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] hover:border-[#1c1917] transition-all cursor-pointer">
              <span className="text-2xl">👜</span>
              <h3 className="mt-3 text-base font-semibold text-[#1c1917]">Bolsos</h3>
              <p className="text-xs text-[#78716c] mt-1">Totes, mochilas y noche</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dfd3] hover:border-[#1c1917] transition-all cursor-pointer">
              <span className="text-2xl">✨</span>
              <h3 className="mt-3 text-base font-semibold text-[#1c1917]">Belleza</h3>
              <p className="text-xs text-[#78716c] mt-1">Cuidado capilar y cosmética</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="marcas" className="py-12 bg-white border-b border-[#e5dfd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-[#78716c] uppercase tracking-wider mb-6">
            Las marcas que amas
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {CLASSIC_BRANDS.map((brand) => (
              <div
                key={brand}
                className="p-3 rounded-xl border border-[#e5dfd3] bg-[#f7f5ee]/60 font-semibold text-xs text-[#1c1917]"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-4 rounded-2xl bg-[#1c1917] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm">
              <strong>Envío gratuito</strong> en pedidos superiores a 50€ a toda la península.
            </p>
          </div>
          <span className="text-xs text-zinc-400 hover:text-white underline cursor-pointer">
            Ver condiciones
          </span>
        </div>
      </div>

      {/* Adelanto de la colección (Nuestros favoritos) */}
      <section id="adelanto" className="py-14 border-b border-[#e5dfd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-[#78716c] uppercase tracking-wider">
                Adelanto de la colección
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-heading text-[#1c1917]">
                Nuestros favoritos
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLASSIC_PRODUCTS.map((product) => {
              const isFav = wishlistIds.includes(product.id);
              return (
                <article
                  key={product.id}
                  className="group flex flex-col rounded-2xl border border-[#e5dfd3] bg-white overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-[#ece8de]">
                    {product.tag && (
                      <span className="absolute left-3 top-3 z-10 text-[10px] font-semibold uppercase tracking-wider text-[#1c1917] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#e5dfd3]">
                        {product.tag}
                      </span>
                    )}

                    <button
                      onClick={() => onToggleFavorite(product)}
                      aria-label="Añadir a favoritos"
                      className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#78716c] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4 justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
                        {product.brand}
                      </h3>
                      <p
                        onClick={() => onQuickView(product)}
                        className="text-sm text-[#44403c] mt-0.5 font-medium hover:underline cursor-pointer"
                      >
                        {product.name}
                      </p>
                      <p className="mt-1.5 font-mono text-base font-bold text-[#1c1917] tabular-nums">
                        € {product.salePrice.toFixed(2)}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[#78716c]">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                        <span className="font-semibold text-[#1c1917]">{product.rating.toFixed(1)}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#e5dfd3] flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="h-3.5 w-3.5 rounded-full border border-[#d6cfbe]"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => onAddToCart(product, product.colors[0]?.name || '', product.sizes[0] || 'Única')}
                        className="px-3 py-1.5 rounded-lg bg-[#1c1917] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Halloween Callout Banner */}
      <section className="py-14 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-orange-500/30 bg-zinc-900/60 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block text-xs uppercase font-mono font-bold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-3 py-1 rounded-full">
                SUBPÁGINA DEDICADA · /halloween
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                ¿Buscas ofertas exclusivas de Halloween?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
                Hemos preparado un drop especial con prendas oscuras, botas track, Nike Dunk Low Trick or Treat y cupones de hasta un 40% de descuento.
              </p>
            </div>

            <button
              onClick={onNavigateToHalloween}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-orange-950/50"
            >
              <span>Explorar Landing de Halloween</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 border-b border-[#e5dfd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-xl">
          <span className="text-xs font-semibold text-[#78716c] uppercase tracking-wider">
            15 de octubre
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-heading text-[#1c1917]">
            Sé la primera en enterarte
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#78716c]">
            Suscríbete a nuestra newsletter y recibe novedades, descuentos exclusivos de lanzamiento y mucho más. Te avisamos en cuanto abramos.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2">
            <input
              required
              type="email"
              placeholder="Email"
              className="flex-1 bg-white border border-[#d6cfbe] rounded-xl px-4 py-2.5 text-sm text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1c1917] hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="ayuda" className="bg-[#ede9df] text-[#57534e] text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-2">
              <span className="text-xl font-bold font-heading text-[#1c1917]">Modly</span>
              <p className="text-xs text-[#78716c]">Tu estilo, a un solo clic. Lanzamiento 15 de octubre.</p>
              <div className="pt-2">
                <button
                  onClick={onNavigateToHalloween}
                  className="text-xs font-semibold text-orange-600 hover:underline cursor-pointer"
                >
                  🎃 Ir a la edición especial de Halloween (/halloween)
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#1c1917] uppercase mb-2">Shop</h4>
              <ul className="space-y-1.5">
                <li><a href="#adelanto" className="hover:text-black">Novedades</a></li>
                <li><a href="#categorias" className="hover:text-black">Categorías</a></li>
                <li><a href="#marcas" className="hover:text-black">Marcas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#1c1917] uppercase mb-2">About</h4>
              <ul className="space-y-1.5">
                <li><a href="/" className="hover:text-black">Nuestra historia</a></li>
                <li><a href="/" className="hover:text-black">Sostenibilidad</a></li>
                <li><a href="/" className="hover:text-black">Trabaja con nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#1c1917] uppercase mb-2">Ayuda / FAQ</h4>
              <ul className="space-y-1.5">
                <li><a href="/" className="hover:text-black">Envíos 24-48h</a></li>
                <li><a href="/" className="hover:text-black">Devoluciones</a></li>
                <li><a href="/" className="hover:text-black">Contacto</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#d6cfbe] text-[11px] text-[#78716c] flex justify-between">
            <p>© 2026 Modly. Tu estilo, a un solo clic.</p>
            <p>Lanzamiento 15 de octubre.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
