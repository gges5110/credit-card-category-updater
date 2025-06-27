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
    chase: CategoryResult;
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

    private extractTextContent(html: string): string[] {
        // Simple regex-based text extraction (no DOM parsing)
        const textContent: string[] = [];
        
        // Remove script and style tags and their content
        const cleanHtml = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
        
        // Extract text between HTML tags
        const textMatches = cleanHtml.match(/>([^<]+)</g);
        if (textMatches) {
            textMatches.forEach(match => {
                const text = match.slice(1, -1).trim();
                if (text && text.length > 2) {
                    textContent.push(text);
                }
            });
        }
        
        return textContent;
    }

    private extractOfferNames(html: string): string[] {
        // Extract content from elements with class "offer-name"
        const offerNames: string[] = [];
        const offerNameRegex = /<[^>]*class="[^"]*offer-name[^"]*"[^>]*>(.*?)<\/[^>]*>/gi;
        let match;

        while ((match = offerNameRegex.exec(html)) !== null) {
            const text = match[1].replace(/<[^>]*>/g, '').trim();
            if (text && text.length > 2) {
                offerNames.push(text);
            }
        }

        return offerNames;
    }

    async parseDiscoverCategories(): Promise<CategoryResult> {
        try {
            const html = await this.fetchHtml('https://www.discover.com/credit-cards/cashback-bonus/cashback-calendar');
            const $ = cheerio.load(html);
            const textContent = this.extractTextContent(html);
            const offerNames = this.extractOfferNames(html);
            
            let results: string[] = [];
            let currentQuarter = 'Current Quarter';
            
            // Look for quarter information
            for (const text of textContent) {
                if (text.match(/Q[1-4]|Quarter|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i) && text.length < 100) {
                    currentQuarter = text;
                    break;
                }
            }
            
            // First try using extractOfferNames method
            if (offerNames.length > 0) {
                results = offerNames;
                console.log('Found offer names via regex:', offerNames);
            } else {
                // Fallback to Cheerio parsing
                $('.offer-name').each((_, el) => {
                    const text = $(el).text().trim();
                    if (text && text.length > 2) {
                        results.push(text);
                    }
                });
                
                // If still no results, look for other category indicators
                if (results.length === 0) {
                    $('*').each((_, el) => {
                        const text = $(el).text().trim();
                        
                        // Look for the complete category string
                        if (text.includes('Gas Stations & EV Charging, Public Transit, and Utilities')) {
                            results.push(text);
                            return false; // break
                        }
                        
                        // Look for variations
                        if (text.includes('Gas Stations') && text.includes('EV Charging') && text.includes('Public Transit') && text.includes('Utilities')) {
                            results.push(text);
                            return false; // break
                        }
                    });
                }
            }
            
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

    async parseChaseCategories(): Promise<CategoryResult> {
        try {
            const html = await this.fetchHtml('https://www.chase.com/personal/credit-cards/freedom/freedomfive');
            const textContent = this.extractTextContent(html);
            
            const results: string[] = [];
            let quarterInfo = 'Current Quarter';
            
            // Look for quarter/date information
            for (const text of textContent) {
                if (text.match(/July.*September|January.*March|April.*June|October.*December|Q[1-4]/i) && text.length < 100) {
                    quarterInfo = text;
                    break;
                }
            }
            
            // Look for category information
            const categoryKeywords = ['gas', 'grocery', 'restaurant', 'drugstore', 'pharmacy', 'streaming', 'entertainment', 'instacart', 'ev charging', 'electric vehicle'];
            
            for (const text of textContent) {
                const lowerText = text.toLowerCase();
                for (const keyword of categoryKeywords) {
                    if (lowerText.includes(keyword) && text.length < 50 && text.length > 2) {
                        results.push(text);
                        break;
                    }
                }
            }

            return {
                source: 'Chase Freedom',
                quarter: quarterInfo,
                category: results.length > 0 ? results.join(', ') : 'No category found',
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error parsing Chase categories:', (error as Error).message);
            return {
                source: 'Chase Freedom',
                quarter: '',
                category: '',
                error: (error as Error).message,
                timestamp: new Date().toISOString()
            };
        }
    }

    async parseAllCategories(): Promise<ParseResults> {
        console.log('Parsing quarterly credit card categories...');
        
        const [discoverData, chaseData] = await Promise.all([
            this.parseDiscoverCategories(),
            this.parseChaseCategories()
        ]);

        const results: ParseResults = {
            discover: discoverData,
            chase: chaseData,
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