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
