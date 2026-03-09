import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const SITE_URL = "https://mcp.feriadosapi.com";
const PRODUCTION_HOSTNAME = "mcp.feriadosapi.com";
const DEFAULT_GA_ID = "G-LS0CTT1B6F";
const DEFAULT_CLARITY_ID = "vspomwuxio";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? DEFAULT_GA_ID;
const CLARITY_ID =
  process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID ??
  process.env.NEXT_PUBLIC_CLARITY_ID ??
  process.env.CLARITY_ID ??
  DEFAULT_CLARITY_ID;
const shouldLoadGoogleAnalytics =
  process.env.NODE_ENV === "production" && Boolean(GA_ID);
const shouldLoadClarity =
  process.env.NODE_ENV === "production" && Boolean(CLARITY_ID);

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
      <body>
        {children}
        <Analytics />
        {shouldLoadGoogleAnalytics ? (
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.location.hostname === "${PRODUCTION_HOSTNAME}") {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;

                  var script = document.createElement('script');
                  script.async = true;
                  script.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
                  document.head.appendChild(script);

                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                }
              `,
            }}
          />
        ) : null}
        {shouldLoadClarity ? (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  if (window.location.hostname !== "${PRODUCTION_HOSTNAME}") return;

                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
              `,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
