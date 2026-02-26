import { MCP_URL } from "./config";

export const clients = [
    {
        name: "Claude Desktop",
        config: `{
  "mcpServers": {
    "feriadosapi": {
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
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
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
    },
    {
        name: "GitHub Copilot",
        config: `{
  "github.copilot.mcp.servers": {
    "feriadosapi": {
      "type": "url",
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
    }
  }
}`,
    },
    {
        name: "Windsurf",
        config: `{
  "mcpServers": {
    "feriadosapi": {
      "serverUrl": "${MCP_URL}?apiKey=SUA_API_KEY"
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
      "httpUrl": "${MCP_URL}?apiKey=SUA_API_KEY"
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
      "type": "url",
      "url": "${MCP_URL}?apiKey=SUA_API_KEY"
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
];
