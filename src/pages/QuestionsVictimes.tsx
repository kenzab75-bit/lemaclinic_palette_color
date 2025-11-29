import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Search, Shield, FileText, Scale, AlertCircle, Lock, BookOpen, ArrowUp, HelpCircle, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const QuestionsVictimes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const faqItems = [
    {
      question: "Quels sont mes droits en cas d'erreur médicale à l'étranger ?",
      answer: "Vous disposez des mêmes droits fondamentaux que dans votre pays d'origine : accès à votre dossier, demande de rectification, demande d'explication et possibilité d'engager la responsabilité du professionnel. Les règles varient selon le pays, mais vos droits essentiels restent protégés.",
      icon: Scale
    },
    {
      question: "Comment savoir si j'ai été victime d'un acte médical fautif ?",
      answer: "Signes courants : douleurs persistantes, traitements inachevés, devis modifiés sans explication, absence de suivi, complications non traitées, refus de prise en charge… Un avis médical indépendant est fortement recommandé.",
      icon: AlertCircle
    },
    {
      question: "Dois-je faire une radioscopie, un CBCT ou un examen avant d'agir ?",
      answer: "Oui. Les examens réalisés dans votre pays d'origine sont essentiels pour documenter la situation et évaluer les erreurs commises. Ils constituent la base d'un dossier solide.",
      icon: FileText
    },
    {
      question: "Comment récupérer mon dossier médical auprès de la clinique à l'étranger ?",
      answer: "Toute clinique est légalement tenue de vous fournir votre dossier complet, vos radios, vos devis, les actes réalisés, sous un délai raisonnable. Si la clinique refuse : cela renforce la suspicion d'une faute.",
      icon: BookOpen
    },
    {
      question: "Que faire si la clinique ne répond plus ou refuse d'assumer ?",
      answer: "C'est fréquent. Documentez tout : emails, messages, preuves de non-réponse. Votre dossier devient plus solide. Nous expliquons dans nos guides comment procéder étape par étape.",
      icon: Mail
    },
    {
      question: "Est-ce que je peux obtenir une aide juridique ?",
      answer: "Oui. Nous mettons en relation les victimes avec des avocats spécialisés (France / Europe) dans les litiges transfrontaliers liés au tourisme dentaire.",
      icon: Scale
    },
    {
      question: "Les preuves que j'envoie seront-elles anonymes ?",
      answer: "Oui. Vos pièces sont chiffrées, anonymisées et stockées via notre API sécurisée. Nous ne collectons jamais d'adresse IP ou de données identifiantes.",
      icon: Lock
    },
    {
      question: "Que faire si j'ai payé cash et que je n'ai pas de facture ?",
      answer: "Il existe des solutions : témoignages, devis initiaux, échanges WhatsApp, radiographies post-opératoires, preuves indirectes… Un dossier peut être constitué même sans facture.",
      icon: FileText
    },
    {
      question: "Comment savoir si mes implants ou couronnes sont de mauvaise qualité ?",
      answer: "Symptômes typiques : douleurs, prothèses mal ajustées, inflammations, changement de couleur, mauvaises odeurs, fractures. Un dentiste local peut vérifier et documenter précisément.",
      icon: AlertCircle
    },
    {
      question: "Puis-je agir même plusieurs mois après les soins ?",
      answer: "Oui. Les recours restent possibles tant qu'un dommage existe et qu'il est lié à l'acte médical initial. Il n'est jamais « trop tard » pour agir.",
      icon: Shield
    }
  ];

  const filteredFaqItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="py-6 border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-[#A51616] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Questions Importantes des Victimes</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#A51616]/10 via-[#A51616]/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(165,22,22,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            {/* Badge Premium */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A51616]/10 border border-[#A51616]/20">
              <div className="w-2 h-2 rounded-full bg-[#A51616] animate-pulse" />
              <span className="text-sm font-medium text-[#A51616] tracking-wider uppercase">
                Guide Juridique
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
              Questions Importantes des Victimes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Une sélection des questions les plus fréquentes, avec des réponses claires, sécurisées et basées sur les droits des patients.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-background border-border/50 focus:border-[#A51616] focus:ring-2 focus:ring-[#A51616]/20 transition-all rounded-xl"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-3 text-center">
                {filteredFaqItems.length} résultat{filteredFaqItems.length > 1 ? 's' : ''} trouvé{filteredFaqItems.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion with Sidebar */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Main Content */}
            <div>
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="glass-card border border-border/20 rounded-2xl overflow-hidden hover:border-[#A51616]/40 hover:shadow-lg hover:shadow-[#A51616]/10 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                        <div className="flex items-start gap-4 pr-4 w-full">
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-2xl font-bold text-[#A51616]/50 font-display">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <IconComponent className="h-5 w-5 text-[#A51616]" />
                          </div>
                          <span className="text-lg font-medium text-foreground group-hover:text-[#A51616] transition-colors text-left">
                            {item.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pl-[88px]">
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {filteredFaqItems.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Aucune question ne correspond à votre recherche.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="glass-card border border-[#A51616]/20 rounded-2xl p-6 sticky top-24 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#A51616]/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#A51616]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Besoin d'aide ?
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Notre équipe est là pour vous accompagner dans vos démarches juridiques.
                </p>

                <div className="pt-2 space-y-3">
                  <Link
                    to="/"
                    onClick={() => {
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="block w-full bg-[#A51616] hover:bg-[#C41E1E] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#A51616]/30 hover:-translate-y-0.5"
                  >
                    Contactez-nous
                  </Link>
                  
                  <Link
                    to="/"
                    className="block w-full border border-border/50 hover:border-[#A51616]/50 text-foreground font-medium py-3 px-4 rounded-xl transition-all duration-300 text-center hover:bg-[#A51616]/5"
                  >
                    Retour à l'accueil
                  </Link>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Support disponible</span>
                  </div>
                  <p className="text-xs text-muted-foreground/70">
                    Plus de <span className="text-[#A51616] font-semibold">200 victimes</span> accompagnées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-gradient-to-br from-[#A51616]/5 via-background to-background border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Vous avez d'autres questions ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 bg-[#A51616] hover:bg-[#C41E1E] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#A51616]/30 hover:-translate-y-0.5 justify-center pulse-glow"
              >
                <Mail className="h-5 w-5" />
                Contactez-nous
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 border border-border/50 hover:border-[#A51616]/50 text-foreground font-medium py-4 px-8 rounded-xl transition-all duration-300 hover:bg-[#A51616]/5 justify-center"
              >
                <ChevronRight className="h-5 w-5" />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 border-t border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground/70 italic">
              Toutes les informations fournies ici sont générales et n'ont pas vocation à remplacer un avis professionnel.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#A51616] hover:bg-[#C41E1E] text-white rounded-full shadow-lg hover:shadow-[#A51616]/30 transition-all duration-300 flex items-center justify-center z-50 animate-fade-in hover:-translate-y-1"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default QuestionsVictimes;
