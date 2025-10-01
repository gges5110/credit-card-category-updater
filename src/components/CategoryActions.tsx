import React from "react";
import { getSourceUrl, getButtonColor } from "src/utils/sourceUtils";
import { Source } from "src/types";
import { CalendarIcon, ExternalLinkIcon } from "src/icons";

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
        <CalendarIcon className="h-4 w-4 mr-2" />
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
        <ExternalLinkIcon className="h-4 w-4 mr-2" />
        View Source
      </a>
    </div>
  );
};
