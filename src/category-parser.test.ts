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

    it('should fetch and parse real Chase categories', async () => {
      const result = await parser.parseChaseCategories();

      expect(result.source).toBe('Chase Freedom');
      expect(result.timestamp).toBeDefined();
      expect(typeof result.quarter).toBe('string');
      expect(typeof result.category).toBe('string');
      
      // Log the actual results for inspection
      console.log('Chase Result:', result);
      
      // The category should be either a real category or "No category found"
      expect(result.category.length).toBeGreaterThan(0);
    }, timeout);

    it('should fetch and parse all categories from real APIs', async () => {
      const results = await parser.parseAllCategories();

      expect(results).toHaveProperty('discover');
      expect(results).toHaveProperty('chase');
      expect(results).toHaveProperty('parseDate');

      // Both sources should return data
      expect(results.discover.source).toBe('Discover');
      expect(results.chase.source).toBe('Chase Freedom');
      
      // Log full results for inspection
      console.log('Full Integration Results:', JSON.stringify(results, null, 2));
    }, timeout);
  });

});