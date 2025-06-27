import { describe, it, expect } from 'vitest';
import CreditCardCategoryParser from './category-parser';

describe('CreditCardCategoryParser - Integration Tests', () => {
  const parser = new CreditCardCategoryParser();

  // Set longer timeout for real HTTP requests
  const timeout = 30000;

  describe('Real API Integration', () => {
    it('should fetch and parse real Discover categories', async () => {
      const result = await parser.parseDiscoverCategories();

      expect(result.source).toBe('Discover');
      expect(result.timestamp).toBeDefined();
      expect(typeof result.quarter).toBe('string');
      expect(typeof result.category).toBe('string');
      
      // Log the actual results for inspection
      console.log('Discover Result:', result);
      
      // The category should be either a real category or "No category found"
      expect(result.category.length).toBeGreaterThan(0);
    }, timeout);

  });

});