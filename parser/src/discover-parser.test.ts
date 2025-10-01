import { describe, it, expect, vi, beforeEach } from "vitest";
import { DiscoverParser } from "./discover-parser";
import discoverResponse from "./__fixtures__/discover-response.json";
import { DiscoverResponse } from "./types";

describe("DiscoverParser", () => {
  let parser: DiscoverParser;

  beforeEach(() => {
    parser = new DiscoverParser();
  });

  describe("parseCategories", () => {
    describe("with fixture response data", () => {
      beforeEach(() => {
        vi.spyOn(parser as any, "fetchJson").mockResolvedValue(
          discoverResponse as DiscoverResponse
        );
      });

      it("should parse current quarter (Q4 2025) categories from fixture data", async () => {
        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarter).toBe("2025-Q4");
        expect(result.category).toBe("Amazon.com and Drug Stores");
        expect(result.timestamp).toBeDefined();
        expect(result.error).toBeUndefined();
      });

      it("should identify the active quarter based on current date", async () => {
        const result = await parser.parseCategories();

        // Currently in Q4 2025 (Oct 1 - Dec 31, 2025)
        expect(result.quarter).toBe("2025-Q4");
        expect(result.category).toBe("Amazon.com and Drug Stores");
      });

      it("should parse all quarters from fixture data", async () => {
        // Verify the fixture has all expected quarters
        expect(discoverResponse.quarters).toHaveLength(4);

        const quarters = discoverResponse.quarters!;
        expect(quarters[0].title).toBe("Restaurants, Home Improvement Stores, and Select Streaming Services");
        expect(quarters[0].offerStatus).toBe("expired");
        expect(quarters[1].title).toBe("Grocery Stores and Wholesale Clubs");
        expect(quarters[1].offerStatus).toBe("expired");
        expect(quarters[2].title).toBe("Gas Stations & EV Charging, Public Transit, and Utilities");
        expect(quarters[2].offerStatus).toBe("expired");
        expect(quarters[3].title).toBe("Amazon.com and Drug Stores");
        expect(quarters[3].offerStatus).toBe("qualification");
      });
    });

    describe("with expired quarters only", () => {
      it("should handle expired quarters correctly", async () => {
        // Mock data with only expired quarters
        const expiredQuartersData: DiscoverResponse = {
          quarters: [
            {
              title: "Restaurants, Home Improvement Stores, and Select Streaming Services",
              quarterLabelStartDate: "January 01, 2025",
              quarterLabelEndDate: "March 31, 2025",
            },
          ],
        };

        vi.spyOn(parser as any, "fetchJson").mockResolvedValue(
          expiredQuartersData
        );

        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarter).toBe("Current Quarter");
        expect(result.category).toBe("No category found");
      });
    });

    describe("with empty or missing data", () => {
      it("should handle empty quarters array", async () => {
        const emptyData: DiscoverResponse = {
          quarters: [],
        };

        vi.spyOn(parser as any, "fetchJson").mockResolvedValue(emptyData);

        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarter).toBe("Current Quarter");
        expect(result.category).toBe("No category found");
      });

      it("should handle missing quarters property", async () => {
        const noQuartersData: DiscoverResponse = {};

        vi.spyOn(parser as any, "fetchJson").mockResolvedValue(noQuartersData);

        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarter).toBe("Current Quarter");
        expect(result.category).toBe("No category found");
      });
    });

    describe("with fetch errors", () => {
      it("should handle fetch errors gracefully", async () => {
        vi.spyOn(parser as any, "fetchJson").mockRejectedValue(
          new Error("Network error")
        );

        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.error).toBe("Network error");
        expect(result.quarter).toBe("");
        expect(result.category).toBe("");
      });
    });
  });
});
