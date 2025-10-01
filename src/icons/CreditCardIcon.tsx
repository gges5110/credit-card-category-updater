import React from "react";

interface IconProps {
  className?: string;
}

export const CreditCardIcon: React.FC<IconProps> = ({ className = "h-8 w-8" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      height="16"
      rx="2"
      ry="2"
      width="22"
      x="1"
      y="4"
    />
    <line x1="1" x2="23" y1="10" y2="10" />
  </svg>
);
