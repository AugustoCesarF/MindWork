import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindWork — Bem-Estar Corporativo",
  description:
    "Plataforma de monitoramento de saúde mental corporativa para PMEs brasileiras. Acompanhe o bem-estar da sua equipe com dados seguros e anônimos.",
  keywords: [
    "saúde mental",
    "bem-estar corporativo",
    "RH",
    "PME",
    "monitoramento",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-inter antialiased min-h-screen bg-[var(--bg)]">
        {children}
      </body>
    </html>
  );
}
