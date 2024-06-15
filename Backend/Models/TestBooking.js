const mongoose = require("mongoose")

const testBookingSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    testPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    }
})


const testBooking = mongoose.model("TestBookings", testBookingSchema)

module.exports = testBooking;