export interface QuarterInfo {
  quarter: string;
  category: string;
  status: "expired" | "active" | "future";
  startDate: string;
  endDate: string;
}

export type Source = "Discover" | "Chase Freedom";

export interface CategoryResult {
  quarters: QuarterInfo[];
  error?: string;
  source: Source;
  timestamp: string;
}

export interface Category {
  quarters: QuarterInfo[];
  error?: string;
  source: Source;
  timestamp: string;
  calendarUrl: string;
}

export interface ParseResults {
  chase: CategoryResult;
  discover: CategoryResult;
  parseDate: string;
}

export interface WebsiteData {
  discover: Category;
  chase: Category;
  lastUpdated: string;
  nextUpdate: string;
  status: "success" | "error" | "loading";
}
