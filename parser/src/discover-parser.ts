import { CategoryResult, DiscoverResponse, QuarterData } from "./types";
import { BaseParser } from "./base-parser";
import { PARSER_CONFIG } from "./config";
import { DEFAULT_QUARTER_LABEL, NO_CATEGORY_FOUND } from "./constants";
import { inferQuarterFromDate } from "./utils";

export class DiscoverParser extends BaseParser {
  public async parseCategories(): Promise<CategoryResult> {
    try {
      const data = (await this.fetchJson(
        PARSER_CONFIG.urls.discover
      )) as DiscoverResponse;

      const currentQuarter = this.parseQuarter(data);
      const category = this.parseCategory(data);

      return {
        source: "Discover",
        quarter: currentQuarter,
        category,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.createErrorResult("Discover", error as Error);
    }
  }

  private parseQuarter(data: DiscoverResponse): string {
    let currentQuarter = DEFAULT_QUARTER_LABEL;

    // Extract quarter from JSON response
    if (data && data.quarters && Array.isArray(data.quarters)) {
      // Find the next quarter based on current date
      const now = new Date();
      const nextQuarterData = data.quarters.find((quarter: QuarterData) => {
        if (quarter.quarterLabelStartDate) {
          const startDate = new Date(quarter.quarterLabelStartDate);
          return startDate > now;
        }
        return false;
      });

      if (nextQuarterData) {
        // infer quarter from the start date
        if (nextQuarterData.quarterLabelStartDate) {
          currentQuarter = inferQuarterFromDate(
            nextQuarterData.quarterLabelStartDate
          );
        } else {
          currentQuarter = "Next Quarter";
        }
      }
    }

    return currentQuarter;
  }

  private parseCategory(data: DiscoverResponse): string {
    const results: string[] = [];

    // Extract categories from JSON response
    if (data && data.quarters && Array.isArray(data.quarters)) {
      // Find the next quarter based on current date
      const now = new Date();
      const nextQuarterData = data.quarters.find((quarter: QuarterData) => {
        if (quarter.quarterLabelStartDate) {
          const startDate = new Date(quarter.quarterLabelStartDate);
          return startDate > now;
        }
        return false;
      });

      if (nextQuarterData) {
        results.push(nextQuarterData.title);
      }
    }

    return results.length > 0 ? results.join(", ") : NO_CATEGORY_FOUND;
  }
}
