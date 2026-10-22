import express from 'express'
import { agent } from '../agent/agent.js';

const agentRouter = express.Router();

agentRouter.post('/invoke', async (req, res) => {
    const message = req.body.message

   const result =  await agent.invoke({
        messages: [
            {
                role: 'user',
                content: message
            }
        ]
    },{
    recursionLimit: 100,
  })

    res.status(200).json({
        message:"task complete",
        result
    })



})

export default agentRouter