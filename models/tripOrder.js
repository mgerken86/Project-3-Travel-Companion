const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = require("./hotel");

const tripSchema = new Schema(
  {
    // An order belongs to a user
    user: { type: Schema.Types.ObjectId, ref: "User" },
    // Embed an order's hotel details
    // hotel: [hotelSchema],
    // A user's unpaid order is their "cart"
    isPaid: { type: Boolean, default: false },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    // hotel details
    hotelName: { type: String, required: true },
    // description: { type: String, required: true },
    price: { type: Number },
    roomName: { type: String, required: true },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    hotelPhoto: { type: String },
    // city: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

tripSchema.virtual("tripId").get(function () {
  return this.id.slice(-4).toUpperCase();
});

tripSchema.statics.getCart = function (userId) {
  return this.findOneAndUpdate(
    { user: userId, isPaid: false },
    // update
    { user: userId },
    // upsert option will create the doc if
    // it doesn't exist
    { upsert: true, new: true }
  );
};

tripSchema.methods.addHotelToCart = async function (hotel, room) {
  // cart = this means the tripSchema
  const currentOrder = this;

  // convert booking.com hotel object to our own hotel model
  const newHotel = {
    name: hotel.name,
    type: hotel.type,
  };

  const hotelRes = await hotelSchema.create(newHotel);

  // Check if item already in cart
  const hotelRoom = cart.hotel.find((hotel) => hotel._id.equals(hotelId));
  if (hotelRoom) {
    // Prevents user from boooking the same hotel room twice
    return null;
  } else {
    const hotel = await mongoose.model("Hotel").findById(hotelId);
    cart.push({ hotel });
  }
  return cart.save();
};

module.exports = mongoose.model("TripOrder", tripSchema);
