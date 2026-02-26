import { CalendarIcon } from "./Icons";

export function Navbar() {
    return (
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
                    href="https://feriadosapi.com/login"
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
    );
}
