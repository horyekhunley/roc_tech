const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const storySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    cover_image: {
        type: String,
        required: [true, 'Cover image is required'],
    },
    slug: {
        type: String,
        unique: true,
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    views_count: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

storySchema.plugin(uniqueValidator)

const Story = model('Story', storySchema)

module.exports = Story