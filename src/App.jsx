import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

function ActiveTasksView() {
  return (
    <div className="view-card">
      <h2>Active Tasks View and Timer</h2>
      <p>This page will feature list of users tasks with buttons start/pause/stop.
        This will be the main screen from which user is able to manage tasks, change their state,
        add new tasks and delete tasks.</p>
    </div>
  );
}

function ActivityHistoryView() {
  return (
    <div className="view-card">
      <h2>Activity History View</h2>
      <p>This page will contain timeline of past completed tasks, it will allow user to filter by range as well.</p>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="view-card">
      <h2>Analytics View</h2>
      <p>This page will contain deeper insights, metrics, maybe some graphs and charts.</p>
    </div>
  );
}

function NotFoundView() {
  return (
    <div className="view-card">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesnt exist.</p>
    </div>
  );
}

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
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Active Tasks
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Activity History
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
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
          <i>Jakub Hrabec - Full Stack Web Development 5G00DM05 - TAMK 2026</i>
        </footer>
      </div>
    </BrowserRouter>
  );
}