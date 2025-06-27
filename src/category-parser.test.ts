import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreditCardCategoryParser from './category-parser';

describe('CreditCardCategoryParser', () => {
  let parser: CreditCardCategoryParser;

  beforeEach(() => {
    parser = new CreditCardCategoryParser();
  });

  describe('parseAllCategories', () => {
    it('should return results with correct structure', async () => {
      // Mock the fetchHtml method
      vi.spyOn(parser as any, 'fetchHtml')
        .mockResolvedValueOnce('<html><body>Mock Discover page</body></html>')
        .mockResolvedValueOnce('<html><body>Mock Chase page</body></html>');

      const results = await parser.parseAllCategories();

      expect(results).toHaveProperty('discover');
      expect(results).toHaveProperty('chase');
      expect(results).toHaveProperty('parseDate');
      
      expect(results.discover).toHaveProperty('source');
      expect(results.discover).toHaveProperty('quarter');
      expect(results.discover).toHaveProperty('category');
      expect(results.discover).toHaveProperty('timestamp');
      
      expect(results.chase).toHaveProperty('source');
      expect(results.chase).toHaveProperty('quarter');
      expect(results.chase).toHaveProperty('category');
      expect(results.chase).toHaveProperty('timestamp');
    });

    it('should have correct source names', async () => {
      vi.spyOn(parser as any, 'fetchHtml')
        .mockResolvedValueOnce('<html><body>Mock Discover page</body></html>')
        .mockResolvedValueOnce('<html><body>Mock Chase page</body></html>');

      const results = await parser.parseAllCategories();

      expect(results.discover.source).toBe('Discover');
      expect(results.chase.source).toBe('Chase Freedom');
    });

    it('should handle fetch errors gracefully', async () => {
      vi.spyOn(parser as any, 'fetchHtml')
        .mockRejectedValue(new Error('Network error'));

      const results = await parser.parseAllCategories();

      expect(results.discover.error).toBeDefined();
      expect(results.chase.error).toBeDefined();
    });
  });

  describe('parseDiscoverCategories', () => {
    it('should extract offer names when present', async () => {
      const mockHtml = `
        <html>
          <body>
            <div class="offer-name">Gas Stations & EV Charging</div>
            <div class="offer-name">Public Transit</div>
            <div class="offer-name">Utilities</div>
          </body>
        </html>
      `;

      vi.spyOn(parser as any, 'fetchHtml').mockResolvedValueOnce(mockHtml);

      const result = await parser.parseDiscoverCategories();

      expect(result.source).toBe('Discover');
      expect(result.category).toContain('Gas Stations & EV Charging');
    });

    it('should return "No category found" when no categories detected', async () => {
      vi.spyOn(parser as any, 'fetchHtml')
        .mockResolvedValueOnce('<html><body>No categories here</body></html>');

      const result = await parser.parseDiscoverCategories();

      expect(result.category).toBe('No category found');
    });
  });

  describe('parseChaseCategories', () => {
    it('should extract categories from text content', async () => {
      const mockHtml = `
        <html>
          <body>
            <div>Gas Stations</div>
            <div>Restaurant purchases</div>
            <div>EV Charging stations</div>
          </body>
        </html>
      `;

      vi.spyOn(parser as any, 'fetchHtml').mockResolvedValueOnce(mockHtml);

      const result = await parser.parseChaseCategories();

      expect(result.source).toBe('Chase Freedom');
      expect(result.category).toContain('Gas Stations');
    });
  });
});