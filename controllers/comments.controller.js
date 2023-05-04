const Comment = require('../models/comment.models.js')

// Create and Save a new Comment
exports.create_new_comment = async (req, res) => {
    try {
        const newComment = new Comment({
            ...req.body,
            createdBy: req.user._id
        })
        await newComment.save()
        res.status(201).json({
            message: 'Comment created successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create Comment',
            success: false
        })

    }
}

// Update a Comment identified by the CommentId in the request
// exports.update_a_Comment = async (req, res) => {
//     try {
//         const Comment = await Comment.findById(req.params.CommentId)
//         if (!Comment) {
//             return res.status(404).json({
//                 message: 'Comment not found',
//                 success: false
//             })
//         }
//         await Comment.findByIdAndUpdate(req.params.CommentId, req.body, { new: true })
//         res.status(200).json({
//             message: 'Comment updated successfully',
//             success: true,
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'Unable to update Comment',
//             success: false
//         })
//     }
// }

// Delete a Comment with the specified CommentId in the request
exports.delete_a_comment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.CommentId)
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found',
                success: false
            })
        }
        await Comment.findByIdAndDelete(req.params.CommentId)
        res.status(200).json({
            message: 'Comment deleted successfully',
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete Comment',
            success: false
        })
    }
}