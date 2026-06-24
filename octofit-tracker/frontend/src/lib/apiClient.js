const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim()

const getCodespaceNameFromHost = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  const { hostname } = window.location
  const codespaceMatch = hostname.match(/^(.+)-5173\.app\.github\.dev$/)
  return codespaceMatch?.[1]?.trim() || ''
}

const resolveApiBaseUrl = () => {
  const resolvedCodespaceName = codespaceName || getCodespaceNameFromHost()

  if (resolvedCodespaceName) {
    return `https://${resolvedCodespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

const apiBaseUrl = resolveApiBaseUrl()

const normalizeResourcePath = (resourcePath) =>
  String(resourcePath || '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')

export const getApiBaseUrl = () => apiBaseUrl

export const buildApiUrl = (resourcePath) => {
  const normalizedPath = normalizeResourcePath(resourcePath)
  return `${apiBaseUrl}/${normalizedPath}/`
}

export const normalizeCollectionPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidateArrays = [
    payload.items,
    payload.results,
    payload.data,
    payload.records,
    payload.docs,
    payload.rows,
    payload.content,
    payload?.data?.items,
    payload?.data?.results,
    payload?.data?.records,
    payload?.data?.docs,
  ]

  const foundArray = candidateArrays.find((value) => Array.isArray(value))
  return foundArray || []
}

export const fetchCollection = async (resourcePath, options = {}) => {
  const response = await fetch(buildApiUrl(resourcePath), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  return normalizeCollectionPayload(payload)
}
