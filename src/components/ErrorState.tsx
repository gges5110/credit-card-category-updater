import React from "react";
import { WarningIcon, RefreshIcon } from "src/icons";

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
        <WarningIcon className="h-8 w-8 text-red-600" />
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
            <RefreshIcon className="h-5 w-5 mr-2" />
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
