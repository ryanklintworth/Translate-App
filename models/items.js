const mongoose = require('mongoose')

const garageSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: String,
  location: String
})

const Garage = mongoose.model('Garage', garageSchema)

module.exports = Garage
