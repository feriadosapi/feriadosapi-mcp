export const toolDetails = [
    {
        name: "buscar_feriados",
        icon: "🔍",
        title: "Buscar Feriados",
        description:
            "Busca feriados brasileiros com filtros flexíveis. Ideal para consultas gerais com múltiplos critérios simultaneamente.",
        params: [
            { name: "date", type: "string", required: false, desc: "Data no formato YYYY-MM-DD", example: "2026-12-25" },
            { name: "type", type: "enum", required: false, desc: "Tipo do feriado", example: "NACIONAL | ESTADUAL | MUNICIPAL | FACULTATIVO" },
            { name: "uf", type: "string", required: false, desc: "Sigla do estado (2 letras)", example: "SP" },
            { name: "ibge", type: "string", required: false, desc: "Código IBGE do município", example: "3550308" },
            { name: "ano", type: "string", required: false, desc: "Ano com 4 dígitos", example: "2026" },
            { name: "month", type: "string", required: false, desc: "Mês (1-12). Requer 'ano'", example: "12" },
        ],
        returns: "Lista paginada de feriados com nome, data (DD/MM/YYYY), tipo e descrição.",
    },
    {
        name: "feriados_nacionais",
        icon: "🇧🇷",
        title: "Feriados Nacionais",
        description:
            "Lista todos os feriados nacionais do Brasil. Inclui Carnaval, Tiradentes, Independência, Natal e mais.",
        params: [
            { name: "ano", type: "string", required: false, desc: "Ano com 4 dígitos. Se omitido, retorna todos os anos", example: "2026" },
            { name: "facultativos", type: "boolean", required: false, desc: "Incluir feriados facultativos (Carnaval, Corpus Christi)", example: "true" },
        ],
        returns: "Lista de feriados nacionais com nome, data, tipo e descrição.",
    },
    {
        name: "feriados_por_estado",
        icon: "📍",
        title: "Feriados por Estado",
        description:
            "Lista feriados nacionais + estaduais de um UF. Use para perguntas como \"feriados em São Paulo\".",
        params: [
            { name: "uf", type: "string", required: true, desc: "Sigla do estado em maiúsculas (2 letras)", example: "RJ" },
            { name: "ano", type: "string", required: false, desc: "Ano com 4 dígitos", example: "2026" },
            { name: "facultativos", type: "boolean", required: false, desc: "Incluir feriados facultativos do estado", example: "true" },
        ],
        returns: "Lista de feriados nacionais e estaduais do UF informado.",
    },
    {
        name: "feriados_por_cidade",
        icon: "🏙️",
        title: "Feriados por Cidade",
        description:
            "Lista todos os feriados de uma cidade (nacionais + estaduais + municipais). Requer código IBGE.",
        params: [
            { name: "ibge", type: "string", required: true, desc: "Código IBGE do município. Use 'buscar_municipios' para encontrar", example: "3550308" },
            { name: "ano", type: "string", required: false, desc: "Ano com 4 dígitos", example: "2026" },
            { name: "facultativos", type: "boolean", required: false, desc: "Incluir feriados facultativos", example: "true" },
        ],
        returns: "Dados da cidade (nome, UF) + lista completa de feriados.",
    },
    {
        name: "verificar_data",
        icon: "📅",
        title: "Verificar se Data é Feriado",
        description:
            "Verifica se uma data específica é feriado. Ideal para \"amanhã é feriado?\" ou \"25/12 é feriado?\".",
        params: [
            { name: "data", type: "string", required: true, desc: "Data no formato YYYY-MM-DD", example: "2026-12-25" },
        ],
        returns: "Se é feriado ou não, com detalhes de todos os feriados naquela data.",
    },
    {
        name: "listar_estados",
        icon: "🏳️",
        title: "Listar Estados do Brasil",
        description:
            "Lista os 27 estados brasileiros (26 estados + DF) com siglas. Não requer parâmetros.",
        params: [],
        returns: "Lista com sigla (UF) e nome completo de cada estado. Total: 27.",
    },
    {
        name: "buscar_municipios",
        icon: "🏘️",
        title: "Buscar Municípios",
        description:
            "Busca municípios por estado. Use para descobrir o código IBGE antes de consultar feriados municipais.",
        params: [
            { name: "uf", type: "string", required: false, desc: "Sigla do estado para filtrar. Se omitido, retorna todos", example: "SP" },
            { name: "page", type: "number", required: false, desc: "Número da página", example: "1" },
            { name: "limit", type: "number", required: false, desc: "Itens por página (max: 100)", example: "50" },
        ],
        returns: "Lista paginada de municípios com nome, UF e código IBGE.",
    },
];
