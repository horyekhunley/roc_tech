const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
    },
}, { timestamps: true })

const Story = model('Story', commentSchema)

module.exports = Story