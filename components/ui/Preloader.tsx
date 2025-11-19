import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Wait for fade out animation to finish before removing from DOM
      const timer = setTimeout(() => setRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!render) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="relative mb-8 p-8">
         <div className="absolute inset-0 bg-hrom-gold/10 blur-3xl rounded-full animate-pulse"></div>
         <img 
           src="https://i.ibb.co/bXf9q7s/logo-transparent-4x.png" 
           alt="HROM SECURITY" 
           className="h-32 w-auto relative z-10 animate-float"
         />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-hrom-gold animate-loading-bar"></div>
        </div>
        <span className="text-hrom-gold font-mono text-xs tracking-[0.3em] animate-pulse">
            SYSTEM CHECK...
        </span>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};