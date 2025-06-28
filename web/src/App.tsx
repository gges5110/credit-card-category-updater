import React from 'react';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { Footer } from './components/Footer';
import { useCategories } from './hooks/useCategories';

function App() {
  const { data, loading, error, retry } = useCategories();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LoadingState />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ErrorState onRetry={retry} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        lastUpdated={data?.lastUpdated}
        nextUpdate={data?.nextUpdate}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {data?.currentQuarter && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {data.currentQuarter.period}
              </h2>
              <p className="text-gray-600">
                {data.currentQuarter.startDate && data.currentQuarter.endDate && (
                  <>
                    {new Date(data.currentQuarter.startDate).toLocaleDateString()} - {new Date(data.currentQuarter.endDate).toLocaleDateString()}
                  </>
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <CategoryCard
                title="Discover"
                category={data.currentQuarter.discover.category}
                calendarUrl={data.currentQuarter.discover.calendarUrl}
                variant="discover"
              />
              
              <CategoryCard
                title="Chase Freedom"
                category={data.currentQuarter.chase.category}
                calendarUrl={data.currentQuarter.chase.calendarUrl}
                variant="chase"
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;