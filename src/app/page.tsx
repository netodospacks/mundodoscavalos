import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import Hero from "@/sections/Hero";
import PlatformPurpose from "@/sections/PlatformPurpose";
import ImpactQuote from "@/sections/ImpactQuote";
import FeaturedPaths from "@/sections/FeaturedPaths";
import Faculty from "@/sections/Faculty";
import FacultyQuote from "@/sections/FacultyQuote";
import Testimonials from "@/sections/Testimonials";
import CourseModules from "@/sections/CourseModules";
import WantToLearnCTA from "@/sections/WantToLearnCTA";

export const metadata: Metadata = {
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
};

export default function HomePage() {
  return (
    <>
      {/* 1. Apresentação cinematográfica com vídeo de fundo */}
      <Hero />

      {/* 2. Por que a plataforma existe / Objetivo */}
      <PlatformPurpose />

      {/* 4. Frase de impacto */}
      <ImpactQuote />

      {/* 5. Três Pilares do Conhecimento (Destaque Ativo Sequencial 1 -> 2 -> 3 no Scroll) */}
      <FeaturedPaths />

      {/* 6. Corpo docente — quem ensina */}
      <Faculty />

      {/* 8. Citação do docente com foto */}
      <FacultyQuote />

      {/* 9. Módulos e Conteúdo Programático */}
      <CourseModules />

      {/* 10. Depoimentos de alunos */}
      <Testimonials />

      {/* 11. CTA final — Quero Aprender */}
      <WantToLearnCTA />
    </>
  );
}
