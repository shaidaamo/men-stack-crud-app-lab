const mongoose = require("mongoose")

const foodschema = new mongoose.Schema({
    name: {type:String, required: true},
    ingredients: {
        type:[String], required: true
    }
},{timestamps: true})

const Food = mongoose.model('Food',foodschema)

module.exports = Food