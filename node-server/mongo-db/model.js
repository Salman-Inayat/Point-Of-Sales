const mongoose = require('mongoose')

var imageSchema = new mongoose.Schema({
    barcode: Number,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', imageSchema)