export type TimelineStep = {
  id: string;
  stepNumber: string;
  cardTitle: string;
  cardDescription: string;
  modalTitle: string;
  modalDescription: string;
  details: string[];
  sources: {
    label: string;
    description?: string;
  }[];
};

export const timelineSteps: TimelineStep[] = [
  {
    id: "appat",
    stepNumber: "Étape 1",
    cardTitle: "L'appât",
    cardDescription:
      'Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins "Haut de gamme", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.',
    modalTitle: "L'appât commercial",
    modalDescription:
      'Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins "Haut de gamme", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.',
    details: [
      "Publicités agressives sur les réseaux sociaux Instagram, Facebook",
      'Promesses de prix 60-70% moins chers avec des "garanties" attractives (Hôtel 5 étoiles, transfert gratuit etc)',
      "Communication ultra-réactive et rassurante via WhatsApp et proposition de devis immédiat",
      "Collaboration avec des influenceurs et stars internationales pour promouvoir la clinique",
    ],
    sources: [
      { label: "Témoignage patient #12", description: "Facture initiale de 3500€ pour 28 soins prothétiques" },
      { label: "Capture écran Facebook, Instagram, site web" },
      { label: "Conversation WhatsApp" },
    ],
  },
  {
    id: "piege",
    stepNumber: "Étape 2",
    cardTitle: "Le piège",
    cardDescription:
      "Une fois à Istanbul, ils vous isolent et vous placent sous pression. Les conditions changent, les prix explosent, et vous êtes pris au piège, loin de chez vous et vulnérable.",
    modalTitle: "Le piège",
    modalDescription:
      "Une fois sur place, vous vous retrouvez pris au piège, entièrement dépendants de la clinique, qui exploite cette position de force pour accélérer les procédures. Les consentements sont modifiés à la volée, les devis gonflés, sous pression psychologique et logistique. Refuser devient impensable, au risque de compromettre vos ressources et le séjour déjà engagé.",
    details: [
      "Examen initial bâclé, expédié en moins de dix minutes",
      "Traitement invasif prévu et adapté modifié sur place, au profit de soins beaucoup plus coûteux, souvent sans anesthésie",
      "Multiplication des actes : meulage, dévitalisations, couronnes, nouveaux devis",
      "Inflation des prix : facture finale 2 à 3 fois supérieure au devis",
      "Menaces et pression : paiement en espèces, pression pour payer rapidement",
    ],
    sources: [
      { label: "Factures comparées", description: "Devis initial/ordre ajoutés traitement" },
      { label: "Export de conversations WhatsApp" },
    ],
  },
  {
    id: "impasse",
    stepNumber: "Étape 3",
    cardTitle: "L'impasse",
    cardDescription:
      "Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...",
    modalTitle: "L'impasse",
    modalDescription:
      "Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...",
    details: [
      "Complications post-opératoires graves : douleurs chroniques, pulpite",
      "Absence totale de suivi médical réel et retour en Europe",
      "Prothèses ratées et implants mal posés nécessitant de grosses révisions",
      "Refus de prise en charge des complications",
      "Coûts de réparation en Europe dépassant largement les économies initiales",
    ],
    sources: [
      { label: "Rapports et examens médicaux", description: "Dentistes français 2023" },
      { label: "Témoignage patient" },
    ],
  },
  {
    id: "verite",
    stepNumber: "Étape 4",
    cardTitle: "La vérité",
    cardDescription:
      "Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.",
    modalTitle: "La vérité éclate",
    modalDescription:
      "Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.",
    details: [
      "Création de groupes d'entraide et de témoignages de victimes",
      "Publication de preuves concrètes : factures, photos, rapports médicaux",
      "Médiatisation croissante de l'affaire par les médias européens",
      "Mobilisation pour ouvrir des plaintes pénales et prévenir de nouveaux cas",
      "Demande d'enquête officielle sur les pratiques de la clinique",
    ],
    sources: [
      { label: "Groupe Facebook", description: "Nombreux témoignages recensés" },
      { label: "Plainte en cours de dépôt" },
    ],
  },
];
