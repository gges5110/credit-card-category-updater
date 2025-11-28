import React from "react";

interface IconProps {
  className?: string;
}

export const ExternalLinkIcon: React.FC<IconProps> = ({
  className = "h-4 w-4",
}) => (
  <svg
    className={className}
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
);
