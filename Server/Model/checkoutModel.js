const env = require('dotenv');
env.config({ path: './../config.env' });

const validator = require('validator');
const mongoose = require('mongoose');

// MY CODE

const CheckoutSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart', 
        required: true 
    },
    firstName: {
        type: String,
        required: [true, "First name is a required field"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is a required field"]
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    city: {
        type: String,
        required: [true, "City is a required field"]
    },
    state: {
        type: String,
        required: [true, "State is a required field"]
    },
    zipcode: {
        type: String,
        required: [true, "Zipcode is a required field"]
    },
    country: {
        type: String,
        required: [true, "Country is a required field"]
    },
    phone: {
        type: String,
        required: [true, "Phone is a required field"]
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    placedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'Checkout'
});




// new code

// const CheckoutSchema = new mongoose.Schema({
//     user: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true 
//     },
//     items: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         }
//     }],
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, validate: [validator.isEmail, 'Please enter a valid email'] },
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipcode: { type: String, required: true },
//     country: { type: String, required: true },
//     phone: { type: String, required: true },
//     status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
//     placedAt: { type: Date, default: Date.now }
// }, {
//     collection: 'Checkout'
// });



const Checkout = mongoose.model('Checkout', CheckoutSchema);
module.exports = Checkout;

