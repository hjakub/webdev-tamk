import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ActiveTasksView from "./views/ActiveTasksView";
import ActivityHistoryView from "./views/ActivityHistoryView";
import AnalyticsView from "./views/AnalyticsView";
import NotFoundView from "./views/NotFoundView";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <h1 className="logo">TaskApp</h1>
          <nav className="nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Active Tasks
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Activity History
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Analytics
            </NavLink>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ActiveTasksView />} />
            <Route path="/history" element={<ActivityHistoryView />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </main>

        <footer>
          <i>Jakub Hrabec - Full Stack Web Development - TAMK 2026</i>
        </footer>
      </div>
    </BrowserRouter>
  );
}