const TripOrder = require("../../models/tripOrder");
const Card = require("../../models/cardInfo");

module.exports = {
  cart,
  addToCart,
  checkout,
  history,
  cancelTrip,
  updateTrip,
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

// PUT route function to update existing order
async function updateTrip(req, res) {
  // console.log('in the controller')
  const { id, room, checkIn, checkOut, people } = req.body;
  // console.log("req.body of new hotel room", req.body);
  const currentTripOrder = await TripOrder.findByIdAndUpdate(id, {
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    roomName: req.body.room.room_name,
    price: req.body.room.price_breakdown.gross_price,
    totalPrice: req.body.room.price_breakdown.all_inclusive_price,
    numberOfPeople: req.body.people,
  });
  console.log("triporder.findbyid: ", currentTripOrder);
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  const { cardinfo } = req.body;
  // console.log(cardinfo);
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
  console.log("delete hotel id:", req.params.id)
  await TripOrder.findByIdAndRemove({ _id: req.params.id });
  // const trip = await TripOrder.find({_id: req.params.id})
  // console.log('trip:', trip)
}
