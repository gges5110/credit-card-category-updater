import React from "react";

interface IconProps {
  className?: string;
}

export const ChevronDownIcon: React.FC<IconProps> = ({
  className = "h-4 w-4",
}) => (
  <svg
    className={className}
    fill={"none"}
    stroke={"currentColor"}
    viewBox={"0 0 24 24"}
  >
    <path
      d={"M19 9l-7 7-7-7"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeWidth={2}
    />
  </svg>
);
