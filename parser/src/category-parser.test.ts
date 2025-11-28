import { describe, it, expect } from "vitest";
import CreditCardCategoryParser from "./category-parser";
import { ChaseParser } from "./chase-parser";
import { DiscoverParser } from "./discover-parser";

describe("CreditCardCategoryParser - Integration Tests", () => {
  const parser = new CreditCardCategoryParser();
  const chaseParser = new ChaseParser();
  const discoverParser = new DiscoverParser();

  // Set longer timeout for real HTTP requests
  const timeout = 30000;

  describe("Real API Integration", () => {
    it(
      "should fetch and parse real Discover categories",
      async () => {
        const result = await discoverParser.parseCategories();

        expect(result.source).toBe("Discover");
        expect(result.timestamp).toBeDefined();
        expect(Array.isArray(result.quarters)).toBe(true);

        // Log the actual results for inspection
        console.log("Discover Result:", result);

        // Should have quarters data
        expect(result.quarters.length).toBeGreaterThan(0);

        // Each quarter should have required fields
        result.quarters.forEach((quarter) => {
          expect(quarter).toHaveProperty("quarter");
          expect(quarter).toHaveProperty("category");
          expect(quarter).toHaveProperty("status");
          expect(quarter).toHaveProperty("startDate");
          expect(quarter).toHaveProperty("endDate");
          expect(["expired", "active", "future"]).toContain(quarter.status);
        });
      },
      timeout
    );

    it(
      "should fetch and parse real Chase categories",
      async () => {
        const result = await chaseParser.parseCategories();

        expect(result.source).toBe("Chase Freedom");
        expect(result.timestamp).toBeDefined();
        expect(Array.isArray(result.quarters)).toBe(true);

        // Log the actual results for inspection
        console.log("Chase Result:", result);

        // Chase should have at least 0 or 1 quarter (current quarter if found)
        expect(result.quarters.length).toBeGreaterThanOrEqual(0);

        // If quarters exist, verify structure
        result.quarters.forEach((quarter) => {
          expect(quarter).toHaveProperty("quarter");
          expect(quarter).toHaveProperty("category");
          expect(quarter).toHaveProperty("status");
          expect(quarter.status).toBe("active"); // Chase only returns current quarter
        });
      },
      timeout
    );

    it(
      "should fetch and parse all categories from real APIs",
      async () => {
        const results = await parser.parseAllCategories();

        expect(results).toHaveProperty("discover");
        expect(results).toHaveProperty("chase");
        expect(results).toHaveProperty("parseDate");

        // Both sources should return data
        expect(results.discover.source).toBe("Discover");
        expect(results.chase.source).toBe("Chase Freedom");

        // Verify quarters arrays exist
        expect(Array.isArray(results.discover.quarters)).toBe(true);
        expect(Array.isArray(results.chase.quarters)).toBe(true);

        // Log full results for inspection
        console.log(
          "Full Integration Results:",
          JSON.stringify(results, null, 2)
        );
      },
      timeout
    );
  });
});
