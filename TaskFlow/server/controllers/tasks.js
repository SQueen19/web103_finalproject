import { pool } from '../config/database.js'

// Create a new task
const createTask = async (req, res) => {
  try {
    const { project_id, title, description, priority, due_date, status, completed } = req.body
    
    const result = await pool.query(
      `INSERT INTO tasks (project_id, title, description, priority, due_date, status, completed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [project_id, title, description, priority || 'medium', due_date, status || 'todo', completed || false]
    )
    
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single task by ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all tasks for a specific project
const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    )
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, priority, due_date, status, completed } = req.body
    
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, priority = $3, due_date = $4, 
           status = $5, completed = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [title, description, priority, due_date, status, completed, id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { createTask, getTasks, getTask, getTasksByProject, updateTask, deleteTask }