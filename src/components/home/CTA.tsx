export function CTA() {
    return (
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
                Crie uma conta gratuita na Feriados API e receba 100 requisições/mês sem custo
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                <a
                    href="https://feriadosapi.com/login"
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
    );
}
