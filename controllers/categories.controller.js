const Category = require('../models/categories.models.js')
const paginate = require('express-paginate')

// Create and Save a new Category
exports.create_new_category = async (req, res) => {
    try {
        const newCategory = new Category({
            ...req.body,
            createdBy: req.user._id
        })
        await newCategory.save()
        res.status(201).json({
            message: 'Category created successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create category',
            success: false
        })

    }
}

// Retrieve and return all categories from the database.
exports.find_all_categories = async (req, res) => {
    try {
        const [ results, itemCount ] = await Promise.all([
            Category.find({})
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            Category.countDocuments({})
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
            message: 'Unable to retrieve categories',
            success: false
        })        
    }
}

// Find a single category with a categoryId
exports.find_one_category = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                success: false
            })
        }
        res.status(200).json({
            message: 'Category retrieved successfully',
            success: true,
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve category',
            success: false
        })
    }
}

// Update a category identified by the categoryId in the request
exports.update_a_category = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                success: false
            })
        }
        await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true })
        res.status(200).json({
            message: 'Category updated successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to update category',
            success: false
        })
    }
}

// Delete a category with the specified categoryId in the request
exports.delete_a_category = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                success: false
            })
        }
        await Category.findByIdAndDelete(req.params.categoryId)
        res.status(200).json({
            message: 'Category deleted successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete category',
            success: false
        })
    }
}