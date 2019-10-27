const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 1) {
                throw new Error('Leta morajo biti pozitivna!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Ni pravi e-mail!')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Beseda password ne sme biti vpisana!')
            }
        }
    }
})

module.exports = User