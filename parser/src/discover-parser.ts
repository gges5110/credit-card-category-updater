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
      // When network fails, provide current quarter based on today's date
      const fallbackResult = this.createErrorResult("Discover", error as Error);
      fallbackResult.quarter = inferQuarterFromDate(new Date().toISOString());
      return fallbackResult;
    }
  }

  private parseQuarter(data: DiscoverResponse): string {
    let currentQuarter = DEFAULT_QUARTER_LABEL;

    // Extract quarter from JSON response
    if (data && data.quarters && Array.isArray(data.quarters)) {
      // Find the current active quarter based on current date
      const now = new Date();
      const activeQuarterData = data.quarters.find((quarter: QuarterData) => {
        if (quarter.quarterLabelStartDate && quarter.quarterLabelEndDate) {
          const startDate = new Date(quarter.quarterLabelStartDate);
          const endDate = new Date(quarter.quarterLabelEndDate);
          return now >= startDate && now <= endDate;
        }
        return false;
      });

      if (activeQuarterData) {
        // infer quarter from the start date
        if (activeQuarterData.quarterLabelStartDate) {
          currentQuarter = inferQuarterFromDate(
            activeQuarterData.quarterLabelStartDate
          );
        } else {
          currentQuarter = "Current Quarter";
        }
      }
    }

    return currentQuarter;
  }

  private parseCategory(data: DiscoverResponse): string {
    const results: string[] = [];

    // Extract categories from JSON response
    if (data && data.quarters && Array.isArray(data.quarters)) {
      // Find the current active quarter based on current date
      const now = new Date();
      const activeQuarterData = data.quarters.find((quarter: QuarterData) => {
        if (quarter.quarterLabelStartDate && quarter.quarterLabelEndDate) {
          const startDate = new Date(quarter.quarterLabelStartDate);
          const endDate = new Date(quarter.quarterLabelEndDate);
          return now >= startDate && now <= endDate;
        }
        return false;
      });

      if (activeQuarterData) {
        results.push(activeQuarterData.title);
      }
    }

    return results.length > 0 ? results.join(", ") : NO_CATEGORY_FOUND;
  }
}
