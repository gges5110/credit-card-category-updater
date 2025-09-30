import * as cheerio from "cheerio";
import { CategoryResult } from "./types";
import { BaseParser } from "./base-parser";
import { PARSER_CONFIG } from "./config";
import {
  CHASE_CATEGORY_KEYWORDS,
  CHASE_CATEGORY_SELECTORS,
  CHASE_FEATURED_BLOCK_SELECTOR,
  DEFAULT_QUARTER_LABEL,
  NO_CATEGORY_FOUND,
  CATEGORY_TEXT_MIN_LENGTH,
  CATEGORY_TEXT_MAX_LENGTH,
} from "./constants";
import {
  parseActivateByDate,
  extractDateComponents,
  inferQuarterFromYearAndMonth,
  inferQuarterFromDate,
  containsKeyword,
  isValidCategoryText,
} from "./utils";

export class ChaseParser extends BaseParser {
  public async parseCategories(): Promise<CategoryResult> {
    try {
      const html = await this.fetchHtml(PARSER_CONFIG.urls.chase);
      const $ = cheerio.load(html);

      const currentQuarter = this.parseQuarter($);
      const category = this.parseCategory($);

      return {
        source: "Chase Freedom",
        quarter: currentQuarter,
        category,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // When network fails, provide current quarter based on today's date
      const fallbackResult = this.createErrorResult(
        "Chase Freedom",
        error as Error
      );
      fallbackResult.quarter = inferQuarterFromDate(new Date().toISOString());
      return fallbackResult;
    }
  }

  private parseQuarter($: cheerio.CheerioAPI): string {
    let currentQuarter = DEFAULT_QUARTER_LABEL;

    // Look for quarter/date information by finding "Activate by" date
    let activateByDate: string | null = null;
    $("*").each((_, el) => {
      const text = $(el).text().trim();
      activateByDate = parseActivateByDate(text);
      if (activateByDate) {
        return false; // break
      }
    });

    // Infer quarter based on "Activate by" date
    if (activateByDate) {
      console.log('Found "Activate by" date:', activateByDate);

      const dateComponents = extractDateComponents(activateByDate);
      if (dateComponents) {
        currentQuarter = inferQuarterFromYearAndMonth(
          dateComponents.year,
          dateComponents.month
        );
      }
    }

    return currentQuarter;
  }

  private parseCategory($: cheerio.CheerioAPI): string {
    const results: string[] = [];

    // look for categories only under the featured block
    const featuredBlock = $(CHASE_FEATURED_BLOCK_SELECTOR).first();

    for (const selector of CHASE_CATEGORY_SELECTORS) {
      featuredBlock.find(selector).each((_, el) => {
        const text = $(el).text().trim();

        if (
          containsKeyword(text, CHASE_CATEGORY_KEYWORDS) &&
          isValidCategoryText(
            text,
            CATEGORY_TEXT_MIN_LENGTH,
            CATEGORY_TEXT_MAX_LENGTH
          )
        ) {
          results.push(text);
        }
      });

      if (results.length > 0) break; // Found categories, stop searching
    }

    return results.length > 0
      ? [...new Set(results)].join(", ")
      : NO_CATEGORY_FOUND;
  }
}
