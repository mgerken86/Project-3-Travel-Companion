const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hotelSchema = require('./hotel');


const tripSchema = new Schema({
    // An order belongs to a user
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    // Embed an order's hotel details
    hotel: [hotelSchema],
    // A user's unpaid order is their "cart"
    isPaid: { type: Boolean, default: false },
  }, {
    timestamps: true,
    toJSON: { virtuals: true }
  });

  tripSchema.virtual('tripId').get(function() {
    return this.id.slice(-4).toUpperCase();
  });

  tripSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
      { user: userId, isPaid: false },
      // update
      { user: userId },
      // upsert option will create the doc if 
      // it doesn't exist
      { upsert: true, new: true }
    );
  };

  tripSchema.methods.addHotelToCart = async function(hotelId) {
    // cart = this means the tripSchema
    const cart = this;
    // Check if item already in cart
    const hotelRoom = cart.hotel.find(hotel => hotel._id.equals(hotelId));
    if (hotelRoom) {
      // Prevents user from boooking the same hotel room twice
      return null
    } else {
      const hotel = await mongoose.model('Hotel').findById(hotelId);
      cart.push({ hotel });
    }
    return cart.save();
  };


  module.exports = mongoose.model('TripOrder', tripSchema)
