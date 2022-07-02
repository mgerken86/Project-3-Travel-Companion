const TripOrder = require('../../models/tripOrder')

module.exports = {
    cart,
    addToCart,
    checkout,
    history
  };
  
  // A cart is the unpaid order for a user
  async function cart(req, res) {
    const cart = await tripOrder.getCart(req.user._id);
    res.json(cart);
  }
  
  // Add a hotel to the cart
  async function addToCart(req, res) {
    const cart = await TripOrder.getCart(req.user._id);
    await cart.addHotelToCart(req.params.id);
    res.json(cart);
  }

// Update the cart's isPaid property to true
async function checkout(req, res) {
    const cart = await TripOrder.getCart(req.user._id);
    cart.isPaid = true;
    await cart.save();
    res.json(cart);
  }

  // Return the logged in user's paid order history
async function history(req, res) {
    // Sort most recent orders first
    const tripOrders = await tripOrder
      .find({ user: req.user._id, isPaid: true })
      .sort('-updatedAt').exec();
    res.json(tripOrders);
  }