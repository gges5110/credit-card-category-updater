import { MONTH_TO_QUARTER_MAP, UNKNOWN_QUARTER_SUFFIX } from "./constants";

/**
 * Infers quarter from year and month string
 */
export function inferQuarterFromYearAndMonth(
  year: string,
  month: string
): string {
  const normalizedMonth = month.toLowerCase();
  const quarter =
    MONTH_TO_QUARTER_MAP[normalizedMonth as keyof typeof MONTH_TO_QUARTER_MAP];

  return quarter ? `${year}-${quarter}` : `${year}-${UNKNOWN_QUARTER_SUFFIX}`;
}

/**
 * Infers quarter from a date string
 */
export function inferQuarterFromDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Handle edge cases around quarter boundaries
  if (month >= 1 && month <= 3) return `${year}-Q1`;
  if (month >= 4 && month <= 6) return `${year}-Q2`;
  if (month >= 7 && month <= 9) return `${year}-Q3`;
  return `${year}-Q4`;
}

/**
 * Parses "Activate by" date from text
 */
export function parseActivateByDate(text: string): string | null {
  const activateByMatch = text.match(/Activate by\s+([^.]+)/i);
  return activateByMatch ? activateByMatch[1].trim() : null;
}

/**
 * Extracts month and year from date text
 */
export function extractDateComponents(
  dateText: string
): { month: string; year: string } | null {
  const dateMatch = dateText.match(/(\w+)\s+(\d{1,2}),?\s*(\d{4})?/);

  if (!dateMatch) return null;

  return {
    month: dateMatch[1].toLowerCase(),
    year: dateMatch[3] || new Date().getFullYear().toString(),
  };
}

/**
 * Checks if text contains any of the given keywords
 */
export function containsKeyword(
  text: string,
  keywords: readonly string[]
): boolean {
  const lowerText = text.toLowerCase();
  return keywords.some((keyword) => lowerText.includes(keyword));
}

/**
 * Validates if text meets category length requirements
 */
export function isValidCategoryText(
  text: string,
  minLength: number,
  maxLength: number
): boolean {
  return text.length >= minLength && text.length <= maxLength;
}
