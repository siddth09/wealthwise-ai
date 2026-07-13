import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { analyzeSpending, getSpendingAdvice } from "../../engine/spending";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart
} from "recharts";
import "./SpendingAnalysis.css";

const formatCurrency = (val) => {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13, 17, 50, 0.95)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: "0.8125rem"
    }}>
      <p style={{ color: "#f0f0ff", fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {formatCurrency(p.value)}</p>
      ))}
    </div>
  );
};

export default function SpendingAnalysis() {
  const { state } = useApp();
  const [tab, setTab] = useState("breakdown");
  const analysis = analyzeSpending(state.spending);
  const advice = getSpendingAdvice(state.spending);

  const totalSpent = state.spending.reduce((s, c) => s + c.amount, 0);
  const totalBudget = state.spending.reduce((s, c) => s + c.budget, 0);

  return (
    <div className="page" id="spending-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title">Spending Intelligence</h1>
        <p className="page-subtitle">AI-powered analysis of your expenses</p>
      </motion.div>

      {/* Total Spending Card */}
      <motion.div
        className="spending-total-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="spending-total-label">Total Spent This Month</div>
        <div className="spending-total-value">{formatCurrency(totalSpent)}</div>
        <div className="spending-total-label">
          Budget: {formatCurrency(totalBudget)} •{" "}
          <span style={{ color: totalSpent > totalBudget ? "var(--accent-red)" : "var(--accent-green)" }}>
            {totalSpent > totalBudget
              ? `₹${(totalSpent - totalBudget).toLocaleString()} over`
              : `₹${(totalBudget - totalSpent).toLocaleString()} remaining`}
          </span>
        </div>
        <div className="spending-budget-bar">
          <span className="spending-budget-text">0</span>
          <div className="progress-bar" style={{ flex: 1 }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%`,
                background: totalSpent > totalBudget
                  ? "linear-gradient(90deg, #fbbf24, #f87171)"
                  : "var(--accent-gradient)",
              }}
            />
          </div>
          <span className="spending-budget-text">{formatCurrency(totalBudget)}</span>
        </div>
      </motion.div>

      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button
          className={`tab-btn ${tab === "breakdown" ? "active" : ""}`}
          onClick={() => setTab("breakdown")}
        >
          Breakdown
        </button>
        <button
          className={`tab-btn ${tab === "trends" ? "active" : ""}`}
          onClick={() => setTab("trends")}
        >
          Trends
        </button>
        <button
          className={`tab-btn ${tab === "insights" ? "active" : ""}`}
          onClick={() => setTab("insights")}
        >
          Insights
        </button>
      </div>

      {tab === "breakdown" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Pie Chart */}
          <div className="glass-card-flat" style={{ marginBottom: "var(--space-lg)" }}>
            <h3 className="section-title" style={{ marginBottom: "var(--space-md)" }}>
              Category Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={state.spending}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="amount"
                  nameKey="category"
                >
                  {state.spending.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatCurrency(val)}
                  contentStyle={{
                    background: "rgba(13,17,50,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    fontSize: "0.8125rem",
                    color: "#f0f0ff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">By Category</h3>
            </div>
            <div className="category-list stagger-children">
              {state.spending
                .sort((a, b) => b.amount - a.amount)
                .map((cat) => {
                  const overBudget = cat.amount > cat.budget;
                  const pct = Math.min(100, (cat.amount / cat.budget) * 100);
                  return (
                    <div key={cat.category} className="category-item">
                      <div
                        className="category-icon-wrap"
                        style={{ background: `${cat.color}20` }}
                      >
                        {cat.icon}
                      </div>
                      <div className="category-details">
                        <div className="category-name">
                          {cat.category}
                          <span
                            className={`category-budget-status ${overBudget ? "over-budget" : "under-budget"}`}
                          >
                            {overBudget ? "Over" : "OK"}
                          </span>
                        </div>
                        <div className="category-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${pct}%`,
                                background: overBudget
                                  ? "linear-gradient(90deg, #fbbf24, #f87171)"
                                  : cat.color,
                              }}
                            />
                          </div>
                        </div>
                        <div className="category-amount-row" style={{ marginTop: 4 }}>
                          <span className="category-amount">
                            {formatCurrency(cat.amount)}
                          </span>
                          <span className="category-budget">
                            / {formatCurrency(cat.budget)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      )}

      {tab === "trends" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="glass-card-flat" style={{ marginBottom: "var(--space-lg)" }}>
            <h3 className="section-title" style={{ marginBottom: "var(--space-md)" }}>
              Income vs Spending
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={state.monthlySpending}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5a5e82" fontSize={11} />
                <YAxis stroke="#5a5e82" fontSize={11} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#34d399"
                  fill="url(#incomeGrad)"
                  strokeWidth={2}
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#f87171"
                  fill="url(#spendGrad)"
                  strokeWidth={2}
                  name="Spending"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card-flat">
            <h3 className="section-title" style={{ marginBottom: "var(--space-md)" }}>
              Monthly Savings
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={state.monthlySpending}>
                <XAxis dataKey="month" stroke="#5a5e82" fontSize={11} />
                <YAxis stroke="#5a5e82" fontSize={11} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="savings" fill="#667eea" radius={[4, 4, 0, 0]} name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 50-30-20 Rule */}
          <div className="glass-card-flat" style={{ marginTop: "var(--space-lg)" }}>
            <h3 className="section-title" style={{ marginBottom: "var(--space-sm)" }}>
              50-30-20 Rule Analysis
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
              {advice.advice}
            </p>
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              <div className="quick-stat-card" style={{ flex: 1 }}>
                <div className="quick-stat-value" style={{ color: "var(--accent-green)", fontSize: "1.25rem" }}>
                  {advice.essentialPercent}%
                </div>
                <div className="quick-stat-label">Essentials</div>
              </div>
              <div className="quick-stat-card" style={{ flex: 1 }}>
                <div className="quick-stat-value" style={{ color: "var(--accent-orange)", fontSize: "1.25rem" }}>
                  {advice.discretionaryPercent}%
                </div>
                <div className="quick-stat-label">Lifestyle</div>
              </div>
              <div className="quick-stat-card" style={{ flex: 1 }}>
                <div className="quick-stat-value" style={{ color: "var(--accent-primary)", fontSize: "1.25rem" }}>
                  {advice.investmentPercent}%
                </div>
                <div className="quick-stat-label">Invest</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "insights" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Behavioral Patterns */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">🧠 Behavioral Patterns</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {analysis.behavioralInsights.map((pattern, i) => (
                <div key={i} className="insight-card">
                  <div className="insight-icon">{pattern.icon}</div>
                  <div className="insight-content">
                    <h4>{pattern.pattern}</h4>
                    <p>{pattern.description}</p>
                    <span
                      className="insight-severity"
                      style={{
                        background:
                          pattern.severity === "positive"
                            ? "var(--accent-green-soft)"
                            : "var(--accent-yellow-soft)",
                        color:
                          pattern.severity === "positive"
                            ? "var(--accent-green)"
                            : "var(--accent-yellow)",
                      }}
                    >
                      {pattern.severity === "positive" ? "Positive" : "Attention"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Insights */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">💡 Smart Suggestions</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {analysis.insights.slice(0, 4).map((insight, i) => (
                <div key={i} className="insight-card">
                  <div className="insight-icon">{insight.icon}</div>
                  <div className="insight-content">
                    <h4>{insight.message}</h4>
                    <p>{insight.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Opportunity */}
          <div
            className="glass-card"
            style={{
              background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(34,211,238,0.1))",
              border: "1px solid rgba(52,211,153,0.2)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-sm)" }}>💰</div>
            <h3 style={{ marginBottom: "var(--space-xs)" }}>Savings Opportunity</h3>
            <div
              className="stat-value"
              style={{ color: "var(--accent-green)", fontSize: "1.75rem" }}
            >
              {formatCurrency(analysis.savingsOpportunity)}
            </div>
            <p style={{ fontSize: "0.8125rem", marginTop: "var(--space-sm)" }}>
              Can be saved monthly by optimizing over-budget categories
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
