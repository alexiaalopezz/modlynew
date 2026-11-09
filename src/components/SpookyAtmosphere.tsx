import React from 'react';

interface SpookyAtmosphereProps {
  enabled: boolean;
}

export const SpookyAtmosphere: React.FC<SpookyAtmosphereProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Floating bat silhouettes */}
      <div className="absolute top-[15%] left-[-50px] animate-[flyAcross_22s_linear_infinite] opacity-40">
        <svg className="w-8 h-8 text-zinc-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 4c-1.5 2-4 3-7 3-1.5 0-3-.5-4-1 1 3 3 5 6 6-1 1-1 3-1 5 2-1 4-2 6-2s4 1 6 2c0-2 0-4-1-5 3-1 5-3 6-6-1 .5-2.5 1-4 1-3 0-5.5-1-7-3z" />
        </svg>
      </div>

      <div className="absolute top-[35%] left-[-50px] animate-[flyAcross_28s_linear_infinite_4s] opacity-30">
        <svg className="w-6 h-6 text-orange-950 fill-current" viewBox="0 0 24 24">
          <path d="M12 4c-1.5 2-4 3-7 3-1.5 0-3-.5-4-1 1 3 3 5 6 6-1 1-1 3-1 5 2-1 4-2 6-2s4 1 6 2c0-2 0-4-1-5 3-1 5-3 6-6-1 .5-2.5 1-4 1-3 0-5.5-1-7-3z" />
        </svg>
      </div>

      <div className="absolute top-[65%] left-[-50px] animate-[flyAcross_25s_linear_infinite_8s] opacity-25">
        <svg className="w-10 h-10 text-zinc-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 4c-1.5 2-4 3-7 3-1.5 0-3-.5-4-1 1 3 3 5 6 6-1 1-1 3-1 5 2-1 4-2 6-2s4 1 6 2c0-2 0-4-1-5 3-1 5-3 6-6-1 .5-2.5 1-4 1-3 0-5.5-1-7-3z" />
        </svg>
      </div>

      <style>{`
        @keyframes flyAcross {
          0% {
            transform: translateX(-60px) translateY(0px) scale(0.8);
          }
          25% {
            transform: translateX(30vw) translateY(-25px) scale(1);
          }
          50% {
            transform: translateX(60vw) translateY(15px) scale(0.9);
          }
          75% {
            transform: translateX(85vw) translateY(-10px) scale(1.1);
          }
          100% {
            transform: translateX(110vw) translateY(0px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};
