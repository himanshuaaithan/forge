import express from 'express'
import morgan from 'morgan'
import fs from 'fs'

const working_dir = "/workspace"

const app = express()
app.use(morgan())
app.get('/api/agent/health', (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.get('/list/file', async (req, res) => {
    const Element = await fs.promises.readdir(working_dir)

    res.status(200).json({
        message: 'element',
        Element
    })
})
export default app