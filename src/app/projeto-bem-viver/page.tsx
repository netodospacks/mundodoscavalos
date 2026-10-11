import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Projeto Bem Viver — Equoterapia e Terapias Integradas",
  description: "Redirecionando para a plataforma oficial do Projeto Bem Viver...",
};

export default function ProjetoBemViverPage() {
  redirect("https://bemviverecoterapia1-two.vercel.app");
}
