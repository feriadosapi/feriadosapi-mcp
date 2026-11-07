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
    res.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, x-api-key, MCP-Protocol-Version"
    );
    res.headers.set("Access-Control-Expose-Headers", "WWW-Authenticate");
    return res;
}

/**
 * Resolve a credencial do cliente POR REQUISIÇÃO (OAuth 2.1 Bearer ou BYOK legado).
 *
 * Aceita, em ordem: `Authorization: Bearer <token>`, header `X-API-Key` ou
 * `?apiKey=` na URL (legado). Quando nenhuma credencial é enviada, `withMcpAuth`
 * responde `401 Unauthorized` com `WWW-Authenticate: Bearer ... resource_metadata="..."`
 * disparando automaticamente o fluxo OAuth 2.1 + PKCE nos clientes MCP.
 */
function verifyApiKey(req: Request, bearerToken?: string): AuthInfo | undefined {
    const searchParams = new URL(req.url).searchParams;
    const token =
        bearerToken?.trim() ||
        req.headers.get("x-api-key")?.trim() ||
        searchParams.get("apiKey")?.trim() ||
        searchParams.get("apikey")?.trim() ||
        searchParams.get("api_key")?.trim();

    if (!token) return undefined;

    return { token, clientId: "feriadosapi-mcp", scopes: ["holidays:read"] };
}

const authHandler = withMcpAuth(handler, verifyApiKey, {
    required: true,
    resourceMetadataPath: "/.well-known/oauth-protected-resource",
});

async function wrappedHandler(req: NextRequest): Promise<Response> {
    const res = await authHandler(req);
    return corsOptions(res);
}

export { wrappedHandler as GET, wrappedHandler as POST };

export async function OPTIONS() {
    return corsOptions(new Response(null, { status: 204 }));
}
