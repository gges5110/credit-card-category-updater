export interface CategoryResult {
  source: string;
  quarter: string;
  category: string;
  timestamp: string;
  error?: string;
}

export interface Category extends CategoryResult{
  calendarUrl: string;
}

export interface ParseResults {
  discover: CategoryResult;
  chase: CategoryResult;
  parseDate: string;
}

export interface WebsiteData {
  currentQuarter: {
    period: string;
    startDate: string;
    endDate: string;
    discover: Category;
    chase: Category;
  };
  lastUpdated: string;
  nextUpdate: string;
  status: 'success' | 'error' | 'loading';
}
