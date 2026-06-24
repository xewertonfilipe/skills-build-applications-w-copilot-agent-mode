import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/apiClient'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async () => {
      try {
        const data = await fetchCollection('users', { signal: controller.signal })
        setUsers(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load users')
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  if (loading) {
    return <p className="text-secondary">Loading users...</p>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (!users.length) {
    return <div className="alert alert-warning">No users found.</div>
  }

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Level</th>
              <th>Goals</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.email}>
                <td>{user.name || 'Unknown'}</td>
                <td>{user.email || 'N/A'}</td>
                <td className="text-capitalize">{user.fitnessLevel || 'N/A'}</td>
                <td>{Array.isArray(user.goals) ? user.goals.join(', ') : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
