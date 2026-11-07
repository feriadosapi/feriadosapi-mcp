import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { feriadosApi } from "../api-client";

export function registerMunicipiosTools(server: McpServer) {
    server.registerTool(
        "buscar_municipios",
        {
            title: "Buscar Municípios",
            description: `Busca municípios brasileiros por estado. Retorna nome, UF e código IBGE de cada município.
Use esta tool para descobrir o código IBGE de uma cidade antes de consultar feriados municipais com 'feriados_por_cidade'.
Pode filtrar por UF para listar apenas municípios de um estado.
O Brasil possui mais de 5.500 municípios; use o filtro de UF para resultados mais precisos.`,
            inputSchema: z.object({
                uf: z
                    .string()
                    .length(2)
                    .optional()
                    .describe(
                        "Sigla do estado para filtrar (ex: SP, RJ). Se omitido, retorna todos os municípios paginados."
                    ),
                page: z
                    .number()
                    .int()
                    .min(1)
                    .optional()
                    .describe("Número da página (default: 1)"),
                limit: z
                    .number()
                    .int()
                    .min(1)
                    .max(100)
                    .optional()
                    .describe("Itens por página (default: 50, max: 100)"),
            }),
        },
        async ({ uf, page, limit }, extra) => {
            try {
                const data = await feriadosApi<{
                    municipios: { ibge: number; nome: string; uf: string }[];
                    meta: { total: number; page: number; total_pages: number };
                }>({
                    path: "/municipios",
                    apiKey: extra?.authInfo?.token,
                    params: {
                        uf: uf?.toUpperCase(),
                        page: page?.toString(),
                        limit: limit?.toString(),
                    },
                });

                const list = data.municipios
                    .map((m) => `🏘️ ${m.nome} (${m.uf}) — IBGE: ${m.ibge}`)
                    .join("\n");

                let header = "🏘️ Municípios";
                if (uf) header += ` — ${uf.toUpperCase()}`;

                const text =
                    header +
                    `\n\n${list}` +
                    `\n\n📊 Total: ${data.meta.total} | Página ${data.meta.page}/${data.meta.total_pages}`;
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
