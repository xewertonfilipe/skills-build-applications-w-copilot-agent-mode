import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './lib/apiClient'
import './App.css'

function App() {
  const apiBaseUrl = getApiBaseUrl()

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active fw-semibold' : ''}`

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h2 mb-2">Octofit Tracker</h1>
        <p className="text-secondary mb-0">API Base URL: {apiBaseUrl}</p>
      </header>

      <nav className="navbar navbar-expand-lg bg-light border rounded-3 mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fs-6">Navigation</span>
          <ul className="navbar-nav flex-row flex-wrap gap-2">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
