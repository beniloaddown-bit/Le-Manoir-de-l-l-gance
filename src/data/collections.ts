import ceremonyImage from "@/assets/collection-ceremony.jpg";
import weddingImage from "@/assets/collection-wedding.jpg";
import businessImage from "@/assets/collection-business.jpg";
import bespokeImage from "@/assets/collection-bespoke.jpg";

export const WHATSAPP_NUMBER = "1234567890";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  featured?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  heroImage: string;
  category: string;
  products: Product[];
}

export const collections: Collection[] = [
  {
    id: "ceremony",
    slug: "ceremony",
    title: "Tenues de Cérémonie",
    subtitle: "L'Art de la Célébration",
    description: "Des créations majestueuses pour vos moments les plus précieux",
    longDescription: "Nos tenues de cérémonie incarnent la quintessence du luxe africain. Chaque pièce est méticuleusement confectionnée par nos maîtres tailleurs, utilisant des tissus d'exception et des broderies dorées réalisées à la main. Ces créations sont conçues pour les hommes et femmes qui souhaitent affirmer leur présence lors d'événements d'envergure.",
    heroImage: ceremonyImage,
    category: "Cérémonie",
    products: [
      {
        id: "cer-001",
        name: "Agbada Royal Impérial",
        description: "Grand boubou brodé main avec fils d'or",
        longDescription: "Ce majestueux Agbada incarne l'essence même du prestige africain. Confectionné dans un bazin riche de première qualité, il est orné de broderies dorées réalisées entièrement à la main par nos artisans les plus expérimentés. La coupe ample et élégante offre une silhouette royale, parfaite pour les cérémonies de haut standing.",
        price: "Sur devis",
        image: ceremonyImage,
        images: [ceremonyImage, weddingImage, businessImage, bespokeImage],
        colors: ["Blanc Ivoire", "Or Royal", "Bleu Nuit"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true,
      },
      {
        id: "cer-002",
        name: "Ensemble Sénateur Prestige",
        description: "Tenue sénateur avec broderies raffinées",
        longDescription: "L'ensemble Sénateur Prestige représente l'élégance masculine africaine dans sa forme la plus aboutie. Le tissu bazin de haute qualité est rehaussé de broderies géométriques subtiles, créant un équilibre parfait entre tradition et modernité. Idéal pour les réceptions officielles et cérémonies prestigieuses.",
        price: "Sur devis",
        image: ceremonyImage,
        images: [ceremonyImage, businessImage, weddingImage],
        colors: ["Blanc Cassé", "Gris Perle", "Beige Doré"],
        sizes: ["M", "L", "XL", "XXL"],
      },
      {
        id: "cer-003",
        name: "Kaftan Élégance Suprême",
        description: "Kaftan luxueux en soie brodée",
        longDescription: "Ce kaftan d'exception marie la douceur de la soie pure aux broderies traditionnelles africaines. Sa coupe fluide et ses finitions impeccables en font une pièce de choix pour les hommes qui recherchent l'excellence. Les détails dorés apportent une touche de noblesse incomparable.",
        price: "Sur devis",
        image: ceremonyImage,
        images: [ceremonyImage, bespokeImage, weddingImage],
        colors: ["Noir Profond", "Bordeaux", "Vert Émeraude"],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        id: "cer-004",
        name: "Boubou Diamant Noir",
        description: "Boubou contemporain à motifs géométriques",
        longDescription: "Le Boubou Diamant Noir réinvente les codes du vêtement traditionnel africain. Son tissu bazin premium arbore des motifs géométriques inspirés de l'art déco, créant une pièce résolument moderne tout en respectant l'héritage culturel. Les broderies argentées sur fond noir créent un contraste saisissant.",
        price: "Sur devis",
        image: ceremonyImage,
        images: [ceremonyImage, businessImage, bespokeImage],
        colors: ["Noir", "Marine", "Anthracite"],
        sizes: ["M", "L", "XL", "XXL"],
      },
      {
        id: "cer-005",
        name: "Grand Boubou Sahélien",
        description: "Tenue traditionnelle revisitée",
        longDescription: "Inspiré des vastes étendues du Sahel, ce grand boubou capture l'essence de la noblesse africaine. Le tissu damassé de qualité supérieure est orné de broderies traditionnelles aux motifs ancestraux, transmis de génération en génération par nos maîtres artisans.",
        price: "Sur devis",
        image: ceremonyImage,
        images: [ceremonyImage, weddingImage, bespokeImage],
        colors: ["Sable Doré", "Terracotta", "Ocre"],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "cer-006",
        name: "Costume Mandingue Royal",
        description: "Ensemble trois pièces avec cape brodée",
        longDescription: "Cet ensemble trois pièces d'inspiration mandingue comprend un pantalon ample, une tunique ajustée et une cape majestueuse. Chaque élément est brodé à la main avec des fils d'or et d'argent, créant une harmonie visuelle exceptionnelle pour les occasions les plus solennelles.",
        price: "Sur devis",
        image: ceremonyImage,
        images: [ceremonyImage, businessImage, weddingImage, bespokeImage],
        colors: ["Or Antique", "Ivoire", "Blanc Neige"],
        sizes: ["M", "L", "XL"],
        featured: true,
      },
    ],
  },
  {
    id: "wedding",
    slug: "mariage",
    title: "Mariage & Baptême",
    subtitle: "L'Union de l'Élégance",
    description: "Sublimez vos célébrations avec nos tenues d'exception",
    longDescription: "Votre jour de mariage mérite une tenue à la hauteur de vos rêves. Notre collection Mariage & Baptême propose des créations uniques, alliant tradition africaine et sophistication contemporaine. Chaque pièce est personnalisable pour refléter votre style et l'importance de ce moment sacré.",
    heroImage: weddingImage,
    category: "Mariage",
    products: [
      {
        id: "wed-001",
        name: "Ensemble Marié Impérial",
        description: "Tenue complète pour le marié moderne",
        longDescription: "L'Ensemble Marié Impérial est notre création phare pour les mariages d'exception. Cette tenue trois pièces en bazin supérieur comprend un grand boubou richement brodé, une tunique intérieure assortie et un pantalon élégant. Les broderies dorées symbolisent la prospérité et le bonheur conjugal.",
        price: "Sur devis",
        image: weddingImage,
        images: [weddingImage, ceremonyImage, bespokeImage, businessImage],
        colors: ["Blanc Pur", "Ivoire", "Champagne"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true,
      },
      {
        id: "wed-002",
        name: "Robe Mariée Africaine",
        description: "Robe de mariée en dentelle et wax premium",
        longDescription: "Cette robe de mariée unique fusionne la dentelle française avec des accents de wax africain. La coupe sirène épouse élégamment les courbes, tandis que la traîne brodée de perles crée un effet dramatique. Une création pour les mariées qui osent affirmer leur héritage.",
        price: "Sur devis",
        image: weddingImage,
        images: [weddingImage, bespokeImage, ceremonyImage],
        colors: ["Blanc", "Ivoire", "Champagne Rosé"],
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: true,
      },
      {
        id: "wed-003",
        name: "Costume Témoin Prestige",
        description: "Ensemble élégant pour témoins et garçons d'honneur",
        longDescription: "Ce costume raffiné est conçu pour les témoins qui souhaitent briller aux côtés des mariés. Le bazin de qualité supérieure est travaillé avec des broderies discrètes mais sophistiquées, créant une élégance sobre parfaitement adaptée à leur rôle d'honneur.",
        price: "Sur devis",
        image: weddingImage,
        images: [weddingImage, businessImage, ceremonyImage],
        colors: ["Gris Perle", "Bleu Ciel", "Beige"],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        id: "wed-004",
        name: "Ensemble Baptême Nouveau-Né",
        description: "Tenue de cérémonie pour bébé",
        longDescription: "Accueillez votre enfant avec cette adorable tenue de baptême. Confectionnée dans des tissus doux et hypoallergéniques, elle arbore des broderies délicates symbolisant protection et bénédiction. Disponible pour garçons et filles.",
        price: "Sur devis",
        image: weddingImage,
        images: [weddingImage, ceremonyImage],
        colors: ["Blanc", "Crème", "Rose Poudré", "Bleu Ciel"],
        sizes: ["0-3 mois", "3-6 mois", "6-12 mois"],
      },
      {
        id: "wed-005",
        name: "Ensemble Parents Baptême",
        description: "Tenue coordonnée pour les parents",
        longDescription: "Cet ensemble coordonné permet aux parents de briller lors du baptême de leur enfant. Le père porte un ensemble sénateur élégant tandis que la mère est vêtue d'une robe assortie. Les tissus et broderies sont harmonisés pour créer une unité visuelle parfaite.",
        price: "Sur devis",
        image: weddingImage,
        images: [weddingImage, ceremonyImage, bespokeImage],
        colors: ["Blanc Uni", "Ivoire Brodé", "Champagne"],
        sizes: ["Sur mesure"],
      },
      {
        id: "wed-006",
        name: "Collection Famille Unie",
        description: "Tenues assorties pour toute la famille",
        longDescription: "Pour les familles qui souhaitent afficher leur unité lors des célébrations, nous proposons des ensembles parfaitement coordonnés. Du grand-père au plus jeune enfant, chaque membre porte une tenue unique mais harmonisée avec l'ensemble familial.",
        price: "Sur devis",
        image: weddingImage,
        images: [weddingImage, ceremonyImage, businessImage, bespokeImage],
        colors: ["Personnalisable"],
        sizes: ["Tous âges"],
      },
    ],
  },
  {
    id: "business",
    slug: "business",
    title: "Bureau & Formel",
    subtitle: "L'Excellence Professionnelle",
    description: "L'élégance professionnelle avec une touche africaine distinctive",
    longDescription: "Notre collection Bureau & Formel redéfinit le dress code professionnel en y insufflant l'élégance africaine. Ces créations permettent aux hommes et femmes d'affaires de se distinguer tout en respectant les codes vestimentaires formels. Parfaites pour les réunions importantes, conférences et événements corporate.",
    heroImage: businessImage,
    category: "Business",
    products: [
      {
        id: "bus-001",
        name: "Costume Exécutif Ankara",
        description: "Costume deux pièces avec touches wax subtiles",
        longDescription: "Ce costume exécutif innove en intégrant subtilement des éléments de wax africain dans un design contemporain. La veste cintrée présente un col et des poches ornés de wax premium, tandis que le pantalon reste classique. Une fusion parfaite entre Afrique et modernité.",
        price: "Sur devis",
        image: businessImage,
        images: [businessImage, ceremonyImage, bespokeImage, weddingImage],
        colors: ["Bleu Marine", "Gris Anthracite", "Noir"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true,
      },
      {
        id: "bus-002",
        name: "Chemise Directeur Premium",
        description: "Chemise en coton égyptien avec col brodé",
        longDescription: "Cette chemise haut de gamme est confectionnée en coton égyptien 300 fils pour un confort et une élégance incomparables. Le col et les poignets sont délicatement brodés de motifs africains discrets, ajoutant une signature culturelle à votre tenue professionnelle.",
        price: "Sur devis",
        image: businessImage,
        images: [businessImage, ceremonyImage, weddingImage],
        colors: ["Blanc", "Bleu Clair", "Rose Pâle"],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "bus-003",
        name: "Ensemble Sénatrice",
        description: "Tailleur féminin d'inspiration africaine",
        longDescription: "Cet ensemble tailleur pour femmes d'affaires combine coupe européenne et touches africaines. La veste structurée et la jupe crayon sont réalisées dans un tissu de qualité supérieure, avec des détails brodés aux poignets et au col qui affirment votre identité culturelle avec raffinement.",
        price: "Sur devis",
        image: businessImage,
        images: [businessImage, weddingImage, bespokeImage],
        colors: ["Noir", "Bordeaux", "Vert Forêt"],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        id: "bus-004",
        name: "Kaftan Business",
        description: "Kaftan épuré pour cadres",
        longDescription: "Ce kaftan contemporain est spécialement conçu pour l'environnement professionnel. Sa coupe moderne et ses lignes épurées en font une alternative élégante au costume occidental. Le tissu léger permet un confort optimal tout au long de la journée de travail.",
        price: "Sur devis",
        image: businessImage,
        images: [businessImage, ceremonyImage, bespokeImage],
        colors: ["Gris Clair", "Beige", "Blanc Cassé"],
        sizes: ["M", "L", "XL", "XXL"],
      },
      {
        id: "bus-005",
        name: "Robe Bureau Élégance",
        description: "Robe professionnelle aux accents africains",
        longDescription: "Cette robe professionnelle allie sobriété et caractère. La coupe droite et classique est rehaussée par une ceinture en wax et des boutons personnalisés aux motifs africains. Parfaite pour les femmes qui veulent afficher leur élégance au bureau.",
        price: "Sur devis",
        image: businessImage,
        images: [businessImage, weddingImage, ceremonyImage],
        colors: ["Marine", "Noir", "Bordeaux"],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        id: "bus-006",
        name: "Ensemble Conférence",
        description: "Tenue complète pour événements corporate",
        longDescription: "Cet ensemble est conçu pour les professionnels qui représentent leur entreprise lors d'événements majeurs. L'alliance d'un costume impeccable avec des accessoires africains coordonnés (pochette, boutons de manchette, cravate) crée une image mémorable et distinctive.",
        price: "Sur devis",
        image: businessImage,
        images: [businessImage, ceremonyImage, weddingImage, bespokeImage],
        colors: ["Sur mesure"],
        sizes: ["Sur mesure"],
        featured: true,
      },
    ],
  },
  {
    id: "bespoke",
    slug: "sur-mesure",
    title: "Sur-Mesure",
    subtitle: "Votre Vision, Notre Savoir-Faire",
    description: "Créations uniques, taillées selon vos désirs",
    longDescription: "Le service Sur-Mesure du Manoir de l'Élégance représente l'apogée de notre savoir-faire. Chaque création est entièrement personnalisée selon vos mesures exactes, vos préférences de tissus, de couleurs et de broderies. Nos maîtres tailleurs travaillent en étroite collaboration avec vous pour donner vie à votre vision.",
    heroImage: bespokeImage,
    category: "Bespoke",
    products: [
      {
        id: "bes-001",
        name: "Création Signature",
        description: "Tenue entièrement personnalisée",
        longDescription: "La Création Signature est notre service phare. De la première consultation à la livraison finale, vous êtes accompagné par nos experts. Choix du tissu parmi notre collection premium, design des broderies, ajustements multiples - chaque détail est personnalisé pour créer une pièce véritablement unique.",
        price: "À partir de consultation",
        image: bespokeImage,
        images: [bespokeImage, ceremonyImage, weddingImage, businessImage],
        colors: ["Illimité"],
        sizes: ["Mesures exactes"],
        featured: true,
      },
      {
        id: "bes-002",
        name: "Ensemble Famille Royal",
        description: "Collection sur-mesure pour toute la famille",
        longDescription: "Pour les événements familiaux importants, nous créons des ensembles coordonnés pour chaque membre de la famille. Du patriarche aux plus jeunes, chaque tenue est unique tout en maintenant une harmonie visuelle parfaite qui reflète l'unité et le prestige familial.",
        price: "Sur consultation",
        image: bespokeImage,
        images: [bespokeImage, weddingImage, ceremonyImage, businessImage],
        colors: ["Personnalisable"],
        sizes: ["Tous membres"],
        featured: true,
      },
      {
        id: "bes-003",
        name: "Tenue Événement Spécial",
        description: "Création pour occasion unique",
        longDescription: "Investiture, remise de décoration, anniversaire majeur... Certaines occasions méritent une tenue exceptionnelle. Notre équipe conçoit des créations spécialement adaptées à l'événement, intégrant symboles, couleurs et éléments significatifs pour cette occasion unique.",
        price: "Sur consultation",
        image: bespokeImage,
        images: [bespokeImage, ceremonyImage, weddingImage],
        colors: ["Selon événement"],
        sizes: ["Sur mesure"],
      },
      {
        id: "bes-004",
        name: "Collection Entreprise",
        description: "Uniformes d'entreprise haut de gamme",
        longDescription: "Nous créons des collections complètes pour les entreprises souhaitant habiller leurs équipes avec élégance. Des uniformes de direction aux tenues d'accueil, chaque pièce reflète l'identité de votre entreprise tout en offrant confort et distinction à vos collaborateurs.",
        price: "Devis entreprise",
        image: bespokeImage,
        images: [bespokeImage, businessImage, ceremonyImage],
        colors: ["Couleurs corporate"],
        sizes: ["Toutes tailles"],
      },
      {
        id: "bes-005",
        name: "Réplique Historique",
        description: "Recréation de tenues traditionnelles",
        longDescription: "Nous recréons fidèlement des tenues historiques et traditionnelles africaines. Qu'il s'agisse de costumes royaux ancestraux ou de tenues régionales spécifiques, nos artisans maîtrisent les techniques traditionnelles pour donner vie à ces pièces d'exception.",
        price: "Sur étude",
        image: bespokeImage,
        images: [bespokeImage, ceremonyImage, weddingImage],
        colors: ["Authentiques"],
        sizes: ["Sur mesure"],
      },
      {
        id: "bes-006",
        name: "Garde-Robe Complète",
        description: "Service de personal styling intégral",
        longDescription: "Notre service le plus exclusif : nous créons votre garde-robe africaine complète. Après une analyse approfondie de votre style de vie et vos besoins, nous concevons une collection personnelle comprenant tenues de cérémonie, vêtements professionnels et pièces du quotidien.",
        price: "Sur rendez-vous",
        image: bespokeImage,
        images: [bespokeImage, businessImage, weddingImage, ceremonyImage],
        colors: ["Palette personnelle"],
        sizes: ["Exclusif"],
        featured: true,
      },
    ],
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getProductById = (collectionSlug: string, productId: string): Product | undefined => {
  const collection = getCollectionBySlug(collectionSlug);
  return collection?.products.find((p) => p.id === productId);
};
