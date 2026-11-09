import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Plus, Minus, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Financial calculations
  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0
  );

  let discountRate = 0;
  if (appliedCoupon === 'TRUCO25') discountRate = 0.25;
  else if (appliedCoupon === 'SPOOKY20') discountRate = 0.2;
  else if (appliedCoupon === 'NOCTURNE15') discountRate = 0.15;
  else if (appliedCoupon === 'BIENVENIDA10') discountRate = 0.10;

  const couponDiscount = rawSubtotal * discountRate;
  const freeShippingThreshold = 50.0;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - (rawSubtotal - couponDiscount));
  const shippingCost = rawSubtotal > 0 && amountToFreeShipping === 0 ? 0 : (rawSubtotal > 0 ? 4.95 : 0);
  const total = Math.max(0, rawSubtotal - couponDiscount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (['SPOOKY20', 'TRUCO25', 'NOCTURNE15', 'BIENVENIDA10'].includes(clean)) {
      onApplyCoupon(clean);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Código no válido. Prueba con SPOOKY20 o TRUCO25');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-white font-heading">
                Tu Cesta de Halloween
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar cesta"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="px-5 py-3 bg-zinc-950/70 border-b border-zinc-800/80 text-xs">
            {amountToFreeShipping > 0 ? (
              <div>
                <p className="text-zinc-300 flex items-center justify-between">
                  <span>¡Añade <strong className="text-orange-400 font-mono">{amountToFreeShipping.toFixed(2)} €</strong> para envío gratis!</span>
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                </p>
                <div className="mt-1.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, ((rawSubtotal - couponDiscount) / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>¡Genial! Disfrutas de Envío Gratuito en 24-48h</span>
              </p>
            )}
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-3xl">
                  🎃
                </div>
                <p className="text-base font-semibold text-white">Tu cesta está vacía</p>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Descubre nuestras prendas y ofertas de miedo para llenar tu armario esta temporada.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 transition-colors cursor-pointer"
                >
                  Ver Ofertas
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-lg object-cover bg-zinc-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                          {item.product.brand}
                        </p>
                        <h4 className="text-xs font-semibold text-white truncate">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveItem(index)}
                        aria-label="Eliminar producto"
                        className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {item.selectedColor} · Talla {item.selectedSize}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-white tabular-nums">
                        {(item.product.salePrice * item.quantity).toFixed(2)} €
                      </span>

                      <div className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-300 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-white text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-300 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Financial Breakdown */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-950/90 space-y-3.5">
              {/* Coupon section */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-orange-400" />
                      <span className="font-mono font-bold text-orange-300">
                        {appliedCoupon} (-{discountRate * 100}%)
                      </span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-xs text-zinc-400 hover:text-red-400 underline cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupón (ej. SPOOKY20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder:normal-case placeholder:text-zinc-500 focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="mt-1 text-[11px] text-red-400">{couponError}</p>
                )}
              </div>

              {/* Price summary table */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal productos</span>
                  <span className="font-mono text-zinc-200 tabular-nums">
                    {rawSubtotal.toFixed(2)} €
                  </span>
                </div>

                {discountRate > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento cupón (-{discountRate * 100}%)</span>
                    <span className="font-mono tabular-nums">
                      -{couponDiscount.toFixed(2)} €
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envío a domicilio (24-48h)</span>
                  <span className="font-mono text-zinc-200 tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-semibold">GRATIS</span>
                    ) : (
                      `${shippingCost.toFixed(2)} €`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total final</span>
                  <span className="font-mono text-base text-orange-400 tabular-nums">
                    {total.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-950/50 transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>Tramitar Pedido Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Pago 100% cifrado · Visa, Mastercard, Klarna, PayPal</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
