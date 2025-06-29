export interface CategoryResult {
  category: string;
  error?: string;
  quarter: string;
  source: string;
  timestamp: string;
}

export interface Category extends CategoryResult {
  calendarUrl: string;
}

export interface ParseResults {
  chase: CategoryResult;
  discover: CategoryResult;
  parseDate: string;
}

export interface WebsiteData {
  currentQuarter: {
    chase: Category;
    discover: Category;
    period: string;
  };
  lastUpdated: string;
  nextUpdate: string;
  status: "success" | "error" | "loading";
}
