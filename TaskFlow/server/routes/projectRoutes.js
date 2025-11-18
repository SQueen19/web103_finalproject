import express from 'express'
import { createProject, getProjects, getProject, updateProject, deleteProject } from '../controllers/projects.js'

const router = express.Router()

// Project routes
router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router
