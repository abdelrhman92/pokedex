import type { PokemonListResponse, Pokemon, PokemonCardData } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 20;

export const pokeApi = {
  /**
   * Fetch a paginated list of Pokemon
   * @param offset - The offset for pagination
   * @param limit - Number of items to fetch
   */
  async getPokemonList(offset: number = 0, limit: number = ITEMS_PER_PAGE): Promise<PokemonListResponse> {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Fetch detailed Pokemon data by name or ID
   * @param nameOrId - Pokemon name or ID
   */
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Fetch multiple Pokemon details in parallel
   * @param names - Array of Pokemon names
   */
  async getPokemonBatch(names: string[]): Promise<Pokemon[]> {
    const promises = names.map(name => this.getPokemon(name));
    return Promise.all(promises);
  },

  /**
   * Transform Pokemon data to card format
   * @param pokemon - Full Pokemon data
   */
  transformToCardData(pokemon: Pokemon): PokemonCardData {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
      types: pokemon.types.map(t => t.type.name),
    };
  },
};

export const POKEMON_PER_PAGE = ITEMS_PER_PAGE;
