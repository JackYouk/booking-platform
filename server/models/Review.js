const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: true
});

const Review = model('Review', reviewSchema);


module.exports = Review;
