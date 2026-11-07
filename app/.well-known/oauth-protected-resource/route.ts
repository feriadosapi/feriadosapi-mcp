import {
    metadataCorsOptionsRequestHandler,
    protectedResourceHandler,
} from "mcp-handler";

const AUTH_SERVER_URL =
    process.env.FERIADOS_API_BASE_URL || "https://feriadosapi.com";

const handler = protectedResourceHandler({
    authServerUrls: [AUTH_SERVER_URL],
});

const optionsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, optionsHandler as OPTIONS };
