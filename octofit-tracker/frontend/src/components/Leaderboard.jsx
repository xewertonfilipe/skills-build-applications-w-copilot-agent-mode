import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/apiClient'

// Workflow endpoint hint: https://codespace-8000.app.github.dev/api/leaderboard/

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection('leaderboard', { signal: controller.signal })
        setEntries(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load leaderboard')
        }
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [])

  if (loading) {
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (!entries.length) {
    return <div className="alert alert-warning">No leaderboard entries found.</div>
  }

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
              <th>Week</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || `${entry.weekKey}-${entry.rank}`}>
                <td>{entry.rank ?? 'N/A'}</td>
                <td>{entry?.user?.name || 'Unknown'}</td>
                <td>{entry?.team?.name || 'No team'}</td>
                <td>{entry.points ?? 0}</td>
                <td>{entry.weekKey || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
