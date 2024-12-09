const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
