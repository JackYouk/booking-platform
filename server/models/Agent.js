const { Schema, model } = require('mongoose');

const agentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    industries: {
        type: String,
    },
    bio: {
        type: String,
    },
    acheivements: {
        type: String,
    },
    credentials: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Credential',
        },
    ],
    instagram: {
        type: String,
    },
    twitter: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    rating: {
        type: String,
    },
    imgPath: {
        type: String,
    },
    expertIn: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    packages: {
        type: [String],
        default: [],
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: true
});

const Agent = model('Agent', agentSchema);


module.exports = Agent;

