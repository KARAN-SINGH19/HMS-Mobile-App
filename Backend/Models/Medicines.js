const mongoose = require("mongoose")

const medSchema = new mongoose.Schema({
    medName:
        { type: String, required: true },
    medPrice:
        { type: Number, required: true },
    expiryDate:
        { type: String, required: true },
    stock:
        { type: Number, required: true }
})

const medicineTable = mongoose.model("Medicines", medSchema)

module.exports = medicineTable;