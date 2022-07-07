const TripOrder = require("../../models/tripOrder");
const Card = require("../../models/cardInfo");

module.exports = {
  cart,
  addToCart,
  checkout,
  history,
  cancelTrip,
  updateTrip
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
    id,
    room,
    checkIn,
    checkOut,
    hotel_id,
    hotelPhoto
  );
  res.json(cart);
}

async function updateTrip(req, res) {
  console.log('in the controller')
  const { room, checkIn, checkOut, id } = req.body
  // const trip = await TripOrder.updateTrip(req.body)
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
async function history(req, res) {
  // Sort most recent orders first
  const tripOrders = await TripOrder.find({ user: req.user._id, isPaid: true })
    .sort("-updatedAt")
    .exec();
  res.json(tripOrders);
}

// Delete a trip from the order history
async function cancelTrip(req, res) {
  await TripOrder.findOneAndDelete({ id: req.params.id})
  // const trip = await TripOrder.find({_id: req.params.id})
  // console.log('trip:', trip)
}
