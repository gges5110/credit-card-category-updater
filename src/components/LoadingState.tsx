import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className={"max-w-4xl mx-auto px-4 py-8"}>
      <div className={"text-center"}>
        <div
          className={
            "inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
          }
        >
          <svg
            className={"animate-spin h-8 w-8 text-blue-600"}
            fill={"none"}
            viewBox={"0 0 24 24"}
          >
            <circle
              className={"opacity-25"}
              cx={"12"}
              cy={"12"}
              r={"10"}
              stroke={"currentColor"}
              strokeWidth={"4"}
            ></circle>
            <path
              className={"opacity-75"}
              d={
                "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              }
              fill={"currentColor"}
            ></path>
          </svg>
        </div>
        <h2 className={"text-xl font-semibold text-gray-900 mb-2"}>
          Loading Categories
        </h2>
        <p className={"text-gray-600"}>
          Fetching the latest quarterly cashback categories...
        </p>
      </div>

      {/* Loading skeleton cards */}
      <div className={"grid md:grid-cols-2 gap-6 mt-12"}>
        {[1, 2].map((index) => (
          <div
            className={"border border-gray-200 rounded-lg p-6 animate-pulse"}
            key={index}
          >
            <div className={"flex items-center justify-between mb-4"}>
              <div className={"h-6 bg-gray-200 rounded w-32"}></div>
              <div className={"h-5 bg-gray-200 rounded w-24"}></div>
            </div>
            <div className={"space-y-3 mb-4"}>
              <div className={"h-4 bg-gray-200 rounded w-20"}></div>
              <div className={"h-4 bg-gray-200 rounded w-full"}></div>
              <div className={"h-4 bg-gray-200 rounded w-3/4"}></div>
            </div>
            <div
              className={
                "flex items-center justify-between pt-4 border-t border-gray-200"
              }
            >
              <div className={"space-y-2"}>
                <div className={"h-3 bg-gray-200 rounded w-32"}></div>
                <div className={"h-3 bg-gray-200 rounded w-28"}></div>
              </div>
              <div className={"h-9 bg-gray-200 rounded w-32"}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
