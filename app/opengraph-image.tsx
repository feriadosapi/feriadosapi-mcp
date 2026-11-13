import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "FeriadosAPI MCP Server — Feriados brasileiros direto no seu agente de IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage(): Promise<ImageResponse> {
  const [logoData, interSemiBold, interBold, interExtraBold] = await Promise.all([
    readFile(join(process.cwd(), "public", "favicon.png")),
    readFile(join(process.cwd(), "public", "fonts", "Inter-SemiBold.woff")),
    readFile(join(process.cwd(), "public", "fonts", "Inter-Bold.woff")),
    readFile(join(process.cwd(), "public", "fonts", "Inter-ExtraBold.woff")),
  ]);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #061a2e 0%, #09223b 55%, #0d2f4f 100%)",
          padding: "56px 64px",
          fontFamily: "Inter",
          overflow: "hidden",
        }}
      >
        {/* Subtle Bioluminescent Glows */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -80,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(45,212,191,0.2) 0%, rgba(14,165,233,0.06) 45%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -100,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(14,165,233,0.03) 50%, transparent 72%)",
          }}
        />

        {/* Main 2-Column Content */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "52%",
              height: "100%",
              paddingRight: 32,
            }}
          >
            {/* Brand Header */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={logoBase64}
                width={56}
                height={56}
                style={{ width: 56, height: 56, marginRight: 16 }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 42,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: -1,
                  }}
                >
                  Feriados
                </span>
                <span
                  style={{
                    fontSize: 42,
                    fontWeight: 700,
                    color: "#0ea5e9",
                    letterSpacing: -1,
                  }}
                >
                  API
                </span>
              </div>
            </div>

            {/* Big Readable Headline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1.5,
                color: "#ffffff",
              }}
            >
              <span>Feriados do</span>
              <span>Brasil no seu</span>
              <span style={{ color: "#2dd4bf" }}>Agente de IA.</span>
            </div>

            {/* Large High-Contrast Highlights */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 38,
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.1,
                  }}
                >
                  9 Tools
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#7dd3fc",
                    marginTop: 4,
                  }}
                >
                  MCP Nativo
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 38,
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.1,
                  }}
                >
                  5.571
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#7dd3fc",
                    marginTop: 4,
                  }}
                >
                  Municípios
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#2dd4bf",
                    lineHeight: 1.1,
                  }}
                >
                  1 URL
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#7dd3fc",
                    marginTop: 4,
                  }}
                >
                  Zero Config
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: MCP Server Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
              borderRadius: 22,
              background: "#071422",
              border: "2px solid rgba(45, 212, 191, 0.35)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
          >
            {/* Window Top Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                background: "#0b1d30",
                borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#ef4444",
                    marginRight: 10,
                  }}
                />
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#f59e0b",
                    marginRight: 10,
                  }}
                />
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#10b981",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "rgba(45, 212, 191, 0.16)",
                  color: "#2dd4bf",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                MCP Server
              </div>
            </div>

            {/* Tool Call Line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "18px 26px",
                background: "rgba(15, 47, 77, 0.55)",
                borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
                fontFamily: "monospace",
                fontSize: 22,
              }}
            >
              <span
                style={{
                  color: "#2dd4bf",
                  fontWeight: 800,
                  marginRight: 12,
                }}
              >
                TOOL
              </span>
              <span style={{ color: "#f1f5f9", fontWeight: 600 }}>
                verificar_feriado
              </span>
            </div>

            {/* JSON Payload Body */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "26px 28px",
                fontFamily: "monospace",
                fontSize: 24,
                lineHeight: 1.65,
              }}
            >
              <span style={{ color: "#64748b" }}>{"{"}</span>

              <div style={{ display: "flex", paddingLeft: 20 }}>
                <span style={{ color: "#7dd3fc" }}>"ibge"</span>
                <span style={{ color: "#94a3b8", marginRight: 10 }}>:</span>
                <span style={{ color: "#fde047" }}>"3550308"</span>
                <span style={{ color: "#64748b" }}>,</span>
              </div>

              <div style={{ display: "flex", paddingLeft: 20 }}>
                <span style={{ color: "#7dd3fc" }}>"feriado"</span>
                <span style={{ color: "#94a3b8", marginRight: 10 }}>:</span>
                <span style={{ color: "#4ade80", fontWeight: 700 }}>true</span>
                <span style={{ color: "#64748b" }}>,</span>
              </div>

              <div style={{ display: "flex", paddingLeft: 20 }}>
                <span style={{ color: "#7dd3fc" }}>"bancario"</span>
                <span style={{ color: "#94a3b8", marginRight: 10 }}>:</span>
                <span style={{ color: "#f87171", fontWeight: 700 }}>false</span>
                <span style={{ color: "#64748b" }}>,</span>
              </div>

              <div style={{ display: "flex", paddingLeft: 20 }}>
                <span style={{ color: "#7dd3fc" }}>"claude"</span>
                <span style={{ color: "#94a3b8", marginRight: 10 }}>:</span>
                <span style={{ color: "#2dd4bf" }}>"connected"</span>
              </div>

              <span style={{ color: "#64748b" }}>{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interExtraBold, weight: 800, style: "normal" },
      ],
    }
  );
}
