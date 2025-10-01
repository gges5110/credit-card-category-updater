import { useState, useEffect } from "react";
import { ParseResults, WebsiteData } from "src/types";
import {
  generateCalendarUrl,
  getNextUpdateDate,
} from "src/utils/calendarUtils";

const DATA_URL =
  import.meta.env.DEV
    ? "/credit-card-category-updater/categories.json"
    : "https://raw.githubusercontent.com/gges5110/credit-card-category-updater/refs/heads/main/data/categories.json";

export function useCategories() {
  const [data, setData] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(DATA_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const rawData: ParseResults = await response.json();

      // Transform raw parser data into website format
      const websiteData: WebsiteData = {
        discover: {
          ...rawData.discover,
          calendarUrl: generateCalendarUrl(rawData.discover),
        },
        chase: {
          ...rawData.chase,
          calendarUrl: generateCalendarUrl(rawData.chase),
        },
        lastUpdated: rawData.parseDate,
        nextUpdate: getNextUpdateDate(),
        status: "success",
      };

      setData(websiteData);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setData({
        discover: {
          quarters: [],
          error: "Error loading categories",
          calendarUrl: "",
          source: "Discover",
          timestamp: "",
        },
        chase: {
          quarters: [],
          error: "Error loading categories",
          calendarUrl: "",
          source: "Chase Freedom",
          timestamp: "",
        },
        lastUpdated: new Date().toISOString(),
        nextUpdate: getNextUpdateDate(),
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const retry = () => {
    fetchCategories();
  };

  return {
    data,
    loading,
    error,
    retry,
  };
}
