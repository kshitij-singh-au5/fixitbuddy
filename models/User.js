const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const userSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    mobile: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    inputAddress: [{ type: String }],
    inputAddress2: [{ type: String }],
    inputCity: [{ type: String }],
    inputstate: [{ type: String }],
    inputZip: [{ type: Number }],
    photo: { type: String },
    price: [[{type: String}]]
});

module.exports = mongoose.model("users", userSchema)
