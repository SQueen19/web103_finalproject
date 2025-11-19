import express from 'express'
import passport from 'passport'

const router = express.Router()

// Login success route
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ success: true, user: req.user })
    } else {
        res.status(401).json({ success: false, message: "Not authenticated" })
    }
})

// Login failed route
router.get('/login/failed', (req, res) => {
    res.status(401).json({ success: false, message: "failure" })
})

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }

        req.session.destroy((err) => {
            res.clearCookie('connect.sid')
            res.json({ status: "logout", user: {} })
        })
    })
})

// GitHub authentication route
router.get(
    '/github',
    passport.authenticate('github', {
        scope: [ 'read:user' ]
    })
)

// GitHub callback route
// Use a custom callback so we can log debug info and ensure session is set
router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error('Passport authentication error:', err)
            return res.redirect((process.env.CLIENT_URL || 'http://localhost:5173') + '/login/failed')
        }

        if (!user) {
            console.warn('No user returned from Passport during GitHub callback')
            return res.redirect((process.env.CLIENT_URL || 'http://localhost:5173') + '/login/failed')
        }

        // Log user and session info for debugging
        console.log('GitHub callback - user:', user && user.username ? user.username : user)

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                console.error('Error calling req.logIn:', loginErr)
                return res.redirect((process.env.CLIENT_URL || 'http://localhost:5173') + '/login/failed')
            }

            console.log('Session after logIn:', { sessionID: req.sessionID, session: !!req.session })

            // Redirect to client app
            return res.redirect(process.env.CLIENT_URL || 'http://localhost:5173')
        })
    })(req, res, next)
})

export default router
