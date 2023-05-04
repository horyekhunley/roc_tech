const Story = require('../models/story.models.js')
const Comment = require('../models/comment.models.js')
const paginate = require('express-paginate')

// Create and Save a new story
exports.create_new_story = async (req, res) => {
    try {
        const newStory = new Story({
            ...req.body,
            createdBy: req.user._id
        })
        await newStory.save()
        res.status(201).json({
            message: 'Story created successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create Story',
            success: false
        })

    }
}

// Retrieve and return all story from the database.
exports.find_all_stories = async (req, res) => {
    try {
        const [results, itemCount] = await Promise.all([
            Story.find({})
                // populate story with category, title and user
                .populate('category', 'title')
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            Story.count({})
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

// Find a single story with a storyId
exports.find_one_Story = async (req, res) => {
    try {
        let story = await Story.findByIdAndUpdate(req.params.StoryId, {
            $inc: { views_count: 1 },
        }).populate('category', 'title').populate('createdBy', 'name')
        if (!story) {
            return res.status(404).json({
                message: 'Story not found',
                success: false
            })
        } else {
            items.comments = await Comment.find({ story: req.params.StoryId }).populate('createdBy', 'name')
            res.status(200).json({
                message: 'Story retrieved successfully',
                success: true,
                data: Story
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve Story',
            success: false
        })
    }
}

// Update a story identified by the storyId in the request
exports.update_a_Story = async (req, res) => {
    try {
        const story = await Story.findById(req.params.StoryId)
        if (!story) {
            return res.status(404).json({
                message: 'Story not found',
                success: false
            })
        }
        await Story.findByIdAndUpdate(req.params.StoryId, req.body, { new: true })
        res.status(200).json({
            message: 'Story updated successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to update Story',
            success: false
        })
    }
}

// Delete a story with the specified story in the request
exports.delete_a_Story = async (req, res) => {
    try {
        const story = await Story.findById(req.params.StoryId)
        if (!story) {
            return res.status(404).json({
                message: 'Story not found',
                success: false
            })
        }
        await Story.findByIdAndDelete(req.params.StoryId)
        res.status(200).json({
            message: 'Story deleted successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete Story',
            success: false
        })
    }
}

exports.find_top_stories = async (req, res) => {
    try {
        let results = await
            Story.find({})
                // populate story with category, title and user
                .populate('category', 'title')
                .sort({ views_count: -1 })
                .limit(3)
                .skip(req.skip)
                .lean()
                .exec()

        res.status(200).json({
            data: results,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to find top stories',
            success: false
        })
    }
}

// find a story by slug
exports.find_story_by_slug = async (req, res) => {
    try {
        let story = await Story.findOne({ slug: req.params.slug })
            .populate('category', 'title')
            .populate('createdBy', 'name')
        if (!story) {
            return res.status(404).json({
                message: 'Story not found',
                success: false
            })
        }
        res.status(200).json({
            message: 'Story retrieved successfully',
            success: true,
            data: story
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve Story',
            success: false
        })
    }

}