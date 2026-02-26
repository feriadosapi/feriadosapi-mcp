import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://mcp.feriadosapi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Feriados API — MCP Server",
    template: "%s | Feriados API MCP",
  },
  description:
    "Consulte feriados brasileiros (nacionais, estaduais e municipais) direto no seu agente de IA favorito usando o Model Context Protocol (MCP). Compatível com Claude, Cursor, Gemini e ChatGPT.",
  keywords: [
    "feriados",
    "brasil",
    "MCP",
    "Model Context Protocol",
    "API",
    "Claude",
    "Cursor",
    "Gemini",
    "ChatGPT",
    "feriados brasileiros",
    "agente IA",
    "holidays brazil",
  ],
  authors: [{ name: "Feriados API", url: "https://feriadosapi.com" }],
  creator: "Feriados API",
  publisher: "Feriados API",

  // Canonical
  alternates: {
    canonical: SITE_URL,
  },

  // OpenGraph
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Feriados API — MCP Server",
    title: "Feriados API — MCP Server",
    description:
      "Consulte feriados brasileiros direto no seu agente de IA com MCP. 7 tools, 5.570 municípios, 27 estados. Uma URL, zero configuração.",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Feriados API — MCP Server",
    description:
      "Consulte feriados brasileiros direto no seu agente de IA com MCP. Uma URL, zero configuração.",
    creator: "@feriadosapi",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
