# 🇧🇷 Feriados API — MCP Server

Consulte feriados brasileiros (nacionais, estaduais e municipais) direto no seu
agente de IA favorito usando o [Model Context Protocol](https://modelcontextprotocol.io).

[![npm version](https://img.shields.io/npm/v/@feriados-api/mcp-server?style=flat-square&color=blue)](https://www.npmjs.com/package/@feriados-api/mcp-server)
[![npm downloads](https://img.shields.io/npm/dm/@feriados-api/mcp-server?style=flat-square&color=success)](https://www.npmjs.com/package/@feriados-api/mcp-server)
[![GitHub issues](https://img.shields.io/github/issues/feriadosapi/feriadosapi-mcp?style=flat-square)](https://github.com/feriadosapi/feriadosapi-mcp/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/feriadosapi/feriadosapi-mcp?style=flat-square)](https://github.com/feriadosapi/feriadosapi-mcp/commits/main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![smithery badge](https://smithery.ai/badge/feriadosapi/brazilian-holidays)](https://smithery.ai/servers/feriadosapi/brazilian-holidays)

<a href="https://glama.ai/mcp/servers/@feriadosapi/feriadosapi">
<img width="380" height="200" src="https://glama.ai/mcp/servers/@feriadosapi/feriadosapi/badge" />
</a>

## ⚡ Quick Start

### Opção 1: URL Remota (recomendado)

Adicione ao seu cliente de IA:

```
https://mcp.feriadosapi.com/api/mcp
```

**Com sua própria API key (BYOK):**

```
https://mcp.feriadosapi.com/api/mcp?apiKey=fapi_sua_chave_aqui
```

> 💡 Crie uma conta gratuita em [feriadosapi.com](https://feriadosapi.com) para obter sua API key — acesso ilimitado a feriados nacionais, estaduais e capitais (60 req/min).

### Opção 2: Via npx (local)

Obtenha uma API key gratuita em [feriadosapi.com](https://feriadosapi.com) e configure:

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

## 🛠️ Tools Disponíveis

| Tool | Descrição |
|------|-----------|
| `buscar_feriados` | Busca com filtros flexíveis (data, tipo, UF, IBGE, ano, mês) |
| `feriados_nacionais` | Feriados nacionais do Brasil |
| `feriados_por_estado` | Feriados por estado (UF) |
| `feriados_por_cidade` | Feriados por cidade (código IBGE) |
| `verificar_data` | Verifica se uma data é feriado |
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

Uma API key é **obrigatória**. Crie uma conta gratuita em [feriadosapi.com](https://feriadosapi.com) (acesso ilimitado, 60 req/min) e passe sua chave:

- **Via URL remota:** `?apiKey=fapi_xxx` na URL do MCP
- **Via stdio (local):** env var `FERIADOS_API_KEY`

> ⚠️ Sem uma API key válida, todas as chamadas retornarão erro de autenticação.

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
