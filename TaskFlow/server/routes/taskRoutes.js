import express from 'express'
import { createTask, getTasks, getTask, getTasksByProject, updateTask, deleteTask } from '../controllers/tasks.js'

const router = express.Router()

// Task routes
router.get('/', getTasks)
router.get('/project/:projectId', getTasksByProject)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
