import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { NextRequest } from "next/server";

/**
 * Regressão: a chave do cliente deve ser resolvida POR REQUISIÇÃO.
 * Antes, o route gravava `process.env.FERIADOS_API_KEY`, que é compartilhado
 * entre requisições concorrentes na mesma instância (Fluid Compute).
 */

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const ORIGIN = "https://mcp.feriadosapi.com";

function toolCall(id: number, init: { url?: string; headers?: Record<string, string> } = {}) {
    return new Request(init.url ?? `${ORIGIN}/api/mcp`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/json, text/event-stream",
            ...init.headers,
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id,
            method: "tools/call",
            params: { name: "listar_estados", arguments: {} },
        }),
    }) as unknown as NextRequest;
}

function keysSentToApi(): string[] {
    return mockFetch.mock.calls
        .filter(([url]) => String(url).includes("/api/v1/"))
        .map(([, opts]) => (opts as { headers: Record<string, string> }).headers["X-API-Key"]);
}

describe("route /api/[transport] — isolamento da API key", () => {
    const originalEnv = process.env;
    let POST: (req: NextRequest) => Promise<Response>;

    beforeEach(async () => {
        vi.resetModules();
        mockFetch.mockReset();
        mockFetch.mockImplementation(async () =>
            new Response(JSON.stringify({ estados: [], total: 0 }), {
                status: 200,
                headers: { "content-type": "application/json" },
            })
        );
        // Mesmo que exista uma chave no env do servidor, ela nunca deve ser usada no modo remoto
        process.env = { ...originalEnv, FERIADOS_API_KEY: "fapi_SERVER_ENV" };
        ({ POST } = await import("../../app/api/[transport]/route"));
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("usa ?apiKey= (legado), X-API-Key e Bearer", async () => {
        await (await POST(toolCall(1, { url: `${ORIGIN}/api/mcp?apiKey=fapi_query` }))).text();
        await (await POST(toolCall(2, { headers: { "x-api-key": "fapi_header" } }))).text();
        await (await POST(toolCall(3, { headers: { authorization: "Bearer fapi_bearer" } }))).text();

        expect(keysSentToApi()).toEqual(["fapi_query", "fapi_header", "fapi_bearer"]);
    });

    it("requisições concorrentes não compartilham a chave", async () => {
        const reqs = Array.from({ length: 20 }, (_, i) =>
            toolCall(i, { url: `${ORIGIN}/api/mcp?apiKey=fapi_cliente_${i}` })
        );
        const responses = await Promise.all(reqs.map((r) => POST(r)));
        await Promise.all(responses.map((r) => r.text()));

        expect(keysSentToApi().sort()).toEqual(
            Array.from({ length: 20 }, (_, i) => `fapi_cliente_${i}`).sort()
        );
    });

    it("sem chave NÃO herda a chave de uma requisição anterior nem do env", async () => {
        await (await POST(toolCall(1, { url: `${ORIGIN}/api/mcp?apiKey=fapi_cliente_a` }))).text();
        mockFetch.mockClear();

        const body = await (await POST(toolCall(2))).text();

        expect(keysSentToApi()).toEqual([]);
        expect(body).toContain("API Key não fornecida");
        expect(process.env.FERIADOS_API_KEY).toBe("fapi_SERVER_ENV");
    });
});
