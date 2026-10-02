import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan())
app.get('/api/agent/health',(req,res)=>{
    res.status(200).json({status:"ok"})
})
export default app