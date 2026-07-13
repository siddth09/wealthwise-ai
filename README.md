# 🤖 WealthWise AI — Digital Wealth Management

> AI-powered Avatar-based Digital Wealth Management application that delivers personalized and scalable wealth advisory services through an intuitive digital interface.

![WealthWise AI](https://img.shields.io/badge/WealthWise-AI%20Powered-667eea?style=for-the-badge&logo=robot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge)

---

## 🎯 Problem Statement

**Digital Wealth Management**: Wealth management and advisory services remain fragmented and largely inaccessible to a large number of customers. Absence of comprehensive, customer investment behaviour and spending habits limits the ability to provide timely, personalized, data-driven guidance.

## 💡 Our Solution

**WealthWise AI** is an AI-powered digital wealth advisor with an animated avatar that integrates into a bank's mobile application. It provides:

- **Personalized AI Avatar Advisor** — Interactive chat with smart, context-aware responses
- **Behavioral Finance Engine** — Detects spending patterns like impulse buying and retail therapy
- **Goal-Based Smart Planning** — AI creates personalized investment roadmaps
- **Real-time Portfolio Analytics** — Track investments with visual performance charts
- **Financial Health Score** — Gamified 0-100 score with actionable improvement suggestions

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Avatar Advisor** | Chat with an AI wealth advisor that speaks (Web Speech API) and provides personalized guidance |
| 📊 **Smart Dashboard** | Portfolio overview, asset allocation bar, market ticker, transactions |
| 💳 **Spending Intelligence** | Category breakdown, budget tracking, behavioral pattern detection |
| 🎯 **Goal Planner** | Set financial goals with milestone tracking and AI projections |
| 💼 **Portfolio Analytics** | Performance charts, allocation pie, holdings breakdown |
| 📈 **AI Recommendations** | Personalized stock/MF/FD suggestions based on risk profile |
| 💪 **Financial Health Score** | Weighted score across diversification, savings, goals, and more |
| 📱 **PWA Ready** | Installable on mobile devices for native-like experience |
| 🗣️ **Voice Responses** | AI advisor speaks recommendations using Web Speech API |
| 🌙 **Premium Dark Mode** | Glassmorphism design with smooth animations |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Mobile App (PWA)                     │
│  ┌──────────┐ ┌──────────┐ ┌───────────────────┐    │
│  │ Dashboard │ │ Avatar   │ │ Goal Planner      │    │
│  │ Module    │ │ Chat UI  │ │ Module            │    │
│  └────┬─────┘ └────┬─────┘ └────────┬──────────┘    │
│       │             │                │               │
│  ┌────▼─────────────▼────────────────▼──────────┐    │
│  │           Frontend Layer (Vite + React 19)    │    │
│  │  • Recharts for data visualization            │    │
│  │  • Framer Motion for animations               │    │
│  │  • Web Speech API for avatar voice            │    │
│  └──────────────────┬───────────────────────────┘    │
│                     │                                │
│  ┌──────────────────▼───────────────────────────┐    │
│  │           AI Engine (Client-side)              │    │
│  │  • Rule-based recommendation engine           │    │
│  │  • Behavioral spending analysis               │    │
│  │  • Risk scoring algorithms                    │    │
│  │  • Goal projection with SIP calculations      │    │
│  │  • Financial health scoring                   │    │
│  └──────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 8 |
| **Styling** | Vanilla CSS (Glassmorphism design system) |
| **Charts** | Recharts |
| **Animations** | Framer Motion + CSS animations |
| **Voice** | Web Speech API |
| **State** | React Context + useReducer |
| **PWA** | Service Worker + Web Manifest |
| **Deployment** | Vercel |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/wealthwise-ai.git
cd wealthwise-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser. Use mobile responsive mode (390px width) for the best experience.

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Main dashboard with portfolio summary
│   ├── Chat/               # AI avatar chat interface
│   ├── SpendingAnalysis/   # Spending breakdown & insights
│   ├── GoalPlanner/        # Financial goal tracking
│   ├── Portfolio/           # Portfolio analytics & recommendations
│   └── Navbar/             # Bottom navigation
├── engine/                 # AI simulation modules
│   ├── recommendations.js  # Chat responses & advice
│   ├── spending.js         # Spending analysis & patterns
│   ├── riskScore.js        # Risk profiling
│   ├── goalProjection.js   # Goal calculations
│   └── healthScore.js      # Financial health scoring
├── data/                   # Mock data
│   ├── portfolio.js        # Portfolio & holdings
│   ├── transactions.js     # Transactions & spending
│   ├── marketData.js       # Market indices & news
│   └── userProfile.js      # User profile & goals
├── context/
│   └── AppContext.jsx      # Global state management
├── index.css               # Design system
├── App.jsx                 # Root component
└── main.jsx                # Entry point
```

## 🔑 USP (Unique Selling Points)

1. **Avatar-Based Interaction** — Unlike text-only robo-advisors, WealthWise has an animated AI avatar that speaks and engages naturally
2. **Behavioral Finance Integration** — Detects psychological spending patterns (impulse buying, retail therapy) not just transactions
3. **Unified Platform** — Combines portfolio management, spending analysis, goal planning, and advisory in one seamless interface
4. **Gamified Health Score** — Makes financial wellness engaging through a scored, breakdown-driven approach
5. **Bank-Integration Ready** — Designed as a mobile-first PWA that can integrate into existing banking apps

## 📊 Performance

- **Build Size**: ~750KB (gzipped: ~222KB)
- **First Contentful Paint**: < 1.5s
- **Lighthouse Performance**: 90+
- **PWA Installable**: Yes

## 🔮 Future Development

- [ ] Integration with real banking APIs (Account Aggregator framework)
- [ ] LLM-based AI advisor (Google Gemini / GPT-4)
- [ ] Biometric authentication
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] AR/VR avatar experience
- [ ] Social investment features (community portfolios)
- [ ] Automated SIP execution
- [ ] Real-time stock screener

## 📄 License

MIT License

---

**Built with ❤️ for the Digital Wealth Management Hackathon**
