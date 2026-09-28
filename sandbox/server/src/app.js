import experss from 'express'
import morgan from 'morgan'

const app = experss()
app.use(morgan())
app.use(experss.json())
app.use(experss.urlencoded({ extended: true }))

app.get('/api/sandbox/health',(req,res)=>{
    res.status(200).json({
        messgae:'sandbox api is healthy',
        status:"ok"
    })
})


export default app