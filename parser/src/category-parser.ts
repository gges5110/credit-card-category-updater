import * as fs from "fs";
import * as path from "path";
import { ChaseParser } from "./chase-parser";
import { DiscoverParser } from "./discover-parser";
import { ParseResults } from "./types";

class CreditCardCategoryParser {
  private chaseParser: ChaseParser;
  private discoverParser: DiscoverParser;

  constructor() {
    this.chaseParser = new ChaseParser();
    this.discoverParser = new DiscoverParser();
  }

  async parseAllCategories(): Promise<ParseResults> {
    console.log("Parsing quarterly credit card categories...");

    const [discoverData, chaseData] = await Promise.all([
      this.discoverParser.parseCategories(),
      this.chaseParser.parseCategories(),
    ]);

    const results: ParseResults = {
      discover: discoverData,
      chase: chaseData,
      parseDate: new Date().toISOString(),
    };

    // Write JSON file directly
    const dataDir = path.join(process.cwd(), "..", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, "categories.json");
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log(`Results written to ${outputPath}`);
    console.log("Parsing completed successfully!");

    return results;
  }
}

// Run the parser when this file is executed
const parser = new CreditCardCategoryParser();
parser.parseAllCategories().catch(console.error);

export default CreditCardCategoryParser;
