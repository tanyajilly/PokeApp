const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}

// single Pokémon
interface PokemonDetails {
    abilities: {
        ability: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
    sprites: { front_default: string };
    id: number;
    name: string;
    height: number;
    weight: number;
}

export const fetchPokemonList = async (
    offset = 0,
    limit = 10,
    signal: AbortSignal
): Promise<PokemonListResponse> => {
    const response = await fetch(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`, { signal }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch the pokemon list.");
    }
    return response.json();
};

export const fetchPokemonDetails = async (
    name: string,
    signal: AbortSignal
): Promise<PokemonDetails> => {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`, { signal });
    if (!response.ok) {
        throw new Error(`Failed to fetch details for pokemon ${name}`);
    }
    return response.json();
};
