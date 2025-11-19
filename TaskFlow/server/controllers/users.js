import { pool } from '../config/database.js'

// Create a new user (used during GitHub auth)
export const createUser = async (req, res) => {
    try {
        const { githubid, username, avatarurl, accesstoken } = req.body

        const results = await pool.query(`
            INSERT INTO users (githubid, username, avatarurl, accesstoken)
            VALUES($1, $2, $3, $4)
            ON CONFLICT (githubid) 
            DO UPDATE SET 
                username = EXCLUDED.username,
                avatarurl = EXCLUDED.avatarurl,
                accesstoken = EXCLUDED.accesstoken
            RETURNING *`,
            [githubid, username, avatarurl, accesstoken]
        )

        res.status(200).json(results.rows[0])
        console.log('🆕 user created/updated')
    }
    catch (error) {
        res.status(409).json({ error: error.message })
        console.log('Error:', error.message)
    }
}

// Get user by GitHub ID
export const getUserByGithubId = async (req, res) => {
    try {
        const githubid = parseInt(req.params.githubid)
        const results = await pool.query(`
            SELECT * FROM users
            WHERE githubid = $1`,
            [githubid]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
        console.log('🚫 unable to GET user - Error:', error.message)
    }
}

// Get user by username
export const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username
        const results = await pool.query(`
            SELECT * FROM users
            WHERE username = $1`,
            [username]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
        console.log('🚫 unable to GET user - Error:', error.message)
    }
}
