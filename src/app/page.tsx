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

      {/* 3. Frase de impacto */}
      <ImpactQuote />

      {/* 4. Três caminhos de exploração (Garanhões, Haras + Cavalos, Cavalos) */}
      <FeaturedPaths />

      {/* 5. Corpo docente — quem ensina */}
      <Faculty />

      {/* 6. Citação do docente com foto */}
      <FacultyQuote />

      {/* 7. Módulos e Conteúdo Programático (Manejo, Nutrição, Produção, Primeiros Socorros, Informações & Comece agora) */}
      <CourseModules />

      {/* 8. Depoimentos de alunos */}
      <Testimonials />

      {/* 9. CTA final — Quero Aprender */}
      <WantToLearnCTA />
    </>
  );
}

