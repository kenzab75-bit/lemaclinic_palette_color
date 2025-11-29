export interface Testimonial {
  id: number;
  category: "Complications" | "Fraude" | "Facturation";
  quote: string;
  author: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    category: "Complications",
    quote: "Après mon intervention, j'ai souffert de complications qui n'ont jamais été correctement prises en charge. Je me retrouve avec des dommages permanents.",
    author: "Patient Anonyme",
    location: "France"
  },
  {
    id: 2,
    category: "Fraude",
    quote: "La clinique a menti sur mon diagnostic pour justifier des procédures inutiles qui m'ont laissé dans un état pire.",
    author: "Marie S.",
    location: "Suisse"
  },
  {
    id: 3,
    category: "Facturation",
    quote: "Facturations abusives, frais cachés non mentionnés. Le montant final était le double du devis initial.",
    author: "Sophie M.",
    location: "Luxembourg"
  },
  {
    id: 4,
    category: "Complications",
    quote: "Suite à mon traitement dentaire, j'ai développé une infection sévère qui a nécessité plusieurs hospitalisations d'urgence.",
    author: "Jean-Pierre D.",
    location: "Belgique"
  },
  {
    id: 5,
    category: "Fraude",
    quote: "On m'a promis des implants de qualité premium, mais j'ai découvert plus tard qu'ils avaient utilisé du matériel bas de gamme.",
    author: "Patricia L.",
    location: "France"
  },
  {
    id: 6,
    category: "Facturation",
    quote: "Des frais supplémentaires continuent d'apparaître des mois après mon intervention. Impossible d'avoir une facture claire.",
    author: "Marc B.",
    location: "France"
  },
  {
    id: 7,
    category: "Complications",
    quote: "Mes nouvelles couronnes se sont décollées après seulement 3 mois. La clinique refuse de prendre ses responsabilités.",
    author: "Claire R.",
    location: "Suisse"
  },
  {
    id: 8,
    category: "Fraude",
    quote: "Le dentiste affiché n'était pas présent lors de mon intervention. Un assistant non qualifié a effectué les soins.",
    author: "Thomas H.",
    location: "Allemagne"
  },
  {
    id: 9,
    category: "Facturation",
    quote: "Ils ont facturé des actes qui n'ont jamais été réalisés. J'ai les preuves de cette surfacturation scandaleuse.",
    author: "Isabelle P.",
    location: "France"
  },
  {
    id: 10,
    category: "Complications",
    quote: "Douleurs chroniques depuis mon intervention il y a 8 mois. Aucun suivi post-opératoire digne de ce nom.",
    author: "David M.",
    location: "Canada"
  },
  {
    id: 11,
    category: "Fraude",
    quote: "Les photos avant/après montrées étaient fausses. Mon résultat n'a rien à voir avec ce qui m'avait été promis.",
    author: "Nathalie K.",
    location: "Belgique"
  },
  {
    id: 12,
    category: "Facturation",
    quote: "Prélèvements bancaires non autorisés pour des 'frais de dossier' jamais mentionnés dans le contrat initial.",
    author: "Laurent F.",
    location: "Luxembourg"
  }
];
