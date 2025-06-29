# Credit Card Category Tracker

A React website with automated parsing for quarterly cashback categories from Discover and Chase Freedom credit cards. Easily track and add upcoming categories to your Google Calendar.

## 🌟 Features

### Website (React App)
- 📱 **Responsive Design**: Clean, mobile-friendly interface
- 🗓️ **Google Calendar Integration**: One-click calendar event creation
- 🔗 **Source Links**: Direct links to official category pages
- 🎨 **Brand Colors**: Discover orange and Chase blue themes
- ⚡ **Fast Loading**: Built with Vite for optimal performance

### Parser (Node.js)
- 🏦 **Discover Categories**: Fetches from official JSON API
- 💳 **Chase Freedom Categories**: Intelligent HTML parsing
- 🤖 **Automated Updates**: Monthly GitHub Actions workflow
- 📊 **Quarter Detection**: Smart quarter inference from dates
- 🧪 **Comprehensive Testing**: Unit tests with Vitest

## 🚀 Quick Start

### Website Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Parser Development
```bash
# Run the parser
npm run parser

# Test the parser
npm test

# Format code
npm run format
```

## 📁 Project Structure

```
/
├── src/                    # React website
│   ├── components/         # UI components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types.ts           # TypeScript types
├── parser/                # Category parser
│   ├── category-parser.ts # Main parser logic
│   ├── package.json       # Parser dependencies
│   └── tsconfig.json      # Parser TypeScript config
├── data/                  # Generated category data
│   └── categories.json    # Latest parsed categories
└── public/                # Static assets
```

## 🔄 How It Works

### Data Flow
1. **Parser** → Fetches categories monthly via GitHub Actions
2. **GitHub** → Hosts `data/categories.json` as raw file
3. **Website** → Fetches live data from GitHub raw URL
4. **Calendar** → Generates Google Calendar template URLs

### Discover Integration
- **API Endpoint**: `https://card.discover.com/cardissuer/public/rewards/offer/v1/offer-categories`
- **Method**: JSON API request
- **Quarter Detection**: Finds next quarter based on start date

### Chase Freedom Integration  
- **URL**: `https://www.chase.com/personal/credit-cards/freedom/freedomfive`
- **Method**: HTML parsing with Cheerio
- **Quarter Detection**: Infers from "Activate by" deadline dates
- **Mapping**: 
  - March deadline → Q1 (Jan-Mar)
  - June deadline → Q2 (Apr-Jun)  
  - September deadline → Q3 (Jul-Sep)
  - December deadline → Q4 (Oct-Dec)

## 📅 Output Format

Current categories are output in simple quarter format:

```json
{
  "discover": {
    "source": "Discover",
    "quarter": "2025-Q3",
    "category": "Gas Stations & EV Charging, Public Transit, and Utilities",
    "timestamp": "2025-06-29T02:21:39.030Z"
  },
  "chase": {
    "source": "Chase Freedom",
    "quarter": "2025-Q3", 
    "category": "Gas Stations, EV Charging, Select Live Entertainment, Instacart",
    "timestamp": "2025-06-29T02:21:39.266Z"
  },
  "parseDate": "2025-06-29T02:21:39.266Z"
}
```

The website automatically converts quarter codes like `2025-Q3` to readable date ranges like "July 1, 2025 - September 30, 2025".

## 🤖 Automation

### GitHub Actions Workflows

**Parse Categories** (Monthly)
- **Schedule**: 1st of each month at 9 AM UTC
- **Manual**: Available via workflow dispatch
- **Process**: Runs parser → Updates `data/categories.json` → Commits changes
- **Artifacts**: Saves results for 90 days

**Deploy Website** (On Push)
- **Trigger**: Push to main branch
- **Process**: Builds React app → Deploys to GitHub Pages
- **URL**: `https://yourusername.github.io/credit-card-category-updater/`

## 🧪 Testing

```bash
# Test the parser
cd parser && npm test

# Test with real APIs (integration test)
npm run parser
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Google Calendar API** for event creation

### Backend Parser
- **Node.js** with TypeScript
- **tsx** for TypeScript execution
- **node-fetch** for HTTP requests
- **Cheerio** for HTML parsing
- **Vitest** for testing

### DevOps
- **GitHub Actions** for CI/CD
- **GitHub Pages** for hosting
- **Prettier** for code formatting

## 📖 Usage Examples

### Adding Categories to Calendar
1. Visit the website
2. View current quarterly categories
3. Click "Add to Calendar" for desired card
4. Google Calendar opens with pre-filled event
5. Click "Save" to add to your calendar

### Running Parser Locally
```bash
# Navigate to parser directory
cd parser

# Install parser dependencies
npm install

# Run the parser
npm start

# Check generated data
cat ../data/categories.json
```

### Programmatic Usage
```typescript
import CreditCardCategoryParser from './parser/category-parser';

const parser = new CreditCardCategoryParser();

// Parse both sources
const results = await parser.parseAllCategories();

// Parse individual sources
const discoverResults = await parser.parseDiscoverCategories();
const chaseResults = await parser.parseChaseCategories();
```

## 🔧 Configuration

### Environment Variables
No environment variables required - the parser works with public APIs and HTML scraping.

### GitHub Pages Setup
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The deploy workflow will handle the rest

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly (`npm test` and `npm run parser`)
5. Format code (`npm run format`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

ISC

## ⚠️ Disclaimer

This tool is not affiliated with Discover or Chase. Always verify categories and activation requirements directly with your credit card issuer. Category information is parsed from public websites and may not always be current or accurate.