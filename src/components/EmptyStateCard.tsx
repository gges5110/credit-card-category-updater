import React from "react";
import { AlertTriangleIcon } from "src/icons";
import { Source } from "src/types.ts";

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
      <p className={"text-yellow-700"}>
        No categories available yet. Check back later!
      </p>
    </div>
  );
};
