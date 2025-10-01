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

      it("should parse all quarters from fixture data", async () => {
        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarters).toHaveLength(4);
        expect(result.timestamp).toBeDefined();
        expect(result.error).toBeUndefined();

        // Verify quarters are sorted by start date
        const quarters = result.quarters;
        expect(quarters[0].quarter).toBe("2025-Q1");
        expect(quarters[1].quarter).toBe("2025-Q2");
        expect(quarters[2].quarter).toBe("2025-Q3");
        expect(quarters[3].quarter).toBe("2025-Q4");
      });

      it("should identify the active quarter based on current date", async () => {
        const result = await parser.parseCategories();

        // Currently in Q4 2025 (Oct 1 - Dec 31, 2025)
        const activeQuarter = result.quarters.find(q => q.status === "active");
        expect(activeQuarter).toBeDefined();
        expect(activeQuarter?.quarter).toBe("2025-Q4");
        expect(activeQuarter?.category).toBe("Amazon.com and Drug Stores");
      });

      it("should mark expired quarters correctly", async () => {
        const result = await parser.parseCategories();

        const expiredQuarters = result.quarters.filter(q => q.status === "expired");
        expect(expiredQuarters).toHaveLength(3);

        expect(expiredQuarters[0].quarter).toBe("2025-Q1");
        expect(expiredQuarters[0].category).toBe("Restaurants, Home Improvement Stores, and Select Streaming Services");
        expect(expiredQuarters[1].quarter).toBe("2025-Q2");
        expect(expiredQuarters[1].category).toBe("Grocery Stores and Wholesale Clubs");
        expect(expiredQuarters[2].quarter).toBe("2025-Q3");
        expect(expiredQuarters[2].category).toBe("Gas Stations & EV Charging, Public Transit, and Utilities");
      });

      it("should include start and end dates for each quarter", async () => {
        const result = await parser.parseCategories();

        result.quarters.forEach(quarter => {
          expect(quarter.startDate).toBeDefined();
          expect(quarter.endDate).toBeDefined();
          expect(typeof quarter.startDate).toBe("string");
          expect(typeof quarter.endDate).toBe("string");
        });
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
        expect(result.quarters).toHaveLength(1);
        expect(result.quarters[0].status).toBe("expired");
        expect(result.quarters[0].quarter).toBe("2025-Q1");
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
        expect(result.quarters).toHaveLength(0);
      });

      it("should handle missing quarters property", async () => {
        const noQuartersData: DiscoverResponse = {};

        vi.spyOn(parser as any, "fetchJson").mockResolvedValue(noQuartersData);

        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarters).toHaveLength(0);
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
        expect(result.quarters).toHaveLength(0);
      });
    });

    describe("with future quarters", () => {
      it("should mark future quarters correctly", async () => {
        const futureQuartersData: DiscoverResponse = {
          quarters: [
            {
              title: "Future Category",
              quarterLabelStartDate: "January 01, 2026",
              quarterLabelEndDate: "March 31, 2026",
            },
          ],
        };

        vi.spyOn(parser as any, "fetchJson").mockResolvedValue(
          futureQuartersData
        );

        const result = await parser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.quarters).toHaveLength(1);
        expect(result.quarters[0].status).toBe("future");
        expect(result.quarters[0].quarter).toBe("2026-Q1");
        expect(result.quarters[0].category).toBe("Future Category");
      });
    });
  });
});
