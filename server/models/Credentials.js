const { Schema, model } = require('mongoose');

const credentialsSchema = new Schema({
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

const Credential = model('Credential', credentialsSchema);


module.exports = Credential;
