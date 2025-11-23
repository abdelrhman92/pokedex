import { Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PokemonCard } from '../components/PokemonCard';
import { LoadingCard } from '../components/LoadingCard';
import { ErrorFallback } from '../components/ErrorFallback';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';
import { POKEMON_PER_PAGE } from '../services/pokeapi';

function PokemonInfiniteGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonInfinite(
    POKEMON_PER_PAGE
  );

  const allPokemon = data.pages.flatMap((page) => page.pokemon);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {allPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#fefefe', color: '#171717' }}
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              'Load More Pokémon'
            )}
          </button>
        </div>
      )}

      {isFetchingNextPage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {Array.from({ length: POKEMON_PER_PAGE }).map((_, i) => (
            <LoadingCard key={`loading-${i}`} />
          ))}
        </div>
      )}
    </>
  );
}

function InitialLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
      {Array.from({ length: POKEMON_PER_PAGE }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

export function LoadMoreView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary
        fallback={(error, reset) => <ErrorFallback error={error} resetErrorBoundary={reset} />}
      >
        <Suspense fallback={<InitialLoading />}>
          <PokemonInfiniteGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
