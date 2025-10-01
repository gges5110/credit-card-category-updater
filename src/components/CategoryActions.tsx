import React from "react";
import { getSourceUrl, getButtonColor } from "src/utils/sourceUtils";
import { Source } from "src/types.ts";

interface CategoryActionsProps {
  calendarUrl: string;
  source: Source;
}

export const CategoryActions: React.FC<CategoryActionsProps> = ({
  source,
  calendarUrl,
}) => {
  return (
    <div className={"flex items-center space-x-3"}>
      <a
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 no-underline ${getButtonColor(source)}`}
        href={calendarUrl}
        rel={"noopener noreferrer"}
        target={"_blank"}
      >
        <svg
          className={"h-4 w-4 mr-2"}
          fill={"none"}
          stroke={"currentColor"}
          viewBox={"0 0 24 24"}
        >
          <path
            d={
              "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            }
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            strokeWidth={2}
          />
        </svg>
        Add to Calendar
      </a>

      <a
        className={
          "inline-flex items-center px-4 py-2 border border-current border-opacity-30 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current hover:border-opacity-50 hover:bg-white hover:bg-opacity-50 no-underline"
        }
        href={getSourceUrl(source)}
        rel={"noopener noreferrer"}
        target={"_blank"}
      >
        <svg
          className={"h-4 w-4 mr-2"}
          fill={"none"}
          stroke={"currentColor"}
          viewBox={"0 0 24 24"}
        >
          <path
            d={
              "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            }
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            strokeWidth={2}
          />
        </svg>
        View Source
      </a>
    </div>
  );
};
