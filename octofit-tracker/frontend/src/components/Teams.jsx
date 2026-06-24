import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/apiClient'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadTeams = async () => {
      try {
        const data = await fetchCollection('teams', { signal: controller.signal })
        setTeams(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load teams')
        }
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
    return () => controller.abort()
  }, [])

  if (loading) {
    return <p className="text-secondary">Loading teams...</p>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (!teams.length) {
    return <div className="alert alert-warning">No teams found.</div>
  }

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-12 col-md-6" key={team._id || team.name}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5 card-title">{team.name || 'Unnamed Team'}</h3>
                <p className="mb-1 text-secondary">City: {team.city || 'N/A'}</p>
                <p className="mb-2 text-secondary">
                  Weekly Goal: {team.weeklyGoalMinutes ?? 'N/A'} minutes
                </p>
                <p className="fw-semibold mb-1">Members</p>
                <ul className="mb-0">
                  {(team.members || []).map((member, index) => (
                    <li key={`${member?.user?._id || index}-${member?.role || 'member'}`}>
                      {member?.user?.name || 'Unknown'} ({member?.role || 'member'})
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
