import express from 'express'
import { createUser, getUserByGithubId, getUserByUsername } from '../controllers/users.js'

const router = express.Router()

router.post('/create', createUser)
router.get('/github/:githubid', getUserByGithubId)
router.get('/:username', getUserByUsername)

export default router
