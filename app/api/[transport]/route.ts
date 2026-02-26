import { createMcpHandler } from "mcp-handler";
import { registerAllTools } from "@/lib/register-tools";
import { NextRequest } from "next/server";

const handler = createMcpHandler(
    (server) => {
        registerAllTools(server);
    },
    {
        serverInfo: {
            name: "feriadosapi",
            version: "1.0.0",
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
 * Wraps the MCP handler to extract apiKey from URL query params (BYOK model).
 * If the user passes ?apiKey=fapi_xxx, it's set as the env var for this request.
 * Serverless functions are isolated per invocation, so this is safe.
 */
function withApiKey(
    mcpHandler: (req: NextRequest) => Promise<Response>
): (req: NextRequest) => Promise<Response> {
    return async (req: NextRequest) => {
        const url = new URL(req.url);
        const userApiKey = url.searchParams.get("apiKey");
        if (userApiKey) {
            process.env.FERIADOS_API_KEY = userApiKey;
        }
        const res = await mcpHandler(req);
        return corsOptions(res);
    };
}

const wrappedHandler = withApiKey(handler);

export { wrappedHandler as GET, wrappedHandler as POST };

export async function OPTIONS() {
    return corsOptions(new Response(null, { status: 204 }));
}
