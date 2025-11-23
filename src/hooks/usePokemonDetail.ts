import { useQuery } from '@tanstack/react-query';
import { pokeApi } from '../services/pokeapi';

export function usePokemonDetail(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => pokeApi.getPokemon(nameOrId),
    enabled: !!nameOrId,
  });
}
