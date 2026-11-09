import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: 'Alexia López',
    email: 'alexialopez2830@gmail.com',
    phone: '+34 612 345 678',
    address: 'Gran Vía 42, 4º B',
    city: 'Madrid',
    postalCode: '28013',
    paymentMethod: 'card',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `MDLY-HW-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Cerrar checkout"
          className="absolute right-4 top-4 z-20 rounded-full bg-zinc-800 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!orderConfirmed ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
                <Truck className="w-3.5 h-3.5" />
                <span>Envío Rápido 24-48h</span>
              </div>
              <h2 className="mt-1 text-2xl font-bold text-white font-heading">
                Finalizar Pedido de Halloween
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Completa tus datos para recibir tu selección antes del 31 de octubre.
              </p>
            </div>

            {/* Quick summary strip */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-300">
                {items.reduce((s, i) => s + i.quantity, 0)} artículos en tu pedido
              </span>
              <span className="font-mono font-bold text-orange-400 text-sm tabular-nums">
                Total: {total.toFixed(2)} €
              </span>
            </div>

            {/* Contact & Shipping Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 font-medium">Nombre Completo</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-medium">Correo Electrónico</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-zinc-400 font-medium">Dirección de Entrega</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-medium">Ciudad / Localidad</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-medium">Código Postal</label>
                <input
                  required
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Payment Method selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">
                Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-500/10 text-white font-semibold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-orange-400" />
                  <span className="text-[11px] block">Tarjeta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'applepay'
                      ? 'border-orange-500 bg-orange-500/10 text-white font-semibold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="text-base block leading-none mb-1"></span>
                  <span className="text-[11px] block">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'cod'
                      ? 'border-orange-500 bg-orange-500/10 text-white font-semibold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                  <span className="text-[11px] block">Contra Reembolso</span>
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-950/60 transition-all cursor-pointer"
            >
              <span>Confirmar Pedido · {total.toFixed(2)} €</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs text-orange-400 font-bold bg-orange-950/50 px-2.5 py-1 rounded border border-orange-500/30">
                {orderId}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-white font-heading">
                ¡Pedido Confirmado con Éxito!
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
                Hemos recibido tu pedido de Halloween. Tu paquete ya está siendo preparado en nuestro centro logístico y se entregará en <strong>24-48h</strong> en {formData.address}, {formData.city}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Destinatario:</span>
                <span className="text-white font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Confirmación enviada a:</span>
                <span className="text-white font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Importe cobrado:</span>
                <span className="text-orange-400 font-mono font-bold">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Volver a la Tienda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
