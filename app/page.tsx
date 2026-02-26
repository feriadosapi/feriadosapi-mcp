import { Navbar } from "../src/components/home/Navbar";
import { Hero } from "../src/components/home/Hero";
import { ToolReference } from "../src/components/home/ToolReference";
import { ConfigQuickStart } from "../src/components/home/ConfigQuickStart";
import { CTA } from "../src/components/home/CTA";
import { Footer } from "../src/components/home/Footer";
import { jsonLd } from "../src/data/schema";

export const metadata = {
  title: "Feriados API MCP Server",
  description: "MCP Server para consultar feriados brasileiros direto no seu agente de IA.",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <Hero />
      <ToolReference />
      <ConfigQuickStart />
      <CTA />
      <Footer />
    </div>
  );
}
