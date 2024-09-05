const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    pocName: {
        type: String,
        required: true,
        minlength: 3,
        lowercase: true,
        trim: true
    },
    doi: {
        type: Date,
        default: Date.now,
    }
}, { strict: false });

const Data = mongoose.model("Data", dataSchema);

module.exports = Data