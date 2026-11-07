import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "../lib/register-tools.js";
import { MCP_VERSION, enableEnvApiKeyFallback } from "../lib/api-client.js";

// Modo stdio: processo dedicado a um único usuário, então é seguro ler a chave do env.
enableEnvApiKeyFallback();

const server = new McpServer({
    name: "feriadosapi",
    version: MCP_VERSION,
});

registerAllTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
