import { MCP_URL } from "./config";

export const clients = [
  {
    name: "OAuth 2.1 (Sem API Key)",
    config: `// Recomendado para Cursor, Claude, VS Code e clientes MCP modernos.
// Ao conectar, seu navegador abrirá automaticamente para autorizar sua conta e organização!
{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}"
    }
  }
}`,
  },
  {
    name: "Cursor",
    config: `// .cursor/mcp.json — Opção 1: OAuth 2.1 em 1 clique (Recomendado)
{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}"
    }
  }
}

// Opção 2: Via npx local com API Key
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "Claude Desktop / Web",
    config: `// No Claude.ai / Claude Desktop (Integrations -> Add MCP Server):
// Basta informar a URL abaixo e autenticar via OAuth 2.1 no navegador:
${MCP_URL}

// Ou no claude_desktop_config.json (via npx local com API Key):
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "GitHub Copilot / VS Code",
    config: `// Opção 1: Remoto com OAuth 2.1
{
  "servers": {
    "feriadosapi": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}

// Opção 2: Via npx local com API Key
{
  "github.copilot.mcp.servers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "Windsurf",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "Antigravity",
    config: `// .gemini/settings.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "Gemini CLI",
    config: `// ~/.gemini/settings.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "OpenAI Codex",
    config: `// ~/.codex/config.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sk_live_sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "HTTP Remoto (API Key)",
    config: `// Usando API Key via Header (Recomendado para agentes backend) ou Query Param:
{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer sk_live_sua_chave"
      }
    }
  }
}

// Ou via Query Parameter legado:
// ${MCP_URL}?apiKey=sk_live_sua_chave`,
  },
];
