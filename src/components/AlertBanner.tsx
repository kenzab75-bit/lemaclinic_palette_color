import { AlertTriangle } from "lucide-react";

const AlertBanner = () => {
  return (
    <div className="absolute top-20 left-0 right-0 z-[45] animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-2">
        <div className="glass-card rounded-xl border border-primary-red/30 px-5 py-3 group relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-primary-red/10 to-primary-red/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative flex items-center gap-3">
            {/* Alert badge */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-primary-red to-dark-red px-3 py-1 rounded-full flex items-center gap-1.5 pulse-glow">
                <AlertTriangle className="h-3 w-3 text-white" />
                <span className="text-white font-bold text-xs tracking-wider">ALERTE</span>
              </div>
            </div>
            
            {/* Message */}
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm lg:text-base leading-snug">
                Révélations exclusives sur les pratiques de la clinique LEMA DENTAL à Istanbul
              </p>
            </div>
          </div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl border border-primary-red/20 animate-pulse pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
