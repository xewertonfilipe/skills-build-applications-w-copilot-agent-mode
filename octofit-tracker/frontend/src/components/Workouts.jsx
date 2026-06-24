import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/apiClient'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts', { signal: controller.signal })
        setWorkouts(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load workouts')
        }
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [])

  if (loading) {
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (!workouts.length) {
    return <div className="alert alert-warning">No workouts found.</div>
  }

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-12 col-md-6" key={workout._id || workout.title}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5 card-title">{workout.title || 'Untitled workout'}</h3>
                <p className="mb-1 text-capitalize">Focus: {workout.focus || 'N/A'}</p>
                <p className="mb-1 text-capitalize">Difficulty: {workout.difficulty || 'N/A'}</p>
                <p className="mb-2">Estimated time: {workout.estimatedMinutes ?? 'N/A'} min</p>
                <p className="fw-semibold mb-1">Exercises</p>
                <ul>
                  {(workout.exercises || []).map((exercise, index) => (
                    <li key={`${workout._id || workout.title}-${index}`}>{exercise}</li>
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

export default Workouts
