export async function GET() {
  const content = `# Feriados API MCP Server

> Servidor oficial Model Context Protocol (MCP) da Feriados API para consulta em tempo real de feriados brasileiros (nacionais, estaduais, municipais dos 5.571 municípios e bancários FEBRABAN) e dias úteis bancários.

## Conexão Rápida

### OAuth 2.1 + PKCE (Recomendado — Claude, Cursor, VS Code, ChatGPT, MCP Inspector)
\`\`\`json
{
  "mcpServers": {
    "feriadosapi": {
      "url": "https://mcp.feriadosapi.com/api/mcp"
    }
  }
}
\`\`\`

### Execução Local via npm (\`stdio\`)
Pacote npm oficial: \`@feriados-api/mcp-server\`
\`\`\`bash
npx -y @feriados-api/mcp-server
\`\`\`
Variável de ambiente: \`FERIADOS_API_KEY\`

### URL Remota com API Key (BYOK / Automação)
\`https://mcp.feriadosapi.com/api/mcp\` com header \`Authorization: Bearer <API_KEY>\`, \`X-API-Key: <API_KEY>\` ou query param \`?apiKey=<API_KEY>\`.

## Ferramentas Disponíveis (9 tools)

- \`buscar_feriados\`: Busca flexível por data, tipo, estado (UF), município (IBGE), ano e mês
- \`feriados_nacionais\`: Lista feriados nacionais do Brasil por ano
- \`feriados_por_estado\`: Lista feriados estaduais por UF e ano
- \`feriados_por_cidade\`: Lista feriados municipais por código IBGE (5.571 municípios)
- \`verificar_data\`: Verifica se uma data é feriado (nacional, estadual ou municipal)
- \`feriados_bancarios\`: Lista feriados bancários oficiais (FEBRABAN)
- \`verificar_dia_util_bancario\`: Verifica se uma data é dia útil bancário e informa próximo dia útil
- \`listar_estados\`: Lista as 27 Unidades Federativas
- \`buscar_municipios\`: Busca municípios brasileiros por UF com código IBGE

## Planos e Preços (Feriados API)

- Free: Grátis para sempre (sem cartão de crédito) — acesso gratuito e ilimitado a feriados nacionais, estaduais, bancários (FEBRABAN), das 27 capitais e consulta de localidades (rate limit de 60 req/min, até 3 usuários). Municípios do interior requerem plano pago.
- Developer: R$39/mês — 5.000 req/mês para municípios do interior (todos os 5.571 municípios), rate limit 60 req/min, até 3 usuários.
- Starter: R$99/mês — 100.000 req/mês para municípios do interior, 3 Webhooks, rate limit 120 req/min, SLA 99.5%, até 10 usuários.
- Professional: R$249/mês — requisições ilimitadas para todos os 5.571 municípios, 10 Webhooks, rate limit 1.000 req/min, SLA 99.9%, até 1.000 usuários.

## Documentação e Referências

- MCP Landing & Referência de Ferramentas: https://mcp.feriadosapi.com
- Site Oficial & Dashboard: https://feriadosapi.com
- Documentação da API REST: https://feriadosapi.com/docs
- Guia de Integração MCP: https://feriadosapi.com/mcp
- LLMs Index Principal: https://feriadosapi.com/llms.txt
- Documentação Completa para LLMs: https://feriadosapi.com/llms-full.txt
- Especificação OpenAPI: https://feriadosapi.com/openapi.yaml
- Pacote npm: https://www.npmjs.com/package/@feriados-api/mcp-server
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
