const { Schema, model } = require('mongoose');

const agentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    bio: {
        type: String,
        required: true,
    },
    expertIn: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    clients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
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

