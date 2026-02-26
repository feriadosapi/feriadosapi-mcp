import { CalendarIcon } from "./Icons";

export function Footer() {
    return (
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
                            <a
                                href="https://www.npmjs.com/package/@feriados-api/mcp-server"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#94a3b8" }}
                            >
                                npm
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
    );
}
