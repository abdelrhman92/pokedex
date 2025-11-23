import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getDescription = () => {
    if (location.pathname === '/') {
      return 'Discover and explore Pokemon with page controls';
    }
    return 'Discover and explore Pokemon with infinity scroll';
  };

  return (
    <nav className="mb-8">
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="flex items-center gap-1 mb-2">
            <span className="text-3xl">⚡</span>
            <h1 className="text-3xl font-bold text-gray-900">Pokédex</h1>
          </Link>

          <p className="mb-4">{getDescription()}</p>

          <div className="flex gap-2">
            <Link
              to="/"
              className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: isActive('/') ? '#171717' : '#fefefe',
                color: isActive('/') ? '#fefefe' : '#171717'
              }}
            >
              Page Controls
            </Link>
            <Link
              to="/load-more"
              className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: isActive('/load-more') ? '#171717' : '#fefefe',
                color: isActive('/load-more') ? '#fefefe' : '#171717'
              }}
            >
              Infinity Scroll
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
