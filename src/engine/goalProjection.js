export function calculateGoalProjection(goal) {
  const now = new Date();
  const target = new Date(goal.targetDate);
  const monthsRemaining = Math.max(
    1,
    (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth())
  );

  const remaining = goal.targetAmount - goal.currentAmount;
  const progressPercent = Math.round((goal.currentAmount / goal.targetAmount) * 100);

  // Simple projection with assumed 12% annual return
  const monthlyRate = 0.12 / 12;
  const projectedAmount =
    goal.currentAmount * Math.pow(1 + monthlyRate, monthsRemaining) +
    goal.monthlyContribution *
      ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate);

  const onTrack = projectedAmount >= goal.targetAmount;
  const shortfall = onTrack ? 0 : goal.targetAmount - projectedAmount;

  // Calculate required monthly SIP if not on track
  const requiredSIP = onTrack
    ? goal.monthlyContribution
    : Math.ceil(
        (goal.targetAmount - goal.currentAmount * Math.pow(1 + monthlyRate, monthsRemaining)) /
          ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate)
      );

  return {
    monthsRemaining,
    remaining,
    progressPercent,
    projectedAmount: Math.round(projectedAmount),
    onTrack,
    shortfall: Math.round(shortfall),
    requiredSIP,
    yearsRemaining: (monthsRemaining / 12).toFixed(1),
  };
}

export function getGoalAdvice(goal, projection) {
  if (projection.onTrack) {
    return {
      status: "On Track",
      color: "#34d399",
      icon: "✅",
      message: `Great news! Your ${goal.name} goal is on track. You're projected to reach ₹${(projection.projectedAmount / 100000).toFixed(1)}L by your target date.`,
      tip: "Consider increasing your SIP by 10% annually to account for inflation.",
    };
  } else {
    return {
      status: "Needs Attention",
      color: "#fbbf24",
      icon: "⚠️",
      message: `Your ${goal.name} has a projected shortfall of ₹${(projection.shortfall / 100000).toFixed(1)}L.`,
      tip: `Increase your monthly SIP to ₹${requiredSIPFormatted(projection.requiredSIP)} or extend your timeline by ${Math.ceil(projection.shortfall / (goal.monthlyContribution * 12))} years.`,
    };
  }
}

function requiredSIPFormatted(amount) {
  if (amount >= 100000) return (amount / 100000).toFixed(1) + "L";
  if (amount >= 1000) return (amount / 1000).toFixed(0) + "K";
  return amount.toLocaleString();
}

export function generateMilestones(goal) {
  const milestones = [
    { pct: 25, label: "25% Reached", icon: "🌱" },
    { pct: 50, label: "Halfway There!", icon: "⚡" },
    { pct: 75, label: "75% Complete", icon: "🔥" },
    { pct: 100, label: "Goal Achieved!", icon: "🎉" },
  ];

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  return milestones.map((m) => ({
    ...m,
    reached: progress >= m.pct,
    amount: Math.round(goal.targetAmount * (m.pct / 100)),
  }));
}
