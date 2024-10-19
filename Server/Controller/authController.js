const customError = require('../utils/customError')
const User = require('./../Model/userModel')
const asyncErrorHandler = require('./../utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const util = require('util')
const env = require('dotenv')
env.config({path:'./config.env'})

// function for token

const signToken = (ID)=>{
    return jwt.sign({id: ID},process.env.SECRET_STR,{
        expiresIn : process.env.LOGIN_EXPIRES
    })
}



exports.signup = asyncErrorHandler(async (req,res,next)=>{
    const newUser = await User.create(req.body)

    const token = signToken(newUser._id)

    res.status(201).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    })
})



exports.login = asyncErrorHandler(async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        const error = new customError('Please provide emailID and Password for login',400)
        return next(error)
    }
    


    const user =  await User.findOne({email: email}).select('+password');
    
    const isMatch =  await user.comparePasswordInDB(password,user.password);
    
    if(!user || !isMatch){
        const error = new customError('Incorrect email or password',400)
        return next(error)
    }

    const token = signToken(user._id)

    res.status(200).json({
        status:"success",
        token,
        user
    })
})







// protecting routes  (making it a middleware which is used in movie routes earlier before moving to movieController middleware)

exports.protect = asyncErrorHandler(async (req,res,next)=>{


    // 1) check if token exist?


    const testToken = req.headers.authorization;
    console.log(testToken)
    let token;
    if(testToken && testToken.startsWith('bearer')){
        token = testToken.split(' ')[1]
    }

    if(!token){
        const error = new customError('You are not logged in',401)
        next(error)
    }



    // 2) verify/validate token


    // Promisify the jwt.verify method
    const decodedToken = await util.promisify(jwt.verify)(token,process.env.SECRET_STR);


    // 3) If user exists? (after token user may have deleted the account)

    const user = await User.findById(decodedToken.id)

    if(!user){
        const err = new customError('The user with the given token doest exist',401)
        next(err);
    }



    // 4) If the user changed the password after the token has issued

    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat)
    if(isPasswordChanged){  //from UserModel (passing it the time of jwt issued)

    const err = new customError('The password has been changed recently, please login again',401)
    next(err)
    }


    // 5) allow user to access
    req.user = user
    next()
     
})




// middleware function for authorization

exports.restrict = (role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            const err = new customError("you do not have permission to perform that action",403)
            next(err)
        }
        next()
    }
}






// forgot password middleware

// exports.forgotPassword = asyncErrorHandler( async(req,res,next)=>{

//     //1. get user according to email
//     const user = await User.findOne({email: req.body.email})
    
//     if(!user){
//         const error = new customError("We couldn't find the user with given email",404)
//         next(error)
//     }


//     //2. GENERATE A RANDOM RESET TOKEN
//     const resetToken = user.createResetPasswordToken();
    
//     await user.save({validateBeforeSave: false});


//     //3. SEND THE TOKEN BACK TO THE USER EMAIL
    

// })

