import { MCP_URL } from "../../data/config";

export function Hero() {
    return (
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

                {/* npm badge */}
                <a
                    href="https://www.npmjs.com/package/@feriados-api/mcp-server"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 20,
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 8,
                        padding: "8px 16px",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 13,
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "background 0.2s ease, border-color 0.2s ease",
                    }}
                >
                    <svg viewBox="0 0 780 250" width="20" height="20">
                        <path fill="#CB3837" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
                    </svg>
                    <span>npm install <code style={{ color: "#7dd3fc", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>@feriados-api/mcp-server</code></span>
                </a>

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
    );
}
