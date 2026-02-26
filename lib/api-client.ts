const BASE_URL =
    process.env.FERIADOS_API_BASE_URL || "https://feriadosapi.com";

interface ApiRequestOptions {
    path: string;
    params?: Record<string, string | undefined>;
    apiKey?: string;
}

/**
 * Makes HTTP requests to the Feriados API.
 *
 * API key resolution order:
 * 1. Explicit `apiKey` passed in options (from user via URL param)
 * 2. `FERIADOS_API_KEY` env var (used in stdio mode)
 * If neither is provided, throws an error.
 */
export async function feriadosApi<T>(options: ApiRequestOptions): Promise<T> {
    const apiKey = options.apiKey || process.env.FERIADOS_API_KEY;

    if (!apiKey) {
        throw new Error(
            "API Key não fornecida. Passe sua chave via parâmetro apiKey na URL ou configure FERIADOS_API_KEY. Obtenha uma gratuita em https://feriadosapi.com/dashboard"
        );
    }

    const url = new URL(`${BASE_URL}/api/v1${options.path}`);

    // Adicionar query params (ignorar undefined)
    if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, value);
            }
        });
    }

    const response = await fetch(url.toString(), {
        headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage =
            errorBody.error || errorBody.message || response.statusText;

        switch (response.status) {
            case 401:
                throw new Error(
                    "API Key inválida ou ausente. Verifique sua chave em https://feriadosapi.com/dashboard"
                );
            case 403:
                throw new Error(`Acesso negado: ${errorMessage}`);
            case 429:
                throw new Error(
                    "Cota mensal excedida. Faça upgrade em https://feriadosapi.com/dashboard"
                );
            case 404:
                throw new Error(`Recurso não encontrado: ${errorMessage}`);
            default:
                throw new Error(`Erro na API (${response.status}): ${errorMessage}`);
        }
    }

    return response.json() as Promise<T>;
}
