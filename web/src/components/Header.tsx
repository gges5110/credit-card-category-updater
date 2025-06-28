import React from 'react';

interface HeaderProps {
  lastUpdated?: string;
  nextUpdate?: string;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, nextUpdate }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">
              Credit Card Categories
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Track quarterly cashback categories for Discover and Chase Freedom credit cards. 
            Easily add upcoming categories to your Google Calendar.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-800">
              {lastUpdated && (
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Last updated: {new Date(lastUpdated).toLocaleDateString()}</span>
                </div>
              )}
              
              {nextUpdate && (
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Next update: {nextUpdate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};