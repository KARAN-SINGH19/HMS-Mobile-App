const express = require("express")
const auth = require("../Middleware/auth")
const { addDoc, getDoctor, registerUser, loginUser, bookAppointment, stripeGateway, viewAppointments, cancelAppointment, addTest, getTests, bookLabTest, filterMedicalTests, addMedicine, getMedicines, searchMedicines, loggedUser, placeOrder } = require("../Controller/testController")
const router = express.Router()

router.route("/addDoctor").post(addDoc)
router.route("/getDoctor/:specialization").get(getDoctor)
router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/bookAppointment").post(auth, bookAppointment)
router.route("/stripeGateway").post(stripeGateway)
router.route("/viewAppointments").get(auth, viewAppointments)
router.route("/cancelAppointment/:id").delete(auth, cancelAppointment)
router.route("/addTest").post(addTest)
router.route("/getTests").get(getTests)
router.route("/bookLabTest").post(auth, bookLabTest)
router.route("/filterMedicalTests/:testCategory").post(filterMedicalTests)
router.route("/addMedicine").post(addMedicine)
router.route("/getMedicines").get(getMedicines)
router.route("/searchMedicines/:medName").post(searchMedicines)
router.route("/loggedUser").get(auth, loggedUser)
router.route("/placeOrder").post(auth, placeOrder)

module.exports = router;


