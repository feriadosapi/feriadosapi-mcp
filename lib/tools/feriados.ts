import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { feriadosApi } from "../api-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatHolidayList(feriados: any[]): string {
    if (!feriados || feriados.length === 0) {
        return "Nenhum feriado encontrado para os critérios informados.";
    }

    return feriados
        .map(
            (f) =>
                `📅 ${f.data} — ${f.nome} (${f.tipo})${f.bancario ? " 🏦" : ""}${f.descricao ? `\n   ${f.descricao}` : ""}`
        )
        .join("\n\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatMeta(meta: any): string {
    if (!meta) return "";
    return `\n\n📊 Total: ${meta.total} | Página ${meta.page}/${meta.total_pages}`;
}

export function registerFeriadosTools(server: McpServer) {
    // 1. buscar_feriados
    server.registerTool(
        "buscar_feriados",
        {
            title: "Buscar Feriados",
            description: `Busca feriados brasileiros com filtros flexíveis.
Use esta tool para consultas gerais quando precisar filtrar por múltiplos critérios ao mesmo tempo.
Pode filtrar por data, tipo (NACIONAL/ESTADUAL/MUNICIPAL/FACULTATIVO), estado (UF), cidade (código IBGE), ano e mês.
Para buscas mais específicas, prefira usar as tools especializadas (feriados_nacionais, feriados_por_estado, etc.).
Retorna lista paginada de feriados com nome, data (DD/MM/YYYY), tipo, descrição e indicador bancário (FEBRABAN).`,
            inputSchema: z.object({
                date: z
                    .string()
                    .optional()
                    .describe("Data no formato YYYY-MM-DD (ex: 2026-12-25)"),
                type: z
                    .enum(["NACIONAL", "ESTADUAL", "MUNICIPAL", "FACULTATIVO"])
                    .optional()
                    .describe("Tipo do feriado"),
                uf: z
                    .string()
                    .length(2)
                    .optional()
                    .describe("Sigla do estado em maiúsculas (ex: SP, RJ, MG)"),
                ibge: z
                    .string()
                    .optional()
                    .describe(
                        "Código IBGE do município (ex: 3550308 para São Paulo)"
                    ),
                ano: z
                    .string()
                    .optional()
                    .describe("Ano com 4 dígitos (ex: 2026)"),
                month: z
                    .string()
                    .optional()
                    .describe("Mês de 1 a 12 (requer que 'ano' também seja informado)"),
                bancarios: z
                    .boolean()
                    .optional()
                    .describe("Se true, retorna apenas feriados bancários (calendário FEBRABAN)"),
            }),
        },
        async ({ date, type, uf, ibge, ano, month, bancarios }) => {
            try {
                const data = await feriadosApi<{
                    feriados: unknown[];
                    meta: unknown;
                }>({
                    path: "/feriados",
                    params: { date, type, uf, ibge, ano, month, bancarios: bancarios ? "true" : undefined },
                });

                const text =
                    formatHolidayList(data.feriados) + formatMeta(data.meta);
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

    // 2. feriados_nacionais
    server.registerTool(
        "feriados_nacionais",
        {
            title: "Feriados Nacionais",
            description: `Lista todos os feriados nacionais do Brasil para um ano específico.
Inclui feriados como Carnaval, Sexta-feira Santa, Tiradentes, Dia do Trabalho, Independência, Nossa Senhora Aparecida, Finados, Proclamação da República e Natal.
Opcionalmente pode incluir feriados facultativos nacionais (Ponto Facultativo).
Se nenhum ano for informado, retorna feriados de todos os anos disponíveis.`,
            inputSchema: z.object({
                ano: z
                    .string()
                    .optional()
                    .describe(
                        "Ano com 4 dígitos (ex: 2026). Se omitido, retorna todos os anos."
                    ),
                facultativos: z
                    .boolean()
                    .optional()
                    .describe(
                        "Se true, inclui feriados facultativos nacionais (ex: Carnaval, Corpus Christi)"
                    ),
                bancarios: z
                    .boolean()
                    .optional()
                    .describe("Se true, retorna apenas feriados bancários (calendário FEBRABAN)"),
            }),
        },
        async ({ ano, facultativos, bancarios }) => {
            try {
                const data = await feriadosApi<{
                    feriados: unknown[];
                    meta: unknown;
                }>({
                    path: "/feriados/nacionais",
                    params: {
                        ano,
                        facultativos: facultativos ? "true" : undefined,
                        bancarios: bancarios ? "true" : undefined,
                    },
                });

                let header = "🇧🇷 Feriados Nacionais";
                if (ano) header += ` — ${ano}`;
                if (bancarios) header += " (bancários)";
                else if (facultativos) header += " (com facultativos)";

                const text =
                    header +
                    "\n\n" +
                    formatHolidayList(data.feriados) +
                    formatMeta(data.meta);
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

    // 3. feriados_por_estado
    server.registerTool(
        "feriados_por_estado",
        {
            title: "Feriados por Estado",
            description: `Lista todos os feriados de um estado brasileiro (feriados nacionais + estaduais daquele UF).
Use quando o usuário perguntar sobre feriados em um estado específico, como "feriados em São Paulo" ou "feriados do RJ".
As siglas dos estados (UF) são: AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO.`,
            inputSchema: z.object({
                uf: z
                    .string()
                    .length(2)
                    .describe("Sigla do estado em maiúsculas (ex: SP, RJ, MG, BA)"),
                ano: z
                    .string()
                    .optional()
                    .describe("Ano com 4 dígitos (ex: 2026)"),
                facultativos: z
                    .boolean()
                    .optional()
                    .describe("Se true, inclui feriados facultativos do estado"),
                bancarios: z
                    .boolean()
                    .optional()
                    .describe("Se true, retorna apenas feriados bancários (calendário FEBRABAN)"),
            }),
        },
        async ({ uf, ano, facultativos, bancarios }) => {
            try {
                const data = await feriadosApi<{
                    uf: string;
                    feriados: unknown[];
                    meta: unknown;
                }>({
                    path: `/feriados/estado/${uf.toUpperCase()}`,
                    params: {
                        ano,
                        facultativos: facultativos ? "true" : undefined,
                        bancarios: bancarios ? "true" : undefined,
                    },
                });

                let header = `📍 Feriados — ${data.uf}`;
                if (ano) header += ` — ${ano}`;

                const text =
                    header +
                    "\n\n" +
                    formatHolidayList(data.feriados) +
                    formatMeta(data.meta);
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

    // 4. feriados_por_cidade
    server.registerTool(
        "feriados_por_cidade",
        {
            title: "Feriados por Cidade",
            description: `Lista todos os feriados de uma cidade brasileira (feriados nacionais + estaduais + municipais).
Use quando o usuário perguntar sobre feriados em uma cidade específica.
Requer o código IBGE do município. Se não souber o código IBGE, use primeiro a tool 'buscar_municipios' para encontrá-lo.
Exemplos de códigos IBGE: São Paulo = 3550308, Rio de Janeiro = 3304557, Belo Horizonte = 3106200, Brasília = 5300108.`,
            inputSchema: z.object({
                ibge: z
                    .string()
                    .describe(
                        "Código IBGE do município (ex: 3550308 para São Paulo). Use 'buscar_municipios' se não souber o código."
                    ),
                ano: z
                    .string()
                    .optional()
                    .describe("Ano com 4 dígitos (ex: 2026)"),
                facultativos: z
                    .boolean()
                    .optional()
                    .describe("Se true, inclui feriados facultativos"),
                bancarios: z
                    .boolean()
                    .optional()
                    .describe("Se true, retorna apenas feriados bancários (calendário FEBRABAN)"),
            }),
        },
        async ({ ibge, ano, facultativos, bancarios }) => {
            try {
                const data = await feriadosApi<{
                    cidade: { ibge: number; nome: string; uf: string };
                    feriados: unknown[];
                    meta: unknown;
                }>({
                    path: `/feriados/cidade/${ibge}`,
                    params: {
                        ano,
                        facultativos: facultativos ? "true" : undefined,
                        bancarios: bancarios ? "true" : undefined,
                    },
                });

                let header = `🏙️ Feriados — ${data.cidade.nome} (${data.cidade.uf})`;
                if (ano) header += ` — ${ano}`;

                const text =
                    header +
                    "\n\n" +
                    formatHolidayList(data.feriados) +
                    formatMeta(data.meta);
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

    // 5. verificar_data
    server.registerTool(
        "verificar_data",
        {
            title: "Verificar se Data é Feriado",
            description: `Verifica se uma data específica é feriado no Brasil.
Use quando o usuário perguntar algo como "amanhã é feriado?", "25 de dezembro é feriado?", ou "segunda-feira vai ser feriado?".
Retorna todos os feriados que caem naquela data (pode ter mais de um: nacional + municipal, por exemplo).
Se retornar lista vazia, a data NÃO é feriado.`,
            inputSchema: z.object({
                data: z
                    .string()
                    .describe("Data no formato YYYY-MM-DD (ex: 2026-12-25)"),
            }),
        },
        async ({ data: dateStr }) => {
            try {
                const data = await feriadosApi<{
                    data: string;
                    feriados: unknown[];
                    total: number;
                }>({
                    path: `/feriados/data/${dateStr}`,
                });

                if (data.total === 0) {
                    return {
                        content: [
                            {
                                type: "text" as const,
                                text: `📅 ${data.data} — NÃO é feriado nacional.`,
                            },
                        ],
                    };
                }

                const text =
                    `📅 ${data.data} — É FERIADO! (${data.total} feriado(s) nesta data)\n\n` +
                    formatHolidayList(data.feriados);
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

    // 6. feriados_bancarios
    server.registerTool(
        "feriados_bancarios",
        {
            title: "Feriados Bancários (FEBRABAN)",
            description: `Lista todos os feriados bancários do calendário oficial FEBRABAN (Resolução 4.880/2020 do CMN).
Inclui feriados nacionais + datas facultativas em que agências bancárias não funcionam: Carnaval (seg/ter), Quarta-feira de Cinzas, Corpus Christi e Véspera de Ano Novo (31/dez).
Ideal para cálculos de vencimentos, compensações e prazos bancários.
Pode filtrar por estado (UF) ou município (IBGE) para incluir feriados bancários estaduais/municipais.`,
            inputSchema: z.object({
                ano: z
                    .string()
                    .optional()
                    .describe("Ano com 4 dígitos (ex: 2026)"),
                uf: z
                    .string()
                    .length(2)
                    .optional()
                    .describe("Sigla do estado para incluir feriados estaduais bancários (ex: SP)"),
                ibge: z
                    .string()
                    .optional()
                    .describe("Código IBGE do município para incluir feriados municipais bancários"),
                facultativos: z
                    .boolean()
                    .optional()
                    .describe("Se true, inclui feriados facultativos bancários"),
            }),
        },
        async ({ ano, uf, ibge, facultativos }) => {
            try {
                const data = await feriadosApi<{
                    tipo: string;
                    feriados: unknown[];
                    meta: unknown;
                }>({
                    path: "/feriados/bancarios",
                    params: {
                        ano,
                        uf: uf?.toUpperCase(),
                        ibge,
                        facultativos: facultativos ? "true" : undefined,
                    },
                });

                let header = "🏦 Feriados Bancários (FEBRABAN)";
                if (ano) header += ` — ${ano}`;
                if (uf) header += ` — ${uf.toUpperCase()}`;

                const text =
                    header +
                    "\n\n" +
                    formatHolidayList(data.feriados) +
                    formatMeta(data.meta);
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

    // 7. verificar_dia_util_bancario
    server.registerTool(
        "verificar_dia_util_bancario",
        {
            title: "Verificar Dia Útil Bancário",
            description: `Verifica se uma data é dia útil bancário (agências abrem normalmente).
Use quando o usuário perguntar "o banco abre amanhã?", "quando vence o boleto?", "qual o próximo dia útil bancário?".
Se não for dia útil, retorna o motivo (feriado bancário ou fim de semana) e o próximo dia útil bancário.
Considera o calendário oficial FEBRABAN incluindo Carnaval, Quarta de Cinzas, Corpus Christi e 31/dez.`,
            inputSchema: z.object({
                data: z
                    .string()
                    .describe("Data no formato YYYY-MM-DD (ex: 2026-02-16)"),
            }),
        },
        async ({ data: dateStr }) => {
            try {
                const data = await feriadosApi<{
                    data: string;
                    dia_util_bancario: boolean;
                    motivo?: string;
                    proximo_dia_util?: string;
                }>({
                    path: `/feriados/dia-util-bancario/${dateStr}`,
                });

                if (data.dia_util_bancario) {
                    return {
                        content: [
                            {
                                type: "text" as const,
                                text: `✅ ${data.data} — É dia útil bancário. Agências funcionam normalmente.`,
                            },
                        ],
                    };
                }

                let text = `❌ ${data.data} — NÃO é dia útil bancário.`;
                if (data.motivo) text += `\n📋 Motivo: ${data.motivo}`;
                if (data.proximo_dia_util)
                    text += `\n➡️ Próximo dia útil: ${data.proximo_dia_util}`;

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
