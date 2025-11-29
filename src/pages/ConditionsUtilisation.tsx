import { Link } from "react-router-dom";
import { Scale, ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConditionsUtilisation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-black to-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center space-x-3 group w-fit">
            <Scale className="h-8 w-8 text-primary-red transition-transform duration-300 group-hover:scale-110" />
            <span className="text-2xl font-bold font-display">
              LemaClinic Truth
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Retour à l'accueil
            </Button>
          </Link>

          {/* Page Title */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-12 w-12 text-primary-red" />
              <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-white via-white to-primary-red bg-clip-text text-transparent">
                Conditions d'Utilisation
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Règles d'usage du site LemaClinic Truth
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 bg-primary-red/10 border border-primary-red/30 rounded-lg p-6">
            <p className="text-foreground leading-relaxed">
              En accédant et en utilisant le site LemaClinic Truth, vous acceptez de vous conformer aux présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Objet du site */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">1. Objet du site</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  Le site LemaClinic Truth a pour mission de :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Recueillir et partager des témoignages de victimes d'abus médicaux</li>
                  <li>Informer le public sur les dysfonctionnements du système de santé</li>
                  <li>Promouvoir la transparence et la justice dans le domaine médical</li>
                  <li>Fournir un espace d'expression sécurisé et confidentiel</li>
                  <li>Accompagner les victimes dans leurs démarches</li>
                </ul>
              </div>
            </section>

            {/* Accès au site */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">2. Accès au site</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  L'accès au site est gratuit et ouvert à tous. Cependant, LemaClinic Truth se réserve le droit de :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Suspendre, interrompre ou limiter l'accès au site sans préavis pour des raisons de maintenance ou de sécurité</li>
                  <li>Modifier ou supprimer tout contenu à tout moment</li>
                  <li>Refuser l'accès au site à tout utilisateur ne respectant pas les présentes conditions</li>
                </ul>
                <p className="text-muted-foreground">
                  L'utilisateur est responsable de maintenir la sécurité de ses moyens d'accès (ordinateur, connexion Internet, etc.).
                </p>
              </div>
            </section>

            {/* Utilisation acceptable */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">3. Utilisation acceptable du site</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground font-semibold">
                  En utilisant ce site, vous vous engagez à :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Utiliser le site de manière légale et respectueuse</li>
                  <li>Fournir des informations exactes et véridiques</li>
                  <li>Respecter la confidentialité des autres utilisateurs</li>
                  <li>Ne pas diffuser de contenu diffamatoire, injurieux ou mensonger</li>
                  <li>Ne pas usurper l'identité d'autrui</li>
                  <li>Respecter les droits de propriété intellectuelle</li>
                  <li>Ne pas tenter de porter atteinte à la sécurité du site</li>
                </ul>
              </div>
            </section>

            {/* Interdictions */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">4. Comportements interdits</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground font-semibold">
                  Il est strictement interdit de :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Publier du contenu illégal, offensant, discriminatoire ou haineux</li>
                  <li>Harceler, menacer ou intimider d'autres utilisateurs</li>
                  <li>Utiliser le site pour des activités frauduleuses ou malveillantes</li>
                  <li>Tenter d'accéder à des zones restreintes du site sans autorisation</li>
                  <li>Diffuser des virus, malwares ou tout code malveillant</li>
                  <li>Collecter des données personnelles d'autres utilisateurs sans consentement</li>
                  <li>Utiliser des robots, scripts ou outils automatisés pour accéder au site</li>
                  <li>Reproduire, modifier ou distribuer le contenu du site sans autorisation</li>
                </ul>
                <div className="bg-primary-red/10 border border-primary-red/30 rounded p-4 mt-4">
                  <p className="text-foreground font-semibold">
                    Toute violation de ces interdictions peut entraîner la suspension immédiate de votre accès et des poursuites judiciaires.
                  </p>
                </div>
              </div>
            </section>

            {/* Témoignages */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">5. Soumission de témoignages</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  En soumettant un témoignage sur notre site, vous :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Garantissez que votre témoignage est véridique et basé sur votre expérience personnelle</li>
                  <li>Autorisez LemaClinic Truth à utiliser votre témoignage dans le cadre de sa mission (de manière anonyme ou pseudonyme si demandé)</li>
                  <li>Comprenez que nous nous réservons le droit de modérer, éditer ou refuser tout témoignage</li>
                  <li>Acceptez que votre témoignage puisse être utilisé dans des procédures juridiques</li>
                  <li>Reconnaissez que vous êtes responsable du contenu que vous soumettez</li>
                </ul>
                <div className="bg-card/30 border border-border rounded p-4 mt-4">
                  <p className="text-foreground">
                    <span className="font-semibold">Confidentialité :</span> Nous nous engageons à protéger votre identité selon vos souhaits. Consultez notre <Link to="/politique-confidentialite" className="text-primary-red hover:underline">Politique de Confidentialité</Link> pour plus d'informations.
                  </p>
                </div>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">6. Propriété intellectuelle</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  Tous les éléments du site (textes, images, logos, design, structure) sont protégés par le droit d'auteur et appartiennent à LemaClinic Truth ou à leurs auteurs respectifs.
                </p>
                <p className="text-muted-foreground">
                  Toute reproduction, représentation, modification ou exploitation, même partielle, est interdite sans autorisation écrite préalable.
                </p>
                <p className="text-muted-foreground">
                  Les témoignages publiés restent la propriété de leurs auteurs, qui accordent à LemaClinic Truth une licence d'utilisation dans le cadre de sa mission.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">7. Limitation de responsabilité</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground font-semibold mb-2">
                  LemaClinic Truth décline toute responsabilité concernant :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>L'exactitude, la fiabilité ou l'exhaustivité des informations publiées</li>
                  <li>Les interruptions ou dysfonctionnements techniques du site</li>
                  <li>Les dommages résultant de l'utilisation ou de l'impossibilité d'utiliser le site</li>
                  <li>Le contenu des sites externes vers lesquels nous renvoyons</li>
                  <li>Les virus ou autres composants nuisibles transmis via le site</li>
                  <li>Les conséquences de l'utilisation des témoignages ou informations publiés</li>
                </ul>
                <div className="bg-primary-red/10 border border-primary-red/30 rounded p-4 mt-4">
                  <p className="text-foreground">
                    <span className="font-semibold">Avertissement :</span> Les informations présentes sur ce site ne constituent pas des conseils juridiques ou médicaux. Consultez des professionnels qualifiés pour toute situation spécifique.
                  </p>
                </div>
              </div>
            </section>

            {/* Liens externes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">8. Liens hypertextes</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  Le site peut contenir des liens vers des sites externes. LemaClinic Truth n'exerce aucun contrôle sur ces sites et n'est pas responsable de leur contenu, de leurs pratiques de confidentialité ou de leurs conditions d'utilisation.
                </p>
                <p className="text-muted-foreground">
                  La création de liens vers notre site est autorisée, à condition qu'ils ne portent pas atteinte à notre image et ne suggèrent pas une affiliation ou un partenariat sans notre consentement.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">9. Modification des conditions</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  LemaClinic Truth se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
                </p>
                <p className="text-muted-foreground">
                  Il est de votre responsabilité de consulter régulièrement ces conditions pour vous tenir informé des éventuelles modifications.
                </p>
                <p className="text-muted-foreground">
                  Votre utilisation continue du site après modification des conditions vaut acceptation des nouvelles conditions.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">10. Droit applicable et juridiction</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  Les présentes conditions d'utilisation sont régies par le droit français.
                </p>
                <p className="text-muted-foreground">
                  En cas de litige relatif à l'interprétation ou à l'exécution des présentes conditions, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary-red" />
                <h2 className="text-2xl font-bold text-foreground">11. Contact</h2>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground">
                  Pour toute question concernant ces conditions d'utilisation :
                </p>
                <div className="ml-4 space-y-2 text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Email :</span> contact@lemaclinic-truth.com</p>
                  <p><span className="font-semibold text-foreground">Site web :</span> www.lemaclinic-truth.com</p>
                </div>
              </div>
            </section>

            {/* Date de mise à jour */}
            <section>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm italic">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-muted-foreground text-sm italic mt-2">
                  Version : 1.0
                </p>
              </div>
            </section>
          </div>

          {/* Acceptance */}
          <div className="mt-12 bg-primary-red/10 border border-primary-red/30 rounded-lg p-6 text-center">
            <p className="text-foreground text-lg font-semibold mb-2">
              En utilisant ce site, vous reconnaissez avoir lu, compris et accepté les présentes conditions d'utilisation.
            </p>
            <p className="text-muted-foreground">
              Si vous n'acceptez pas ces conditions, veuillez cesser d'utiliser le site immédiatement.
            </p>
          </div>

          {/* Back to Top Button */}
          <div className="mt-12 text-center">
            <Link to="/">
              <Button className="btn-premium px-8 py-3 rounded-lg font-bold text-white">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 LemaClinic Truth. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ConditionsUtilisation;
