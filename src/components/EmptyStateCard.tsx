import React from "react";
import { AlertTriangleIcon, ExternalLinkIcon } from "src/icons";
import { Source } from "src/types.ts";
import { getSourceUrl } from "src/utils/sourceUtils";

interface EmptyStateCardProps {
  source: Source;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ source }) => {
  return (
    <div className={"bg-yellow-50 border border-yellow-200 rounded-lg p-6"}>
      <div className={"flex items-center mb-3"}>
        <div className={"flex-shrink-0"}>
          <AlertTriangleIcon className={"h-5 w-5 text-yellow-400"} />
        </div>
        <h3 className={"text-lg font-medium text-yellow-800 ml-3"}>{source}</h3>
      </div>
      <p className={"text-yellow-700 mb-4"}>
        No categories available yet. Check back later!
      </p>

      <a
        className={
          "inline-flex items-center px-4 py-2 border border-yellow-300 text-sm font-medium rounded-md text-yellow-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 hover:bg-yellow-100 no-underline"
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
