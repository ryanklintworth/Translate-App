const express = require('express');
const mongoose = require('mongoose');

const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// ================
// middlewere
// ================

app.use(express.json())
app.use(express.static('public'))


// ================
// controllers
// ================

const itemsController = require('./controllers/items_controller.js')
app.use('/items', itemsController)

// ================
// database
// ================

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: 🧜‍♂️', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

app.listen(PORT, () => {
 console.log(`listening on port ${PORT}‍ 🍭`);
})
