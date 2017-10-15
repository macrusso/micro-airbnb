const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({
    name: String,
    photo: String,
    info: String,
    price: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Place', placeSchema);
