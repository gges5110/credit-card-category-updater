import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

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

    async parseChaseCategories(): Promise<CategoryResult> {
        try {
            const html = await this.fetchHtml('https://www.chase.com/personal/credit-cards/freedom/freedomfive');
            const $ = cheerio.load(html);
            
            let results: string[] = [];
            let currentQuarter = 'Current Quarter';
            
            // Look for quarter/date information by finding "Activate by" date
            let activateByDate: string | null = null;
            $('*').each((_, el) => {
                const text = $(el).text().trim();
                const activateByMatch = text.match(/Activate by\s+([^.]+)/i);
                if (activateByMatch) {
                    activateByDate = activateByMatch[1].trim() as string;
                    return false; // break
                }
            });
            
            // Infer quarter based on "Activate by" date
            if (activateByDate) {
                console.log('Found "Activate by" date:', activateByDate);
                
                // Parse the date and infer quarter
                const dateMatch = (activateByDate as string).match(/(\w+)\s+(\d{1,2}),?\s*(\d{4})?/);
                if (dateMatch) {
                    const month = dateMatch[1].toLowerCase();
                    const year = dateMatch[3] || new Date().getFullYear().toString();
                    
                    // Infer quarter based on activation deadline month
                    if (['march', 'mar'].includes(month)) {
                        currentQuarter = `January 01, ${year} - March 31, ${year}`;
                    } else if (['june', 'jun'].includes(month)) {
                        currentQuarter = `April 01, ${year} - June 30, ${year}`;
                    } else if (['september', 'sep'].includes(month)) {
                        currentQuarter = `July 01, ${year} - September 30, ${year}`;
                    } else if (['december', 'dec'].includes(month)) {
                        currentQuarter = `October 01, ${year} - December 31, ${year}`;
                    } else {
                        currentQuarter = `${activateByDate} (Activation Deadline)`;
                    }
                }
            }
            
            // Look for category information in various selectors
            const categorySelectors = [
                '[data-module-name*="category"]',
                '[class*="category"]',
                '[class*="bonus"]',
                '.quarterly-category',
                '.offer-category',
                'h2, h3, h4'
            ];
            
            for (const selector of categorySelectors) {
                $(selector).each((_, el) => {
                    const text = $(el).text().trim();
                    const lowerText = text.toLowerCase();
                    
                    // Look for Chase category keywords
                    const categoryKeywords = ['gas', 'grocery', 'restaurant', 'drugstore', 'pharmacy', 'streaming', 'entertainment', 'instacart', 'ev charging', 'electric vehicle'];
                    
                    for (const keyword of categoryKeywords) {
                        if (lowerText.includes(keyword) && text.length < 100 && text.length > 5) {
                            results.push(text);
                            break;
                        }
                    }
                });
                
                if (results.length > 0) break; // Found categories, stop searching
            }

            return {
                source: 'Chase Freedom',
                quarter: currentQuarter,
                category: results.length > 0 ? [...new Set(results)].join(', ') : 'No category found',
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

        // Write JSON file directly
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        const outputPath = path.join(dataDir, 'categories.json');
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        
        console.log(`Results written to ${outputPath}`);
        console.log('Parsing completed successfully!');

        return results;
    }
}

if (require.main === module) {
    const parser = new CreditCardCategoryParser();
    parser.parseAllCategories().catch(console.error);
}

export default CreditCardCategoryParser;