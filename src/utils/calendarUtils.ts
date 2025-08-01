import { CategoryResult } from "src/types";

export function parseQuarterDates(quarter: string): {
  endDate: string;
  startDate: string;
} {
  // Parse quarter codes like "2025-Q3"
  const quarterMatch = quarter.match(/(\d{4})-Q([1-4])/);

  if (quarterMatch) {
    const year = parseInt(quarterMatch[1]);
    const q = parseInt(quarterMatch[2]);

    let startDate: Date;
    let endDate: Date;

    switch (q) {
      case 1:
        startDate = new Date(year, 0, 1); // January 1
        endDate = new Date(year, 3, 1); // April 1
        break;
      case 2:
        startDate = new Date(year, 3, 1); // April 1
        endDate = new Date(year, 6, 1); // July 1
        break;
      case 3:
        startDate = new Date(year, 6, 1); // July 1
        endDate = new Date(year, 9, 1); // October 1
        break;
      case 4:
        startDate = new Date(year, 9, 1); // October 1
        endDate = new Date(year + 1, 0, 1); // January 1
        break;
      default:
        throw new Error(`Invalid quarter format: ${quarter}`);
    }

    return {
      startDate: formatDateForCalendar(startDate),
      endDate: formatDateForCalendar(endDate),
    };
  }

  throw new Error(`Invalid quarter format: ${quarter}`);
}

function formatDateForCalendar(date: Date): string {
  return date.toISOString().split("T")[0].replace(/-/g, "");
}

export function generateCalendarUrl(categoryResult: CategoryResult): string {
  const { startDate, endDate } = parseQuarterDates(categoryResult.quarter);
  console.log(startDate, endDate);

  const title = `${categoryResult.source}: ${categoryResult.category}`;
  const dates = `${startDate}/${endDate}`;

  const details = [
    `Quarterly Credit Card Categories`,
    ``,
    `Source: ${categoryResult.source}`,
    `Quarter: ${categoryResult.quarter}`,
    `Categories: ${categoryResult.category}`,
    ``,
    `Remember to activate your quarterly categories for maximum cashback!`,
    ``,
    `Generated by Credit Card Category Tracker`,
  ].join("\\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: dates,
    details: details,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getQuarterDisplayName(quarter: string): string {
  // Handle quarter codes like "2025-Q3"
  const quarterMatch = quarter.match(/(\d{4})-Q([1-4])/);

  if (quarterMatch) {
    const year = parseInt(quarterMatch[1]);
    const q = parseInt(quarterMatch[2]);

    let startMonth: string, endMonth: string, endDay: number;

    switch (q) {
      case 1:
        startMonth = "January";
        endMonth = "March";
        endDay = 31;
        break;
      case 2:
        startMonth = "April";
        endMonth = "June";
        endDay = 30;
        break;
      case 3:
        startMonth = "July";
        endMonth = "September";
        endDay = 30;
        break;
      case 4:
        startMonth = "October";
        endMonth = "December";
        endDay = 31;
        break;
      default:
        return quarter; // fallback to original string
    }

    return `${startMonth} 1, ${year} - ${endMonth} ${endDay}, ${year}`;
  }

  // Fallback for non-standard quarter formats
  return quarter;
}

export function getNextUpdateDate(): string {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
