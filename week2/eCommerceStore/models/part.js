const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Inventory schema
const PartSchema = new Schema({
    part: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    ppu: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Part', PartSchema);