// Parser constants
export const CHASE_CATEGORY_KEYWORDS = [
  // Retail & shopping
  "amazon",
  "whole foods",
  "walmart",
  "target",
  "department stores",
  "old navy",
  "paypal",
  // Grocery & food
  "grocery",
  "restaurant",
  "dining",
  "instacart",
  // Gas & transit
  "gas",
  "ev charging",
  "electric vehicle",
  // Travel
  "chase travel",
  "hotel",
  "airlines",
  "car rental",
  // Entertainment & streaming
  "streaming",
  "entertainment",
  // Health
  "drugstore",
  "pharmacy",
  "fitness",
  // Charitable
  "feeding america",
] as const;

export const CHASE_CATEGORY_SELECTORS = [
  "h2, h3, h4",      // headings — most common
  "li",              // list items — fallback if categories are bulleted
  "p, strong",       // paragraphs / bold text — last resort
] as const;

export const CHASE_FEATURED_BLOCK_SELECTOR =
  '[data-feature="featured-block"]' as const;

export const MONTH_TO_QUARTER_MAP = {
  march: "Q1",
  mar: "Q1",
  june: "Q2",
  jun: "Q2",
  september: "Q3",
  sep: "Q3",
  december: "Q4",
  dec: "Q4",
} as const;

export const DEFAULT_QUARTER_LABEL = "Current Quarter";
export const UNKNOWN_QUARTER_SUFFIX = "Q?";
export const NO_CATEGORY_FOUND = "No category found";

// Text length constraints for category parsing
export const CATEGORY_TEXT_MIN_LENGTH = 5;
export const CATEGORY_TEXT_MAX_LENGTH = 100;
