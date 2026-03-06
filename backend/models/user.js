const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    savedColleges: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);