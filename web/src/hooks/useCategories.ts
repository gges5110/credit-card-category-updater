import { useState, useEffect } from 'react';
import { ParseResults, WebsiteData } from '../types';
import { generateCalendarUrl, getNextUpdateDate } from '../utils/calendarUtils';

const DATA_URL = 'https://raw.githubusercontent.com/gges5110/credit-card-category-updater/main/data/categories.json';

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
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const rawData: ParseResults = await response.json();
      
      // Transform raw parser data into website format
      const websiteData: WebsiteData = {
        currentQuarter: {
          period: determinePeriod(rawData.discover.quarter || rawData.chase.quarter),
          startDate: extractStartDate(rawData.discover.quarter || rawData.chase.quarter),
          endDate: extractEndDate(rawData.discover.quarter || rawData.chase.quarter),
          discover: {
            category: rawData.discover.category,
            calendarUrl: generateCalendarUrl(rawData.discover),
            source: rawData.discover.source
          },
          chase: {
            category: rawData.chase.category,
            calendarUrl: generateCalendarUrl(rawData.chase),
            source: rawData.chase.source
          }
        },
        lastUpdated: rawData.parseDate,
        nextUpdate: getNextUpdateDate(),
        status: 'success'
      };

      setData(websiteData);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setData({
        currentQuarter: {
          period: 'Unknown',
          startDate: '',
          endDate: '',
          discover: {
            category: 'Error loading categories',
            calendarUrl: '',
            source: 'Discover'
          },
          chase: {
            category: 'Error loading categories',
            calendarUrl: '',
            source: 'Chase Freedom'
          }
        },
        lastUpdated: new Date().toISOString(),
        nextUpdate: getNextUpdateDate(),
        status: 'error'
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
    retry
  };
}

function determinePeriod(quarter: string): string {
  if (quarter.includes('January') || quarter.includes('March')) {
    const year = quarter.match(/(\d{4})/)?.[1] || new Date().getFullYear();
    return `${year}-Q1`;
  } else if (quarter.includes('April') || quarter.includes('June')) {
    const year = quarter.match(/(\d{4})/)?.[1] || new Date().getFullYear();
    return `${year}-Q2`;
  } else if (quarter.includes('July') || quarter.includes('September')) {
    const year = quarter.match(/(\d{4})/)?.[1] || new Date().getFullYear();
    return `${year}-Q3`;
  } else if (quarter.includes('October') || quarter.includes('December')) {
    const year = quarter.match(/(\d{4})/)?.[1] || new Date().getFullYear();
    return `${year}-Q4`;
  }
  return 'Current Quarter';
}

function extractStartDate(quarter: string): string {
  const match = quarter.match(/(\w+)\s+(\d{1,2}),\s*(\d{4})/);
  if (match) {
    const [, month, day, year] = match;
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toISOString().split('T')[0];
  }
  return '';
}

function extractEndDate(quarter: string): string {
  const match = quarter.match(/-\s*(\w+)\s+(\d{1,2}),\s*(\d{4})/);
  if (match) {
    const [, month, day, year] = match;
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toISOString().split('T')[0];
  }
  return '';
}