const { Schema, model } = require('mongoose');

const todoScheme = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    description: String,
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'under-review', 'rework', 'completed'],
        default: 'todo'
    },
    startDate: String,
    endDate: String,
    user: String
},{
    timestamps: true
})

const Todo = model('Todo', todoScheme);

module.exports = Todo