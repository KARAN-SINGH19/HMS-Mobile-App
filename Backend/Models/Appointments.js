const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
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
    symptoms: {
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
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    }
})


const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment;