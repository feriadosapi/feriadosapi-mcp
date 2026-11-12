import { describe, it, expect } from "vitest";
import { GET } from "@/app/llms.txt/route";

describe("GET /llms.txt", () => {
    it("retorna text/plain com as 9 ferramentas MCP e o pacote npm oficial", async () => {
        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get("Content-Type")).toContain("text/plain");

        const body = await res.text();
        expect(body).toContain("https://mcp.feriadosapi.com/api/mcp");
        expect(body).toContain("@feriados-api/mcp-server");
        expect(body).toContain("feriados_bancarios");
        expect(body).toContain("verificar_dia_util_bancario");
        expect(body).toContain("60 req/min");
        expect(body).not.toContain("100 requisições");
    });
});
