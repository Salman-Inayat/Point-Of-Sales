const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    label : { type: String, required: true },
    descriptor : { type: [Object], required: true },
    //age : { type: Number, required: false },
}, {
    timestamps: true,
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;