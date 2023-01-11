const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');
const ProductSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }});
ProductSchema.plugin(validator);
const Product = mongoose.model('product', ProductSchema);
module.exports = {Product};