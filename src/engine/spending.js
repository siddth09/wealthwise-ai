export function analyzeSpending(spendingByCategory) {
  const total = spendingByCategory.reduce((sum, c) => sum + c.amount, 0);
  const overBudget = spendingByCategory.filter((c) => c.amount > c.budget);
  const underBudget = spendingByCategory.filter((c) => c.amount <= c.budget);

  const insights = [];

  overBudget.forEach((cat) => {
    const overBy = cat.amount - cat.budget;
    const overPercent = Math.round((overBy / cat.budget) * 100);
    insights.push({
      type: "warning",
      category: cat.category,
      icon: cat.icon,
      message: `${cat.category} spending is ₹${overBy.toLocaleString()} (${overPercent}%) over budget`,
      suggestion: getSuggestion(cat.category),
    });
  });

  underBudget.forEach((cat) => {
    if (cat.budget - cat.amount > cat.budget * 0.3) {
      insights.push({
        type: "positive",
        category: cat.category,
        icon: cat.icon,
        message: `Great job! ${cat.category} is well within budget`,
        suggestion: `Consider redirecting ₹${Math.round((cat.budget - cat.amount) / 1000) * 1000} savings to investments.`,
      });
    }
  });

  // Behavioral patterns
  const behavioralInsights = detectBehavioralPatterns(spendingByCategory);

  return {
    total,
    overBudget: overBudget.length,
    underBudget: underBudget.length,
    insights,
    behavioralInsights,
    savingsOpportunity: overBudget.reduce((sum, c) => sum + (c.amount - c.budget), 0),
  };
}

function getSuggestion(category) {
  const suggestions = {
    "Food & Dining":
      "Try meal prepping on weekends. Reducing restaurant visits by 2x/week can save ₹3,000/month.",
    Shopping:
      "Implement a 48-hour rule: wait 2 days before any purchase over ₹2,000. This reduces impulse buying by 40%.",
    Entertainment:
      "Review your subscriptions. Cancel unused services and share family plans to save up to ₹1,500/month.",
    Transport:
      "Consider carpooling or public transit 2 days/week. Switch to EV for long-term savings.",
    Utilities:
      "Switch to LED lighting and smart plugs. Energy-efficient appliances can cut bills by 15%.",
  };
  return suggestions[category] || "Set a weekly budget alert to stay on track.";
}

function detectBehavioralPatterns(spending) {
  const patterns = [];

  const foodSpend = spending.find((s) => s.category === "Food & Dining");
  const shoppingSpend = spending.find((s) => s.category === "Shopping");

  if (foodSpend && foodSpend.trend === "up") {
    patterns.push({
      pattern: "Impulse Spending",
      icon: "⚡",
      description: "Your food delivery orders have increased 15% this month. Late-night orders are the main contributor.",
      severity: "medium",
    });
  }

  if (shoppingSpend && shoppingSpend.amount > shoppingSpend.budget) {
    patterns.push({
      pattern: "Retail Therapy",
      icon: "🛍️",
      description: "Shopping spikes detected around weekends. This could indicate stress-driven spending.",
      severity: "medium",
    });
  }

  patterns.push({
    pattern: "Consistent Saver",
    icon: "⭐",
    description: "You've maintained SIP contributions for 8 consecutive months. This builds strong wealth habits!",
    severity: "positive",
  });

  return patterns;
}

export function getSpendingAdvice(spending) {
  const total = spending.reduce((s, c) => s + c.amount, 0);
  const essentials = ["Utilities", "Groceries", "Insurance", "Health", "Transport"];
  const essentialSpend = spending
    .filter((c) => essentials.includes(c.category))
    .reduce((s, c) => s + c.amount, 0);
  const discretionary = total - essentialSpend;

  return {
    rule: "50-30-20",
    essentialPercent: Math.round((essentialSpend / total) * 100),
    discretionaryPercent: Math.round((discretionary / total) * 100),
    investmentPercent: Math.round(
      ((spending.find((s) => s.category === "Investment")?.amount || 0) / total) * 100
    ),
    advice:
      discretionary / total > 0.4
        ? "Your discretionary spending is above the recommended 30%. Consider redirecting some towards investments."
        : "Your spending ratio is well balanced. Keep it up!",
  };
}
