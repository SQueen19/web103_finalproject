import { pool } from '../config/database.js'

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, due_date, start_date, category, status, progress, user_id } = req.body
    
    const result = await pool.query(
      `INSERT INTO projects (title, description, due_date, start_date, category, status, progress, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, description, due_date, start_date, category, status || 'planning', progress || 0, user_id]
    )
    
    res.status(201).json(result.rows[0])
    console.log('🆕 project created by user:', user_id)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all projects
const getProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single project by ID
const getProject = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, due_date, start_date, category, status, progress } = req.body
    
    const result = await pool.query(
      `UPDATE projects 
       SET title = $1, description = $2, due_date = $3, start_date = $4, 
           category = $5, status = $6, progress = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [title, description, due_date, start_date, category, status, progress, id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { createProject, getProjects, getProject, updateProject, deleteProject }