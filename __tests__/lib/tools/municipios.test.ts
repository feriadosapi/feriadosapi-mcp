import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerMunicipiosTools } from "../../../lib/tools/municipios";

vi.mock("../../../lib/api-client", () => ({
    feriadosApi: vi.fn(),
}));

import { feriadosApi } from "../../../lib/api-client";
const mockApi = vi.mocked(feriadosApi);

describe("Municípios Tools", () => {
    let server: McpServer;
    let registeredTools: Map<
        string,
        { config: Record<string, unknown>; handler: (...args: unknown[]) => Promise<unknown> }
    >;

    beforeEach(() => {
        vi.resetAllMocks();
        registeredTools = new Map();

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

        registerMunicipiosTools(server);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("deve registrar 1 tool de municípios", () => {
        expect(server.registerTool).toHaveBeenCalledTimes(1);
    });

    it("deve registrar buscar_municipios", () => {
        expect(registeredTools.has("buscar_municipios")).toBe(true);
    });

    describe("buscar_municipios", () => {
        it("deve retornar lista formatada de municípios", async () => {
            mockApi.mockResolvedValueOnce({
                municipios: [
                    { ibge: 3550308, nome: "São Paulo", uf: "SP" },
                    { ibge: 3509502, nome: "Campinas", uf: "SP" },
                ],
                meta: { total: 645, page: 1, total_pages: 13 },
            });

            const handler = registeredTools.get("buscar_municipios")!.handler;
            const result = (await handler({ uf: "SP" })) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("🏘️ Municípios — SP");
            expect(result.content[0].text).toContain(
                "🏘️ São Paulo (SP) — IBGE: 3550308"
            );
            expect(result.content[0].text).toContain(
                "🏘️ Campinas (SP) — IBGE: 3509502"
            );
            expect(result.content[0].text).toContain("📊 Total: 645");
            expect(result.content[0].text).toContain("Página 1/13");
        });

        it("deve converter UF para maiúscula", async () => {
            mockApi.mockResolvedValueOnce({
                municipios: [],
                meta: { total: 0, page: 1, total_pages: 0 },
            });

            const handler = registeredTools.get("buscar_municipios")!.handler;
            await handler({ uf: "sp" });

            expect(mockApi).toHaveBeenCalledWith(
                expect.objectContaining({
                    params: expect.objectContaining({ uf: "SP" }),
                })
            );
        });

        it("deve passar paginação para a API", async () => {
            mockApi.mockResolvedValueOnce({
                municipios: [],
                meta: { total: 0, page: 2, total_pages: 5 },
            });

            const handler = registeredTools.get("buscar_municipios")!.handler;
            await handler({ page: 2, limit: 20 });

            expect(mockApi).toHaveBeenCalledWith(
                expect.objectContaining({
                    params: expect.objectContaining({
                        page: "2",
                        limit: "20",
                    }),
                })
            );
        });

        it("deve mostrar header genérico quando UF não informada", async () => {
            mockApi.mockResolvedValueOnce({
                municipios: [
                    { ibge: 3550308, nome: "São Paulo", uf: "SP" },
                ],
                meta: { total: 5570, page: 1, total_pages: 112 },
            });

            const handler = registeredTools.get("buscar_municipios")!.handler;
            const result = (await handler({})) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("🏘️ Municípios");
            expect(result.content[0].text).not.toContain("Municípios —");
        });

        it("deve retornar erro formatado quando API falha", async () => {
            mockApi.mockRejectedValueOnce(
                new Error("Cota mensal excedida")
            );

            const handler = registeredTools.get("buscar_municipios")!.handler;
            const result = (await handler({ uf: "SP" })) as {
                content: { type: string; text: string }[];
                isError: boolean;
            };

            expect(result.isError).toBe(true);
            expect(result.content[0].text).toContain("❌ Erro:");
            expect(result.content[0].text).toContain("Cota mensal excedida");
        });
    });
});
