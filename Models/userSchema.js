const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (validator.isEmail(value)) {
                throw Error("Invalid email id")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 10
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

const users = new mongoose.model("users", userSchema)

module.exports = users