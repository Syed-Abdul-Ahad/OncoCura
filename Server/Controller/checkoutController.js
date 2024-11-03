const Checkout = require('./../Model/checkoutModel');
const Cart = require('./../Model/CartModel');
const sendEmail = require('./../utils/email');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');



// create checkout
exports.createCheckout = asyncErrorHandler(async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    console.log(userId)
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Create a new checkout record
    const checkout = await Checkout.create({
        user: userId,
        cart: cart,
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
        status: 'Pending',
        placedAt: Date.now()
    });


    // cart.items = [];
    await cart.save();

    const message = `Your order has been successfully placed!\nENJOY SHOPPING`
    try{
        await sendEmail({
            email: email,
            subject: 'Order Placed',
            message: message
        })
    }
    catch(err){
        return next(new customError('There was an error sending email. please try again', 500))
    }

    res.status(201).json({
        status: 'Success',
        data: {
            checkout
        }
    });
});








// Get a user's checkout details
exports.getCheckout = asyncErrorHandler(async (req, res) => {
    const userId = req.user.id;

    // Find the checkout details for the user and populate cart items and product details
    const checkout = await Checkout.findOne({ user: userId })
        .populate({
            path: 'cart',
            populate: {
                path: 'items.product',
                select: 'name price'
            }
        });

    if (!checkout) {
        return res.status(404).json({ message: 'No checkout found for this user' });
    }

    // Calculate subtotal and total
    const subtotal = checkout.cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);
    const shippingFee = 10;
    const total = subtotal + shippingFee;

    res.status(200).json({
        status: 'Success',
        data: {
            checkout,
            subtotal,
            shippingFee,
            total
        }
    });
});


