const {Schema} = require('mongoose')

const hotelSchema = new Schema({
    name: { type: String, required: true },
    description: {type: String, required: true},
    price: { type: Number, required: true },
    rooms: { type: Number, required: true },
    // img:{ data: Buffer, contentType: String }
})

module.exports = hotelSchema