import { useApp } from "../../context/AppContext";
import { getAvatarResponse } from "../../engine/recommendations";
import { motion } from "framer-motion";
import "./Dashboard.css";

const formatCurrency = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val.toLocaleString("en-IN")}`;
};

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const { user, portfolio, marketIndices, marketNews, transactions } = state;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="page" id="dashboard-page">
      {/* Header */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="dashboard-greeting">
          <div className="user-avatar">{user.avatar}</div>
          <div className="greeting-text">
            <h2>Hi, {user.name.split(" ")[0]} 👋</h2>
            <p>Good evening</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" id="btn-notifications" aria-label="Notifications">
            🔔
            {state.notifications.some((n) => !n.read) && (
              <span className="notification-dot" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Portfolio Summary */}
      <motion.div
        className="portfolio-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        id="portfolio-summary-card"
      >
        <div className="portfolio-summary-content">
          <div className="portfolio-label">Total Portfolio Value</div>
          <div className="portfolio-value">{formatCurrency(portfolio.totalValue)}</div>
          <div className="portfolio-meta">
            <div className="portfolio-meta-item">
              <span className="portfolio-meta-label">Invested</span>
              <span className="portfolio-meta-value">
                {formatCurrency(portfolio.investedValue)}
              </span>
            </div>
            <div className="portfolio-meta-item">
              <span className="portfolio-meta-label">Returns</span>
              <span className="portfolio-meta-value positive">
                +{formatCurrency(portfolio.totalReturns)} ({portfolio.returnPercentage}%)
              </span>
            </div>
            <div className="portfolio-meta-item">
              <span className="portfolio-meta-label">Today</span>
              <span className="portfolio-meta-value positive">
                +{formatCurrency(portfolio.todayChange)}
              </span>
            </div>
          </div>

          {/* Allocation Bar */}
          <div className="allocation-bar">
            {portfolio.allocation.map((a) => (
              <div
                key={a.name}
                className="allocation-bar-segment"
                style={{ width: `${a.percentage}%`, background: a.color }}
              />
            ))}
          </div>
          <div className="allocation-mini">
            {portfolio.allocation.map((a) => (
              <div key={a.name} className="allocation-item">
                <span className="allocation-dot" style={{ background: a.color }} />
                {a.name} {a.percentage}%
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="quick-stats stagger-children"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="quick-stat-card" id="stat-health-score">
          <div className="quick-stat-icon">💪</div>
          <div className="quick-stat-value" style={{ color: "var(--accent-green)" }}>
            {user.financialHealthScore}
          </div>
          <div className="quick-stat-label">Health Score</div>
        </div>
        <div className="quick-stat-card" id="stat-xirr">
          <div className="quick-stat-icon">📈</div>
          <div className="quick-stat-value" style={{ color: "var(--accent-primary)" }}>
            {portfolio.xirr}%
          </div>
          <div className="quick-stat-label">XIRR</div>
        </div>
        <div className="quick-stat-card" id="stat-risk">
          <div className="quick-stat-icon">🎯</div>
          <div className="quick-stat-value" style={{ color: "var(--accent-cyan)" }}>
            {user.riskProfile}
          </div>
          <div className="quick-stat-label">Risk Profile</div>
        </div>
      </motion.div>

      {/* Market Ticker */}
      <motion.div
        className="market-ticker"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {marketIndices.map((idx) => (
          <div key={idx.name} className="ticker-item">
            <div className="ticker-name">{idx.name}</div>
            <div className="ticker-value">{idx.value.toLocaleString("en-IN")}</div>
            <div
              className="ticker-change"
              style={{ color: idx.changePercent >= 0 ? "var(--accent-green)" : "var(--accent-red)" }}
            >
              {idx.changePercent >= 0 ? "▲" : "▼"} {Math.abs(idx.changePercent)}%
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI Insight */}
      <motion.div
        className="ai-insight-banner"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => dispatch({ type: "SET_PAGE", payload: "chat" })}
        id="ai-insight-banner"
      >
        <div className="ai-insight-avatar">🤖</div>
        <div className="ai-insight-text">
          <p>{getAvatarResponse("greeting")}</p>
          <span>Tap to chat with your AI advisor →</span>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        className="section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-header">
          <h3 className="section-title">Recent Transactions</h3>
          <span
            className="section-link"
            onClick={() => dispatch({ type: "SET_PAGE", payload: "spending" })}
          >
            View All
          </span>
        </div>
        <div className="glass-card-flat">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="transaction-icon">{tx.icon}</div>
              <div className="transaction-info">
                <div className="transaction-name">{tx.name}</div>
                <div className="transaction-category">{tx.category}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  className={`transaction-amount ${tx.amount > 0 ? "income" : "expense"}`}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {formatCurrency(Math.abs(tx.amount))}
                </div>
                <div className="transaction-date">{tx.date}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Market News */}
      <motion.div
        className="section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="section-header">
          <h3 className="section-title">Market Pulse</h3>
        </div>
        <div className="glass-card-flat">
          {marketNews.map((news) => (
            <div key={news.id} className="news-item">
              <div className="news-header">
                <span className="news-tag">{news.tag}</span>
                <span className="news-time">{news.time}</span>
              </div>
              <div className="news-title">{news.title}</div>
              <div className="news-summary">{news.summary}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
