# 🇧🇷 Feriados API — MCP Server

Consulte feriados brasileiros (nacionais, estaduais e municipais) direto no seu
agente de IA favorito usando o [Model Context Protocol](https://modelcontextprotocol.io).

[![npm version](https://img.shields.io/npm/v/@feriados-api/mcp-server?style=flat-square&color=blue)](https://www.npmjs.com/package/@feriados-api/mcp-server)
[![npm downloads](https://img.shields.io/npm/dm/@feriados-api/mcp-server?style=flat-square&color=success)](https://www.npmjs.com/package/@feriados-api/mcp-server)
[![GitHub issues](https://img.shields.io/github/issues/feriadosapi/feriadosapi-mcp?style=flat-square)](https://github.com/feriadosapi/feriadosapi-mcp/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/feriadosapi/feriadosapi-mcp?style=flat-square)](https://github.com/feriadosapi/feriadosapi-mcp/commits/main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![smithery badge](https://smithery.ai/badge/feriadosapi/brazilian-holidays)](https://smithery.ai/servers/feriadosapi/brazilian-holidays)

## ⚡ Quick Start

### Opção 1: URL Remota com OAuth 2.1 (Recomendado — Sem copiar chaves!)

Em clientes compatíveis com o padrão de autorização MCP (Cursor, Claude Desktop, Claude.ai, VS Code, ChatGPT, MCP Inspector), basta adicionar a URL remota limpa:

```json
{
  "mcpServers": {
    "feriadosapi": {
      "url": "https://mcp.feriadosapi.com/api/mcp"
    }
  }
}
```

Ao conectar, seu navegador abrirá automaticamente a página da [Feriados API](https://feriadosapi.com) para você entrar com sua conta (Google, GitHub ou E-mail), selecionar qual organização será debitada e autorizar o agente com **OAuth 2.1 + PKCE**.

### Opção 2: URL Remota com API Key (BYOK / Legado)

Se o seu cliente MCP não usar OAuth interativo ou rodar em background, passe sua chave via header `Authorization` / `X-API-Key` ou query parameter `?apiKey=`:

```json
{
  "mcpServers": {
    "feriadosapi": {
      "url": "https://mcp.feriadosapi.com/api/mcp",
      "headers": {
        "Authorization": "Bearer sk_live_sua_chave_aqui"
      }
    }
  }
}
```

Ou diretamente na URL:

```
https://mcp.feriadosapi.com/api/mcp?apiKey=sk_live_sua_chave_aqui
```

> 💡 Crie uma conta gratuita em [feriadosapi.com](https://feriadosapi.com) — acesso gratuito a feriados nacionais, estaduais, capitais e calendário bancário (60 req/min).

### Opção 3: Via `npx` (Execução Local / `stdio`)

Execute localmente via Node.js passando sua `FERIADOS_API_KEY`:

```json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave_aqui"
      }
    }
  }
}
```

## 🛠️ Ferramentas Disponíveis

| Ferramenta | Descrição |
|------------|-----------|
| `buscar_feriados` | Busca com filtros flexíveis (data, tipo, UF, IBGE, ano, mês) |
| `feriados_nacionais` | Feriados nacionais do Brasil |
| `feriados_por_estado` | Feriados por estado (UF) |
| `feriados_por_cidade` | Feriados por cidade (código IBGE) |
| `verificar_data` | Verifica se uma data é feriado |
| `feriados_bancarios` | Feriados bancários do calendário FEBRABAN |
| `verificar_dia_util_bancario` | Verifica se uma data é dia útil bancário |
| `listar_estados` | Lista estados brasileiros |
| `buscar_municipios` | Busca municípios por UF |

## 🔧 Configuração por Cliente

### Claude Desktop / Claude Code

```json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### Cursor

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### GitHub Copilot

```json
// Configuração do GitHub Copilot MCP
{
  "github.copilot.mcp.servers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### Windsurf

```json
// ~/.codeium/windsurf/mcp_config.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### Antigravity (Gemini Code Assist)

```json
// .gemini/settings.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### Gemini CLI

```json
// ~/.gemini/settings.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### OpenAI Codex CLI

```json
// ~/.codex/config.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "fapi_sua_chave_aqui"
      }
    }
  }
}
```

### ChatGPT / OpenAI Agents

```
URL: https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY
```

## 💬 Exemplos de uso

Após configurar, pergunte ao seu agente:

- "Quais são os feriados de São Paulo em 2026?"
- "Amanhã é feriado?"
- "Quando é o Carnaval?"
- "Quais feriados caem na sexta-feira em 2026?"
- "Qual o código IBGE de Curitiba?"

## 🔑 Autenticação

O servidor MCP suporta **3 modos de autenticação**, todos integrados às cotas e métricas por usuário/conexão do seu Dashboard em [feriadosapi.com](https://feriadosapi.com/dashboard):

1. **OAuth 2.1 + PKCE S256 (Recomendado):** Conecte-se diretamente a `https://mcp.feriadosapi.com/api/mcp` sem informar chave. O cliente MCP descobre automaticamente os endpoints RFC 9728 / RFC 8414 e abre o navegador para autorização e seleção da organização. Você pode pausar ou revogar o agente a qualquer momento na aba **Chaves de API** do Dashboard.
2. **Via URL Remota com API Key (BYOK):** Passe `Authorization: Bearer sk_live_...`, `X-API-Key: sk_live_...` ou `?apiKey=sk_live_...` na URL do MCP.
3. **Via `stdio` (Local via `npx`):** Defina a variável de ambiente `FERIADOS_API_KEY`.

> ⚠️ Sem autenticação válida (OAuth 2.1 ou API Key), chamadas de ferramentas não são executadas e o servidor responde `401 Unauthorized` iniciando o desafio OAuth.

## 🏗️ Desenvolvimento Local

```bash
# Clonar o repositório
git clone https://github.com/feriadosapi/feriadosapi-mcp.git
cd feriadosapi-mcp

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com sua FERIADOS_API_KEY

# Rodar em desenvolvimento
npm run dev

# Build do stdio (para publicação npm)
npm run build:stdio
```

## 📖 Links Úteis

- [Feriados API](https://feriadosapi.com)
- [Documentação da API](https://feriadosapi.com/docs)
- [Pacote no NPM - @feriados-api/mcp-server](https://www.npmjs.com/package/@feriados-api/mcp-server)

## 📄 Licença

MIT
