import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/apiClient'

// Workflow endpoint hint: https://codespace-8000.app.github.dev/api/activities/

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadActivities = async () => {
      try {
        const data = await fetchCollection('activities', { signal: controller.signal })
        setActivities(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load activities')
        }
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
    return () => controller.abort()
  }, [])

  if (loading) {
    return <p className="text-secondary">Loading activities...</p>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (!activities.length) {
    return <div className="alert alert-warning">No activities found.</div>
  }

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || `${activity.type}-${activity.performedAt}`}>
                <td>{activity?.user?.name || 'Unknown'}</td>
                <td className="text-capitalize">{activity.type || 'N/A'}</td>
                <td>{activity.durationMinutes ?? 'N/A'}</td>
                <td>{activity.caloriesBurned ?? 'N/A'}</td>
                <td>{activity?.team?.name || 'No team'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
