export interface FeaturedPath {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export const featuredPaths: FeaturedPath[] = [
  {
    id: "garanhoes",
    title: "Garanhões",
    description:
      "Conheça genética, linhagens e características dos reprodutores.",
    image:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80",
    imageAlt: "Garanhão negro em posição nobre",
    href: "/garanhoes",
  },
  {
    id: "haras-cavalos",
    title: "Haras + Cavalos",
    description:
      "Conheça o universo do Haras Nossa Senhora Aparecida e seus animais.",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    imageAlt: "Cavalos pastando no haras ao entardecer",
    href: "/haras",
  },
  {
    id: "cavalos",
    title: "Cavalos",
    description:
      "Aprenda sobre os animais, suas particularidades e comportamento.",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    imageAlt: "Detalhe do olho de um cavalo",
    href: "/cavalos",
  },
];

