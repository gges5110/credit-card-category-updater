export interface CategoryResult {
  source: string;
  quarter: string;
  category: string;
  timestamp: string;
  error?: string;
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
    discover: {
      category: string;
      calendarUrl: string;
      source: string;
    };
    chase: {
      category: string;
      calendarUrl: string;
      source: string;
    };
  };
  lastUpdated: string;
  nextUpdate: string;
  status: 'success' | 'error' | 'loading';
}