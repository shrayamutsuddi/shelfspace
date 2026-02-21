const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
    },
    status:{
        type: String,
        enum: ['to-read', 'completed', 'reading'],    
        default: 'to-read'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    review: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Book", bookSchema);