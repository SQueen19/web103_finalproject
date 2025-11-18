const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Get all projects
export const getProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`)
    if (!response.ok) throw new Error('Failed to fetch projects')
    return await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

// Get a single project by ID
export const getProject = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`)
    if (!response.ok) throw new Error('Failed to fetch project')
    return await response.json()
  } catch (error) {
    console.error('Error fetching project:', error)
    throw error
  }
}

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
    if (!response.ok) throw new Error('Failed to create project')
    return await response.json()
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

// Update a project
export const updateProject = async (id, projectData) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
    if (!response.ok) throw new Error('Failed to update project')
    return await response.json()
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

// Delete a project
export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete project')
    return await response.json()
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}