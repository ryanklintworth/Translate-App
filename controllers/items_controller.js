const express = require('express')
const items = express.Router()

const Item = require('../models/items.js');


items.get('/', (req, res) => {
  Item.find({}, (err, foundItems) => {
    res.json(founditems)
  })
})

items.post('/', (req,res) => {
  Item.create(req.body, (err, createdItem) => {
    Item.find({}, (err, foundItems) => {
    res.json(foundItems)
    })
  })
})

items.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id, req.body, {new: true},
    (err, updatedItem) => {
      if (err) {
        res.send(err)
      }else {
        Item.find({}, (err, foundItems) => {
          res.json(foundItems)
        })
      }
    }
  )
})

items.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    Item.find({}, (err, foundItems) => {
      res.json(foundItems)
    })
  })
})


module.exports = items
