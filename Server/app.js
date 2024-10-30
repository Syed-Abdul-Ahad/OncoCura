const express = require('express')
const cors = require('cors')
const authRouter = require('./Routes/authRouter')
const productRouter = require('./Routes/ProductRouter')
const cartRouter = require('./Routes/cartRouter')
const recordRouter = require('./Routes/recordRouter')
const GlobalErrorHandler = require("./Controller/ErrorController")
const customError = require('./utils/customError')

const app = express()

const allowedOrigins = "http://localhost:5173";

app.use(cors({ allowedOrigins }));

app.use(express.json())


app.use("/api/v1/users",authRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/record',recordRouter)


app.all('*',(req,res,next)=>{
    
    // error class approach
    const err = new customError(`can't find ${req.originalUrl} on the server`,404)
    next(err)
})


// Global error handler

app.use(GlobalErrorHandler)

module.exports = app;