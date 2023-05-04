const { Schema, model } = require('mongoose')

const videoSchema = new Schema({
    videoId: {
        type: String,
        required: [true, 'The video id is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    views_count: {
        type: Number,
        default: 0,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

const Video = model('Video', videoSchema)

module.exports = Video