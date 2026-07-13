import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { recommendations } from "../../data/portfolio";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import "./Portfolio.css";

const formatCurrency = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val.toLocaleString("en-IN")}`;
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

export default function Portfolio() {
  const { state } = useApp();
  const { portfolio } = state;
  const [tab, setTab] = useState("overview");

  return (
    <div className="page" id="portfolio-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title">Portfolio</h1>
        <p className="page-subtitle">Track investments & AI recommendations</p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button className={`tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>
          Overview
        </button>
        <button className={`tab-btn ${tab === "holdings" ? "active" : ""}`} onClick={() => setTab("holdings")}>
          Holdings
        </button>
        <button className={`tab-btn ${tab === "recommend" ? "active" : ""}`} onClick={() => setTab("recommend")}>
          AI Picks
        </button>
      </div>

      {tab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Performance Chart */}
          <div className="glass-card-flat portfolio-performance-chart">
            <h3 className="section-title" style={{ marginBottom: "var(--space-md)" }}>
              Portfolio Growth
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={portfolio.monthlyPerformance}>
                <defs>
                  <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#667eea" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5a5e82" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#5a5e82" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#5a5e82" fontSize={11} />
                <YAxis stroke="#5a5e82" fontSize={11} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="invested" stroke="#5a5e82" fill="url(#investedGrad)" strokeWidth={1.5} strokeDasharray="4 4" name="Invested" />
                <Area type="monotone" dataKey="value" stroke="#667eea" fill="url(#valueGrad)" strokeWidth={2} name="Value" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation Pie */}
          <div className="glass-card-flat" style={{ marginBottom: "var(--space-lg)" }}>
            <h3 className="section-title" style={{ marginBottom: "var(--space-md)" }}>
              Asset Allocation
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <ResponsiveContainer width="45%" height={160}>
                <PieChart>
                  <Pie
                    data={portfolio.allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {portfolio.allocation.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {portfolio.allocation.map((a) => (
                  <div key={a.name} className="allocation-detail-item">
                    <div className="allocation-color-bar" style={{ background: a.color }} />
                    <div className="allocation-detail-info">
                      <div className="allocation-detail-name">{a.name}</div>
                      <div className="allocation-detail-pct">{a.percentage}%</div>
                    </div>
                    <div className="allocation-detail-value">
                      <div className="allocation-detail-amount">{formatCurrency(a.value)}</div>
                      <div className="allocation-detail-returns" style={{ color: "var(--accent-green)" }}>
                        +{a.returns}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)" }}>
            <div className="glass-card-flat" style={{ textAlign: "center", padding: "var(--space-md)" }}>
              <div className="stat-value" style={{ color: "var(--accent-green)" }}>
                {portfolio.returnPercentage}%
              </div>
              <div className="stat-label">Total Returns</div>
            </div>
            <div className="glass-card-flat" style={{ textAlign: "center", padding: "var(--space-md)" }}>
              <div className="stat-value" style={{ color: "var(--accent-primary)" }}>
                {portfolio.xirr}%
              </div>
              <div className="stat-label">XIRR</div>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "holdings" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="glass-card-flat">
            {portfolio.topHoldings.map((h, i) => (
              <div key={h.name} className="holding-card">
                <div className="holding-rank">{i + 1}</div>
                <div className="holding-info">
                  <div className="holding-name">{h.name}</div>
                  <div className="holding-type">{h.type} • {h.units} units</div>
                </div>
                <div className="holding-values">
                  <div className="holding-value">{formatCurrency(h.value)}</div>
                  <div className="holding-returns" style={{ color: h.returns >= 0 ? "var(--accent-green)" : "var(--accent-red)" }}>
                    {h.returns >= 0 ? "+" : ""}{h.returns}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {tab === "recommend" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="ai-insight-banner" style={{ marginBottom: "var(--space-lg)", cursor: "default" }}>
            <div className="ai-insight-avatar">🤖</div>
            <div className="ai-insight-text">
              <p>Based on your <strong>Moderate</strong> risk profile and current allocation, here are my personalized picks for you.</p>
            </div>
          </div>

          {recommendations.map((rec) => (
            <div key={rec.id} className="rec-card">
              <div className="rec-header">
                <div>
                  <div className="rec-name">{rec.name}</div>
                  <div className="stars">{"★".repeat(rec.rating)}{"☆".repeat(5 - rec.rating)}</div>
                </div>
                <span className="rec-tag">{rec.tag}</span>
              </div>
              <div className="rec-meta">
                <span>{rec.type}</span>
                <span>•</span>
                <span>{rec.category}</span>
                <span>•</span>
                <span>Risk: {rec.risk}</span>
              </div>
              <div className="rec-returns">
                <div className="rec-return-item">
                  <div className="rec-return-value">{rec.returns1y}%</div>
                  <div className="rec-return-label">1Y Return</div>
                </div>
                <div className="rec-return-item">
                  <div className="rec-return-value">{rec.returns3y}%</div>
                  <div className="rec-return-label">3Y Return</div>
                </div>
                <div className="rec-return-item">
                  <div className="rec-return-value">{rec.returns5y}%</div>
                  <div className="rec-return-label">5Y Return</div>
                </div>
              </div>
              <div className="rec-reason">{rec.reason}</div>
              <div className="rec-actions">
                <button className="btn btn-primary btn-sm">Invest Now</button>
                <button className="btn btn-secondary btn-sm">Add to SIP</button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
