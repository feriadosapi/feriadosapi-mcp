"use client";

import { useState } from "react";
import { toolDetails } from "../../data/tools";

export function ToolReference() {
  const [selectedTool, setSelectedTool] = useState(0);
  const activeTool = toolDetails[selectedTool];

  return (
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
            marginBottom: 32,
          }}
        >
          Selecione uma tool para ver parâmetros, tipos e retornos
        </p>

        {/* Tool Selector Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {toolDetails.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setSelectedTool(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 8,
                border: selectedTool === i ? "2px solid #0284c7" : "1px solid #cbd5e1",
                background: selectedTool === i ? "#e0f2fe" : "#fff",
                color: selectedTool === i ? "#0284c7" : "#475569",
                fontWeight: selectedTool === i ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: selectedTool === i ? "0 0 0 1px #0284c7" : "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <code style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 12 }}>
                {t.name}
              </code>
            </button>
          ))}
        </div>

        {/* Selected Tool Detail */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {/* Tool Header */}
          <div
            style={{
              background: "#1e293b",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>{activeTool.icon}</span>
            <code
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#7dd3fc",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            >
              {activeTool.name}
            </code>
            <span
              style={{
                fontSize: 13,
                color: "#94a3b8",
                marginLeft: 4,
              }}
            >
              — {activeTool.title}
            </span>
          </div>

          {/* Tool Body */}
          <div style={{ padding: "24px", background: "#fff" }}>
            {/* Description */}
            <p
              style={{
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              {activeTool.description}
            </p>

            {/* Parameters */}
            {activeTool.params.length > 0 ? (
              <>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1e293b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}
                >
                  Parâmetros
                </h4>
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                  }}
                >
                  {activeTool.params.map((p, i) => (
                    <div
                      key={p.name}
                      style={{
                        padding: "12px 16px",
                        borderBottom:
                          i < activeTool.params.length - 1
                            ? "1px solid #e2e8f0"
                            : "none",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          minWidth: 180,
                        }}
                      >
                        <code
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#0284c7",
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                          }}
                        >
                          {p.name}
                        </code>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: p.required ? "#fef2f2" : "#f0f9ff",
                            color: p.required ? "#dc2626" : "#0284c7",
                            border: `1px solid ${p.required ? "#fecaca" : "#bae6fd"}`,
                          }}
                        >
                          {p.required ? "obrigatório" : "opcional"}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <span
                          style={{
                            fontSize: 13,
                            color: "#475569",
                            lineHeight: 1.5,
                          }}
                        >
                          {p.desc}
                        </span>
                        <div style={{ marginTop: 4 }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#94a3b8",
                              marginRight: 4,
                            }}
                          >
                            Tipo:
                          </span>
                          <code
                            style={{
                              fontSize: 11,
                              color: "#64748b",
                              background: "#e2e8f0",
                              padding: "1px 5px",
                              borderRadius: 3,
                              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}
                          >
                            {p.type}
                          </code>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#94a3b8",
                              marginLeft: 10,
                              marginRight: 4,
                            }}
                          >
                            Ex:
                          </span>
                          <code
                            style={{
                              fontSize: 11,
                              color: "#0369a1",
                              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            }}
                          >
                            {p.example}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  fontStyle: "italic",
                  marginBottom: 0,
                }}
              >
                ✨ Nenhum parâmetro necessário — basta chamar a tool.
              </p>
            )}

            {/* Return */}
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 8,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#166534",
                  whiteSpace: "nowrap",
                }}
              >
                ↩ Retorno:
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#166534",
                  lineHeight: 1.5,
                }}
              >
                {activeTool.returns}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
