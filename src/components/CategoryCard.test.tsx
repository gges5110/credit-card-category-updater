import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CategoryCard } from "./CategoryCard";
import { Category } from "src/types";

describe("CategoryCard", () => {
  const mockTimestamp = "2025-10-01T00:00:00.000Z";
  const mockCalendarUrl = "https://example.com/calendar";

  describe("Error state", () => {
    it("renders ErrorCard when error exists", () => {
      const categoryResult: Category = {
        source: "Discover",
        error: "Network error",
        quarters: [],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  describe("Empty state", () => {
    it("renders EmptyStateCard when no quarters exist", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText(/No categories available/i)).toBeInTheDocument();
    });
  });

  describe("Active quarter display", () => {
    it("displays active quarter prominently", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText("Amazon.com and Drug Stores")).toBeInTheDocument();
      expect(screen.getByText("Current Categories:")).toBeInTheDocument();
      expect(screen.getByText("Active Quarter")).toBeInTheDocument();
    });

    it("displays formatted dates for active quarter", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      // Check that dates are rendered (exact format depends on locale)
      // Just verify that date-like text is present
      const dateElements = screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
      expect(dateElements.length).toBeGreaterThan(0);
    });
  });

  describe("Toggle quarters functionality", () => {
    it("shows toggle button when other quarters exist", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
          {
            quarter: "2025-Q3",
            category: "Gas Stations",
            status: "expired",
            startDate: "2025-07-01",
            endDate: "2025-09-30",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText(/Show all quarters \(1\)/i)).toBeInTheDocument();
    });

    it("toggles quarters visibility when button is clicked", async () => {
      const user = userEvent.setup();
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
          {
            quarter: "2025-Q3",
            category: "Gas Stations",
            status: "expired",
            startDate: "2025-07-01",
            endDate: "2025-09-30",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      // Initially, expired quarter should not be visible
      expect(screen.queryByText("Gas Stations")).not.toBeInTheDocument();

      // Click toggle button
      const toggleButton = screen.getByText(/Show all quarters \(1\)/i);
      await user.click(toggleButton);

      // Now expired quarter should be visible
      expect(screen.getByText("Gas Stations")).toBeInTheDocument();
      expect(screen.getByText(/Hide all quarters \(1\)/i)).toBeInTheDocument();

      // Click again to hide
      await user.click(screen.getByText(/Hide all quarters \(1\)/i));
      expect(screen.queryByText("Gas Stations")).not.toBeInTheDocument();
    });

    it("hides toggle button when only active quarter exists", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.queryByText(/Show all quarters/i)).not.toBeInTheDocument();
    });
  });

  describe("Multiple quarters", () => {
    it("displays all quarters when expanded", async () => {
      const user = userEvent.setup();
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
          {
            quarter: "2025-Q3",
            category: "Gas Stations",
            status: "expired",
            startDate: "2025-07-01",
            endDate: "2025-09-30",
          },
          {
            quarter: "2026-Q1",
            category: "Future Category",
            status: "future",
            startDate: "2026-01-01",
            endDate: "2026-03-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      // Expand quarters
      await user.click(screen.getByText(/Show all quarters \(2\)/i));

      // Check that all non-active quarters are displayed
      expect(screen.getByText("Gas Stations")).toBeInTheDocument();
      expect(screen.getByText("Future Category")).toBeInTheDocument();
    });
  });

  describe("Source display", () => {
    it("displays Discover as source", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText("Discover")).toBeInTheDocument();
    });

    it("displays Chase Freedom as source", () => {
      const categoryResult: Category = {
        source: "Chase Freedom",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Department Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText("Chase Freedom")).toBeInTheDocument();
    });
  });

  describe("Timestamp display", () => {
    it("displays formatted update timestamp", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q4",
            category: "Amazon.com and Drug Stores",
            status: "active",
            startDate: "2025-10-01",
            endDate: "2025-12-31",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText(/Updated:/i)).toBeInTheDocument();
    });
  });

  describe("Conditional rendering with no active quarter", () => {
    it("displays first quarter info when no active quarter exists", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q3",
            category: "Gas Stations",
            status: "expired",
            startDate: "2025-07-01",
            endDate: "2025-09-30",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.getByText(/Quarter: 2025-Q3/i)).toBeInTheDocument();
    });

    it("does not display Active Quarter badge when no active quarter", () => {
      const categoryResult: Category = {
        source: "Discover",
        quarters: [
          {
            quarter: "2025-Q3",
            category: "Gas Stations",
            status: "expired",
            startDate: "2025-07-01",
            endDate: "2025-09-30",
          },
        ],
        timestamp: mockTimestamp,
        calendarUrl: mockCalendarUrl,
      };

      render(<CategoryCard categoryResult={categoryResult} />);

      expect(screen.queryByText("Active Quarter")).not.toBeInTheDocument();
    });
  });
});
