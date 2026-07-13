export function calculateRiskProfile(answers) {
  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const maxScore = answers.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let profile, description, color, allocation;

  if (percentage <= 30) {
    profile = "Conservative";
    color = "#34d399";
    description =
      "You prefer safety over returns. Capital preservation is your priority. Best suited for debt instruments and fixed income.";
    allocation = [
      { asset: "Fixed Deposits", pct: 40 },
      { asset: "Govt Bonds", pct: 25 },
      { asset: "Debt MF", pct: 20 },
      { asset: "Gold", pct: 10 },
      { asset: "Equity", pct: 5 },
    ];
  } else if (percentage <= 50) {
    profile = "Moderately Conservative";
    color = "#22d3ee";
    description =
      "You lean towards safety but are open to some growth. A balanced approach with a tilt towards debt works best.";
    allocation = [
      { asset: "Debt MF", pct: 30 },
      { asset: "Fixed Deposits", pct: 25 },
      { asset: "Balanced MF", pct: 20 },
      { asset: "Equity MF", pct: 15 },
      { asset: "Gold", pct: 10 },
    ];
  } else if (percentage <= 70) {
    profile = "Moderate";
    color = "#667eea";
    description =
      "You seek a balance between growth and safety. A diversified portfolio across asset classes suits you well.";
    allocation = [
      { asset: "Equity MF", pct: 35 },
      { asset: "Stocks", pct: 15 },
      { asset: "Debt MF", pct: 20 },
      { asset: "Gold", pct: 10 },
      { asset: "Fixed Deposits", pct: 15 },
      { asset: "NPS", pct: 5 },
    ];
  } else if (percentage <= 85) {
    profile = "Moderately Aggressive";
    color = "#fbbf24";
    description =
      "You're comfortable with volatility for higher returns. Equity-heavy portfolios align with your appetite.";
    allocation = [
      { asset: "Equity MF", pct: 40 },
      { asset: "Stocks", pct: 25 },
      { asset: "Small Cap MF", pct: 15 },
      { asset: "Gold", pct: 10 },
      { asset: "Debt MF", pct: 10 },
    ];
  } else {
    profile = "Aggressive";
    color = "#f87171";
    description =
      "You're a high-risk, high-reward investor. Maximum equity exposure with alternative investments suits your style.";
    allocation = [
      { asset: "Stocks", pct: 35 },
      { asset: "Small/Mid Cap MF", pct: 25 },
      { asset: "Equity MF", pct: 20 },
      { asset: "REITs/Alt", pct: 10 },
      { asset: "Gold", pct: 10 },
    ];
  }

  return { profile, description, color, percentage, allocation };
}
