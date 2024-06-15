const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
    docName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    workingDays: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    }
});

const Doctor = mongoose.model("Doctor", docSchema);

module.exports = Doctor;
