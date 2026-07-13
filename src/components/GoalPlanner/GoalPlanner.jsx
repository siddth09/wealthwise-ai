import { useApp } from "../../context/AppContext";
import { calculateGoalProjection, generateMilestones } from "../../engine/goalProjection";
import { motion } from "framer-motion";
import "./GoalPlanner.css";

const formatCurrency = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val.toLocaleString("en-IN")}`;
};

export default function GoalPlanner() {
  const { state } = useApp();
  const goals = state.user.goals;

  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
  const totalCurrent = goals.reduce((s, g) => s + g.currentAmount, 0);
  const overallProgress = Math.round((totalCurrent / totalTarget) * 100);

  return (
    <div className="page" id="goals-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title">Goal Planner</h1>
        <p className="page-subtitle">AI-powered goal tracking & projections</p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        className="glass-card"
        style={{ marginBottom: "var(--space-lg)", textAlign: "center" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="circular-progress" style={{ marginBottom: "var(--space-md)" }}>
          <svg width="120" height="120">
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="url(#goalGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${overallProgress * 3.27} ${327 - overallProgress * 3.27}`}
            />
            <defs>
              <linearGradient id="goalGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <span className="circular-progress-value">{overallProgress}%</span>
        </div>
        <h3>Overall Goal Progress</h3>
        <p style={{ fontSize: "0.8125rem" }}>
          {formatCurrency(totalCurrent)} of {formatCurrency(totalTarget)} achieved
        </p>
      </motion.div>

      {/* Goal Cards */}
      <div className="stagger-children">
        {goals.map((goal) => {
          const projection = calculateGoalProjection(goal);
          const milestones = generateMilestones(goal);

          return (
            <motion.div
              key={goal.id}
              className="goal-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="goal-header">
                <div
                  className="goal-icon-wrap"
                  style={{
                    background: projection.onTrack
                      ? "var(--accent-green-soft)"
                      : "var(--accent-yellow-soft)",
                  }}
                >
                  {goal.icon}
                </div>
                <div>
                  <div className="goal-title">{goal.name}</div>
                  <div className="goal-target-date">
                    Target: {new Date(goal.targetDate).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <span
                  className="goal-status-badge"
                  style={{
                    background: projection.onTrack
                      ? "var(--accent-green-soft)"
                      : "var(--accent-yellow-soft)",
                    color: projection.onTrack
                      ? "var(--accent-green)"
                      : "var(--accent-yellow)",
                  }}
                >
                  {projection.onTrack ? "✅ On Track" : "⚠️ Review"}
                </span>
              </div>

              <div className="goal-amounts">
                <span className="goal-current">
                  {formatCurrency(goal.currentAmount)}
                </span>
                <span className="goal-target">
                  of {formatCurrency(goal.targetAmount)}
                </span>
              </div>

              <div className="goal-progress-container">
                <div className="progress-bar" style={{ height: 8 }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${projection.progressPercent}%`,
                      background: projection.onTrack
                        ? "linear-gradient(90deg, #667eea, #34d399)"
                        : "linear-gradient(90deg, #fbbf24, #fb923c)",
                    }}
                  />
                </div>
                <div className="goal-progress-label">
                  <span className="goal-progress-pct">
                    {projection.progressPercent}% complete
                  </span>
                  <span className="goal-progress-remaining">
                    {projection.yearsRemaining} yrs left
                  </span>
                </div>
              </div>

              {/* Milestones */}
              <div className="milestone-track">
                {milestones.map((m) => (
                  <div key={m.pct} className="milestone">
                    <div className={`milestone-dot ${m.reached ? "reached" : ""}`}>
                      {m.reached ? m.icon : `${m.pct}%`}
                    </div>
                    <span className={`milestone-label ${m.reached ? "reached" : ""}`}>
                      {formatCurrency(m.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="goal-stats">
                <div className="goal-stat">
                  <div className="goal-stat-value">
                    {formatCurrency(goal.monthlyContribution)}
                  </div>
                  <div className="goal-stat-label">Monthly SIP</div>
                </div>
                <div className="goal-stat">
                  <div className="goal-stat-value">
                    {formatCurrency(projection.projectedAmount)}
                  </div>
                  <div className="goal-stat-label">Projected</div>
                </div>
                <div className="goal-stat">
                  <div
                    className="goal-stat-value"
                    style={{
                      color: projection.onTrack
                        ? "var(--accent-green)"
                        : "var(--accent-yellow)",
                    }}
                  >
                    {projection.onTrack
                      ? `+${formatCurrency(projection.projectedAmount - goal.targetAmount)}`
                      : `-${formatCurrency(projection.shortfall)}`}
                  </div>
                  <div className="goal-stat-label">
                    {projection.onTrack ? "Surplus" : "Shortfall"}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Goal */}
      <button className="add-goal-btn" id="btn-add-goal">
        <span style={{ fontSize: "1.25rem" }}>➕</span>
        Create New Goal
      </button>
    </div>
  );
}
