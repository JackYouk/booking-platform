const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: true
});

const Tag = model('Tag', tagSchema);


module.exports = Tag;

