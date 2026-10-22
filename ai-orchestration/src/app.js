import express from 'express'
import 'dotenv/config'
import agentRouter from './router/agnet.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/ai/healthz', (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

app.use('/api/ai/', agentRouter)

export default app