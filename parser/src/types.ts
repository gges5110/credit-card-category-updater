export interface CategoryResult {
  category: string;
  error?: string;
  quarter: string;
  source: string;
  timestamp: string;
}

export interface ParseResults {
  chase: CategoryResult;
  discover: CategoryResult;
  parseDate: string;
}

export interface QuarterData {
  quarterLabelStartDate?: string;
  quarterLabelEndDate?: string;
  title: string;
}

export interface DiscoverResponse {
  quarters?: QuarterData[];
}
