const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    verificationCode: {
        type: Number,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    passwordResetCode: {
        type: String,
    }
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User