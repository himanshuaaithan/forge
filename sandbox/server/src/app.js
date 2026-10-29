import express from 'express'
import morgan from 'morgan'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

import { createService } from './kubernetes/service.js';
import { createpod } from './kubernetes/pod.js';


const app = express()
app.use(morgan())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));


app.get('/api/sandbox/health', (req, res) => {
    res.status(200).json({
        messgae: 'sandbox api is healthy',
        status: "ok"
    })
})


app.post('/api/sandbox/start', async (req, res) => {
    const sandboxId = uuidv4()
    console.log(sandboxId)

    await Promise.all([
        createpod(sandboxId),
        createService(sandboxId)

    ])

    return res.status(201).json({
        message: 'Sandbox environment created successfully',
        sandboxId,
        previewUrl: `http://${sandboxId}.preview.localhost`
    })
})

export default app