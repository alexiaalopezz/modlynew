import React, { useState } from 'react';
import { Sparkles, X, Check, Copy } from 'lucide-react';

export const HalloweenBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const copyCode = () => {
    navigator.clipboard?.writeText('SPOOKY20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gradient-to-r from-orange-950 via-zinc-950 to-orange-950 border-b border-orange-500/20 text-orange-200 text-xs px-4 py-2.5 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden">
          <span className="shrink-0 text-base">🎃</span>
          <p className="truncate">
            <span className="font-semibold text-orange-400">ESPECIAL HALLOWEEN:</span>{' '}
            Hasta -40% de descuento + 20% EXTRA con el código{' '}
            <button
              onClick={copyCode}
              title="Copiar código"
              className="inline-flex items-center gap-1 font-mono font-bold text-white bg-orange-600/30 hover:bg-orange-600/50 px-2 py-0.5 rounded border border-orange-500/40 transition-colors cursor-pointer"
            >
              SPOOKY20
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-orange-300" />}
            </button>
            {' '}· Envíos gratis &gt; 50€
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          aria-label="Cerrar banner"
          className="text-zinc-400 hover:text-white p-1 transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
