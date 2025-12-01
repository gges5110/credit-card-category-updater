import React from "react";
import { ErrorIcon, ExternalLinkIcon } from "src/icons";
import { Source } from "src/types.ts";
import { getSourceUrl } from "src/utils/sourceUtils";

interface ErrorCardProps {
  error: string;
  source: Source;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ source, error }) => {
  return (
    <div className={"bg-red-50 border border-red-200 rounded-lg p-6"}>
      <div className={"flex items-center mb-3"}>
        <div className={"flex-shrink-0"}>
          <ErrorIcon className={"h-5 w-5 text-red-400"} />
        </div>
        <h3 className={"text-lg font-medium text-red-800 ml-3"}>{source}</h3>
      </div>
      <p className={"text-red-700 mb-4"}>Failed to load categories: {error}</p>

      <a
        className={
          "inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-100 no-underline"
        }
        href={getSourceUrl(source)}
        rel={"noopener noreferrer"}
        target={"_blank"}
      >
        <ExternalLinkIcon className={"h-4 w-4 mr-2"} />
        View Source
      </a>
    </div>
  );
};
