const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`)
    if (!response.ok) throw new Error('Failed to fetch tasks')
    return await response.json()
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

// Get a single task by ID
export const getTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`)
    if (!response.ok) throw new Error('Failed to fetch task')
    return await response.json()
  } catch (error) {
    console.error('Error fetching task:', error)
    throw error
  }
}

// Get all tasks for a specific project
export const getTasksByProject = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/project/${projectId}`)
    if (!response.ok) throw new Error('Failed to fetch tasks for project')
    return await response.json()
  } catch (error) {
    console.error('Error fetching tasks for project:', error)
    throw error
  }
}

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
    if (!response.ok) throw new Error('Failed to create task')
    return await response.json()
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

// Update a task
export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
    if (!response.ok) throw new Error('Failed to update task')
    return await response.json()
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

// Delete a task
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete task')
    return await response.json()
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}