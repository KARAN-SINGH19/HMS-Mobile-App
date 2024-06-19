const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            medName: {
                type: String,
                required: [true, 'Please enter the product name'],
                trim: true
            },
            medPrice: {
                type: Number,
                required: [true, 'Please enter the product price']
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: [true, 'Please enter the total price']
    },
    placedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    }
});

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
