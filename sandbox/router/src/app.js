import express from 'express'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express()
app.use(morgan())

app.get('/api/status/healthz', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.get('/api/status/readyz', (req, res) => {
    res.status(200).json({ status: "ready" })
})

const proxies = {}
const agentProxies = {}

function getproxy(sandboxId) {
    const target = `http://sandbox-service-${sandboxId}`
    console.log("🔥 PREVIEW PROXY TARGET:", target)
    if (!proxies[sandboxId]) {
        proxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true
        })
    }

    return proxies[sandboxId]
}

function getAgentProxy(sandboxId) {
    const target = `http://sandbox-service-${sandboxId}:3000`


    console.log("🔥 AGENT PROXY TARGET:", target)

    if (!agentProxies[sandboxId]) {
        agentProxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true
        })
    }

    return agentProxies[sandboxId]
}

app.use((req, res, next) => {




    const host = req.headers.host
    const sandboxId = host.split(".")[0]

    console.log("HOST:", req.headers.host)
    console.log("SANDBOX ID:", sandboxId)
    console.log("TYPE:", host.split('.')[1])

    if (host.split('.')[1] == 'agent') {
        return getAgentProxy(sandboxId)(req, res, next);
    }

    else if (host.split('.')[1] === 'preview') {
        return getproxy(sandboxId)(req, res, next);
    }

    return res.status(400).json({
        error: 'Invalid host'
    })
})

export default app