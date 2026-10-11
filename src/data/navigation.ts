export interface NavItem {
  label: string;
  href: string;
  isHighlighted?: boolean;
  target?: string;
  rel?: string;
}

export const navItems: NavItem[] = [
  { label: "Cursos", href: "/cursos" },
  { label: "História do Haras", href: "/historia" },
  { label: "Shopping JAR 2026", href: "/shopping-jar-2026", isHighlighted: true },
  {
    label: "Projeto Bem Viver",
    href: "https://bemviverecoterapia1-two.vercel.app",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
