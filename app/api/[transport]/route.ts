import { createMcpHandler, withMcpAuth } from "mcp-handler";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { registerAllTools } from "@/lib/register-tools";
import { MCP_VERSION } from "@/lib/api-client";
import { NextRequest } from "next/server";

const handler = createMcpHandler(
    (server) => {
        registerAllTools(server);
    },
    {
        serverInfo: {
            name: "feriadosapi",
            version: MCP_VERSION,
        },
        capabilities: {
            tools: {},
        },
    },
    {
        basePath: "/api",
        maxDuration: 60,
        verboseLogs: true,
    }
);

function corsOptions(res: Response) {
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
    return res;
}

/**
 * Resolve a credencial do cliente POR REQUISIÇÃO (BYOK).
 *
 * Aceita, em ordem: `Authorization: Bearer <key>`, header `X-API-Key` ou
 * `?apiKey=` na URL (legado). O valor é anexado como `authInfo` da requisição
 * e chega às tools via `extra.authInfo.token` — nunca via `process.env`, que é
 * compartilhado entre requisições concorrentes na mesma instância (Fluid Compute).
 */
function verifyApiKey(req: Request, bearerToken?: string): AuthInfo | undefined {
    const token =
        bearerToken?.trim() ||
        req.headers.get("x-api-key")?.trim() ||
        new URL(req.url).searchParams.get("apiKey")?.trim();

    if (!token) return undefined;

    return { token, clientId: "feriadosapi-byok", scopes: [] };
}

const authHandler = withMcpAuth(handler, verifyApiKey, { required: false });

async function wrappedHandler(req: NextRequest): Promise<Response> {
    const res = await authHandler(req);
    return corsOptions(res);
}

export { wrappedHandler as GET, wrappedHandler as POST };

export async function OPTIONS() {
    return corsOptions(new Response(null, { status: 204 }));
}
