import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { pokeApi } from '../services/pokeapi';
import type { PokemonCardData } from '../types/pokemon';

export function usePokemonInfinite(limit: number) {
  return useSuspenseInfiniteQuery({
    queryKey: ['pokemon-infinite', limit],
    queryFn: async ({ pageParam }): Promise<{ pokemon: PokemonCardData[]; nextOffset: number | null }> => {
      const offset = pageParam as number;
      const listResponse = await pokeApi.getPokemonList(offset, limit);
      const pokemonNames = listResponse.results.map(p => p.name);
      const pokemonData = await pokeApi.getPokemonBatch(pokemonNames);
      const pokemonCards = pokemonData.map(p => pokeApi.transformToCardData(p));

      const nextOffset = listResponse.next ? offset + limit : null;

      return {
        pokemon: pokemonCards,
        nextOffset,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
