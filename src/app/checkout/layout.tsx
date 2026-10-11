import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Seguro — Haras Nossa Senhora Aparecida | Mundo dos Cavalos",
  description:
    "Finalize sua inscrição com segurança e agilidade. Pagamento via Pix com atendimento personalizado e confirmação direta.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#0d0c0a",
        minHeight: "100vh",
        color: "#f4efe4",
      }}
    >
      {children}
    </div>
  );
}
