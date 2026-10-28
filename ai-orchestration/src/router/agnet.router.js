import express, { response } from 'express'
import { agent } from '../agent/agent.js';


const agentRouter = express.Router();

agentRouter.post('/invoke', async (req, res) => {
    const { message, projectId } = req.body;
    console.log(`projectId:${projectId}`)
    if (!message) {
        return res.status(400).json({
            error: 'Message is required'
        });
    }

    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

       const writer = (text) => {
    console.log('[TOOL]', text);
    res.write(`data: ${JSON.stringify({ message: text })}\n\n`);
};

        console.log('Starting agent stream...');

        const response = await agent.stream(
            {
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ]
            },
            {
                recursionLimit: 500,
                configurable: {
                    projectId
                },
                context: {
                    projectId,
                    writer
                },
                streamMode: 'updates'
            })

        for await (const chunk of response) {
            console.log(
                'Agent stream chunk:',
                JSON.stringify(chunk, null, 2)
            )
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }

        console.log('Agent stream completed.');
        res.end();
    } catch (error) {
        throw new Error(error.message)
    }
})

export default agentRouter