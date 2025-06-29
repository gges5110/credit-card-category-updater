import React from "react";

interface ErrorStateProps {
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className={"max-w-2xl mx-auto px-4 py-12 text-center"}>
      <div
        className={
          "inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6"
        }
      >
        <svg
          className={"h-8 w-8 text-red-600"}
          fill={"none"}
          stroke={"currentColor"}
          viewBox={"0 0 24 24"}
        >
          <path
            d={
              "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            }
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            strokeWidth={2}
          />
        </svg>
      </div>

      <h2 className={"text-2xl font-semibold text-gray-900 mb-4"}>
        Unable to Load Categories
      </h2>

      <p className={"text-gray-600 mb-8 leading-relaxed"}>
        We are having trouble fetching the latest quarterly categories. This
        could be a temporary issue with our data source or network connectivity.
      </p>

      <div className={"space-y-4"}>
        {onRetry && (
          <button
            className={
              "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            }
            onClick={onRetry}
          >
            <svg
              className={"h-5 w-5 mr-2"}
              fill={"none"}
              stroke={"currentColor"}
              viewBox={"0 0 24 24"}
            >
              <path
                d={
                  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                }
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                strokeWidth={2}
              />
            </svg>
            Try Again
          </button>
        )}

        <div className={"text-sm text-gray-500"}>
          <p>If the problem persists, please check back later.</p>
          <p className={"mt-1"}>Categories are typically updated monthly.</p>
        </div>
      </div>
    </div>
  );
};
