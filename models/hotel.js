const {Schema} = require('mongoose')

const hotelSchema = new Schema({
    name: { type: String, required: true },
    type: {type: String, required: true},
    description: { type: String, required: true},
    cheapestPrice: { type: Number },
    rooms: { type: [String], required: true },
    rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    city: { type: String, required: true },
    address: { type: String, required: true }
    // distance: { type: String?(if we write '1.2 miles away') }
    // img:{ type: [String] }
})

module.exports = hotelSchema