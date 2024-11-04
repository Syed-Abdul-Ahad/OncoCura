const express = require('express')
const cors = require('cors')
const uploads = require('./utils/multerConfig')
const authRouter = require('./Routes/authRouter')
const productRouter = require('./Routes/ProductRouter')
const cartRouter = require('./Routes/cartRouter')
const recordRouter = require('./Routes/recordRouter')
const treatmentPlanRouter = require('./Routes/treatmentPlanRouter')
const checkoutRouter = require('./Routes/checkoutRouter')
const GlobalErrorHandler = require("./Controller/ErrorController")
const customError = require('./utils/customError')
const compression = require("compression");
const analysisRoutes = require("./Routes/analysisRouter");
const kanbanRoutes = require("./Routes/kanbanRouter");
const checkoutRouter = require('./Routes/checkoutRouter')

const app = express();
app.use(compression());

const allowedOrigins = "http://localhost:5173";

app.use(cors({ allowedOrigins }));

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `Response time for ${req.method} ${req.originalUrl}: ${duration}ms`
    );
  });
  next();
});

app.use("/api/v1/users", authRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/record", recordRouter);
app.use("/api/v1/plan", treatmentPlanRouter);
app.use("/api/v1/analyze", analysisRoutes);
app.use("/api/v1/kanban", kanbanRoutes);


app.all('*',(req,res,next)=>{
    
    // error class approach
    const err = new customError(`can't find ${req.originalUrl} on the server`,404)
    next(err)
})


// Global error handler

app.use(GlobalErrorHandler)

module.exports = app;