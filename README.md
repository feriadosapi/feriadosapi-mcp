# 🇧🇷 Feriados API — MCP Server

Consulte feriados brasileiros (nacionais, estaduais e municipais) direto no seu
agente de IA favorito usando o [Model Context Protocol](https://modelcontextprotocol.io).

[![npm version](https://img.shields.io/npm/v/@feriados-api/mcp-server)](https://www.npmjs.com/package/@feriados-api/mcp-server)

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

> 💡 Crie uma conta gratuita em [feriadosapi.com](https://feriadosapi.com) para obter sua API key com 100 requisições/mês grátis.

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

**URL remota:**
```json
{
  "mcpServers": {
    "feriadosapi": {
      "url": "https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY"
    }
  }
}
```

**Via stdio:**
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
      "url": "https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY"
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
      "type": "url",
      "url": "https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY"
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
      "serverUrl": "https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY"
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
      "httpUrl": "https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY"
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
      "type": "url",
      "url": "https://mcp.feriadosapi.com/api/mcp?apiKey=SUA_API_KEY"
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

Uma API key é **obrigatória**. Crie uma conta gratuita em [feriadosapi.com](https://feriadosapi.com) (100 req/mês grátis) e passe sua chave:

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
