export interface QuarterInfo {
  category: string;
  endDate: string;
  quarter: string;
  startDate: string;
  status: "expired" | "active" | "future";
}

export type Source = "Discover" | "Chase Freedom";

export interface CategoryResult {
  error?: string;
  quarters: QuarterInfo[];
  source: Source;
  timestamp: string;
}

export interface Category {
  calendarUrl: string;
  error?: string;
  quarters: QuarterInfo[];
  source: Source;
  timestamp: string;
}

export interface ParseResults {
  chase: CategoryResult;
  discover: CategoryResult;
  parseDate: string;
}

export interface WebsiteData {
  chase: Category;
  discover: Category;
  lastUpdated: string;
  nextUpdate: string;
  status: "success" | "error" | "loading";
}
