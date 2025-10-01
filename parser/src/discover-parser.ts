import { CategoryResult, DiscoverResponse, QuarterData, QuarterInfo } from "./types";
import { BaseParser } from "./base-parser";
import { PARSER_CONFIG } from "./config";
import { inferQuarterFromDate } from "./utils";

export class DiscoverParser extends BaseParser {
  public async parseCategories(): Promise<CategoryResult> {
    try {
      const data = (await this.fetchJson(
        PARSER_CONFIG.urls.discover
      )) as DiscoverResponse;

      const quarters = this.parseAllQuarters(data);

      return {
        source: "Discover",
        quarters,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.createErrorResult("Discover", error as Error);
    }
  }

  private parseAllQuarters(data: DiscoverResponse): QuarterInfo[] {
    const quarters: QuarterInfo[] = [];

    if (!data || !data.quarters || !Array.isArray(data.quarters)) {
      return quarters;
    }

    const now = new Date();

    for (const quarter of data.quarters) {
      if (!quarter.quarterLabelStartDate || !quarter.quarterLabelEndDate) {
        continue;
      }

      const startDate = new Date(quarter.quarterLabelStartDate);
      const endDate = new Date(quarter.quarterLabelEndDate);

      // Determine status based on dates
      let status: "expired" | "active" | "future";
      if (now < startDate) {
        status = "future";
      } else if (now > endDate) {
        status = "expired";
      } else {
        status = "active";
      }

      quarters.push({
        quarter: inferQuarterFromDate(quarter.quarterLabelStartDate),
        category: quarter.title,
        status,
        startDate: quarter.quarterLabelStartDate,
        endDate: quarter.quarterLabelEndDate,
      });
    }

    // Sort by start date
    quarters.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return quarters;
  }
}
