const customError = require("../utils/customError");


devError=(error, res)=>{
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}


const castErrorHandler=(err)=>{
    const message= `Invalid value for ${err.path} :  ${err.value}`;
    return new customError(message, 400);
}

//customize it
const duplicateKeyErrorHandler=(err)=>{
    const message= `It should be unique`
    return new customError(message, 400)
}

const validationErrorHandler=(err)=>{
    const errors= Object.values(err.errors).map(val => val.message);
    const errorMessages= errors.join('. ');
    const message= `Invalid input data fpr ${errorMessages}`;
    return new customError(message, 400);
}

prodError=(error, res)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }else{
        res.status(500).json({
            status: "error",
            message: "Something went wrong, Please try again later"
        })
    }
}

module.exports=((error,req,res,next)=>{
    error.statusCode= error.statusCode || 500;
    error.status= error.status || "error";
    if(process.env.NODE_ENV=== "Development"){
        devError(error, res)
    }
    else{
        // Handling invalid ID error caused by Mongoose
        if(error.name==="CastError") error= castErrorHandler(error)
        //Handling Duplicate key error(Unique) caused by MongoDB driver 
        if(error.code === 11000) error= duplicateKeyErrorHandler(error)
        //Handling Mongoose validation Errors thrown by Mongoose
        if(error.name==="ValidationError") error= validationErrorHandler(error)
        prodError(error, res)
    }
})