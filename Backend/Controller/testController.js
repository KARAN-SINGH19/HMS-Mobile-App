const doctorTable = require("../Models/Doctors")
const userTable = require("../Models/Users");
const appointmentTable = require("../Models/Appointments")
const testTable = require("../Models/Tests")
const testBookingTable = require("../Models/TestBooking")
const medicineTable = require("../Models/Medicines")
const orderTable = require("../Models/Orders")
const stripe = require('stripe')('sk_test_51NxBhTEWwd2L3hVcqKggRsddgVdE7Q2gO7tkapbEzMRINxkLf9twyWTIbMv0K9cpkieEAfGXRHTsoyClzt7yhQwX007TC5uy2q');

exports.addDoc = async (req, res) => {
    try {
        const data = req.body;
        const addDoc = await doctorTable.create(data);
        if (addDoc) {
            res.status(200).json({ success: true, message: "doctor added" })
        } else {
            res.status(400).json({ success: false, message: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ successs: false, message: "server error" })
    }
}


exports.getDoctor = async (req, res) => {
    try {
        const { specialization } = req.params;
        const data = await doctorTable.find({ specialization: specialization });

        if (data) {
            res.status(200).json({ success: true, message: "Data fetched", data });
        } else {
            res.status(404).json({ success: false, message: "No doctors found for the given specialization" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email } = req.body
        const { password } = req.body
        const user = await userTable.findOne({ email: email })
        if (user) {
            const verifyPass = await userTable.findOne({ password: password })
            if (verifyPass) {
                const token = user.generateJWToken()
                res.status(200).json({ success: true, message: "User found and verified", token: token });
            }
            else {
                res.status(404).json({ success: false, message: "Credentials didn't match" });
            }
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.registerUser = async (req, res) => {
    try {
        const userData = req.body
        const user = await userTable.create(userData)
        if (user) {
            const token = user.generateJWToken()
            res.status(200).json({ success: true, message: "user added", token: token })
        } else {
            res.status(400).json({ success: false, message: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ successs: false, message: "server error" })
    }
}

exports.bookAppointment = async (req, res) => {
    try {
        const { id } = req.user
        const { name, age, gender, symptoms, date, time } = req.body
        const { doctorName } = req.body
        const doctor = await doctorTable.findOne({ docName: doctorName })
        const docId = doctor._id

        const data = {
            patientName: name,
            patientAge: age,
            gender: gender,
            symptoms: symptoms,
            appointmentDate: date,
            appointmentTime: time,
            doctor: docId,
            user: id
        }

        const appointment = await appointmentTable.create(data)
        if (appointment) {
            res.status(200).json({ success: true, message: "appointment booked" })
        } else {
            res.status(400).json({ success: false, message: "appointment not booked" })
        }
    } catch (error) {
        res.status(500).json({ successs: false, message: "server error" })
    }
}

exports.stripeGateway = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: "aed",
            automatic_payment_methods: {
                enabled: true
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.viewAppointments = async (req, res) => {
    try {
        const { id } = req.user
        const data = await appointmentTable.find({ user: id })
        if (data) {
            res.status(200).json({ success: true, message: "appointments fetched", data })
        }
        else {
            res.status(400).json({ success: true, message: "appointments not fetched" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const data = await appointmentTable.findByIdAndDelete(id)
        if (data) {
            res.status(200).json({ success: true, message: "appointment deleted" })
        }
        else {
            res.status(400).json({ success: true, message: "appointment not deleted" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.addTest = async (req, res) => {
    try {
        const data = req.body
        const addData = await testTable.create(data)
        if (addData) {
            res.status(200).json({ success: true, message: "test added" })
        } else {
            res.status(400).json({ success: false, message: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getTests = async (req, res) => {
    try {
        const data = await testTable.find();

        if (data) {
            res.status(200).json({ success: true, message: "Data fetched", data });
        } else {
            res.status(404).json({ success: false, message: "No data found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.bookLabTest = async (req, res) => {
    try {
        const { name, age, gender, date, time, testName, testPrice } = req.body
        const { id } = req.user

        const data = {
            patientName: name,
            patientAge: age,
            gender: gender,
            appointmentDate: date,
            appointmentTime: time,
            testName: testName,
            testPrice: testPrice,
            user: id
        }

        console.log(data)

        const booking = await testBookingTable.create(data)
        if (booking) {
            res.status(200).json({ success: true, message: "lab test booked" })
        } else {
            res.status(400).json({ success: false, message: "lab test not booked" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.filterMedicalTests = async (req, res) => {
    try {
        const { testCategory } = req.params
        const testData = await testTable.find({ testCategory: testCategory })
        if (testData) {
            res.status(200).json({ success: true, message: "tests found", testData: testData })
        }
        else {
            res.status(400).json({ success: false, message: "invalid test category" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.addMedicine = async (req, res) => {
    try {
        const data = req.body
        const medicine = await medicineTable.create(data)
        if (medicine) {
            res.status(200).json({ success: true, message: "medicine added" })
        } else {
            res.status(400).json({ success: false, message: "medicine not added" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.getMedicines = async (req, res) => {
    try {
        const data = await medicineTable.find();

        if (data) {
            res.status(200).json({ success: true, message: "Data fetched", data });
        } else {
            res.status(404).json({ success: false, message: "No data found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.searchMedicines = async (req, res) => {
    try {
        const { medName } = req.params
        console.log(medName);
        const medicine = await medicineTable.find({ medName: { $regex: medName } });
        if (medicine) {
            res.status(200).json({ success: true, message: "Data fetched", medicine: medicine });
        } else {
            res.status(404).json({ success: false, message: "No data found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.loggedUser = async (req, res) => {
    try {
        const { id } = req.user
        const user = await userTable.findById({ _id: id })
        if (user) {
            res.status(200).json({ success: true, message: "Data fetched", user: user });
        } else {
            res.status(400).json({ success: false, message: "No data found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.placeOrder = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.user
        const orderData = { ...data, user: id }

        const order = await orderTable.create(orderData)
        if (order) {
            res.status(200).json({ success: true, message: "Order placed" });
        } else {
            res.status(400).json({ success: false, message: "Order not placed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}