var mongoose = require('mongoose');

var EmailSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: String,
    subject: String,
    text: String
}, { timestamps: true });

mongoose.model('Email', EmailSchema);