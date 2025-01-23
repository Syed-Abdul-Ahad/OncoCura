const Cart = require("./../Model/CartModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");

exports.addToCart = asyncErrorHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item?._id.toString() === productId
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  const populatedCart = await cart.populate("items.product");

  res.status(200).json({
    status: "Success",
    data: {
      cart: populatedCart,
    },
  });
});

exports.removeFromCart = asyncErrorHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  // Find the cart based on user ID
  let cart = await Cart.findOne({ user: userId });

  console.log(productId)
  // If the cart is not found, return a 404 status
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  console.log("cart", cart)

  // Remove the item from the cart
  const updatedItems = cart.items.filter(
    (item) => item?._id.toString() !== productId
  );
  console.log("updatedItems",updatedItems)

  // If no items were removed, return an error message
  if (updatedItems.length === cart.items.length) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  cart.items = updatedItems;

  await cart.save();

  res.status(200).json({
    status: "Success",
    data: {
      cart,
    },
  });
});

exports.getCart = asyncErrorHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

      console.log("cart : ", cart);  
      
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



exports.calculateCartTotal = asyncErrorHandler(async (req, res) => {
    const userId = req.user.id;

    // Find cart for the user and populate product details
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
    if (!cart || cart.items.length === 0) {
        return res.status(200).json({ message: 'Your cart is empty' });
    }

    // Calculate subtotal
    const subtotal = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    // Add a fixed shipping fee of 10
    const shippingFee = 10;
    const total = subtotal + shippingFee;

    res.status(200).json({
        status: "Success",
        data: {
            cart,
            subtotal,
            shippingFee,
            total
        }
    });
});
