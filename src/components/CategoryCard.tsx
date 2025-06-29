import React from "react";
import { Category } from "src/types";
import { ErrorCard } from "./ErrorCard";
import { EmptyStateCard } from "./EmptyStateCard";
import { CategoryActions } from "./CategoryActions";
import { getSourceColor } from "src/utils/sourceUtils";

interface CategoryCardProps {
  categoryResult: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryResult,
}) => {
  if (categoryResult.error) {
    return (
      <ErrorCard error={categoryResult.error} source={categoryResult.source} />
    );
  }

  if (categoryResult.category === "No category found") {
    return <EmptyStateCard source={categoryResult.source} />;
  }

  return (
    <div
      className={`border rounded-lg p-6 transition-shadow duration-200 hover:shadow-md ${getSourceColor(
        categoryResult.source
      )}`}
    >
      <div className={"flex items-center justify-between mb-4"}>
        <h3 className={"text-xl font-semibold"}>{categoryResult.source}</h3>
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
      </div>

      <div className={"mb-4"}>
        <h4 className={"text-sm font-medium mb-2 opacity-75"}>Categories:</h4>
        <p className={"text-base leading-relaxed"}>{categoryResult.category}</p>
      </div>

      <div className={"pt-4 border-t border-current border-opacity-20"}>
        <div className={"flex items-center justify-between mb-3"}>
          <div className={"text-sm opacity-75"}>
            <p>Quarter: {categoryResult.quarter}</p>
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
