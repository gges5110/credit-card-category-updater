import React from "react";

interface ErrorCardProps {
  error: string;
  source: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ source, error }) => {
  return (
    <div className={"bg-red-50 border border-red-200 rounded-lg p-6"}>
      <div className={"flex items-center mb-3"}>
        <div className={"flex-shrink-0"}>
          <svg
            className={"h-5 w-5 text-red-400"}
            fill={"currentColor"}
            viewBox={"0 0 20 20"}
          >
            <path
              clipRule={"evenodd"}
              d={
                "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              }
              fillRule={"evenodd"}
            />
          </svg>
        </div>
        <h3 className={"text-lg font-medium text-red-800 ml-3"}>{source}</h3>
      </div>
      <p className={"text-red-700"}>Failed to load categories: {error}</p>
    </div>
  );
};
