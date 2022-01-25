const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Inventory schema
const InventorySchema = newSchema({
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

module.exports = mongoose.model('InventoryModel', InventorySchema);