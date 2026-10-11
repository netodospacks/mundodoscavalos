import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping JAR 2026 — Genética JAR à sua disposição",
  description:
    "Durante a Tropa de Elite JAR 2026, no dia 12 de outubro, o Haras realiza mais uma edição do Shopping JAR. 10 animais disponíveis para venda com negociação direta.",
  openGraph: {
    title: "Shopping JAR 2026 — Genética JAR à sua disposição",
    description:
      "Venda individual de 10 animais selecionados com a genética JAR. Não é leilão: preços pré-fixados e negociação direta.",
    images: [
      {
        url: "/images/shopping-jar-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Shopping JAR 2026 — Haras Nossa Senhora Aparecida",
      },
    ],
  },
};

export default function ShoppingJarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
