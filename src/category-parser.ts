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
            const response = await fetch('https://card.discover.com/cardissuer/public/rewards/offer/v1/offer-categories', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            let results: string[] = [];
            let currentQuarter = 'Current Quarter';
            
            // Extract categories from JSON response
            if (data && data.quarters && Array.isArray(data.quarters)) {
                // Find the next quarter based on current date
                const now = new Date();
                const nextQuarterData = data.quarters.find((quarter: any) => {
                    if (quarter.quarterLabelStartDate) {
                        const startDate = new Date(quarter.quarterLabelStartDate);
                        return startDate > now;
                    }
                    return false;
                });

                if (nextQuarterData) {
                    results.push(nextQuarterData.title);
                    // infer quarter from the start and end dates
                    if (nextQuarterData.quarterLabelStartDate && nextQuarterData.quarterLabelEndDate) {
                        const startDate = nextQuarterData.quarterLabelStartDate.trim();
                        const endDate = nextQuarterData.quarterLabelEndDate.trim();
                        currentQuarter = `${startDate} - ${endDate}`;
                    }  else {
                        currentQuarter = 'Next Quarter';
                    }
                } 
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