import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerFeriadosTools } from "./tools/feriados";
import { registerEstadosTools } from "./tools/estados";
import { registerMunicipiosTools } from "./tools/municipios";

export function registerAllTools(server: McpServer) {
    registerFeriadosTools(server);
    registerEstadosTools(server);
    registerMunicipiosTools(server);
}
