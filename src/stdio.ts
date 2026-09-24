import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "../lib/register-tools.js";
import { MCP_VERSION } from "../lib/api-client.js";

const server = new McpServer({
    name: "feriadosapi",
    version: MCP_VERSION,
});

registerAllTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
