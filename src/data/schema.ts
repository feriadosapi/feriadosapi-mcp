export const jsonLd = {
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
