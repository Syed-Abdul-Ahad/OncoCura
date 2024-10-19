const env = require('dotenv')
env.config({path:'./config.env'})

const mongoose =  require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.CONN_STRING)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

  const feedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']        
    },
    email:{
        type:String,
        required:[true,'email field is required'],
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },
    phoneNo:{
        type: String,
        validate:{
            validator:function(val){
                return val.length ==11
            },
            message:'Your phone number must consists of 11 digits'
        }
    },
    message:{
        type: String,
        required:[true, 'Please enter your feedback']
    }
    
},{
    collection: 'TeknoFestFeedback' 
  })


const Feedback = mongoose.model('Feedback',feedbackSchema)

module.exports = Feedback;