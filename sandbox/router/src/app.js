
    import express from 'express'
    import morgan from 'morgan'
    import http from 'http'
    import { createProxyMiddleware } from 'http-proxy-middleware'

    const app = express()
    const server = http.createServer(app)

    app.use(morgan('dev'))

    app.get('/api/status/healthz', (req, res) => {
        res.status(200).json({ status: 'ok' })
    })

    app.get('/api/status/readyz', (req, res) => {
        res.status(200).json({ status: 'ready' })
    })

    const proxies = {}
    const agentProxies = {}

    function getproxy(sandboxId) {
        const target = `http://sandbox-service-${sandboxId}`

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

        if (!agentProxies[sandboxId]) {
            agentProxies[sandboxId] = createProxyMiddleware({
                target,
                changeOrigin: true,
                ws: true
            })
        }

        return agentProxies[sandboxId]
    }

    function getProxyForHost(host) {
        const parts = (host || '').split('.')
        const sandboxId = parts[0]
        const type = parts[1]

        if (!sandboxId || !type) return null

        if (type === 'agent') {
            return getAgentProxy(sandboxId)
        }

        if (type === 'preview') {
            return getproxy(sandboxId)
        }

        return null
    }

    app.use((req, res, next) => {
        const host = req.headers.host
        const proxy = getProxyForHost(host)

        console.log('HTTP HOST:', host)
        console.log('HTTP PATH:', req.url)

        if (!proxy) {
            return res.status(400).json({
                error: 'Invalid host'
            })
        }

        return proxy(req, res, next)
    })

    server.on('upgrade', (req, socket, head) => {
        const host = req.headers.host
        const proxy = getProxyForHost(host)

        console.log('WS HOST:', host)
        console.log('WS PATH:', req.url)

        if (!proxy) {
            socket.destroy()
            return
        }

        proxy.upgrade(req, socket, head)
    })


    export default server 
