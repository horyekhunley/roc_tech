const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

categorySchema.plugin(uniqueValidator)

const Category = model('Category', categorySchema)

module.exports = Category