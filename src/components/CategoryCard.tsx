import React, { useState } from "react";
import { Category, QuarterInfo } from "src/types";
import { ErrorCard } from "./ErrorCard";
import { EmptyStateCard } from "./EmptyStateCard";
import { CategoryActions } from "./CategoryActions";
import { getSourceColor } from "src/utils/sourceUtils";

interface CategoryCardProps {
  categoryResult: Category;
}

const QuarterItem: React.FC<{ quarter: QuarterInfo }> = ({ quarter }) => (
  <div className={`mb-4 pb-4 border-b border-current border-opacity-10 last:border-0`}>
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
    </div>
    <p className={"text-sm leading-relaxed"}>{quarter.category}</p>
    <p className={"text-xs opacity-75 mt-1"}>
      {new Date(quarter.startDate).toLocaleDateString()} - {new Date(quarter.endDate).toLocaleDateString()}
    </p>
  </div>
);

export const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryResult,
}) => {
  const [showAllQuarters, setShowAllQuarters] = useState(false);

  if (categoryResult.error) {
    return (
      <ErrorCard error={categoryResult.error} source={categoryResult.source} />
    );
  }

  if (categoryResult.quarters.length === 0) {
    return <EmptyStateCard source={categoryResult.source} />;
  }

  const activeQuarter = categoryResult.quarters.find(q => q.status === "active");
  const otherQuarters = categoryResult.quarters.filter(q => q.status !== "active");

  return (
    <div
      className={`border rounded-lg p-6 transition-shadow duration-200 hover:shadow-md ${getSourceColor(
        categoryResult.source
      )}`}
    >
      <div className={"flex items-center justify-between mb-4"}>
        <h3 className={"text-xl font-semibold"}>{categoryResult.source}</h3>
        {activeQuarter && (
          <div className={"flex items-center space-x-2"}>
            <svg
              className={"h-5 w-5"}
              fill={"none"}
              stroke={"currentColor"}
              viewBox={"0 0 24 24"}
            >
              <path
                d={
                  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                }
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                strokeWidth={2}
              />
              <path
                d={"M15 11a3 3 0 11-6 0 3 3 0 016 0z"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                strokeWidth={2}
              />
            </svg>
            <span className={"text-sm font-medium"}>Active Quarter</span>
          </div>
        )}
      </div>

      {activeQuarter && (
        <div className={"mb-4"}>
          <h4 className={"text-sm font-medium mb-2 opacity-75"}>Current Categories:</h4>
          <p className={"text-base leading-relaxed mb-2"}>{activeQuarter.category}</p>
          <p className={"text-sm opacity-75"}>
            {new Date(activeQuarter.startDate).toLocaleDateString()} - {new Date(activeQuarter.endDate).toLocaleDateString()}
          </p>
        </div>
      )}

      {otherQuarters.length > 0 && (
        <div className={"mb-4"}>
          <button
            onClick={() => setShowAllQuarters(!showAllQuarters)}
            className={"text-sm font-medium opacity-75 hover:opacity-100 transition-opacity flex items-center"}
          >
            <span>{showAllQuarters ? "Hide" : "Show"} all quarters ({otherQuarters.length})</span>
            <svg
              className={`ml-1 h-4 w-4 transition-transform ${showAllQuarters ? "rotate-180" : ""}`}
              fill={"none"}
              stroke={"currentColor"}
              viewBox={"0 0 24 24"}
            >
              <path d={"M19 9l-7 7-7-7"} strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={2} />
            </svg>
          </button>
          {showAllQuarters && (
            <div className={"mt-3"}>
              {otherQuarters.map((quarter, idx) => (
                <QuarterItem key={idx} quarter={quarter} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={"pt-4 border-t border-current border-opacity-20"}>
        <div className={"flex items-center justify-between mb-3"}>
          <div className={"text-sm opacity-75"}>
            <p>Quarter: {activeQuarter?.quarter || categoryResult.quarters[0].quarter}</p>
            <p className={"mt-1"}>
              Updated: {new Date(categoryResult.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>

        <CategoryActions
          calendarUrl={categoryResult.calendarUrl}
          source={categoryResult.source}
        />
      </div>
    </div>
  );
};
