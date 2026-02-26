"use client";

import { useState } from "react";
import { clients } from "../../data/clients";

export function ConfigQuickStart() {
    const [selectedClient, setSelectedClient] = useState(0);
    const activeClient = clients[selectedClient];

    return (
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
                        marginBottom: 32,
                    }}
                >
                    Selecione seu cliente de IA e copie a configuração
                </p>

                {/* Client Selector Tabs */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        justifyContent: "center",
                        marginBottom: 24,
                    }}
                >
                    {clients.map((c, i) => (
                        <button
                            key={c.name}
                            onClick={() => setSelectedClient(i)}
                            style={{
                                padding: "8px 18px",
                                borderRadius: 8,
                                border: selectedClient === i ? "2px solid #0284c7" : "1px solid #cbd5e1",
                                background: selectedClient === i ? "#0284c7" : "#fff",
                                color: selectedClient === i ? "#fff" : "#475569",
                                fontWeight: selectedClient === i ? 700 : 500,
                                fontSize: 13,
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                boxShadow: selectedClient === i
                                    ? "0 2px 8px rgba(2,132,199,0.3)"
                                    : "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>

                {/* Selected Config */}
                <div
                    style={{
                        background: "#1e293b",
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid #334155",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
                        {activeClient.name}
                    </div>
                    <pre
                        style={{
                            padding: 20,
                            margin: 0,
                            fontSize: 13,
                            color: "#94a3b8",
                            overflow: "auto",
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            lineHeight: 1.6,
                        }}
                    >
                        {activeClient.config}
                    </pre>
                </div>
            </div>
        </section>
    );
}
