import fetch from "node-fetch";
import { CategoryResult } from "./types";
import { PARSER_CONFIG } from "./config";

export abstract class BaseParser {
  protected async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        "User-Agent": PARSER_CONFIG.userAgent,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.status}`);
    }

    return await response.text();
  }

  protected async fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url, {
      headers: {
        "User-Agent": PARSER_CONFIG.userAgent,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  protected createErrorResult(source: string, error: Error): CategoryResult {
    console.error(`Error parsing ${source} categories:`, error.message);
    return {
      source,
      quarter: "",
      category: "",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }

  abstract parseCategories(): Promise<CategoryResult>;
}
