const avatarResponses = {
  greeting: [
    "Good evening, Rahul! 👋 Your portfolio is up 0.51% today. Markets closed on a positive note.",
    "Hello Rahul! 🌟 I've been analyzing your spending patterns. I have some smart saving tips for you!",
    "Welcome back, Rahul! 📊 I noticed your SIP investments hit 8 months of consistency. That's impressive!",
  ],
  portfolio: [
    "Your portfolio has generated ₹3.75L in returns — a solid 17.86% return! 📈 Your equity allocation is performing particularly well.",
    "I'd recommend increasing your gold allocation by 3-5% as a hedge. Global uncertainty is pushing gold prices higher.",
    "Your XIRR of 14.2% is beating the average FD rate by 2x. Staying invested is paying off!",
  ],
  spending: [
    "I notice your food & dining expenses are 23% over budget this month. 🍔 Weekend restaurant visits are the main contributor.",
    "Great news! Your overall savings rate is 53% — well above the recommended 30%. You're building wealth efficiently! 💰",
    "Here's a pattern I detected: your shopping spends spike on Saturday evenings. Setting a weekend spending limit could help.",
  ],
  goals: [
    "Your Dream Home goal is 37% complete with ₹18.5L saved. At this pace, you'll reach the target 3 months early! 🏠",
    "The Emergency Fund is almost ready — just ₹80K more to go. I suggest a 3-month top-up plan.",
    "For your retirement corpus, I recommend switching ₹5,000 from FD to equity SIP for better long-term growth.",
  ],
  market: [
    "NIFTY 50 closed at 24,850 today, up 0.51%. IT sector led the rally on strong Q2 earnings.",
    "RBI kept the repo rate unchanged. This is neutral for your debt investments but positive for equity markets.",
    "Gold is at an all-time high. Your 11% gold allocation is providing a nice cushion against equity volatility.",
  ],
  tips: [
    "💡 Quick tip: Your FD is maturing next month. Consider reinvesting in a Balanced Advantage Fund for better tax-adjusted returns.",
    "💡 Did you know? Increasing SIP by just 10% annually can double your corpus in 15 years due to compounding.",
    "💡 Tax-saving season is approaching. ₹1.5L in ELSS investments can save you ₹46,800 in taxes under Section 80C.",
  ],
};

export function getAvatarResponse(category = "greeting") {
  const responses = avatarResponses[category] || avatarResponses.greeting;
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getChatResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("portfolio") || msg.includes("investment") || msg.includes("return")) {
    return {
      text: getAvatarResponse("portfolio"),
      suggestions: ["Show my top holdings", "Rebalancing advice", "Tax-saving options"],
    };
  }

  if (msg.includes("spend") || msg.includes("budget") || msg.includes("expense")) {
    return {
      text: getAvatarResponse("spending"),
      suggestions: ["Show spending breakdown", "Set budget alerts", "Reduce expenses"],
    };
  }

  if (msg.includes("goal") || msg.includes("plan") || msg.includes("save") || msg.includes("target")) {
    return {
      text: getAvatarResponse("goals"),
      suggestions: ["Review all goals", "Create new goal", "Optimize SIPs"],
    };
  }

  if (msg.includes("market") || msg.includes("nifty") || msg.includes("sensex") || msg.includes("stock")) {
    return {
      text: getAvatarResponse("market"),
      suggestions: ["Trending stocks", "Sector analysis", "Buy recommendations"],
    };
  }

  if (msg.includes("tip") || msg.includes("advice") || msg.includes("suggest") || msg.includes("recommend")) {
    return {
      text: getAvatarResponse("tips"),
      suggestions: ["More tips", "Portfolio review", "Risk assessment"],
    };
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return {
      text: getAvatarResponse("greeting"),
      suggestions: ["Portfolio overview", "Spending analysis", "Market update"],
    };
  }

  if (msg.includes("risk") || msg.includes("profile")) {
    return {
      text: "Based on your responses, you have a **Moderate** risk profile with a score of 65/100. This means a balanced mix of equity (50-60%) and debt (40-50%) is ideal for you. Would you like to retake the assessment?",
      suggestions: ["Retake assessment", "Adjust portfolio", "View risk breakdown"],
    };
  }

  if (msg.includes("tax") || msg.includes("80c") || msg.includes("elss")) {
    return {
      text: "💡 You can save up to ₹46,800 in taxes! Here's my plan: ₹1.5L in ELSS funds (Section 80C), ₹50K in NPS (Section 80CCD). Your current tax-saving investments: ₹85,000. Gap: ₹1,15,000.",
      suggestions: ["Top ELSS funds", "NPS benefits", "Tax harvesting"],
    };
  }

  return {
    text: "I'd be happy to help with that! I can assist you with portfolio analysis, spending insights, goal planning, market updates, and personalized investment recommendations. What would you like to explore? 🤔",
    suggestions: ["Portfolio overview", "Spending analysis", "Goal planning", "Market pulse"],
  };
}

export const avatarMoods = {
  happy: { emoji: "😊", gradient: "linear-gradient(135deg, #34d399, #22d3ee)" },
  neutral: { emoji: "🤔", gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
  alert: { emoji: "⚠️", gradient: "linear-gradient(135deg, #fbbf24, #fb923c)" },
  excited: { emoji: "🚀", gradient: "linear-gradient(135deg, #667eea, #34d399)" },
};
