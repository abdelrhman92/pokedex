import { useSuspenseQuery } from '@tanstack/react-query';
import { pokeApi } from '../services/pokeapi';
import type { PokemonCardData } from '../types/pokemon';

export function usePokemonList(offset: number, limit: number) {
  return useSuspenseQuery({
    queryKey: ['pokemon-list', offset, limit],
    queryFn: async (): Promise<{ pokemon: PokemonCardData[]; total: number }> => {
      const listResponse = await pokeApi.getPokemonList(offset, limit);
      const pokemonNames = listResponse.results.map(p => p.name);
      const pokemonData = await pokeApi.getPokemonBatch(pokemonNames);
      const pokemonCards = pokemonData.map(p => pokeApi.transformToCardData(p));

      return {
        pokemon: pokemonCards,
        total: listResponse.count,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
