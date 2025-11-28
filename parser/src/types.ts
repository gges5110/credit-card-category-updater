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

export interface ParseResults {
  chase: CategoryResult;
  discover: CategoryResult;
  parseDate: string;
}

export interface QuarterData {
  quarterLabelEndDate?: string;
  quarterLabelStartDate?: string;
  title: string;
}

export interface DiscoverResponse {
  quarters?: QuarterData[];
}
