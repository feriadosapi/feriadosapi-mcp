const BASE_URL =
    process.env.FERIADOS_API_BASE_URL || "https://feriadosapi.com";

interface ApiRequestOptions {
    path: string;
    params?: Record<string, string | undefined>;
    apiKey?: string;
}

/**
 * Faz requisições HTTP para a Feriados API.
 *
 * Ordem de resolução da API key:
 * 1. `apiKey` passada explicitamente nas opções (via parâmetro na URL)
 * 2. Variável de ambiente `FERIADOS_API_KEY` (usado no modo stdio)
 * Se nenhuma for fornecida, lança um erro.
 */
export async function feriadosApi<T>(options: ApiRequestOptions): Promise<T> {
    const apiKey = options.apiKey || process.env.FERIADOS_API_KEY;

    if (!apiKey) {
        throw new Error(
            "API Key não fornecida. Passe sua chave via parâmetro apiKey na URL ou configure FERIADOS_API_KEY. Obtenha uma gratuita em https://feriadosapi.com/dashboard"
        );
    }

    const url = new URL(`${BASE_URL}/api/v1${options.path}`);

    // Adiciona query params (ignora undefined)
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
                    "Limite de requisições excedido. Plano Gratuito: 60 req/min. Para aumentar o limite, faça upgrade em https://feriadosapi.com/dashboard"
                );
            case 404:
                throw new Error(`Recurso não encontrado: ${errorMessage}`);
            default:
                throw new Error(`Erro na API (${response.status}): ${errorMessage}`);
        }
    }

    return response.json() as Promise<T>;
}
