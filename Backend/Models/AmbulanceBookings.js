const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    patientName: {
        type: String,
        requireds: true
    },
    emergency: {
        type: String,
        requireds: true
    },
    address: {
        type: String,
        requireds: true
    },
    contactNo: {
        type: Number,
        requireds: true
    }
})

const ambulanceBookingTable = mongoose.model("ambulanceBooking", bookingSchema)
module.exports = ambulanceBookingTable