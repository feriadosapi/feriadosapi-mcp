import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { feriadosApi } from "../../lib/api-client";

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("feriadosApi", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetAllMocks();
        process.env = { ...originalEnv };
        process.env.FERIADOS_API_KEY = "fapi_test_key_123";
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    // ─── API Key Resolution ───

    it("deve usar apiKey explícita quando fornecida", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: "ok" }),
        });

        await feriadosApi({ path: "/feriados", apiKey: "fapi_explicit" });

        expect(mockFetch).toHaveBeenCalledOnce();
        const [, options] = mockFetch.mock.calls[0];
        expect(options.headers["X-API-Key"]).toBe("fapi_explicit");
    });

    it("deve fazer fallback para FERIADOS_API_KEY env var", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: "ok" }),
        });

        await feriadosApi({ path: "/feriados" });

        const [, options] = mockFetch.mock.calls[0];
        expect(options.headers["X-API-Key"]).toBe("fapi_test_key_123");
    });

    it("deve lançar erro quando nenhuma API key está disponível", async () => {
        delete process.env.FERIADOS_API_KEY;

        await expect(feriadosApi({ path: "/feriados" })).rejects.toThrow(
            "API Key não fornecida"
        );
        expect(mockFetch).not.toHaveBeenCalled();
    });

    // ─── URL Construction ───

    it("deve montar a URL corretamente com base path", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await feriadosApi({ path: "/feriados/nacionais" });

        const [url] = mockFetch.mock.calls[0];
        expect(url).toContain("/api/v1/feriados/nacionais");
    });

    it("deve adicionar query params à URL", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await feriadosApi({
            path: "/feriados",
            params: { ano: "2026", uf: "SP" },
        });

        const [url] = mockFetch.mock.calls[0];
        expect(url).toContain("ano=2026");
        expect(url).toContain("uf=SP");
    });

    it("deve ignorar params undefined", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await feriadosApi({
            path: "/feriados",
            params: { ano: "2026", uf: undefined },
        });

        const [url] = mockFetch.mock.calls[0];
        expect(url).toContain("ano=2026");
        expect(url).not.toContain("uf=");
    });

    // ─── Error Handling ───

    it("deve lançar erro específico para 401", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            statusText: "Unauthorized",
            json: () => Promise.resolve({ error: "Invalid API key" }),
        });

        await expect(feriadosApi({ path: "/feriados" })).rejects.toThrow(
            "API Key inválida ou ausente"
        );
    });

    it("deve lançar erro específico para 403", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 403,
            statusText: "Forbidden",
            json: () => Promise.resolve({ error: "Forbidden resource" }),
        });

        await expect(feriadosApi({ path: "/feriados" })).rejects.toThrow(
            "Acesso negado: Forbidden resource"
        );
    });

    it("deve lançar erro específico para 429 (rate limit)", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 429,
            statusText: "Too Many Requests",
            json: () => Promise.resolve({}),
        });

        await expect(feriadosApi({ path: "/feriados" })).rejects.toThrow(
            "Cota mensal excedida"
        );
    });

    it("deve lançar erro específico para 404", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: "Not Found",
            json: () => Promise.resolve({ message: "Resource not found" }),
        });

        await expect(feriadosApi({ path: "/feriados/XX" })).rejects.toThrow(
            "Recurso não encontrado"
        );
    });

    it("deve lançar erro genérico para outros status codes", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
            json: () => Promise.resolve({ error: "Server crash" }),
        });

        await expect(feriadosApi({ path: "/feriados" })).rejects.toThrow(
            "Erro na API (500): Server crash"
        );
    });

    it("deve lidar com body de erro não-JSON", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 502,
            statusText: "Bad Gateway",
            json: () => Promise.reject(new Error("Not JSON")),
        });

        await expect(feriadosApi({ path: "/feriados" })).rejects.toThrow(
            "Erro na API (502): Bad Gateway"
        );
    });

    // ─── Success ───

    it("deve retornar dados JSON no sucesso", async () => {
        const mockData = { feriados: [{ nome: "Natal" }], meta: { total: 1 } };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const result = await feriadosApi({ path: "/feriados" });
        expect(result).toEqual(mockData);
    });
});
