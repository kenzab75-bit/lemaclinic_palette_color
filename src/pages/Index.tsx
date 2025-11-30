import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Scale, Shield, FileText, AlertTriangle, X, ChevronRight, Quote, ArrowUp, Lock, ShieldCheck, ChevronDown, Menu, Mail, Loader2, Heart, FileCheck, Sparkles, Globe, Users, Megaphone, Fingerprint, KeyRound, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import ContactForm from "@/components/ContactForm";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { timelineSteps, type TimelineStep } from "@/data/timelineSteps";
import { supabase } from "@/integrations/supabase/client";
import MegaMenuSInformer from "@/components/MegaMenuSInformer";
const Index = () => {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeTimelineStep, setActiveTimelineStep] = useState<TimelineStep | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [testimony, setTestimony] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [testimonySegment, setTestimonySegment] = useState("victime");
  const [testimonyChannel, setTestimonyChannel] = useState("texte");
  const [encryptionReceipt, setEncryptionReceipt] = useState<string | null>(null);
  const [isSubmittingTestimony, setIsSubmittingTestimony] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [displayedTestimonials, setDisplayedTestimonials] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [hasHeroVideoError, setHasHeroVideoError] = useState(false);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false); // Close mobile menu on navigation
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const heroSegments = [
    {
      id: "victime",
      title: "Victime ou proche",
      description: "Je veux savoir comment témoigner et être protégée.",
      badge: "Parcours d'écoute",
      target: "temoignages",
      icon: Shield,
    },
    {
      id: "presse",
      title: "Journaliste",
      description: "Je cherche un dossier sourcé et des preuves vérifiées.",
      badge: "Brief vérifiable",
      target: "victimes",
      icon: Megaphone,
    },
    {
      id: "expert",
      title: "Médecin / avocat",
      description: "Je souhaite contribuer au collectif et sécuriser les patients.",
      badge: "Appel à expertise",
      target: "contact",
      icon: FileCheck,
    }
  ];

  const heroValueProps = [
    {
      icon: Sparkles,
      title: "Expérience guidée",
      description: "Parcours pas-à-pas adapté à votre situation.",
    },
    {
      icon: Users,
      title: "Collectif protégé",
      description: "Juristes, soignants et proches solidaires.",
    },
    {
      icon: Globe,
      title: "Diffusion maîtrisée",
      description: "Dossiers prêts à être transmis aux autorités.",
    }
  ];

  const heroVideoFallback = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  const [heroVideoSrc, setHeroVideoSrc] = useState<string | null>(heroVideoFallback);

  useEffect(() => {
    const baseHref = typeof document !== "undefined" ? document.baseURI : import.meta.env.BASE_URL;
    try {
      const resolved = new URL(
        "LEMA_Glitch.mp4",
        baseHref
      ).toString();
      setHeroVideoSrc(resolved);
    } catch (error) {
      console.warn("Hero video path resolution failed, using fallback", error);
      setHeroVideoSrc(heroVideoFallback);
    }
  }, [heroVideoFallback]);

  const testimonySegments = [
    {
      id: "victime",
      label: "Victime",
      description: "Je témoigne pour être protégée.",
    },
    {
      id: "pro",
      label: "Professionnel",
      description: "Je partage un signalement médical ou juridique.",
    },
    {
      id: "media",
      label: "Journaliste",
      description: "Je transmets une information vérifiée.",
    }
  ];

  const testimonyChannels = [
    {
      id: "texte",
      label: "Texte prioritaire",
      detail: "Dépôt immédiat avec reçu chiffré.",
    },
    {
      id: "memo",
      label: "Mémo vocal",
      detail: "Nous organisons l'envoi audio sécurisé après dépôt.",
    },
    {
      id: "dossier",
      label: "Dossier PDF",
      detail: "Orientation vers un espace de fichiers à la demande.",
    }
  ];
  const handleSubmitTestimony = async () => {
    if (!testimony.trim() || !consentChecked) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs et accepter le consentement",
        variant: "destructive"
      });
      return;
    }
    setIsSubmittingTestimony(true);
    setEncryptionReceipt(null);

    try {
      const { data, error } = await supabase.functions.invoke("secure-testimony", {
        body: {
          testimony,
          segment: testimonySegment,
          channel: testimonyChannel
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Témoignage envoyé",
        description: data?.message || "Votre témoignage chiffré a bien été reçu."
      });

      setEncryptionReceipt(data?.receipt ?? null);
      setTestimony("");
      setConsentChecked(false);
    } catch (error) {
      console.error("Secure testimony error", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le témoignage. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingTestimony(false);
    }
  };

  useEffect(() => {
    if (!heroVideoRef.current) return;

    const attemptPlay = async () => {
      try {
        await heroVideoRef.current?.play();
      } catch (error) {
        console.warn("Hero video autoplay prevented:", error);
      }
    };

    attemptPlay();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = heroVideoRef.current;

    if (!video) return;

    const handleChange = () => {
      if (mediaQuery.matches) {
        video.pause();
        setIsHeroPaused(true);
      } else if (!isHeroPaused) {
        video.play().catch(error => console.warn("Hero video autoplay prevented:", error));
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isHeroPaused]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleError = () => {
      if (hasHeroVideoError) return;
      setHasHeroVideoError(true);
      setHeroVideoSrc(heroVideoFallback);
      video.src = heroVideoFallback;
      video.load();
      video.play().catch(error => console.warn("Hero fallback video play prevented:", error));
    };

    video.addEventListener("error", handleError);
    return () => video.removeEventListener("error", handleError);
  }, [hasHeroVideoError, heroVideoFallback]);

  const toggleHeroVideo = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(error => console.warn("Hero video play prevented:", error));
      setIsHeroPaused(false);
    } else {
      video.pause();
      setIsHeroPaused(true);
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedTestimonials(prev => Math.min(prev + 3, filteredTestimonials.length));
      setIsLoadingMore(false);
    }, 600);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      toast({
        variant: "destructive",
        title: "Email requis",
        description: "Veuillez entrer votre adresse email.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast({
        variant: "destructive",
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email: newsletterEmail }
      });

      if (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
      }

      if (data?.error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error,
        });
        return;
      }

      toast({
        title: "Inscription réussie !",
        description: data.message || "Merci de votre inscription à notre newsletter. Vérifiez votre email.",
      });
      setNewsletterEmail("");
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const filteredTestimonials = activeFilter === "Tous" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);
  
  const visibleTestimonials = filteredTestimonials.slice(0, displayedTestimonials);
  const hasMoreTestimonials = displayedTestimonials < filteredTestimonials.length;
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Premium Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass bg-black/80" : "glass"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="relative pulse-glow rounded-full p-2">
                    <Scale className="h-8 w-8 text-primary-red" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-red rounded-full animate-ping" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-gradient font-display">LemaClinic  </span>
                    <span className="text-2xl font-black text-red-gradient font-display">
                      Truth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Navigation principale">
              <button
                onClick={() => scrollToSection('accueil')}
                className="relative text-[#E0E0E0] hover:text-[#E02B2B] font-medium transition-all duration-300 group"
                aria-label="Aller à l'accueil"
              >
                Accueil
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E02B2B] transition-all duration-300 group-hover:w-full" />
              </button>
              <button
                onClick={() => scrollToSection('histoire')}
                className="relative text-[#E0E0E0] hover:text-[#E02B2B] font-medium transition-all duration-300 group"
                aria-label="Découvrir l'histoire"
              >
                Mon histoire
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E02B2B] transition-all duration-300 group-hover:w-full" />
              </button>
              
              <MegaMenuSInformer scrollToSection={scrollToSection} />
              <button
                onClick={() => scrollToSection('contact')}
                className="relative text-[#E0E0E0] hover:text-[#E02B2B] font-medium transition-all duration-300 group"
                aria-label="Aller à la section contact"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E02B2B] transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black/95 border-border/20">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center space-x-2">
                      <Scale className="h-6 w-6 text-primary-red" />
                      <span className="text-xl font-bold">
                        <span className="text-gradient">LemaClinic </span>
                        <span className="text-red-gradient">Truth</span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col space-y-4 mt-8">
                  <button onClick={() => {
                  scrollToSection('accueil');
                  setMobileMenuOpen(false);
                }} className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300 font-medium">
                    Accueil
                  </button>
                  
                  <button onClick={() => {
                  scrollToSection('histoire');
                  setMobileMenuOpen(false);
                }} className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300 font-medium">
                    Mon histoire
                  </button>
                  
                  <div className="px-4 py-2">
                    <div className="text-sm font-semibold text-muted-foreground mb-2">S'informer</div>
                    <button onClick={() => {
                      scrollToSection('victimes');
                      setMobileMenuOpen(false);
                    }} className="w-full text-left px-4 py-3 text-muted-foreground hover:text-primary-red hover:bg-accent/50 rounded-md transition-all duration-300">
                      Leurs méthodes
                    </button>
                    <button onClick={() => {
                      scrollToSection('temoignages');
                      setMobileMenuOpen(false);
                    }} className="w-full text-left px-4 py-3 text-muted-foreground hover:text-primary-red hover:bg-accent/50 rounded-md transition-all duration-300">
                      Témoignages
                    </button>
                    <Link to="/informer/questions-victimes" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-muted-foreground hover:text-primary-red hover:bg-accent/50 rounded-md transition-all duration-300">
                      Vos questions importantes
                    </Link>
                  </div>
                  
                  <button onClick={() => {
                  scrollToSection('contact');
                  setMobileMenuOpen(false);
                }} className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300 font-medium">
                    Contact
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section – Cinematic video-ready canvas */}
      <section id="accueil" className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        <div className="relative w-full overflow-hidden min-h-screen">
          {/* Video background with showcase framing */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(57,80,102,0.35)] shadow-[0_30px_90px_-40px_rgba(2,8,19,0.35)]" />
            <div className="absolute inset-0 ring-1 ring-inset ring-[rgba(255,255,255,0.08)]" />
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              ref={heroVideoRef}
              src={heroVideoSrc ?? undefined}
              className="absolute inset-0 w-full h-full object-cover z-[1]"
              aria-label="Vidéo de fond illustrant la page d'accueil"
            >
              <source src={heroVideoSrc ?? undefined} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(2,8,19,0.25),transparent_35%),linear-gradient(to_top,rgba(2,8,19,0.25),transparent_35%)]" />
          </div>

          {/* Hero content */}
          <div className="relative z-20">
            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-24">
              <div className="absolute right-6 top-6 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-lg shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <span className="text-xs uppercase tracking-[0.3em] text-white/70">Vidéo</span>
                <button
                  type="button"
                  onClick={toggleHeroVideo}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white hover:bg-white/20 transition"
                >
                  {isHeroPaused ? (
                    <>
                      <Play className="h-4 w-4" aria-hidden="true" />
                      Relancer
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" aria-hidden="true" />
                      Pause
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/70">
                  <span className="absolute -left-10 -top-6 w-24 h-24 rounded-full bg-red-500/20 blur-3xl" aria-hidden />
                  <div className="relative inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-30 mix-blend-screen bg-[url('/grain.png')]" aria-hidden />
                    <Scale className="relative h-4 w-4 text-primary-red" aria-hidden="true" />
                    <span className="relative font-semibold">LemaClinic Truth</span>
                  </div>
                </div>

                <div className="pt-16 md:pt-20">
                  <div className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/15 px-5 py-2 text-sm text-white/90 backdrop-blur">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                      <AlertTriangle className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
                    </div>
                    <span className="font-semibold tracking-wide text-red-200/90">ALERTE</span>
                    <span className="text-white/80">Révélations documentées sur les pratiques de la Lema Dental Clinic à Istanbul.</span>
                  </div>

                  <div className="mt-8 text-left">
                    <div className="max-w-3xl rounded-3xl border border-white/10 bg-black/35 p-8 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight font-display text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]">LemaClinic Truth</h1>
                          <p className="text-xl sm:text-2xl text-red-300/90">La vérité éclaire toujours.</p>
                        </div>
                        <p className="text-lg text-white/85 leading-relaxed">
                          Je suis une victime de la Lema Dental Clinic à Istanbul. Ce site rassemble des témoignages vérifiés et des éléments documentés pour protéger les patients, alerter les autorités et éviter que d’autres ne subissent les mêmes dérives.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                          <Button
                            onClick={() => scrollToSection("histoire")}
                            className="group rounded-full px-8 py-3 text-base font-medium bg-gradient-to-r from-red-500 via-red-500 to-red-600 text-white shadow-[0_0_25px_rgba(248,113,113,0.25)] hover:shadow-[0_0_35px_rgba(248,113,113,0.4)] hover:-translate-y-0.5 transition-all"
                          >
                            <span className="flex items-center gap-2">
                              Découvrir la vérité
                              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:rotate-6" />
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => scrollToSection("contact")}
                            className="rounded-full px-8 py-3 text-base font-medium border border-white/25 bg-white/5 text-white/90 hover:text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all"
                          >
                            Soutenir les victimes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 – Parcours dédiés */}
      <section className="relative bg-[#020813] border-t border-[#3D5E73]/50" aria-label="Segments prioritaires">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(224,43,43,0.05),transparent_60%)] opacity-90" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-red/70">Parcours guidés</p>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-[#CEDEF2]">Choisissez le cadre qui correspond à votre rôle</h2>
            <p className="mt-4 text-[#CEDEF2]/80">
              Le collectif consolide des signalements réels : diagnostics modifiés, devis opaques et pressions psychologiques. Nous ne publions que des éléments sourcés et disponibles dans notre dossier.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {heroSegments.map(segment => {
              const Icon = segment.icon;
              return (
                <div key={segment.id} className="rounded-2xl border border-[#3D5E73]/40 bg-[#395066]/70 p-6 shadow-[0_30px_80px_rgba(2,8,19,0.65)] backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-primary-red font-semibold">{segment.badge}</span>
                    <Icon className="h-6 w-6 text-primary-red" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#CEDEF2] mb-2">{segment.title}</h3>
                  <p className="text-[#CEDEF2]/80 mb-6 leading-relaxed">{segment.description}</p>
                  <Button
                    onClick={() => scrollToSection(segment.target)}
                    variant="secondary"
                    className="w-full group"
                    aria-label={`Accéder à l'espace ${segment.id}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      J'accède
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {heroValueProps.map(prop => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="flex items-center gap-3 rounded-2xl border border-[#3D5E73]/40 bg-[#395066]/60 px-4 py-3 backdrop-blur">
                  <Icon className="h-5 w-5 text-primary-red" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#CEDEF2]">{prop.title}</p>
                    <p className="text-xs text-[#CEDEF2]/75">{prop.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Story Section - Introduction */}
      <section id="histoire" className="relative py-section bg-[#FAF9FF] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#CEDEF2]/60 via-[#FAF9FF]/70 to-transparent pointer-events-none" aria-hidden />
        <div className="absolute inset-y-10 left-10 h-72 w-72 bg-[radial-gradient(circle_at_top_left,#E02B2B1A,transparent_60%)] blur-3xl" aria-hidden />
        <div className="absolute inset-y-10 right-10 h-72 w-72 bg-[radial-gradient(circle_at_top_right,#3D5E731A,transparent_55%)] blur-3xl" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-gradient mb-8 font-display">
              Mon Histoire
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto" />
          </div>

          {/* Qui suis-je & Pourquoi ce site */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="glass-card rounded-2xl p-10 bg-gradient-to-br from-[#020813]/95 via-[#395066]/90 to-[#3D5E73]/85 border border-white/10 shadow-[0_24px_80px_-30px_rgba(2,8,19,0.75)] ring-1 ring-primary-red/10 backdrop-blur">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#E9F2FB]">
                  Qui suis-je ?
                </h3>
              </div>
              <div className="space-y-4 text-[#CEDEF2]/85 leading-relaxed text-lg">
                <p>
                  Je suis une patiente qui a fait confiance à la clinique{" "}
                  <span className="text-primary-red font-semibold">Lema Dental</span> à Istanbul.
                </p>
                <p>
                  Comme beaucoup, j'ai cru aux promesses d'un sourire parfait, à des soins modernes et à une équipe qualifiée.
                </p>
                <p>
                  Mais derrière cette façade séduisante, j'ai découvert une tout autre réalité : celle d'une expérience marquée par la douleur, les manquements et le mépris.
                </p>
                <p>
                  Je suis aujourd'hui une <span className="text-primary-red font-semibold">victime</span>, mais aussi une <span className="text-primary-red font-semibold">voix</span> — celle de toutes les personnes qui ont été trompées ou réduites au silence.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-10 bg-gradient-to-br from-[#020813]/95 via-[#395066]/90 to-[#3D5E73]/85 border border-white/10 shadow-[0_24px_80px_-30px_rgba(2,8,19,0.75)] ring-1 ring-primary-red/10 backdrop-blur">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#E9F2FB]">
                  Pourquoi ce site ?
                </h3>
              </div>
              <div className="space-y-4 text-[#CEDEF2]/85 leading-relaxed text-lg">
                <p>
                  J'ai créé ce site pour révéler la vérité et prévenir d'autres victimes.
                </p>
                <p>
                  Ce site n'est pas une vengeance : c'est une alerte citoyenne.
                </p>
                <p>
                  Un espace de témoignage, d'enquête et de partage d'informations, construit avec rigueur.
                </p>
                <p>
                  Mon objectif est simple : que plus personne ne se laisse séduire par des promesses mensongères, et que chaque patient retrouve son{" "}
                  <span className="text-primary-red font-semibold">droit fondamental</span> à la transparence, au respect et à la dignité.
                </p>
              </div>
            </div>
          </div>

          {/* Mon expérience */}
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl p-10 bg-gradient-to-br from-[#020813]/95 via-[#395066]/90 to-[#3D5E73]/85 border border-white/10 shadow-[0_28px_90px_-32px_rgba(2,8,19,0.78)] ring-1 ring-primary-red/10 backdrop-blur">
              <h3 className="text-2xl font-bold text-[#E9F2FB] mb-6">
                Mon expérience
              </h3>

              <div className="space-y-4 text-[#CEDEF2]/85 leading-relaxed text-lg">
                <p>
                  Comme beaucoup d'autres, j'ai été attiré par les promesses alléchantes de Lema Dental Clinic à Istanbul.
                  Des soins dentaires de qualité à des prix attractifs, une équipe professionnelle, des installations modernes...
                  La réalité s'est révélée bien différente.
                </p>

                <p>
                  Une fois sur place, le cauchemar a commencé. Les diagnostics ont changé, les prix ont explosé, 
                  et les complications sont apparues rapidement. Les promesses se sont évaporées, et je me suis retrouvé 
                  piégé dans un système bien rodé, conçu pour maximiser les profits au détriment de la santé des patients.
                </p>

                <p>
                  Aujourd'hui, je me bats pour exposer ces pratiques et aider d'autres victimes. 
                  Ce site est ma voix, et j'espère qu'il deviendra aussi la vôtre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Timeline Section */}
      <section id="victimes" className="py-section bg-gradient-to-br from-black via-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed font-semibold">
              Découvrez comment un système bien rodé transforme la confiance des patients en instrument de profit.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary-red/60 to-transparent" aria-hidden="true" />

            <div className="space-y-16">
              {timelineSteps.map((step, index) => {
                const isEven = index % 2 === 1;
                return (
                  <article
                    key={step.id}
                    className={`relative flex flex-col lg:flex-row items-center gap-10 ${isEven ? "lg:flex-row-reverse" : ""}`}
                  >
                    <div className="flex-1 w-full">
                      <div className="glass-card rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-black/80 via-[#160202] to-black/80 border border-primary-red/20 shadow-[0_20px_60px_-20px_rgba(255,0,0,0.4)]">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary-red mb-4">
                          <span className="h-2 w-2 rounded-full bg-primary-red" />
                          <span>{step.stepNumber}</span>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">{step.cardTitle}</h3>
                        <p className="text-lg text-white/80 leading-relaxed mb-6">{step.cardDescription}</p>
                        <Button
                          className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-red via-[#ff2d2d] to-primary border-none text-white font-semibold shadow-lg shadow-primary-red/40 hover:shadow-primary-red/60"
                          onClick={() => setActiveTimelineStep(step)}
                        >
                          Cliquer pour voir les détails
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="relative flex flex-col items-center" aria-hidden="true">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-red/30 blur-2xl rounded-full animate-pulse" />
                        <div className="relative h-16 w-16 rounded-full bg-gradient-to-b from-[#ff4d4d] to-primary-red border border-white/20 flex items-center justify-center text-2xl font-black text-white shadow-[0_10px_30px_rgba(255,0,0,0.6)]">
                          {index + 1}
                        </div>
                      </div>
                      {index !== timelineSteps.length - 1 && (
                        <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-primary-red/60 to-transparent mt-6" />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="text-center text-sm text-white/60 mt-20">
            Si un passage n’est pas clair, demande-moi quelle version est la bonne.
          </p>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Témoignages des Victimes Section */}
      <section id="temoignages" className="py-section bg-gradient-to-br from-black via-background to-black relative overflow-hidden pattern-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 font-display">
              Témoignages des Victimes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Extraits anonymisés de personnes ayant alerté sur les pratiques décrites.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {["Tous", "Complications", "Fraude", "Facturation"].map(filter => (
              <button 
                key={filter} 
                onClick={() => {
                  setActiveFilter(filter);
                  setDisplayedTestimonials(3); // Reset displayed count on filter change
                }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-primary-red text-white shadow-lg shadow-primary-red/30" 
                    : "bg-background/40 text-muted-foreground border border-white/10 hover:border-primary-red/50 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Compteur */}
          <p className="text-center text-muted-foreground mb-12">
            {filteredTestimonials.length} témoignage{filteredTestimonials.length > 1 ? 's' : ''} disponible{filteredTestimonials.length > 1 ? 's' : ''}.
          </p>

          {/* Cartes de témoignages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreTestimonials && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="btn-premium px-8 py-4 text-lg font-semibold rounded-xl group"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    Charger plus de témoignages
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Footer note */}
          <div className="text-center">
            <p className="text-muted-foreground italic mb-2">
              Tous les témoignages sont anonymisés et vérifiés avant publication
            </p>
            <p className="text-sm text-muted-foreground">
              {displayedTestimonials} sur {filteredTestimonials.length} témoignages affichés
            </p>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Section Témoignage Anonyme */}
      <section className="py-section bg-gradient-to-br from-background via-black to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 font-display">
              Témoignage Anonyme
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Partagez votre expérience de manière anonyme et sécurisée. Votre identité est protégée.
            </p>
          </div>

          {/* Container principal */}
          <div className="glass-card rounded-2xl p-8 lg:p-12 border border-primary-red/20 shadow-2xl">
            <div className="bg-[#7A1212] rounded-xl p-6 mb-8 border border-primary-red/30">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary-red flex-shrink-0 mt-1" />
                <p className="text-white/90 leading-relaxed">
                  Tous les témoignages sont traités dans un espace isolé. Nous ne conservons pas les adresses IP dans nos exports et chaque dépôt génère un reçu chiffré.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Qui témoigne ?</p>
              <div className="grid gap-3 md:grid-cols-3">
                {testimonySegments.map(segment => (
                  <button
                    key={segment.id}
                    onClick={() => setTestimonySegment(segment.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${testimonySegment === segment.id ? "border-primary-red bg-primary-red/10" : "border-white/10 hover:border-primary-red/40"}`}
                  >
                    <p className="font-semibold text-white">{segment.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{segment.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="testimony" className="block text-foreground font-semibold mb-3 text-lg">
                Votre témoignage
              </label>
              <textarea
                id="testimony"
                value={testimony}
                onChange={e => setTestimony(e.target.value)}
                placeholder="Partagez votre histoire… (Tous les témoignages sont entièrement anonymes)"
                className="w-full min-h-[250px] bg-[#0E0E0E] border-2 border-primary-red/30 rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all duration-300 resize-y"
              />
            </div>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Canal de dépôt</p>
              <div className="grid gap-3 md:grid-cols-3">
                {testimonyChannels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setTestimonyChannel(channel.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${testimonyChannel === channel.id ? "border-primary-red bg-primary-red/10" : "border-white/10 hover:border-primary-red/40"}`}
                  >
                    <p className="font-semibold text-white">{channel.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{channel.detail}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0E0E0E] rounded-xl p-6 mb-8 border border-primary-red/30">
              <div className="flex items-start gap-4">
                <button onClick={() => setConsentChecked(!consentChecked)} className="flex-shrink-0 mt-0.5">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${consentChecked ? "bg-primary-red border-primary-red" : "border-primary-red/50 hover:border-primary-red"}`}>
                    {consentChecked && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
                <div>
                  <p className="text-white font-medium mb-2">
                    Je comprends que mon témoignage sera anonymisé et stocké de façon chiffrée.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Nous supprimons tout identifiant technique (IP, agent utilisateur) et appliquons un hachage salé avant archivage.
                  </p>
                </div>
              </div>
            </div>

            {encryptionReceipt && (
              <div className="mb-6 rounded-xl border border-primary-red/40 bg-black/40 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-white mb-1 flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-primary-red" />
                  Accusé de réception sécurisé
                </p>
                <p>Code de suivi : <span className="font-mono text-white">{encryptionReceipt}</span></p>
              </div>
            )}

            <button
              onClick={handleSubmitTestimony}
              disabled={!testimony.trim() || !consentChecked || isSubmittingTestimony}
              className="w-full bg-primary-red hover:bg-[#C41E1E] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-red/30 hover:-translate-y-0.5"
            >
              {isSubmittingTestimony ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
              {isSubmittingTestimony ? "Chiffrement en cours..." : "Envoyer anonymement"}
            </button>

            <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Fingerprint className="h-5 w-5 text-primary-red mt-0.5" />
                <p>Les métadonnées réseau sont supprimées de nos archives partagées. Nous conservons uniquement le contenu nécessaire au suivi.</p>
              </div>
              <div className="flex items-start gap-3">
                <KeyRound className="h-5 w-5 text-primary-red mt-0.5" />
                <p>Chaque dépôt génère un reçu chiffré que vous pouvez partager à votre avocat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Section RGPD - Vos données, vos droits */}
      <section className="py-section bg-gradient-to-br from-black via-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <AlertTriangle className="h-4 w-4 text-primary-red" />
              <span className="text-primary-red font-medium tracking-widest text-sm uppercase">
                Transparence RGPD
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 font-display">
              Vos données, vos droits
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Nous respectons le Règlement Général sur la Protection des Données (RGPD) et détaillons clairement la finalité de chaque collecte.
            </p>
          </div>

          {/* 3 Cartes principales */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Carte 1 - Chiffrement */}
            <div className="bg-[#020813] rounded-2xl p-8 border border-[#3D5E73]/50 hover:border-primary-red/40 transition-all duration-300">
              <ShieldCheck className="h-10 w-10 text-primary-red mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Chiffrement de bout en bout
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Les données envoyées via nos formulaires transitent par HTTPS et sont stockées dans un espace chiffré au sein de Supabase.
              </p>
            </div>

            {/* Carte 2 - Consentement */}
            <div className="bg-[#020813] rounded-2xl p-8 border border-[#3D5E73]/50 hover:border-primary-red/40 transition-all duration-300">
              <FileText className="h-10 w-10 text-primary-red mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Consentement explicite
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nous recueillons uniquement les informations nécessaires à votre demande et vous pouvez retirer votre consentement à tout moment.
              </p>
            </div>

            {/* Carte 3 - Conservation */}
            <div className="bg-[#020813] rounded-2xl p-8 border border-[#3D5E73]/50 hover:border-primary-red/40 transition-all duration-300">
              <Lock className="h-10 w-10 text-primary-red mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Conservation limitée
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Les messages sont conservés uniquement le temps nécessaire à l'accompagnement, sauf obligation légale contraire.
              </p>
            </div>
          </div>

          {/* 2 Grandes cartes */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Carte 4 - Vos droits */}
            <div className="bg-[#020813] rounded-2xl p-10 border border-[#3D5E73]/50 hover:border-primary-red/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Vos droits à tout moment
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="text-primary-red font-bold mt-1">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Accéder à vos données :</span> écrivez-nous via le formulaire de contact en précisant l'email utilisé.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-red font-bold mt-1">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Rectifier ou supprimer :</span> nous traitons les demandes au plus vite, avec priorité donnée aux situations urgentes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-red font-bold mt-1">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Obtenir une copie :</span> les exports sont fournis dans un format ouvert (.json) signé pour garantir leur intégrité.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte 5 - API Sécurisée */}
            <div className="bg-[#020813] rounded-2xl p-10 border border-primary-red/30 hover:border-primary-red/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Notre API sécurisée
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Les formulaires utilisent une fonction Supabase Edge. Chaque témoignage est haché, consigné puis isolé dans un coffre-fort numérique, ce qui permet de tracer les dépôts sans exposer l'identité des témoins.
              </p>
              <div className="bg-[#395066]/50 rounded-lg p-4 border border-[#3D5E73]/50">
                <p className="text-sm text-muted-foreground font-mono">
                  Journalisation: hash SHA-256 + reçu public · Transmission: HTTPS Supabase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Contact Section */}
      <section id="contact" className="relative py-section overflow-hidden pattern-dots">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-background" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-red/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-red/5 rounded-full blur-[120px] animate-pulse" style={{
        animationDelay: "1s"
      }} />
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Footer Enrichi */}
      <footer className="bg-gradient-to-br from-background via-black to-background py-section border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6 group">
                <Scale className="h-8 w-8 text-primary-red transition-transform duration-300 group-hover:scale-110" />
                <span className="text-2xl font-bold font-display">LemaClinic Truth</span>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Un mouvement déterminé pour la vérité, la justice et la protection des patients face aux abus médicaux.
              </p>
              
              {/* Security Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="glass-card px-4 py-2 rounded-lg border border-primary-red/20 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary-red" />
                  <span className="text-xs font-medium">Données sécurisées</span>
                </div>
                <div className="glass-card px-4 py-2 rounded-lg border border-primary-red/20 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary-red" />
                  <span className="text-xs font-medium">SSL Crypté</span>
                </div>
                <div className="glass-card px-4 py-2 rounded-lg border border-primary-red/20 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary-red" />
                  <span className="text-xs font-medium">RGPD Conforme</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="Instagram">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xl font-bold mb-6">Navigation</h3>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection("histoire")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Mon histoire</button></li>
                <li><button onClick={() => scrollToSection("victimes")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Leurs méthodes</button></li>
                <li><button onClick={() => scrollToSection("temoignages")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Témoignages</button></li>
                <li><button onClick={() => scrollToSection("support")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Soutenir</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-bold mb-6">Légal</h3>
              <ul className="space-y-3">
                <li><Link to="/mentions-legales" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Mentions légales</Link></li>
                <li><Link to="/politique-confidentialite" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Confidentialité</Link></li>
                <li><Link to="/conditions-utilisation" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Conditions</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Cookies</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Restez informé des dernières actualités.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                />
                <Button 
                  type="submit" 
                  disabled={isSubscribing}
                  className="w-full bg-gradient-to-r from-primary-red to-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      S'inscrire<Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">Données protégées RGPD</p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">&copy; 2024 LemaClinic Truth. Tous droits réservés.</p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Heart className="h-4 w-4 text-primary-red" />
              <span>Fait avec passion pour la vérité et la justice</span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={!!activeTimelineStep} onOpenChange={(open) => setActiveTimelineStep(open ? activeTimelineStep : null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b0b0b] border border-primary-red/40 text-foreground">
          <DialogHeader className="relative pb-6">
            <div className="inline-flex items-center gap-2 bg-primary-red/20 text-primary-red px-4 py-2 rounded-full text-sm font-semibold tracking-[0.3em] uppercase">
              <span className="h-2 w-2 rounded-full bg-primary-red" />
              <span>{activeTimelineStep?.stepNumber}</span>
            </div>
            <DialogTitle className="text-4xl font-black mt-4 text-white">{activeTimelineStep?.modalTitle}</DialogTitle>
            <button onClick={() => setActiveTimelineStep(null)} className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Fermer la modale">
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          {activeTimelineStep && (
            <div className="space-y-8">
              <p className="text-lg text-white/80 leading-relaxed">{activeTimelineStep.modalDescription}</p>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                <h4 className="text-2xl font-bold text-white mb-4">Détails de l’étape</h4>
                <ul className="space-y-3">
                  {activeTimelineStep.details.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary-red" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                <h4 className="text-2xl font-bold text-white mb-4">Sources et preuves</h4>
                <div className="space-y-4">
                  {activeTimelineStep.sources.map((source) => (
                    <div key={source.label} className="p-4 rounded-xl border border-white/10 bg-black/60">
                      <p className="font-semibold text-white">{source.label}</p>
                      {source.description && (
                        <p className="text-sm text-white/70 mt-1">{source.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>;
};

export default Index;
