const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hotelSchema = require('./hotelSchema');


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

  module.exports = mongoose.model('TripOrder, tripSchema')
