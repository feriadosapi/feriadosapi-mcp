import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "../../lib/register-tools";

vi.mock("../../lib/tools/feriados", () => ({
    registerFeriadosTools: vi.fn(),
}));
vi.mock("../../lib/tools/estados", () => ({
    registerEstadosTools: vi.fn(),
}));
vi.mock("../../lib/tools/municipios", () => ({
    registerMunicipiosTools: vi.fn(),
}));

import { registerFeriadosTools } from "../../lib/tools/feriados";
import { registerEstadosTools } from "../../lib/tools/estados";
import { registerMunicipiosTools } from "../../lib/tools/municipios";

describe("registerAllTools", () => {
    let server: McpServer;

    beforeEach(() => {
        vi.resetAllMocks();
        server = {} as McpServer;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("deve chamar registerFeriadosTools com o server", () => {
        registerAllTools(server);
        expect(registerFeriadosTools).toHaveBeenCalledOnce();
        expect(registerFeriadosTools).toHaveBeenCalledWith(server);
    });

    it("deve chamar registerEstadosTools com o server", () => {
        registerAllTools(server);
        expect(registerEstadosTools).toHaveBeenCalledOnce();
        expect(registerEstadosTools).toHaveBeenCalledWith(server);
    });

    it("deve chamar registerMunicipiosTools com o server", () => {
        registerAllTools(server);
        expect(registerMunicipiosTools).toHaveBeenCalledOnce();
        expect(registerMunicipiosTools).toHaveBeenCalledWith(server);
    });

    it("deve registrar todos os 3 módulos de tools", () => {
        registerAllTools(server);
        expect(registerFeriadosTools).toHaveBeenCalledTimes(1);
        expect(registerEstadosTools).toHaveBeenCalledTimes(1);
        expect(registerMunicipiosTools).toHaveBeenCalledTimes(1);
    });
});
