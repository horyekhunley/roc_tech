const Video = require('../models/videos.models.js')
const Comment = require('../models/comment.models.js')
const paginate = require('express-paginate')

// Create and Save a new Video
exports.create_new_video = async (req, res) => {
    try {
        const newVideo = new Video({
            ...req.body,
            createdBy: req.user._id
        })
        await newVideo.save()
        res.status(201).json({
            message: 'Video created successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create Video',
            success: false
        })

    }
}

// Retrieve and return all video from the database.
exports.find_all_videos = async (req, res) => {
    try {
        const [results, itemCount] = await Promise.all([
            Video.find({})
                // populate Video with category, title and user
                .sort({ createdAt: -1 })
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
            Video.count({})
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

// Find a single Video with a VideoId
exports.find_one_video = async (req, res) => {
    try {
        let video = await Video.findByIdAndUpdate(req.params.videoId, {
            $inc: { views_count: 1 },
        })
        if (!video) {
            return res.status(404).json({
                message: 'Video not found',
                success: false
            })
        } else {
            res.status(200).json({
                message: 'Video retrieved successfully',
                success: true,
                data: Video
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve Video',
            success: false
        })
    }
}

// Update a Video identified by the VideoId in the request
exports.update_a_video = async (req, res) => {
    try {
        const video = await Video.findById(req.params.VideoId)
        if (!video) {
            return res.status(404).json({
                message: 'Video not found',
                success: false
            })
        }
        await Video.findByIdAndUpdate(req.params.VideoId, req.body, { new: true })
        res.status(200).json({
            message: 'Video updated successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to update Video',
            success: false
        })
    }
}

// Delete a Video with the specified Video in the request
exports.delete_a_video = async (req, res) => {
    try {
        const video = await Video.findById(req.params.VideoId)
        if (!video) {
            return res.status(404).json({
                message: 'Video not found',
                success: false
            })
        }
        await Video.findByIdAndDelete(req.params.VideoId)
        res.status(200).json({
            message: 'Video deleted successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete Video',
            success: false
        })
    }
}

exports.find_top_videos = async (req, res) => {
    try {
        let results = await
            Video.find({})
                // populate Video with category, title and user
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
            message: 'Unable to find top videos',
            success: false
        })
    }
}