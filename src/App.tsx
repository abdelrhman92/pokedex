import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigation } from './components/Navigation';
import { PaginationView } from './views/PaginationView';
import { LoadMoreView } from './views/LoadMoreView';
import { DetailView } from './views/DetailView';
import { ErrorBoundary } from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const location = useLocation();

  const getBackgroundGradient = () => {
    if (location.pathname === '/') {
      return 'linear-gradient(to bottom, #ecf2fe, #e5ebff)';
    } else if (location.pathname === '/load-more') {
      return 'linear-gradient(to bottom, #e9fdf2, #defaeb)';
    } else if (location.pathname.startsWith('/pokemon/')) {
      return 'linear-gradient(to bottom, #fdf2f8, #fce7f3)';
    }
    return 'linear-gradient(to bottom, #f9fafb, #f3f4f6)';
  };

  const isDetailPage = location.pathname.startsWith('/pokemon/');

  return (
    <div className="min-h-screen" style={{ background: getBackgroundGradient() }}>
      {!isDetailPage && <Navigation />}
      <Routes>
        <Route path="/" element={<PaginationView />} />
        <Route path="/load-more" element={<LoadMoreView />} />
        <Route path="/pokemon/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
