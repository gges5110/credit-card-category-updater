import React from "react";
import { QuarterInfo } from "src/types";

interface QuarterItemProps {
  quarter: QuarterInfo;
}

export const QuarterItem: React.FC<QuarterItemProps> = ({ quarter }) => (
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
    </div>
    <p className={"text-sm leading-relaxed"}>{quarter.category}</p>
    <p className={"text-xs opacity-75 mt-1"}>
      {new Date(quarter.startDate).toLocaleDateString()} -{" "}
      {new Date(quarter.endDate).toLocaleDateString()}
    </p>
  </div>
);
