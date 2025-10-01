import React from "react";
import { ErrorIcon } from "src/icons";
import { Source } from "src/types.ts";

interface ErrorCardProps {
  error: string;
  source: Source;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ source, error }) => {
  return (
    <div className={"bg-red-50 border border-red-200 rounded-lg p-6"}>
      <div className={"flex items-center mb-3"}>
        <div className={"flex-shrink-0"}>
          <ErrorIcon className="h-5 w-5 text-red-400" />
        </div>
        <h3 className={"text-lg font-medium text-red-800 ml-3"}>{source}</h3>
      </div>
      <p className={"text-red-700"}>Failed to load categories: {error}</p>
    </div>
  );
};
