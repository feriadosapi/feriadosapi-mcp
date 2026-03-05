import { MCP_URL } from "./config";

export const clients = [
  {
    name: "Claude Desktop",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "Cursor",
    config: `// .cursor/mcp.json
{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "GitHub Copilot",
    config: `{
  "github.copilot.mcp.servers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sua_chave"
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
        "FERIADOS_API_KEY": "sua_chave"
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
        "FERIADOS_API_KEY": "sua_chave"
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
        "FERIADOS_API_KEY": "sua_chave"
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
        "FERIADOS_API_KEY": "sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "Via npx (local)",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "command": "npx",
      "args": ["-y", "@feriados-api/mcp-server"],
      "env": {
        "FERIADOS_API_KEY": "sua_chave"
      }
    }
  }
}`,
  },
  {
    name: "HTTP Remoto (SSE)",
    config: `{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
  },
];
