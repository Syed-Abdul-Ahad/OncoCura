const express = require('express')
const cors = require('cors')
const authRouter = require('./Routes/authRouter')
const productRouter = require('./Routes/ProductRouter')
const cartRouter = require('./Routes/cartRouter')
const recordRouter = require('./Routes/recordRouter')
const treatmentPlanRouter = require('./Routes/treatmentPlanRouter')
const GlobalErrorHandler = require("./Controller/ErrorController")
const customError = require('./utils/customError')

const app = express()
app.use(cors())

app.use(express.json())


app.use("/api/v1/users",authRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/record',recordRouter)
app.use('/api/v1/plan',treatmentPlanRouter)


app.all('*',(req,res,next)=>{
    
    // error class approach
    const err = new customError(`can't find ${req.originalUrl} on the server`,404)
    next(err)
})


// Global error handler

app.use(GlobalErrorHandler)

module.exports = app;