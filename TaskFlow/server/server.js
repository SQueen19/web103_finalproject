import express from 'express'
import cors from 'cors'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ TaskFlow API</h1>')
})

app.use('/projects', projectRoutes)
app.use('/tasks', taskRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})