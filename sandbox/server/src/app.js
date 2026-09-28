import experss from 'express'
import morgan from 'morgan'
import { v4 as uuidv4 } from 'uuid';

import { createService } from './kubernetes/service.js';
import { createpod } from './kubernetes/pod.js';


const app = experss()
app.use(morgan())
app.use(experss.json())
app.use(experss.urlencoded({ extended: true }))

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