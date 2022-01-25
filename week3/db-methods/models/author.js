const mongoose = require('mongoose')
const Schema = mongoose.Schema

// author schema
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)