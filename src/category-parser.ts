import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

interface CategoryResult {
    source: string;
    quarter: string;
    category: string;
    timestamp: string;
    error?: string;
}

interface ParseResults {
    discover: CategoryResult;
    parseDate: string;
}

class CreditCardCategoryParser {
    private async fetchHtml(url: string): Promise<string> {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.text();
    }

    async parseDiscoverCategories(): Promise<CategoryResult> {
        try {
            const html = await this.fetchHtml('https://www.discover.com/credit-cards/cashback-bonus/cashback-calendar');
            const $ = cheerio.load(html);
            
            let results: string[] = [];
            let currentQuarter = 'Current Quarter';

            // Fallback to Cheerio parsing
            $('.offer-name').each((_, el) => {
                const text = $(el).text().trim();
                if (text && text.length > 2) {
                    results.push(text);
                }
            });
            
            // Debug: log found elements
            console.log('Discover categories found:', results.length);
            if (results.length > 0) {
                console.log('First few results:', results.slice(0, 3));
            }

            return {
                source: 'Discover',
                quarter: currentQuarter,
                category: results.length > 0 ? results.join(', ') : 'No category found',
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error parsing Discover categories:', (error as Error).message);
            return {
                source: 'Discover',
                quarter: '',
                category: '',
                error: (error as Error).message,
                timestamp: new Date().toISOString()
            };
        }
    }


    async parseAllCategories(): Promise<ParseResults> {
        console.log('Parsing quarterly credit card categories...');

        const [discoverData] = await Promise.all([
            this.parseDiscoverCategories(),
        ]);

        const results: ParseResults = {
            discover: discoverData,
            parseDate: new Date().toISOString()
        };

        console.log('Results:', JSON.stringify(results, null, 2));

        return results;
    }
}

if (require.main === module) {
    const parser = new CreditCardCategoryParser();
    parser.parseAllCategories().catch(console.error);
}

export default CreditCardCategoryParser;