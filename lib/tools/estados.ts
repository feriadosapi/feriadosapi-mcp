import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { feriadosApi } from "../api-client";

export function registerEstadosTools(server: McpServer) {
    server.registerTool(
        "listar_estados",
        {
            title: "Listar Estados do Brasil",
            description: `Lista todos os 27 estados brasileiros (26 estados + Distrito Federal) com suas siglas UF.
Use quando precisar consultar as siglas dos estados ou quando o usuário perguntar "quais são os estados do Brasil".
Retorna sigla (UF) e nome completo de cada estado.`,
            inputSchema: z.object({}),
        },
        async () => {
            try {
                const data = await feriadosApi<{
                    estados: { uf: string; nome: string }[];
                    total: number;
                }>({
                    path: "/estados",
                });

                const list = data.estados
                    .map((e) => `🏳️ ${e.uf} — ${e.nome}`)
                    .join("\n");

                const text = `🇧🇷 Estados do Brasil (${data.total})\n\n${list}`;
                return { content: [{ type: "text" as const, text }] };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `❌ Erro: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        }
    );
}
