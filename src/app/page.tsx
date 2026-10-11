import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

// Seções refinadas da Página Principal
import Hero from "@/sections/Hero";
import CoursesSection from "@/sections/CoursesSection";
import PlatformPurpose from "@/sections/PlatformPurpose";

export const metadata: Metadata = {
  title: "Mundo dos Cavalos — Haras Nossa Senhora Aparecida",
  description:
    "Plataforma educacional e institucional dedicada ao universo equino. Cursos de manejo, bem-estar, nutrição e formação profissional com o Haras Nossa Senhora Aparecida.",
  keywords: [
    "curso tratador de equinos",
    "capacitação equinos",
    "manejo de cavalos",
    "curso cavalos presencial",
    "mundo dos cavalos",
    "haras nossa senhora aparecida",
    "equinocultura",
    "zootecnia equina",
  ],
  openGraph: {
    title: "Mundo dos Cavalos — Haras Nossa Senhora Aparecida",
    description:
      "Aprenda a cuidar de cavalos com ciência e respeito. Formação prática e capacitação profissional com o Haras Nossa Senhora Aparecida.",
    type: "website",
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO: Apresentação cinematográfica e boas-vindas */}
      <Hero />

      {/* 2. ÁREA DE CURSOS: Apresentação do Curso em Destaque (Presencial) */}
      {/* Cursos online "Em breve" oculto na home, visível na aba Cursos */}
      <CoursesSection showOnlineNotice={false} />

      {/* 3. PROPÓSITO INSTITUCIONAL & HARAS NOSSA SENHORA APARECIDA */}
      <PlatformPurpose />
    </main>
  );
}
