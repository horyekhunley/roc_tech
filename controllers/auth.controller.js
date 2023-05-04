const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/user.models')

// Register
exports.register = async (data, role, res) => {
    try {
        // check if email is taken
        const userTaken = await validateEmail(data.email)
        // if email is taken, return error, else create new user
        if (userTaken) {
            return res.status(400).json({
                email: 'Email already exists',
                message: 'Registration failed',
                success: false
            })
        } else {
            // hash password
            const hashedPassword = await bcrypt.hash(data.password, 12)
            // create verification token
            const verificationCode = crypto.randomInt(100000, 999999)
            // create new user
            const newUser = new User({
                ...data,
                password: hashedPassword,
                verificationCode,
                role
            })
            // save user
            await newUser.save()
            return res.status(201).json({
                message: 'User created successfully',
                success: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to create account',
            success: false
        })
    }
}

// Login
exports.login = async (data, role, res) => {
    try {
        let { email, password } = data
        // check if email exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        } else {
            // check if password is correct
            let isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                // sign in token
                let token = jwt.sign({
                    user_id: user._id,
                    role: user.role,
                    email: user.email
                }, process.env.JWT_SECRET, { expiresIn: '7 days' })
                // send response
                let profile = {
                    email: user.email,
                    role: user.role,
                    // token: `Bearer ${token}`,
                    expiresIn: 168
                }
                return res.status(200).json({
                    ...profile,
                    message: 'Login successful',
                    success: true
                })
            } else {
                return res.status(403).json({
                    message: 'Incorrect password',
                    success: false
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to login',
            success: false
        })

    }



}

// Verify email
exports.verifyEmail = async (data, res) => {
    try {
        let { email, verificationCode } = data
        // check if email exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        } else {
            // check if verification code is correct
            if (verificationCode == user.verificationCode) {
                // update user
                user.isEmailVerified = true
                user.verificationCode = null
                await user.save()
                return res.status(200).json({
                    message: 'Email verified successfully',
                    success: true
                })
            } else {
                return res.status(403).json({
                    message: 'Incorrect verification code',
                    success: false
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to verify email',
            success: false
        })

    }
}
// forgot password
exports.forgotPassword = async (data, res) => {
    try {
        let { email } = data
        // check if email exists
        const user = User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        } else {
            // create verification token
            const code = crypto.randomInt(100000, 999999)
            // hash code
            const passwordResetCode = await bcrypt.hash(code.toString(), 12)
            // update user
            user.passwordResetCode = passwordResetCode
            await user.save()
            return res.status(200).json({
                message: 'Verification code sent successfully',
                success: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to send verification code',
            success: false
        })        
    }
}

// reset password
exports.resetPassword = async (data, res) => {
    try {
        let { email, newPassword, verificationCode } = data
        // check if email exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        } else {
            // check if verification code is correct
            let isMatch = await bcrypt.compare(verificationCode.toString(), user.passwordResetCode)
            if (isMatch) {
                // hash password
                const hashedPassword = await bcrypt.hash(newPassword, 12)
                // update user
                user.password = hashedPassword
                user.passwordResetCode = null
                await user.save()
                return res.status(200).json({
                    message: 'Password reset successful',
                    success: true
                })
            } else {
                return res.status(403).json({
                    message: 'Incorrect verification code',
                    success: false
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to reset password',
            success: false
        })
        
    }
}

// change password
exports.changePassword = async (data, res) => {
    try {
        let { email, oldPassword, newPassword } = data
        // check if email exists
        const user = await User.findById(req.user._id)
        let isMatch = await bcrypt.compare(oldPassword, user.password)
        if (isMatch) {
            // hash password
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            // update user
            user.password = hashedPassword
            await user.save()
            return res.status(200).json({
                message: 'Password changed successfully',
                success: true
            })
        } else {
            return res.status(403).json({
                message: 'Incorrect password',
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to change password',
            success: false
        })        
    }
}

exports.validateEmail = async (email) => {
    let user = await User.findOne({ email })
    if (user) {
        return true
    } else {
        return false
    }
}