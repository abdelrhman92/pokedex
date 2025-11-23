import { Suspense, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PokemonCard } from '../components/PokemonCard';
import { LoadingCard } from '../components/LoadingCard';
import { ErrorFallback } from '../components/ErrorFallback';
import { usePokemonList } from '../hooks/usePokemonList';
import { POKEMON_PER_PAGE } from '../services/pokeapi';

function PokemonGrid({ page, onPageChange }: { page: number; onPageChange: (page: number) => void }) {
  const offset = (page - 1) * POKEMON_PER_PAGE;
  const { data } = usePokemonList(offset, POKEMON_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {data.pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination currentPage={page} totalCount={data.total} onPageChange={onPageChange} />
    </>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
      {Array.from({ length: POKEMON_PER_PAGE }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalCount, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  const goToPage = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#fefefe', color: '#171717' }}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: currentPage === page ? '#171717' : '#fefefe',
              color: currentPage === page ? '#fefefe' : '#171717'
            }}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#fefefe', color: '#171717' }}
      >
        Next
      </button>
    </div>
  );
}

export function PaginationView() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary
        fallback={(error, reset) => <ErrorFallback error={error} resetErrorBoundary={reset} />}
      >
        <Suspense fallback={<LoadingGrid />}>
          <PokemonGrid page={currentPage} onPageChange={setCurrentPage} key={currentPage} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
