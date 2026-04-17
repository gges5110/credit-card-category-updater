import React from "react";
import { QuarterInfo, Source } from "src/types";
import { CalendarIcon } from "src/icons";
import { generateCalendarUrlForQuarter } from "src/utils/calendarUtils";

interface QuarterItemProps {
  quarter: QuarterInfo;
  source: Source;
}

export const QuarterItem: React.FC<QuarterItemProps> = ({ quarter, source }) => {
  const calendarUrl = generateCalendarUrlForQuarter(quarter, source);

  return (
    <div
      className={`mb-4 pb-4 border-b border-current border-opacity-10 last:border-0`}
    >
      <div className={"flex items-center justify-between mb-2"}>
        <div className={"flex items-center space-x-2"}>
          <span className={"font-medium"}>{quarter.quarter}</span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              quarter.status === "active"
                ? "bg-green-100 text-green-800"
                : quarter.status === "future"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {quarter.status}
          </span>
        </div>
        <a
          className={
            "inline-flex items-center px-3 py-1 border border-current border-opacity-30 text-xs font-medium rounded-md transition-colors duration-200 hover:border-opacity-50 hover:bg-white hover:bg-opacity-50 no-underline"
          }
          href={calendarUrl}
          rel={"noopener noreferrer"}
          target={"_blank"}
        >
          <CalendarIcon className={"h-3 w-3 mr-1"} />
          Add to Calendar
        </a>
      </div>
      <p className={"text-sm leading-relaxed"}>{quarter.category}</p>
      <p className={"text-xs opacity-75 mt-1"}>
        {new Date(quarter.startDate).toLocaleDateString()} -{" "}
        {new Date(quarter.endDate).toLocaleDateString()}
      </p>
    </div>
  );
};
