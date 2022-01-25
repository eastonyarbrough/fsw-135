const express = require('express')
const authorRouter = express.Router()
const Author = require('../models/author.js')

// Get All
authorRouter.get('/', (req, res, next) => {
  Author.find((err, authors) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(authors)
  })
})

// Add new author
authorRouter.post('/', (req, res, next) => {
  const newAuthor = new Author(req.body)
  newAuthor.save((err, savedAuthor) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedAuthor)
  })
})

// Add many authors
authorRouter.post('/manyauthors', (req, res, next) => {
  const Authors = req.body
  const newAuthor = new Author(Authors)
  Author.insertMany(Authors, (err, savedAuthor) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedAuthor)
  })
})



module.exports = authorRouter