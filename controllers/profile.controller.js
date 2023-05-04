const User = require('../models/user.models.js')

// Find a single User with a UId
exports.find_one_profile = async (req, res) => {
    try {
        const profile = await User.findById(req.params.Id)
        if (!profile) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            success: true,
            data: User
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve User',
            success: false
        })
    }
}

// Update a User  identified by the UserId in the request
exports.update_a_user = async (req, res) => {
    try {
        const profile = await User.findById(req.params.UsId)
        if (!profile) {
            return res.status(404).json({
                message: 'Use not found',
                success: false
            })
        }
        await User.findByIdAndUpdate(req.params.UserId, req.body, { new: true })
        res.status(200).json({
            message: 'User updated successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to update User',
            success: false
        })
    }
}