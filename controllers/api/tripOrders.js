const TripOrder = require("../../models/tripOrder");
const Card = require("../../models/cardInfo");

module.exports = {
  cart,
  addToCart,
  checkout,
  // history,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await TripOrder.getCart(req.user._id);
  res.json(cart);
}

// Add a hotel to the cart
async function addToCart(req, res) {
  // pass all the info we need for order in req.body
  const { hotel, room, checkIn, checkOut, hotel_id, hotelPhoto } = req.body;
  const cart = await TripOrder.getCart(req.user._id);
  await cart.addHotelToCart(
    hotel,
    room,
    checkIn,
    checkOut,
    hotel_id,
    hotelPhoto
  );
  res.json(cart);
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  const { cardinfo } = req.body;
  console.log(cardinfo);
  const cart = await TripOrder.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save();
  const cardData = await Card.create(cardinfo);
  res.json({ cart, cardData });
}

// Return the logged in user's paid order history
// async function history(req, res) {
//   // Sort most recent orders first
//   const tripOrders = await TripOrder.find({ user: req.user._id, isPaid: true })
//     .sort("-updatedAt")
//     .exec();
//   res.json(tripOrders);
// }
