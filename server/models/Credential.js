const { Schema, model } = require('mongoose');

const credentialSchema = new Schema({
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    link: {
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

const Credential = model('Credential', credentialSchema);


module.exports = Credential;
