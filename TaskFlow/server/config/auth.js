import { Strategy as GitHub } from 'passport-github2'
import { pool } from './database.js'

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // Allow configuring callback via env for local development vs production
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
};

// Helpful debug output so we can confirm what's registered/sent to GitHub
console.log('GitHub OAuth configuration:')
console.log('  GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? '[set]' : '[missing]')
console.log('  GITHUB_CALLBACK_URL used by Passport:', options.callbackURL)

const verify = async (accessToken, refreshToken, profile, callback)  => {
    const { _json: { id, name, login, avatar_url } } = profile
    const userData = { githubId: id, username: login, avatarUrl: avatar_url, accessToken }

    try {
        const results = await pool.query('SELECT * FROM users WHERE username = $1', [userData.username])
        const user = results.rows[0]

        if (!user) {
            const results = await pool.query(
                `INSERT INTO users (githubid, username, avatarurl, accesstoken)
                VALUES($1, $2, $3, $4)
                RETURNING *`,
                [userData.githubId, userData.username, userData.avatarUrl, accessToken]
            )

            const newUser = results.rows[0]
            return callback(null, newUser)            
        }

        return callback(null, user)

     }

    catch (error) {
        return callback(error)
    }
}

const GitHubStrategy = new GitHub(options, verify)

export { GitHubStrategy as GitHub }
export { options }