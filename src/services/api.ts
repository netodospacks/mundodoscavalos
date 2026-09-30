// Service layer — estruturado para futura conexão com Supabase.
// Por enquanto retorna dados estáticos dos arquivos de data/.

import { siteConfig } from "@/data/siteConfig";
import { courseModules, courseInfo } from "@/data/courseModules";
import { faculty, mainFaculty } from "@/data/faculty";
import { featuredPaths } from "@/data/paths";
import { testimonials } from "@/data/testimonials";
import { navItems } from "@/data/navigation";

export const api = {
  getSiteConfig: async () => siteConfig,
  getCourseModules: async () => courseModules,
  getCourseInfo: async () => courseInfo,
  getFaculty: async () => faculty,
  getMainFaculty: async () => mainFaculty,
  getFeaturedPaths: async (limit?: number) =>
    limit ? featuredPaths.slice(0, limit) : featuredPaths,
  getTestimonials: async () => testimonials,
  getNavItems: async () => navItems,
};
