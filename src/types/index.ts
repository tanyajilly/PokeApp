export interface PokemonDetails {
    abilities: string[];
    types: string[];
    image: string;
    id: number;
    name: string;
    height: number;
    weight: number;
}

export type Order = 'asc' | 'desc';