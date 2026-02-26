import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerEstadosTools } from "../../../lib/tools/estados";

vi.mock("../../../lib/api-client", () => ({
    feriadosApi: vi.fn(),
}));

import { feriadosApi } from "../../../lib/api-client";
const mockApi = vi.mocked(feriadosApi);

describe("Estados Tools", () => {
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

        registerEstadosTools(server);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("deve registrar 1 tool de estados", () => {
        expect(server.registerTool).toHaveBeenCalledTimes(1);
    });

    it("deve registrar listar_estados", () => {
        expect(registeredTools.has("listar_estados")).toBe(true);
    });

    describe("listar_estados", () => {
        it("deve retornar lista formatada de estados", async () => {
            mockApi.mockResolvedValueOnce({
                estados: [
                    { uf: "SP", nome: "São Paulo" },
                    { uf: "RJ", nome: "Rio de Janeiro" },
                    { uf: "MG", nome: "Minas Gerais" },
                ],
                total: 3,
            });

            const handler = registeredTools.get("listar_estados")!.handler;
            const result = (await handler({})) as {
                content: { type: string; text: string }[];
            };

            expect(result.content[0].text).toContain("🇧🇷 Estados do Brasil (3)");
            expect(result.content[0].text).toContain("🏳️ SP — São Paulo");
            expect(result.content[0].text).toContain("🏳️ RJ — Rio de Janeiro");
            expect(result.content[0].text).toContain("🏳️ MG — Minas Gerais");
        });

        it("deve chamar a API no endpoint correto", async () => {
            mockApi.mockResolvedValueOnce({ estados: [], total: 0 });

            const handler = registeredTools.get("listar_estados")!.handler;
            await handler({});

            expect(mockApi).toHaveBeenCalledWith({ path: "/estados" });
        });

        it("deve retornar erro formatado quando API falha", async () => {
            mockApi.mockRejectedValueOnce(new Error("Connection timeout"));

            const handler = registeredTools.get("listar_estados")!.handler;
            const result = (await handler({})) as {
                content: { type: string; text: string }[];
                isError: boolean;
            };

            expect(result.isError).toBe(true);
            expect(result.content[0].text).toContain("❌ Erro:");
            expect(result.content[0].text).toContain("Connection timeout");
        });
    });
});
