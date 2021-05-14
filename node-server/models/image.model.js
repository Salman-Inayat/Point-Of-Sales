const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var imageSchema = Schema({
    name: { type: String },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Image = mongoose.model('Image', imageSchema)

module.exports = Image;