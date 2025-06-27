# Credit Card Category Updater

A TypeScript application that parses quarterly cashback categories from Discover and Chase Freedom credit cards.

## Features

- 🏦 **Discover Categories**: Fetches quarterly categories from Discover's API
- 💳 **Chase Freedom Categories**: Parses quarterly categories from Chase website
- 🔄 **Automated Parsing**: GitHub Actions workflow runs monthly
- 🧪 **Comprehensive Testing**: Unit and integration tests with Vitest
- 🏗️ **Modern Tooling**: Built with TypeScript, Vite, and Cheerio

## Quick Start

```bash
# Install dependencies
npm install

# Run the parser
npm start

# Run tests
npm test

# Run integration tests (uses real APIs)
npm run test:integration
```

## Usage

### Local Development

```bash
# Development mode with TypeScript
npm run dev

# Build for production
npm run build

# Start built version
npm start
```

### Programmatic Usage

```typescript
import CreditCardCategoryParser from './src/category-parser';

const parser = new CreditCardCategoryParser();

// Parse both Discover and Chase
const results = await parser.parseAllCategories();
console.log(results);

// Parse individual sources
const discoverResults = await parser.parseDiscoverCategories();
const chaseResults = await parser.parseChaseCategories();
```

## Output Format

The parser returns data in this structure:

```json
{
  "discover": {
    "source": "Discover",
    "quarter": "July 01, 2025 - September 30, 2025",
    "category": "Gas Stations & EV Charging, Public Transit, and Utilities",
    "timestamp": "2025-06-27T20:54:06.221Z"
  },
  "chase": {
    "source": "Chase Freedom",
    "quarter": "July 01, 2025 - September 30, 2025", 
    "category": "Gas Stations, EV Charging, Select Live Entertainment, Instacart",
    "timestamp": "2025-06-27T20:54:06.172Z"
  },
  "parseDate": "2025-06-27T20:54:06.221Z"
}
```

## GitHub Actions

The repository includes a GitHub Actions workflow that:

- 🕘 **Runs monthly** on the 1st at 9 AM UTC
- 🔧 **Manual triggers** available via workflow_dispatch
- 📊 **Creates job summaries** with parsed results
- 💾 **Saves artifacts** for 90 days
- ⚡ **Fast execution** with dependency caching

### Manual Trigger

1. Go to the Actions tab in your GitHub repository
2. Select "Parse Credit Card Categories" workflow
3. Click "Run workflow"
4. View results in the job summary and artifacts

## How It Works

### Discover
- Uses Discover's JSON API endpoint: `https://card.discover.com/cardissuer/public/rewards/offer/v1/offer-categories`
- Finds the next upcoming quarter based on current date
- Extracts quarter dates and category titles from API response

### Chase Freedom
- Scrapes HTML from: `https://www.chase.com/personal/credit-cards/freedom/freedomfive`
- Searches for "Activate by" date to infer quarter
- Uses Cheerio to parse DOM and extract category information
- Maps activation deadlines to quarters:
  - March deadline → Q1 (Jan-Mar)
  - June deadline → Q2 (Apr-Jun)
  - September deadline → Q3 (Jul-Sep)
  - December deadline → Q4 (Oct-Dec)

## Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests (real API calls)
npm run test:integration
```

## Dependencies

- **Runtime**: `node-fetch`, `cheerio`
- **Development**: `typescript`, `vite`, `vitest`
- **Types**: `@types/node`, `@types/node-fetch`

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request