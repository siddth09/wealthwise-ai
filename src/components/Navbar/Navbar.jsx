import { useApp } from "../../context/AppContext";
import "./Navbar.css";

const navItems = [
  { id: "dashboard", icon: "📊", label: "Home" },
  { id: "spending", icon: "💳", label: "Spend" },
  { id: "chat", icon: "🤖", label: "Advisor", isAvatar: true },
  { id: "goals", icon: "🎯", label: "Goals" },
  { id: "portfolio", icon: "💼", label: "Portfolio" },
];

export default function Navbar() {
  const { state, dispatch } = useApp();

  return (
    <nav className="navbar" id="main-navbar">
      {navItems.map((item) => (
        <button
          key={item.id}
          id={`nav-${item.id}`}
          className={`nav-item ${item.isAvatar ? "nav-item-avatar" : ""} ${
            state.currentPage === item.id ? "active" : ""
          }`}
          onClick={() => dispatch({ type: "SET_PAGE", payload: item.id })}
          aria-label={`Navigate to ${item.label}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
