import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  FileText,
  Info,
  Scale,
  ChevronDown,
} from "lucide-react";

interface MegaMenuSInformerProps {
  scrollToSection: (id: string) => void;
}

const navItems = [
  {
    title: "Leurs méthodes",
    description:
      "Un parcours étudié pour vous faire céder à leurs offres au détriment de la santé.",
    icon: AlertTriangle,
    action: { type: "scroll", id: "victimes" },
  },
  {
    title: "Témoignages",
    description: "Les victimes racontent leur parcours.",
    icon: FileText,
    action: { type: "scroll", id: "temoignages" },
  },
  {
    title: "Connaitre vos droits",
    description:
      "Même à l'étranger les patients ont des droits. Les connaître aide à éviter les pièges juridiques.",
    icon: Scale,
    action: { type: "scroll", id: "contact" },
  },
  {
    title: "Vos questions fréquentes",
    description: "Réponses claires aux interrogations les plus courantes.",
    icon: Info,
    action: { type: "link", to: "/informer/questions-victimes" },
  },
];

const MegaMenuSInformer = ({ scrollToSection }: MegaMenuSInformerProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNavigate = (action: (typeof navItems)[number]["action"]) => {
    if (action.type === "scroll") {
      scrollToSection(action.id);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 text-[#F5F5F5] font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
      >
        S'informer
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180 -translate-y-px" : ""}`} />
      </button>

      <div
        className={`absolute right-0 mt-3 w-[min(96vw,1040px)] max-w-5xl origin-top-right transition-all duration-300 ease-out ${
          open ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 -translate-y-3"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-neutral-300/40 bg-white/[0.97] shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(191,57,57,0.08),transparent_45%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 p-6 lg:p-10">
            {/* Carte principale gauche */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-[#F04444] to-[#000000] text-white shadow-xl shadow-black/25">
                <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.35),transparent_45%)]" />
                <div className="absolute right-4 top-6 h-24 w-24 rounded-xl bg-gradient-to-br from-red-700/70 to-red-900/80 blur-3xl" />
                <div className="relative p-6 lg:p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center shadow-lg shadow-red-900/40">
                      <AlertTriangle className="h-5 w-5 text-red-100" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-red-100/80">Guide alerte</p>
                      <h3 className="text-2xl font-semibold leading-tight">Comprendre les dérives de Lema Clinic à Istanbul</h3>
                    </div>
                  </div>
                  <p className="text-sm text-red-50/90 leading-relaxed">
                    Guide complet basé sur des preuves réelles.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-red-900 font-semibold text-sm shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Télécharger le guide
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2 text-red-100/80 text-sm">
                      <Info className="h-4 w-4" />
                      PDF sécurisé, 15 pages
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-[#5b0f15]/70 via-[#3a0b12]/80 to-[#0f0609]/80 min-h-[120px] flex items-center justify-between px-5 py-4">
                    <div className="space-y-1 text-sm text-red-50/90">
                      <p className="font-semibold text-red-100">Alerte Istanbul</p>
                      <p>Comprendre les tactiques commerciales et juridiques.</p>
                    </div>
                    <div className="h-16 w-16 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                      <AlertTriangle className="h-7 w-7 text-red-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation droite */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.18em]">Orientation</p>
                  <h4 className="text-2xl font-bold text-neutral-900 mt-2">Tout savoir avant de vous engager</h4>
                  <p className="text-sm text-neutral-600 mt-1">Ressources vérifiées, ton clair, actions immédiates.</p>
                </div>
                <div className="hidden md:flex h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-800/30 border border-red-200/60 text-red-700 items-center justify-center">
                  <Scale className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const content = (
                    <div className="group relative h-full overflow-hidden rounded-xl border border-neutral-200/70 bg-white/70 backdrop-blur-sm px-5 py-4 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/15">
                      <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 bg-gradient-to-r from-red-500/60 via-red-600/70 to-red-800/70 transition-opacity duration-200 group-hover:opacity-100" />
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 border border-neutral-200 shadow-inner">
                          <Icon className="h-5 w-5 text-red-700" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h5 className="text-base font-semibold text-neutral-900">{item.title}</h5>
                          </div>
                          <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-700">Explorer <ArrowRight className="h-4 w-4" /></span>
                        </div>
                      </div>
                    </div>
                  );

                  if (item.action.type === "link") {
                    return (
                      <Link
                        key={item.title}
                        to={item.action.to}
                        onClick={() => setOpen(false)}
                        className="h-full"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleNavigate(item.action)}
                      className="text-left h-full"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuSInformer;
