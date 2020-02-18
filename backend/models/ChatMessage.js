var mongoose = require('mongoose');

var ChatMessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    text: String
}, { timestamps: true });

mongoose.model('ChatMessage', ChatMessageSchema);
