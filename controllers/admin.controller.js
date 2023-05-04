const User = require('../models/user.models.js')
const paginate = require('express-paginate')

// Retrieve and return all categories from the database.
exports.find_all_admins = async (req, res) => {
    try {
        const [ results, itemCount ] = await Promise.all([
            User.find({})
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            User.count({})
        ])
        const pageCount = Math.ceil(itemCount / req.query.limit)
        res.status(200).json({
            object: 'list',
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results,
            pageCount,
            itemCount,
            currentPage: req.query.page,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve administrators',
            success: false
        })        
    }
}

// Find a single admin with a adminId
exports.find_one_admin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.categoryId)
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found',
                success: false
            })
        }
        res.status(200).json({
            message: 'Admin retrieved successfully',
            success: true,
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve admin',
            success: false
        })
    }
}