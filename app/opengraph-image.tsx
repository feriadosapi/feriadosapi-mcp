import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
    "Feriados API MCP Server — Feriados brasileiros direto no seu agente de IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "linear-gradient(135deg, #3b82c4 0%, #1a5276 50%, #0f3d5c 100%)",
                }}
            >
                {/* Badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 20,
                        padding: "8px 20px",
                        fontSize: 18,
                        color: "#fff",
                        marginBottom: 32,
                    }}
                >
                    ✨ Model Context Protocol
                </div>

                {/* Title */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 12,
                        marginBottom: 8,
                    }}
                >
                    <span
                        style={{
                            fontSize: 72,
                            fontWeight: 800,
                            color: "#fff",
                        }}
                    >
                        Feriados
                    </span>
                    <span
                        style={{
                            fontSize: 72,
                            fontWeight: 800,
                            color: "#7dd3fc",
                        }}
                    >
                        API
                    </span>
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 36,
                        fontWeight: 600,
                        color: "#7dd3fc",
                        marginBottom: 40,
                    }}
                >
                    MCP Server
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: 24,
                        color: "rgba(255,255,255,0.75)",
                        maxWidth: 700,
                        textAlign: "center",
                        lineHeight: 1.5,
                        marginBottom: 40,
                    }}
                >
                    Consulte feriados brasileiros direto no seu agente de IA
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: "flex",
                        gap: 64,
                    }}
                >
                    {[
                        { value: "7", label: "Tools" },
                        { value: "5.570", label: "Municípios" },
                        { value: "27", label: "Estados" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 40,
                                    fontWeight: 800,
                                    color: "#fff",
                                }}
                            >
                                {s.value}
                            </span>
                            <span
                                style={{
                                    fontSize: 18,
                                    color: "rgba(255,255,255,0.6)",
                                }}
                            >
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
