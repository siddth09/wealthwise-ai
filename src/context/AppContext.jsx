import { createContext, useContext, useReducer } from "react";
import { userProfile } from "../data/userProfile";
import { portfolio } from "../data/portfolio";
import { spendingByCategory, monthlySpending, transactions } from "../data/transactions";
import { marketIndices, marketNews } from "../data/marketData";

const AppContext = createContext(null);

const initialState = {
  user: userProfile,
  portfolio,
  spending: spendingByCategory,
  monthlySpending,
  transactions,
  marketIndices,
  marketNews,
  currentPage: "dashboard",
  chatMessages: [],
  riskAnswers: [],
  riskCompleted: false,
  notifications: [
    { id: 1, text: "SIP of ₹10,000 deducted for Axis Bluechip Fund", time: "2h ago", read: false },
    { id: 2, text: "Your portfolio crossed ₹24.5L milestone! 🎉", time: "1d ago", read: false },
    { id: 3, text: "NIFTY 50 up 2.3% this week. Market outlook positive.", time: "2d ago", read: true },
  ],
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "ADD_CHAT_MESSAGE":
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case "SET_RISK_ANSWER":
      const newAnswers = [...state.riskAnswers];
      newAnswers[action.payload.index] = action.payload.score;
      return { ...state, riskAnswers: newAnswers };
    case "COMPLETE_RISK":
      return { ...state, riskCompleted: true };
    case "RESET_RISK":
      return { ...state, riskAnswers: [], riskCompleted: false };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
