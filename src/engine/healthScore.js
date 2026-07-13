export function calculateHealthScore(portfolio, spending, goals, riskScore) {
  const weights = {
    diversification: 20,
    savingsRate: 25,
    goalProgress: 20,
    debtManagement: 15,
    emergencyFund: 10,
    investmentConsistency: 10,
  };

  // Diversification score (0-100)
  const assetTypes = portfolio.allocation.length;
  const diversificationScore = Math.min(100, assetTypes * 16);

  // Savings rate score
  const totalIncome = spending.reduce((sum, m) => sum + m.income, 0) / spending.length;
  const totalSpending = spending.reduce((sum, m) => sum + m.spending, 0) / spending.length;
  const savingsRate = ((totalIncome - totalSpending) / totalIncome) * 100;
  const savingsScore = Math.min(100, savingsRate * 2.5);

  // Goal progress score
  const goalProgressAvg =
    goals.reduce((sum, g) => sum + (g.currentAmount / g.targetAmount) * 100, 0) / goals.length;
  const goalScore = Math.min(100, goalProgressAvg * 1.5);

  // Debt management (simulated - no debt)
  const debtScore = 85;

  // Emergency fund (check if emergency goal is on track)
  const emergencyGoal = goals.find((g) => g.name.includes("Emergency"));
  const emergencyScore = emergencyGoal
    ? Math.min(100, (emergencyGoal.currentAmount / emergencyGoal.targetAmount) * 100)
    : 50;

  // Investment consistency
  const investmentConsistency = 80;

  const totalScore = Math.round(
    (diversificationScore * weights.diversification +
      savingsScore * weights.savingsRate +
      goalScore * weights.goalProgress +
      debtScore * weights.debtManagement +
      emergencyScore * weights.emergencyFund +
      investmentConsistency * weights.investmentConsistency) /
      100
  );

  const breakdown = [
    { label: "Diversification", score: diversificationScore, weight: weights.diversification, icon: "🎯" },
    { label: "Savings Rate", score: Math.round(savingsScore), weight: weights.savingsRate, icon: "💰" },
    { label: "Goal Progress", score: Math.round(goalScore), weight: weights.goalProgress, icon: "🎯" },
    { label: "Debt Management", score: debtScore, weight: weights.debtManagement, icon: "📊" },
    { label: "Emergency Fund", score: Math.round(emergencyScore), weight: weights.emergencyFund, icon: "🛡️" },
    { label: "Investment Consistency", score: investmentConsistency, weight: weights.investmentConsistency, icon: "📈" },
  ];

  let grade, color, message;
  if (totalScore >= 80) {
    grade = "Excellent";
    color = "#34d399";
    message = "Your financial health is outstanding! Keep up the great work.";
  } else if (totalScore >= 65) {
    grade = "Good";
    color = "#667eea";
    message = "You're on a solid financial path. A few improvements can make it even better.";
  } else if (totalScore >= 50) {
    grade = "Fair";
    color = "#fbbf24";
    message = "There's room for improvement. Let's work on your savings and goal planning.";
  } else {
    grade = "Needs Attention";
    color = "#f87171";
    message = "Your financial health needs attention. Let me help you build a recovery plan.";
  }

  return { totalScore, breakdown, grade, color, message };
}

export function getHealthInsights(score) {
  const insights = [];

  if (score < 80) {
    insights.push({
      title: "Increase SIP Amount",
      description: "Increasing your monthly SIP by ₹5,000 can improve your goal progress by 15%.",
      impact: "High",
      icon: "📈",
    });
  }

  insights.push({
    title: "Reduce Dining Expenses",
    description: "You're spending 23% above your food budget. Consider meal prepping twice a week.",
    impact: "Medium",
    icon: "🍽️",
  });

  insights.push({
    title: "Tax-Loss Harvesting Opportunity",
    description: "Switch underperforming funds to save ~₹12,000 in taxes this year.",
    impact: "High",
    icon: "💰",
  });

  insights.push({
    title: "Emergency Fund Almost Ready",
    description: "You're at 87% of your emergency fund goal. Just 2 more months!",
    impact: "Low",
    icon: "🛡️",
  });

  return insights;
}
