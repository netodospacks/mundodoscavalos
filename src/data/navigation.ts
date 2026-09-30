export interface NavItem {
  label: string;
  href: string;
  isHighlighted?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossa História", href: "/nossa-historia" },
  { label: "Pacotes de Cursos", href: "/pacotes" },
  { label: "Programas", href: "/programas" },
  { label: "Haras NS Aparecida", href: "/haras" },
  { label: "Conta / Login", href: "/login", isHighlighted: true },
];
