const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String
    },
    pages: {
        type: Number
    },
    date: {
        type: Date
    },
    image: {
        public_id: String,
        secure_url: String
    }
});

module.exports = mongoose.model('Book', schema);