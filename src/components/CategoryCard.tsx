import React, { useState } from "react";
import { Category } from "src/types";
import { ErrorCard } from "./ErrorCard";
import { EmptyStateCard } from "./EmptyStateCard";
import { CategoryActions } from "./CategoryActions";
import { QuarterItem } from "./QuarterItem";
import { getSourceColor } from "src/utils/sourceUtils";
import { MapPinIcon, ChevronDownIcon } from "src/icons";

interface CategoryCardProps {
  categoryResult: Category;
}

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

  const activeQuarter = categoryResult.quarters.find(
    (q) => q.status === "active"
  );
  const otherQuarters = categoryResult.quarters.filter(
    (q) => q.status !== "active"
  );

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
            <MapPinIcon className={"h-5 w-5"} />
            <span className={"text-sm font-medium"}>Active Quarter</span>
          </div>
        )}
      </div>

      {activeQuarter && (
        <div className={"mb-4"}>
          <h4 className={"text-sm font-medium mb-2 opacity-75"}>
            Current Categories:
          </h4>
          <p className={"text-base leading-relaxed mb-2"}>
            {activeQuarter.category}
          </p>
          <p className={"text-sm opacity-75"}>
            {new Date(activeQuarter.startDate).toLocaleDateString()} -{" "}
            {new Date(activeQuarter.endDate).toLocaleDateString()}
          </p>
        </div>
      )}

      {otherQuarters.length > 0 && (
        <div className={"mb-4"}>
          <button
            className={
              "text-sm font-medium opacity-75 hover:opacity-100 transition-opacity flex items-center"
            }
            onClick={() => setShowAllQuarters(!showAllQuarters)}
          >
            <span>
              {showAllQuarters ? "Hide" : "Show"} all quarters (
              {otherQuarters.length})
            </span>
            <ChevronDownIcon
              className={`ml-1 h-4 w-4 transition-transform ${showAllQuarters ? "rotate-180" : ""}`}
            />
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
            <p>
              Quarter:{" "}
              {activeQuarter?.quarter || categoryResult.quarters[0].quarter}
            </p>
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
