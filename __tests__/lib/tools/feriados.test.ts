import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerFeriadosTools } from "../../../lib/tools/feriados";

// Mock the API client
vi.mock("../../../lib/api-client", () => ({
    feriadosApi: vi.fn(),
}));

import { feriadosApi } from "../../../lib/api-client";
const mockApi = vi.mocked(feriadosApi);

describe("Feriados Tools", () => {
    let server: McpServer;
    let registeredTools: Map<
        string,
        { config: Record<string, unknown>; handler: (...args: unknown[]) => Promise<unknown> }
    >;

    beforeEach(() => {
        vi.resetAllMocks();
        registeredTools = new Map();

        // Capture tool registrations
        server = {
            registerTool: vi.fn(
                (
                    name: string,
                    config: Record<string, unknown>,
                    handler: (...args: unknown[]) => Promise<unknown>
                ) => {
                    registeredTools.set(name, { config, handler });
                }
            ),
        } as unknown as McpServer;

        registerFeriadosTools(server);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ─── Tool Registration ───

    it("deve registrar 5 tools de feriados", () => {
        expect(server.registerTool).toHaveBeenCalledTimes(5);
    });

    it("deve registrar buscar_feriados", () => {
        expect(registeredTools.has("buscar_feriados")).toBe(true);
    });

    it("deve registrar feriados_nacionais", () => {
        expect(registeredTools.has("feriados_nacionais")).toBe(true);
    });

    it("deve registrar feriados_por_estado", () => {
        expect(registeredTools.has("feriados_por_estado")).toBe(true);
    });

    it("deve registrar feriados_por_cidade", () => {
        expect(registeredTools.has("feriados_por_cidade")).toBe(true);
    });

    it("deve registrar verificar_data", () => {
        expect(registeredTools.has("verificar_data")).toBe(true);
    });

    // ─── buscar_feriados ───

    describe("buscar_feriados", () => {
        it("deve retornar feriados formatados no sucesso", async () => {
            mockApi.mockResolvedValueOnce({
                feriados: [
                    {
                        data: "01/01/2026",
                        nome: "Confraternização Universal",
                        tipo: "NACIONAL",
                    },
                    {
                        data: "21/04/2026",
                        nome: "Tiradentes",
                        tipo: "NACIONAL",
                        descricao: "Homenagem a Joaquim José da Silva Xavier",
                    },
                ],
                meta: { total: 2, page: 1, total_pages: 1 },
            });

            const handler = registeredTools.get("buscar_feriados")!.handler;
            const result = (await handler({ ano: "2026" })) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("Confraternização Universal");
            expect(result.content[0].text).toContain("Tiradentes");
            expect(result.content[0].text).toContain("📅");
            expect(result.content[0].text).toContain("📊 Total: 2");
        });

        it("deve retornar mensagem quando nenhum feriado encontrado", async () => {
            mockApi.mockResolvedValueOnce({
                feriados: [],
                meta: null,
            });

            const handler = registeredTools.get("buscar_feriados")!.handler;
            const result = (await handler({})) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain(
                "Nenhum feriado encontrado"
            );
        });

        it("deve retornar erro formatado quando API falha", async () => {
            mockApi.mockRejectedValueOnce(new Error("API Key inválida"));

            const handler = registeredTools.get("buscar_feriados")!.handler;
            const result = (await handler({})) as {
                content: { type: string; text: string }[];
                isError: boolean;
            };

            expect(result.isError).toBe(true);
            expect(result.content[0].text).toContain("❌ Erro:");
            expect(result.content[0].text).toContain("API Key inválida");
        });

        it("deve passa params corretamente para a API", async () => {
            mockApi.mockResolvedValueOnce({ feriados: [], meta: null });

            const handler = registeredTools.get("buscar_feriados")!.handler;
            await handler({ ano: "2026", uf: "SP", type: "NACIONAL" });

            expect(mockApi).toHaveBeenCalledWith({
                path: "/feriados",
                params: {
                    date: undefined,
                    type: "NACIONAL",
                    uf: "SP",
                    ibge: undefined,
                    ano: "2026",
                    month: undefined,
                },
            });
        });
    });

    // ─── feriados_nacionais ───

    describe("feriados_nacionais", () => {
        it("deve incluir header com bandeira do Brasil", async () => {
            mockApi.mockResolvedValueOnce({
                feriados: [
                    {
                        data: "01/01/2026",
                        nome: "Confraternização Universal",
                        tipo: "NACIONAL",
                    },
                ],
                meta: { total: 1, page: 1, total_pages: 1 },
            });

            const handler = registeredTools.get("feriados_nacionais")!.handler;
            const result = (await handler({ ano: "2026" })) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("🇧🇷 Feriados Nacionais");
            expect(result.content[0].text).toContain("2026");
        });

        it("deve indicar facultativos quando informado", async () => {
            mockApi.mockResolvedValueOnce({
                feriados: [],
                meta: { total: 0, page: 1, total_pages: 1 },
            });

            const handler = registeredTools.get("feriados_nacionais")!.handler;
            const result = (await handler({
                ano: "2026",
                facultativos: true,
            })) as { content: { type: string; text: string }[] };

            expect(result.content[0].text).toContain("com facultativos");
        });

        it("deve não passar facultativos param quando false", async () => {
            mockApi.mockResolvedValueOnce({ feriados: [], meta: null });

            const handler = registeredTools.get("feriados_nacionais")!.handler;
            await handler({ facultativos: false });

            expect(mockApi).toHaveBeenCalledWith({
                path: "/feriados/nacionais",
                params: { ano: undefined, facultativos: undefined },
            });
        });
    });

    // ─── feriados_por_estado ───

    describe("feriados_por_estado", () => {
        it("deve incluir header com UF", async () => {
            mockApi.mockResolvedValueOnce({
                uf: "SP",
                feriados: [
                    {
                        data: "09/07/2026",
                        nome: "Revolução Constitucionalista",
                        tipo: "ESTADUAL",
                    },
                ],
                meta: { total: 1, page: 1, total_pages: 1 },
            });

            const handler =
                registeredTools.get("feriados_por_estado")!.handler;
            const result = (await handler({ uf: "SP", ano: "2026" })) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("📍 Feriados — SP");
            expect(result.content[0].text).toContain("2026");
        });

        it("deve converter UF para maiúscula no path da API", async () => {
            mockApi.mockResolvedValueOnce({
                uf: "SP",
                feriados: [],
                meta: null,
            });

            const handler =
                registeredTools.get("feriados_por_estado")!.handler;
            await handler({ uf: "sp" });

            expect(mockApi).toHaveBeenCalledWith(
                expect.objectContaining({ path: "/feriados/estado/SP" })
            );
        });
    });

    // ─── feriados_por_cidade ───

    describe("feriados_por_cidade", () => {
        it("deve incluir header com nome da cidade", async () => {
            mockApi.mockResolvedValueOnce({
                cidade: { ibge: 3550308, nome: "São Paulo", uf: "SP" },
                feriados: [
                    {
                        data: "25/01/2026",
                        nome: "Aniversário de São Paulo",
                        tipo: "MUNICIPAL",
                    },
                ],
                meta: { total: 1, page: 1, total_pages: 1 },
            });

            const handler =
                registeredTools.get("feriados_por_cidade")!.handler;
            const result = (await handler({
                ibge: "3550308",
                ano: "2026",
            })) as { content: { type: string; text: string }[] };

            expect(result.content[0].text).toContain("São Paulo (SP)");
            expect(result.content[0].text).toContain("🏙️");
        });

        it("deve chamar API com IBGE no path", async () => {
            mockApi.mockResolvedValueOnce({
                cidade: { ibge: 3550308, nome: "São Paulo", uf: "SP" },
                feriados: [],
                meta: null,
            });

            const handler =
                registeredTools.get("feriados_por_cidade")!.handler;
            await handler({ ibge: "3550308" });

            expect(mockApi).toHaveBeenCalledWith(
                expect.objectContaining({ path: "/feriados/cidade/3550308" })
            );
        });
    });

    // ─── verificar_data ───

    describe("verificar_data", () => {
        it("deve indicar quando uma data É feriado", async () => {
            mockApi.mockResolvedValueOnce({
                data: "25/12/2026",
                feriados: [
                    { data: "25/12/2026", nome: "Natal", tipo: "NACIONAL" },
                ],
                total: 1,
            });

            const handler = registeredTools.get("verificar_data")!.handler;
            const result = (await handler({ data: "2026-12-25" })) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("É FERIADO!");
            expect(result.content[0].text).toContain("Natal");
        });

        it("deve indicar quando uma data NÃO é feriado", async () => {
            mockApi.mockResolvedValueOnce({
                data: "26/02/2026",
                feriados: [],
                total: 0,
            });

            const handler = registeredTools.get("verificar_data")!.handler;
            const result = (await handler({ data: "2026-02-26" })) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("NÃO é feriado");
        });

        it("deve chamar API com data no path", async () => {
            mockApi.mockResolvedValueOnce({
                data: "25/12/2026",
                feriados: [],
                total: 0,
            });

            const handler = registeredTools.get("verificar_data")!.handler;
            await handler({ data: "2026-12-25" });

            expect(mockApi).toHaveBeenCalledWith({
                path: "/feriados/data/2026-12-25",
            });
        });
    });
});
