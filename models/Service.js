const mongoose = require("mongoose")

const Schema = mongoose.Schema

const service = new Schema({
    service: { type: String },
    name: { type: String },
    category: { type: String },
    img: { type: String },
    route: { type: String },
    head: { type: String },
    mainfeature: [{ type: String }],
    thd: [{ type: String }],
    td1: [{ type: String }],
    td2: [{ type: String }],
    td3: [{ type: String }],
    td4: [{ type: String }],
    td5: [{ type: String }],
    td6: [{ type: String }],
    td7: [{ type: String }],
    td8: [{ type: String }],
    bookingDetail: [{ type: String }],
    faq: [{ type: String }],
    benefits: [{ type: String }]
})

module.exports = mongoose.model("services", service)

