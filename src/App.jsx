import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Chat from "./components/Chat/Chat";
import SpendingAnalysis from "./components/SpendingAnalysis/SpendingAnalysis";
import GoalPlanner from "./components/GoalPlanner/GoalPlanner";
import Portfolio from "./components/Portfolio/Portfolio";
import { AnimatePresence, motion } from "framer-motion";

function AppContent() {
  const { state } = useApp();

  const pages = {
    dashboard: Dashboard,
    chat: Chat,
    spending: SpendingAnalysis,
    goals: GoalPlanner,
    portfolio: Portfolio,
  };

  const CurrentPage = pages[state.currentPage] || Dashboard;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentPage}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <CurrentPage />
        </motion.div>
      </AnimatePresence>
      <Navbar />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
