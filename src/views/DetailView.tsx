import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

export function DetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading, error } = usePokemonDetail(id || '');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-64 bg-gray-300 rounded mb-8"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            style={{ backgroundColor: '#fefefe', color: '#171717' }}
          >
            &larr; Back to List
          </button>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading Pokemon details: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const maxStat = Math.max(...pokemon.stats.map(s => s.base_stat));
  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default;
  const sprite = officialArtwork || pokemon.sprites.front_default;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          style={{ backgroundColor: '#fefefe', color: '#171717' }}
        >
          &larr; Back to List
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header - Full Width */}
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 text-white">
            <div className="flex flex-col items-center justify-between">
              <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
              <span className="text-2xl font-bold opacity-75">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Image and Basic Info */}
            <div>
              {/* Image */}
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="p-8 flex items-center justify-center bg-baige-50 rounded-lg">
                  <img
                    src={sprite}
                    alt={pokemon.name}
                    className="w-3/4 h-auto"
                  />
                </div>
              </div>

              {/* Physical Attributes */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Height</h3>
                    <p className="text-3xl font-bold text-gray-800">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Weight</h3>
                    <p className="text-3xl font-bold text-gray-800">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Sprites */}
            <div className="p-8 bg-gray-50">
              {/* Stats */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Base Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => {
                    const percentage = (stat.base_stat / maxStat) * 100;
                    return (
                      <div key={stat.stat.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700 min-w-[120px]">
                            {STAT_NAMES[stat.stat.name] || stat.stat.name}
                          </span>
                          <span className="text-sm font-bold text-gray-800 min-w-[50px] text-right">
                            {stat.base_stat}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
