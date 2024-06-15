const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    testName:
        { type: String, required: true },
    testPrice:
        { type: Number, required: true },
    testCategory:
        { type: String, required: true },
})

const testTable = mongoose.model("MedicalTests", testSchema)

module.exports = testTable