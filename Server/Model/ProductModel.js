const env = require('dotenv')
env.config({path:'./../congig.env'})


const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"name is required field"],
        unique:true,
        trim:true
    },
    company:{
      type:String,
      required:[true,"name is required field"],
      trim:true
    },
    type:{
      type: String,
      default:"General"
    },
    description:{
      type: String,
      required:[true,"description is required model"],
      trim:true
    },

    price:{
        type:Number,
        required:[true,"price is required field"]
    },

    ratings:{
        type:Number,
        default:1.0
    },

    image:{
      type: String,
      required:[true,"image is required field"]
    },
},{
  collection: 'Product' 
}
);



const Product = mongoose.model('Product',ProductSchema)


module.exports = Product;