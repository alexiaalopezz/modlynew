import React, { useState } from 'react';
import { Mail, Check, Sparkles, Copy } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !accepted) return;
    setSubmitted(true);
  };

  const copyWelcomeCode = () => {
    navigator.clipboard?.writeText('BIENVENIDA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acceso Anticipado Halloween</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
            Sé el primero en cazar las ofertas de miedo
          </h2>

          <p className="text-sm sm:text-base text-zinc-400">
            Suscríbete a la newsletter de Modly para recibir avisos de reposición de tallas, drops nocturnos y descuentos privados antes de que se agoten.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    required
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-orange-950/40 cursor-pointer whitespace-nowrap"
                >
                  Suscribirse
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="privacy" className="cursor-pointer">
                  Acepto la política de privacidad y comunicaciones de ofertas
                </label>
              </div>
            </form>
          ) : (
            <div className="pt-4 p-5 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 max-w-md mx-auto space-y-3 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
                <Check className="w-5 h-5" />
                <span>¡Suscripción completada!</span>
              </div>
              <p className="text-xs text-zinc-300">
                Usa este cupón exclusivo para un 10% adicional en tu primera compra:
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={copyWelcomeCode}
                  className="font-mono text-sm font-bold text-orange-400 bg-black/60 border border-orange-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-black cursor-pointer"
                >
                  BIENVENIDA10
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
