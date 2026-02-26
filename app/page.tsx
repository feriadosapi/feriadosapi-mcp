const CalendarIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <rect x="4" y="6" width="24" height="22" rx="4" fill="#0284c7" fillOpacity="0.1" />
    <path d="M4 10C4 7.79086 5.79086 6 8 6H24C26.2091 6 28 7.79086 28 10V12H4V10Z" fill="#0284c7" />
    <path d="M11 16H21M11 21H18" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 6V4M24 6V4" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const MCP_URL = "https://mcp.feriadosapi.com/api/mcp";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Feriados API MCP Server",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description:
    "MCP Server para consultar feriados brasileiros (nacionais, estaduais e municipais) direto no seu agente de IA",
  url: "https://mcp.feriadosapi.com",
  author: {
    "@type": "Organization",
    name: "Feriados API",
    url: "https://feriadosapi.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "100 requisições/mês grátis",
  },
};

const clients = [
  {
    name: "Claude Desktop",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
  },
  {
    name: "Cursor",
    config: `// .cursor/mcp.json
{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
  },
  {
    name: "Windsurf",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "serverUrl": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
  },
  {
    name: "Antigravity",
    config: `// .gemini/settings.json
{
  "mcpServers": {
    "feriadosapi": {
      "httpUrl": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
  },
  {
    name: "Gemini CLI",
    config: `// ~/.gemini/settings.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "OpenAI Codex",
    config: `// ~/.codex/config.json
{
  "mcpServers": {
    "feriadosapi": {
      "type": "url",
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
  },
  {
    name: "Via npx (local)",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sua_chave"
      }
    }
  }
}`,
  },
];

const tools = [
  {
    name: "buscar_feriados",
    desc: "Busca com filtros flexíveis",
    icon: "🔍",
  },
  {
    name: "feriados_nacionais",
    desc: "Feriados nacionais do Brasil",
    icon: "🇧🇷",
  },
  {
    name: "feriados_por_estado",
    desc: "Feriados por estado (UF)",
    icon: "📍",
  },
  {
    name: "feriados_por_cidade",
    desc: "Feriados por cidade (IBGE)",
    icon: "🏙️",
  },
  {
    name: "verificar_data",
    desc: "Verifica se uma data é feriado",
    icon: "📅",
  },
  { name: "listar_estados", desc: "Lista estados brasileiros", icon: "🏳️" },
  { name: "buscar_municipios", desc: "Busca municípios por UF", icon: "🏘️" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ===== NAV ===== */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CalendarIcon size={32} />
          <span
            style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", letterSpacing: "-0.02em" }}
          >
            Feriados<span style={{ color: "#0284c7" }}>API</span>
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#0284c7",
              background: "#e0f2fe",
              padding: "2px 8px",
              borderRadius: 6,
              marginLeft: 4,
            }}
          >
            MCP
          </span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a
            href="https://feriadosapi.com/docs"
            style={{ color: "#475569", fontSize: 14, fontWeight: 500 }}
          >
            Documentação
          </a>
          <a
            href="https://feriadosapi.com"
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              background: "#0284c7",
              padding: "8px 20px",
              borderRadius: 8,
            }}
          >
            Entrar
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        style={{
          background: "linear-gradient(135deg, #3b82c4 0%, #1a5276 50%, #0f3d5c 100%)",
          padding: "80px 24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 24,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            ✨ Compatível com Claude, Cursor, Gemini, ChatGPT e mais
          </div>

          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Feriados Brasileiros{" "}
            <span style={{ color: "#7dd3fc" }}>direto no seu agente de IA</span>
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 560,
              margin: "0 auto 32px",
            }}
          >
            Consulte feriados nacionais, estaduais e municipais usando o{" "}
            <strong>Model Context Protocol</strong>. Uma URL. Zero configuração.
          </p>

          {/* URL Copy Box */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: "14px 24px",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 16,
              color: "#7dd3fc",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)" }}>URL:</span>
            {MCP_URL}
          </div>

          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              marginTop: 12,
            }}
          >
            Cole esta URL nas configurações de MCP do seu cliente de IA
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginTop: 48,
            }}
          >
            {[
              { value: "7", label: "Tools" },
              { value: "5.570", label: "Municípios" },
              { value: "27", label: "Estados" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOLS ===== */}
      <section
        style={{
          background: "#f0f5fa",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1e293b",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Tools Disponíveis
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Seu agente de IA pode usar qualquer uma destas ferramentas
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {tools.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#e0f2fe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 12,
                  }}
                >
                  {t.icon}
                </div>
                <code
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#0284c7",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {t.name}
                </code>
                <span
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  {t.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONFIG ===== */}
      <section
        style={{
          background: "#fff",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1e293b",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Configuração Rápida
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Copie e cole no seu cliente de IA favorito
          </p>

          <div style={{ display: "grid", gap: 20 }}>
            {clients.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "#1e293b",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #334155",
                }}
              >
                <div
                  style={{
                    padding: "12px 20px",
                    borderBottom: "1px solid #334155",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#0284c7",
                      display: "inline-block",
                    }}
                  />
                  {c.name}
                </div>
                <pre
                  style={{
                    padding: 20,
                    margin: 0,
                    fontSize: 13,
                    color: "#94a3b8",
                    overflow: "auto",
                    fontFamily:
                      "'JetBrains Mono', 'Fira Code', monospace",
                    lineHeight: 1.6,
                  }}
                >
                  {c.config}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a5276 0%, #0f3d5c 100%)",
          padding: "64px 24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          Comece agora mesmo
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
            maxWidth: 480,
            margin: "0 auto 32px",
          }}
        >
          Crie uma conta gratuita na Feriados API e receba 100 requisições/mês
          sem custo
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <a
            href="https://feriadosapi.com"
            style={{
              background: "#fff",
              color: "#0284c7",
              padding: "14px 32px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              display: "inline-block",
            }}
          >
            Começar Teste Gratuito →
          </a>
          <a
            href="https://feriadosapi.com/docs"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 16,
              border: "1px solid rgba(255,255,255,0.3)",
              display: "inline-block",
            }}
          >
            Ver Documentação
          </a>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            marginTop: 20,
          }}
        >
          ✓ Sem cartão de crédito necessário • ✓ Cancele quando quiser
        </p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          background: "#0f172a",
          padding: "48px 24px 32px",
          color: "#94a3b8",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <CalendarIcon size={24} />
              <span style={{ fontWeight: 700, color: "#e2e8f0", letterSpacing: "-0.02em" }}>
                Feriados<span style={{ color: "#0284c7" }}>API</span>
              </span>
            </div>
            <p style={{ fontSize: 14, maxWidth: 280, lineHeight: 1.6 }}>
              A API mais completa de feriados brasileiros. Dados nacionais,
              estaduais e municipais sempre atualizados.
            </p>
          </div>

          <div style={{ display: "flex", gap: 48 }}>
            <div>
              <p
                style={{
                  fontWeight: 600,
                  color: "#e2e8f0",
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                Links Rápidos
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 14,
                }}
              >
                <a href="https://feriadosapi.com" style={{ color: "#94a3b8" }}>
                  Feriados API
                </a>
                <a
                  href="https://feriadosapi.com/docs"
                  style={{ color: "#94a3b8" }}
                >
                  Documentação
                </a>
                <a
                  href="https://github.com/feriadosapi/feriadosapi-mcp"
                  style={{ color: "#94a3b8" }}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: "32px auto 0",
            borderTop: "1px solid #1e293b",
            paddingTop: 24,
            textAlign: "center",
            fontSize: 13,
            color: "#475569",
          }}
        >
          © 2026 Feriados API. Todos os direitos reservados. Desenvolvido com ❤️
          no Brasil 🇧🇷
        </div>
      </footer>
    </div>
  );
}
