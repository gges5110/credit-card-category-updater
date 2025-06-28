import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  categoryResult: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryResult,
}) => {
  const handleAddToCalendar = () => {
    window.open(categoryResult.calendarUrl, '_blank', 'noopener,noreferrer');
  };

  const getSourceColor = (source: string) => {
    if (source.includes('Discover')) {
      return 'bg-orange-50 border-orange-200 text-orange-800';
    } else if (source.includes('Chase')) {
      return 'bg-blue-50 border-blue-200 text-blue-800';
    }
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getButtonColor = (source: string) => {
    if (source.includes('Discover')) {
      return 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500';
    } else if (source.includes('Chase')) {
      return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
    }
    return 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500';
  };

  if (categoryResult.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 ml-3">
            {categoryResult.source}
          </h3>
        </div>
        <p className="text-red-700">
          Failed to load categories: {categoryResult.error}
        </p>
      </div>
    );
  }

  if (categoryResult.category === 'No category found') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-yellow-800 ml-3">
            {categoryResult.source}
          </h3>
        </div>
        <p className="text-yellow-700">
          No categories available yet. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-lg p-6 transition-shadow duration-200 hover:shadow-md ${getSourceColor(categoryResult.source)}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{categoryResult.source}</h3>
        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm font-medium">Active Quarter</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 opacity-75">Categories:</h4>
        <p className="text-base leading-relaxed">{categoryResult.category}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-current border-opacity-20">
        <div className="text-sm opacity-75">
          <p>Quarter: {categoryResult.quarter}</p>
          <p className="mt-1">
            Updated: {new Date(categoryResult.timestamp).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={handleAddToCalendar}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonColor(categoryResult.source)}`}
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Add to Calendar
        </button>
      </div>
    </div>
  );
};
