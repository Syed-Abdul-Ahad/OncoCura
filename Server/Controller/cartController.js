const Cart = require('./../Model/CartModel');
const asyncErrorHandler = require('./../utils/asyncErrorHandler')



exports.addToCart = asyncErrorHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
  
    // Find cart for the user
    let cart = await Cart.findOne({ user: userId });
  
    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({ user: userId, items: [] });
    }
  
    // Check if product is already in cart
    const existingItemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
  
    if (existingItemIndex >= 0) {
      // If product exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add to cart
      cart.items.push({ product: productId, quantity });
    }
  
    await cart.save();

    const populatedCart = await cart.populate('items.product');
    console.log(populatedCart)

    res.status(200).json({
      status: "Success",
      data: {
        cart: populatedCart
      }
    });

});
  




exports.removeFromCart = asyncErrorHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

      // Find cart for the user
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(400).json({ message: "Cart not found" });
      }
  
      // Remove the product from the cart
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
  
      await cart.save();

      res.status(200).json({
        status: "Success",
        data:{
            cart
        }
    })

})
  



exports.getCart = asyncErrorHandler(async (req, res) => {
    const userId = req.user.id;

      const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
      if (!cart) {
        return res.status(200).json({ message: 'Your cart is empty' });
      }
  
      res.status(200).json({
        status: "Success",
        data:{
            cart
        }
      });
  })