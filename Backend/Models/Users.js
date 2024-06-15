const mongoose = require("mongoose");
const validator = require('validator');
const jwtToken = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should have at least 8 characters']
    }
});

userSchema.methods.generateJWToken = function () {
    const token = jwtToken.sign({ id: this._id, name: this.name, email: this.email }, process.env.JWT_KEY, {
        expiresIn: 86400000
    });
    return token;
};

const userTable = mongoose.model("Users", userSchema);

module.exports = userTable;
